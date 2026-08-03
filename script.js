/**
 * MAHALAXMI THE ARENA - PIMPRI
 * Ultra-Modern Interactive JavaScript Engine v2.0 — Full UX Overhaul
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initNavActiveLinks();
  initMobileDrawer();
  initScrollReveal();
  initCounterAnimation();
  initOperatingSystemTabs();
  initMasterPlanFilter();
  initMasterPlanSvg();
  initGalleryAndLightbox();
  initResidenceTabs();
  initLocationTabs();
  initLocationCanvas();
  initFinancialCalculator();
  initModalsAndForms();
});

/* ================== NAVBAR SCROLL & MOBILE MENU ================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ================== 5-PILLAR SPORTS OPERATING SYSTEM ================== */
function initOperatingSystemTabs() {
  const tabButtons = document.querySelectorAll('.os-tab-btn');
  const tabContents = document.querySelectorAll('.os-pillar-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-pillar');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(`pillar-${targetId}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* ================== MASTER PLAN & AMENITIES FILTER ================== */
function initMasterPlanFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const amenityCards = document.querySelectorAll('.amenity-category-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      amenityCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ================== INTERACTIVE SVG MASTERPLAN CONTROLLER ================== */
const MP_DATA = {
  zones: {
    sports: {
      name: '80,000 Sq. Ft. Sports Arena',
      badge: 'SPORTS ZONE',
      badgeColor: '#DFFE00',
      sub: 'FIFA Football · Tennis · Padel · Jogging Track',
      specs: [
        { val: '80K', lab: 'Sq. Ft.' },
        { val: 'FIFA', lab: 'Grade Turf' },
        { val: '6+', lab: 'Courts' }
      ],
      list: [
        'FIFA-Grade Football Turf (10,000 × 20,000 mm) with Floodlights',
        'Dual Championship Tennis Courts',
        'International Padel Court with Glass Walls',
        'Pickleball Court with Cafe & Restrooms',
        'Open-Air Multi-Sport & Basketball Courts',
        'Jogging & Sprint Track along 9M Driveway'
      ]
    },
    club: {
      name: 'Club ILESEUM',
      badge: 'INDOOR HUB',
      badgeColor: '#00F5D4',
      sub: 'Infinity Pool · Gym · Badminton · Squash · Co-Work',
      specs: [
        { val: '1787', lab: 'Sq. Ft. Gym' },
        { val: '∞', lab: 'Pool' },
        { val: '8+', lab: 'Facilities' }
      ],
      list: [
        '1,787 Sq. Ft. Expansive Gym & Cardio Floor',
        'Elevated Infinity Swimming Pool with Deck',
        'Indoor Racquet Courts (Badminton / Squash)',
        'Steam, Sauna & Athletic Recovery Zones',
        '807 Sq. Ft. Co-Working & Wi-Fi Lounge',
        '592 Sq. Ft. Acoustic Mini Theatre'
      ]
    },
    zen: {
      name: 'Zen Gardens',
      badge: 'SANCTUARY ZONE',
      badgeColor: '#F15BB5',
      sub: 'Forest Bathing · Temples · Mist Gardens · Ponds',
      specs: [
        { val: '3', lab: 'Temples' },
        { val: '6+', lab: 'Sanctuaries' },
        { val: 'Shirin', lab: 'Yoku Forest' }
      ],
      list: [
        'Shirin Yoku — Japanese Forest Bathing Temple',
        'Sacred Jain Temple with Serene Courtyard',
        'Ganesh Temple & Meditation Grove',
        'Butterfly Garden, Mist Garden & Hammock Deck',
        'Natural Water Retention Pond & Tree Grove',
        'Amphitheatre, Tree House & Lawn'
      ]
    }
  },
  towers: {
    A1: { name: 'Tower A1', badge: 'PHASE 1 — PREMIUM', badgeColor: '#D6BCFF', sub: '2B+G+2P+Attic+33 Floors · North Wing', specs: [{ val: '33F', lab: 'Floors' }, { val: '3 & 4', lab: 'BHK' }, { val: 'Phase 1', lab: 'Wing' }], list: ['3 BHK Grand Corner Suite (1,250–1,626 Sq. Ft.)', '4 BHK Sky Residence (1,600–2,600 Sq. Ft.)', '3 High-Speed Elevators + 1 Service Lift', 'Smart Home Automation by Schneider & Legrand', 'Phase 1 Premium Construction with DFFE00 badge'] },
    B1: { name: 'Tower B1', badge: 'PHASE 1 — PREMIUM', badgeColor: '#D6BCFF', sub: '2B+G+2P+Attic+33 Floors · South Wing', specs: [{ val: '33F', lab: 'Floors' }, { val: '3 & 4', lab: 'BHK' }, { val: 'Phase 1', lab: 'Wing' }], list: ['3 BHK Smart Residence (986–1,340 Sq. Ft.)', '4 BHK Sky Penthouse (1,600–2,600 Sq. Ft.)', '3 High-Speed Elevators + 1 Service Lift', 'Digital Smart Yale Lock & 7" Video Door Phone', 'Unobstructed sports turf & lagoon views'] },
    A2: { name: 'Tower A2', badge: 'ALL TOWERS', badgeColor: '#9B5DE5', sub: '34 Floors · 2 & 3 BHK Luxury', specs: [{ val: '34', lab: 'Floors' }, { val: '2 & 3', lab: 'BHK' }, { val: '3000', lab: 'mm Height' }], list: ['2 BHK Luxury (830–1,206 Sq. Ft.) from ₹88.5 L*', '3 BHK Smart (986–1,340 Sq. Ft.) from ₹1.28 Cr*', '1800×1200mm Large Format Vitrified Flooring', 'Three-track UPVC Soundproof Sliding Windows', 'Kohler / Motto Premium CP Fittings'] },
    B2: { name: 'Tower B2', badge: 'ALL TOWERS', badgeColor: '#9B5DE5', sub: '34 Floors · 2 & 3 BHK Luxury', specs: [{ val: '34', lab: 'Floors' }, { val: '2 & 3', lab: 'BHK' }, { val: '3000', lab: 'mm Height' }], list: ['2 BHK Luxury (830–1,206 Sq. Ft.)', '3 BHK Smart Residence (986–1,340 Sq. Ft.)', '1800×1200mm Large Format Vitrified Flooring', 'Wet & Dry Kitchen Zoning with Stone Platform', 'Fire Hydrant System & Smoke Detectors'] },
    A3: { name: 'Tower A3', badge: 'ALL TOWERS', badgeColor: '#9B5DE5', sub: '34 Floors · 3 & 4 BHK', specs: [{ val: '34', lab: 'Floors' }, { val: '3 & 4', lab: 'BHK' }, { val: '3000', lab: 'mm Height' }], list: ['3 BHK Grand Corner Suite (1,250–1,626 Sq. Ft.)', '4 BHK Sky Residence (1,600–2,600 Sq. Ft.)', 'Corner Orientation — Natural Light on 3 Sides', 'Double-Glazed Acoustic UPVC Sliding Doors', '8-Zone Smart Security Alarm Panel'] },
    B3: { name: 'Tower B3', badge: 'ALL TOWERS', badgeColor: '#9B5DE5', sub: '34 Floors · 2–4 BHK', specs: [{ val: '34', lab: 'Floors' }, { val: '2–4', lab: 'BHK' }, { val: '3000', lab: 'mm Height' }], list: ['2 BHK Luxury (830–1,206 Sq. Ft.)', '3 BHK Configurations available', '4 BHK Sky Residence available', '100% DG Generator Backup on All Common Areas', 'Earthquake-Resistant RCC Frame Construction'] },
    C1: { name: 'Tower C1', badge: 'ALL TOWERS', badgeColor: '#9B5DE5', sub: '34 Floors · 2 & 3 BHK', specs: [{ val: '34', lab: 'Floors' }, { val: '2 & 3', lab: 'BHK' }, { val: '3000', lab: 'mm Height' }], list: ['2 BHK Luxury Sports Residence', '3 BHK Smart Family Residence', 'Aluminium Formwork Shear-Wall Construction', 'Dedicated Safe Kids Pool & Splash Zone views', 'Creche & Early Learning Centre access'] },
    C2: { name: 'Tower C2', badge: 'ALL TOWERS', badgeColor: '#9B5DE5', sub: '34 Floors · 2 & 3 BHK', specs: [{ val: '34', lab: 'Floors' }, { val: '2 & 3', lab: 'BHK' }, { val: '3000', lab: 'mm Height' }], list: ['2 BHK Luxury Sports Residence', '3 BHK Smart Family Residence', 'Two Luxury Designer Guest Suites in Club', 'Premium Sports Bar & Architectural Cafe access', 'Full-Height Dado Tiles in All Bathrooms'] },
    D1: { name: 'Tower D1', badge: 'ALL TOWERS', badgeColor: '#9B5DE5', sub: '34 Floors · 1–3 BHK', specs: [{ val: '34', lab: 'Floors' }, { val: '1–3', lab: 'BHK' }, { val: '3000', lab: 'mm Height' }], list: ['1 BHK Compact & 2 BHK Luxury options', '3 BHK Smart Residence available', 'Direct ILESEUM Sports OS access', 'Scenic views of Zen Gardens & forest zone', 'High-Speed Elevator 2.5 metres/second'] },
    D2: { name: 'Tower D2', badge: 'ALL TOWERS', badgeColor: '#9B5DE5', sub: '34 Floors · 1–3 BHK', specs: [{ val: '34', lab: 'Floors' }, { val: '1–3', lab: 'BHK' }, { val: '3000', lab: 'mm Height' }], list: ['1 BHK Compact & 2 BHK options', '3 BHK Smart Residence available', 'Concealed Copper Wiring with ISI-Grade MCBs', 'Modular Switches by Legrand/Schneider', 'Fire-Rated Doors & 8-Zone Security Alarm'] },
    D3: { name: 'Tower D3', badge: 'ALL TOWERS', badgeColor: '#9B5DE5', sub: '34 Floors · 1–3 BHK', specs: [{ val: '34', lab: 'Floors' }, { val: '1–3', lab: 'BHK' }, { val: '3000', lab: 'mm Height' }], list: ['1 BHK Compact Sports Residence', '2 BHK Luxury Sports Residence', '3 BHK Smart Residence available', 'Stone Tile Kitchen Platform with SS Sink', '15mm Stone Platform & Dado Kitchen Tiles'] }
  }
};

function initMasterPlanSvg() {
  const svg         = document.getElementById('mpSvg');
  const panelDef    = document.getElementById('mpPanelDefault');
  const panelDet    = document.getElementById('mpPanelDetail');
  const backBtn     = document.getElementById('mpPanelBack');
  const badgeEl     = document.getElementById('mpDetailBadge');
  const titleEl     = document.getElementById('mpDetailTitle');
  const subEl       = document.getElementById('mpDetailSub');
  const specsEl     = document.getElementById('mpDetailSpecs');
  const listEl      = document.getElementById('mpDetailList');

  if (!svg || !panelDef || !panelDet) return;

  function showDetail(data) {
    // Badge
    badgeEl.textContent = data.badge;
    badgeEl.style.background = data.badgeColor + '22';
    badgeEl.style.color = data.badgeColor;
    badgeEl.style.border = `1px solid ${data.badgeColor}55`;

    // Title & sub
    titleEl.textContent = data.name;
    subEl.textContent   = data.sub;

    // Specs grid
    specsEl.innerHTML = data.specs.map(s =>
      `<div class="mp-spec-item">
        <span class="mp-spec-val">${s.val}</span>
        <span class="mp-spec-lab">${s.lab}</span>
      </div>`
    ).join('');

    // Feature list
    listEl.innerHTML = data.list.map(item =>
      `<li>${item}</li>`
    ).join('');

    // Show detail panel, hide default
    panelDef.style.display = 'none';
    panelDet.style.display = 'flex';
  }

  function resetPanel() {
    panelDef.style.display = 'flex';
    panelDet.style.display = 'none';
    // Deselect all
    svg.querySelectorAll('.mp-zone, .mp-tower').forEach(el => el.classList.remove('selected'));
  }

  // Zone clicks
  svg.querySelectorAll('.mp-zone').forEach(el => {
    el.addEventListener('click', () => {
      const zoneId = el.getAttribute('data-zone');
      const data   = MP_DATA.zones[zoneId];
      if (!data) return;
      svg.querySelectorAll('.mp-zone, .mp-tower').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      showDetail(data);
    });
  });

  // Tower clicks
  svg.querySelectorAll('.mp-tower').forEach(el => {
    el.addEventListener('click', () => {
      const towerId = el.getAttribute('data-tower');
      const data    = MP_DATA.towers[towerId];
      if (!data) return;
      svg.querySelectorAll('.mp-zone, .mp-tower').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      showDetail(data);
    });
  });

  // Back button
  if (backBtn) backBtn.addEventListener('click', resetPanel);
}

/* ================== RESIDENCES & LAYOUT SELECTOR ================== */

/* ================== RESIDENCES & LAYOUT SELECTOR ================== */
function initResidenceTabs() {
  const tabButtons = document.querySelectorAll('.residence-tab-btn');
  const residenceCards = document.querySelectorAll('.residence-showcase-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-residence');

      tabButtons.forEach(b => b.classList.remove('active'));
      residenceCards.forEach(c => c.style.display = 'none');

      btn.classList.add('active');
      const targetCard = document.getElementById(`res-${targetId}`);
      if (targetCard) {
        targetCard.style.display = 'grid';
        targetCard.style.opacity = '0';
        setTimeout(() => targetCard.style.opacity = '1', 50);
      }
    });
  });
}

/* ================== LOCATION TABS & PIMPRI CONNECTIVITY CANVAS ================== */
function initLocationTabs() {
  const tabButtons = document.querySelectorAll('.loc-tab-btn');
  const locLists = document.querySelectorAll('.location-category-list');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-loc-cat');

      tabButtons.forEach(b => b.classList.remove('active'));
      locLists.forEach(l => l.style.display = 'none');

      btn.classList.add('active');
      const targetList = document.getElementById(`loc-list-${catId}`);
      if (targetList) {
        targetList.style.display = 'block';
        targetList.style.opacity = '0';
        setTimeout(() => targetList.style.opacity = '1', 50);
      }
    });
  });
}

function initLocationCanvas() {
  const canvas = document.getElementById('locationCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.parentElement.clientWidth;
  let height = 540;
  canvas.width = width;
  canvas.height = height;

  window.addEventListener('resize', () => {
    width = canvas.parentElement.clientWidth;
    canvas.width = width;
    drawLocationMap(ctx, width, height);
  });

  drawLocationMap(ctx, width, height);
}

function drawLocationMap(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);

  // Background Dark Map Motif
  ctx.fillStyle = "#0A0614";
  ctx.fillRect(0, 0, w, h);

  // Draw Pune Metro Line 1 Corridor
  ctx.strokeStyle = "rgba(223, 254, 0, 0.4)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(w * 0.1, h * 0.8);
  ctx.lineTo(w * 0.9, h * 0.2);
  ctx.stroke();

  ctx.strokeStyle = "#DFFE00";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(w * 0.1, h * 0.8);
  ctx.lineTo(w * 0.9, h * 0.2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw Old Mumbai-Pune Highway / NH-65 Corridor
  ctx.strokeStyle = "rgba(0, 245, 212, 0.25)";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(w * 0.05, h * 0.65);
  ctx.lineTo(w * 0.95, h * 0.35);
  ctx.stroke();

  // Landmarks from Brochure
  const landmarks = [
    { name: "MAHALAXMI THE ARENA", x: w * 0.45, y: h * 0.48, type: "project", color: "#DFFE00" },
    { name: "PCMC Metro Station (2.4 km)", x: w * 0.38, y: h * 0.58, type: "metro", color: "#00F5D4" },
    { name: "Kohinoor World Towers (2.0 km)", x: w * 0.48, y: h * 0.38, type: "hub", color: "#9B5DE5" },
    { name: "Aditya Birla Hospital (4.1 km)", x: w * 0.3, y: h * 0.7, type: "hospital", color: "#F15BB5" },
    { name: "Podar International School (3.8 km)", x: w * 0.25, y: h * 0.35, type: "school", color: "#FFB703" },
    { name: "Hinjewadi IT Park (9.9 km)", x: w * 0.18, y: h * 0.85, type: "it", color: "#CBD5E1" },
    { name: "Pune Metro Line 1 Corridor", x: w * 0.75, y: h * 0.28, type: "label", color: "#DFFE00" }
  ];

  landmarks.forEach(lm => {
    ctx.save();
    const isProject = lm.type === 'project';
    const radius = isProject ? 16 : 9;

    // Glowing Pulse for project
    if (isProject) {
      ctx.fillStyle = "rgba(223, 254, 0, 0.25)";
      ctx.beginPath();
      ctx.arc(lm.x, lm.y, 30, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = lm.color;
    ctx.beginPath();
    ctx.arc(lm.x, lm.y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#0A0614";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label Text
    ctx.fillStyle = isProject ? "#DFFE00" : "#FFFFFF";
    ctx.font = isProject ? "bold 13px 'Outfit', sans-serif" : "bold 11px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(lm.name, lm.x, lm.y - radius - 8);
    ctx.restore();
  });
}

/* ================== FINANCIAL & INVESTMENT ROI CALCULATOR ================== */
function initFinancialCalculator() {
  const priceSlider = document.getElementById('calc-price');
  const priceVal = document.getElementById('val-price');
  const downSlider = document.getElementById('calc-down');
  const downVal = document.getElementById('val-down');
  const tenureSlider = document.getElementById('calc-tenure');
  const tenureVal = document.getElementById('val-tenure');
  const rateSlider = document.getElementById('calc-rate');
  const rateVal = document.getElementById('val-rate');

  const resultEmi = document.getElementById('result-emi');
  const resultAppreciation = document.getElementById('result-appreciation');
  const resultYield = document.getElementById('result-yield');

  if (!priceSlider) return;

  // Slider track fill helper
  function updateFill(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.setProperty('--fill', pct + '%');
  }

  function calculate() {
    const price = parseFloat(priceSlider.value) * 100000;
    const downPercent = parseFloat(downSlider.value);
    const tenureYears = parseFloat(tenureSlider.value);
    const interestRate = parseFloat(rateSlider.value);

    updateFill(priceSlider);
    updateFill(downSlider);
    updateFill(tenureSlider);
    updateFill(rateSlider);

    // Update Slider Displays
    priceVal.innerText = `₹ ${(price / 10000000).toFixed(2)} Cr`;
    downVal.innerText = `${downPercent}% (₹ ${((price * (downPercent / 100)) / 100000).toFixed(0)} L)`;
    tenureVal.innerText = `${tenureYears} Years`;
    rateVal.innerText = `${interestRate}% p.a.`;

    // Loan EMI Calculation
    const loanAmount = price * (1 - downPercent / 100);
    const monthlyRate = (interestRate / 100) / 12;
    const totalMonths = tenureYears * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // Expected 5-Year Appreciation in Pimpri Sports Township (assuming 8.5% annual CAGR)
    const futureValue = price * Math.pow(1.085, 5);
    const appreciationValue = futureValue - price;

    // Expected Rental Yield (approx 4.2% in PCMC sports township)
    const annualRent = price * 0.042;
    const monthlyRent = annualRent / 12;

    resultEmi.innerText = `₹ ${Math.round(emi).toLocaleString('en-IN')}`;
    resultAppreciation.innerText = `₹ ${(appreciationValue / 100000).toFixed(1)} L`;
    resultYield.innerText = `₹ ${Math.round(monthlyRent).toLocaleString('en-IN')} / mo`;
  }

  priceSlider.addEventListener('input', calculate);
  downSlider.addEventListener('input', calculate);
  tenureSlider.addEventListener('input', calculate);
  rateSlider.addEventListener('input', calculate);

  calculate();
}

/* ================== MODALS & VIP FORM HANDLING ================== */
function initModalsAndForms() {
  const scheduleBtns = document.querySelectorAll('.trigger-schedule');
  const brochureBtns = document.querySelectorAll('.trigger-brochure');
  const floorplanBtns = document.querySelectorAll('.trigger-floorplan');
  const compareBtns = document.querySelectorAll('.trigger-comparison');
  
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const closeModalBtn = document.getElementById('closeModalBtn');

  const bookingForm = document.getElementById('vipBookingForm');

  function openModal(htmlContent) {
    if (!modalOverlay) return;
    modalBody.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  scheduleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(`
        <div class="text-center">
          <span class="badge-neon">• VIP PRIORITY ACCESS •</span>
          <h2 class="section-title">Schedule VIP Site Visit</h2>
          <p class="section-subtitle">Experience 80,000 Sq. Ft. of Life in Motion and tour our 34-storey architectural models.</p>
          <form id="modalScheduleForm" style="max-width: 500px; margin: 0 auto; text-align: left;">
            <div class="form-group">
              <label>Your Full Name *</label>
              <input type="text" required placeholder="e.g. Rahul Sharma" />
            </div>
            <div class="form-group">
              <label>Mobile Number *</label>
              <input type="tel" required placeholder="e.g. +91 98765 43210" />
            </div>
            <div class="form-group">
              <label>Preferred Residence Configuration</label>
              <select>
                <option>2 BHK Luxury Sports Residence (₹ 88.5 L*)</option>
                <option>3 BHK Premium Residence (₹ 1.28 Cr*)</option>
                <option>3 BHK Grand Corner Suite (₹ 1.49 Cr*)</option>
                <option>4 BHK Sky Residence & Penthouse (₹ 2.15 Cr*)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Preferred Date & Time</label>
              <input type="datetime-local" />
            </div>
            <button type="submit" class="btn btn-neon" style="width: 100%; margin-top: 10px;">
              <i class="ri-calendar-check-line"></i> Confirm Priority Booking
            </button>
          </form>
        </div>
      `);

      const form = document.getElementById('modalScheduleForm');
      if (form) {
        form.addEventListener('submit', (ev) => {
          ev.preventDefault();
          closeModal();
          showToast("VIP Site Visit Scheduled! Our Senior Relationship Manager will contact you in 15 minutes.");
        });
      }
    });
  });

  brochureBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast("Downloading Official Brochure (Mahalaxmi_The_ARENA_Brochure.pdf)...");
    });
  });

  floorplanBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const config = btn.getAttribute('data-config') || '2 BHK Luxury';
      const imgSrc = btn.getAttribute('data-image')  || 'assets/images/floorplan_2bhk.jpg';
      const area   = btn.getAttribute('data-area')   || '';
      const tag    = btn.getAttribute('data-tag')    || '';

      openModal(`
        <div style="max-width: 900px; margin: 0 auto;">
          <div class="text-center" style="margin-bottom: 20px;">
            <span class="badge-neon">• OFFICIAL FLOOR PLAN •</span>
            <h2 class="section-title" style="margin: 10px 0 6px;">${config} <span class="highlight-neon">Floor Plan</span></h2>
            <p style="color: rgba(255,255,255,0.5); font-size: 0.82rem; letter-spacing: 1.5px; text-transform: uppercase;">${tag} &nbsp;|&nbsp; RERA Carpet Area: <strong style="color: var(--neon-lime);">${area}</strong></p>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 14px;">
            <button id="fpZoomOut" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center;">−</button>
            <span id="fpZoomLabel" style="color: rgba(255,255,255,0.5); font-size: 0.8rem; min-width: 48px; text-align: center;">100%</span>
            <button id="fpZoomIn" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center;">+</button>
            <button id="fpZoomReset" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); padding: 6px 14px; border-radius: 8px; cursor: pointer; font-size: 0.75rem; margin-left: 6px;">Reset</button>
          </div>
          <div id="fpContainer" style="overflow: auto; border-radius: 14px; border: 1px solid rgba(128,64,192,0.35); background: #fff; cursor: grab; max-height: 60vh; display: flex; align-items: flex-start; justify-content: center;">
            <img id="fpImage" src="${imgSrc}" alt="${config} Floor Plan - Official Mahalaxmi The ARENA Brochure"
              style="width: 100%; height: auto; display: block; transform-origin: top left; transition: transform 0.2s ease; user-select: none;">
          </div>
          <p style="text-align: center; color: rgba(255,255,255,0.3); font-size: 0.72rem; margin-top: 10px;">
            Source: Official Mahalaxmi The ARENA Sales Brochure &nbsp;•&nbsp; Scroll to zoom &nbsp;•&nbsp; Drag to pan
          </p>
          <div style="display: flex; gap: 12px; justify-content: center; margin-top: 18px; flex-wrap: wrap;">
            <button class="btn btn-neon trigger-schedule">
              <i class="ri-vip-crown-line"></i> Book a Site Visit
            </button>
            <button class="btn btn-glass trigger-schedule">
              <i class="ri-calendar-event-line"></i> Check Availability
            </button>
          </div>
        </div>
      `);

      let scale = 1;
      const img       = document.getElementById('fpImage');
      const container = document.getElementById('fpContainer');
      const label     = document.getElementById('fpZoomLabel');

      function applyZoom() {
        img.style.transform = 'scale(' + scale + ')';
        img.style.transformOrigin = 'top center';
        label.textContent = Math.round(scale * 100) + '%';
      }

      document.getElementById('fpZoomIn').addEventListener('click', () => { scale = Math.min(scale + 0.25, 4); applyZoom(); });
      document.getElementById('fpZoomOut').addEventListener('click', () => { scale = Math.max(scale - 0.25, 0.5); applyZoom(); });
      document.getElementById('fpZoomReset').addEventListener('click', () => { scale = 1; applyZoom(); });

      container.addEventListener('wheel', (ev) => {
        ev.preventDefault();
        scale = ev.deltaY < 0 ? Math.min(scale + 0.15, 4) : Math.max(scale - 0.15, 0.5);
        applyZoom();
      }, { passive: false });

      let isDragging = false, startX, startY, scrollLeft, scrollTop;
      container.addEventListener('mousedown', (ev) => { isDragging = true; startX = ev.pageX; startY = ev.pageY; scrollLeft = container.scrollLeft; scrollTop = container.scrollTop; container.style.cursor = 'grabbing'; });
      container.addEventListener('mouseleave', () => { isDragging = false; container.style.cursor = 'grab'; });
      container.addEventListener('mouseup', () => { isDragging = false; container.style.cursor = 'grab'; });
      container.addEventListener('mousemove', (ev) => {
        if (!isDragging) return;
        ev.preventDefault();
        container.scrollLeft = scrollLeft - (ev.pageX - startX);
        container.scrollTop  = scrollTop  - (ev.pageY - startY);
      });
    });
  });

  compareBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const compData = typeof ARENA_DATA !== 'undefined' && ARENA_DATA.residenceComparison ? ARENA_DATA.residenceComparison : [];
      let tableRows = '';
      compData.forEach(item => {
        tableRows += `
          <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
            <td style="padding: 12px 10px; font-weight: 700; color: var(--neon-lime);">${item.type}</td>
            <td style="padding: 12px 10px;">${item.carpetArea}</td>
            <td style="padding: 12px 10px;">${item.balconyTerrace}</td>
            <td style="padding: 12px 10px;">${item.slabHeight}</td>
            <td style="padding: 12px 10px;">${item.bathrooms}</td>
            <td style="padding: 12px 10px;">${item.parking}</td>
            <td style="padding: 12px 10px; font-weight: 700; color: #fff;">${item.priceRange}</td>
          </tr>
        `;
      });

      openModal(`
        <div class="text-center" style="max-width: 900px; margin: 0 auto; text-align: left;">
          <span class="badge-neon">• SIDE-BY-SIDE ANALYSIS •</span>
          <h2 class="section-title">2, 3 & 4 BHK <span class="highlight-neon">RESIDENCE COMPARISON</span></h2>
          <p class="section-subtitle" style="margin-bottom: 24px;">Compare authentic architectural specifications and carpet areas from the official 18-page Mahalaxmi The ARENA brochure.</p>
          
          <div style="overflow-x: auto; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.92rem;">
              <thead>
                <tr style="border-bottom: 2px solid var(--neon-lime); color: var(--neon-lime); font-weight: 700;">
                  <th style="padding: 12px 10px;">Configuration</th>
                  <th style="padding: 12px 10px;">Carpet Area</th>
                  <th style="padding: 12px 10px;">Balcony / Deck</th>
                  <th style="padding: 12px 10px;">Slab Height</th>
                  <th style="padding: 12px 10px;">Bathrooms</th>
                  <th style="padding: 12px 10px;">Parking</th>
                  <th style="padding: 12px 10px;">Price Range</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </div>

          <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; margin-bottom: 20px; font-size: 0.9rem; border-left: 3px solid var(--purple-accent);">
            <strong>Common Salient Features Across All Configurations:</strong><br>
            • 3 High-Speed Elevators (2.5m/s) + 1 Service Elevator per Wing<br>
            • Digital Smart Main Door Lock by Yale & 7" IP Video Door Phone<br>
            • 1800 x 1200 mm Large Format Vitrified Tiles in living, dining, and bedrooms<br>
            • Three-track UPVC soundproof sliding windows with mosquito mesh
          </div>

          <div class="text-center">
            <button class="btn btn-neon trigger-schedule" onclick="document.getElementById('closeModalBtn').click();">
              <i class="ri-vip-crown-line"></i> Book Priority Site Visit
            </button>
          </div>
        </div>
      `);
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Thank you! Your inquiry for Mahalaxmi The ARENA has been registered successfully.");
      bookingForm.reset();
    });
  }
}

/* ================== TOAST NOTIFICATION SYSTEM ================== */
function showToast(message) {
  let toast = document.getElementById('arenaToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'arenaToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: rgba(13, 8, 24, 0.95);
      color: #DFFE00;
      border: 2px solid #DFFE00;
      padding: 16px 28px;
      border-radius: 9999px;
      font-weight: 700;
      font-family: 'Outfit', sans-serif;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(223, 254, 0, 0.3);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="font-size: 1.4rem;"></i> <span>${message}</span>`;
  toast.style.display = 'flex';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 4500);
}

