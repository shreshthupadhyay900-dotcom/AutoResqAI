// AutoResQ App Controller & Interactions

const lenis = (typeof Lenis !== 'undefined') ? new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
}) : null;

if (lenis) {
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

let currentScreen = 'landing';
let currentDoctorMode = 'photo';
let chatHistory = [
  { sender: 'ai', text: 'Hello. I am your AutoResQ AI Doctor. I have live access to your vehicle telemetry stream. How can I help?' },
  { sender: 'user', text: 'My bike is not starting.' },
  { sender: 'ai', text: 'Is the headlight turning on?', tag: 'Telemetry check initiated' },
  { sender: 'user', text: 'Yes, but the light is dim and I hear a clicking noise.' },
  { sender: 'ai', text: 'Possible battery or starter relay issue detected.', tag: 'Confidence: 87%' }
];
let activeMechanic = null;
let telemetryTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  showScreen('login');
});

function appIcon(name) {
  return `<i data-lucide="${name}" aria-hidden="true"></i>`;
}

function hydrateIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function shouldReduceMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function runScreenMotion(screenId) {
  if (!window.gsap || shouldReduceMotion()) return;

  gsap.killTweensOf('*');

  if (screenId === 'login') {
    gsap.fromTo('.login-left-panel', { opacity: 0, x: -28 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
    gsap.fromTo('.login-form-card', { opacity: 0, y: 22, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out', delay: 0.08 });
    gsap.fromTo('.login-stat', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.55, ease: 'power3.out', delay: 0.25 });
    return;
  }

  if (screenId === 'landing') {
    gsap.fromTo('.landing-nav', { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' });
    gsap.fromTo('.hero-badge, .hero-title, .hero-subtitle, .hero-desc, .hero-ctas', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out', delay: 0.08 });
    gsap.fromTo('.hero-stat-item', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out', delay: 0.48 });
    gsap.fromTo('.landing-section .feature-card, .landing-section .testimonial-card, .product-strip > *', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.05, ease: 'power3.out', delay: 0.12 });
    return;
  }

  gsap.fromTo('.app-header', { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
  gsap.fromTo('.screen-heading, .screen > .glass-card:first-child', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' });
  gsap.fromTo('.screen .glass-card, .screen .feature-card, .screen .stat-tile, .screen .data-row, .screen .quick-nav-card, .screen .mechanic-card, .screen .chat-container, .screen .map-visual-placeholder', {
    opacity: 0,
    y: 18
  }, {
    opacity: 1,
    y: 0,
    duration: 0.58,
    stagger: 0.035,
    ease: 'power3.out',
    delay: 0.08
  });
}

function getSidebarMarkup(screenId) {
  const groups = [
    {
      label: 'Main Console',
      items: [
        ['dashboard', 'layout-dashboard', 'Dashboard'],
        ['ai-doctor', 'stethoscope', 'AI Doctor'],
        ['chat', 'message-circle', 'AI Chat'],
        ['analytics', 'bar-chart-3', 'Analytics']
      ]
    },
    {
      label: 'Vehicle Diagnostics',
      items: [
        ['twin', 'car', 'Digital Twin'],
        ['maintenance', 'calendar-check', 'Maintenance'],
        ['safety', 'shield', 'Safety Score'],
        ['ev', 'plug-zap', 'EV Assist']
      ]
    },
    {
      label: 'Safety & Rescue',
      items: [
        ['sos', 'siren', 'SOS Emergency', 'sos-item'],
        ['mechanic', 'wrench', 'Find Mechanic'],
        ['tracking', 'map-pin', 'Live Tracking'],
        ['night', 'moon', 'Night Safety']
      ]
    }
  ];

  return `
    <aside class="app-sidebar" id="sidebar">
      <div class="sidebar-logo" onclick="showScreen('landing')">
        <span class="brand-mark">${appIcon('shield-check')}</span>
        <span>AutoResQ <span class="highlight">AI</span></span>
      </div>

      <nav class="sidebar-menu">
        ${groups.map(group => `
          <div class="menu-category">${group.label}</div>
          ${group.items.map(([id, icon, label, extra = '']) => `
            <a class="menu-item ${extra} ${screenId === id ? 'active' : ''}" onclick="showScreen('${id}')">
              ${appIcon(icon)} ${label}
            </a>
          `).join('')}
        `).join('')}
      </nav>

      <div class="sidebar-user" onclick="showScreen('profile')">
        <div class="user-avatar">AS</div>
        <div class="user-info">
          <div class="user-name">Aryan Sharma</div>
          <div class="user-role">Premium active</div>
        </div>
      </div>
    </aside>
  `;
}

function showScreen(screenId) {
  if (telemetryTimer) {
    clearInterval(telemetryTimer);
    telemetryTimer = null;
  }

  currentScreen = screenId;
  const appContainer = document.getElementById('app');
  if (!appContainer || !window.AutoResQScreens || !window.AutoResQScreens[screenId]) return;

  if (screenId === 'landing' || screenId === 'login') {
    appContainer.innerHTML = `
      <div class="main-wrapper full-width">
        ${window.AutoResQScreens[screenId]}
      </div>
    `;
  } else {
    appContainer.innerHTML = `
      ${getSidebarMarkup(screenId)}
      <div class="main-wrapper">
        <header class="app-header">
          <div class="header-title">
            <button class="sidebar-toggle" onclick="toggleSidebar()" aria-label="Toggle navigation">${appIcon('menu')}</button>
            <span id="page-title-label">${getPageTitle(screenId)}</span>
          </div>
          <div class="header-actions">
            <button class="btn btn-secondary" onclick="showScreen('night')">${appIcon('moon')} Night Mode</button>
            <button class="btn btn-sos" onclick="showScreen('sos')">${appIcon('siren')} SOS Emergency</button>
          </div>
        </header>
        <main class="screen">
          ${window.AutoResQScreens[screenId]}
        </main>
      </div>
    `;
  }

  hydrateIcons();
  initScreenControllers(screenId);
  init3DParallax();
  runScreenMotion(screenId);

  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('mobile-open');
}

function getPageTitle(screenId) {
  const titles = {
    dashboard: 'Vehicle Telemetry Control',
    'ai-doctor': 'AI Doctor Diagnostics',
    chat: 'Diagnostic Assistant',
    sos: 'Emergency Dispatch SOS',
    mechanic: 'Verified Mechanic Matching',
    tracking: 'Live Responder Tracking',
    twin: 'Vehicle Digital Twin',
    maintenance: 'Predictive Maintenance',
    safety: 'Safety Score and Rewards',
    night: 'Night Road Assist',
    ev: 'EV Intelligence',
    profile: 'Profile and Vehicles',
    analytics: 'Diagnostics Analytics'
  };
  return titles[screenId] || 'AutoResQ AI';
}

function initScreenControllers(screenId) {
  if (screenId === 'dashboard') {
    renderDashboardTelemetryChart();
    animateDashboardCounters();
  } else if (screenId === 'ai-doctor') {
    setupDoctorListeners();
  } else if (screenId === 'chat') {
    renderChatHistory();
  } else if (screenId === 'safety') {
    renderSafetyRadarChart();
  } else if (screenId === 'analytics') {
    renderAnalyticsCharts();
  } else if (screenId === 'tracking') {
    renderTrackingDetails();
  }
}

function handleLogin() {
  const email = document.getElementById('signin-email');
  const password = document.getElementById('signin-password');
  if (!email || !password) return;

  if (!email.value.trim()) {
    shakeInput(email);
    return;
  }

  if (!password.value.trim()) {
    shakeInput(password);
    return;
  }

  const btn = document.querySelector('.login-submit-btn');
  if (btn) {
    btn.textContent = 'Authenticating...';
    btn.disabled = true;
    btn.style.opacity = '0.72';
  }

  setTimeout(() => showScreen('landing'), 900);
}

function handleSignUp() {
  const fname = document.getElementById('signup-fname');
  const email = document.getElementById('signup-email');
  const password = document.getElementById('signup-password');
  const terms = document.getElementById('agree-terms');
  if (!fname || !email || !password) return;

  if (!fname.value.trim()) {
    shakeInput(fname);
    return;
  }
  if (!email.value.trim()) {
    shakeInput(email);
    return;
  }
  if (!password.value || password.value.length < 8) {
    shakeInput(password);
    return;
  }
  if (terms && !terms.checked) {
    const label = terms.closest('.checkbox-label');
    if (label) {
      label.style.color = 'var(--accent-red)';
      setTimeout(() => {
        label.style.color = '';
      }, 1500);
    }
    return;
  }

  const btn = document.querySelector('.login-submit-btn');
  if (btn) {
    btn.textContent = 'Creating profile...';
    btn.disabled = true;
    btn.style.opacity = '0.72';
  }

  setTimeout(() => showScreen('landing'), 1000);
}

function switchAuthTab(tab) {
  const signinForm = document.getElementById('form-signin');
  const signupForm = document.getElementById('form-signup');
  const tabSignin = document.getElementById('tab-signin');
  const tabSignup = document.getElementById('tab-signup');
  if (!signinForm || !signupForm || !tabSignin || !tabSignup) return;

  const signingIn = tab === 'signin';
  signinForm.style.display = signingIn ? 'block' : 'none';
  signupForm.style.display = signingIn ? 'none' : 'block';
  tabSignin.classList.toggle('active', signingIn);
  tabSignup.classList.toggle('active', !signingIn);

  hydrateIcons();
  if (window.gsap && !shouldReduceMotion()) {
    gsap.fromTo(signingIn ? signinForm : signupForm, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
  }
}

function togglePwdVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input || !btn) return;

  const showing = input.type === 'password';
  input.type = showing ? 'text' : 'password';
  btn.setAttribute('aria-label', showing ? 'Hide password' : 'Show password');
  btn.innerHTML = appIcon(showing ? 'eye-off' : 'eye');
  hydrateIcons();
}

function handleSocialLogin(eventOrProvider, providerArg) {
  const provider = providerArg || eventOrProvider || 'provider';
  const btn = providerArg && eventOrProvider ? eventOrProvider.currentTarget : event.currentTarget;
  if (btn) {
    btn.textContent = `Connecting to ${provider}...`;
    btn.disabled = true;
  }
  setTimeout(() => showScreen('landing'), 850);
}

function shakeInput(el) {
  el.style.borderColor = 'var(--accent-red)';
  el.style.animation = 'shakeInput 0.4s ease';
  el.focus();
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.animation = '';
  }, 1300);
}

function animateDashboardCounters() {
  const scoreVal = document.getElementById('dash-main-score');
  if (!scoreVal) return;

  if (window.gsap && !shouldReduceMotion()) {
    const state = { value: 0 };
    gsap.to(state, {
      value: 92,
      duration: 1.1,
      ease: 'power2.out',
      onUpdate: () => {
        scoreVal.textContent = Math.round(state.value);
      }
    });
    return;
  }

  scoreVal.textContent = '92';
}

function renderDashboardTelemetryChart() {
  const ctx = document.getElementById('telemetryChart');
  if (!ctx || typeof Chart === 'undefined') return;

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['12:35', '12:36', '12:37', '12:38', '12:39', '12:40', '12:41'],
      datasets: [
        {
          label: 'Inverter Temp (C)',
          data: [38, 40, 42, 41, 39, 42, 43],
          borderColor: '#89ffdb',
          backgroundColor: 'rgba(137, 255, 219, 0.08)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointBackgroundColor: '#89ffdb'
        },
        {
          label: 'Cell Voltage Integrity (%)',
          data: [98.2, 98.1, 98.2, 98.4, 98.3, 98.2, 98.3],
          borderColor: '#ffc458',
          backgroundColor: 'rgba(255, 196, 88, 0.08)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointBackgroundColor: '#ffc458'
        }
      ]
    },
    options: chartOptions()
  });

  telemetryTimer = setInterval(() => {
    if (currentScreen !== 'dashboard') {
      clearInterval(telemetryTimer);
      telemetryTimer = null;
      return;
    }

    const nextTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const nextTemp = Math.floor(40 + Math.random() * 6);
    const nextVolt = parseFloat((98 + Math.random() * 0.5).toFixed(1));

    chart.data.labels.shift();
    chart.data.labels.push(nextTime);
    chart.data.datasets[0].data.shift();
    chart.data.datasets[0].data.push(nextTemp);
    chart.data.datasets[1].data.shift();
    chart.data.datasets[1].data.push(nextVolt);
    chart.update();
  }, 3000);
}

function chartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#a6b5bc',
          font: { family: 'Inter', size: 12 }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.045)' },
        ticks: { color: '#a6b5bc' }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.045)' },
        ticks: { color: '#a6b5bc' }
      }
    }
  };
}

