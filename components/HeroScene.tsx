'use client';

import React, { useEffect, useRef } from 'react';

interface ThemePreset {
  sculptureColor: number;
  roughness: number;
  metalness: number;
  ambientColor: number;
  ambientIntensity: number;
  keyColor: number;
  keyIntensity: number;
  rimColor: number;
  rimIntensity: number;
  fallbackStroke: string;
}

const THEME_PRESETS: Record<string, ThemePreset> = {
  paper: {
    sculptureColor: 0xc86d51,       // Terracotta Clay on Linen & Olive
    roughness: 0.65,
    metalness: 0.10,
    ambientColor: 0xf4efe6,
    ambientIntensity: 1.3,
    keyColor: 0xfff8ee,
    keyIntensity: 2.0,
    rimColor: 0x556b2f,             // Olive green rim reflection
    rimIntensity: 1.6,
    fallbackStroke: 'rgba(200, 109, 81, 0.28)',
  },
  clay: {
    sculptureColor: 0xb95b3d,       // Deep Rich Terracotta
    roughness: 0.58,
    metalness: 0.14,
    ambientColor: 0xfceee6,
    ambientIntensity: 1.4,
    keyColor: 0xfff5eb,
    keyIntensity: 2.1,
    rimColor: 0x84351d,             // Burnt rust rim
    rimIntensity: 1.8,
    fallbackStroke: 'rgba(185, 91, 61, 0.32)',
  },
  dark: {
    sculptureColor: 0x6e8e50,       // Sculpted Sage Olive Jade in Deep Forest
    roughness: 0.44,
    metalness: 0.22,
    ambientColor: 0x22301c,         // Deep forest ambient glow
    ambientIntensity: 1.7,
    keyColor: 0xdbedd0,             // Pale luminous sage moonlight key light
    keyIntensity: 2.3,
    rimColor: 0xe08569,             // Luminous warm terracotta rim light
    rimIntensity: 2.2,
    fallbackStroke: 'rgba(143, 168, 102, 0.35)',
  },
};

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

    if (prefersReducedMotion || isMobile) {
      canvas.style.display = 'none';
      return;
    }

    let animationFrameId: number;
    let cleanupThree: (() => void) | null = null;

    async function init() {
      try {
        const THREE = await import('three');

        const initialTheme =
          (typeof document !== 'undefined' &&
            document.documentElement.getAttribute('data-theme')) ||
          'paper';
        let targetPreset = THEME_PRESETS[initialTheme] || THEME_PRESETS.paper;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          42,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = 4.6;
        camera.position.x = 0;

        const renderer = new THREE.WebGLRenderer({
          canvas: canvas!,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Organic Torus Knot Sculpture with Dynamic Theme Colors
        const geometry = new THREE.TorusKnotGeometry(1.0, 0.32, 100, 24, 2, 3);
        const material = new THREE.MeshStandardMaterial({
          color: targetPreset.sculptureColor,
          roughness: targetPreset.roughness,
          metalness: targetPreset.metalness,
          flatShading: false,
        });

        const sculpture = new THREE.Mesh(geometry, material);
        sculpture.scale.set(0.85, 0.85, 0.85);
        scene.add(sculpture);

        // Ambient & Directional Lighting
        const ambientLight = new THREE.AmbientLight(
          targetPreset.ambientColor,
          targetPreset.ambientIntensity
        );
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(
          targetPreset.keyColor,
          targetPreset.keyIntensity
        );
        keyLight.position.set(3, 4, 4);
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(
          targetPreset.rimColor,
          targetPreset.rimIntensity
        );
        rimLight.position.set(-2, -2, -2);
        scene.add(rimLight);

        // Target color vectors for smooth lerping
        const targetSculptureColor = new THREE.Color(targetPreset.sculptureColor);
        const targetAmbientColor = new THREE.Color(targetPreset.ambientColor);
        const targetKeyColor = new THREE.Color(targetPreset.keyColor);
        const targetRimColor = new THREE.Color(targetPreset.rimColor);

        const updateTheme = (themeName: string) => {
          const preset = THEME_PRESETS[themeName] || THEME_PRESETS.paper;
          targetPreset = preset;
          targetSculptureColor.setHex(preset.sculptureColor);
          targetAmbientColor.setHex(preset.ambientColor);
          targetKeyColor.setHex(preset.keyColor);
          targetRimColor.setHex(preset.rimColor);
        };

        // MutationObserver to watch data-theme attribute on <html>
        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.attributeName === 'data-theme') {
              const newTheme =
                document.documentElement.getAttribute('data-theme') || 'paper';
              updateTheme(newTheme);
            }
          }
        });
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-theme'],
        });

        // Window custom event listener as backup
        const handleThemeEvent = (e: Event) => {
          const custom = e as CustomEvent<string>;
          if (custom.detail) {
            updateTheme(custom.detail);
          }
        };
        window.addEventListener('theme-change', handleThemeEvent);

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const onMouseMove = (e: MouseEvent) => {
          targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
          targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
        };
        window.addEventListener('mousemove', onMouseMove);

        const getBaseX = () => {
          const aspect = window.innerWidth / window.innerHeight;
          return Math.min(Math.max(aspect * 0.95, 1.25), 1.85);
        };

        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        let scrollProgress = 0;
        let scrollTriggerInstance: any = null;

        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        scrollTriggerInstance = ScrollTrigger.create({
          trigger: document.body,
          start: 'top top',
          end: '850px top',
          scrub: 1.2,
          onUpdate: (self) => {
            scrollProgress = self.progress;
          },
        });

        const clock = new THREE.Clock();
        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);

          const delta = clock.getDelta();
          sculpture.rotation.x += delta * 0.22;
          sculpture.rotation.y += delta * 0.28;
          sculpture.rotation.z = scrollProgress * 0.65;

          currentX += (targetX - currentX) * 0.05;
          currentY += (targetY - currentY) * 0.05;

          const baseX = getBaseX();
          sculpture.position.x = baseX + currentX;
          sculpture.position.y = 0.05 - currentY - scrollProgress * 1.6;
          sculpture.position.z = -scrollProgress * 2.2;

          if (canvas) {
            canvas.style.opacity = `${Math.max(0, 1 - scrollProgress * 1.1)}`;
          }

          // Smoothly interpolate material color, roughness, metalness, and lighting
          material.color.lerp(targetSculptureColor, 0.055);
          material.roughness += (targetPreset.roughness - material.roughness) * 0.055;
          material.metalness += (targetPreset.metalness - material.metalness) * 0.055;

          ambientLight.color.lerp(targetAmbientColor, 0.055);
          ambientLight.intensity +=
            (targetPreset.ambientIntensity - ambientLight.intensity) * 0.055;

          keyLight.color.lerp(targetKeyColor, 0.055);
          keyLight.intensity +=
            (targetPreset.keyIntensity - keyLight.intensity) * 0.055;

          rimLight.color.lerp(targetRimColor, 0.055);
          rimLight.intensity +=
            (targetPreset.rimIntensity - rimLight.intensity) * 0.055;

          renderer.render(scene, camera);
        };
        animate();

        cleanupThree = () => {
          if (scrollTriggerInstance) scrollTriggerInstance.kill();
          observer.disconnect();
          window.removeEventListener('theme-change', handleThemeEvent);
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('resize', onResize);
          cancelAnimationFrame(animationFrameId);
          renderer.dispose();
          geometry.dispose();
          material.dispose();
        };
      } catch (err) {
        console.warn(
          'Three.js failed to initialize, falling back to 2D canvas animation:',
          err
        );
        initFallback();
      }
    }

    function initFallback() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resize);
      resize();

      let currentTheme =
        (typeof document !== 'undefined' &&
          document.documentElement.getAttribute('data-theme')) ||
        'paper';

      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.attributeName === 'data-theme') {
            currentTheme =
              document.documentElement.getAttribute('data-theme') || 'paper';
          }
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });

      let angle = 0;
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width * 0.72;
        const cy = canvas.height * 0.45;
        const r = Math.min(canvas.width, canvas.height) * 0.22;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        const preset = THEME_PRESETS[currentTheme] || THEME_PRESETS.paper;
        ctx.strokeStyle = preset.fallbackStroke;
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.ellipse(
            0,
            0,
            r + i * 18,
            (r + i * 18) * 0.65,
            (i * Math.PI) / 5,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
        ctx.restore();

        angle += 0.003;
        animationFrameId = requestAnimationFrame(draw);
      };
      draw();

      cleanupThree = () => {
        observer.disconnect();
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
      };
    }

    init();

    return () => {
      if (cleanupThree) cleanupThree();
    };
  }, []);

  return <canvas id="scene" ref={canvasRef} aria-hidden="true" />;
}
