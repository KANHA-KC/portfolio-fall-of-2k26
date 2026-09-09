// ==========================================================================
//  scene.js — Lightweight 3D Hero Scene (Three.js with Canvas Fallback)
// ==========================================================================

async function initHeroScene() {
  const canvas = document.getElementById('scene');
  if (!canvas) return;

  // 1. Accessibility & Performance Checks:
  // Disable 3D on reduced-motion or mobile screens to conserve battery and CPU
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);

  if (prefersReducedMotion || isMobile) {
    canvas.style.display = 'none';
    return;
  }

  try {
    // Dynamic ESM import of Three.js
    const THREE = await import('https://unpkg.com/three@0.160.0/build/three.module.js');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4.6;
    camera.position.x = 0;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Warm Clay Organic Shape (Torus Knot with low specular roughness)
    const geometry = new THREE.TorusKnotGeometry(1.0, 0.32, 100, 24, 2, 3);
    const material = new THREE.MeshStandardMaterial({
      color: 0xc97a5b,
      roughness: 0.65,
      metalness: 0.1,
      flatShading: false
    });

    const sculpture = new THREE.Mesh(geometry, material);
    sculpture.scale.set(0.85, 0.85, 0.85);
    scene.add(sculpture);

    // Warm Ambient & Directional Lighting matching paper/clay palette
    const ambientLight = new THREE.AmbientLight(0xf4efe6, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.0);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa65839, 1.5);
    rimLight.position.set(-2, -2, -2);
    scene.add(rimLight);

    // Mouse Tracking Parallax
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    });

    function getBaseX() {
      const aspect = window.innerWidth / window.innerHeight;
      return Math.min(Math.max(aspect * 0.95, 1.25), 1.85);
    }

    // Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Render Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      sculpture.rotation.x += delta * 0.22;
      sculpture.rotation.y += delta * 0.28;

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      const baseX = getBaseX();
      sculpture.position.x = baseX + currentX;
      sculpture.position.y = 0.05 - currentY;

      renderer.render(scene, camera);
    }
    animate();

  } catch (err) {
    // Graceful procedural 2D Canvas fallback if offline or CDN is blocked
    console.warn('Three.js failed to load, falling back to 2D canvas animation:', err);
    initProceduralFallback(canvas);
  }
}

function initProceduralFallback(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let angle = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width * 0.72;
    const cy = canvas.height * 0.45;
    const r = Math.min(canvas.width, canvas.height) * 0.22;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.strokeStyle = 'rgba(201, 122, 91, 0.25)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.ellipse(0, 0, r + i * 18, (r + i * 18) * 0.65, (i * Math.PI) / 5, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    angle += 0.003;
    requestAnimationFrame(draw);
  }
  draw();
}

initHeroScene();
