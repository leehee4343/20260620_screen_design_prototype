    let currentActiveMenuId = 'common-1';
    let currentActiveTab    = '관리자 목록';
    let openTabs            = [
      { id: 'common-1', childId: 'common-1', tabName: '관리자 목록', label: '관리자 관리' }
    ];
    let selectedAuthGroup   = '1';

    const menuContainer          = document.getElementById('menu-container');
    const megaMenuContainer      = document.getElementById('top-mega-menu');
    const tabsContainer          = document.getElementById('tabs-container');
    const contentsContainer      = document.getElementById('contents-container');
    const breadcrumbCurrentTitle = document.getElementById('breadcrumb-current-title');
    const breadcrumbPathContent  = document.getElementById('breadcrumb-path-content');
    const userGreeting           = document.getElementById('user-greeting');
    const authGroupButtons       = document.getElementById('auth-group-buttons');

    window.onload = function() {
      renderLNB();
      setupAuthButtons();
      selectMenu(currentActiveMenuId, currentActiveTab);
    };

    function uiIcon(name) {
      const icons = {
        login: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/>',
        inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
        edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
        'bar-chart': '<path d="M3 3v18h18"/><path d="M8 17V9"/><path d="M13 17V5"/><path d="M18 17v-3"/>',
        clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
        'credit-card': '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/>',
        wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V6"/><path d="M16 13h.01"/>',
        award: '<circle cx="12" cy="8" r="5"/><path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5"/>',
        car: '<path d="M19 17h2l-2-6-3-4H8l-3 4-2 6h2"/><path d="M7 17h10"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
        settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M4.9 4.9l2.1 2.1"/><path d="M17 17l2.1 2.1"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="M4.9 19.1 7 17"/><path d="M17 7l2.1-2.1"/>',
        wrench: '<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-3-3z"/>',
        trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
        file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/>',
        book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
        user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
        bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14a6 6 0 1 1 8 0c-.8.7-1 1.4-1 2H9c0-.6-.2-1.3-1-2z"/>',
        building: '<path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M9 8h4"/><path d="M9 12h4"/><path d="M9 16h4"/>',
        alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
        dollar: '<path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6"/>',
        ruler: '<path d="M3 17 17 3l4 4L7 21z"/><path d="M14 6l4 4"/><path d="M11 9l2 2"/><path d="M8 12l2 2"/>',
        calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
        target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
        construction: '<path d="M2 21h20"/><path d="M6 21V7l6-4 6 4v14"/><path d="M9 21v-8h6v8"/>',
        pin: '<path d="M12 21s7-5.3 7-12a7 7 0 0 0-14 0c0 6.7 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
        help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1.4-2.9 1.8-2.9 4"/><path d="M12 17h.01"/>',
        search: '<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21"/>',
        menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
        left: '<path d="M15 18l-6-6 6-6"/>',
        right: '<path d="M9 18l6-6-6-6"/>',
        plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
        download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
        trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/>',
        shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-5"/>',
        users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'
      };
      const safeName = String(name || 'folder').replace(/[^a-z0-9-]/gi, '');
      return `<span class="ui-icon ui-icon-${safeName}" aria-hidden="true"><svg viewBox="0 0 24 24"><rect class="icon-bg" x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle class="icon-orb" cx="17.5" cy="6.5" r="3.2"/><g class="icon-mark">${icons[name] || icons.folder}</g></svg></span>`;
    }



    /* 상단 업무 메뉴 렌더링 */
    function renderLNB() {
      menuContainer.innerHTML = '';
      menuContainer.style.setProperty('--menu-count', menuData.length);
      if (megaMenuContainer) megaMenuContainer.style.setProperty('--menu-count', menuData.length);
      menuData.forEach(parent => {
        const li = document.createElement('li');
        li.className = 'menu-1depth';
        const openCls  = '';
        const activeCls = '';
        const arrow     = '▸';

        li.innerHTML = `
          <div class="menu-1depth-header ${activeCls}" id="header-${parent.id}">
            <div class="menu-1depth-icon">${uiIcon(parent.icon || 'folder')}</div>
            <div class="menu-1depth-label">${parent.label}</div>
            <span class="toggle-icon" id="icon-${parent.id}">${arrow}</span>
          </div>
          <ul class="menu-2depth-list ${openCls}" id="list-${parent.id}">
            ${parent.children.map(child => {
              const childActiveCls = child.id === currentActiveMenuId ? 'active' : '';
              return `<li class="menu-2depth-item ${childActiveCls}" data-id="${child.id}"
                onclick="handleSubMenuClick(event,'${parent.label}','${child.label}','${child.id}')">${child.label}</li>`;
            }).join('')}
          </ul>`;
        menuContainer.appendChild(li);
      });
      renderTopMegaMenu();
    }

    /* 전체 2Depth 메가메뉴 렌더링 */
    function renderTopMegaMenu() {
      if (!megaMenuContainer) return;
      megaMenuContainer.innerHTML = menuData.map(parent => {
        const firstChild = parent.children[0];
        const firstChildTab = firstChild ? (tabData[firstChild.id] || ['기본 화면'])[0] : '';
        const isActiveCol = parent.children.some(c => c.id === currentActiveMenuId);
        return `
          <section class="mega-column${isActiveCol ? ' active-col' : ''}" data-parent-id="${parent.id}">
            <div class="mega-title" onclick="handleMegaMenuClick(event,'${firstChild ? firstChild.id : ''}','${firstChildTab}')" style="cursor:pointer">${parent.label}</div>
            ${parent.children.map(child => {
              const activeCls = child.id === currentActiveMenuId ? 'active' : '';
              const firstTab = (tabData[child.id] || ['기본 화면'])[0];
              return `<button type="button" class="mega-item ${activeCls}" data-id="${child.id}"
                onclick="handleMegaMenuClick(event,'${child.id}','${firstTab}')">${child.label}</button>`;
            }).join('')}
          </section>`;
      }).join('');
    }

    function handleMegaMenuClick(event, childId, tabName) {
      event.stopPropagation();
      currentActiveMenuId = childId;
      currentActiveTab = tabName;
      selectMenu(childId, tabName);
    }

    /* ── 왼쪽 LNB (2Depth + 3Depth) 렌더링 ── */
    function renderLeftLNB(parentId) {
      const headerEl      = document.getElementById('left-lnb-header');
      const headerTitleEl = document.getElementById('left-lnb-header-title');
      const headerIconEl  = document.getElementById('left-lnb-header-icon');
      const navEl         = document.getElementById('left-lnb-nav');
      if (!headerEl || !navEl) return;

      const parent = menuData.find(p => p.id === parentId);
      if (!parent) return;

      if (headerTitleEl) headerTitleEl.textContent = parent.label;
      if (headerIconEl)  headerIconEl.innerHTML = uiIcon(parent.icon || 'folder');

      navEl.innerHTML = parent.children.map(child => {
        const isOpen    = (child.id === currentActiveMenuId);
        const tabs      = tabData[child.id] || ['기본 화면'];
        const has3Depth = tabs.length > 1;

        if (has3Depth) {
          /* 3Depth 있음 → 아코디언 */
          const items3 = tabs.map(tabName => {
            const isActive = isOpen && (currentActiveTab === tabName);
            return `<div class="left-menu-3depth-item${isActive ? ' active' : ''}"
              onclick="handleLeft3DepthClick('${child.id}','${tabName.replace(/'/g, '\\\'')}')">${tabName}</div>`;
          }).join('');

          return `<div class="left-menu-2depth">
            <div class="left-menu-2depth-header${isOpen ? ' open' : ''}"
              onclick="handleLeft2DepthClick('${child.id}','${parentId}')">
              <span class="left-menu-2depth-label">${child.label}</span>
              <span class="left-menu-2depth-toggle">▼</span>
            </div>
            <div class="left-menu-3depth-list${isOpen ? ' open' : ''}">
              ${items3}
            </div>
          </div>`;
        } else {
          /* 3Depth 없음 → 직접 링크 (아코디언·토글 없음) */
          const firstTab = tabs[0];
          return `<div class="left-menu-2depth">
            <div class="left-menu-2depth-header left-menu-2depth-leaf${isOpen ? ' open' : ''}"
              onclick="handleLeft3DepthClick('${child.id}','${firstTab.replace(/'/g, '\\\'')}')" >
              <span class="left-menu-2depth-label">${child.label}</span>
            </div>
          </div>`;
        }
      }).join('');
    }

    function handleLeft2DepthClick(childId, parentId) {
      const firstTab = (tabData[childId] || ['기본 화면'])[0];
      selectMenu(childId, firstTab);
    }

    function handleLeft3DepthClick(childId, tabName) {
      selectMenu(childId, tabName);
    }

    /* 상단 업무 메뉴 토글 */
    function toggleSidebar() {
      const lnb = document.querySelector('.lnb');
      lnb.classList.toggle('collapsed');
    }

    /* 왼쪽 LNB 열기/닫기 */
    function toggleLeftLNB() {
      const lnb = document.getElementById('left-lnb');
      const btn = document.getElementById('lnb-toggle-btn');
      if (!lnb) return;
      const isNowCollapsed = lnb.classList.toggle('collapsed');
      if (btn) {
        btn.title = isNowCollapsed ? '왼쪽 메뉴 열기' : '왼쪽 메뉴 접기';
        btn.querySelector('svg').innerHTML = isNowCollapsed
          ? '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>'
          : '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>';
      }
    }

    /* 아코디언 토글 */
    function toggleAccordion(parentId) {
      menuData.forEach(parent => {
        const listEl   = document.getElementById(`list-${parent.id}`);
        const headerEl = document.getElementById(`header-${parent.id}`);
        const iconEl   = document.getElementById(`icon-${parent.id}`);
        if (parent.id === parentId) {
          const isOpen = listEl.classList.contains('open');
          listEl.classList.toggle('open', !isOpen);
          headerEl.classList.toggle('active', !isOpen);
          iconEl.textContent = isOpen ? '▸' : '▾';
        } else {
          listEl.classList.remove('open');
          headerEl.classList.remove('active');
          iconEl.textContent = '▸';
        }
      });
    }

    /* 서브메뉴 클릭 */
    function handleSubMenuClick(event, parentLabel, childLabel, childId) {
      event.stopPropagation();
      document.querySelectorAll('.menu-2depth-item').forEach(item => item.classList.remove('active'));
      event.currentTarget.classList.add('active');
      currentActiveMenuId = childId;
      currentActiveTab    = (tabData[childId] || ['기본 화면'])[0];
      selectMenu(childId, currentActiveTab);
    }

    /* 메뉴+탭 통합 선택 */
    function selectMenu(childId, activeTabName) {
      currentActiveMenuId = childId;
      currentActiveTab    = activeTabName;
      
      // Update top menu active highlights
      document.querySelectorAll('.menu-1depth-header').forEach(header => header.classList.remove('active'));
      document.querySelectorAll('.menu-2depth-list').forEach(list => list.classList.remove('open'));
      document.querySelectorAll('.toggle-icon').forEach(icon => { icon.textContent = '▸'; });
      document.querySelectorAll('.mega-item').forEach(item => {
        item.classList.toggle('active', item.dataset.id === childId);
      });
      document.querySelectorAll('.menu-1depth').forEach(li => li.classList.remove('open'));
      document.querySelectorAll('.mega-column').forEach(col => col.classList.remove('active-col'));

      document.querySelectorAll('.menu-2depth-item').forEach(item => {
        const onclickAttr = item.getAttribute('onclick') || '';
        if (onclickAttr.includes(`'${childId}'`)) {
          item.classList.add('active');
          const parentLi = item.closest('.menu-1depth');
          if (parentLi) {
            parentLi.classList.add('open');
            // GNB 부모 헤더 활성화
            const parentHeader = parentLi.querySelector('.menu-1depth-header');
            if (parentHeader) parentHeader.classList.add('active');
            const sub = parentLi.querySelector('.menu-2depth-list');
            const toggle = parentLi.querySelector('.toggle-icon');
            if (sub) sub.classList.remove('open');
            if (toggle) toggle.textContent = '▸';
          }
        } else {
          item.classList.remove('active');
        }
      });
      // 메가메뉴 활성 컬럼 + 왼쪽 LNB 업데이트
      for (const parent of menuData) {
        if (parent.children.some(c => c.id === childId)) {
          const megaCols = document.querySelectorAll(`.mega-column[data-parent-id="${parent.id}"]`);
          megaCols.forEach(col => col.classList.add('active-col'));
          renderLeftLNB(parent.id);
          break;
        }
      }

      updateBreadcrumb(childId);

      // Add/Update in openTabs grouped by childId (LNB Menu)
      const existingIdx = openTabs.findIndex(t => t.childId === childId);
      if (existingIdx !== -1) {
        // Tab exists, update the active sub-page state
        openTabs[existingIdx].tabName = activeTabName;
      } else {
        if (openTabs.length >= 10) {
          openTabs.shift();
        }
        // Resolve menu label from menuData
        let label = activeTabName;
        for (const parent of menuData) {
          const fc = parent.children.find(c => c.id === childId);
          if (fc) { label = fc.label; break; }
        }
        openTabs.push({
          id: childId,
          childId: childId,
          tabName: activeTabName,
          label: label
        });
      }

      renderTabs();
      renderContents(childId, activeTabName);
      updateGuideContent(childId, activeTabName);
    }

    /* 브레드크럼 */
    function updateBreadcrumb(childId) {
      let fp = null, fc = null;
      for (const parent of menuData) {
        fc = parent.children.find(c => c.id === childId);
        if (fc) { fp = parent; break; }
      }
      if (fp && fc) {
        breadcrumbCurrentTitle.textContent = fc.label;
        breadcrumbPathContent.innerHTML = `<span class="breadcrumb-home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span><span class="bc-sep">›</span>${fp.label}<span class="bc-sep">›</span>${fc.label}`;
      }
    }

    /* 최근 화면 탭 렌더링 */
    function renderTabs() {
      tabsContainer.innerHTML = '';
      openTabs.forEach(tab => {
        const isActive = (tab.childId === currentActiveMenuId && tab.tabName === currentActiveTab);
        
        const el = document.createElement('div');
        el.className = `tab-item${isActive ? ' active' : ''}`;
        
        // Tab Text
        const labelSpan = document.createElement('span');
        labelSpan.textContent = tab.label;
        labelSpan.style.cursor = 'pointer';
        labelSpan.onclick = (e) => {
          e.stopPropagation();
          selectMenu(tab.childId, tab.tabName);
        };
        el.appendChild(labelSpan);
        
        // Tab Close Button
        const closeBtn = document.createElement('span');
        closeBtn.className = 'tab-close-btn';
        closeBtn.innerHTML = ' &times;';
        closeBtn.style.marginLeft = '8px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '14px';
        closeBtn.style.color = 'var(--text-muted)';
        closeBtn.style.transition = 'color 0.15s';
        closeBtn.onmouseover = () => closeBtn.style.color = 'var(--red)';
        closeBtn.onmouseout = () => closeBtn.style.color = 'var(--text-muted)';
        
        closeBtn.onclick = (e) => {
          e.stopPropagation();
          closeTab(tab.childId, tab.tabName);
        };
        el.appendChild(closeBtn);
        
        tabsContainer.appendChild(el);
      });
    }

    /* 탭 닫기 */
    function closeTab(childId, tabName) {
      const idx = openTabs.findIndex(t => t.childId === childId && t.tabName === tabName);
      if (idx === -1) return;
      
      const wasActive = (childId === currentActiveMenuId && tabName === currentActiveTab);
      openTabs.splice(idx, 1);
      
      if (openTabs.length === 0) {
        selectMenu('common-1', '관리자 목록');
      } else {
        if (wasActive) {
          const nextActiveIdx = Math.min(idx, openTabs.length - 1);
          const nextTab = openTabs[nextActiveIdx];
          selectMenu(nextTab.childId, nextTab.tabName);
        } else {
          renderTabs();
        }
      }
    }

    function scrollTabs(offset) { tabsContainer.scrollBy({ left: offset, behavior: 'smooth' }); }

    function getLoginTemplate() {
      const wrapper = document.createElement('div');
      wrapper.className = 'login-screen';
      wrapper.innerHTML = `
        <section class="login-copy" aria-label="사업관리시스템 소개">
          <h1 class="login-main-copy">켑코이에스는 한국전력공사와 6개 발전사가 자본금 3천억원으로 설립한 <span class="highlight">에너지 효율 향상 전문기업</span>입니다.</h1>
          <p class="login-sub-copy">사업의 시작부터 성과관리까지, <span class="highlight">모든 업무를 하나로 연결</span>하는 통합 사업관리 플랫폼</p>
          <p class="login-detail-copy"><strong>사업 접수, 계약, 발주, 공사, 상환, 정산</strong>에 이르는 전 과정을 통합 관리하여 신속한 의사결정과 경영 투명성을 지원합니다.</p>
        </section>
        <section class="login-card" aria-label="로그인">
          <div class="login-card-title">사업관리시스템(PMS)</div>
          <div class="login-card-sub">사용자 계정으로 로그인해 업무를 시작하세요.</div>
          <form class="login-form" onsubmit="event.preventDefault(); alert('로그인 기능은 프로토타입 화면입니다.');">
            <div class="login-field">
              <label for="login-user-id">아이디</label>
              <input type="text" id="login-user-id" autocomplete="username" placeholder="아이디를 입력하세요">
            </div>
            <div class="login-field">
              <label for="login-user-password">비밀번호</label>
              <input type="password" id="login-user-password" autocomplete="current-password" placeholder="비밀번호를 입력하세요">
            </div>
            <div class="login-options">
              <label class="login-save"><input type="checkbox" id="login-save-id"> 아이디 저장</label>
            </div>
            <button type="submit" class="login-submit">로그인</button>
          </form>
          <div class="login-contact">
            <strong>로그인 문의</strong><br>
            운영담당 : 이희성 부장 010-6844-2810
          </div>
        </section>`;
      return wrapper;
    }

    /* 권한그룹 버튼 */
    function setupAuthButtons() {
      const buttons = authGroupButtons.querySelectorAll('.auth-btn');
      buttons.forEach(btn => {
        btn.onclick = function() {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedAuthGroup = btn.getAttribute('data-auth');
          const roleMap = { '1': '시스템관리자(그룹#1)', '3': '사업담당자(그룹#3)', '4': '일반사용자(그룹#4)' };
          userGreeting.innerHTML = `이희성 부장 <span class="user-role-badge">[${roleMap[selectedAuthGroup]}]</span>`;
        };
      });
      userGreeting.innerHTML = `이희성 부장 <span class="user-role-badge">[시스템관리자(그룹#1)]</span>`;
    }