function setupDoctorListeners() {
  const dragZone = document.getElementById('diagnostic-drag-zone');
  const fileInput = document.getElementById('doctor-file-input');
  if (!dragZone || !fileInput) return;

  dragZone.addEventListener('click', () => {
    if (currentDoctorMode !== 'sound') fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      simulateDoctorAnalysis(e.target.files[0].name);
    }
  });
}

function setDoctorMode(mode, btn) {
  currentDoctorMode = mode;
  document.querySelectorAll('.option-select-btn').forEach((option) => option.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const dragZone = document.getElementById('diagnostic-drag-zone');
  if (!dragZone) return;

  if (mode === 'sound') {
    dragZone.innerHTML = `
      <span class="drag-icon">${appIcon('mic')}</span>
      <div>
        <h3 class="font-display">Record engine audio</h3>
        <p style="font-size: 13px; margin-top: 6px;">A 5-second sample checks belt squeal, brake scrape, relay clicks, and knock patterns.</p>
      </div>
      <button class="btn btn-primary" onclick="startAudioRecordingSim(event)">${appIcon('radio')} Record Sample</button>
    `;
  } else if (mode === 'warning') {
    dragZone.innerHTML = `
      <span class="drag-icon">${appIcon('triangle-alert')}</span>
      <div>
        <h3 class="font-display">Upload dashboard warning</h3>
        <p style="font-size: 13px; margin-top: 6px;">Use a clear photo of the symbol and surrounding cluster.</p>
      </div>
      <button class="btn btn-secondary">${appIcon('folder-open')} Select Image</button>
    `;
  } else {
    dragZone.innerHTML = `
      <span class="drag-icon">${appIcon('upload-cloud')}</span>
      <div>
        <h3 class="font-display">Drop diagnostic evidence</h3>
        <p style="font-size: 13px; margin-top: 6px;">Supports images, warning-light photos, WAV, MP3, and telemetry captures.</p>
      </div>
      <button class="btn btn-secondary">${appIcon('folder-open')} Select File</button>
    `;
  }

  hydrateIcons();
}

function startAudioRecordingSim(event) {
  event.stopPropagation();
  const dragZone = document.getElementById('diagnostic-drag-zone');
  if (!dragZone) return;

  dragZone.innerHTML = `
    <span class="drag-icon" style="color: var(--accent-red);">${appIcon('mic')}</span>
    <div>
      <h3 class="font-display text-red">Recording engine sound...</h3>
      <p style="font-size: 13px; margin-top: 6px;">Keep the phone near the engine bay and hold throttle steady.</p>
    </div>
    <div style="width: 140px; height: 4px; background: rgba(255,255,255,0.12); border-radius: 999px; overflow: hidden;">
      <div style="width: 100%; height: 100%; background: var(--accent-red); animation: lineProgress 5s linear forwards;"></div>
    </div>
  `;
  hydrateIcons();

  setTimeout(() => simulateDoctorAnalysis('engine_acoustic_log.wav'), 5000);
}

function simulateDoctorAnalysis(filename) {
  const statusTag = document.getElementById('diagnostic-status-tag');
  const placeholder = document.getElementById('ai-diagnostic-placeholder');
  const results = document.getElementById('ai-diagnostic-results-content');
  if (!statusTag || !placeholder || !results) return;

  placeholder.style.display = 'none';
  results.style.display = 'none';
  statusTag.innerHTML = `${appIcon('loader')} Analyzing`;
  statusTag.className = 'pill amber';
  hydrateIcons();

  setTimeout(() => {
    statusTag.innerHTML = `${appIcon('check')} Analysis complete`;
    statusTag.className = 'pill green';
    results.style.display = 'block';
    hydrateIcons();

    const nameLabel = document.getElementById('predicted-issue-name');
    const descLabel = document.getElementById('predicted-issue-desc');
    const costLabel = document.getElementById('predicted-issue-cost');
    const riskLabel = document.getElementById('predicted-issue-risk');
    const fillBar = document.getElementById('severity-meter-fill');
    const scoreVal = document.getElementById('severity-score-val');
    if (!nameLabel || !descLabel || !costLabel || !riskLabel || !fillBar || !scoreVal) return;

    if (currentDoctorMode === 'photo') {
      nameLabel.textContent = 'Alternator drive belt wear';
      descLabel.textContent = `Visual telemetry from "${filename}" shows rib cracking near the secondary pulley guide.`;
      costLabel.textContent = '$120 - $185';
      riskLabel.textContent = 'Medium / 5k mi';
      fillBar.style.width = '60%';
      scoreVal.textContent = 'Moderate (60%)';
      scoreVal.className = 'pill amber';
    } else if (currentDoctorMode === 'warning') {
      nameLabel.textContent = 'Coolant pressure drop';
      descLabel.textContent = 'The warning cluster points to low coolant-loop pressure. Thermostat and hose inspection should happen immediately.';
      costLabel.textContent = '$90 - $140';
      riskLabel.textContent = 'Immediate';
      fillBar.style.width = '85%';
      scoreVal.textContent = 'High risk (85%)';
      scoreVal.className = 'pill red';
    } else {
      nameLabel.textContent = 'Brake pad friction degradation';
      descLabel.textContent = 'The acoustic sample shows a 2100 Hz rotor squeal during low-speed deceleration cycles.';
      costLabel.textContent = '$220 - $350';
      riskLabel.textContent = 'Low / mid term';
      fillBar.style.width = '35%';
      scoreVal.textContent = 'Low risk (35%)';
      scoreVal.className = 'pill green';
    }

    if (window.gsap && !shouldReduceMotion()) {
      gsap.fromTo(results, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
    }
  }, 1400);
}

function escapeHTML(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderChatHistory() {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  container.innerHTML = chatHistory.map((msg) => `
    <div class="chat-bubble ${msg.sender}">
      ${escapeHTML(msg.text)}
      ${msg.tag ? `<br/><span class="chat-confidence-badge">${escapeHTML(msg.tag)}</span>` : ''}
    </div>
  `).join('');
  container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('chat-user-input');
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  chatHistory.push({ sender: 'user', text });
  input.value = '';
  renderChatHistory();

  setTimeout(() => {
    let reply = 'Checking telemetry. Can you confirm whether a dashboard warning light is currently illuminated?';
    let confidence = 'Telemetry check active';

    const lower = text.toLowerCase();
    if (lower.includes('battery')) {
      reply = 'The 12V battery shows a 12.1V resting reading. That usually means low charge reserve, not total failure.';
      confidence = 'OBD telemetry checked';
    } else if (lower.includes('tire') || lower.includes('pressure')) {
      reply = 'Front-right tire pressure reads 32 PSI, inside the safe variance band. Watch for slow leakage if it drops again.';
      confidence = 'Tire sensors active';
    } else if (lower.includes('start')) {
      reply = 'Dim light plus clicking strongly points to starter relay trouble or battery voltage drop under load.';
      confidence = '87% match probability';
    } else if (lower.includes('brake')) {
      reply = 'If the brake warning is active, avoid highway driving until pad depth and fluid pressure are checked.';
      confidence = 'Safety priority response';
    }

    chatHistory.push({ sender: 'ai', text: reply, tag: confidence });
    renderChatHistory();
  }, 750);
}

function handleChatKey(event) {
  if (event.key === 'Enter') sendChatMessage();
}

function simulateChatQuestion(question) {
  const input = document.getElementById('chat-user-input');
  if (!input) return;
  input.value = question;
  sendChatMessage();
}

function resetChat() {
  chatHistory = [
    { sender: 'ai', text: 'Hello. I am your AutoResQ AI Doctor. I have live access to your vehicle telemetry stream. How can I help?' }
  ];
  renderChatHistory();
}

function triggerEmergencySOS() {
  alert('Emergency SOS activated. Routing your vehicle profile to dispatch and opening nearby mechanic offers.');
  showScreen('mechanic');
}

function dispatchMechanic(name, eta, dist, fee) {
  activeMechanic = { name, eta, dist, fee };
  alert(`Dispatch confirmed with ${name}. Opening live tracking.`);
  showScreen('tracking');
}

function renderTrackingDetails() {
  if (activeMechanic) {
    const nameEl = document.getElementById('dispatch-name');
    const etaEl = document.getElementById('dispatch-eta');
    const distEl = document.getElementById('dispatch-dist');
    if (nameEl) nameEl.textContent = activeMechanic.name;
    if (etaEl) etaEl.textContent = activeMechanic.eta;
    if (distEl) distEl.textContent = activeMechanic.dist;
  }

  const marker = document.getElementById('map-mechanic-marker');
  if (!marker) return;

  let top = 188;
  let left = 320;
  const interval = setInterval(() => {
    if (currentScreen !== 'tracking') {
      clearInterval(interval);
      return;
    }

    if (top < 338) top += 2.5;
    if (left < 488) left += 2.8;
    marker.style.top = `${top}px`;
    marker.style.left = `${left}px`;

    if (top >= 330 && left >= 480) {
      clearInterval(interval);
      const etaEl = document.getElementById('dispatch-eta');
      if (etaEl) etaEl.textContent = 'Arrived';
    }
  }, 1200);
}

function showTwinSpec(title, status, desc) {
  const titleEl = document.getElementById('twin-spec-title');
  const statusEl = document.getElementById('twin-spec-status');
  const descEl = document.getElementById('twin-spec-desc');
  if (!titleEl || !statusEl || !descEl) return;

  titleEl.textContent = title;
  statusEl.textContent = `Status: ${status}`;
  statusEl.className = (status === 'Optimal' || status === 'Online' || status === '92%') ? 'text-green' : 'text-cyan';
  descEl.textContent = desc;

  if (window.gsap && !shouldReduceMotion()) {
    gsap.fromTo('#twin-details-card', { opacity: 0.55, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
  }
}

function renderSafetyRadarChart() {
  const ctx = document.getElementById('safetyRadarChart');
  if (!ctx || typeof Chart === 'undefined') return;

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Vehicle Age', 'Maintenance', 'Battery', 'Brakes', 'Tires', 'Sensors'],
      datasets: [{
        label: 'Safety Profile',
        data: [82, 95, 90, 83, 94, 88],
        borderColor: '#89ffdb',
        backgroundColor: 'rgba(137, 255, 219, 0.14)',
        borderWidth: 2,
        pointBackgroundColor: '#89ffdb'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          angleLines: { color: 'rgba(255,255,255,0.08)' },
          grid: { color: 'rgba(255,255,255,0.08)' },
          pointLabels: { color: '#a6b5bc', font: { family: 'Space Grotesk', size: 11 } },
          ticks: { display: false }
        }
      }
    }
  });
}

function simulateNightNav(hubType) {
  alert(`Routing high-contrast navigation to the closest ${hubType}.`);
}

function renderAnalyticsCharts() {
  const healthCtx = document.getElementById('analyticsHealthChart');
  const riskCtx = document.getElementById('analyticsRiskChart');

  if (healthCtx && typeof Chart !== 'undefined') {
    new Chart(healthCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Prediction Precision (%)',
          data: [94.2, 93.8, 95.1, 94.9, 95.8, 96.1],
          backgroundColor: 'rgba(137, 255, 219, 0.42)',
          borderColor: '#89ffdb',
          borderWidth: 1.5
        }]
      },
      options: chartOptions()
    });
  }

  if (riskCtx && typeof Chart !== 'undefined') {
    new Chart(riskCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [{
          label: 'Wear Factor',
          data: [0.12, 0.14, 0.15, 0.12, 0.11, 0.08],
          borderColor: '#ff5863',
          backgroundColor: 'rgba(255, 88, 99, 0.08)',
          fill: true,
          tension: 0.35
        }]
      },
      options: chartOptions()
    });
  }
}

function init3DParallax() {
  if (shouldReduceMotion()) return;

  const cards = document.querySelectorAll('.glass-card, .feature-card, .quick-nav-card, .vital-card, .testimonial-card, .stat-tile');
  cards.forEach((card) => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    card.style.transition = 'transform 0.12s ease';
    card.style.transformStyle = 'preserve-3d';

    const inner = card.querySelector('.feature-icon-wrap, .vital-circle-container, .score-dial-wrap, .quick-nav-icon, .brand-mark, h3, h2');
    if (inner) {
      inner.style.transition = 'transform 0.12s ease';
      inner.style.transform = 'translate3d(0,0,0)';
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) - 0.5;
      const py = (y / rect.height) - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg) translateY(-2px)`;
      if (inner) inner.style.transform = `translate3d(${px * 8}px, ${py * 8}px, 18px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      if (inner) {
        inner.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        inner.style.transform = 'translate3d(0,0,0)';
      }
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.12s ease';
      if (inner) inner.style.transition = 'transform 0.12s ease';
    });
  });
}
