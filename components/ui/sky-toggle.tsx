'use client';

import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { liquidGlass } from '@/lib/liquid-glass';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  size?: string;
  'aria-label'?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  className,
  size = '16px',
  'aria-label': ariaLabel = 'Toggle theme',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const containerGlassRef = useRef<ReturnType<typeof liquidGlass> | null>(null);
  const ballGlassRef = useRef<ReturnType<typeof liquidGlass> | null>(null);

  useEffect(() => {
    // 1. Apple Liquid Glass for Pill Track
    if (containerRef.current) {
      containerGlassRef.current = liquidGlass(containerRef.current, {
        scale: -85,
        chroma: 4.5,
        border: 0.09,
        mapBlur: 10,
        blur: 4,
        saturate: 1.25,
      });
    }

    // 2. Apple Liquid Glass Refraction for Toggle Ball Orb
    if (ballRef.current) {
      ballGlassRef.current = liquidGlass(ballRef.current, {
        scale: -110,
        chroma: 5.5,
        border: 0.08,
        mapBlur: 8,
        blur: 3,
        saturate: 1.45,
      });
    }

    return () => {
      containerGlassRef.current?.destroy();
      ballGlassRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    // Refresh both liquid glass displacement maps on theme toggle
    containerGlassRef.current?.refresh();
    ballGlassRef.current?.refresh();
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <StyledWrapper className={`sky-toggle-wrapper ${className || ''}`} $toggleSize={size}>
      <label className="theme-switch" aria-label={ariaLabel}>
        <input
          type="checkbox"
          className="theme-switch__checkbox"
          checked={checked}
          onChange={handleChange}
          aria-label={ariaLabel}
        />
        <div ref={containerRef} className="theme-switch__container liquid-glass-panel" data-cursor="view">
          <div className="theme-switch__clouds" />
          <div className="theme-switch__stars-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="theme-switch__circle-container">
            <div ref={ballRef} className="theme-switch__sun-moon-container liquid-glass-ball">
              <div className="theme-switch__moon">
                <div className="theme-switch__spot" />
                <div className="theme-switch__spot" />
                <div className="theme-switch__spot" />
              </div>
            </div>
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $toggleSize: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  .theme-switch {
    --toggle-size: ${(props) => props.$toggleSize || '16px'};
    --container-width: 5.625em;
    --container-height: 2.5em;
    --container-radius: 9999px;

    /* Light Mode: Frosted Glass Track with Signature Red Clouds & White Mist */
    --container-light-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(240, 242, 246, 0.7) 100%);
    --clouds-color: #ffffff;
    --back-clouds-color: #ff0000; /* Signature V2 Bold Red */

    /* Dark Mode: Smoked Noir Glass Track with Star Sparkles */
    --container-night-bg: linear-gradient(135deg, rgba(20, 20, 24, 0.85) 0%, rgba(6, 6, 8, 0.94) 100%);
    --moon-bg: linear-gradient(145deg, rgba(245, 245, 248, 0.75) 0%, rgba(185, 188, 195, 0.45) 50%, rgba(20, 20, 25, 0.8) 100%);
    --spot-color: rgba(255, 255, 255, 0.25);
    --stars-color: #ffffff;

    /* Sizing & Offsets */
    --circle-container-diameter: 3.375em;
    --sun-moon-diameter: 2.125em;
    --circle-container-offset: calc(
      (var(--circle-container-diameter) - var(--container-height)) / 2 * -1
    );

    /* Spring Physics Easing */
    --transition: 0.52s cubic-bezier(0.16, 1, 0.3, 1);
    --circle-transition: 0.42s cubic-bezier(0.16, 1, 0.3, 1);

    display: inline-block;
    cursor: pointer;
    user-select: none;
  }

  .theme-switch,
  .theme-switch *,
  .theme-switch *::before,
  .theme-switch *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: var(--toggle-size);
  }

  /* Liquid Glass Capsule Track */
  .theme-switch__container {
    width: var(--container-width);
    height: var(--container-height);
    background: var(--container-light-bg);
    border-radius: var(--container-radius);
    overflow: hidden;
    cursor: pointer;
    position: relative;
    box-shadow:
      0 4px 18px rgba(0, 0, 0, 0.08),
      inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95),
      inset 0 -1px 1px rgba(0, 0, 0, 0.08),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(14px) saturate(135%);
    -webkit-backdrop-filter: blur(14px) saturate(135%);
    transition:
      background var(--transition),
      box-shadow var(--transition),
      transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, box-shadow;
  }

  .theme-switch__container:hover {
    transform: scale(1.05);
    box-shadow:
      0 6px 24px rgba(0, 0, 0, 0.12),
      inset 0 1.5px 1.5px rgba(255, 255, 255, 1),
      inset 0 -1px 1px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.7);
  }

  .theme-switch__container:active {
    transform: scale(0.96);
  }

  .theme-switch__container::before {
    content: '';
    position: absolute;
    z-index: 1;
    inset: 0;
    box-shadow:
      0 0.04em 0.12em rgba(0, 0, 0, 0.15) inset,
      0 0.04em 0.12em rgba(0, 0, 0, 0.15) inset;
    border-radius: var(--container-radius);
    pointer-events: none;
  }

  .theme-switch__checkbox {
    display: none;
  }

  /* Circle Container Track Overlay */
  .theme-switch__circle-container {
    width: var(--circle-container-diameter);
    height: var(--circle-container-diameter);
    background-color: rgba(255, 255, 255, 0.08);
    position: absolute;
    left: var(--circle-container-offset);
    top: var(--circle-container-offset);
    border-radius: var(--container-radius);
    box-shadow:
      inset 0 0 0 3.375em rgba(255, 255, 255, 0.06),
      0 0 0 0.625em rgba(255, 255, 255, 0.06),
      0 0 0 1.25em rgba(255, 255, 255, 0.04);
    display: flex;
    transition: var(--circle-transition);
    pointer-events: none;
  }

  /* -------------------------------------------------------------
     TOGGLE BALL: Apple Liquid Glass Effect (Pure Glass Bead)
     ------------------------------------------------------------- */
  .theme-switch__sun-moon-container {
    pointer-events: auto;
    position: relative;
    z-index: 2;
    width: var(--sun-moon-diameter);
    height: var(--sun-moon-diameter);
    margin: auto;
    border-radius: 9999px;
    
    /* Liquid Glass Material Dressing (Skill Recipe) */
    background: linear-gradient(145deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.55) 50%,
      rgba(235, 238, 245, 0.75) 100%
    );
    box-shadow:
      0 4px 14px rgba(0, 0, 0, 0.16),           /* Soft ambient shadow */
      inset 0 1.8px 2px rgba(255, 255, 255, 1),    /* Top specular highlight */
      inset 0 -1.5px 2px rgba(0, 0, 0, 0.12),     /* Bottom rim reflection */
      inset 0 0 0 1px rgba(255, 255, 255, 0.85);  /* 1px glass rim border */
    backdrop-filter: blur(12px) saturate(145%);
    -webkit-backdrop-filter: blur(12px) saturate(145%);
    overflow: hidden;
    transition: var(--transition);
    will-change: transform, box-shadow;
  }

  /* Subtle inner glass core refraction reflection */
  .theme-switch__sun-moon-container::after {
    content: '';
    position: absolute;
    top: 10%;
    left: 14%;
    width: 44%;
    height: 30%;
    border-radius: 50%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 100%);
    pointer-events: none;
  }

  /* Moon Surface in Liquid Glass */
  .theme-switch__moon {
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    background: var(--moon-bg);
    border-radius: inherit;
    box-shadow:
      inset 0 1.5px 2px rgba(255, 255, 255, 0.65),
      inset 0 -1.5px 2px rgba(0, 0, 0, 0.55);
    transition: var(--transition);
    position: relative;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  /* Moon Crater Depressions in Glass */
  .theme-switch__spot {
    position: absolute;
    top: 0.75em;
    left: 0.312em;
    width: 0.75em;
    height: 0.75em;
    border-radius: var(--container-radius);
    background-color: var(--spot-color);
    box-shadow:
      0 0.04em 0.08em rgba(0, 0, 0, 0.4) inset,
      0 0.02em 0.04em rgba(255, 255, 255, 0.25);
  }

  .theme-switch__spot:nth-of-type(2) {
    width: 0.375em;
    height: 0.375em;
    top: 0.937em;
    left: 1.375em;
  }

  .theme-switch__spot:nth-last-of-type(3) {
    width: 0.25em;
    height: 0.25em;
    top: 0.312em;
    left: 0.812em;
  }

  /* -------------------------------------------------------------
     CLOUDS: White Foreground + Signature Bold Red Back Clouds
     ------------------------------------------------------------- */
  .theme-switch__clouds {
    width: 1.25em;
    height: 1.25em;
    background-color: var(--clouds-color);
    border-radius: var(--container-radius);
    position: absolute;
    bottom: -0.625em;
    left: 0.312em;
    box-shadow:
      0.937em 0.312em var(--clouds-color),
      -0.312em -0.312em var(--back-clouds-color),
      1.437em 0.375em var(--clouds-color),
      0.5em -0.125em var(--back-clouds-color),
      2.187em 0 var(--clouds-color),
      1.25em -0.062em var(--back-clouds-color),
      2.937em 0.312em var(--clouds-color),
      2em -0.312em var(--back-clouds-color),
      3.625em -0.062em var(--clouds-color),
      2.625em 0em var(--back-clouds-color),
      4.5em -0.312em var(--clouds-color),
      3.375em -0.437em var(--back-clouds-color),
      4.625em -1.75em 0 0.437em var(--clouds-color),
      4em -0.625em var(--back-clouds-color),
      4.125em -2.125em 0 0.437em var(--back-clouds-color);
    transition: 0.52s cubic-bezier(0.16, 1, 0.3, 1);
    filter: drop-shadow(0 2px 5px rgba(255, 0, 0, 0.35));
  }

  /* Stars Container */
  .theme-switch__stars-container {
    position: absolute;
    color: var(--stars-color);
    top: -100%;
    left: 0.312em;
    width: 2.75em;
    height: auto;
    transition: var(--transition);
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.85));
  }

  /* -------------------------------------------------------------
     Checked (Night / Dark Mode State)
     ------------------------------------------------------------- */
  .theme-switch__checkbox:checked + .theme-switch__container {
    background: var(--container-night-bg);
    box-shadow:
      0 8px 26px rgba(0, 0, 0, 0.65),
      inset 0 1.5px 1px rgba(255, 255, 255, 0.22),
      inset 0 -1px 1px rgba(0, 0, 0, 0.6),
      inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  }

  .theme-switch__checkbox:checked + .theme-switch__container:hover {
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.75),
      inset 0 1.5px 1px rgba(255, 255, 255, 0.35),
      inset 0 -1px 1px rgba(0, 0, 0, 0.7),
      inset 0 0 0 1px rgba(210, 247, 90, 0.35); /* Subtle V2 Volt neon glow on dark hover */
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container {
    left: calc(
      100% - var(--circle-container-offset) - var(--circle-container-diameter)
    );
    box-shadow:
      inset 0 0 0 3.375em rgba(255, 255, 255, 0.03),
      0 0 0 0.625em rgba(255, 255, 255, 0.03),
      0 0 0 1.25em rgba(255, 255, 255, 0.02);
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__circle-container:hover {
    left: calc(
      100% - var(--circle-container-offset) - var(--circle-container-diameter) -
        0.187em
    );
  }

  .theme-switch__circle-container:hover {
    left: calc(var(--circle-container-offset) + 0.187em);
  }

  /* Dark mode liquid glass ball */
  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__sun-moon-container {
    background: linear-gradient(145deg,
      rgba(255, 255, 255, 0.35) 0%,
      rgba(160, 165, 175, 0.18) 50%,
      rgba(15, 15, 20, 0.8) 100%
    );
    box-shadow:
      0 4px 18px rgba(0, 0, 0, 0.65),
      inset 0 1.8px 2px rgba(255, 255, 255, 0.65),
      inset 0 -1.5px 2px rgba(0, 0, 0, 0.75),
      inset 0 0 0 1px rgba(255, 255, 255, 0.3);
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__moon {
    transform: translate(0);
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__clouds {
    bottom: -4.062em;
    opacity: 0;
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__stars-container {
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default Switch;
