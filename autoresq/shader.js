// AutoResQ AI - High-Fidelity Interactive 3D Cyber Wave Grid Background
// Features: Dual-layer (fluid colors + synced wireframe grid), vertex displacement noise, and mouse parallax easing.

(function() {
  const canvas = document.getElementById('shader-canvas');
  if (!canvas) return;

  // Set canvas styling
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';

  // Setup Three.js Scene
  const scene = new THREE.Scene();

  // Perspective Camera
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100);
  
  // Set default position for skewed 3D view
  const initialCamX = 0;
  const initialCamY = 3.5;
  const initialCamZ = 6.5;
  camera.position.set(initialCamX, initialCamY, initialCamZ);
  camera.lookAt(0, -0.5, -1);

  // Mouse Parallax variables
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    // Normalise mouse position between -0.5 and 0.5
    targetMouseX = (e.clientX / window.innerWidth) - 0.5;
    targetMouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    solidMaterial.uniforms.u_resolution.value.set(width, height);
    gridMaterial.uniforms.u_resolution.value.set(width, height);
  }

  // Common Vertex Shader for displacement
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vDisplacement;
    uniform float u_time;
    
    // Simplex Noise 3D Implementation
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - D.yyy;

      i = mod(i, 289.0 );
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Multi-frequency noise for organic waves
      vec3 noisePos1 = vec3(pos.xy * 0.08, u_time * 0.2);
      vec3 noisePos2 = vec3(pos.xy * 0.18, u_time * 0.35);
      
      float disp = snoise(noisePos1) * 1.2 + snoise(noisePos2) * 0.4;
      pos.z += disp;
      
      vDisplacement = disp;
      vPosition = pos;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Solid Flow Material Fragment Shader
  const solidFragmentShader = `
    uniform vec2 u_resolution;
    uniform float u_time;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vDisplacement;

    void main() {
      vec2 uv = vUv;
      
      // Cyber Neon Colors
      vec3 colorCyan = vec3(0.0, 0.9, 1.0);     // #00E5FF
      vec3 colorPurple = vec3(0.44, 0.0, 1.0);   // #7000FF
      vec3 colorBlue = vec3(0.0, 0.4, 1.0);     // #0066FF
      vec3 baseBg = vec3(0.02, 0.03, 0.06);     // Dark Obsidian Night

      // Blend weights based on height displacement
      float w1 = smoothstep(-1.2, 1.2, vDisplacement);
      float w2 = smoothstep(-0.2, 1.0, sin(vPosition.y * 0.1 + u_time * 0.2));

      vec3 waveColor = mix(colorBlue, colorPurple, w1);
      waveColor = mix(waveColor, colorCyan, w2 * 0.5);
      
      // Mix with background based on height/distance
      vec3 finalColor = mix(baseBg, waveColor, clamp((vDisplacement + 1.5) * 0.35, 0.0, 1.0));
      
      // Highlight crests
      finalColor += colorCyan * max(0.0, vDisplacement - 0.4) * 0.18;

      // Add a subtle premium grain texture
      float grain = (fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.015;
      finalColor += vec3(grain);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  // Grid Material Fragment Shader (renders lines matching displacement)
  const gridFragmentShader = `
    uniform float u_time;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vDisplacement;

    void main() {
      // Glow wireframe line color (Semi-transparent neon cyan)
      vec3 gridColor = vec3(0.0, 0.9, 1.0);
      
      // Height opacity fade (fade out in valleys)
      float opacity = clamp((vDisplacement + 1.0) * 0.25, 0.05, 0.45);
      
      // Pulse animation along the grid
      float pulse = sin(vPosition.y * 0.3 - u_time * 1.2) * 0.5 + 0.5;
      opacity += pulse * 0.15;

      gl_FragColor = vec4(gridColor, opacity);
    }
  `;

  // Create unified geometry
  const geometry = new THREE.PlaneGeometry(35, 35, 90, 90);

  // 1. Solid Flow Layer
  const solidMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: solidFragmentShader,
    uniforms: {
      u_resolution: { value: new THREE.Vector2() },
      u_time: { value: 0 }
    }
  });
  const solidMesh = new THREE.Mesh(geometry, solidMaterial);
  scene.add(solidMesh);

  // 2. Wireframe Grid Overlay Layer
  const gridMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: gridFragmentShader,
    uniforms: {
      u_resolution: { value: new THREE.Vector2() },
      u_time: { value: 0 }
    },
    wireframe: true,
    transparent: true,
    depthWrite: false
  });
  const gridMesh = new THREE.Mesh(geometry, gridMaterial);
  // Offset grid slightly up to prevent z-fighting with solid layer
  gridMesh.position.z = 0.005;
  scene.add(gridMesh);

  // Rotate both layers together
  const rotationGroup = new THREE.Group();
  rotationGroup.add(solidMesh);
  rotationGroup.add(gridMesh);
  
  // Angle plane backwards into the horizon
  rotationGroup.rotation.x = -68 * Math.PI / 180;
  rotationGroup.rotation.z = -35 * Math.PI / 180;
  scene.add(rotationGroup);

  // Resize initialization
  resize();
  window.addEventListener('resize', resize);

  // Animation loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Update time uniforms
    solidMaterial.uniforms.u_time.value = elapsedTime;
    gridMaterial.uniforms.u_time.value = elapsedTime;

    // Eased mouse parallax tracking
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Apply parallax displacements to camera
    camera.position.x = initialCamX + mouseX * 2.2;
    camera.position.y = initialCamY - mouseY * 1.5;
    camera.lookAt(0, -0.4, -1);

    renderer.render(scene, camera);
  }
  animate();
})();
