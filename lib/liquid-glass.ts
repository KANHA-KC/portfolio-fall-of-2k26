/*!
 * liquid-glass.ts — Apple-style liquid glass refraction for web components.
 * Adapted from https://github.com/deepika-builds/liquid-glass
 * 
 * Features:
 * - Real rim refraction bulge + chromatic prism fringe in Chromium
 * - Automatic frosted blur fallback in Safari & Firefox
 * - ResizeObserver with debounced regeneration
 * - Clean teardown on unmount
 */

export interface LiquidGlassOptions {
  /** Displacement strength; negative = magnifying bulge (-60 subtle, -112 default, -180 dramatic) */
  scale?: number;
  /** Per-channel scale stagger (prism fringe); 0 disables */
  chroma?: number;
  /** Neutral interior inset as a fraction of smaller side (e.g. 0.08) */
  border?: number;
  /** Edge-curvature softness (px) of the map's gray inset */
  mapBlur?: number;
  /** Backdrop blur (px) inside the glass */
  blur?: number;
  /** Backdrop saturation boost */
  saturate?: number;
  /** Corner radius override (px); defaults to border-radius */
  radius?: number | null;
  /** Frosted blur (px) where refraction is unsupported */
  fallbackBlur?: number;
}

export interface LiquidGlassInstance {
  supported: boolean;
  refresh: () => void;
  destroy: () => void;
}

const SVG_NS = "http://www.w3.org/2000/svg";
let uid = 0;
let svgDefs: SVGDefsElement | null = null;

function checkChromiumSupport(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isSafari = /Safari/.test(ua) && !/Chrome|Chromium|Edg/.test(ua);
  const isFirefox = /Firefox/.test(ua);
  if (isSafari || isFirefox) return false;
  if (typeof CSS === "undefined" || !CSS.supports || !CSS.supports("backdrop-filter", "url(#lg)")) return false;
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 4;
    return !!c.getContext("2d");
  } catch {
    return false;
  }
}

function checkReducedTransparency(): boolean {
  if (typeof window === "undefined") return false;
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-transparency: reduce)").matches);
}

function ensureDefs(): SVGDefsElement {
  if (svgDefs && svgDefs.ownerDocument.body.contains(svgDefs)) {
    return svgDefs;
  }
  const svg = document.createElementNS(SVG_NS, "svg");
  // width/height 0 keeps it renderable (display:none would break feImage)
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.setAttribute("aria-hidden", "true");
  svg.style.position = "absolute";
  svg.style.pointerEvents = "none";
  svg.style.opacity = "0";
  svg.style.zIndex = "-9999";
  svgDefs = document.createElementNS(SVG_NS, "defs");
  svg.appendChild(svgDefs);
  document.body.appendChild(svg);
  return svgDefs;
}

function drawRoundRectFallback(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.arcTo(x + w, y, x + w, y + rad, rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.arcTo(x + w, y + h, x + w - rad, y + h, rad);
  ctx.lineTo(x + rad, y + h);
  ctx.arcTo(x, y + h, x, y + h - rad, rad);
  ctx.lineTo(x, y + rad);
  ctx.arcTo(x, y, x + rad, y, rad);
  ctx.closePath();
}

function makeMap(w: number, h: number, radius: number, border: number, mapBlur: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(w));
  canvas.height = Math.max(1, Math.round(h));
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Red ramp encodes X displacement
  const gx = ctx.createLinearGradient(0, 0, w, 0);
  gx.addColorStop(0, "rgb(0,0,0)");
  gx.addColorStop(1, "rgb(255,0,0)");
  ctx.fillStyle = gx;
  ctx.fillRect(0, 0, w, h);

  // Blue ramp encodes Y displacement, difference preserves both disjoint channels
  const gy = ctx.createLinearGradient(0, 0, 0, h);
  gy.addColorStop(0, "rgb(0,0,0)");
  gy.addColorStop(1, "rgb(0,0,255)");
  ctx.globalCompositeOperation = "difference";
  ctx.fillStyle = gy;
  ctx.fillRect(0, 0, w, h);

  // Blurred inset 50% neutral gray rounded rect confines refraction to rim
  ctx.globalCompositeOperation = "source-over";
  const inset = border * Math.min(w, h);
  ctx.filter = `blur(${mapBlur}px)`;
  ctx.fillStyle = "rgba(128,128,128,0.93)";

  const cornerR = Math.max(radius - inset, 2);
  const rw = Math.max(0, w - inset * 2);
  const rh = Math.max(0, h - inset * 2);

  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(inset, inset, rw, rh, cornerR);
    ctx.fill();
  } else {
    drawRoundRectFallback(ctx, inset, inset, rw, rh, cornerR);
    ctx.fill();
  }

  ctx.filter = "none";
  return canvas.toDataURL();
}

