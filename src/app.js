/**
 * 手機端旅遊行程網頁主程式 (app.js)
 */

(function () {
  const STORAGE_KEY = 'family_travel_itinerary_data_v6'; // 更新 key 載入仁德十鼓＋台江主場日版

  const CATEGORY_MAP = {
    attraction: { label: '景點', icon: 'map-pin', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200' },
    food: { label: '美食', icon: 'utensils', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    cafe: { label: '咖啡', icon: 'coffee', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    shopping: { label: '購物', icon: 'shopping-bag', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    hotel: { label: '住宿', icon: 'bed-double', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
    transport: { label: '交通', icon: 'navigation-2', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    activity: { label: '活動', icon: 'sparkles', bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
  };

  let tripData = null;
  let activeTab = 'itinerary';
  let activeDayIndex = 0;
  let isEditMode = false;

  function init() {
    loadData();
    setupEventListeners();
    renderAll();
  }

  function loadData() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#trip=')) {
      try {
        const compressed = hash.replace('#trip=', '');
        const decompressed = window.LZString ? LZString.decompressFromEncodedURIComponent(compressed) : decodeURIComponent(compressed);
        if (decompressed) {
          tripData = JSON.parse(decompressed);
          saveData();
          history.replaceState(null, '', window.location.pathname);
          showToast('已成功載入分享的行程！');
          return;
        }
      } catch (e) {
        console.error('Failed to parse URL trip data:', e);
      }
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        tripData = JSON.parse(saved);
      } catch (e) {
        tripData = JSON.parse(JSON.stringify(window.defaultTripData));
      }
    } else {
      tripData = JSON.parse(JSON.stringify(window.defaultTripData));
    }
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tripData));
  }

  function updateCountdown() {
    const countdownEl = document.getElementById('trip-countdown');
    if (!countdownEl || !tripData.startDate) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(tripData.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(tripData.endDate);
    end.setHours(0, 0, 0, 0);

    const diffToStart = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
    const diffToEnd = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

    if (diffToStart > 0) {
      countdownEl.innerText = `還有 ${diffToStart} 天出發！🚅`;
    } else if (diffToStart <= 0 && diffToEnd >= 0) {
      const currentDay = Math.abs(diffToStart) + 1;
      countdownEl.innerText = `旅程進行中！Day ${currentDay} 🌕`;
    } else {
      countdownEl.innerText = '中秋美好回憶典藏中 🌕';
    }
  }

  function renderAll() {
    renderHeader();
    renderDayTabs();
    renderTimeline();
    renderInfoTab();
    renderPackingTab();
    renderExpensesTab();
    refreshIcons();
  }

  function renderHeader() {
    document.getElementById('trip-title').innerText = tripData.title || '中秋返鄉旅遊行程';
    document.getElementById('trip-destination').innerText = tripData.destination || '台南 & 彰化北斗';
    document.getElementById('trip-dates').innerText = `${tripData.startDate} ~ ${tripData.endDate}`;
    document.getElementById('trip-members-badge').innerText = `${tripData.members.length} 位同行`;
    updateCountdown();

    const editBanner = document.getElementById('edit-mode-banner');
    const editText = document.getElementById('edit-mode-text');
    if (isEditMode) {
      editBanner.classList.remove('hidden');
      editText.innerText = '完成';
    } else {
      editBanner.classList.add('hidden');
      editText.innerText = '編輯';
    }
  }

  function renderDayTabs() {
    const tabsContainer = document.getElementById('day-tabs');
    tabsContainer.innerHTML = '';

    tripData.days.forEach((day, index) => {
      const isActive = index === activeDayIndex;
      const btn = document.createElement('button');
      btn.className = `shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold transition flex flex-col items-center gap-0.5 ${
        isActive
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`;
      btn.innerHTML = `
        <span class="text-[11px] ${isActive ? 'text-indigo-200' : 'text-slate-400'}">Day ${day.dayNumber}</span>
        <span class="text-xs">${day.date.slice(5).replace('-', '/')} (${day.weekday.replace('週', '')})</span>
      `;
      btn.addEventListener('click', () => {
        activeDayIndex = index;
        renderDayTabs();
        renderTimeline();
        refreshIcons();
      });
      tabsContainer.appendChild(btn);
    });
  }

  function renderTimeline() {
    const currentDay = tripData.days[activeDayIndex];
    if (!currentDay) return;

    document.getElementById('current-day-label').innerText = `Day ${currentDay.dayNumber}`;
    document.getElementById('current-day-date').innerText = `${currentDay.date} (${currentDay.weekday})`;
    document.getElementById('current-day-theme').innerText = currentDay.theme || '行程規劃';
    document.getElementById('current-day-weather').innerHTML = `
      <i data-lucide="sun" class="w-3.5 h-3.5 text-amber-500"></i>
      <span>${currentDay.weather || '晴朗'}</span>
    `;

    const timelineContainer = document.getElementById('timeline-list');
    timelineContainer.innerHTML = '';

    if (!currentDay.spots || currentDay.spots.length === 0) {
      timelineContainer.innerHTML = `
        <div class="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
          今天還沒有安排景點喔！點擊下方按鈕加入景點。
        </div>
      `;
      return;
    }

    currentDay.spots.forEach((spot, idx) => {
      const cat = CATEGORY_MAP[spot.category] || CATEGORY_MAP.attraction;
      const isLast = idx === currentDay.spots.length - 1;

      const spotEl = document.createElement('div');
      spotEl.className = 'timeline-item relative pl-9 pb-2';

      if (!isLast || spot.transitToNext) {
        spotEl.innerHTML += `<div class="timeline-stem"></div>`;
      }

      spotEl.innerHTML += `
        <div class="absolute left-2.5 top-3 -translate-x-1/2 w-6 h-6 rounded-full ${cat.bg} border-2 ${cat.border} flex items-center justify-center z-10 shadow-xs">
          <i data-lucide="${cat.icon}" class="w-3 h-3 ${cat.text}"></i>
        </div>
      `;

      const card = document.createElement('div');
      card.className = `spot-card ${spot.completed ? 'is-completed' : ''} bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-2.5 transition`;

      const headerHtml = `
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-bold text-slate-800 tracking-tight">${spot.time || ''}</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.bg} ${cat.text} border ${cat.border}">
              ${cat.label}
            </span>
            ${spot.cost ? `<span class="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">${spot.cost}</span>` : ''}
          </div>

          <div class="flex items-center gap-1 shrink-0">
            ${
              isEditMode
                ? `
                <button class="btn-edit-spot p-1 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100" title="編輯景點" data-id="${spot.id}">
                  <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
                </button>
                <button class="btn-del-spot p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100" title="刪除景點" data-id="${spot.id}">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              `
                : `
                <button class="btn-toggle-spot-check flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-xl transition ${
                  spot.completed
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }" data-id="${spot.id}">
                  <i data-lucide="${spot.completed ? 'check-circle-2' : 'circle'}" class="w-3.5 h-3.5"></i>
                  <span>${spot.completed ? '已抵達' : '標記抵達'}</span>
                </button>
              `
            }
          </div>
        </div>
      `;

      const bodyHtml = `
        <div>
          <h3 class="spot-title text-sm font-bold text-slate-900 leading-snug">${spot.title}</h3>
          ${
            spot.location
              ? `
            <div class="flex items-center justify-between gap-2 mt-1.5">
              <span class="text-xs text-slate-500 flex items-center gap-1 truncate">
                <i data-lucide="map-pin" class="w-3 h-3 text-slate-400 shrink-0"></i>
                <span class="truncate">${spot.location}</span>
              </span>
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.mapQuery || spot.location)}" target="_blank" class="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-2.5 py-1 rounded-lg hover:bg-indigo-100 active:scale-95">
                <i data-lucide="navigation" class="w-3 h-3"></i>
                <span>導航</span>
              </a>
            </div>
          `
              : ''
          }
        </div>
      `;

      const noteHtml = spot.note
        ? `
        <div class="text-xs text-slate-600 bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 flex items-start gap-1.5">
          <i data-lucide="info" class="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5"></i>
          <span class="leading-relaxed">${spot.note}</span>
        </div>
      `
        : '';

      card.innerHTML = headerHtml + bodyHtml + noteHtml;
      spotEl.appendChild(card);

      if (spot.transitToNext) {
        const transitEl = document.createElement('div');
        transitEl.className = 'my-2 ml-2 pl-3 border-l-2 border-dashed border-indigo-200 text-xs text-indigo-700 flex items-center gap-1.5 py-1';
        transitEl.innerHTML = `
          <i data-lucide="arrow-down-circle" class="w-3.5 h-3.5 text-indigo-500"></i>
          <span class="font-medium">${spot.transitToNext}</span>
        `;
        spotEl.appendChild(transitEl);
      }

      timelineContainer.appendChild(spotEl);
    });

    timelineContainer.querySelectorAll('.btn-toggle-spot-check').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        toggleSpotComplete(id);
      });
    });

    timelineContainer.querySelectorAll('.btn-edit-spot').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openEditSpotModal(id);
      });
    });

    timelineContainer.querySelectorAll('.btn-del-spot').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteSpot(id);
      });
    });
  }

  function toggleSpotComplete(spotId) {
    const currentDay = tripData.days[activeDayIndex];
    const spot = currentDay.spots.find(s => s.id === spotId);
    if (!spot) return;

    spot.completed = !spot.completed;
    saveData();
    renderTimeline();
    refreshIcons();

    if (spot.completed && window.confetti) {
      window.confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  }

  function deleteSpot(spotId) {
    if (!confirm('確定要刪除這個景點嗎？')) return;
    const currentDay = tripData.days[activeDayIndex];
    currentDay.spots = currentDay.spots.filter(s => s.id !== spotId);
    saveData();
    renderTimeline();
    refreshIcons();
    showToast('已刪除景點');
  }

  // 渲染速查資訊 (飯店列表 + 高鐵車票 + 緊急電話)
  function renderInfoTab() {
    const hotelContainer = document.getElementById('hotel-card-container');
    if (hotelContainer) {
      hotelContainer.innerHTML = '';
      (tripData.accommodations || []).forEach((hotel, idx) => {
        const hCard = document.createElement('div');
        hCard.className = 'bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3';
        hCard.innerHTML = `
          <div class="flex items-start justify-between">
            <div>
              <span class="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                🏨 ${idx === 0 ? '第一晚 (9/25 永康)' : '第二晚 (9/26 安平)'}
              </span>
              <h3 class="text-base font-bold text-slate-900 mt-1.5">${hotel.name}</h3>
              <p class="text-xs text-slate-500">${hotel.enName || ''}</p>
            </div>
            <a href="tel:${hotel.phone.replace(/[^0-9+]/g, '')}" class="p-2.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200 shadow-xs hover:bg-emerald-100 active:scale-95" title="撥打電話給飯店">
              <i data-lucide="phone" class="w-4 h-4"></i>
            </a>
          </div>

          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2">
            <div class="flex items-start justify-between gap-2">
              <span class="text-slate-500 shrink-0">地址：</span>
              <span class="font-medium text-slate-800 text-right">${hotel.address}</span>
            </div>
            <div class="flex items-center justify-end gap-2 pt-1 border-t border-slate-200/60">
              <button class="btn-copy-addr px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-1 active:scale-95" data-addr="${hotel.address}">
                <i data-lucide="copy" class="w-3 h-3"></i>
                <span>複製地址</span>
              </button>
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.mapQuery || hotel.name)}" target="_blank" class="px-2.5 py-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 flex items-center gap-1 active:scale-95">
                <i data-lucide="navigation" class="w-3 h-3"></i>
                <span>地圖導航</span>
              </a>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 block text-[10px]">訂單確認編號</span>
              <span class="font-bold text-slate-700">${hotel.bookingRef || '-'}</span>
            </div>
            <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 block text-[10px]">入住 / 退房時間</span>
              <span class="font-bold text-slate-700">15:00 / 11:00</span>
            </div>
          </div>
          <p class="text-xs text-slate-600 bg-amber-50/60 border border-amber-200/50 p-2.5 rounded-xl">
            💡 ${hotel.notes || '入住時請出示訂單與全員證件'}
          </p>
        `;
        hotelContainer.appendChild(hCard);
      });

      // 綁定複製按鈕
      hotelContainer.querySelectorAll('.btn-copy-addr').forEach(btn => {
        btn.addEventListener('click', () => {
          const addr = btn.getAttribute('data-addr');
          copyTextToClipboard(addr, '飯店地址已複製至剪貼簿！');
        });
      });
    }

    // 高鐵票券
    const flightsContainer = document.getElementById('flights-list');
    flightsContainer.innerHTML = '';
    (tripData.flights || []).forEach(f => {
      const flightEl = document.createElement('div');
      flightEl.className = 'p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2';
      flightEl.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">${f.type}</span>
            <span class="font-black text-slate-800">${f.flightNo}</span>
          </div>
          <span class="font-semibold text-slate-500">${f.date}</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200/60">
          <div>
            <span class="text-slate-400 block">出發 (${f.departureTime})</span>
            <strong class="text-slate-800">${f.departureAirport}</strong>
          </div>
          <div>
            <span class="text-slate-400 block">抵達 (${f.arrivalTime})</span>
            <strong class="text-slate-800">${f.arrivalAirport}</strong>
          </div>
        </div>
        <div class="text-[11px] font-semibold text-indigo-900 bg-indigo-50/80 p-2 rounded-lg border border-indigo-100">
          🎫 訂位代號：<span class="font-black tracking-wider text-rose-600">${f.bookingRef}</span>
        </div>
        ${f.notes ? `<p class="text-[11px] text-slate-600 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60">${f.notes}</p>` : ''}
      `;
      flightsContainer.appendChild(flightEl);
    });

    // 緊急電話
    const emergencyContainer = document.getElementById('emergency-list');
    emergencyContainer.innerHTML = '';
    (tripData.emergency || []).forEach(em => {
      const item = document.createElement('div');
      item.className = 'py-2.5 flex items-center justify-between gap-2';
      item.innerHTML = `
        <div>
          <div class="font-bold text-slate-900 text-xs">${em.title}</div>
          <div class="text-[11px] text-slate-500">${em.note || ''}</div>
        </div>
        <a href="tel:${em.number.replace(/[^0-9+]/g, '')}" class="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl font-bold text-xs hover:bg-rose-100 active:scale-95 shrink-0">
          <i data-lucide="phone" class="w-3 h-3"></i>
          <span>${em.number}</span>
        </a>
      `;
      emergencyContainer.appendChild(item);
    });
  }

  // 行李清單
  function renderPackingTab() {
    const listContainer = document.getElementById('packing-categories-list');
    listContainer.innerHTML = '';

    let totalItems = 0;
    let checkedItems = 0;

    (tripData.packingCategories || []).forEach(cat => {
      const catCard = document.createElement('div');
      catCard.className = 'bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2.5';

      const catHeader = document.createElement('h3');
      catHeader.className = 'text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5';
      catHeader.innerHTML = `<i data-lucide="folder" class="w-3.5 h-3.5 text-indigo-500"></i> ${cat.category}`;
      catCard.appendChild(catHeader);

      const itemsUl = document.createElement('div');
      itemsUl.className = 'divide-y divide-slate-100 text-xs';

      cat.items.forEach(item => {
        totalItems++;
        if (item.checked) checkedItems++;

        const row = document.createElement('label');
        row.className = 'py-2 flex items-center justify-between cursor-pointer active:bg-slate-50 transition px-1 rounded-lg';
        row.innerHTML = `
          <span class="flex items-center gap-2.5 ${item.checked ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}">
            <input type="checkbox" ${item.checked ? 'checked' : ''} class="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300">
            <span>${item.name}</span>
          </span>
        `;

        const checkbox = row.querySelector('input');
        checkbox.addEventListener('change', () => {
          item.checked = checkbox.checked;
          saveData();
          renderPackingTab();
          refreshIcons();

          if (checkedItems + 1 === totalItems && checkbox.checked && window.confetti) {
            window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          }
        });

        itemsUl.appendChild(row);
      });

      catCard.appendChild(itemsUl);
      listContainer.appendChild(catCard);
    });

    const pct = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
    document.getElementById('packing-progress-text').innerText = `${pct}% (${checkedItems}/${totalItems})`;
    document.getElementById('packing-progress-bar').style.width = `${pct}%`;

    const badge = document.getElementById('packing-badge');
    if (checkedItems < totalItems) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  // 支出記帳
  function renderExpensesTab() {
    const symbol = 'NT$';
    let totalSpent = 0;
    const memberPaidMap = {};

    tripData.members.forEach(m => {
      memberPaidMap[m] = 0;
    });

    (tripData.expenses || []).forEach(exp => {
      totalSpent += Number(exp.amount) || 0;
      if (memberPaidMap[exp.paidBy] !== undefined) {
        memberPaidMap[exp.paidBy] += Number(exp.amount) || 0;
      } else {
        memberPaidMap[exp.paidBy] = Number(exp.amount) || 0;
      }
    });

    const memberCount = tripData.members.length || 1;
    const perPerson = Math.round(totalSpent / memberCount);

    document.getElementById('total-expense-foreign').innerText = `${symbol}${totalSpent.toLocaleString()}`;
    document.getElementById('total-expense-home').innerText = `已付項目統計`;
    document.getElementById('per-person-cost').innerText = `${symbol}${perPerson.toLocaleString()} / 人`;

    // 每位家人代墊統計
    const memberContainer = document.getElementById('expense-by-member');
    memberContainer.innerHTML = '';
    Object.keys(memberPaidMap).forEach(m => {
      const amount = memberPaidMap[m];
      const card = document.createElement('div');
      card.className = 'p-3 bg-slate-50 rounded-xl border border-slate-200/80';
      card.innerHTML = `
        <span class="text-slate-400 block text-[10px]">${m} 先付</span>
        <span class="font-black text-slate-800 text-xs">${symbol}${amount.toLocaleString()}</span>
      `;
      memberContainer.appendChild(card);
    });

    // 支出歷史明細
    const historyContainer = document.getElementById('expenses-history-list');
    historyContainer.innerHTML = '';

    if (!tripData.expenses || tripData.expenses.length === 0) {
      historyContainer.innerHTML = '<p class="text-center text-slate-400 py-3">尚無記帳記錄</p>';
      return;
    }

    [...tripData.expenses].reverse().forEach(exp => {
      const row = document.createElement('div');
      row.className = 'py-2.5 flex items-center justify-between gap-2';
      row.innerHTML = `
        <div>
          <div class="font-bold text-slate-800 text-xs">${exp.title}</div>
          <div class="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1.5">
            <span class="bg-indigo-50 text-indigo-600 px-1.5 py-0.2 rounded font-semibold">${exp.category || '一般'}</span>
            <span>由 ${exp.paidBy} 支付</span>
            <span>${exp.date || ''}</span>
          </div>
        </div>
        <div class="text-right shrink-0">
          <span class="font-black text-slate-900 text-xs block">${symbol}${Number(exp.amount).toLocaleString()}</span>
        </div>
      `;
      historyContainer.appendChild(row);
    });
  }

  function setupEventListeners() {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
      });
    });

    document.getElementById('btn-toggle-edit').addEventListener('click', () => {
      isEditMode = !isEditMode;
      renderHeader();
      renderTimeline();
      refreshIcons();
    });

    document.getElementById('btn-finish-edit').addEventListener('click', () => {
      isEditMode = false;
      renderHeader();
      renderTimeline();
      refreshIcons();
    });

    document.getElementById('btn-open-share').addEventListener('click', openShareModal);
    document.getElementById('btn-copy-share-link').addEventListener('click', copyShareLink);
    document.getElementById('btn-export-json').addEventListener('click', exportJSON);

    document.getElementById('btn-add-spot').addEventListener('click', openAddSpotModal);
    document.getElementById('form-spot').addEventListener('submit', handleSaveSpot);

    document.getElementById('btn-add-expense').addEventListener('click', openAddExpenseModal);
    document.getElementById('form-expense').addEventListener('submit', handleSaveExpense);

    document.getElementById('btn-add-packing-item').addEventListener('click', handleAddPackingItem);

    document.getElementById('btn-open-settings').addEventListener('click', () => {
      document.getElementById('modal-settings').classList.remove('hidden');
      refreshIcons();
    });

    document.getElementById('btn-reset-data').addEventListener('click', () => {
      if (confirm('確定要恢復成預設的中秋返鄉行程嗎？現有自訂內容將被重設。')) {
        tripData = JSON.parse(JSON.stringify(window.defaultTripData));
        saveData();
        renderAll();
        closeModals();
        showToast('已恢復為中秋返鄉行程！');
      }
    });

    document.getElementById('import-json-input').addEventListener('change', handleImportJSON);

    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', closeModals);
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal) closeModals();
      });
    });
  }

  function switchTab(tabName) {
    activeTab = tabName;

    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    const targetSection = document.getElementById(`tab-content-${tabName}`);
    if (targetSection) targetSection.classList.remove('hidden');

    const daySelector = document.getElementById('day-selector-container');
    if (tabName === 'itinerary') {
      daySelector.classList.remove('hidden');
    } else {
      daySelector.classList.add('hidden');
    }

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const t = btn.getAttribute('data-tab');
      if (t === tabName) {
        btn.classList.add('text-indigo-600', 'font-bold');
        btn.classList.remove('text-slate-400', 'font-medium');
      } else {
        btn.classList.remove('text-indigo-600', 'font-bold');
        btn.classList.add('text-slate-400', 'font-medium');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshIcons();
  }

  function closeModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.add('hidden'));
  }

  function openShareModal() {
    const modal = document.getElementById('modal-share');
    modal.classList.remove('hidden');

    const jsonStr = JSON.stringify(tripData);
    let shareUrl = window.location.origin + window.location.pathname;
    try {
      if (window.LZString) {
        const compressed = LZString.compressToEncodedURIComponent(jsonStr);
        shareUrl += `#trip=${compressed}`;
      }
    } catch (e) {
      console.warn('LZString error:', e);
    }

    const qrcodeBox = document.getElementById('qrcode-box');
    qrcodeBox.innerHTML = '';
    try {
      new QRCode(qrcodeBox, {
        text: shareUrl,
        width: 160,
        height: 160,
        colorDark: '#1e1b4b',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L
      });
    } catch (e) {
      qrcodeBox.innerHTML = '<p class="text-xs text-slate-400">QR Code 產生失敗，請複製連結。</p>';
    }

    refreshIcons();
  }

  function copyShareLink() {
    const jsonStr = JSON.stringify(tripData);
    let shareUrl = window.location.origin + window.location.pathname;
    if (window.LZString) {
      const compressed = LZString.compressToEncodedURIComponent(jsonStr);
      shareUrl += `#trip=${compressed}`;
    }
    copyTextToClipboard(shareUrl, '行程分享連結已複製！發送給家人即可一鍵開啟。');
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(tripData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `moon-festival-${tripData.startDate || 'trip'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('行程已成功匯出為 JSON 檔案！');
  }

  function handleImportJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && parsed.days && parsed.title) {
          tripData = parsed;
          saveData();
          renderAll();
          closeModals();
          showToast('行程 JSON 已成功匯入！');
        } else {
          alert('匯入的 JSON 格式不正確。');
        }
      } catch (err) {
        alert('解析 JSON 檔案失敗。');
      }
    };
    reader.readAsText(file);
  }

  function openAddSpotModal() {
    document.getElementById('modal-spot-title').innerText = '新增行程景點';
    document.getElementById('spot-edit-id').value = '';
    document.getElementById('spot-title-input').value = '';
    document.getElementById('spot-time').value = '';
    document.getElementById('spot-cost').value = '';
    document.getElementById('spot-map-query').value = '';
    document.getElementById('spot-notes').value = '';
    document.getElementById('spot-transit').value = '';

    const daySelect = document.getElementById('spot-day-select');
    daySelect.innerHTML = '';
    tripData.days.forEach((d, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.innerText = `Day ${d.dayNumber} (${d.date.slice(5)})`;
      if (idx === activeDayIndex) opt.selected = true;
      daySelect.appendChild(opt);
    });

    document.getElementById('modal-spot').classList.remove('hidden');
    refreshIcons();
  }

  function openEditSpotModal(spotId) {
    const currentDay = tripData.days[activeDayIndex];
    const spot = currentDay.spots.find(s => s.id === spotId);
    if (!spot) return;

    document.getElementById('modal-spot-title').innerText = '編輯行程景點';
    document.getElementById('spot-edit-id').value = spot.id;
    document.getElementById('spot-title-input').value = spot.title || '';
    document.getElementById('spot-time').value = spot.time || '';
    document.getElementById('spot-category').value = spot.category || 'attraction';
    document.getElementById('spot-cost').value = spot.cost || '';
    document.getElementById('spot-map-query').value = spot.mapQuery || spot.location || '';
    document.getElementById('spot-notes').value = spot.note || '';
    document.getElementById('spot-transit').value = spot.transitToNext || '';

    const daySelect = document.getElementById('spot-day-select');
    daySelect.innerHTML = '';
    tripData.days.forEach((d, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.innerText = `Day ${d.dayNumber} (${d.date.slice(5)})`;
      if (idx === activeDayIndex) opt.selected = true;
      daySelect.appendChild(opt);
    });

    document.getElementById('modal-spot').classList.remove('hidden');
    refreshIcons();
  }

  function handleSaveSpot(e) {
    e.preventDefault();
    const editId = document.getElementById('spot-edit-id').value;
    const targetDayIndex = parseInt(document.getElementById('spot-day-select').value, 10);
    const title = document.getElementById('spot-title-input').value.trim();
    const time = document.getElementById('spot-time').value.trim();
    const category = document.getElementById('spot-category').value;
    const cost = document.getElementById('spot-cost').value.trim();
    const mapQuery = document.getElementById('spot-map-query').value.trim();
    const note = document.getElementById('spot-notes').value.trim();
    const transitToNext = document.getElementById('spot-transit').value.trim();

    if (!title) return;

    const spotObj = {
      id: editId || 'spot-' + Date.now(),
      time,
      title,
      category,
      location: mapQuery,
      mapQuery,
      cost,
      note,
      completed: false,
      transitToNext
    };

    if (editId) {
      const oldDay = tripData.days[activeDayIndex];
      oldDay.spots = oldDay.spots.filter(s => s.id !== editId);
      tripData.days[targetDayIndex].spots.push(spotObj);
    } else {
      tripData.days[targetDayIndex].spots.push(spotObj);
    }

    saveData();
    activeDayIndex = targetDayIndex;
    renderDayTabs();
    renderTimeline();
    closeModals();
    showToast('景點已成功儲存！');
  }

  function openAddExpenseModal() {
    document.getElementById('expense-title').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-date').value = new Date().toISOString().split('T')[0];

    const memberSelect = document.getElementById('expense-paid-by');
    memberSelect.innerHTML = '';
    tripData.members.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.innerText = m;
      memberSelect.appendChild(opt);
    });

    document.getElementById('modal-expense').classList.remove('hidden');
    refreshIcons();
  }

  function handleSaveExpense(e) {
    e.preventDefault();
    const title = document.getElementById('expense-title').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const paidBy = document.getElementById('expense-paid-by').value;
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;

    if (!title || isNaN(amount) || amount <= 0) return;

    if (!tripData.expenses) tripData.expenses = [];
    tripData.expenses.push({
      id: 'e-' + Date.now(),
      title,
      amount,
      currency: 'TWD',
      paidBy,
      category,
      date
    });

    saveData();
    renderExpensesTab();
    closeModals();
    showToast('記帳成功！');
  }

  function handleAddPackingItem() {
    const name = prompt('請輸入要新增的行李或準備項目名稱：');
    if (!name || !name.trim()) return;

    if (!tripData.packingCategories || tripData.packingCategories.length === 0) {
      tripData.packingCategories = [{ category: '個人準備清單', items: [] }];
    }

    tripData.packingCategories[0].items.push({
      id: 'p-' + Date.now(),
      name: name.trim(),
      checked: false
    });

    saveData();
    renderPackingTab();
    refreshIcons();
    showToast('已新增行李項目');
  }

  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || '已複製至剪貼簿！');
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(successMsg || '已複製至剪貼簿！');
  }

  function showToast(message) {
    const existing = document.getElementById('app-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-200 pointer-events-none';
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, -10px)';
      setTimeout(() => toast.remove(), 250);
    }, 2400);
  }

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