/* ================== SCROLL REVEAL SYSTEM ================== */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

/* ================== VISUAL GALLERY & LIGHTBOX ================== */
function initGalleryAndLightbox() {
  const buttons = document.querySelectorAll('.gallery-btn');
  const items = document.querySelectorAll('.gallery-item');
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!buttons.length || !items.length) return;

  // Filter functionality
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => { item.style.opacity = '1'; }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox functionality
  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const title = item.getAttribute('data-title');
      if (src && overlay) {
        lightboxImg.src = src;
        if (lightboxTitle) lightboxTitle.textContent = title || 'Image View';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ================== SCROLL PROGRESS BAR ================== */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}

/* ================== COUNTER ANIMATION ================== */
function initCounterAnimation() {
  const statsBar = document.querySelector('.stats-bar');
  if (!statsBar) return;
  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      animateAllCounters();
    }
  }, { threshold: 0.4 });
  observer.observe(statsBar);
}

function animateAllCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const target = parseFloat(el.getAttribute('data-count'));
    const isDecimal = String(target).includes('.');
    const duration = 2000;
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = isDecimal
        ? current.toFixed(1)
        : Math.floor(current).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString('en-IN');
    }
    requestAnimationFrame(tick);
  });
}

/* ================== NAV ACTIVE LINK TRACKING ================== */
function initNavActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item a');
  if (!sections.length || !navLinks.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '-60px 0px -40% 0px' });
  sections.forEach(s => observer.observe(s));
}

/* ================== MOBILE DRAWER ================== */
function initMobileDrawer() {
  const toggle = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerCloseBtn');
  if (!toggle || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}
