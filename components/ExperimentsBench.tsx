'use client';

import React, { useState, useRef, useEffect } from 'react';

// Apple Design Rubber-banding formula (§9)
function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

// Apple Design Momentum Projection (§6)
function project(velocity: number, decelerationRate = 0.998): number {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

export default function ExperimentsBench() {
  // --------------------------------------------------------------------------
  // Experiment 1: Kinetic Variable Type (Apple Fluid Motion & Physics)
  // --------------------------------------------------------------------------
  const kineticRef = useRef<HTMLDivElement>(null);
  const [kineticTransform, setKineticTransform] = useState('translate(0px, 0px) scale(1)');
  const [isDragging, setIsDragging] = useState(false);

  const dragTracking = useRef({
    isDown: false,
    grabOffsetX: 0,
    grabOffsetY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    velocityX: 0,
    velocityY: 0,
    currentX: 0,
    currentY: 0,
    animFrame: 0,
  });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = kineticRef.current;
    if (!el) return;

    el.setPointerCapture(e.pointerId);
    cancelAnimationFrame(dragTracking.current.animFrame);

    const rect = el.getBoundingClientRect();
    dragTracking.current.isDown = true;
    dragTracking.current.grabOffsetX = e.clientX - (rect.left + rect.width / 2);
    dragTracking.current.grabOffsetY = e.clientY - (rect.top + rect.height / 2);
    dragTracking.current.lastX = e.clientX;
    dragTracking.current.lastY = e.clientY;
    dragTracking.current.lastTime = performance.now();
    dragTracking.current.velocityX = 0;
    dragTracking.current.velocityY = 0;

    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragTracking.current.isDown) return;

    const now = performance.now();
    const dt = Math.max(now - dragTracking.current.lastTime, 1);
    const rawDx = e.clientX - dragTracking.current.lastX;
    const rawDy = e.clientY - dragTracking.current.lastY;

    // Track instantaneous velocity (px/s)
    dragTracking.current.velocityX = (rawDx / dt) * 1000;
    dragTracking.current.velocityY = (rawDy / dt) * 1000;
    dragTracking.current.lastX = e.clientX;
    dragTracking.current.lastY = e.clientY;
    dragTracking.current.lastTime = now;

    // Calculate displacement from center with boundary dimension = 180px
    const boundary = 160;
    let targetX = dragTracking.current.currentX + rawDx;
    let targetY = dragTracking.current.currentY + rawDy;

    // Apply Apple Rubber-banding (§9) if dragging beyond boundary
    if (Math.abs(targetX) > boundary) {
      const overshoot = targetX > 0 ? targetX - boundary : targetX + boundary;
      targetX = (targetX > 0 ? boundary : -boundary) + rubberband(overshoot, boundary, 0.55);
    }
    if (Math.abs(targetY) > boundary) {
      const overshoot = targetY > 0 ? targetY - boundary : targetY + boundary;
      targetY = (targetY > 0 ? boundary : -boundary) + rubberband(overshoot, boundary, 0.55);
    }

    dragTracking.current.currentX = targetX;
    dragTracking.current.currentY = targetY;

    const rot = targetX * 0.08;
    setKineticTransform(
      `translate(${targetX}px, ${targetY}px) rotate(${rot}deg) scale(1.06)`
    );
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragTracking.current.isDown) return;
    dragTracking.current.isDown = false;
    setIsDragging(false);

    try {
      kineticRef.current?.releasePointerCapture(e.pointerId);
    } catch {}

    // Apple Momentum Projection (§6)
    const projX = project(dragTracking.current.velocityX);
    const projY = project(dragTracking.current.velocityY);

    let posX = dragTracking.current.currentX + projX * 0.35;
    let posY = dragTracking.current.currentY + projY * 0.35;
    let vx = dragTracking.current.velocityX * 0.4;
    let vy = dragTracking.current.velocityY * 0.4;

    // Apple Spring Settle: Critically Damped (damping 1.0, stiffness k)
    let lastT = performance.now();
    const springSettle = () => {
      const now = performance.now();
      const dt = Math.min((now - lastT) / 1000, 0.032);
      lastT = now;

      // Critically damped spring towards (0, 0)
      const k = 220; // spring tension
      const c = 2 * Math.sqrt(k); // critical damping (damping = 1.0)

      const ax = -k * posX - c * vx;
      const ay = -k * posY - c * vy;

      vx += ax * dt;
      vy += ay * dt;
      posX += vx * dt;
      posY += vy * dt;

      dragTracking.current.currentX = posX;
      dragTracking.current.currentY = posY;

      const rot = posX * 0.06;
      setKineticTransform(`translate(${posX}px, ${posY}px) rotate(${rot}deg) scale(1)`);

      if (Math.abs(posX) > 0.3 || Math.abs(posY) > 0.3 || Math.abs(vx) > 0.8 || Math.abs(vy) > 0.8) {
        dragTracking.current.animFrame = requestAnimationFrame(springSettle);
      } else {
        dragTracking.current.currentX = 0;
        dragTracking.current.currentY = 0;
        setKineticTransform('translate(0px, 0px) scale(1)');
      }
    };

    dragTracking.current.animFrame = requestAnimationFrame(springSettle);
  };

  // --------------------------------------------------------------------------
  // Experiment 2: Tactile Switch with Multimodal Harmony (§13)
  // --------------------------------------------------------------------------
  const [switchOn, setSwitchOn] = useState(false);

  const playTactileClick = (isEngaged: boolean) => {
    // 1. Multimodal Haptic feedback (Vibration API) on the exact same frame
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {}
    }

    // 2. Synthesized Web Audio physical switch click
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isEngaged ? 320 : 200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        isEngaged ? 95 : 60,
        ctx.currentTime + 0.035
      );

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  };

  const handleSwitchToggle = () => {
    const nextState = !switchOn;
    setSwitchOn(nextState);
    playTactileClick(nextState);
  };

  // --------------------------------------------------------------------------
  // Experiment 3: Generative Organic Clay Noise Field
  // --------------------------------------------------------------------------
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 140, y: 140 });

  useEffect(() => {
    const canvas = noiseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        drawContours();
      }
    };

    const drawContours = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'var(--clay)';
      ctx.lineWidth = 1.2;

      const { x: mx, y: my } = mouseRef.current;
      for (let r = 20; r < 240; r += 22) {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.08) {
          const distortion =
            Math.sin(a * 4 + r * 0.05) * 8 + Math.cos(a * 3) * 6;
          const x = mx + Math.cos(a) * (r + distortion);
          const y = my + Math.sin(a) * (r + distortion);
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      drawContours();
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // --------------------------------------------------------------------------
  // Experiment 4: Microcopy Oracle
  // --------------------------------------------------------------------------
  const [oracleInput, setOracleInput] = useState('');
  const dictionary: Record<string, string> = {
    synergy: 'working together naturally',
    leverage: 'use',
    'paradigm shift': 'new way of thinking',
    bandwidth: 'time and energy',
    'deep dive': 'thorough study',
    'actionable insights': 'clear next steps',
    'touch base': 'talk briefly',
    'move the needle': 'make a real difference',
    circleback: 'revisit this later',
    frictionless: 'simple and smooth',
  };

  const getOracleOutput = () => {
    const val = oracleInput.toLowerCase().trim();
    if (!val) return '“Type corporate jargon to clarify.”';
    for (const [jargon, plain] of Object.entries(dictionary)) {
      if (val.includes(jargon)) {
        return `“${plain}”`;
      }
    }
    return '“Say what it is in plain words.”';
  };

  return (
    <section className="bench-grid">
      {/* Experiment 1: Kinetic Variable Type with Apple Physics */}
      <article className="bench-card" data-cursor="play">
        <div className="bench-card__viewport" style={{ touchAction: 'none' }}>
          <div
            ref={kineticRef}
            className="kinetic-box"
            title="Drag with momentum to test Apple rubber-banding"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              transform: kineticTransform,
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              touchAction: 'none',
            }}
          >
            Resonance
          </div>
        </div>
        <div className="bench-card__body">
          <div className="bench-card__meta">
            <span>2024.08</span>
            <span className="tag-pill">Apple Spring Physics</span>
          </div>
          <h2 className="bench-card__title">Kinetic Direct Manipulation</h2>
          <p className="bench-card__desc">
            Direct 1:1 pointer tracking with grab offset preservation,
            exponential rubber-banding at boundaries, and momentum release
            settling via critically damped spring physics.
          </p>
        </div>
      </article>

      {/* Experiment 2: Tactile Paper Switch with Audio-Haptics */}
      <article className="bench-card" data-cursor="play">
        <div className="bench-card__viewport">
          <div className="switch-box">
            <div
              className={`tactile-lever ${switchOn ? 'is-on' : ''}`}
              role="switch"
              aria-checked={switchOn}
              tabIndex={0}
              onClick={handleSwitchToggle}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSwitchToggle();
                }
              }}
            >
              <div className="tactile-knob" />
            </div>
            <span className="switch-status">
              {switchOn ? 'State: Engaged (40N)' : 'State: Resting (0N)'}
            </span>
          </div>
        </div>
        <div className="bench-card__body">
          <div className="bench-card__meta">
            <span>2024.06</span>
            <span className="tag-pill">Audio-Haptic Harmony</span>
          </div>
          <h2 className="bench-card__title">Tactile Lever &amp; Haptics</h2>
          <p className="bench-card__desc">
            Simulating mechanical spring overshoot with causality and harmony:
            Web Audio harmonic synthesis and device haptics fire on the exact
            same frame.
          </p>
        </div>
      </article>

      {/* Experiment 3: Generative Noise Canvas */}
      <article className="bench-card" data-cursor="play">
        <div className="bench-card__viewport" style={{ position: 'relative' }}>
          <canvas
            id="noiseCanvas"
            ref={noiseCanvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>
        <div className="bench-card__body">
          <div className="bench-card__meta">
            <span>2024.05</span>
            <span className="tag-pill">Harmonic Isobars</span>
          </div>
          <h2 className="bench-card__title">Organic Clay Noise Field</h2>
          <p className="bench-card__desc">
            Move pointer over the canvas to calculate real-time trigonometric
            harmonic distortions along concentric isobar contours with zero
            input latency.
          </p>
        </div>
      </article>

      {/* Experiment 4: Microcopy Oracle */}
      <article className="bench-card" data-cursor="play">
        <div
          className="bench-card__viewport"
          style={{ flexDirection: 'column', gap: '16px', padding: '24px' }}
        >
          <input
            type="text"
            className="oracle-input"
            placeholder="e.g. Let's touch base to leverage synergy..."
            value={oracleInput}
            onChange={(e) => setOracleInput(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '360px',
              padding: '10px 14px',
              border: '1px solid var(--border-medium)',
              borderRadius: '8px',
              background: 'var(--bg-surface)',
              color: 'var(--ink)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              letterSpacing: '-0.005em',
            }}
          />
          <div
            className="oracle-output"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: 'var(--clay)',
              fontStyle: 'italic',
              textAlign: 'center',
              minHeight: '36px',
              letterSpacing: '-0.015em',
            }}
          >
            {getOracleOutput()}
          </div>
        </div>
        <div className="bench-card__body">
          <div className="bench-card__meta">
            <span>2024.04</span>
            <span className="tag-pill">Restraint / Words</span>
          </div>
          <h2 className="bench-card__title">The Microcopy Oracle</h2>
          <p className="bench-card__desc">
            An instant jargon filter translating enterprise buzzwords into
            concise, calming product language honoring Apple Design Principle §6
            (Simplicity).
          </p>
        </div>
      </article>
    </section>
  );
}
