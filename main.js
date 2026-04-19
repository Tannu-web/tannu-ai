/* ─── Scroll Reveal ─── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));

  /* ─── Nav scroll ─── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60 ? 'rgba(9,9,15,0.97)' : 'rgba(9,9,15,0.75)';
  });

  /* ─── Stagger cards ─── */
  document.querySelectorAll('.feature-card,.testimonial,.price-card,.step,.integration-pill').forEach((el,i) => {
    el.style.transitionDelay = `${(i%6)*0.08}s`;
  });

  /* ─── Ripple ─── */
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `@keyframes ripple{to{width:200px;height:200px;opacity:0}}`;
  document.head.appendChild(rippleStyle);

  document.addEventListener('click', function(e) {
    const btn = e.target.closest('button');
    if (!btn) return;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.25);width:0;height:0;left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px;transform:translate(-50%,-50%);animation:ripple .5s ease-out forwards;pointer-events:none`;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });

  /* ─── Modal helpers ─── */
  function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
  }
  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay.id); });
  });
  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  });

  /* ─── Wire ALL buttons that open modals ─── */
  document.querySelectorAll('button').forEach(btn => {
    const txt = btn.textContent.trim().toLowerCase();
    if (txt.includes('log in') || txt === 'login') btn.addEventListener('click', () => { resetLogin(); openModal('loginModal'); });
    if (txt.includes('book a demo') || txt.includes('book demo') || txt.includes('start free trial') || txt.includes('contact sales') || txt.includes('get started') || txt.includes('confirm demo')) {
      if (!btn.closest('.modal')) btn.addEventListener('click', () => { resetDemo(); openModal('demoModal'); });
    }
  });

  /* ══ LOGIN LOGIC ══ */
  let activeTab = 'login';

  function switchTab(tab) {
    activeTab = tab;
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('signupForm').style.display = tab === 'signup' ? 'block' : 'none';
    document.querySelectorAll('.modal-tab').forEach((t,i) => t.classList.toggle('active', (i===0&&tab==='login')||(i===1&&tab==='signup')));
  }

  function resetLogin() {
    document.getElementById('loginContent').style.display = 'block';
    document.getElementById('loginSuccess').style.display = 'none';
    switchTab('login');
    ['loginEmail','loginPassword','signupFirst','signupLast','signupEmail','signupPassword'].forEach(id => {
      const el = document.getElementById(id); if(el) el.value = '';
    });
    clearErrors();
  }

  function showError(inputId, msg) {
    const el = document.getElementById(inputId);
    if (!el) return;
    el.style.borderColor = '#f87171';
    let err = el.parentElement.querySelector('.field-err');
    if (!err) { err = document.createElement('div'); err.className = 'field-err'; err.style.cssText='font-size:.75rem;color:#f87171;margin-top:.3rem'; el.parentElement.appendChild(err); }
    err.textContent = msg;
  }
  function clearErrors() {
    document.querySelectorAll('.field-err').forEach(e => e.remove());
    document.querySelectorAll('.form-input').forEach(e => e.style.borderColor = '');
  }
  function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

  function handleLogin() {
    clearErrors();
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value;
    let ok = true;
    if (!validateEmail(email)) { showError('loginEmail','Please enter a valid email'); ok=false; }
    if (pass.length < 6) { showError('loginPassword','Password must be at least 6 characters'); ok=false; }
    if (!ok) return;

    const btn = event.target;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Logging in…';
    setTimeout(() => {
      btn.disabled = false; btn.innerHTML = 'Log In to Dashboard';
      document.getElementById('loginContent').style.display = 'none';
      const s = document.getElementById('loginSuccess'); s.style.display = 'flex';
      setTimeout(() => closeModal('loginModal'), 2800);
    }, 1800);
  }

  function handleSignup() {
    clearErrors();
    const first = document.getElementById('signupFirst').value.trim();
    const last = document.getElementById('signupLast').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const pass = document.getElementById('signupPassword').value;
    let ok = true;
    if (!first) { showError('signupFirst','Required'); ok=false; }
    if (!last) { showError('signupLast','Required'); ok=false; }
    if (!validateEmail(email)) { showError('signupEmail','Please enter a valid email'); ok=false; }
    if (pass.length < 8) { showError('signupPassword','Password must be at least 8 characters'); ok=false; }
    if (!ok) return;

    const btn = event.target;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Creating account…';
    setTimeout(() => {
      btn.disabled = false; btn.innerHTML = 'Create Free Account';
      document.getElementById('loginContent').style.display = 'none';
      const s = document.getElementById('loginSuccess'); s.style.display = 'flex';
      s.querySelector('h3').textContent = 'Account Created! 🎉';
      s.querySelector('p').textContent = `Welcome aboard, ${first}! Redirecting to your dashboard…`;
      setTimeout(() => closeModal('loginModal'), 2800);
    }, 1800);
  }

  function socialAuth(provider) {
    const btn = event.target.closest('button');
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span>Connecting to ${provider}…`;
    setTimeout(() => {
      btn.disabled = false; btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Continue with ${provider}`;
      document.getElementById('loginContent').style.display = 'none';
      const s = document.getElementById('loginSuccess'); s.style.display = 'flex';
      setTimeout(() => closeModal('loginModal'), 2500);
    }, 1500);
  }

  function showForgotPassword() {
    const email = document.getElementById('loginEmail').value.trim();
    if (!validateEmail(email)) {
      showError('loginEmail','Enter your email first to reset password');
      document.getElementById('loginEmail').classList.add('shake');
      setTimeout(() => document.getElementById('loginEmail').classList.remove('shake'), 400);
      return;
    }
    const btn = document.querySelector('#loginForm .form-submit');
    btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>Sending reset link…';
    setTimeout(() => {
      btn.disabled = false; btn.innerHTML = '✓ Reset link sent to ' + email;
      btn.style.background = 'rgba(6,214,160,.2)'; btn.style.border = '1px solid var(--accent3)';
      btn.style.color = 'var(--accent3)'; btn.style.boxShadow = 'none';
    }, 1500);
  }

  /* ══ DEMO LOGIC ══ */
  let demoCurrentStep = 1;
  let selectedTime = '';

  function resetDemo() {
    demoCurrentStep = 1;
    selectedTime = '';
    document.getElementById('demoContent').style.display = 'block';
    document.getElementById('demoSuccess').style.display = 'none';
    ['demoStep1','demoStep2','demoStep3'].forEach((id,i) => {
      document.getElementById(id).style.display = i===0 ? 'block' : 'none';
    });
    updateStepDots(1);
    clearErrors();
    const minDate = new Date(); minDate.setDate(minDate.getDate()+1);
    document.getElementById('dDate').min = minDate.toISOString().split('T')[0];
    document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
    ['dFirst','dLast','dEmail','dPhone','dCompany','dGoal'].forEach(id => {
      const el = document.getElementById(id); if(el) el.value='';
    });
    ['dIndustry','dSize','dVolume'].forEach(id => {
      const el = document.getElementById(id); if(el) el.selectedIndex=0;
    });
  }

  function updateStepDots(step) {
    for(let i=1;i<=3;i++) {
      const dot = document.getElementById('sd'+i);
      dot.classList.remove('active','done');
      if(i < step) dot.classList.add('done');
      else if(i === step) dot.classList.add('active');
    }
  }

  function demoNext(fromStep) {
    clearErrors();
    if (fromStep === 1) {
      const first = document.getElementById('dFirst').value.trim();
      const last = document.getElementById('dLast').value.trim();
      const email = document.getElementById('dEmail').value.trim();
      let ok = true;
      if (!first) { showError('dFirst','Required'); ok=false; }
      if (!last) { showError('dLast','Required'); ok=false; }
      if (!validateEmail(email)) { showError('dEmail','Valid email required'); ok=false; }
      if (!ok) return;
    }
    if (fromStep === 2) {
      const company = document.getElementById('dCompany').value.trim();
      const industry = document.getElementById('dIndustry').value;
      let ok = true;
      if (!company) { showError('dCompany','Required'); ok=false; }
      if (!industry) { showError('dIndustry','Please select your industry'); ok=false; }
      if (!ok) return;
    }

    document.getElementById('demoStep'+fromStep).style.display = 'none';
    document.getElementById('demoStep'+(fromStep+1)).style.display = 'block';
    demoCurrentStep = fromStep + 1;
    updateStepDots(demoCurrentStep);
  }

  function demoBack(fromStep) {
    document.getElementById('demoStep'+fromStep).style.display = 'none';
    document.getElementById('demoStep'+(fromStep-1)).style.display = 'block';
    demoCurrentStep = fromStep - 1;
    updateStepDots(demoCurrentStep);
  }

  function selectTime(btn, time) {
    document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
    btn.classList.add('selected');
    selectedTime = time;
  }

  function handleDemoSubmit() {
    clearErrors();
    const date = document.getElementById('dDate').value;
    let ok = true;
    if (!date) { showError('dDate','Please select a date'); ok=false; }
    if (!selectedTime) {
      const slots = document.getElementById('timeSlots');
      slots.style.borderRadius = '8px';
      slots.classList.add('shake');
      setTimeout(() => slots.classList.remove('shake'), 400);
      const err = document.createElement('div');
      err.className = 'field-err'; err.style.cssText='font-size:.75rem;color:#f87171;margin-top:.5rem';
      err.textContent = 'Please select a time slot';
      if (!slots.nextElementSibling?.classList.contains('field-err')) slots.after(err);
      ok=false;
    }
    if (!ok) return;

    const btn = event.target;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Booking your demo…';
    setTimeout(() => {
      btn.disabled = false; btn.innerHTML = 'Confirm Demo 🎉';
      document.getElementById('demoContent').style.display = 'none';
      const s = document.getElementById('demoSuccess'); s.style.display = 'flex';
      const name = document.getElementById('dFirst').value;
      const dateStr = new Date(date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
      s.querySelector('p').textContent = `${name}, your demo is set for ${dateStr} at ${selectedTime}. Check your email for the calendar invite!`;
    }, 2000);
  }