function buildFilter(id: string, scales: number[]) {
  const filter = document.createElementNS(SVG_NS, "filter");
  filter.setAttribute("id", id);
  filter.setAttribute("x", "0");
  filter.setAttribute("y", "0");
  filter.setAttribute("width", "100%");
  filter.setAttribute("height", "100%");
  // MANDATORY: Prevents linearRGB from remapping 128 neutral gray and causing whole backdrop drift
  filter.setAttribute("color-interpolation-filters", "sRGB");

  const feImage = document.createElementNS(SVG_NS, "feImage");
  feImage.setAttribute("x", "0");
  feImage.setAttribute("y", "0");
  feImage.setAttribute("result", "map");
  feImage.setAttribute("preserveAspectRatio", "none");
  filter.appendChild(feImage);

  const keep = [
    "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
    "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
    "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
  ];

  const channels: string[] = [];
  for (let i = 0; i < 3; i++) {
    const disp = document.createElementNS(SVG_NS, "feDisplacementMap");
    disp.setAttribute("in", "SourceGraphic");
    disp.setAttribute("in2", "map");
    disp.setAttribute("scale", String(scales[i]));
    disp.setAttribute("xChannelSelector", "R");
    disp.setAttribute("yChannelSelector", "B");
    disp.setAttribute("result", `d${i}`);
    filter.appendChild(disp);

    const cm = document.createElementNS(SVG_NS, "feColorMatrix");
    cm.setAttribute("in", `d${i}`);
    cm.setAttribute("type", "matrix");
    cm.setAttribute("values", keep[i]);
    cm.setAttribute("result", `c${i}`);
    filter.appendChild(cm);
    channels.push(`c${i}`);
  }

  const blend1 = document.createElementNS(SVG_NS, "feBlend");
  blend1.setAttribute("in", channels[0]);
  blend1.setAttribute("in2", channels[1]);
  blend1.setAttribute("mode", "screen");
  blend1.setAttribute("result", "c01");
  filter.appendChild(blend1);

  const blend2 = document.createElementNS(SVG_NS, "feBlend");
  blend2.setAttribute("in", "c01");
  blend2.setAttribute("in2", channels[2]);
  blend2.setAttribute("mode", "screen");
  filter.appendChild(blend2);

  ensureDefs().appendChild(filter);
  return { filter, feImage };
}

function resolveRadius(el: HTMLElement, w: number, h: number, override?: number | null): number {
  if (override != null) return override;
  const raw = getComputedStyle(el).borderTopLeftRadius || "0px";
  const v = parseFloat(raw) || 0;
  const maxPillRadius = Math.min(w, h) / 2;
  if (raw.trim().endsWith("%")) {
    return Math.min((v / 100) * Math.min(w, h), maxPillRadius);
  }
  return Math.min(v, maxPillRadius);
}

export function liquidGlass(el: HTMLElement, opts?: LiquidGlassOptions): LiquidGlassInstance {
  if ((el as any).__liquidGlass) {
    return (el as any).__liquidGlass;
  }

  const o = Object.assign(
    {
      scale: -90,
      chroma: 5,
      border: 0.08,
      mapBlur: 10,
      blur: 3,
      saturate: 1.5,
      radius: null,
      fallbackBlur: 20,
    },
    opts
  );

  if (checkReducedTransparency()) {
    el.classList.add("lg-reduced-transparency");
    const disabledInstance: LiquidGlassInstance = {
      supported: false,
      refresh: () => {},
      destroy: () => {
        delete (el as any).__liquidGlass;
        el.classList.remove("lg-reduced-transparency");
      },
    };
    (el as any).__liquidGlass = disabledInstance;
    return disabledInstance;
  }

  const supported = checkChromiumSupport();

  if (!supported) {
    const frosted = `blur(${o.fallbackBlur}px) saturate(${o.saturate})`;
    el.style.backdropFilter = frosted;
    el.style.setProperty("-webkit-backdrop-filter", frosted);
    el.classList.add("lg-fallback");
    const fallbackInstance: LiquidGlassInstance = {
      supported: false,
      refresh: () => {},
      destroy: () => {
        delete (el as any).__liquidGlass;
        el.style.backdropFilter = "";
        el.style.removeProperty("-webkit-backdrop-filter");
        el.classList.remove("lg-fallback");
      },
    };
    (el as any).__liquidGlass = fallbackInstance;
    return fallbackInstance;
  }

  const id = `lg-filter-${++uid}`;
  const scales = [o.scale, o.scale + o.chroma, o.scale + 2 * o.chroma];
  const parts = buildFilter(id, scales);

  function refresh() {
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;
    const radius = resolveRadius(el, w, h, o.radius);
    const dataUrl = makeMap(w, h, radius, o.border, o.mapBlur);
    if (!dataUrl) return;

    parts.feImage.setAttribute("href", dataUrl);
    parts.feImage.setAttribute("width", String(w));
    parts.feImage.setAttribute("height", String(h));
  }

  refresh();
  const filterStyle = `url(#${id}) blur(${o.blur}px) saturate(${o.saturate})`;
  el.style.backdropFilter = filterStyle;
  el.style.setProperty("-webkit-backdrop-filter", filterStyle);
  el.classList.add("lg-active");

  let timer: NodeJS.Timeout | null = null;
  const ro = new ResizeObserver(() => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(refresh, 100);
  });
  ro.observe(el);

  const instance: LiquidGlassInstance = {
    supported: true,
    refresh,
    destroy: () => {
      delete (el as any).__liquidGlass;
      ro.disconnect();
      if (timer) clearTimeout(timer);
      parts.filter.remove();
      el.style.backdropFilter = "";
      el.style.removeProperty("-webkit-backdrop-filter");
      el.classList.remove("lg-active");
    },
  };
  (el as any).__liquidGlass = instance;
  return instance;
}

/**
 * Apply liquid glass to multiple elements simultaneously.
 * Returns a teardown function that destroys all instances.
 */
export function applyLiquidGlass(
  targets: (HTMLElement | null | undefined)[] | NodeListOf<HTMLElement>,
  opts?: LiquidGlassOptions
): () => void {
  const instances: LiquidGlassInstance[] = [];
  targets.forEach((el) => {
    if (el && el instanceof HTMLElement) {
      instances.push(liquidGlass(el, opts));
    }
  });
  return () => {
    instances.forEach((inst) => inst.destroy());
  };
}

