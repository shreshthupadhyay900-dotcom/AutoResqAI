// AutoResQ AI Screens Definition - Rescue Command OS
const I = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

const brand = () => `
  <div class="nav-logo" onclick="showScreen('landing')">
    <span class="brand-mark">${I('shield-check')}</span>
    <span class="brand-name">AutoResQ <span class="highlight">AI</span></span>
  </div>
`;

const metricTile = (label, value, note, tone = 'text-cyan') => `
  <div class="stat-tile">
    <div class="label">${label}</div>
    <div class="value ${tone}" style="margin-top: 10px;">${value}</div>
    <p class="row-copy">${note}</p>
  </div>
`;

const pageHeading = (kicker, title, copy, action = '') => `
  <div class="screen-heading">
    <div>
      <span class="screen-kicker">${kicker}</span>
      <h2 class="screen-title">${title}</h2>
      <p class="screen-copy">${copy}</p>
    </div>
    ${action}
  </div>
`;

window.AutoResQScreens = {
  login: `
    <div class="login-page-wrap">
      <div class="login-left-panel">
        <div class="login-brand-logo">
          <span class="brand-mark">${I('shield-check')}</span>
          <span class="login-brand-name">AutoResQ <span class="highlight">AI</span></span>
        </div>

        <div class="login-tagline-block">
          <div class="login-tag-pill pill">${I('radio')} Rescue command network</div>
          <h1 class="login-hero-headline">A safer drive starts before the fault.</h1>
          <p class="login-hero-subtext">Live diagnostics, roadside dispatch, verified mechanics, and emergency routing in one focused vehicle command system.</p>
        </div>

        <div class="login-stats-row">
          <div class="login-stat">
            <span class="login-stat-val">50K+</span>
            <span class="login-stat-label">Vehicles guarded</span>
          </div>
          <div class="login-stat">
            <span class="login-stat-val">8 min</span>
            <span class="login-stat-label">Fastest response</span>
          </div>
          <div class="login-stat">
            <span class="login-stat-val">95%</span>
            <span class="login-stat-label">Issue match rate</span>
          </div>
        </div>
      </div>

      <div class="login-right-panel">
        <div class="login-form-card glass-card">
          <div class="login-tab-row">
            <button class="login-tab active" id="tab-signin" onclick="switchAuthTab('signin')">Sign In</button>
            <button class="login-tab" id="tab-signup" onclick="switchAuthTab('signup')">Create Account</button>
          </div>

          <div id="form-signin">
            <h2 class="login-form-title">Welcome back</h2>
            <p class="login-form-subtitle">Access your vehicle rescue console.</p>

            <div class="social-login-row">
              <button class="social-btn" onclick="handleSocialLogin(event, 'Google')">${I('chrome')} Google</button>
              <button class="social-btn" onclick="handleSocialLogin(event, 'Apple')">${I('badge-check')} Apple</button>
            </div>

            <div class="auth-divider"><span>or email</span></div>

            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" id="signin-email" placeholder="aryan@autoresq.ai" />
            </div>
            <div class="form-group">
              <label class="form-label" style="display:flex; justify-content:space-between;">
                Password
                <a class="forgot-link">Reset access</a>
              </label>
              <div class="password-input-wrap">
                <input type="password" class="form-input" id="signin-password" placeholder="Enter your password" onkeydown="if(event.key==='Enter') handleLogin()" />
                <button class="pwd-toggle" onclick="togglePwdVisibility('signin-password', this)" aria-label="Show password">${I('eye')}</button>
              </div>
            </div>

            <div class="remember-row">
              <label class="checkbox-label">
                <input type="checkbox" id="remember-me" checked />
                <span class="checkmark"></span>
                Keep this command console signed in
              </label>
            </div>

            <button class="btn btn-primary login-submit-btn" onclick="handleLogin()">${I('log-in')} Enter Command OS</button>

            <p class="login-switch-text">New driver? <a onclick="switchAuthTab('signup')">Create a free profile</a></p>
          </div>

          <div id="form-signup" style="display:none;">
            <h2 class="login-form-title">Create profile</h2>
            <p class="login-form-subtitle">Connect a vehicle and activate rescue coverage.</p>

            <div class="form-row-2">
              <div class="form-group">
                <label class="form-label">First Name</label>
                <input type="text" class="form-input" id="signup-fname" placeholder="Aryan" />
              </div>
              <div class="form-group">
                <label class="form-label">Last Name</label>
                <input type="text" class="form-input" id="signup-lname" placeholder="Sharma" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" id="signup-email" placeholder="aryan@autoresq.ai" />
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <div class="phone-input-wrap">
                <span class="phone-prefix">+1</span>
                <input type="tel" class="form-input phone-input" id="signup-phone" placeholder="555 018 2241" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Create Password</label>
              <div class="password-input-wrap">
                <input type="password" class="form-input" id="signup-password" placeholder="Min. 8 characters" />
                <button class="pwd-toggle" onclick="togglePwdVisibility('signup-password', this)" aria-label="Show password">${I('eye')}</button>
              </div>
            </div>

            <div class="terms-row">
              <label class="checkbox-label">
                <input type="checkbox" id="agree-terms" />
                <span class="checkmark"></span>
                I agree to the <a>Terms</a> and <a>Privacy Policy</a>
              </label>
            </div>

            <button class="btn btn-primary login-submit-btn" onclick="handleSignUp()">${I('user-plus')} Create Rescue Profile</button>
            <p class="login-switch-text">Already covered? <a onclick="switchAuthTab('signin')">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  `,

  landing: `
    <nav class="landing-nav">
      ${brand()}
      <div class="landing-nav-actions">
        <a class="landing-nav-link" onclick="showScreen('ai-doctor')">Diagnostics</a>
        <a class="landing-nav-link" onclick="showScreen('mechanic')">Mechanics</a>
        <a class="landing-nav-link" onclick="showScreen('login')">Sign out</a>
        <button class="btn btn-primary" onclick="showScreen('dashboard')">${I('layout-dashboard')} Launch App</button>
      </div>
    </nav>

    <section class="landing-hero">
      <div class="hero-content">
        <div class="hero-badge pill">${I('scan-line')} Live roadside command system</div>
        <h1 class="hero-title">AutoResQ AI</h1>
        <div class="hero-subtitle">Predict faults. Dispatch help. Keep moving.</div>
        <p class="hero-desc">A rescue-first vehicle platform that reads telemetry, explains faults, finds verified technicians, and turns emergency support into a clear, trackable workflow.</p>
        <div class="hero-ctas">
          <button class="btn btn-sos" onclick="showScreen('sos')">${I('siren')} Activate SOS</button>
          <button class="btn btn-secondary" onclick="showScreen('dashboard')">${I('gauge')} View Command Center</button>
        </div>
        <div class="hero-stats">
          <div class="hero-stat-item glass-card">
            <span class="hero-stat-val">92/100</span>
            <span class="hero-stat-label">Current vehicle score</span>
          </div>
          <div class="hero-stat-item glass-card">
            <span class="hero-stat-val">8 min</span>
            <span class="hero-stat-label">Nearest responder</span>
          </div>
          <div class="hero-stat-item glass-card">
            <span class="hero-stat-val">24/7</span>
            <span class="hero-stat-label">Emergency network</span>
          </div>
        </div>
      </div>
    </section>

    <section class="landing-section">
      <div class="section-header">
        <span class="section-tag">${I('activity')} New concept</span>
        <h2 class="section-title">Rescue Command OS for drivers</h2>
        <p class="section-subtitle">The site now behaves less like a promo page and more like an operational console: fast route changes, clear states, dense panels, and focused assistance workflows.</p>
      </div>
      <div class="features-grid">
        <div class="feature-card"><div class="feature-icon-wrap">${I('stethoscope')}</div><h3>AI fault triage</h3><p>Photo, warning-light, audio, and telemetry inputs resolve into severity, cost range, and next action.</p></div>
        <div class="feature-card"><div class="feature-icon-wrap">${I('siren')}</div><h3>Emergency dispatch</h3><p>GPS, vehicle state, profile, and contact details are bundled into a single SOS handoff.</p></div>
        <div class="feature-card"><div class="feature-icon-wrap">${I('route')}</div><h3>Live response map</h3><p>Track the responder, distance, ETA, and dispatch log from acceptance to arrival.</p></div>
        <div class="feature-card"><div class="feature-icon-wrap">${I('calendar-check')}</div><h3>Predictive upkeep</h3><p>Maintenance windows use usage, thermal load, battery health, and risk history.</p></div>
        <div class="feature-card"><div class="feature-icon-wrap">${I('shield')}</div><h3>Safety scoring</h3><p>A composite score summarizes risk, rewards, braking behavior, and service reliability.</p></div>
        <div class="feature-card"><div class="feature-icon-wrap">${I('plug-zap')}</div><h3>EV road assist</h3><p>Battery range, charging options, mobile charging requests, and route confidence in one view.</p></div>
      </div>
    </section>

    <section class="landing-section alt">
      <div class="product-strip">
        <div class="visual-panel glass-card" aria-label="AutoResQ AI command visual"></div>
        <div class="glass-card">
          <span class="section-tag">${I('radar')} Bottom beam system</span>
          <h2 class="section-title" style="font-size: clamp(26px, 3vw, 38px);">Built around the moment something goes wrong</h2>
          <p class="section-subtitle">Every page is now shaped around what a stranded driver needs next: understand the fault, choose an action, dispatch help, and track resolution.</p>
          <div class="grid-2 margin-t-24">
            ${metricTile('Signal', 'Live', 'OBD link and GPS stream are active.', 'text-green')}
            ${metricTile('Responder', '8m', 'Closest verified mobile technician.', 'text-yellow')}
          </div>
        </div>
      </div>
    </section>

    <section class="landing-section">
      <div class="section-header">
        <span class="section-tag">${I('message-square-quote')} Driver proof</span>
        <h2 class="section-title">Clear outcomes, not vague alerts</h2>
      </div>
      <div class="testimonials-slider">
        <div class="testimonial-card">
          <p class="testimonial-quote">"The app separated a weak battery from a starter issue before I called anyone. The dispatch estimate was accurate within two minutes."</p>
          <div class="testimonial-user"><div class="testimonial-avatar">MS</div><div><div class="testimonial-name">Marcus Sterling</div><div class="testimonial-car">Model S owner</div></div></div>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-quote">"SOS gave my exact location, vehicle details, and mechanic tracking without making me explain the same problem twice."</p>
          <div class="testimonial-user"><div class="testimonial-avatar" style="background: var(--accent-yellow);">SJ</div><div><div class="testimonial-name">Sarah Jenkins</div><div class="testimonial-car">Rivian R1S owner</div></div></div>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-quote">"The maintenance planner caught my 12V battery drop before a long trip. I handled it on my schedule, not on the shoulder."</p>
          <div class="testimonial-user"><div class="testimonial-avatar" style="background: var(--accent-red); color: white;">DK</div><div><div class="testimonial-name">David Kovic</div><div class="testimonial-car">Taycan owner</div></div></div>
        </div>
      </div>
    </section>

    <footer class="premium-footer">
      <div class="footer-top">
        <div class="footer-brand">${brand()}<p>Vehicle rescue, diagnostics, and dispatch operations for modern drivers.</p></div>
        <div class="footer-links-col">
          <h4>Platform</h4>
          <ul>
            <li><a onclick="showScreen('dashboard')">Dashboard</a></li>
            <li><a onclick="showScreen('ai-doctor')">AI Doctor</a></li>
            <li><a onclick="showScreen('tracking')">Live Tracking</a></li>
            <li><a onclick="showScreen('ev')">EV Assist</a></li>
          </ul>
        </div>
        <div class="footer-links-col">
          <h4>Safety</h4>
          <ul>
            <li><a onclick="showScreen('sos')">SOS</a></li>
            <li><a onclick="showScreen('night')">Night Mode</a></li>
            <li><a onclick="showScreen('safety')">Safety Score</a></li>
            <li><a onclick="showScreen('maintenance')">Maintenance</a></li>
          </ul>
        </div>
        <div class="footer-newsletter">
          <h4>Command updates</h4>
          <p>Get vehicle safety notes and product releases.</p>
          <div class="footer-input-wrap"><input type="email" placeholder="name@domain.com" /><button class="btn btn-primary">Join</button></div>
        </div>
      </div>
      <div class="footer-bottom">
        <div>Copyright 2026 AutoResQ AI. All rights reserved.</div>
        <div style="display:flex; gap:18px; flex-wrap:wrap;"><a>Privacy</a><a>Terms</a><a>Status</a></div>
      </div>
    </footer>
  `,

  dashboard: `
    ${pageHeading(`${I('layout-dashboard')} Command center`, 'Vehicle Telemetry Control', 'A focused operations dashboard for live vehicle health, active risks, service timing, and emergency readiness.', `<button class="btn btn-sos" onclick="showScreen('sos')">${I('siren')} SOS Ready</button>`)}
    <div class="dashboard-grid">
      <div class="dashboard-left">
        <div class="glass-card status-hero-card">
          <div>
            <span class="screen-kicker">${I('radio')} Active OBD secure link</span>
            <h3 class="font-display" style="font-size: 30px; margin-top: 10px;">Tesla Model Y Rescue Profile</h3>
            <p style="margin-top: 8px;">Diagnostics normal. Tire and battery readings are inside safe operating range.</p>
            <div class="health-badge margin-t-24">${I('shield-check')} Vehicle health excellent</div>
          </div>
          <div class="score-dial-wrap">
            <svg width="150" height="150" class="svg-progress" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="62" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="10"/>
              <circle cx="75" cy="75" r="62" fill="none" stroke="#89ffdb" stroke-width="10" stroke-dasharray="389" stroke-dashoffset="31" stroke-linecap="round"/>
            </svg>
            <div class="score-dial-num"><div><span id="dash-main-score">92</span><label>Health Score</label></div></div>
          </div>
        </div>

        <div class="vital-indicators-grid">
          <div class="glass-card vital-card"><div class="vital-circle-container"><svg width="86" height="86" class="svg-progress"><circle cx="43" cy="43" r="35" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6"/><circle cx="43" cy="43" r="35" fill="none" stroke="#89ffdb" stroke-width="6" stroke-dasharray="220" stroke-dashoffset="22" stroke-linecap="round"/></svg><div class="vital-circle-value text-cyan">90%</div></div><div class="vital-name">Battery</div><div class="vital-status">Optimal</div></div>
          <div class="glass-card vital-card"><div class="vital-circle-container"><svg width="86" height="86" class="svg-progress"><circle cx="43" cy="43" r="35" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6"/><circle cx="43" cy="43" r="35" fill="none" stroke="#66a3ff" stroke-width="6" stroke-dasharray="220" stroke-dashoffset="11" stroke-linecap="round"/></svg><div class="vital-circle-value text-blue">95%</div></div><div class="vital-name">Motor</div><div class="vital-status">Stable</div></div>
          <div class="glass-card vital-card"><div class="vital-circle-container"><svg width="86" height="86" class="svg-progress"><circle cx="43" cy="43" r="35" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6"/><circle cx="43" cy="43" r="35" fill="none" stroke="#ffc458" stroke-width="6" stroke-dasharray="220" stroke-dashoffset="37" stroke-linecap="round"/></svg><div class="vital-circle-value text-yellow">83%</div></div><div class="vital-name">Brakes</div><div class="vital-status" style="color: var(--accent-yellow);">Watch</div></div>
          <div class="glass-card vital-card"><div class="vital-circle-container"><svg width="86" height="86" class="svg-progress"><circle cx="43" cy="43" r="35" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6"/><circle cx="43" cy="43" r="35" fill="none" stroke="#5ff2a5" stroke-width="6" stroke-dasharray="220" stroke-dashoffset="13" stroke-linecap="round"/></svg><div class="vital-circle-value text-green">94%</div></div><div class="vital-name">Tires</div><div class="vital-status">Optimal</div></div>
        </div>

        <div class="glass-card">
          <div class="flex-between margin-b-16"><h3 class="font-display">Live Telemetry Stream</h3><span class="label">Auto-refreshing</span></div>
          <div class="chart-container-canvas"><canvas id="telemetryChart"></canvas></div>
        </div>
      </div>

      <div class="dashboard-right">
        <div class="glass-card">
          <h3 class="font-display margin-b-16">Priority Alerts</h3>
          <div class="stack">
            <div class="data-row"><div class="row-main"><div class="row-title text-yellow">Insurance renewal</div><div class="row-copy">Policy expires in 18 days.</div></div><button class="btn btn-secondary" onclick="showScreen('safety')">Review</button></div>
            <div class="data-row"><div class="row-main"><div class="row-title text-cyan">Cabin filter service</div><div class="row-copy">Predicted service window opens in 24 days.</div></div><button class="btn btn-secondary" onclick="showScreen('maintenance')">Plan</button></div>
            <div class="data-row"><div class="row-main"><div class="row-title">Annual inspection</div><div class="row-copy">Checklist due in 12 days.</div></div><button class="btn btn-secondary" onclick="showScreen('mechanic')">Book</button></div>
          </div>
        </div>

        <div class="glass-card">
          <h3 class="font-display margin-b-16">Telemetry Timeline</h3>
          <div class="timeline-wrap">
            <div class="timeline-item"><div class="timeline-dot">${I('check')}</div><div><span class="timeline-time">Today, 10:14 AM</span><h4 class="timeline-title">OBD link synced</h4><p class="timeline-desc">Full diagnostic report processed. Score maintained at 92/100.</p></div></div>
            <div class="timeline-item"><div class="timeline-dot">${I('zap')}</div><div><span class="timeline-time">Yesterday, 4:45 PM</span><h4 class="timeline-title">Predictive alert cleared</h4><p class="timeline-desc">Front-right tire pressure recalibrated after refill.</p></div></div>
            <div class="timeline-item"><div class="timeline-dot">${I('wrench')}</div><div><span class="timeline-time">June 08, 2026</span><h4 class="timeline-title">Suspension tuning</h4><p class="timeline-desc">Air-suspension compression metrics updated via AutoResQ link.</p></div></div>
          </div>
        </div>
      </div>
    </div>
  `,

  'ai-doctor': `
    ${pageHeading(`${I('stethoscope')} AI doctor`, 'Diagnostic Intake', 'Upload a vehicle photo, dashboard warning, or engine sound. The diagnostic core returns severity, likely issue, cost, and next action.')}
    <div class="dashboard-grid">
      <div class="dashboard-left">
        <div class="glass-card">
          <div class="drag-zone" id="diagnostic-drag-zone">
            <span class="drag-icon">${I('upload-cloud')}</span>
            <div>
              <h3 class="font-display">Drop diagnostic evidence</h3>
              <p style="font-size: 13px; margin-top: 6px;">Supports images, warning-light photos, WAV, MP3, and telemetry captures.</p>
            </div>
            <button class="btn btn-secondary">${I('folder-open')} Select File</button>
          </div>
          <input type="file" id="doctor-file-input" style="display:none;" accept="image/*,audio/*" />

          <div class="options-row">
            <div class="option-select-btn active" onclick="setDoctorMode('photo', this)">${I('image')}<div style="font-weight:800; font-size:13px;">Vehicle Photo</div></div>
            <div class="option-select-btn" onclick="setDoctorMode('warning', this)">${I('triangle-alert')}<div style="font-weight:800; font-size:13px;">Warning Symbol</div></div>
            <div class="option-select-btn" onclick="setDoctorMode('sound', this)">${I('mic')}<div style="font-weight:800; font-size:13px;">Engine Sound</div></div>
          </div>
        </div>
      </div>

      <div class="dashboard-right">
        <div class="glass-card glow-cyan" id="ai-doctor-results">
          <div class="flex-between margin-b-16">
            <h3 class="font-display">Diagnostic Core</h3>
            <span id="diagnostic-status-tag" class="health-badge">${I('scan-line')} Ready to scan</span>
          </div>

          <div id="ai-diagnostic-placeholder" style="text-align:center; padding: 46px 10px;">
            <span class="drag-icon" style="margin-bottom: 16px;">${I('bot')}</span>
            <h4 class="font-display">Waiting for evidence</h4>
            <p style="font-size: 13px; margin-top: 8px;">Severity, repair cost, and mechanic match appear here after analysis.</p>
          </div>

          <div id="ai-diagnostic-results-content" style="display:none;">
            <div class="margin-b-16">
              <div class="flex-between"><span class="label">System severity</span><span id="severity-score-val" class="pill amber">Moderate (60%)</span></div>
              <div class="severity-meter-bg"><div id="severity-meter-fill" class="severity-meter-fill"></div></div>
            </div>
            <div class="data-row margin-b-16" style="align-items:flex-start;"><div><div class="label">Issue prediction</div><h4 id="predicted-issue-name" class="font-display" style="font-size:20px; margin-top:6px;">Alternator drive belt wear</h4><p id="predicted-issue-desc" style="font-size:13px; margin-top:6px;">Accessory drive ribs show early wear indicators.</p></div></div>
            <div class="grid-2 margin-b-24">
              ${metricTile('Est. repair', '<span id="predicted-issue-cost">$120 - $185</span>', 'Market estimate for nearby providers.', 'text-cyan')}
              ${metricTile('Risk', '<span id="predicted-issue-risk">Low / mid term</span>', 'Recommended response window.', 'text-red')}
            </div>
            <div style="display:flex; gap:12px; flex-wrap:wrap;"><button class="btn btn-primary" onclick="showScreen('mechanic')">${I('wrench')} Match Mechanic</button><button class="btn btn-secondary" onclick="showScreen('chat')">${I('message-circle')} Ask Follow-up</button></div>
          </div>
        </div>
      </div>
    </div>
  `,

  chat: `
    ${pageHeading(`${I('message-circle')} AI chat`, 'Diagnostic Assistant', 'Ask direct questions about warnings, symptoms, repair estimates, or the current vehicle telemetry stream.')}
    <div class="dashboard-grid">
      <div class="dashboard-left">
        <div class="chat-container">
          <div class="chat-header">
            <div style="display:flex; align-items:center; gap:12px;"><span class="brand-mark" style="width:34px; height:34px;">${I('bot')}</span><div><h4 class="font-display">AutoResQ Assistant</h4><p style="font-size:11px;">Linked to active OBD profile</p></div></div>
            <button class="btn btn-secondary" onclick="resetChat()">${I('rotate-ccw')} Reset</button>
          </div>
          <div class="chat-messages" id="chat-messages-container"></div>
          <div class="chat-input-area">
            <input type="text" class="chat-input" id="chat-user-input" placeholder="Ask about a warning, sound, smell, or repair choice..." onkeydown="handleChatKey(event)" />
            <button class="btn btn-primary btn-icon" onclick="sendChatMessage()" aria-label="Send">${I('send')}</button>
          </div>
        </div>
      </div>
      <div class="dashboard-right">
        <div class="glass-card">
          <h3 class="font-display margin-b-16">Suggested Questions</h3>
          <div class="stack">
            <button class="btn btn-secondary" onclick="simulateChatQuestion('Explain the 12V battery health reading of 88 percent')" style="justify-content:flex-start;">${I('battery-charging')} Explain battery health</button>
            <button class="btn btn-secondary" onclick="simulateChatQuestion('Why is my steering wheel vibrating at highway speeds?')" style="justify-content:flex-start;">${I('car')} Steering vibration</button>
            <button class="btn btn-secondary" onclick="simulateChatQuestion('Can I drive 20 miles with this brake warning?')" style="justify-content:flex-start;">${I('shield-alert')} Brake warning safety</button>
            <button class="btn btn-secondary" onclick="simulateChatQuestion('Find the safest charging stop based on my range')" style="justify-content:flex-start;">${I('plug-zap')} Charging route</button>
          </div>
        </div>
      </div>
    </div>
  `,

  sos: `
    <div class="sos-page-wrap">
      <div class="glass-card sos-trigger-card glow-red">
        <span class="pill red">${I('siren')} Emergency dispatcher center</span>
        <div class="sos-button-glow-ring">
          <div class="sos-pulse-ring-1"></div>
          <div class="sos-pulse-ring-2"></div>
          <button class="sos-btn-circle" onclick="triggerEmergencySOS()"><span>SOS</span><label>Broadcast now</label></button>
        </div>
        <h2 class="font-display" style="font-size:30px;">Send location, vehicle state, and profile</h2>
        <p style="max-width:430px; margin-top:10px;">AutoResQ compiles GPS, OBD status, emergency contacts, and responder context into one dispatch packet.</p>
      </div>

      <div class="stack">
        <div class="glass-card gps-card">
          <div class="flex-between margin-b-16"><h3 class="font-display">Live GPS Packet</h3><span class="pill red">${I('radio')} GPS active</span></div>
          <div class="grid-2">
            ${metricTile('Coordinates', '37.7749 N', '122.4194 W resolved.', 'text-cyan')}
            ${metricTile('Accuracy', '3 m', 'Altitude 52 m.', 'text-green')}
          </div>
          <p class="margin-t-24">${I('map-pin')} Location resolved near Market Street, San Francisco, California.</p>
        </div>
        <div class="glass-card">
          <h3 class="font-display margin-b-16">Emergency Vehicle Profile</h3>
          <div class="data-row"><div><div class="row-title">Tesla Model Y</div><div class="row-copy">License 9CYB-RESQ. Matte satin grey. OBD link active.</div></div><span class="pill green">Connected</span></div>
        </div>
        <div class="glass-card">
          <h3 class="font-display margin-b-16">Emergency Contacts</h3>
          <div class="stack">
            <div class="data-row"><div><div class="row-title">Elena Sharma</div><div class="row-copy">Spouse - +1 (555) 389-2041</div></div><span class="pill green">SMS set</span></div>
            <div class="data-row"><div><div class="row-title">Dr. Richard Sterling</div><div class="row-copy">Primary care - +1 (555) 920-1845</div></div><span class="pill green">SMS set</span></div>
          </div>
        </div>
      </div>
    </div>
  `,

  mechanic: `
    ${pageHeading(`${I('wrench')} Mechanic matching`, 'Verified Roadside Offers', 'Compare nearby specialists by arrival time, capability, rating, and service fee.', `<span class="health-badge">${I('map-pin')} 3 active offers nearby</span>`)}
    <div class="marketplace-grid">
      <div class="glass-card mechanic-card">
        <div class="mechanic-avatar">${I('zap')}</div>
        <div><span class="mechanic-badge badge-cyan">Fastest match</span><h3 class="font-display">Apex Mobile Diagnostics</h3><p style="font-size:13px;">Battery jumps, alternator diagnostics, belt swaps.</p><p class="row-copy">4.8 rating, 312 reviews - 1.8 miles away</p></div>
        <div style="text-align:right;"><div class="value">8 min</div><p class="row-copy">Estimated arrival</p><div class="text-cyan" style="font-weight:800;">$85 service fee</div><button class="btn btn-primary" onclick="dispatchMechanic('Apex Mobile Diagnostics', '8 min', '1.8 mi', '$85')" style="margin-top:10px;">Accept Dispatch</button></div>
      </div>
      <div class="glass-card mechanic-card glow-cyan">
        <div class="mechanic-avatar">${I('badge-check')}</div>
        <div><span class="mechanic-badge badge-cyan">AI recommended</span><h3 class="font-display">Precision Garage & Rescue</h3><p style="font-size:13px;">Complete drivetrain, advanced sensors, hybrid and EV cells.</p><p class="row-copy">4.95 rating, 1,480 reviews - 3.2 miles away</p></div>
        <div style="text-align:right;"><div class="value">12 min</div><p class="row-copy">Estimated arrival</p><div class="text-cyan" style="font-weight:800;">$110 service fee</div><button class="btn btn-primary" onclick="dispatchMechanic('Precision Garage & Rescue', '12 min', '3.2 mi', '$110')" style="margin-top:10px;">Accept Dispatch</button></div>
      </div>
      <div class="glass-card mechanic-card">
        <div class="mechanic-avatar">${I('wallet')}</div>
        <div><span class="mechanic-badge badge-blue">Best value</span><h3 class="font-display">Rapid Roadside Services</h3><p style="font-size:13px;">Flat tire repair, fuel delivery, lockout support.</p><p class="row-copy">4.6 rating, 89 reviews - 4.1 miles away</p></div>
        <div style="text-align:right;"><div class="value">19 min</div><p class="row-copy">Estimated arrival</p><div class="text-cyan" style="font-weight:800;">$55 service fee</div><button class="btn btn-primary" onclick="dispatchMechanic('Rapid Roadside Services', '19 min', '4.1 mi', '$55')" style="margin-top:10px;">Accept Dispatch</button></div>
      </div>
    </div>
  `,

  tracking: `
    ${pageHeading(`${I('map-pin')} Live tracking`, 'Responder Route', 'Follow the accepted mechanic, arrival estimate, distance remaining, and dispatch log.')}
    <div class="dashboard-grid">
      <div class="dashboard-left">
        <div class="map-visual-placeholder" id="tracking-map">
          <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="none">
            <path d="M0 120 L800 120 M0 240 L800 240 M0 360 L800 360" stroke="rgba(255,255,255,0.05)" />
            <path d="M160 0 L160 500 M320 0 L320 500 M480 0 L480 500 M640 0 L640 500" stroke="rgba(255,255,255,0.04)" />
            <path d="M90 70 L710 70 L710 430 L90 430 Z" stroke="rgba(137,255,219,0.18)" stroke-width="5" fill="none"/>
            <path d="M200 70 L200 430 M500 70 L500 430 M90 250 L710 250" stroke="rgba(137,255,219,0.16)" stroke-width="5"/>
            <path d="M200 250 L500 250 L500 430" stroke="#89ffdb" stroke-width="4" fill="none" class="map-route-line"/>
            <rect x="250" y="96" width="92" height="72" rx="8" fill="rgba(137,255,219,0.08)" stroke="rgba(137,255,219,0.22)"/>
            <text x="296" y="137" fill="#a6b5bc" font-size="12" text-anchor="middle" font-family="Space Grotesk">Safe Hub</text>
            <rect x="580" y="300" width="96" height="82" rx="8" fill="rgba(255,88,99,0.08)" stroke="rgba(255,88,99,0.22)"/>
            <text x="628" y="345" fill="#a6b5bc" font-size="12" text-anchor="middle" font-family="Space Grotesk">Hospital</text>
          </svg>
          <div class="map-marker marker-mechanic" style="top:188px; left:320px;" id="map-mechanic-marker">${I('wrench')}</div>
          <div class="map-marker marker-user" style="top:338px; left:488px;">${I('car')}</div>
        </div>
      </div>
      <div class="dashboard-right">
        <div class="glass-card glow-cyan">
          <span class="screen-kicker">${I('radio')} Active assistance dispatch</span>
          <div style="display:flex; gap:14px; margin:18px 0 24px;"><span class="brand-mark">${I('user-cog')}</span><div><h4 id="dispatch-name" class="font-display">Precision Garage & Rescue</h4><p style="font-size:12px;">Moving toward your location</p><div class="row-copy text-cyan">4.95 certified responder</div></div></div>
          <div class="grid-2 margin-b-24">
            ${metricTile('ETA estimate', '<span id="dispatch-eta">6 mins</span>', 'Updated from route progress.', 'text-yellow')}
            ${metricTile('Distance', '<span id="dispatch-dist">1.4 miles</span>', 'Remaining to vehicle.', 'text-cyan')}
          </div>
          <h4 class="font-display margin-b-16">Dispatcher Log</h4>
          <div class="timeline-wrap">
            <div class="timeline-item"><div class="timeline-dot">${I('navigation')}</div><div><span class="timeline-time">12:44 PM</span><h4 class="timeline-title">Responder departed</h4><p class="timeline-desc">Route optimized through high-visibility roads.</p></div></div>
            <div class="timeline-item"><div class="timeline-dot">${I('badge-check')}</div><div><span class="timeline-time">12:42 PM</span><h4 class="timeline-title">Dispatch matched</h4><p class="timeline-desc">Diagnostic profile loaded into responder view.</p></div></div>
          </div>
        </div>
      </div>
    </div>
  `,

  twin: `
    ${pageHeading(`${I('car')} Digital twin`, 'Vehicle System Mirror', 'Click telemetry points on the vehicle blueprint to inspect live subsystem status.')}
    <div class="twin-container">
      <div class="glass-card twin-visualization">
        <div style="width:100%; position:relative;">
          <svg class="twin-blueprint" viewBox="0 0 400 260" fill="none">
            <rect x="118" y="38" width="164" height="184" rx="42" stroke="rgba(137,255,219,0.55)" stroke-width="2" fill="rgba(137,255,219,0.05)"/>
            <rect x="138" y="68" width="124" height="124" rx="28" stroke="rgba(137,255,219,0.24)" />
            <path d="M150 98 C178 84, 222 84, 250 98" stroke="#89ffdb" stroke-width="2"/>
            <rect x="156" y="122" width="88" height="58" rx="8" fill="rgba(137,255,219,0.08)" stroke="#89ffdb" stroke-dasharray="4 3"/>
            <text x="200" y="155" fill="#89ffdb" font-size="11" text-anchor="middle" font-family="Space Grotesk">CELL CORE</text>
            <rect x="94" y="58" width="24" height="44" rx="7" fill="#071014" stroke="rgba(137,255,219,0.4)"/>
            <rect x="282" y="58" width="24" height="44" rx="7" fill="#071014" stroke="rgba(137,255,219,0.4)"/>
            <rect x="94" y="156" width="24" height="44" rx="7" fill="#071014" stroke="rgba(137,255,219,0.4)"/>
            <rect x="282" y="156" width="24" height="44" rx="7" fill="#071014" stroke="rgba(137,255,219,0.4)"/>
          </svg>
          <div class="blueprint-point" style="top:31%; left:40%;" onclick="showTwinSpec('Front Right Motor', 'Optimal', 'Temperature: 42 C | Power draw: 12 kW')"><div class="blueprint-ping"></div></div>
          <div class="blueprint-point" style="top:55%; left:50%;" onclick="showTwinSpec('Main Li-Ion Pack', '92%', 'Vitals: 395 V | Health integrity: excellent')"><div class="blueprint-ping"></div></div>
          <div class="blueprint-point" style="top:72%; left:35%;" onclick="showTwinSpec('Rear Air Suspension', 'Good', 'Pressure: 3.4 bar | Compression rating: 88%')"><div class="blueprint-ping"></div></div>
          <div class="blueprint-point" style="top:27%; left:62%;" onclick="showTwinSpec('Radar/Lidar Array', 'Online', 'Range accuracy: 99.8% | Obstacle scan normal')"><div class="blueprint-ping"></div></div>
        </div>
      </div>
      <div class="stack">
        <div class="glass-card">
          <h3 class="font-display margin-b-16">Selected System</h3>
          <div id="twin-details-card" class="data-row" style="display:block;">
            <div class="label">Select specification point</div>
            <h3 id="twin-spec-title" class="font-display" style="font-size:22px; margin-top:8px;">Overall Vehicle System</h3>
            <p id="twin-spec-status" class="text-green" style="font-weight:800;">Health: 92/100 (Optimal)</p>
            <p id="twin-spec-desc" style="font-size:13px; margin-top:8px;">All telemetry vectors are actively reporting to the cloud. Click any pulsing hotspot to read sensor logs.</p>
          </div>
        </div>
        <div class="glass-card">
          <h3 class="font-display margin-b-16">Twin Specifications</h3>
          <div class="grid-2">
            ${metricTile('Model', 'Model Y', 'Primary linked vehicle.', 'text-cyan')}
            ${metricTile('Odometer', '18,452', 'Miles synced.', 'text-yellow')}
            ${metricTile('Insurance', 'Allstate', 'AutoPro policy.', 'text-blue')}
            ${metricTile('OBD', 'v4.2.14', 'ResQ secure link.', 'text-green')}
          </div>
        </div>
      </div>
    </div>
  `,

  maintenance: `
    ${pageHeading(`${I('calendar-check')} Maintenance planner`, 'Predictive Service Windows', 'Schedule repairs before they become roadside failures.', `<span class="health-badge">${I('scan-line')} Predictive calibration active</span>`)}
    <div class="dashboard-grid">
      <div class="dashboard-left">
        <div class="glass-card">
          <div class="planner-timeline">
            <div class="planner-node"><div class="planner-node-dot">${I('filter')}</div><div><h4 class="font-display">Oil and cabin filter replacement</h4><span class="pill amber">Predicted in 24 days</span><p style="font-size:13px; margin-top:8px;">Usage rate and thermal profile project particulate threshold in 1,200 miles.</p><button class="btn btn-secondary margin-t-24" onclick="showScreen('mechanic')">${I('wrench')} Find Mechanic</button></div></div>
            <div class="planner-node"><div class="planner-node-dot">${I('battery-charging')}</div><div><h4 class="font-display">Li-Ion cell balance optimization</h4><span class="pill green">Stable for 88 days</span><p style="font-size:13px; margin-top:8px;">Cell degradation curve is stable. Winter calibration recommended before sustained cold driving.</p></div></div>
            <div class="planner-node"><div class="planner-node-dot">${I('file-warning')}</div><div><h4 class="font-display">Premium policy expiration</h4><span class="pill red">Urgent in 18 days</span><p style="font-size:13px; margin-top:8px;">Sync AutoResQ Safety Score to unlock renewal credit during quote review.</p><button class="btn btn-primary margin-t-24">${I('shield-check')} Apply Discount</button></div></div>
          </div>
        </div>
      </div>
      <div class="dashboard-right">
        <div class="glass-card glow-cyan">
          <h3 class="font-display margin-b-16">AI Recommendation Index</h3>
          <p style="font-size:13px;">Modeled against 45,000 similar driving cycles and local repair lead times.</p>
          <div class="stack margin-t-24">
            <div class="data-row"><div><div class="row-title">Brake pad friction shift</div><div class="row-copy">Rear pads need inspection in roughly 5,000 miles.</div></div><span class="pill amber">Watch</span></div>
            <div class="data-row"><div><div class="row-title">Eco-efficiency tuning</div><div class="row-copy">Alignment correction can improve range by 3.2%.</div></div><span class="pill green">Useful</span></div>
          </div>
        </div>
      </div>
    </div>
  `,

  safety: `
    ${pageHeading(`${I('shield')} Safety score`, 'Risk and Insurance Index', 'A telemetry-driven safety profile for vehicle condition, maintenance consistency, and reward eligibility.')}
    <div class="dashboard-grid">
      <div class="dashboard-left">
        <div class="glass-card" style="text-align:center;">
          <h3 class="font-display">AutoResQ Safety Index</h3>
          <p class="margin-b-24">Composite risk view across service history, battery, braking, tire wear, and calibration quality.</p>
          <div class="radar-chart-placeholder"><canvas id="safetyRadarChart" width="300" height="300"></canvas></div>
          <div class="grid-2 margin-t-24" style="text-align:left;">
            ${metricTile('Vehicle condition', '94%', 'Excellent.', 'text-cyan')}
            ${metricTile('Braking smoothness', '86%', 'Normal variance.', 'text-blue')}
          </div>
        </div>
      </div>
      <div class="dashboard-right">
        <div class="glass-card glow-cyan">
          <div class="flex-between margin-b-16"><h3 class="font-display">Risk Factor Index</h3><span class="value text-cyan">88/100</span></div>
          <div class="stack">
            <div class="data-row"><span>Vehicle age credit</span><strong class="text-green">Excellent (+12)</strong></div>
            <div class="data-row"><span>Maintenance history</span><strong class="text-green">Synced (+25)</strong></div>
            <div class="data-row"><span>Battery health</span><strong class="text-cyan">Optimal (+18)</strong></div>
            <div class="data-row"><span>Brake condition</span><strong class="text-yellow">Moderate (+15)</strong></div>
            <div class="data-row"><span>Tire wear</span><strong class="text-green">Optimal (+18)</strong></div>
          </div>
        </div>
      </div>
    </div>
  `,

  night: `
    <div class="glass-card night-safety-header margin-b-24 glow-red">
      <span class="pill red">${I('moon')} Night safety mode</span>
      <h2 class="font-display" style="margin-top:10px;">Low-distraction emergency routing</h2>
      <p>High-contrast routing to safe, lit, staffed locations when conditions are poor.</p>
    </div>
    <div class="dashboard-grid">
      <div class="dashboard-left">
        <div class="glass-card">
          <h3 class="font-display margin-b-16">Quick Navigate Safety Hubs</h3>
          <div class="quick-nav-grid">
            <div class="quick-nav-card" onclick="simulateNightNav('Police Station')"><span class="quick-nav-icon">${I('siren')}</span><div class="row-title">Police Station</div><div class="row-copy">1.2 miles</div></div>
            <div class="quick-nav-card" onclick="simulateNightNav('Hospital')"><span class="quick-nav-icon">${I('hospital')}</span><div class="row-title">Hospital</div><div class="row-copy">2.4 miles</div></div>
            <div class="quick-nav-card" onclick="simulateNightNav('Fuel Station')"><span class="quick-nav-icon">${I('fuel')}</span><div class="row-title">Fuel Station</div><div class="row-copy">0.8 miles</div></div>
            <div class="quick-nav-card" onclick="simulateNightNav('Safe Zone')"><span class="quick-nav-icon">${I('shield-check')}</span><div class="row-title">Safe Zone</div><div class="row-copy">3.1 miles</div></div>
          </div>
        </div>
      </div>
      <div class="dashboard-right">
        <div class="glass-card glow-red" style="text-align:center;">
          <h3 class="font-display text-red margin-b-16">One-tap command</h3>
          <p style="font-size:13px; margin-bottom:22px;">Route to the closest staffed safety point or broadcast your location to dispatch.</p>
          <button class="btn btn-sos" onclick="showScreen('sos')" style="width:100%;">${I('siren')} Emergency Dispatch</button>
        </div>
      </div>
    </div>
  `,

  ev: `
    ${pageHeading(`${I('plug-zap')} EV intelligence`, 'Charging and Range Assist', 'Range confidence, nearby charging, battery health, and mobile charge escalation for EV drivers.', `<span class="health-badge">${I('battery-charging')} Power converter synced</span>`)}
    <div class="ev-stats-grid margin-b-24">
      ${metricTile('Battery range', '284 mi', 'Predicted at current cell temperature.', 'text-green')}
      ${metricTile('Charging availability', '8 stations', 'Fast chargers inside 5-mile range.', 'text-cyan')}
      <div class="stat-tile"><div class="label">Emergency charge</div><button class="btn btn-primary margin-t-24" onclick="showScreen('sos')" style="width:100%;">${I('truck')} Request Mobile Charger</button><p class="row-copy">Use when range drops below route confidence.</p></div>
    </div>
    <div class="glass-card">
      <h3 class="font-display margin-b-16">Nearest Charging Infrastructure</h3>
      <div class="stack">
        <div class="data-row"><div><div class="row-title">Tesla Supercharger Hub - Market St.</div><div class="row-copy">12 of 16 stalls free - 250 kW max output</div></div><button class="btn btn-secondary">Navigate 0.6 mi</button></div>
        <div class="data-row"><div><div class="row-title">ChargePoint Network - Mission St.</div><div class="row-copy">4 of 6 stalls free - 150 kW output</div></div><button class="btn btn-secondary">Navigate 1.2 mi</button></div>
      </div>
    </div>
  `,

  profile: `
    <div class="profile-hero">
      <div class="profile-avatar-large">AS</div>
      <div><span class="pill">${I('user')} Premium active</span><h2 class="font-display" style="font-size:34px; margin-top:8px;">Aryan Sharma</h2><p>AutoResQ member since 2024.</p></div>
    </div>
    <div class="dashboard-grid">
      <div class="dashboard-left">
        <div class="glass-card">
          <h3 class="font-display margin-b-16">Vehicle Portfolio</h3>
          <div class="stack">
            <div class="data-row"><div><div class="row-title">Tesla Model Y (Primary)</div><div class="row-copy">OBD linked - License 9CYB-RESQ</div></div><span class="pill green">Active</span></div>
            <div class="data-row"><div><div class="row-title">BMW R 1250 GS</div><div class="row-copy">OBD offline - License 4MT-RIDER</div></div><button class="btn btn-secondary">Sync Link</button></div>
          </div>
        </div>
      </div>
      <div class="dashboard-right">
        <div class="glass-card glow-cyan">
          <h3 class="font-display margin-b-16">Safety Rewards</h3>
          <p style="font-size:13px;">High safety profiles and early repairs unlock practical rewards.</p>
          <div class="stack margin-t-24">
            <div class="data-row"><div><div class="row-title">15% insurance credit</div><div class="row-copy">Unlocked via 88 Safety Score.</div></div>${I('trophy')}</div>
            <div class="data-row"><div><div class="row-title">Annual OBD probe upgrade</div><div class="row-copy">Included with loyalty tier.</div></div>${I('gift')}</div>
          </div>
        </div>
      </div>
    </div>
  `,

  analytics: `
    ${pageHeading(`${I('bar-chart-3')} Analytics`, 'Diagnostics Performance', 'Trend vehicle health, breakdown risk, prediction precision, and avoided repair costs.', `<span class="health-badge">${I('clock')} Data updated 5m ago</span>`)}
    <div class="dashboard-grid">
      <div class="dashboard-left">
        <div class="glass-card"><h3 class="font-display margin-b-16">Monthly Vehicle Health Trends</h3><div class="chart-container-canvas"><canvas id="analyticsHealthChart"></canvas></div></div>
        <div class="glass-card"><h3 class="font-display margin-b-16">Breakdown Risk Curve Forecast</h3><div class="chart-container-canvas"><canvas id="analyticsRiskChart"></canvas></div></div>
      </div>
      <div class="dashboard-right">
        <div class="glass-card glow-cyan">
          <h3 class="font-display margin-b-16">AI Operations Summary</h3>
          <div class="stack">
            ${metricTile('Predictions verified', '42', 'Confirmed via OBD linkage.', 'text-cyan')}
            ${metricTile('Preventive savings', '$1,840', 'Relative to tow and reactive repairs.', 'text-green')}
          </div>
        </div>
      </div>
    </div>
  `
};
