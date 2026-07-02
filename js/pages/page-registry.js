    const pageComponents = {
      auth: {
        'login-1::로그인': getLoginTemplate
      },
      receipt: {
        'rec-create::신규 프로젝트 생성': getProjectReceiptCreateTemplate,
        'rec-status::사업접수현황 조회': getProjectReceiptStatusTemplate
      },
      project: {
        'proj-1::프로젝트 목록': getProjectListTemplate,
        'proj-1::프로젝트 상세': getProjectDetailTemplate
      },
      common: {
        'common-1::관리자 목록': getAdminListTemplate,
        'common-2::권한그룹 및 권한 관리': getAuthGroupManageTemplate,
        'common-3::IP 목록': getAccessIpListTemplate,
        'common-4::코드 목록': getCodeListTemplate,
        'common-5::로그인 현황': getLoginStatusTemplate,
        'common-6::메뉴별 접속현황': getMenuAccessStatusTemplate,
        'common-7::협력업체 관리': getPartnerManageTemplate,
        'common-8::공지사항 관리': getNoticeManageTemplate,
        'common-9::자료실 관리': getResourceManageTemplate
      }
    };

    function pageKey(childId, tabName) {
      return `${childId}::${tabName}`;
    }

    function findPageComponent(childId, tabName) {
      const key = pageKey(childId, tabName);
      for (const group of Object.values(pageComponents)) {
        if (group[key]) return group[key];
      }
      if (childId.startsWith('stat-analysis-')) return () => getStatAnalysisTemplate(childId);
      return null;
    }

    function getMenuPath(childId, tabName) {
      for (const parent of menuData) {
        const child = parent.children.find(item => item.id === childId);
        if (child) return `${parent.label} > ${child.label} > ${tabName}`;
      }
      return '';
    }

    /* 콘텐츠 분기 */
    function renderContents(childId, tabName) {
      contentsContainer.innerHTML = '';
      const contentsArea = document.querySelector('.contents-area');
      if (contentsArea) contentsArea.classList.toggle('login-content', childId === 'login-1');

      const component = findPageComponent(childId, tabName);
      contentsContainer.appendChild(component ? component() : getReadyTemplate(getMenuPath(childId, tabName)));
    }
    /* 프로젝트 관리 - 목록 */
    function getProjectListTemplate() {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="card search-card" style="margin-bottom:16px;">
          <div class="card-title">검색 조건</div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">프로젝트 기간</label>
              <div style="display:flex; align-items:center; gap:8px;"><input id="project-from" class="form-control" type="date"><span style="">~</span><input id="project-to" class="form-control" type="date"></div>
            </div>
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">진행상태</label>
              <select id="project-status" class="form-control" style="width:220px;"><option value="전체">전체</option><option>준비중</option><option>진행중</option><option>완료예정</option><option>완료</option></select>
            </div>
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">사업구분</label>
              <select id="project-type" class="form-control" style="width:220px;"><option value="전체">전체</option><option>ESCO</option><option>시설개선</option><option>신재생</option></select>
            </div>
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">검색어</label>
              <div style="display:flex; gap:8px; width:500px; max-width:100%;"><select id="project-key" class="form-control" style="width:130px; flex:0 0 auto;"><option value="all">전체</option><option value="name">프로젝트명</option><option value="customer">고객사명</option><option value="manager">담당자</option></select><input id="project-word" class="form-control" style="flex:1;" placeholder="검색어를 입력하세요."></div>
            </div>
          </div>
          <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px; border-top:1px solid var(--border); padding-top:16px;"><button class="btn btn-primary" id="project-search">${uiIcon('search')} 검색</button><button class="btn btn-outline" id="project-reset">초기화</button></div>
        </div>
        <div class="card">
          <div class="card-title">프로젝트 목록</div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;"><div style="font-size:13px; color:var(--text-muted);">전체 <strong id="project-total" style="color:var(--blue);">0</strong>건 &nbsp;|&nbsp; 현재 <strong id="project-current-page" style="color:var(--text);">1/1</strong> 페이지</div><button class="btn btn-outline" id="project-excel" style="height:32px; padding:0 12px; font-size:13px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> 엑셀 다운로드</button></div>
          <div class="table-container"><table class="data-table" style="min-width:2800px;"><thead><tr><th>순번</th><th>프로젝트 계약번호</th><th>등록일</th><th>계약체결일</th><th>사업명</th><th>계약형태</th><th>에너지사용자</th><th>소재지</th><th>진행상태</th><th>총사업금액</th><th>투자금액</th><th>투자적격지</th><th>투자적격률</th><th>공사단계</th><th>준공예정일</th><th>상환완료일</th><th>계약변경 건수</th><th>발주계약 건수</th><th>담당자</th><th>담당부서</th><th>대상설비</th><th>사업구분</th><th>상세</th></tr></thead><tbody id="project-table"></tbody></table></div>
          <div class="table-footer" style="margin-top:20px; border-top:1px solid var(--border); padding-top:14px;"><div></div><div class="pagination" id="project-pagination"></div><div></div></div>
        </div>`;
      setTimeout(() => {
        let projCurrentPage = 1;
        const projPageSize = 10;
        const statusClass = status => ({ '준비중':'badge-status-secondary', '진행중':'badge-status-success', '완료예정':'badge-status-warning', '완료':'badge-status-secondary' }[status] || 'badge-status-secondary');
        const render = () => {
          const from=wrapper.querySelector('#project-from').value, to=wrapper.querySelector('#project-to').value, status=wrapper.querySelector('#project-status').value, type=wrapper.querySelector('#project-type').value, key=wrapper.querySelector('#project-key').value, word=wrapper.querySelector('#project-word').value.trim().toLowerCase();
          const rows=projectList.filter(row => (!from || row.start >= from) && (!to || row.end <= to) && (status === '전체' || row.status === status) && (type === '전체' || row.type === type) && (!word || (key === 'all' ? [row.name,row.customer,row.manager,row.no].join(' ') : row[key]).toLowerCase().includes(word)));
          const projTotalPages=Math.max(1,Math.ceil(rows.length/projPageSize)); if(projCurrentPage>projTotalPages) projCurrentPage=projTotalPages;
          const projStart=(projCurrentPage-1)*projPageSize; const visible=rows.slice(projStart,projStart+projPageSize);
          wrapper.querySelector('#project-total').textContent=rows.length;
          wrapper.querySelector('#project-current-page').textContent=`${projCurrentPage}/${projTotalPages}`;
          wrapper.querySelector('#project-table').innerHTML=visible.length ? visible.map((row,index) => { const stage=row.progress >= 70 ? '준공' : row.progress >= 30 ? '공사중' : '계약품의중'; const eligibility=row.progress >= 30 ? '적격' : '검토중'; return `<tr><td style="text-align:center;">${projStart+index+1}</td><td>${row.no}</td><td>${row.start}</td><td>${row.start}</td><td style="white-space:nowrap;">${row.name}</td><td>${row.type}</td><td>${row.customer}</td><td>경기도 안산시</td><td style="text-align:center;"><span class="badge ${statusClass(row.status)}">${row.status}</span></td><td style="text-align:right;">${row.amount}원</td><td style="text-align:right;">${row.amount}원</td><td style="text-align:center;">${eligibility}</td><td style="text-align:center;">100%</td><td style="text-align:center;">${stage}</td><td>${row.end}</td><td>${row.end}</td><td style="text-align:center;">0건</td><td style="text-align:center;">1건</td><td>${row.manager}</td><td>에너지사업부</td><td>고효율 설비</td><td>${row.type}</td><td style="text-align:center;"><button type="button" class="btn btn-outline project-detail" data-id="${row.id}" style="height:28px; padding:0 8px; font-size:13px;">상세보기</button></td></tr>`; }).join('') : '<tr><td colspan="23" style="padding:36px; text-align:center;">조회된 프로젝트가 없습니다.</td></tr>';
          wrapper.querySelector('#project-pagination').innerHTML=Array.from({length:projTotalPages},(_, i)=>`<button class="page-btn ${i+1===projCurrentPage?'active':''}" data-page="${i+1}">${i+1}</button>`).join('');
          wrapper.querySelectorAll('#project-pagination .page-btn').forEach(b=>b.onclick=()=>{projCurrentPage=Number(b.dataset.page);render();});
          wrapper.querySelectorAll('.project-detail').forEach(button => button.onclick=()=>{ selectedProjectId=Number(button.dataset.id); selectMenu('proj-1','프로젝트 상세'); });
        };
        wrapper.querySelector('#project-search').onclick=()=>{projCurrentPage=1;render();};
        wrapper.querySelector('#project-reset').onclick=()=>{ wrapper.querySelectorAll('input').forEach(input=>input.value=''); wrapper.querySelectorAll('select').forEach(select=>select.selectedIndex=0); projCurrentPage=1; render(); };
        wrapper.querySelector('#project-excel').onclick=()=>alert('전체 조회 결과 목록이 엑셀(.xlsx) 파일로 다운로드되었습니다.');
        render();
      },0);
      return wrapper;
    }

    /* 프로젝트 관리 - 상세 */
    function getProjectDetailTemplate() {
      const wrapper=document.createElement('div');
      wrapper.innerHTML=`
        <div class="card">
          <div class="card-title">프로젝트 상세</div>
          <p style="margin-top:-6px; margin-bottom:18px; font-size:13px; color:var(--text-muted);">계약 기본정보와 투자·공사 진행 현황을 확인하고 변경할 수 있습니다.</p>
          <div style="border-top:1px solid var(--border); padding-top:4px;"><div class="card-title" style="font-size:15px; margin:18px 0 14px;">프로젝트 기본정보</div>
            <div class="form-group"><label>프로젝트명 <span class="required">*</span></label><input id="new-project-name" class="form-control" placeholder="프로젝트명을 입력하세요."></div>
            <div class="form-group"><label>사업구분 <span class="required">*</span></label><select id="new-project-type" class="form-control"><option value="">선택하세요</option><option>ESCO</option><option>시설개선</option><option>신재생</option></select></div>
            <div class="form-group"><label>고객사명 <span class="required">*</span></label><input id="new-project-customer" class="form-control" placeholder="고객사명 또는 기관명을 입력하세요."></div>
            <div class="form-group"><label>프로젝트 담당자 <span class="required">*</span></label><select id="new-project-manager" class="form-control"><option value="">선택하세요</option><option>이희성</option><option>김철수</option><option>박영희</option></select></div>
            <div class="form-group"><label>프로젝트 기간 <span class="required">*</span></label><div style="display:flex; align-items:center; gap:8px;"><input id="new-project-start" class="form-control" type="date"><span style="">~</span><input id="new-project-end" class="form-control" type="date"></div></div>
            <div class="form-group"><label>계약금액</label><div style="display:flex; align-items:center; gap:8px;"><input id="new-project-amount" class="form-control" inputmode="numeric" placeholder="숫자만 입력하세요."><span style="">원</span></div></div>
          </div>
          <div style="border-top:1px solid var(--border); margin-top:8px; padding-top:4px;"><div class="card-title" style="font-size:15px; margin:18px 0 14px;">추진 계획</div><div class="form-group"><label>프로젝트 추진 내용</label><textarea id="new-project-note" class="form-control" rows="5" style="resize:vertical;" placeholder="주요 추진 일정, 관리 사항 등을 입력하세요."></textarea></div></div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:24px; padding-top:16px; border-top:1px solid var(--border);"><button type="button" class="btn btn-outline" id="new-project-cancel">목록</button><button type="button" class="btn btn-primary" id="new-project-save">${uiIcon('check')} 저장</button></div>
        </div>`;
      setTimeout(()=>{
        const project = projectList.find(item => item.id === selectedProjectId) || projectList[0];
        wrapper.querySelector('#new-project-name').value = project.name;
        wrapper.querySelector('#new-project-type').value = project.type;
        wrapper.querySelector('#new-project-customer').value = project.customer;
        wrapper.querySelector('#new-project-manager').value = project.manager;
        wrapper.querySelector('#new-project-start').value = project.start;
        wrapper.querySelector('#new-project-end').value = project.end;
        wrapper.querySelector('#new-project-amount').value = project.amount;
        wrapper.querySelector('#new-project-note').value = `${project.no} 프로젝트의 계약·공사 진행 현황을 관리합니다.`;
        wrapper.querySelector('#new-project-amount').addEventListener('input',event=>event.target.value=event.target.value.replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g,','));
        wrapper.querySelector('#new-project-cancel').onclick=()=>selectMenu('proj-1','프로젝트 목록');
        wrapper.querySelector('#new-project-save').onclick=()=>{
          const name=wrapper.querySelector('#new-project-name').value.trim(), type=wrapper.querySelector('#new-project-type').value, customer=wrapper.querySelector('#new-project-customer').value.trim(), manager=wrapper.querySelector('#new-project-manager').value, start=wrapper.querySelector('#new-project-start').value, end=wrapper.querySelector('#new-project-end').value;
          if(!name||!type||!customer||!manager||!start||!end){alert('필수(*) 항목을 모두 입력해 주세요.');return;}
          Object.assign(project, { name, customer, type, manager, start, end, amount:wrapper.querySelector('#new-project-amount').value||'0' });
          alert('프로젝트 정보가 저장되었습니다.'); selectMenu('proj-1','프로젝트 목록');
        };
      },0);
      return wrapper;
    }

    /* 사업접수 - 신규 프로젝트 생성 */
    function getProjectReceiptCreateTemplate() {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="card" style="margin-bottom:16px;">
          <div class="card-title">신규 프로젝트 생성</div>
          <p style="margin-top:-6px; margin-bottom:18px; font-size:13px; color:var(--text-muted);">사업 기본정보와 담당 정보를 입력하여 신규 프로젝트 접수를 등록합니다. <span class="required">*</span> 표시는 필수 입력 항목입니다.</p>
          <div style="padding-top:4px; border-top:1px solid var(--border);">
            <div class="card-title" style="font-size:15px; margin:18px 0 14px;">기본 정보</div>
            <div class="form-group"><label>프로젝트명 <span class="required">*</span></label><input id="receipt-project-name" class="form-control" type="text" placeholder="프로젝트명을 입력하세요."></div>
            <div class="form-group"><label>사업구분 <span class="required">*</span></label><select id="receipt-type" class="form-control"><option value="">선택하세요</option><option>ESCO</option><option>시설개선</option><option>신재생</option><option>기타</option></select></div>
            <div class="form-group"><label>고객사명 <span class="required">*</span></label><input id="receipt-customer" class="form-control" type="text" placeholder="고객사명 또는 기관명을 입력하세요."></div>
            <div class="form-group"><label>사업 담당자 <span class="required">*</span></label><select id="receipt-manager" class="form-control"><option value="">선택하세요</option><option>이희성</option><option>김철수</option><option>박영희</option></select></div>
            <div class="form-group"><label>예상 사업비</label><div style="display:flex; align-items:center; gap:8px;"><input id="receipt-budget" class="form-control" type="text" inputmode="numeric" placeholder="숫자만 입력하세요."><span style="white-space:nowrap; color:var(--text-muted);">원</span></div></div>
            <div class="form-group"><label>예상 착수일</label><input id="receipt-start-date" class="form-control" type="date"></div>
          </div>
          <div style="padding-top:4px; border-top:1px solid var(--border); margin-top:8px;">
            <div class="card-title" style="font-size:15px; margin:18px 0 14px;">접수 상세</div>
            <div class="form-group"><label>고객 담당자명</label><input id="receipt-contact-name" class="form-control" type="text" placeholder="담당자 성명을 입력하세요."></div>
            <div class="form-group"><label>연락처</label><input id="receipt-contact-tel" class="form-control" type="tel" placeholder="예: 02-0000-0000"></div>
            <div class="form-group"><label>사업 개요 및 요청사항</label><textarea id="receipt-description" class="form-control" rows="5" style="resize:vertical;" placeholder="사업 목적, 주요 설비, 요청사항 등을 입력하세요."></textarea></div>
            <div class="form-group">
              <label>첨부파일</label>
              <div class="nt-dropzone" id="receipt-dropzone">
                <div class="nt-dropzone-icon">
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <div class="nt-dropzone-text">파일을 여기에 끌어다 놓거나 <span>클릭하여 선택</span>하세요.</div>
                <div class="nt-dropzone-hint">사업 관련 제안서·현장자료 등 (PDF, HWP, DOC, DOCX, XLS, XLSX, JPG, PNG) &nbsp;·&nbsp; 파일당 최대 10MB</div>
              </div>
              <input type="file" id="receipt-file-input" multiple hidden accept=".pdf,.hwp,.doc,.docx,.xls,.xlsx,.jpg,.png">
              <div id="receipt-file-list" style="display:flex;flex-direction:column;gap:6px;margin-top:8px;"></div>
            </div>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:24px; padding-top:16px; border-top:1px solid var(--border);">
            <button type="button" class="btn btn-outline" id="receipt-cancel">취소</button>
            <button type="button" class="btn btn-primary" id="receipt-save">${uiIcon('check')} 프로젝트 생성</button>
          </div>
        </div>`;

      setTimeout(() => {
        wrapper.querySelector('#receipt-budget').addEventListener('input', event => {
          event.target.value = event.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        });

        // ── 드래그앤드롭 파일 업로드 ──
        const dropzone = wrapper.querySelector('#receipt-dropzone');
        const fileInput = wrapper.querySelector('#receipt-file-input');
        let receiptFiles = [];

        const fmtSize = bytes => bytes == null ? '' : bytes < 1024*1024 ? `${(bytes/1024).toFixed(0)}KB` : `${(bytes/1024/1024).toFixed(1)}MB`;

        const renderFileList = () => {
          wrapper.querySelector('#receipt-file-list').innerHTML = receiptFiles.map((f, i) => `
            <div class="nt-file-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span class="nt-file-item-name">${f.name}</span>
              ${f.size!=null?`<span class="nt-file-item-size">${fmtSize(f.size)}</span>`:''}
              <button class="btn btn-outline" style="height:28px;padding:0 8px;font-size:13px;flex-shrink:0;" onclick="receiptRemoveFile(${i})">삭제</button>
            </div>`).join('');
        };

        dropzone.onclick = () => fileInput.click();
        dropzone.ondragover = (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); };
        dropzone.ondragleave = (e) => { if (!dropzone.contains(e.relatedTarget)) dropzone.classList.remove('drag-over'); };
        dropzone.ondrop = (e) => {
          e.preventDefault();
          dropzone.classList.remove('drag-over');
          [...e.dataTransfer.files].forEach(f => { if (!receiptFiles.find(x => x.name===f.name)) receiptFiles.push({ name: f.name, size: f.size }); });
          renderFileList();
        };
        fileInput.onchange = () => {
          [...fileInput.files].forEach(f => { if (!receiptFiles.find(x => x.name===f.name)) receiptFiles.push({ name: f.name, size: f.size }); });
          fileInput.value = '';
          renderFileList();
        };
        window.receiptRemoveFile = (i) => { receiptFiles.splice(i, 1); renderFileList(); };
        renderFileList();

        wrapper.querySelector('#receipt-cancel').onclick = () => selectMenu('rec-status', '사업접수현황 조회');
        wrapper.querySelector('#receipt-save').onclick = () => {
          const projectName = wrapper.querySelector('#receipt-project-name').value.trim();
          const type = wrapper.querySelector('#receipt-type').value;
          const customer = wrapper.querySelector('#receipt-customer').value.trim();
          const manager = wrapper.querySelector('#receipt-manager').value;
          if (!projectName || !type || !customer || !manager) {
            alert('필수(*) 항목을 모두 입력해 주세요.');
            return;
          }
          const today = new Date().toISOString().slice(0, 10);
          projectReceiptList.unshift({
            id: Date.now(), receiptNo: `PRJ-${today.slice(0, 4)}-${String(projectReceiptList.length + 1).padStart(4, '0')}`,
            projectName, customer, type, manager, receiptDate: today, status: '접수완료',
            budget: wrapper.querySelector('#receipt-budget').value || '0',
            files: receiptFiles.map(f => f.name)
          });
          alert('신규 프로젝트가 접수되었습니다.');
          selectMenu('rec-status', '사업접수현황 조회');
        };
      }, 0);
      return wrapper;
    }

    /* 사업접수 - 접수현황 조회 */
    function getProjectReceiptStatusTemplate() {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="card search-card" style="margin-bottom:16px;">
          <div class="card-title">검색 조건</div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">접수기간</label>
              <div style="display:flex; align-items:center; gap:8px;"><input id="receipt-search-from" class="form-control" type="date"><span style="">~</span><input id="receipt-search-to" class="form-control" type="date"></div>
            </div>
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">진행상태</label>
              <select id="receipt-search-status" class="form-control" style="width:220px;"><option value="전체">전체</option><option>접수완료</option><option>검토중</option><option>보완요청</option><option>승인완료</option></select>
            </div>
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">사업구분</label>
              <select id="receipt-search-type" class="form-control" style="width:220px;"><option value="전체">전체</option><option>ESCO</option><option>시설개선</option><option>신재생</option><option>기타</option></select>
            </div>
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">검색어</label>
              <div style="display:flex; gap:8px; width:500px; max-width:100%;"><select id="receipt-search-key" class="form-control" style="width:130px; flex:0 0 auto;"><option value="전체">전체</option><option value="projectName">프로젝트명</option><option value="customer">고객사명</option><option value="manager">담당자</option></select><input id="receipt-search-word" class="form-control" type="text" style="flex:1;" placeholder="검색어를 입력하세요."></div>
            </div>
          </div>
          <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px; border-top:1px solid var(--border); padding-top:16px;"><button class="btn btn-primary" id="receipt-search">${uiIcon('search')} 검색</button><button class="btn btn-outline" id="receipt-reset">초기화</button></div>
        </div>
        <div class="card">
          <div class="card-title">사업접수현황</div>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; flex-wrap:wrap; gap:10px;"><div style="font-size:13px; color:var(--text-muted);">전체 <strong id="receipt-total" style="color:var(--blue);">0</strong>건 &nbsp;|&nbsp; 현재 <strong id="receipt-current-page" style="color:var(--text);">1/1</strong> 페이지</div><div style="display:flex; gap:8px;"><button class="btn btn-outline" id="receipt-excel" style="height:32px; padding:0 12px; font-size:13px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> 엑셀 다운로드</button><button class="btn btn-primary" id="receipt-new" style="height:32px; padding:0 12px; font-size:13px;">${uiIcon('plus')} 신규 프로젝트 생성</button></div></div>
          <div class="table-container"><table class="data-table"><thead><tr><th style="width:64px;">No.</th><th>접수번호</th><th>프로젝트명</th><th>고객사</th><th>사업구분</th><th>담당자</th><th>접수일</th><th>진행상태</th><th style="width:88px;">상세</th></tr></thead><tbody id="receipt-table-body"></tbody></table></div>
          <div class="table-footer" style="margin-top:20px; border-top:1px solid var(--border); padding-top:14px;"><div></div><div class="pagination" id="receipt-pagination"></div><div></div></div>
        </div>`;
      setTimeout(() => {
        let currentPage = 1;
        const pageSize = 10;
        const statusClass = status => ({ '접수완료':'badge-status-success', '검토중':'badge-status-warning', '보완요청':'badge-status-danger', '승인완료':'badge-status-secondary' }[status] || 'badge-status-secondary');
        const filteredRows = () => {
          const from = wrapper.querySelector('#receipt-search-from').value;
          const to = wrapper.querySelector('#receipt-search-to').value;
          const status = wrapper.querySelector('#receipt-search-status').value;
          const type = wrapper.querySelector('#receipt-search-type').value;
          const key = wrapper.querySelector('#receipt-search-key').value;
          const word = wrapper.querySelector('#receipt-search-word').value.trim().toLowerCase();
          return projectReceiptList.filter(row => (!from || row.receiptDate >= from) && (!to || row.receiptDate <= to) && (status === '전체' || row.status === status) && (type === '전체' || row.type === type) && (!word || (key === '전체' ? [row.projectName,row.customer,row.manager,row.receiptNo].join(' ') : row[key]).toLowerCase().includes(word)));
        };
        const render = () => {
          const rows = filteredRows(); const totalPages = Math.max(1, Math.ceil(rows.length / pageSize)); currentPage = Math.min(currentPage, totalPages);
          const start = (currentPage - 1) * pageSize; const visible = rows.slice(start, start + pageSize);
          wrapper.querySelector('#receipt-total').textContent = rows.length;
          wrapper.querySelector('#receipt-current-page').textContent = `${currentPage}/${totalPages}`;
          wrapper.querySelector('#receipt-table-body').innerHTML = visible.length ? visible.map((row, index) => `<tr><td style="text-align:center;">${start + index + 1}</td><td>${row.receiptNo}</td><td>${row.projectName}</td><td>${row.customer}</td><td>${row.type}</td><td>${row.manager}</td><td>${row.receiptDate}</td><td style="text-align:center;"><span class="badge ${statusClass(row.status)}">${row.status}</span></td><td style="text-align:center;"><button type="button" class="btn btn-outline receipt-detail" data-id="${row.id}" style="height:28px; padding:0 8px; font-size:13px;">상세보기</button></td></tr>`).join('') : '<tr><td colspan="9" style="padding:36px; text-align:center;">조회된 사업접수 내역이 없습니다.</td></tr>';
          wrapper.querySelector('#receipt-pagination').innerHTML = Array.from({length: totalPages}, (_, i) => `<button class="page-btn ${i + 1 === currentPage ? 'active' : ''}" data-page="${i + 1}">${i + 1}</button>`).join('');
          wrapper.querySelectorAll('.page-btn').forEach(button => button.onclick = () => { currentPage = Number(button.dataset.page); render(); });
          wrapper.querySelectorAll('.receipt-detail').forEach(button => button.onclick = () => { const row = projectReceiptList.find(item => item.id === Number(button.dataset.id)); alert(`${row.projectName}\n접수번호: ${row.receiptNo}\n고객사: ${row.customer}\n진행상태: ${row.status}`); });
        };
        wrapper.querySelector('#receipt-search').onclick = () => { currentPage = 1; render(); };
        wrapper.querySelector('#receipt-reset').onclick = () => { wrapper.querySelectorAll('input').forEach(input => input.value = ''); wrapper.querySelectorAll('select').forEach(select => select.selectedIndex = 0); currentPage = 1; render(); };
        wrapper.querySelector('#receipt-new').onclick = () => selectMenu('rec-create', '신규 프로젝트 생성');
        wrapper.querySelector('#receipt-excel').onclick = () => alert('전체 조회 결과 목록이 엑셀(.xlsx) 파일로 다운로드되었습니다.');
        render();
      }, 0);
      return wrapper;
    }

    /* 관리자 목록 템플릿 */
    function getAdminListTemplate() {
      const wrapper = document.createElement('div');

      /* 검색 카드 */
      const searchCard = document.createElement('div');
      searchCard.className = 'card search-card';
      searchCard.innerHTML = `
        <div class="card-title">검색 조건</div>
        <div class="search-flex" style="display:flex; flex-direction:column; gap:12px;">
          <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
            <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">조회기간 (등록일)</label>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <div class="date-presets" style="display:flex; gap:4px; margin-right:4px;">
                <button type="button" class="date-preset-btn" data-preset="1d">하루 전</button>
                <button type="button" class="date-preset-btn" data-preset="1w">1주일</button>
                <button type="button" class="date-preset-btn" data-preset="1m">1개월</button>
                <button type="button" class="date-preset-btn" data-preset="3m">3개월</button>
                <button type="button" class="date-preset-btn" data-preset="6m">6개월</button>
                <button type="button" class="date-preset-btn" data-preset="1y">1년</button>
              </div>
              <input type="date" id="search-start-date" class="form-control" style="width:150px;">
              <span style="">~</span>
              <input type="date" id="search-end-date" class="form-control" style="width:150px;">
            </div>
          </div>
          <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
            <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">사용여부</label>
            <div class="radio-group" style="display:flex; gap:16px; height:38px; align-items:center;">
              <label class="radio-item"><input type="radio" name="search-status" value="전체" checked> 전체</label>
              <label class="radio-item"><input type="radio" name="search-status" value="사용"> 사용</label>
              <label class="radio-item"><input type="radio" name="search-status" value="중지"> 중지</label>
            </div>
          </div>
          <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
            <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">키워드 검색</label>
            <div style="display:flex; gap:8px; width:500px; max-width:100%;">
              <select id="search-key" class="form-control" style="width:130px; flex-shrink:0;">
                <option value="전체">전체</option>
                <option value="사원번호">사원번호</option>
                <option value="아이디">아이디</option>
                <option value="사원명">사원명</option>
                <option value="부서">부서</option>
                <option value="직급">직급</option>
                <option value="이메일">이메일</option>
              </select>
              <input type="text" id="search-keyword" class="form-control" style="flex:1;" placeholder="검색어를 입력하세요.">
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px; border-top:1px solid var(--border); padding-top:16px;">
          <button class="btn btn-primary" id="btn-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            검색
          </button>
          <button class="btn btn-outline" id="btn-reset">초기화</button>
        </div>`;
      wrapper.appendChild(searchCard);

      /* 리스트 카드 */
      const listCard = document.createElement('div');
      listCard.className = 'card';

      listCard.innerHTML = `
        <div class="card-title">관리자 목록</div>
        
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
          <div style="font-size:13px; color:var(--text-muted);">
            전체 <strong id="admin-total-cnt" style="color:var(--blue);">0</strong>건 &nbsp;|&nbsp; 
            현재 <strong id="admin-current-page" style="color:var(--text);">1/1</strong> 페이지
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <select id="select-page-size" class="form-control" style="width:110px; height:32px; font-size:13px; padding:0 8px; margin:0;">
              <option value="10">10개씩</option>
              <option value="20">20개씩</option>
              <option value="30">30개씩</option>
              <option value="50">50개씩</option>
              <option value="100">100개씩</option>
            </select>
            <button class="btn btn-outline" style="height:32px; padding:0 12px; font-size:13px;" onclick="alert('전체 조회 결과 목록이 엑셀(.xlsx) 파일로 다운로드되었습니다.')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              엑셀 다운로드
            </button>
          </div>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:50px; text-align:center;">No</th>
                <th>사원번호</th>
                <th>아이디</th>
                <th>사원명</th>
                <th>부서</th>
                <th>직급</th>
                <th>이메일</th>
                <th style="width:90px; text-align:center;">사용여부</th>
                <th>등록일</th>
                <th>등록자</th>
                <th style="width:90px; text-align:center;">상세정보</th>
                <th>최종수정</th>
              </tr>
            </thead>
            <tbody id="admin-table-body"></tbody>
          </table>
        </div>
        <div class="table-footer" style="margin-top:20px; border-top:1px solid var(--border); padding-top:14px;">
          <div></div>
          <div class="pagination"></div>
          <div></div>
        </div>`;
      wrapper.appendChild(listCard);

      setTimeout(() => {
        let pageSize = 10;
        let currentPage = 1;

        const updateTable = () => {
          const startDate = wrapper.querySelector('#search-start-date').value;
          const endDate = wrapper.querySelector('#search-end-date').value;
          const status = wrapper.querySelector('input[name="search-status"]:checked').value;
          const key = wrapper.querySelector('#search-key').value;
          const keyword = wrapper.querySelector('#search-keyword').value.toLowerCase().trim();

          const filtered = adminList.filter(a => {
            if (startDate && a.regDate < startDate) return false;
            if (endDate && a.regDate > endDate) return false;
            if (status !== '전체' && a.status !== status) return false;
            
            if (keyword) {
              if (key === '전체') {
                return (a.empNo.toLowerCase().includes(keyword) ||
                        a.username.toLowerCase().includes(keyword) ||
                        a.name.toLowerCase().includes(keyword) ||
                        a.dept.toLowerCase().includes(keyword) ||
                        a.position.toLowerCase().includes(keyword) ||
                        a.email.toLowerCase().includes(keyword));
              } else if (key === '사원번호') {
                return a.empNo.toLowerCase().includes(keyword);
              } else if (key === '아이디') {
                return a.username.toLowerCase().includes(keyword);
              } else if (key === '사원명') {
                return a.name.toLowerCase().includes(keyword);
              } else if (key === '부서') {
                return a.dept.toLowerCase().includes(keyword);
              } else if (key === '직급') {
                return a.position.toLowerCase().includes(keyword);
              } else if (key === '이메일') {
                return a.email.toLowerCase().includes(keyword);
              }
            }
            return true;
          });

          const totalCount = filtered.length;
          const totalPages = Math.ceil(totalCount / pageSize) || 1;
          if (currentPage > totalPages) currentPage = totalPages;

          const startIdx = (currentPage - 1) * pageSize;
          const paginated = filtered.slice(startIdx, startIdx + pageSize);

          const tbody = wrapper.querySelector('#admin-table-body');
          tbody.innerHTML = paginated.map((admin, idx) => {
            const bc = admin.status === '사용' ? 'badge-status-success' : 'badge-status-danger';
            return `<tr>
              <td style="text-align:center;">${startIdx + idx + 1}</td>
              <td>${admin.empNo}</td>
              <td style="">${admin.username}</td>
              <td>${admin.name}</td>
              <td>${admin.dept}</td>
              <td>${admin.position}</td>
              <td>${admin.email}</td>
              <td style="text-align:center;"><span class="badge ${bc}">${admin.status}</span></td>
              <td style="">${dateOnly(admin.regDate)}</td>
              <td>${admin.regUser}</td>
              <td style="text-align:center;">
                <button class="btn btn-outline" style="height:28px; padding:0 8px; font-size:13px;"
                  onclick="openAdminDetail(${admin.id})">상세보기</button>
              </td>
              <td style="">${dateOnly(admin.editDate)}</td>
            </tr>`;
          }).join('');

          wrapper.querySelector('#admin-total-cnt').textContent = totalCount;
          wrapper.querySelector('#admin-current-page').textContent = `${currentPage}/${totalPages}`;

          const paginationContainer = wrapper.querySelector('.pagination');
          let pagHTML = `<button class="page-btn" onclick="goToPage(1)">&laquo;</button>`;
          for (let i = 1; i <= totalPages; i++) {
            pagHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
          }
          pagHTML += `<button class="page-btn" onclick="goToPage(${totalPages})">&raquo;</button>`;
          paginationContainer.innerHTML = pagHTML;
        };

        window.goToPage = (page) => {
          currentPage = page;
          updateTable();
        };

        const presetBtns = wrapper.querySelectorAll('.date-preset-btn');
        const startInput = wrapper.querySelector('#search-start-date');
        const endInput = wrapper.querySelector('#search-end-date');
        
        const clearPresets = () => presetBtns.forEach(b => b.classList.remove('active'));
        startInput.onchange = clearPresets;
        endInput.onchange = clearPresets;

        presetBtns.forEach(btn => {
          btn.onclick = () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const preset = btn.getAttribute('data-preset');
            const endDate = new Date();
            let startDate = new Date();

            if (preset === '1d') {
              startDate.setDate(endDate.getDate() - 1);
            } else if (preset === '1w') {
              startDate.setDate(endDate.getDate() - 7);
            } else if (preset === '1m') {
              startDate.setMonth(endDate.getMonth() - 1);
            } else if (preset === '3m') {
              startDate.setMonth(endDate.getMonth() - 3);
            } else if (preset === '6m') {
              startDate.setMonth(endDate.getMonth() - 6);
            } else if (preset === '1y') {
              startDate.setFullYear(endDate.getFullYear() - 1);
            }

            const formatDate = (d) => {
              const yyyy = d.getFullYear();
              const mm = String(d.getMonth() + 1).padStart(2, '0');
              const dd = String(d.getDate()).padStart(2, '0');
              return `${yyyy}-${mm}-${dd}`;
            };

            startInput.value = formatDate(startDate);
            endInput.value = formatDate(endDate);
            currentPage = 1;
            updateTable();
          };
        });

        wrapper.querySelector('#btn-search').onclick = () => {
          currentPage = 1;
          updateTable();
        };
        wrapper.querySelector('#btn-reset').onclick = () => {
          startInput.value = '';
          endInput.value = '';
          clearPresets();
          wrapper.querySelector('input[name="search-status"][value="전체"]').checked = true;
          wrapper.querySelector('#search-key').value = '전체';
          wrapper.querySelector('#search-keyword').value = '';
          currentPage = 1;
          updateTable();
        };

        wrapper.querySelector('#select-page-size').onchange = (e) => {
          pageSize = parseInt(e.target.value);
          currentPage = 1;
          updateTable();
        };

        // Initial table load
        updateTable();
      }, 50);

      return wrapper;
    }

    /* 권한그룹 및 권한 관리 - 목록 */
    function getAuthGroupListTemplate() {
      const wrapper = document.createElement('div');
      wrapper.className = 'auth-dashboard';

      const authGroups = [
        { no: 1, name: '권한그룹 #1', desc: '최고관리자 및 시스템 운영 담당자를 대상으로 한 모든 권한', created: '2026.06.09', owner: '이희성', updated: '2026.06.10', count: '15명' },
        { no: 2, name: '권한그룹 #2', desc: '경영진 조회 및 주요 통계 승인 권한', created: '2026.06.09', owner: '이희성', updated: '2026.06.10', count: '6명' },
        { no: 3, name: '권한그룹 #3', desc: '사업 접수, 계약, 발주, 공사 업무 담당자 권한', created: '2026.06.09', owner: '이희성', updated: '2026.06.11', count: '32명' },
        { no: 4, name: '권한그룹 #4', desc: '일반 사용자 조회 및 개인 업무 처리 권한', created: '2026.06.10', owner: '이희성', updated: '2026.06.12', count: '187명' },
        { no: 5, name: '회계정산 담당자', desc: '상환, 정산, 회계 마감 처리 권한', created: '2026.06.12', owner: '김도윤', updated: '2026.06.13', count: '9명' }
      ];

      wrapper.innerHTML = `
        <div class="card search-card">
          <div class="card-title">검색 조건</div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">조회기간 (등록일)</label>
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <input type="date" class="form-control" style="width:150px;" value="2026-06-01">
                <span style="">~</span>
                <input type="date" class="form-control" style="width:150px;" value="2026-06-16">
              </div>
            </div>
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">키워드 검색</label>
              <div style="display:flex; gap:8px; width:500px; max-width:100%;">
                <select class="form-control" style="width:130px; flex-shrink:0;">
                  <option>전체</option>
                  <option>권한그룹명</option>
                  <option>권한 그룹 설명</option>
                </select>
                <input type="text" class="form-control" style="flex:1;" placeholder="검색어를 입력하세요.">
              </div>
            </div>
          </div>
          <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px; border-top:1px solid var(--border); padding-top:16px;">
            <button class="btn btn-primary">${uiIcon('search')} 검색</button>
            <button class="btn btn-outline">초기화</button>
          </div>
        </div>

        <div class="card">
          <div class="auth-toolbar">
            <div class="card-title" style="margin:0;">권한그룹 및 권한 관리</div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-outline" style="height:32px; padding:0 12px; font-size:13px;" onclick="alert('선택한 권한그룹 삭제 기능입니다.')">${uiIcon('trash')} 삭제</button>
              <button class="btn btn-outline" style="height:32px; padding:0 12px; font-size:13px;" onclick="alert('전체 조회 결과 목록이 엑셀(.xlsx) 파일로 다운로드되었습니다.')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> 엑셀 다운로드</button>
              <button class="btn btn-accent" style="height:32px; padding:0 14px; font-size:13px;" onclick="authShowRegister&&authShowRegister()">${uiIcon('plus')} 권한그룹 추가하기</button>
            </div>
          </div>
          <div style="font-size:13px; color:var(--text-muted); margin-bottom:14px;">전체 <strong style="color:var(--blue);">${authGroups.length}</strong>건 &nbsp;|&nbsp; 현재 <strong style="color:var(--text);">1/1</strong> 페이지</div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th><input type="checkbox"></th>
                  <th>No</th>
                  <th>권한그룹명</th>
                  <th>권한그룹 설명</th>
                  <th>등록일</th>
                  <th>등록자</th>
                  <th>최종수정</th>
                  <th>매핑 수</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                ${authGroups.map(group => `
                  <tr>
                    <td><input type="checkbox"></td>
                    <td>${group.no}</td>
                    <td><button class="btn btn-outline" style="height:32px;" onclick="authShowRegister&&authShowRegister()">${group.name}</button></td>
                    <td style="text-align:left;">${group.desc}</td>
                    <td>${group.created}</td>
                    <td>${group.owner}</td>
                    <td>${group.updated}</td>
                    <td><span class="badge badge-status-secondary">${group.count}</span></td>
                    <td><button class="btn btn-outline" style="height:28px; padding:0 8px; font-size:13px;" onclick="deleteAuthGroup('${group.name}')">삭제</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="table-footer" style="margin-top:20px; border-top:1px solid var(--border); padding-top:14px;">
            <div></div>
            <div class="pagination">
              <button class="page-btn active">1</button>
            </div>
            <div></div>
          </div>
        </div>
      `;
      return wrapper;
    }

    /* 권한그룹 및 권한 관리 - 상세/설정 */
    function getAuthGroupSettingTemplate() {
      const wrapper = document.createElement('div');
      wrapper.className = 'auth-dashboard';

      wrapper.innerHTML = `
        <div class="auth-info-grid">
          <div class="card">
            <div class="card-title">권한그룹 정보</div>
            <div class="form-group" style="margin-bottom:12px;">
              <label>권한그룹명</label>
              <input class="form-control" maxlength="30" value="권한그룹 #1" placeholder="30자 이내로 작성해주세요.">
            </div>
            <div class="form-group">
              <label>권한그룹 설명</label>
              <textarea class="form-control" maxlength="100" style="height:86px; padding-top:10px; resize:vertical;" placeholder="100자 이내로 간략히 작성해주세요.">최고관리자 및 시스템 운영 담당자를 대상으로 한 모든 권한</textarea>
            </div>
            <div class="auth-meta-list">
              <div>등록일시<br><strong>2026.06.09 15:23</strong></div>
              <div>등록자<br><strong>이희성</strong></div>
              <div>최종수정일시<br><strong>2026.06.10 10:05</strong></div>
              <div>매핑 수<br><strong>15명</strong></div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">메뉴별 권한 부여</div>
            <div class="auth-permission-tree">
              <div class="auth-tree-group">
                <div class="auth-tree-title">${uiIcon('shield')} 사업관리 권한</div>
                <ul class="auth-tree-list">
                  <li>
                    <label><input type="checkbox" checked> 사업관리 전체</label>
                    <ul>
                      <li><label><input type="checkbox" checked> 접수관리</label></li>
                      <li><label><input type="checkbox" checked> 설계관리</label></li>
                      <li><label><input type="checkbox" checked> 계약관리</label></li>
                      <li><label><input type="checkbox" checked> 공사관리</label></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="auth-tree-group">
                <div class="auth-tree-title">${uiIcon('settings')} 공통/통계 권한</div>
                <ul class="auth-tree-list">
                  <li>
                    <label><input type="checkbox" checked> 공통관리</label>
                    <ul>
                      <li><label><input type="checkbox" checked> 관리자 관리</label></li>
                      <li><label><input type="checkbox" checked> 권한그룹 및 권한 관리</label></li>
                      <li><label><input type="checkbox" checked> 접속 아이피(IP) 관리</label></li>
                    </ul>
                  </li>
                  <li><label><input type="checkbox" checked> 통계/분석 조회</label></li>
                </ul>
              </div>
            </div>
            <div class="auth-notice">
              권한 그룹이 접근할 수 있는 메뉴를 설정합니다. 해당 권한 그룹은 체크된 메뉴에만 접근 가능합니다.
            </div>
          </div>
        </div>

        <div class="card">
          <div class="auth-toolbar">
            <div>
              <div class="card-title" style="margin-bottom:8px;">관리자 직원 매핑</div>
              <div style="">한 명의 관리자 직원은 여러 개의 권한그룹에 매핑될 수 있습니다.</div>
            </div>
            <button class="btn btn-accent" onclick="openAuthEmployeeModal()">${uiIcon('users')} 관리자 직원 추가하기</button>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>사원번호</th>
                  <th>아이디</th>
                  <th>사원명</th>
                  <th>부서</th>
                  <th>직급</th>
                  <th>매핑일</th>
                  <th>등록자</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15</td>
                  <td>2110004</td>
                  <td>simon</td>
                  <td>장시형</td>
                  <td>기획지원팀</td>
                  <td>과장</td>
                  <td>2026.06.09</td>
                  <td>이희성</td>
                  <td><button class="btn btn-outline" style="height:28px; padding:0 8px; font-size:13px;" onclick="removeAuthEmployee('장시형')">삭제</button></td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>2110012</td>
                  <td>mkchoi</td>
                  <td>최미경</td>
                  <td>재무관리부</td>
                  <td>사원</td>
                  <td>2026.06.09</td>
                  <td>이희성</td>
                  <td><button class="btn btn-outline" style="height:28px; padding:0 8px; font-size:13px;" onclick="removeAuthEmployee('최미경')">삭제</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:16px;">
            <button class="btn btn-outline" onclick="authShowList&&authShowList()">목록</button>
            <button class="btn btn-primary" onclick="alert('권한그룹 정보와 메뉴별 권한이 저장되었습니다.')">저장</button>
          </div>
        </div>

        <div class="auth-modal-backdrop" id="auth-employee-modal">
          <div class="auth-employee-modal">
            <div class="auth-employee-modal-header">
              <h3>관리자 직원 추가하기</h3>
              <button class="auth-modal-close" onclick="closeAuthEmployeeModal()">×</button>
            </div>
            <div class="auth-employee-modal-body">
              <div class="card search-card" style="margin-bottom:14px;">
                <div style="display:flex; flex-direction:column; gap:12px;">
                  <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
                    <label style="width:90px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">검색 구분</label>
                    <select class="form-control" style="flex:1;">
                      <option>전체</option>
                      <option>사원번호</option>
                      <option>아이디</option>
                      <option>사원명</option>
                      <option>부서</option>
                      <option>직급</option>
                      <option>이메일</option>
                    </select>
                  </div>
                  <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
                    <label style="width:90px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">키워드 검색</label>
                    <input class="form-control" style="flex:1;" placeholder="검색어를 입력하세요.">
                  </div>
                </div>
                <div style="display:flex; justify-content:flex-end; margin-top:16px; border-top:1px solid var(--border); padding-top:16px;">
                  <button class="btn btn-primary">${uiIcon('search')} 검색</button>
                </div>
              </div>
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th><input type="checkbox"></th>
                      <th>사원번호</th>
                      <th>아이디</th>
                      <th>사원명</th>
                      <th>부서</th>
                      <th>직급</th>
                      <th>이메일</th>
                      <th>사용여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" checked></td>
                      <td>2110004</td>
                      <td>simon</td>
                      <td>장시형</td>
                      <td>기획지원팀</td>
                      <td>과장</td>
                      <td>simon@kepcoes.co.kr</td>
                      <td><span class="badge badge-status-success">사용 Y</span></td>
                    </tr>
                    <tr>
                      <td><input type="checkbox"></td>
                      <td>2110028</td>
                      <td>dhkim</td>
                      <td>김도현</td>
                      <td>사업관리부</td>
                      <td>차장</td>
                      <td>dhkim@kepcoes.co.kr</td>
                      <td><span class="badge badge-status-success">사용 Y</span></td>
                    </tr>
                    <tr>
                      <td><input type="checkbox"></td>
                      <td>2110031</td>
                      <td>sjpark</td>
                      <td>박서진</td>
                      <td>계약관리부</td>
                      <td>대리</td>
                      <td>sjpark@kepcoes.co.kr</td>
                      <td><span class="badge badge-status-success">사용 Y</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="table-footer">
                <span>전체 55건 현재 1/4</span>
                <div style="display:flex; gap:8px;">
                  <select class="form-control" style="width:110px;"><option>10개씩</option><option>20개씩</option></select>
                  <button class="btn btn-accent" onclick="alert('선택한 관리자 직원이 권한그룹에 추가되었습니다.'); closeAuthEmployeeModal();">추가하기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      return wrapper;
    }

    window.deleteAuthGroup = function(groupName) {
      const message = `권한그룹을 삭제하면 해당 권한그룹에 매핑된 직원들의 권한이 모두 해지됩니다.\n\n${groupName}을(를) 삭제하시겠습니까?`;
      if (confirm(message)) alert('프로토타입: 권한그룹 삭제가 처리되었습니다.');
    };

    window.removeAuthEmployee = function(employeeName) {
      const message = `본 매핑 목록에서 삭제하면 해당 권한을 잃게 됩니다.\n${employeeName} 직원을 본 권한그룹에서 삭제하시겠습니까?`;
      if (confirm(message)) alert('프로토타입: 관리자 직원 매핑이 삭제되었습니다.');
    };

    window.openAuthEmployeeModal = function() {
      const modal = document.getElementById('auth-employee-modal');
      if (modal) modal.classList.add('open');
    };

    window.closeAuthEmployeeModal = function() {
      const modal = document.getElementById('auth-employee-modal');
      if (modal) modal.classList.remove('open');
    };

    /* 준비중 템플릿 */
    function getReadyTemplate(pathName) {
      const div = document.createElement('div');
      div.className = 'prep-card';
      div.innerHTML = `
        <div class="prep-icon">${uiIcon('construction')}</div>
        <div class="prep-title">준비 중인 화면</div>
        <div class="prep-desc"><strong style="color:var(--blue);">${pathName}</strong><br>화면은 현재 개발 중입니다.</div>
        <div class="prep-desc" style="font-size:14px;">프로토타입 고도화 단계에서 구현 예정입니다.</div>
        <button class="btn btn-outline" style="margin-top:8px;" onclick="selectMenu('common-1','관리자 목록')">관리자 목록으로 이동</button>`;
      return div;
    }

    /* ── 기획 설명 데이터 (화면별 전달 사항) ── */
    const guideData = {
      'common-1_관리자 목록': {
        summary: '전체 시스템 관리자 계정을 조회하고 제어하는 관리자 목록 화면입니다.',
        rules: [
          '시스템관리자(그룹#1) 권한을 가진 계정만 다른 계정의 등록/수정/삭제 권한을 제어할 수 있어야 합니다.',
          '상태 배지 표시는 활성 상태는 badge-success, 비활성은 badge-danger 클래스를 각각 맵핑하여 가시성을 확보해 주세요.',
          '오늘 가입/로그인 현황 카드는 매일 자정(00:00)을 기점으로 통계 테이블 집계를 통해 실시간 갱신되어야 합니다.'
        ]
      },
      'common-1_관리자 등록': {
        summary: '새로운 시스템 운영 주체나 부서별 담당자를 등록하는 양식 화면입니다.',
        rules: [
          '비밀번호 규칙: 사용자가 설정한 비밀번호는 DB 저장 전 반드시 SHA-256 단방향 해싱 암호화 가이드를 따라 가공해야 합니다.',
          '도메인 강제규칙: 메일 계정 입력 칸(@) 오른편은 가급적 kopecoes.co.kr 도메인만 등록 가능하도록 Regex 유효성을 검사해 주세요.',
          '필수(*) Validation: 필수 값 누락 시 alert 창 실행 대신 해당 입력 필드 테두리를 빨간색으로 변경하고 밑에 서브 텍스트로 보완 설명해 주세요.'
        ]
      },
      'common-2_검색/조회': {
        summary: '공통관리(설정) > 권한그룹 및 권한 관리 > 검색/조회 화면입니다.',
        rules: [
          '검색구분: 전체, 권한그룹명, 권한 그룹 설명',
          '권한에 매핑된 직원의 숫자를 목록 컬럼에 표시합니다.',
          '목록 컬럼: No, 권한그룹명, 권한그룹 설명, 등록일, 등록자, 최종수정, 매핑 수, 삭제',
          '권한그룹 삭제 시 삭제 유의사항 Confirm 박스를 노출합니다.'
        ]
      },
      'common-2_권한그룹 추가하기': {
        summary: '공통관리(설정) > 권한그룹 및 권한 관리 > 권한그룹 추가하기 화면입니다.',
        rules: [
          '권한그룹 정보: 권한그룹명, 권한그룹 설명, 등록일시, 등록자, 최종수정일시, 매핑 수를 표시합니다.',
          '메뉴별 권한 부여: 권한 그룹이 접근할 수 있는 메뉴를 설정하며 체크된 메뉴에만 접근 가능합니다.',
          '관리자 직원 매핑 등록 목록에는 No, 사원번호, 아이디, 사원명, 부서, 직급, 매핑일, 등록자, 삭제 컬럼을 표시합니다.',
          '페이징은 필요 없습니다. 오히려 불편하므로 등록 목록은 한 화면에서 확인 가능하게 구성합니다.',
          '삭제 시 Confirm 문구: 본 매핑 목록에서 삭제하면, 해당 권한을 잃게 됩니다. 본 권한그룹에서 해당 관리자 직원을 삭제하시겠습니까?',
          '관리자 직원 추가하기 검색구분: 전체, 사원번호, 아이디, 사원명, 부서, 직급, 이메일',
          '관리자 직원 추가하기에서는 사용여부가 사용 Y인 관리자만 호출 가능합니다.'
        ]
      },
      'common-3_IP 목록': {
        summary: '공통관리(설정) > 접속 아이피(IP) 관리',
        rules: [
          '①검색 구분 : 전체, 아이피(IP), 아이피(IP) 추가 사유',
          '② 삭제 시 컨펌(Confirm) 박스\n“본 접속 아이피(IP)를 삭제하면, 본 시스템에 해당 아이피(IP)로 접근이 불가합니다. 삭제하시겠습니까?”'
        ]
      },
      'common-3_IP 등록': {
        summary: '공통관리(설정) > 접속 아이피(IP) 관리 > IP 등록',
        rules: [
          '① 접속 아이피(IP)를 추가 등록하는 팝업/화면입니다.',
          '② 아이피(IP) 및 추가 사유를 필수로 입력해야 합니다.'
        ]
      },
      'common-4_코드 목록': {
        summary: '공통관리(설정) > 코드 관리 > 검색/조회',
        rules: [
          '①검색 구분 : 전체, 코드, 코드(논리명), 코드설명',
          '② 해당 목록의 모든 정보 + 값(하나의 컬럼에 ‘,’로 구분) 다운로드'
        ]
      },
      'common-4_코드 등록': {
        summary: '공통관리(설정) > 코드 관리 > 추가/관리 및 값 추가/관리',
        rules: [
          '① 개발 당시에만 사용 : 컨펌 박스 노출\n코드 삭제 시 시스템에 영향(값 삭제, 정보 유실 등)이 있을 수 있습니다. 시스템 관리자의 점검 후 삭제하세요. 본 코드를 삭제하시겠습니까?',
          '② 값 추가/관리 삭제 컨펌 박스 노출\n코드(값) 삭제 시 시스템에 영향(값 삭제, 정보 유실 등)이 있을 수 있습니다. 시스템 관리자의 점검 후 삭제하세요. 본 코드를 삭제하시겠습니까?'
        ]
      },
      'common-5_로그인 현황': {
        summary: '공통관리(설정) > 로그인 현황',
        rules: [
          '①페이지 로딩 시 최초 검색 셋팅\n- 기준 : 월별\n- 기간(월별) : 당해년(예 : 2026.01~현재 년월)',
          '② 기준 선택에 따라 적합한 컨트롤 노출 (일별/월별/연도별)'
        ]
      },
      'common-6_메뉴별 접속현황': {
        summary: '공통관리(설정) > 메뉴별 접속현황',
        rules: [
          '① 조회기간(등록일) 필터 제공 (하루 전, 1주일, 1개월, 3개월, 6개월, 1년)',
          '② 대메뉴, 중메뉴, 소메뉴 간의 계층적 구조 및 접속 횟수 표시'
        ]
      },
      'default': {
        summary: '현재 선택한 화면은 화면 정의서 작성 및 업무 프로세스 조율 단계에 있는 화면입니다.',
        rules: [
          '프로세스 수립: ERP 및 사내 그룹웨어 결재라인 연동을 위한 데이터 인터페이스 구성 설계가 우선적으로 필요합니다.',
          '디자인: 마일스톤 2단계 진행 시, 업무 담당자(이희성 부장)와의 상세 화면설계 미팅 후 마크업이 시작되어야 합니다.',
          '기타 요청: 상세 컴포넌트 아이템 도출 전까지는 준비중 플레이스홀더를 유지합니다.'
        ]
      }
    };

    function toggleDescModal() {
      const modal = document.getElementById('desc-modal');
      modal.classList.toggle('open');
    }

    function updateGuideContent(childId, tabName) {
      const key = `${childId}_${tabName}`;
      const guide = guideData[key] || guideData['default'];
      const body = document.getElementById('desc-modal-body');
      
      body.innerHTML = `
        <div class="desc-section">
        <div class="desc-section-title">${uiIcon('pin')} 화면 위치</div>
          <div class="desc-text">${guide.summary}</div>
        </div>
        <div class="desc-section">
        <div class="desc-section-title">${uiIcon('settings')} Description</div>
          <div class="desc-text" style="background-color: var(--blue-lt); border-color: var(--blue-md); color: var(--blue-dk); font-weight:500;">
            ${guide.rules.map(r => `• ${r}`).join('\n')}
          </div>
        </div>
      `;
    }

    function openOnlineManual() {
      document.getElementById('online-manual-modal').classList.add('open');
      document.getElementById('online-manual-overlay').classList.add('open');
    }

    function closeOnlineManual() {
      document.getElementById('online-manual-modal').classList.remove('open');
      document.getElementById('online-manual-overlay').classList.remove('open');
    }

    /* ── 상세정보 레이어 팝업 제어 ── */
    let selectedAdminId = null;

    window.openAdminDetail = function(id) {
      const admin = adminList.find(a => a.id === id);
      if (!admin) return;

      selectedAdminId = id;
      document.getElementById('detail-empNo').value = admin.empNo || '';
      document.getElementById('detail-username').value = admin.username || '';
      document.getElementById('detail-name').value = admin.name || '';
      document.getElementById('detail-dept').value = admin.dept || '';
      document.getElementById('detail-position').value = admin.position || '';
      document.getElementById('detail-email').value = admin.email || '';
      document.getElementById('detail-ip').value = admin.ip || '';
      
      if (admin.status === '사용') {
        document.getElementById('detail-status-use').checked = true;
      } else {
        document.getElementById('detail-status-stop').checked = true;
      }

      // Render permission groups as read-only badges
      const groupNames = {
        '1': '시스템관리자(그룹#1)',
        '2': '총무부서담당자(그룹#2)',
        '3': '사업담당자(그룹#3)',
        '4': '일반사용자(그룹#4)'
      };

      const groupContainer = document.getElementById('detail-auth-groups');
      groupContainer.innerHTML = '';
      if (admin.authGroups && admin.authGroups.length > 0) {
        admin.authGroups.forEach(gId => {
          const badge = document.createElement('span');
          badge.className = 'badge badge-secondary';
          badge.style.fontSize = '13px';
          badge.style.padding = '5px 12px';
          badge.style.border = '1px solid var(--border)';
          badge.textContent = groupNames[gId] || `그룹#${gId}`;
          groupContainer.appendChild(badge);
        });
      } else {
        groupContainer.innerHTML = `<span style="font-size:13px; color:var(--text-muted);">부여된 권한그룹이 없습니다.</span>`;
      }

      document.getElementById('detail-regUser').textContent = admin.regUser || '';
      document.getElementById('detail-regDate').textContent = admin.regDate || '';
      document.getElementById('detail-editDate').textContent = admin.editDate || '';

      document.getElementById('admin-detail-modal').classList.add('open');
      document.getElementById('admin-detail-overlay').classList.add('open');
    };

    window.closeAdminDetail = function() {
      document.getElementById('admin-detail-modal').classList.remove('open');
      document.getElementById('admin-detail-overlay').classList.remove('open');
      selectedAdminId = null;
    };

    window.saveAdminDetail = function() {
      if (!selectedAdminId) return;
      
      const admin = adminList.find(a => a.id === selectedAdminId);
      if (!admin) return;

      const newIp = document.getElementById('detail-ip').value.trim();
      const newStatus = document.querySelector('input[name="detail-status"]:checked').value;

      if (!newIp) {
        alert('접속아이피를 입력해 주세요.');
        return;
      }

      // Simple IP pattern validation
      const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
      if (!ipPattern.test(newIp)) {
        alert('올바른 IP 주소 형식을 입력해 주세요 (예: 192.168.0.100).');
        return;
      }

      // Re-use current datetime formatter

      const formatDateTime = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
      };

      admin.ip = newIp;
      admin.status = newStatus;
      admin.editDate = formatDateTime(new Date());

      alert(`${admin.name} (사원번호: ${admin.empNo})의 상세 정보가 정상 수정되었습니다.`);
      closeAdminDetail();

      // Refresh list table
      selectMenu(currentActiveMenuId, currentActiveTab);
    };

    /* ── 통계/분석 템플릿 생성기 ── */
    function getStatPeriodSearchTemplate(childId) {
      return `
        <div class="card stat-period-search">
          <div class="card-title">검색 조건</div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">조회기간</label>
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <div class="stat-period-presets date-presets" style="display:flex; gap:4px; margin-right:4px;">
                  <button type="button" class="date-preset-btn" onclick="setStatPeriodPreset('${childId}', '1m', this)">1개월</button>
                  <button type="button" class="date-preset-btn" onclick="setStatPeriodPreset('${childId}', '3m', this)">3개월</button>
                  <button type="button" class="date-preset-btn active" onclick="setStatPeriodPreset('${childId}', '6m', this)">6개월</button>
                  <button type="button" class="date-preset-btn" onclick="setStatPeriodPreset('${childId}', '1y', this)">1년</button>
                  <button type="button" class="date-preset-btn" onclick="setStatPeriodPreset('${childId}', 'all', this)">전체</button>
                </div>
                <input type="date" id="${childId}-start-date" class="form-control" style="width:150px;" value="2025-12-01">
                <span style="">~</span>
                <input type="date" id="${childId}-end-date" class="form-control" style="width:150px;" value="2026-05-31">
              </div>
            </div>
          </div>
          <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px; border-top:1px solid var(--border); padding-top:16px;">
            <button type="button" class="btn btn-primary" onclick="applyStatPeriodSearch('${childId}')">${uiIcon('search')} 조회</button>
            <button type="button" class="btn btn-outline" onclick="resetStatPeriodSearch('${childId}')">초기화</button>
          </div>
        </div>
      `;
    }

    function setStatPeriodPreset(childId, preset, button) {
      const start = document.getElementById(`${childId}-start-date`);
      const end = document.getElementById(`${childId}-end-date`);
      if (!start || !end) return;
      const ranges = {
        '1m': ['2026-05-01', '2026-05-31'],
        '3m': ['2026-03-01', '2026-05-31'],
        '6m': ['2025-12-01', '2026-05-31'],
        '1y': ['2025-06-01', '2026-05-31'],
        all: ['2021-01-01', '2026-05-31']
      };
      const selected = ranges[preset] || ranges['6m'];
      start.value = selected[0];
      end.value = selected[1];
      document.querySelectorAll(`#contents-container .stat-period-presets .date-preset-btn`).forEach(btn => btn.classList.remove('active'));
      if (button) button.classList.add('active');
    }

    function applyStatPeriodSearch(childId) {
      const start = document.getElementById(`${childId}-start-date`)?.value || '';
      const end = document.getElementById(`${childId}-end-date`)?.value || '';
      alert(`기간 검색 조건이 적용되었습니다.\\n${start} ~ ${end}\\n※ 프로토타입 화면입니다.`);
    }

    function resetStatPeriodSearch(childId) {
      const start = document.getElementById(`${childId}-start-date`);
      const end = document.getElementById(`${childId}-end-date`);
      if (start) start.value = '2026-01-01';
      if (end) end.value = '2026-05-31';
      document.querySelectorAll(`#contents-container .stat-period-presets .date-preset-btn`).forEach(btn => btn.classList.remove('active'));
      const defaultBtn = document.querySelector(`#contents-container .stat-period-presets .date-preset-btn:nth-child(3)`);
      if (defaultBtn) defaultBtn.classList.add('active');
    }

    function getStatAnalysisTemplate(childId) {
      const wrapper = document.createElement('div');
      let html = '';
      
      if (childId === 'stat-analysis-1') {
        html = `
          <div class="card">
            <div class="card-title">계약현황 종합 현황</div>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">전체 계약 건수·금액·유형별 비중을 한눈에 확인하는 종합 대시보드</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
              <span class="badge badge-secondary" style="border: 1px solid var(--border); font-size:13px;">기준일: 2026-05-31</span>
              <span class="badge badge-success" style="font-size:13px;">총 610건</span>
              <span class="badge badge-warning" style="font-size:13px;">총 6,326억원</span>
              <span class="badge badge-danger" style="font-size:13px;">ESCO계약 502건 (82.3%)</span>
            </div>
            <div class="kpi-row" style="margin-bottom: 0;">
              <div class="kpi-card">
                <div class="kpi-label">총 계약 건수</div>
                <div class="kpi-value">610<span class="kpi-unit">건</span></div>
                <div class="kpi-sub">기준일 2026-05-31</div>
              </div>
              <div class="kpi-card green" style="border-left-color: var(--green);">
                <div class="kpi-label">총 계약금액</div>
                <div class="kpi-value">6,326<span class="kpi-unit">억원</span></div>
                <div class="kpi-sub">전체 사업 규모</div>
              </div>
              <div class="kpi-card amber" style="border-left-color: var(--amber);">
                <div class="kpi-label">ESCO(시설대여) 계약</div>
                <div class="kpi-value">502<span class="kpi-unit">건</span></div>
                <div class="kpi-sub">전체의 82.3%</div>
              </div>
              <div class="kpi-card red" style="border-left-color: var(--red);">
                <div class="kpi-label">기타(장기할부 등)</div>
                <div class="kpi-value">108<span class="kpi-unit">건</span></div>
                <div class="kpi-sub">전체의 17.7%</div>
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 20px;">
            <div class="card">
              <div class="card-title">계약유형 비중</div>
              <div class="stat-donut-container">
                <div class="stat-donut-chart" style="background: conic-gradient(var(--blue) 0% 82.3%, var(--amber) 82.3% 100%);"></div>
                <div class="stat-donut-legend">
                  <div class="stat-donut-legend-item">
                    <span class="stat-donut-color-dot" style="background: var(--blue);"></span>
                    <span>ESCO(시설대여): 502건 (82.3%)</span>
                  </div>
                  <div class="stat-donut-legend-item">
                    <span class="stat-donut-color-dot" style="background: var(--amber);"></span>
                    <span>장기할부/기타: 108건 (17.7%)</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-title">진행상태별 현황</div>
              <div style="padding-top: 10px;">
                <div class="stat-bar-container">
                  <div class="stat-bar-title-row">
                    <span class="stat-bar-label">진행중</span>
                    <span class="stat-bar-value">3,950억원</span>
                  </div>
                  <div class="stat-bar-outer">
                    <div class="stat-bar-inner" style="width: 63.6%; background: var(--blue);">388건 (63.6%)</div>
                  </div>
                </div>
                <div class="stat-bar-container">
                  <div class="stat-bar-title-row">
                    <span class="stat-bar-label">준공완료(상환중)</span>
                    <span class="stat-bar-value">2,070억원</span>
                  </div>
                  <div class="stat-bar-outer">
                    <div class="stat-bar-inner" style="width: 32.0%; background: var(--green);">195건 (32.0%)</div>
                  </div>
                </div>
                <div class="stat-bar-container">
                  <div class="stat-bar-title-row">
                    <span class="stat-bar-label">해지/취소</span>
                    <span class="stat-bar-value">306억원</span>
                  </div>
                  <div class="stat-bar-outer">
                    <div class="stat-bar-inner" style="width: 4.4%; background: var(--amber);">27건 (4.4%)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">종합 요약 테이블</div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>건수</th>
                    <th>비중</th>
                    <th>계약금액</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ESCO(시설대여)계약</td>
                    <td>502건</td>
                    <td>82.3%</td>
                    <td>5,180억원</td>
                    <td>3자계약 (사업자·사용자·EPC사)</td>
                  </tr>
                  <tr>
                    <td>장기할부판매계약 등</td>
                    <td>108건</td>
                    <td>17.7%</td>
                    <td>1,146억원</td>
                    <td>2자계약 (사업자·사용자)</td>
                  </tr>
                  <tr style="background-color: var(--bg);">
                    <td>합계</td>
                    <td>610건</td>
                    <td>100%</td>
                    <td>6,326억원</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `;
      } else if (childId === 'stat-analysis-2') {
        html = `
          <div class="card">
            <div class="card-title">연도별 계약 추이 분석</div>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">2021년~2026년(상반기) 신규 계약 건수 및 금액 추이</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
              <span class="badge badge-secondary" style="border: 1px solid var(--border); font-size:13px;">기준일: 2026-05-31</span>
              <span class="badge badge-success" style="font-size:13px;">6개 연도 비교</span>
              <span class="badge badge-warning" style="font-size:13px;">최근 3개년 성장세</span>
            </div>
            <div class="kpi-row" style="margin-bottom: 0;">
              <div class="kpi-card green" style="border-left-color: var(--green);">
                <div class="kpi-label">2024→2025 건수 증가율</div>
                <div class="kpi-value">+11.7<span class="kpi-unit">%</span></div>
                <div class="kpi-sub">145건 → 162건</div>
              </div>
              <div class="kpi-card green" style="border-left-color: var(--green);">
                <div class="kpi-label">2024→2025 금액 증가율</div>
                <div class="kpi-value">+11.9<span class="kpi-unit">%</span></div>
                <div class="kpi-sub">1,510억 → 1,690억</div>
              </div>
              <div class="kpi-card">
                <div class="kpi-label">5개년 연평균 성장률(CAGR)</div>
                <div class="kpi-value">22.8<span class="kpi-unit">%</span></div>
                <div class="kpi-sub">2021~2025 기준</div>
              </div>
              <div class="kpi-card amber" style="border-left-color: var(--amber);">
                <div class="kpi-label">2026년 누적 진행률</div>
                <div class="kpi-value">22.8<span class="kpi-unit">%</span></div>
                <div class="kpi-sub">2025년 대비 5월 기준</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">연도별 신규계약 건수 및 금액</div>
            <div style="padding-top: 10px;">
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">2021년</span>
                  <span class="stat-bar-value">540억원</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 35.8%; background: var(--blue-md); color: var(--text);">58건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">2022년</span>
                  <span class="stat-bar-value">820억원</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 53.7%; background: var(--blue-md); color: var(--text);">87건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">2023년</span>
                  <span class="stat-bar-value">1,260억원</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 74.7%; background: var(--blue);">121건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">2024년</span>
                  <span class="stat-bar-value">1,510억원</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 89.5%; background: var(--blue);">145건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">2025년</span>
                  <span class="stat-bar-value">1,690억원</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 100%; background: var(--blue-dk);">162건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">2026년 (~05월)</span>
                  <span class="stat-bar-value">506억원</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 22.8%; background: var(--green);">37건</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">연도별 상세 데이터</div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>연도</th>
                    <th>신규 계약 건수</th>
                    <th>계약금액</th>
                    <th>전년대비 건수</th>
                    <th>전년대비 금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2021</td>
                    <td>58건</td>
                    <td>540억원</td>
                    <td style="color: var(--text-muted);">—</td>
                    <td style="color: var(--text-muted);">—</td>
                  </tr>
                  <tr>
                    <td>2022</td>
                    <td>87건</td>
                    <td>820억원</td>
                    <td>+50.0%</td>
                    <td>+51.9%</td>
                  </tr>
                  <tr>
                    <td>2023</td>
                    <td>121건</td>
                    <td>1,260억원</td>
                    <td>+39.1%</td>
                    <td>+53.7%</td>
                  </tr>
                  <tr>
                    <td>2024</td>
                    <td>145건</td>
                    <td>1,510억원</td>
                    <td>+19.8%</td>
                    <td>+19.8%</td>
                  </tr>
                  <tr>
                    <td>2025</td>
                    <td>162건</td>
                    <td>1,690억원</td>
                    <td>+11.7%</td>
                    <td>+11.9%</td>
                  </tr>
                  <tr style="background-color: var(--bg);">
                    <td>2026 (~05월)</td>
                    <td>37건</td>
                    <td>506억원</td>
                    <td style="color: var(--text-muted);">—</td>
                    <td style="color: var(--text-muted);">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `;
      } else if (childId === 'stat-analysis-3') {
        html = `
          <div class="card">
            <div class="card-title">부서·분야별 계약 현황</div>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">주관 부서 및 사업분야별 계약 건수·금액 비중</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
              <span class="badge badge-secondary" style="border: 1px solid var(--border); font-size:13px;">기준일: 2026-05-31</span>
              <span class="badge badge-success" style="font-size:13px;">${uiIcon('building')} 3개 주관부서</span>
              <span class="badge badge-warning" style="font-size:13px;"><span class="icon-dot" style="background:var(--amber);"></span>분야별 비중 비교</span>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 20px;">
            <div class="card">
              <div class="card-title">주관부서별 현황</div>
              <div style="padding-top: 10px;">
                <div class="stat-bar-container">
                  <div class="stat-bar-title-row">
                    <span class="stat-bar-label">EERS팀</span>
                    <span class="stat-bar-value">4,150억원</span>
                  </div>
                  <div class="stat-bar-outer">
                    <div class="stat-bar-inner" style="width: 100%; background: var(--blue);">412건 (67.5%)</div>
                  </div>
                </div>
                <div class="stat-bar-container">
                  <div class="stat-bar-title-row">
                    <span class="stat-bar-label">운영실</span>
                    <span class="stat-bar-value">1,520억원</span>
                  </div>
                  <div class="stat-bar-outer">
                    <div class="stat-bar-inner" style="width: 33.5%; background: var(--green);">138건 (22.6%)</div>
                  </div>
                </div>
                <div class="stat-bar-container">
                  <div class="stat-bar-title-row">
                    <span class="stat-bar-label">기획지원팀</span>
                    <span class="stat-bar-value">656억원</span>
                  </div>
                  <div class="stat-bar-outer">
                    <div class="stat-bar-inner" style="width: 14.6%; background: var(--amber);">60건 (9.9%)</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-title">사업분야별 비중</div>
              <div class="stat-donut-container">
                <div class="stat-donut-chart" style="background: conic-gradient(var(--blue) 0% 45%, var(--green) 45% 72%, var(--amber) 72% 90%, var(--purple-md) 90% 100%);"></div>
                <div class="stat-donut-legend">
                  <div class="stat-donut-legend-item">
                    <span class="stat-donut-color-dot" style="background: var(--blue);"></span>
                    <span>조명(LED): 275건 (45.0%)</span>
                  </div>
                  <div class="stat-donut-legend-item">
                    <span class="stat-donut-color-dot" style="background: var(--green);"></span>
                    <span>냉난방(공조): 165건 (27.0%)</span>
                  </div>
                  <div class="stat-donut-legend-item">
                    <span class="stat-donut-color-dot" style="background: var(--amber);"></span>
                    <span>보일러/열원: 110건 (18.0%)</span>
                  </div>
                  <div class="stat-donut-legend-item">
                    <span class="stat-donut-color-dot" style="background: var(--purple-md);"></span>
                    <span>기타(ZEB 등): 60건 (10.0%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">부서 × 분야 상세 테이블</div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>주관부서</th>
                    <th>건수</th>
                    <th>계약금액</th>
                    <th>주요 분야</th>
                    <th>비중</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>EERS팀</td>
                    <td>412건</td>
                    <td>4,150억원</td>
                    <td>조명·냉난방 중심</td>
                    <td>67.5%</td>
                  </tr>
                  <tr>
                    <td>운영실</td>
                    <td>138건</td>
                    <td>1,520억원</td>
                    <td>보일러/열원설비 중심</td>
                    <td>22.6%</td>
                  </tr>
                  <tr>
                    <td>기획지원팀</td>
                    <td>60건</td>
                    <td>656억원</td>
                    <td>ZEB·신사업 분야</td>
                    <td>9.9%</td>
                  </tr>
                  <tr style="background-color: var(--bg);">
                    <td>합계</td>
                    <td>610건</td>
                    <td>6,326억원</td>
                    <td>—</td>
                    <td>100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `;
      } else if (childId === 'stat-analysis-4') {
        html = `
          <div class="card">
            <div class="card-title">사업 진행 및 이상 현황</div>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">공사 진행 단계별 현황 및 지연·이상 발생 사업 모니터링</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
              <span class="badge badge-secondary" style="border: 1px solid var(--border); font-size:13px;">기준일: 2026-05-31</span>
              <span class="badge badge-success" style="font-size:13px;"><span class="icon-dot" style="background:var(--green);"></span>정상진행 다수</span>
              <span class="badge badge-warning" style="font-size:13px;"><span class="icon-dot" style="background:var(--amber);"></span>이상현황 모니터링</span>
            </div>
            <div class="kpi-row" style="margin-bottom: 0;">
              <div class="kpi-card green" style="border-left-color: var(--green);">
                <div class="kpi-label">정상 진행</div>
                <div class="kpi-value">363<span class="kpi-unit">건</span></div>
                <div class="kpi-sub">진행중 388건 중 93.6%</div>
              </div>
              <div class="kpi-card amber" style="border-left-color: var(--amber);">
                <div class="kpi-label">이상현황</div>
                <div class="kpi-value">25<span class="kpi-unit">건</span></div>
                <div class="kpi-sub">전체 진행중의 6.4%</div>
              </div>
              <div class="kpi-card red" style="border-left-color: var(--red);">
                <div class="kpi-label">분쟁/해지 검토</div>
                <div class="kpi-value">4<span class="kpi-unit">건</span></div>
                <div class="kpi-sub">법무재무팀 협의중</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">공사 진행단계별 현황</div>
            <div style="padding-top: 10px;">
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">계약체결</span>
                  <span class="stat-bar-value">100%</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 100%; background: var(--blue-md); color: var(--text);">388건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">착공</span>
                  <span class="stat-bar-value">91.0%</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 91.0%; background: var(--blue);">353건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">공사중(기성진행)</span>
                  <span class="stat-bar-value">62.6%</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 62.6%; background: var(--blue-dk);">243건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">준공대기</span>
                  <span class="stat-bar-value">18.0%</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 18.0%; background: var(--green);">70건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">이상현황(지연 등)</span>
                  <span class="stat-bar-value">6.4%</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 6.4%; background: var(--amber);">25건</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">이상현황 유형별 분류</div>
            <div class="stat-cards-grid">
              <div class="stat-grid-card" style="border-top: 3.5px solid var(--amber);">
                <div class="stat-grid-card-num" style="color: var(--amber);">14건</div>
                <div class="stat-grid-card-title">착공 지연</div>
                <div class="stat-grid-card-desc">계약체결 후 사급물자 조달·현장여건 등으로 착공이 지연되고 있는 사업</div>
              </div>
              <div class="stat-grid-card" style="border-top: 3.5px solid var(--amber);">
                <div class="stat-grid-card-num" style="color: var(--amber);">7건</div>
                <div class="stat-grid-card-title">공정 지연</div>
                <div class="stat-grid-card-desc">기성률이 계획 대비 10%p 이상 저조한 사업, 진척관리 강화 필요</div>
              </div>
              <div class="stat-grid-card" style="border-top: 3.5px solid var(--red);">
                <div class="stat-grid-card-num" style="color: var(--red);">3건</div>
                <div class="stat-grid-card-title">분쟁/클레임</div>
                <div class="stat-grid-card-desc">계약변경·하도급 분쟁 등으로 법무재무팀 협의가 진행 중인 사업</div>
              </div>
              <div class="stat-grid-card" style="border-top: 3.5px solid var(--red);">
                <div class="stat-grid-card-num" style="color: var(--red);">1건</div>
                <div class="stat-grid-card-title">계약해지 검토</div>
                <div class="stat-grid-card-desc">계약상대자 귀책으로 계약규정 제113조 절차 검토 중인 사업</div>
              </div>
            </div>
          </div>
        `;
      } else if (childId === 'stat-analysis-5') {
        html = `
          <div class="card">
            <div class="card-title">상환금 회수 현황</div>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">준공완료(상환중) 사업의 상환계획 대비 회수 진행률</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
              <span class="badge badge-secondary" style="border: 1px solid var(--border); font-size:13px;">기준일: 2026-05-31</span>
              <span class="badge badge-success" style="font-size:13px;">${uiIcon('inbox')} 195건 상환중</span>
              <span class="badge badge-warning" style="font-size:13px;">${uiIcon('bar-chart')} 평균 회수율 50.9%</span>
            </div>
            <div class="kpi-row" style="margin-bottom: 0;">
              <div class="kpi-card">
                <div class="kpi-label">상환대상 계약금액</div>
                <div class="kpi-value">2,070<span class="kpi-unit">억원</span></div>
                <div class="kpi-sub">준공완료 195건</div>
              </div>
              <div class="kpi-card green" style="border-left-color: var(--green);">
                <div class="kpi-label">회수 완료액</div>
                <div class="kpi-value">1,054<span class="kpi-unit">억원</span></div>
                <div class="kpi-sub">평균 회수율 50.9%</div>
              </div>
              <div class="kpi-card amber" style="border-left-color: var(--amber);">
                <div class="kpi-label">잔여 회수예정액</div>
                <div class="kpi-value">1,016<span class="kpi-unit">억원</span></div>
                <div class="kpi-sub">49.1% 잔여</div>
              </div>
              <div class="kpi-card red" style="border-left-color: var(--red);">
                <div class="kpi-label">연체 발생 건</div>
                <div class="kpi-value">3<span class="kpi-unit">건</span></div>
                <div class="kpi-sub">상환업무 절차서 적용 대상</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">회수율 구간별 분포</div>
            <div style="padding-top: 10px;">
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">80% 이상</span>
                  <span class="stat-bar-value">18.5%</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 18.5%; background: var(--green);">36건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">50~80%</span>
                  <span class="stat-bar-value">43.6%</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 43.6%; background: var(--blue);">85건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">20~50%</span>
                  <span class="stat-bar-value">30.3%</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 30.3%; background: var(--amber);">59건</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">20% 미만</span>
                  <span class="stat-bar-value">7.7%</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 7.7%; background: var(--red);">15건</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">3개사 상환현황 비교 (대표 사례)</div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>업체명</th>
                    <th>계약금액</th>
                    <th>상환완료액</th>
                    <th>회수율</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>롯데슈퍼LED</td>
                    <td>48억원</td>
                    <td>27.9억원</td>
                    <td>58.2%</td>
                    <td><span class="badge badge-status-success">정상</span></td>
                  </tr>
                  <tr>
                    <td>일공팩</td>
                    <td>32억원</td>
                    <td>15.2억원</td>
                    <td>47.5%</td>
                    <td><span class="badge badge-status-warning">진행중</span></td>
                  </tr>
                  <tr>
                    <td>덕우전자</td>
                    <td>26억원</td>
                    <td>12.2억원</td>
                    <td>47.0%</td>
                    <td><span class="badge badge-status-warning">진행중</span></td>
                  </tr>
                  <tr style="background-color: var(--bg);">
                    <td>3개사 평균</td>
                    <td>35.3억원</td>
                    <td>18.4억원</td>
                    <td>50.9%</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="font-size:13px; color: var(--text-muted); margin-top: 8px;">※ 상세 월별 상환계획·실적은 「상환스케줄 현황」 메뉴 참조</div>
          </div>
        `;
      } else if (childId === 'stat-analysis-6') {
        html = `
          <div class="card">
            <div class="card-title">사업 수익률 (IRR) 분석</div>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">계약별 내부수익률(IRR) 구간 분포 및 평균 수익률 추이</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
              <span class="badge badge-secondary" style="border: 1px solid var(--border); font-size:13px;">기준일: 2026-05-31</span>
              <span class="badge badge-success" style="font-size:13px;">${uiIcon('bar-chart')} 평균 IRR 약 7.4%</span>
              <span class="badge badge-warning" style="font-size:13px;">${uiIcon('target')} 목표구간 7~9% 최다</span>
            </div>
            <div class="kpi-row" style="margin-bottom: 0;">
              <div class="kpi-card">
                <div class="kpi-label">전체 평균 IRR</div>
                <div class="kpi-value">7.4<span class="kpi-unit">%</span></div>
                <div class="kpi-sub">610건 가중평균</div>
              </div>
              <div class="kpi-card green" style="border-left-color: var(--green);">
                <div class="kpi-label">최다 분포 구간</div>
                <div class="kpi-value">7~9<span class="kpi-unit">%</span></div>
                <div class="kpi-sub">251건 (41.1%)</div>
              </div>
              <div class="kpi-card amber" style="border-left-color: var(--amber);">
                <div class="kpi-label">5% 미만 비중</div>
                <div class="kpi-value">6.9<span class="kpi-unit">%</span></div>
                <div class="kpi-sub">42건 — 수익률 적합성 재검토</div>
              </div>
              <div class="kpi-card red" style="border-left-color: var(--red);">
                <div class="kpi-label">11% 이상 비중</div>
                <div class="kpi-value">3.8<span class="kpi-unit">%</span></div>
                <div class="kpi-sub">23건 — 고수익 사업</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">IRR 구간별 분포</div>
            <div style="padding-top: 10px;">
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">5% 미만</span>
                  <span class="stat-bar-value">재검토 대상</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 16.7%; background: var(--red);">42건 (6.9%)</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">5~7%</span>
                  <span class="stat-bar-value">기준 충족</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 78.9%; background: var(--amber);">198건 (32.5%)</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">7~9%</span>
                  <span class="stat-bar-value">최다 구간</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 100%; background: var(--blue);">251건 (41.1%)</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">9~11%</span>
                  <span class="stat-bar-value">우수</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 38.2%; background: var(--green);">96건 (15.7%)</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">11% 이상</span>
                  <span class="stat-bar-value">고수익</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 9.2%; background: var(--blue-dk);">23건 (3.8%)</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">연도별 평균 IRR 추이</div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>연도</th>
                    <th>평균 IRR</th>
                    <th>전년대비</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2021</td>
                    <td>6.8%</td>
                    <td style="color: var(--text-muted);">—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>2022</td>
                    <td>7.0%</td>
                    <td>+0.2%p</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>2023</td>
                    <td>7.2%</td>
                    <td>+0.2%p</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>2024</td>
                    <td>7.5%</td>
                    <td>+0.3%p</td>
                    <td>원가상승 반영</td>
                  </tr>
                  <tr>
                    <td>2025</td>
                    <td>7.6%</td>
                    <td>+0.1%p</td>
                    <td>—</td>
                  </tr>
                  <tr style="background-color: var(--bg);">
                    <td>2026 (~05월)</td>
                    <td>7.5%</td>
                    <td>-0.1%p</td>
                    <td>「수익률 운영지침」 기준 적합</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `;
      } else if (childId === 'stat-analysis-7') {
        html = `
          <div class="card">
            <div class="card-title">상환스케쥴 현황</div>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">주요 3개사(롯데슈퍼LED·일공팩·덕우전자) 월별 상환계획 대비 실적</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
              <span class="badge badge-secondary" style="border: 1px solid var(--border); font-size:13px;">기준일: 2026-05-31</span>
              <span class="badge badge-success" style="font-size:13px;">${uiIcon('building')} 3개사 관리</span>
              <span class="badge badge-warning" style="font-size:13px;">${uiIcon('calendar')} 월별 상환계획 대비 실적</span>
            </div>
          </div>

          <div class="card">
            <div class="card-title">업체별 상환 진행률</div>
            <div style="padding-top: 10px;">
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">롯데슈퍼LED</span>
                  <span class="stat-bar-value">27.9억 / 48억</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 58.2%; background: var(--blue);">58.2%</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">일공팩</span>
                  <span class="stat-bar-value">15.2억 / 32억</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 47.5%; background: var(--green);">47.5%</div>
                </div>
              </div>
              <div class="stat-bar-container">
                <div class="stat-bar-title-row">
                  <span class="stat-bar-label">덕우전자</span>
                  <span class="stat-bar-value">12.2억 / 26억</span>
                </div>
                <div class="stat-bar-outer">
                  <div class="stat-bar-inner" style="width: 47.0%; background: var(--amber);">47.0%</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">월별 상환 스케줄 (최근 6개월)</div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>월</th>
                    <th>롯데슈퍼LED 계획/실적</th>
                    <th>일공팩 계획/실적</th>
                    <th>덕우전자 계획/실적</th>
                    <th>월 합계 실적</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2026-01</td>
                    <td>0.8억 / 0.8억</td>
                    <td>0.5억 / 0.5억</td>
                    <td>0.4억 / 0.4억</td>
                    <td>1.7억</td>
                  </tr>
                  <tr>
                    <td>2026-02</td>
                    <td>0.8억 / 0.8억</td>
                    <td>0.5억 / 0.4억</td>
                    <td>0.4억 / 0.4억</td>
                    <td>1.6억</td>
                  </tr>
                  <tr>
                    <td>2026-03</td>
                    <td>0.8억 / 0.8억</td>
                    <td>0.5억 / 0.5억</td>
                    <td>0.4억 / 0.3억</td>
                    <td>1.6억</td>
                  </tr>
                  <tr>
                    <td>2026-04</td>
                    <td>0.8억 / 0.8억</td>
                    <td>0.5억 / 0.5억</td>
                    <td>0.4억 / 0.4억</td>
                    <td>1.7억</td>
                  </tr>
                  <tr>
                    <td>2026-05</td>
                    <td>0.8억 / 0.7억</td>
                    <td>0.5억 / 0.4억</td>
                    <td>0.4억 / 0.4억</td>
                    <td>1.5억</td>
                  </tr>
                  <tr style="background-color: var(--bg); color: var(--text-muted);">
                    <td>2026-06 (예정)</td>
                    <td>0.8억 / —</td>
                    <td>0.5억 / —</td>
                    <td>0.4억 / —</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card">
            <div class="card-title">잔여 상환 안내</div>
            <div class="stat-cards-grid">
              <div class="stat-grid-card" style="border-top: 3.5px solid var(--blue);">
                <div class="stat-grid-card-title" style="color: var(--blue-dk);">롯데슈퍼LED</div>
                <div class="stat-grid-card-desc">잔여 20.1억원, 잔여기간 약 25개월. 월 0.8억원 정상 상환 중.</div>
              </div>
              <div class="stat-grid-card" style="border-top: 3.5px solid var(--green);">
                <div class="stat-grid-card-title" style="color: var(--green-dk);">일공팩</div>
                <div class="stat-grid-card-desc">잔여 16.8억원, 잔여기간 약 33개월. 2026-02·05월 일부 미수 발생 — 상환안내 필요.</div>
              </div>
              <div class="stat-grid-card" style="border-top: 3.5px solid var(--amber);">
                <div class="stat-grid-card-title" style="color: var(--amber-dk);">덕우전자</div>
                <div class="stat-grid-card-desc">잔여 13.8억원, 잔여기간 약 34개월. 2026-03월 일부 미수 — 상환업무 절차서에 따라 안내 진행.</div>
              </div>
            </div>
          </div>
        `;
      }
      
      wrapper.innerHTML = getStatPeriodSearchTemplate(childId) + html;
      return wrapper;
    }

    /* ── 접속 아이피(IP) 관리 템플릿 ── */
    let ipPageSize = 10;
    let ipCurrentPage = 1;

    function getAccessIpListTemplate() {
      const wrapper = document.createElement('div');

      const searchCard = document.createElement('div');
      searchCard.className = 'card search-card';
      searchCard.innerHTML = `
        <div class="card-title">검색 조건</div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
            <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">조회기간 (등록일)</label>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <div class="date-presets" style="display:flex; gap:4px; margin-right:4px;">
                <button type="button" class="date-preset-btn" data-preset="1d">하루 전</button>
                <button type="button" class="date-preset-btn" data-preset="1w">1주일</button>
                <button type="button" class="date-preset-btn" data-preset="1m">1개월</button>
                <button type="button" class="date-preset-btn" data-preset="3m">3개월</button>
                <button type="button" class="date-preset-btn" data-preset="6m">6개월</button>
                <button type="button" class="date-preset-btn" data-preset="1y">1년</button>
              </div>
              <input type="date" id="ip-search-start-date" class="form-control" style="width:150px;">
              <span style="">~</span>
              <input type="date" id="ip-search-end-date" class="form-control" style="width:150px;">
            </div>
          </div>
          <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
            <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">키워드 검색</label>
            <div style="display:flex; gap:8px; width:500px; max-width:100%;">
              <select id="ip-search-key" class="form-control" style="width:130px; flex-shrink:0;">
                <option value="전체">전체</option>
                <option value="아이피(IP)">아이피(IP)</option>
                <option value="아이피(IP) 추가 사유">아이피(IP) 추가 사유</option>
              </select>
              <input type="text" id="ip-search-keyword" class="form-control" style="flex:1;" placeholder="검색어를 입력하세요.">
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px; border-top:1px solid var(--border); padding-top:16px;">
          <button class="btn btn-primary" id="btn-ip-search">
            ${uiIcon('search')} 검색
          </button>
          <button class="btn btn-outline" id="btn-ip-reset">초기화</button>
        </div>`;
      wrapper.appendChild(searchCard);

      const listCard = document.createElement('div');
      listCard.className = 'card';
      listCard.innerHTML = `
        <div class="card-title">접속 아이피(IP) 목록</div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
          <div style="font-size:13px; color:var(--text-muted);">
            전체 <strong id="ip-total-cnt" style="color:var(--blue);">0</strong>건 &nbsp;|&nbsp;
            현재 <strong id="ip-current-page" style="color:var(--text);">1/1</strong> 페이지
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <select id="select-ip-page-size" class="form-control" style="width:110px; height:32px; font-size:13px; padding:0 8px; margin:0;">
              <option value="10">10개씩</option>
              <option value="20">20개씩</option>
              <option value="50">50개씩</option>
            </select>
            <button class="btn btn-outline" style="height:32px; padding:0 12px; font-size:13px;" onclick="alert('전체 조회 결과 목록이 엑셀(.xlsx) 파일로 다운로드되었습니다.')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              엑셀 다운로드
            </button>
            <button class="btn btn-primary" onclick="openIpAddModal()" style="height:32px; padding:0 14px; font-size:13px; background-color: var(--blue);">
              접속 아이피(IP) 추가하기
            </button>
          </div>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:70px; text-align:center;">No</th>
                <th>아이피(IP)</th>
                <th>아이피(IP) 추가 사유</th>
                <th>등록일</th>
                <th>등록자</th>
                <th style="width:90px; text-align:center;">삭제</th>
              </tr>
            </thead>
            <tbody id="ip-table-body"></tbody>
          </table>
        </div>
        <div class="table-footer" style="margin-top:20px; border-top:1px solid var(--border); padding-top:14px;">
          <div></div>
          <div class="pagination" id="ip-pagination"></div>
          <div></div>
        </div>`;
      wrapper.appendChild(listCard);

      setTimeout(() => {
        const updateTable = () => {
          const startDate = wrapper.querySelector('#ip-search-start-date').value;
          const endDate = wrapper.querySelector('#ip-search-end-date').value;
          const key = wrapper.querySelector('#ip-search-key').value;
          const keyword = wrapper.querySelector('#ip-search-keyword').value.toLowerCase().trim();

          const filtered = accessIpList.filter(item => {
            if (startDate && item.regDate.replace(/\./g, '-').trim() < startDate) return false;
            if (endDate && item.regDate.replace(/\./g, '-').trim() > endDate) return false;

            if (keyword) {
              if (key === '전체') {
                return (item.ip.toLowerCase().includes(keyword) || item.reason.toLowerCase().includes(keyword));
              } else if (key === '아이피(IP)') {
                return item.ip.toLowerCase().includes(keyword);
              } else if (key === '아이피(IP) 추가 사유') {
                return item.reason.toLowerCase().includes(keyword);
              }
            }
            return true;
          });

          const totalCount = filtered.length;
          const totalPages = Math.ceil(totalCount / ipPageSize) || 1;
          if (ipCurrentPage > totalPages) ipCurrentPage = totalPages;

          const startIdx = (ipCurrentPage - 1) * ipPageSize;
          const paginated = filtered.slice(startIdx, startIdx + ipPageSize);

          const tbody = wrapper.querySelector('#ip-table-body');
          tbody.innerHTML = paginated.map((item, idx) => {
            return `<tr>
              <td style="text-align:center;">${25214 + startIdx + idx}</td>
              <td>${item.ip}</td>
              <td style="text-align:left;">${item.reason}</td>
              <td style="">${item.regDate}</td>
              <td>${item.regUser}</td>
              <td style="text-align:center;">
                <button class="btn btn-outline" style="height:28px; padding:0 8px; font-size:13px;"
                  onclick="deleteAccessIp(${item.id})">삭제</button>
              </td>
            </tr>`;
          }).join('');

          wrapper.querySelector('#ip-total-cnt').textContent = totalCount;
          wrapper.querySelector('#ip-current-page').textContent = `${ipCurrentPage}/${totalPages}`;

          const paginationContainer = wrapper.querySelector('#ip-pagination');
          let pagHTML = `<button class="page-btn" onclick="goToIpPage(1)">&laquo;</button>`;
          for (let i = 1; i <= totalPages; i++) {
            pagHTML += `<button class="page-btn ${i === ipCurrentPage ? 'active' : ''}" onclick="goToIpPage(${i})">${i}</button>`;
          }
          pagHTML += `<button class="page-btn" onclick="goToIpPage(${totalPages})">&raquo;</button>`;
          paginationContainer.innerHTML = pagHTML;
        };

        window.goToIpPage = (page) => {
          ipCurrentPage = page;
          updateTable();
        };

        window.deleteAccessIp = (id) => {
          if (confirm('“본 접속 아이피(IP)를 삭제하면, 본 시스템에 해당 아이피(IP)로 접근이 불가합니다. 삭제하시겠습니까?”')) {
            const idx = accessIpList.findIndex(item => item.id === id);
            if (idx !== -1) {
              accessIpList.splice(idx, 1);
              alert('삭제되었습니다.');
              updateTable();
            }
          }
        };

        const presetBtns = wrapper.querySelectorAll('.date-preset-btn');
        const startInput = wrapper.querySelector('#ip-search-start-date');
        const endInput = wrapper.querySelector('#ip-search-end-date');
        const clearPresets = () => presetBtns.forEach(b => b.classList.remove('active'));
        startInput.onchange = clearPresets;
        endInput.onchange = clearPresets;

        presetBtns.forEach(btn => {
          btn.onclick = () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const preset = btn.getAttribute('data-preset');
            const endDate = new Date();
            let startDate = new Date();

            if (preset === '1d') startDate.setDate(endDate.getDate() - 1);
            else if (preset === '1w') startDate.setDate(endDate.getDate() - 7);
            else if (preset === '1m') startDate.setMonth(endDate.getMonth() - 1);
            else if (preset === '3m') startDate.setMonth(endDate.getMonth() - 3);
            else if (preset === '6m') startDate.setMonth(endDate.getMonth() - 6);
            else if (preset === '1y') startDate.setFullYear(endDate.getFullYear() - 1);

            const formatDate = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            startInput.value = formatDate(startDate);
            endInput.value = formatDate(endDate);
            ipCurrentPage = 1;
            updateTable();
          };
        });

        wrapper.querySelector('#btn-ip-search').onclick = () => {
          ipCurrentPage = 1;
          updateTable();
        };

        wrapper.querySelector('#btn-ip-reset').onclick = () => {
          startInput.value = '';
          endInput.value = '';
          clearPresets();
          wrapper.querySelector('#ip-search-key').value = '전체';
          wrapper.querySelector('#ip-search-keyword').value = '';
          ipCurrentPage = 1;
          updateTable();
        };

        wrapper.querySelector('#select-ip-page-size').onchange = (e) => {
          ipPageSize = parseInt(e.target.value);
          ipCurrentPage = 1;
          updateTable();
        };

        updateTable();
      }, 50);

      return wrapper;
    }

    window.openIpAddModal = () => {
      document.getElementById('ip-add-address').value = '';
      document.getElementById('ip-add-reason').value = '';
      document.getElementById('ip-add-modal').classList.add('open');
      document.getElementById('ip-add-overlay').classList.add('open');
    };
    window.closeIpAddModal = () => {
      document.getElementById('ip-add-modal').classList.remove('open');
      document.getElementById('ip-add-overlay').classList.remove('open');
    };
    window.submitIpAdd = () => {
      const ip = document.getElementById('ip-add-address').value.trim();
      const reason = document.getElementById('ip-add-reason').value.trim();
      if (!ip || !reason) {
        alert('필수(*) 항목을 입력해주세요.');
        return;
      }
      const today = new Date();
      const fmt = `${today.getFullYear()}. ${String(today.getMonth()+1).padStart(2,'0')}. ${String(today.getDate()).padStart(2,'0')}`;
      accessIpList.unshift({
        id: accessIpList.length + 1,
        ip: ip,
        reason: reason,
        regDate: fmt,
        regUser: '이희성'
      });
      alert('정상적으로 등록되었습니다.');
      closeIpAddModal();
      selectMenu('common-3', 'IP 목록');
    };


    /* ── 코드 관리 템플릿 (3컬럼) ── */
    function getCodeListTemplate() {
      const wrapper = document.createElement('div');

      // 소분류 mock 데이터 초기화
      const subValues = {};
      const initSubValues = () => {
        (codeList[0]?.values || []).slice(0, 5).forEach((v, vi) => {
          subValues[v.id] = [
            { id: 9000 + vi*10+1, code: v.valCode+'_A', name: v.valName+'-소분류A', order:1, useStatus:'사용(Y)', regDate:'2026. 06. 09', regUser:'이희성', editDate:'' },
            { id: 9000 + vi*10+2, code: v.valCode+'_B', name: v.valName+'-소분류B', order:2, useStatus:'중지(N)', regDate:'2026. 06. 09', regUser:'이희성', editDate:'' }
          ];
        });
      };
      initSubValues();

      let selectedTopId = codeList.length > 0 ? codeList[0].id : null;
      let selectedMidId = null;
      let topKw = '', midKw = '', subKw = '';
      let cmColType = null;
      let cmEditItem = null;

      const colH = `display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--navy);border-bottom:1px solid rgba(255,255,255,0.12);font-weight:600;font-size:13px;color:#ffffff;`;

      const buildColHtml = (cid, title, placeholder) => `
        <div style="display:flex;flex-direction:column;min-height:420px;border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden;background:var(--bg2);box-shadow:0 1px 3px rgba(15,23,42,0.05);">
          <div style="${colH}">
            <span>${title}</span>
            <span id="code-${cid}-count" class="badge" style="background:rgba(255,255,255,0.18);color:#fff;font-size:13px;margin:0;font-weight:400;">0건</span>
          </div>
          <div style="padding:8px 10px;border-bottom:1px solid var(--border);display:flex;gap:6px;">
            <input type="text" id="code-${cid}-kw" class="form-control" style="height:30px;font-size:13px;padding:0 8px;flex:1;" placeholder="${placeholder}"
              onkeydown="if(event.key==='Enter')cmSearch('${cid}')">
            <button class="btn btn-outline" style="height:30px;padding:0 8px;font-size:13px;" onclick="cmSearch('${cid}')">검색</button>
          </div>
          <div style="flex:1;overflow-y:auto;max-height:380px;">
            <table class="data-table" style="font-size:13px;">
              <thead><tr>
                <th style="text-align:center;width:36px;">No</th>
                <th>코드명</th>
                <th style="width:54px;text-align:center;">사용</th>
                <th style="width:46px;text-align:center;">삭제</th>
              </tr></thead>
              <tbody id="code-${cid}-tbody"></tbody>
            </table>
          </div>
          <div style="padding:8px 10px;border-top:1px solid var(--border);display:flex;gap:6px;justify-content:flex-end;">
            <button class="btn btn-outline" style="height:32px;padding:0 12px;font-size:13px;" onclick="cmApplyOrder('${cid}')">순서 적용</button>
            <button class="btn btn-primary" style="height:32px;padding:0 12px;font-size:13px;" onclick="cmOpenModal('${cid}',null)">등록</button>
          </div>
        </div>`;

      wrapper.innerHTML = `
        <div class="card">
          <div class="card-title">코드 목록</div>
          <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:stretch;">
            <div id="cm-top-col">${buildColHtml('top','대분류','대분류 검색')}</div>
            <div id="cm-mid-col">${buildColHtml('mid','중분류','중분류 검색')}</div>
            <div id="cm-sub-col">${buildColHtml('sub','소분류','소분류 검색')}</div>
          </div>
        </div>`;

      // ── 코드 관리 팝업 모달 ──
      const modal = document.createElement('div');
      modal.id = 'code-mgmt-modal';
      modal.className = 'manual-modal';
      modal.style.width = '480px';
      modal.style.maxWidth = '95vw';
      modal.innerHTML = `
        <div class="manual-modal-header" style="background-color:var(--navy);">
          <h3 id="cm-modal-title">코드 관리</h3>
          <button class="manual-modal-close" onclick="cmCloseModal()">×</button>
        </div>
        <div class="manual-modal-body" style="padding:20px;">
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div class="form-group">
              <label style="font-size:13px;font-weight:600;color:var(--text-label);">상위코드</label>
              <input type="text" id="cm-parent-code" class="form-control" readonly style="background:var(--bg);color:var(--text-muted);cursor:not-allowed;">
            </div>
            <div class="form-group">
              <label style="font-size:13px;font-weight:600;color:var(--text-label);">코드 <span style="">(자동 발번)</span></label>
              <input type="text" id="cm-code-val" class="form-control" readonly style="background:var(--bg);color:var(--text-muted);cursor:not-allowed;">
            </div>
            <div class="form-group">
              <label style="font-size:13px;font-weight:600;color:var(--text-label);">코드명 <span class="required">*</span></label>
              <input type="text" id="cm-name" class="form-control" placeholder="20자 이내로 작성해주세요." maxlength="20">
            </div>
            <div class="form-group">
              <label style="font-size:13px;font-weight:600;color:var(--text-label);">사용여부 <span class="required">*</span></label>
              <div class="radio-group" style="display:flex;gap:16px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="cm-status" value="사용(Y)" checked> 사용(Y)</label>
                <label class="radio-item"><input type="radio" name="cm-status" value="중지(N)"> 중지(N)</label>
              </div>
            </div>
            <div class="form-group">
              <label style="font-size:13px;font-weight:600;color:var(--text-label);">코드설명</label>
              <textarea id="cm-desc" class="form-control" style="height:68px;resize:vertical;" placeholder="코드에 대한 간략한 설명을 입력해주세요."></textarea>
            </div>
            <div style="background:var(--bg);padding:10px;border-radius:var(--radius-sm);font-size:13px;color:var(--text-muted);border:1px dashed var(--border);">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                <div>등록일시: <span id="cm-reg-date">—</span></div>
                <div>등록자: <span id="cm-reg-user">이희성</span></div>
                <div style="grid-column:1/-1;">최종수정: <span id="cm-edit-date">—</span></div>
              </div>
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px;border-top:1px solid var(--border);padding-top:14px;">
            <button class="btn btn-primary" id="cm-btn-reg" onclick="cmSave(false)">등록</button>
            <button class="btn btn-primary" id="cm-btn-upd" onclick="cmSave(true)" style="display:none;">수정</button>
            <button class="btn btn-outline" onclick="cmCloseModal()">취소</button>
          </div>
        </div>`;
      document.body.appendChild(modal);

      const overlay = document.createElement('div');
      overlay.id = 'code-mgmt-overlay';
      overlay.className = 'manual-modal-overlay';
      overlay.onclick = () => cmCloseModal();
      document.body.appendChild(overlay);

      const getTopItems = () => codeList.filter(c => !topKw || c.codeName.toLowerCase().includes(topKw) || c.code.toLowerCase().includes(topKw));
      const getMidItems = () => {
        const top = codeList.find(c => c.id === selectedTopId);
        return (top?.values || []).filter(v => !midKw || v.valName.toLowerCase().includes(midKw));
      };
      const getSubItems = () => (subValues[selectedMidId] || []).filter(v => !subKw || v.name.toLowerCase().includes(subKw));

      const renderTop = () => {
        const items = getTopItems();
        const el = wrapper.querySelector('#code-top-count');
        if (el) el.textContent = items.length + '건';
        const tbody = wrapper.querySelector('#code-top-tbody');
        if (!tbody) return;
        tbody.innerHTML = items.map((c, i) => {
          const act = c.id === selectedTopId;
          return `<tr style="${act?'background:var(--blue-lt);':''}" onclick="cmSelTop(${c.id})" class="${act?'':'pointer-row'}">
            <td style="text-align:center;">${i+1}</td>
            <td>${c.codeName}</td>
            <td style="text-align:center;"><span class="badge ${c.useStatus==='사용(Y)'?'badge-status-success':'badge-status-danger'}" style="font-size:13px;">${c.useStatus==='사용(Y)'?'Y':'N'}</span></td>
            <td style="text-align:center;"><button class="btn btn-outline" style="height:28px;padding:0 8px;font-size:13px;color:var(--red-dk);border-color:var(--red-md);" onclick="event.stopPropagation();cmDel('top',${c.id})">삭제</button></td>
          </tr>`;
        }).join('');
      };

      const renderMid = () => {
        const items = getMidItems();
        const el = wrapper.querySelector('#code-mid-count');
        if (el) el.textContent = items.length + '건';
        const tbody = wrapper.querySelector('#code-mid-tbody');
        if (!tbody) return;
        tbody.innerHTML = selectedTopId ? items.map((v, i) => {
          const act = v.id === selectedMidId;
          return `<tr style="${act?'background:var(--blue-lt);':''}" onclick="cmSelMid(${v.id})" class="${act?'':'pointer-row'}">
            <td style="text-align:center;">${i+1}</td>
            <td>${v.valName}</td>
            <td style="text-align:center;"><span class="badge ${v.useStatus==='사용(Y)'?'badge-status-success':'badge-status-danger'}" style="font-size:13px;">${v.useStatus==='사용(Y)'?'Y':'N'}</span></td>
            <td style="text-align:center;"><button class="btn btn-outline" style="height:28px;padding:0 8px;font-size:13px;color:var(--red-dk);border-color:var(--red-md);" onclick="event.stopPropagation();cmDel('mid',${v.id})">삭제</button></td>
          </tr>`;
        }).join('') : `<tr><td colspan="4" style="text-align:center;padding:24px;">대분류를 선택하세요</td></tr>`;
      };

      const renderSub = () => {
        const items = getSubItems();
        const el = wrapper.querySelector('#code-sub-count');
        if (el) el.textContent = items.length + '건';
        const tbody = wrapper.querySelector('#code-sub-tbody');
        if (!tbody) return;
        tbody.innerHTML = selectedMidId ? items.map((v, i) => {
          return `<tr>
            <td style="text-align:center;">${i+1}</td>
            <td>${v.name}</td>
            <td style="text-align:center;"><span class="badge ${v.useStatus==='사용(Y)'?'badge-status-success':'badge-status-danger'}" style="font-size:13px;">${v.useStatus==='사용(Y)'?'Y':'N'}</span></td>
            <td style="text-align:center;"><button class="btn btn-outline" style="height:28px;padding:0 8px;font-size:13px;color:var(--red-dk);border-color:var(--red-md);" onclick="cmDel('sub',${v.id})">삭제</button></td>
          </tr>`;
        }).join('') : `<tr><td colspan="4" style="text-align:center;padding:24px;">중분류를 선택하세요</td></tr>`;
      };

      const renderAll = () => { renderTop(); renderMid(); renderSub(); };

      window.cmSelTop = (id) => { selectedTopId = id; selectedMidId = null; renderAll(); };
      window.cmSelMid = (id) => { selectedMidId = id; renderAll(); };
      window.cmSearch = (colId) => {
        const inp = wrapper.querySelector(`#code-${colId}-kw`);
        if (colId==='top') topKw = inp ? inp.value.toLowerCase().trim() : '';
        else if (colId==='mid') midKw = inp ? inp.value.toLowerCase().trim() : '';
        else subKw = inp ? inp.value.toLowerCase().trim() : '';
        renderAll();
      };
      window.cmApplyOrder = (col) => alert(`[${col==='top'?'대분류':col==='mid'?'중분류':'소분류'}] 순서가 적용되었습니다.`);

      window.cmOpenModal = (colType, editItem) => {
        cmColType = colType; cmEditItem = editItem;
        const now = new Date();
        const fmtD = d => `${d.getFullYear()}. ${String(d.getMonth()+1).padStart(2,'0')}. ${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
        const fmtS = d => `${d.getFullYear()}. ${String(d.getMonth()+1).padStart(2,'0')}. ${String(d.getDate()).padStart(2,'0')}`;
        let parentTxt = '', autoCode = '';
        if (colType==='top') {
          parentTxt = '(최상위)';
          autoCode = `KepcoES${String(codeList.length+1).padStart(4,'0')} (자동 발번)`;
        } else if (colType==='mid') {
          const top = codeList.find(c => c.id===selectedTopId);
          parentTxt = top ? `${top.code} (${top.codeName})` : '';
          autoCode = top ? `${top.code}_${String((top.values||[]).length+1).padStart(3,'0')} (자동 발번)` : '';
        } else {
          const top = codeList.find(c => c.id===selectedTopId);
          const mid = (top?.values||[]).find(v => v.id===selectedMidId);
          parentTxt = mid ? `${mid.valCode} (${mid.valName})` : '';
          const subs = subValues[selectedMidId]||[];
          autoCode = mid ? `${mid.valCode}_${String(subs.length+1).padStart(3,'0')} (자동 발번)` : '';
        }
        document.getElementById('cm-modal-title').textContent = editItem ? '코드 수정' : '코드 등록';
        document.getElementById('cm-parent-code').value = parentTxt;
        document.getElementById('cm-code-val').value = editItem ? (editItem.code||editItem.valCode||'') : autoCode;
        document.getElementById('cm-name').value = editItem ? (editItem.name||editItem.valName||editItem.codeName||'') : '';
        document.getElementById('cm-desc').value = editItem ? (editItem.codeDesc||editItem.desc||'') : '';
        const yR = document.querySelector('input[name="cm-status"][value="사용(Y)"]');
        const nR = document.querySelector('input[name="cm-status"][value="중지(N)"]');
        if (yR) yR.checked = !editItem||(editItem.useStatus==='사용(Y)');
        if (nR) nR.checked = !!(editItem&&editItem.useStatus==='중지(N)');
        document.getElementById('cm-reg-date').textContent = editItem?(editItem.regDate||fmtD(now)):fmtD(now);
        document.getElementById('cm-reg-user').textContent = editItem?(editItem.regUser||'이희성'):'이희성';
        document.getElementById('cm-edit-date').textContent = editItem?(editItem.editDate||'—'):'—';
        document.getElementById('cm-btn-reg').style.display = editItem ? 'none' : '';
        document.getElementById('cm-btn-upd').style.display = editItem ? '' : 'none';
        modal.classList.add('open');
        overlay.classList.add('open');
      };

      window.cmCloseModal = () => { modal.classList.remove('open'); overlay.classList.remove('open'); };

      window.cmSave = (isEdit) => {
        const name = (document.getElementById('cm-name').value||'').trim();
        const status = document.querySelector('input[name="cm-status"]:checked')?.value || '사용(Y)';
        const desc = (document.getElementById('cm-desc').value||'').trim();
        if (!name) { alert('코드명을 입력해주세요.'); return; }
        const now = new Date();
        const fmtS = d => `${d.getFullYear()}. ${String(d.getMonth()+1).padStart(2,'0')}. ${String(d.getDate()).padStart(2,'0')}`;
        if (isEdit && cmEditItem) {
          if (cmColType==='top') { const it=codeList.find(c=>c.id===cmEditItem.id); if(it){it.codeName=name;it.useStatus=status;it.codeDesc=desc;it.editDate=`${fmtS(now)}(이희성)`;} }
          else if (cmColType==='mid') { const top=codeList.find(c=>c.id===selectedTopId); const v=(top?.values||[]).find(v=>v.id===cmEditItem.id); if(v){v.valName=name;v.useStatus=status;v.editDate=`${fmtS(now)}(이희성)`;} }
          else { const subs=subValues[selectedMidId]||[]; const v=subs.find(v=>v.id===cmEditItem.id); if(v){v.name=name;v.useStatus=status;v.editDate=`${fmtS(now)}(이희성)`;} }
          alert('수정되었습니다.');
        } else {
          if (cmColType==='top') { codeList.push({id:Date.now(),code:`KepcoES${String(codeList.length+1).padStart(4,'0')}`,codeName:name,useStatus:status,codeDesc:desc,regDate:fmtS(now),regUser:'이희성',editDate:'',values:[]}); }
          else if (cmColType==='mid') { const top=codeList.find(c=>c.id===selectedTopId); if(top){top.values.push({id:Date.now(),valCode:`${top.code}_${String(top.values.length+1).padStart(3,'0')}`,valName:name,useStatus:status,regDate:fmtS(now),regUser:'이희성',order:top.values.length+1,editDate:''});} }
          else { if(!subValues[selectedMidId]) subValues[selectedMidId]=[]; const top=codeList.find(c=>c.id===selectedTopId); const mid=(top?.values||[]).find(v=>v.id===selectedMidId); subValues[selectedMidId].push({id:Date.now(),code:`${mid?.valCode||''}_${String(subValues[selectedMidId].length+1).padStart(3,'0')}`,name,useStatus:status,regDate:fmtS(now),regUser:'이희성',order:subValues[selectedMidId].length+1,editDate:''});}
          alert('등록되었습니다.');
        }
        cmCloseModal(); renderAll();
      };

      window.cmDel = (colType, id) => {
        if (!confirm(colType==='top'?'대분류를 삭제하면 연결된 중/소분류도 모두 삭제됩니다. 삭제하시겠습니까?':'해당 코드를 삭제하시겠습니까?')) return;
        if (colType==='top') { const idx=codeList.findIndex(c=>c.id===id); if(idx!==-1){codeList.splice(idx,1);selectedTopId=codeList.length>0?codeList[0].id:null;selectedMidId=null;} }
        else if (colType==='mid') { const top=codeList.find(c=>c.id===selectedTopId); if(top){const idx=top.values.findIndex(v=>v.id===id);if(idx!==-1){top.values.splice(idx,1);selectedMidId=null;}} }
        else { const subs=subValues[selectedMidId]||[]; const idx=subs.findIndex(v=>v.id===id); if(idx!==-1) subs.splice(idx,1); }
        alert('삭제되었습니다.'); renderAll();
      };

      setTimeout(() => {
        renderAll();
        // 내비게이션 이동 시 동적 모달 정리
        const obs = new MutationObserver(() => {
          if (!document.body.contains(wrapper)) {
            if (document.body.contains(modal)) document.body.removeChild(modal);
            if (document.body.contains(overlay)) document.body.removeChild(overlay);
            obs.disconnect();
          }
        });
        if (wrapper.parentNode) obs.observe(wrapper.parentNode, {childList:true});
      }, 50);

      return wrapper;
    }
    /* ── 로그인 현황 템플릿 ── */
    function getLoginStatusTemplate() {
      const wrapper = document.createElement('div');
      
      const chartData = [
        { label: '2026.01', value: 18, actual: 1523 },
        { label: '2026.02', value: 130, actual: 1523 },
        { label: '2026.03', value: 90, actual: 1523 },
        { label: '2026.04', value: 70, actual: 1523 },
        { label: '2026.05', value: 95, actual: 1523 },
        { label: '2026.06', value: 150, actual: 1523 },
        { label: '2026.07', value: 50, actual: 1523 },
        { label: '2026.08', value: 95, actual: 1523 },
        { label: '2026.09', value: 98, actual: 1523 }
      ];

      wrapper.innerHTML = `
        <div class="card search-card">
          <div class="card-title">검색 조건</div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">기준</label>
              <div class="radio-group" style="display:flex; gap:16px; height:38px; align-items:center;">
                <label class="radio-item"><input type="radio" name="login-criteria" value="daily" onchange="toggleLoginCriteria()"> 일별</label>
                <label class="radio-item"><input type="radio" name="login-criteria" value="monthly" checked onchange="toggleLoginCriteria()"> 월별</label>
                <label class="radio-item"><input type="radio" name="login-criteria" value="yearly" onchange="toggleLoginCriteria()"> 연도별</label>
              </div>
            </div>
            <!-- 일별 -->
            <div id="criteria-daily" class="criteria-container form-group" style="display:none; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">기간(일별)</label>
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="date" id="login-day-start" class="form-control" style="width:150px;">
                <span style="">~</span>
                <input type="date" id="login-day-end" class="form-control" style="width:150px;">
              </div>
            </div>
            <!-- 월별 -->
            <div id="criteria-monthly" class="criteria-container form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">기간(월별)</label>
              <div style="display:flex; align-items:center; gap:8px;">
                <select class="form-control" style="width:100px;"><option value="2026">2026년</option><option value="2025">2025년</option></select>
                <select class="form-control" style="width:80px;"><option value="01">01월</option></select>
                <span style="">~</span>
                <select class="form-control" style="width:100px;"><option value="2026">2026년</option></select>
                <select class="form-control" style="width:80px;"><option value="09" selected>09월</option></select>
              </div>
            </div>
            <!-- 연도별 -->
            <div id="criteria-yearly" class="criteria-container form-group" style="display:none; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">기간(연도별)</label>
              <div style="display:flex; align-items:center; gap:8px;">
                <select class="form-control" style="width:120px;"><option value="2024">2024년</option></select>
                <span style="">~</span>
                <select class="form-control" style="width:120px;"><option value="2026" selected>2026년</option></select>
              </div>
            </div>
          </div>
          <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px; border-top:1px solid var(--border); padding-top:16px;">
            <button class="btn btn-primary" onclick="alert('조회되었습니다.')">조회</button>
            <button class="btn btn-outline" onclick="toggleLoginCriteria()">초기화</button>
          </div>
        </div>

        <div class="card" style="position:relative;">
          <div class="card-title">로그인 접속 추이</div>
          <div class="chart-tooltip-el" id="chart-tooltip"></div>

          <!-- 범례 -->
          <div style="display:flex; align-items:center; gap:20px; margin-bottom:18px; font-size:13px; color:var(--text-muted);">
            <div style="display:flex; align-items:center; gap:7px;">
              <svg width="30" height="12" style="flex-shrink:0; overflow:visible;">
                <line x1="2" y1="6" x2="28" y2="6" stroke="#1a4fa0" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="15" cy="6" r="4" fill="white" stroke="#1a4fa0" stroke-width="2"/>
              </svg>
              <span>월별 로그인 접속 건수</span>
            </div>
            <div style="display:flex; align-items:center; gap:7px;">
              <div style="width:8px; height:8px; border-radius:50%; background:#1a4fa0; flex-shrink:0;"></div>
              <span>포인트에 마우스를 올리면 상세 수치 확인 가능</span>
            </div>
          </div>

          <svg viewBox="0 0 1000 310" style="width:100%; height:auto; overflow:visible;">
            <defs>
              <linearGradient id="lgAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stop-color="#1a4fa0" stop-opacity="0.22"/>
                <stop offset="75%"  stop-color="#3b82f6" stop-opacity="0.06"/>
                <stop offset="100%" stop-color="#1a4fa0" stop-opacity="0"/>
              </linearGradient>
            </defs>

            <!-- Y축 선 -->
            <line x1="55" y1="32" x2="55" y2="256" stroke="#dde4ed" stroke-width="1.5"/>

            <!-- 수평 그리드 (점선) + Y 레이블 -->
            <line x1="55" y1="50"  x2="950" y2="50"  stroke="#eef2f7" stroke-width="1" stroke-dasharray="5,5"/>
            <text x="44" y="54"  font-size="13" fill="#94a3b8" text-anchor="end">150</text>

            <line x1="55" y1="117" x2="950" y2="117" stroke="#eef2f7" stroke-width="1" stroke-dasharray="5,5"/>
            <text x="44" y="121" font-size="13" fill="#94a3b8" text-anchor="end">100</text>

            <line x1="55" y1="183" x2="950" y2="183" stroke="#eef2f7" stroke-width="1" stroke-dasharray="5,5"/>
            <text x="44" y="187" font-size="13" fill="#94a3b8" text-anchor="end">50</text>

            <line x1="55" y1="250" x2="950" y2="250" stroke="#dde4ed" stroke-width="1.5"/>
            <text x="44" y="254" font-size="13" fill="#94a3b8" text-anchor="end">0</text>

            <!-- 에리어 그라디언트 -->
            <path d="M 100 226 L 200 77 L 300 130 L 400 157 L 500 123 L 600 50 L 700 183 L 800 123 L 900 119 L 900 250 L 100 250 Z"
                  fill="url(#lgAreaGrad)"/>

            <!-- 라인 -->
            <path d="M 100 226 L 200 77 L 300 130 L 400 157 L 500 123 L 600 50 L 700 183 L 800 123 L 900 119"
                  fill="none" stroke="#1a4fa0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

            <!-- 최고값 어노테이션 (2026.06) -->
            <line x1="600" y1="32" x2="600" y2="50" stroke="#1a4fa0" stroke-width="1" stroke-dasharray="3,3"/>
            <rect x="551" y="14" width="98" height="20" rx="5" fill="#1a4fa0"/>
            <text x="600" y="28" font-size="13" fill="white" text-anchor="middle" font-weight="600">최고 11,250건</text>

            <!-- 데이터 포인트 -->
            <circle cx="100" cy="226" r="5" fill="white" stroke="#1a4fa0" stroke-width="2.5" style="cursor:pointer;" onmouseover="showChartTooltip(event,'2026.01',1283)" onmouseout="hideChartTooltip()"/>
            <circle cx="200" cy="77"  r="5" fill="white" stroke="#1a4fa0" stroke-width="2.5" style="cursor:pointer;" onmouseover="showChartTooltip(event,'2026.02',9753)" onmouseout="hideChartTooltip()"/>
            <circle cx="300" cy="130" r="5" fill="white" stroke="#1a4fa0" stroke-width="2.5" style="cursor:pointer;" onmouseover="showChartTooltip(event,'2026.03',6750)" onmouseout="hideChartTooltip()"/>
            <circle cx="400" cy="157" r="5" fill="white" stroke="#1a4fa0" stroke-width="2.5" style="cursor:pointer;" onmouseover="showChartTooltip(event,'2026.04',5253)" onmouseout="hideChartTooltip()"/>
            <circle cx="500" cy="123" r="5" fill="white" stroke="#1a4fa0" stroke-width="2.5" style="cursor:pointer;" onmouseover="showChartTooltip(event,'2026.05',7125)" onmouseout="hideChartTooltip()"/>
            <!-- 최고값 포인트: 채운 원 -->
            <circle cx="600" cy="50"  r="6.5" fill="#1a4fa0" stroke="white" stroke-width="2.5" style="cursor:pointer;" onmouseover="showChartTooltip(event,'2026.06',11250)" onmouseout="hideChartTooltip()"/>
            <circle cx="700" cy="183" r="5" fill="white" stroke="#1a4fa0" stroke-width="2.5" style="cursor:pointer;" onmouseover="showChartTooltip(event,'2026.07',3750)" onmouseout="hideChartTooltip()"/>
            <circle cx="800" cy="123" r="5" fill="white" stroke="#1a4fa0" stroke-width="2.5" style="cursor:pointer;" onmouseover="showChartTooltip(event,'2026.08',7125)" onmouseout="hideChartTooltip()"/>
            <circle cx="900" cy="119" r="5" fill="white" stroke="#1a4fa0" stroke-width="2.5" style="cursor:pointer;" onmouseover="showChartTooltip(event,'2026.09',7350)" onmouseout="hideChartTooltip()"/>

            <!-- X축 레이블 -->
            <text x="100" y="278" font-size="13" fill="#94a3b8" text-anchor="middle">2026.01</text>
            <text x="200" y="278" font-size="13" fill="#94a3b8" text-anchor="middle">2026.02</text>
            <text x="300" y="278" font-size="13" fill="#94a3b8" text-anchor="middle">2026.03</text>
            <text x="400" y="278" font-size="13" fill="#94a3b8" text-anchor="middle">2026.04</text>
            <text x="500" y="278" font-size="13" fill="#94a3b8" text-anchor="middle">2026.05</text>
            <text x="600" y="278" font-size="13" fill="#1a4fa0" font-weight="600" text-anchor="middle">2026.06</text>
            <text x="700" y="278" font-size="13" fill="#94a3b8" text-anchor="middle">2026.07</text>
            <text x="800" y="278" font-size="13" fill="#94a3b8" text-anchor="middle">2026.08</text>
            <text x="900" y="278" font-size="13" fill="#94a3b8" text-anchor="middle">2026.09</text>
          </svg>
        </div>

        <div class="card">
          <div class="card-title">로그인 이력 데이터</div>
          <div style="display:flex; justify-content:flex-end; margin-bottom:14px;">
            <button class="btn btn-outline" style="height:32px; padding:0 12px; font-size:13px;" onclick="alert('전체 조회 결과 목록이 엑셀(.xlsx) 파일로 다운로드되었습니다.')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              엑셀 다운로드
            </button>
          </div>
          <div class="table-container" style="overflow-x:auto;">
            <table class="data-table">
              <thead>
                <tr id="login-table-header"></tr>
              </thead>
              <tbody id="login-table-body"></tbody>
            </table>
          </div>
        </div>`;

      setTimeout(() => {
        window.toggleLoginCriteria = () => {
          const val = document.querySelector('input[name="login-criteria"]:checked').value;
          document.querySelectorAll('.criteria-container').forEach(c => c.style.display = 'none');
          if (val === 'daily') {
            document.getElementById('criteria-daily').style.display = 'flex';
          } else if (val === 'monthly') {
            document.getElementById('criteria-monthly').style.display = 'flex';
          } else {
            document.getElementById('criteria-yearly').style.display = 'flex';
          }
        };

        window.showChartTooltip = (event, label, value) => {
          const tooltip = document.getElementById('chart-tooltip');
          tooltip.innerHTML = `로그인 횟수 (${label}) : ${value.toLocaleString()}`;
          tooltip.style.display = 'block';
          
          const rect = event.target.getBoundingClientRect();
          const cardRect = event.target.closest('.card').getBoundingClientRect();
          tooltip.style.left = `${rect.left - cardRect.left - 50}px`;
          tooltip.style.top = `${rect.top - cardRect.top - 40}px`;
        };

        window.hideChartTooltip = () => {
          document.getElementById('chart-tooltip').style.display = 'none';
        };

        const renderTableData = () => {
          const header = document.getElementById('login-table-header');
          const tbody = document.getElementById('login-table-body');
          
          const periods = ['기간', '2026.01', '2026.02', '2026.03', '2026.04', '2026.05', '2026.06', '2026.07', '2026.08', '2026.09', '2026.10'];
          
          header.innerHTML = periods.map(p => `<th>${p}</th>`).join('');
          
          tbody.innerHTML = `
            <tr>
              <td>로그인 횟수</td>
              <td>1,523</td>
              <td>1,523</td>
              <td>1,523</td>
              <td>1,523</td>
              <td>1,523</td>
              <td>1,523</td>
              <td>1,523</td>
              <td>1,523</td>
              <td>1,523</td>
              <td>1,523</td>
              <td>1,523</td>
            </tr>`;
        };

        renderTableData();
      }, 50);

      return wrapper;
    }


    /* ── 메뉴별 접속현황 템플릿 ── */
    function getMenuAccessStatusTemplate() {
      const wrapper = document.createElement('div');

      wrapper.innerHTML = `
        <div class="card">
          <div class="card-title">조회 조건</div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
              <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">조회기간 (등록일)</label>
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <div class="date-presets" style="display:flex; gap:4px; margin-right:4px;">
                  <button type="button" class="date-preset-btn" data-preset="1d">하루 전</button>
                  <button type="button" class="date-preset-btn" data-preset="1w">1주일</button>
                  <button type="button" class="date-preset-btn" data-preset="1m">1개월</button>
                  <button type="button" class="date-preset-btn" data-preset="3m">3개월</button>
                  <button type="button" class="date-preset-btn" data-preset="6m">6개월</button>
                  <button type="button" class="date-preset-btn" data-preset="1y">1년</button>
                </div>
                <input type="date" id="menu-search-start-date" class="form-control" style="width:150px;">
                <span style="">~</span>
                <input type="date" id="menu-search-end-date" class="form-control" style="width:150px;">
                <button class="btn btn-primary" onclick="alert('조회되었습니다.')">검색</button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">메뉴별 접속 현황 목록</div>
          <div style="display:flex; justify-content:flex-end; margin-bottom:14px;">
            <button class="btn btn-outline" style="height:32px; padding:0 12px; font-size:13px;" onclick="alert('전체 조회 결과 목록이 엑셀(.xlsx) 파일로 다운로드되었습니다.')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              엑셀 다운로드
            </button>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>대메뉴(1Depth)</th>
                  <th>중메뉴(2Depth)</th>
                  <th>소메뉴(3Depth)</th>
                  <th style="width:150px; text-align:right;">메뉴 접속 횟수</th>
                </tr>
              </thead>
              <tbody id="menu-access-table-body"></tbody>
            </table>
          </div>
        </div>`;

      setTimeout(() => {
        const renderTable = () => {
          const tbody = document.getElementById('menu-access-table-body');
          const rows = [
            { d1: '대메뉴(1Depth)명 #1', d2: '중메뉴(1Depth)명 #1', d3: '', count: 16528 },
            { d1: '└', d2: '중메뉴(1Depth)명 #2', d3: '', count: 16528 },
            { d1: '└', d2: '중메뉴(1Depth)명 #3', d3: '소메뉴(1Depth)명 #1', count: 16528 },
            { d1: '└ └', d2: '', d3: '소메뉴(1Depth)명 #2', count: 16528 },
            { d1: '└', d2: '중메뉴(1Depth)명 #4', d3: '', count: 16528 },
            { d1: '└', d2: '중메뉴(1Depth)명 #5', d3: '', count: 16528 },
            { d1: '대메뉴(1Depth)명 #2', d2: '중메뉴(1Depth)명 #1', d3: '', count: 16528 },
            { d1: '└', d2: '중메뉴(1Depth)명 #2', d3: '', count: 16528 },
            { d1: '└', d2: '중메뉴(1Depth)명 #3', d3: '', count: 16528 }
          ];

          tbody.innerHTML = rows.map(r => {
            const d1Align = (r.d1.includes('└')) ? 'style="text-align:left; color:var(--text-muted); font-size:13px; padding-left:24px;"' : 'style="text-align:left;"';
            const d2Align = (r.d1.includes('└ └')) ? 'style="text-align:left; color:var(--text-muted);"' : 'style="text-align:left;"';
            return `<tr>
              <td ${d1Align}>${r.d1}</td>
              <td ${d2Align}>${r.d2}</td>
              <td style="text-align:left;">${r.d3}</td>
              <td style="text-align:right;">${r.count.toLocaleString()}</td>
            </tr>`;
          }).join('');
        };

        const presetBtns = wrapper.querySelectorAll('.date-preset-btn');
        const startInput = wrapper.querySelector('#menu-search-start-date');
        const endInput = wrapper.querySelector('#menu-search-end-date');
        const clearPresets = () => presetBtns.forEach(b => b.classList.remove('active'));
        startInput.onchange = clearPresets;
        endInput.onchange = clearPresets;

        presetBtns.forEach(btn => {
          btn.onclick = () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const preset = btn.getAttribute('data-preset');
            const endDate = new Date();
            let startDate = new Date();

            if (preset === '1d') startDate.setDate(endDate.getDate() - 1);
            else if (preset === '1w') startDate.setDate(endDate.getDate() - 7);
            else if (preset === '1m') startDate.setMonth(endDate.getMonth() - 1);
            else if (preset === '3m') startDate.setMonth(endDate.getMonth() - 3);
            else if (preset === '6m') startDate.setMonth(endDate.getMonth() - 6);
            else if (preset === '1y') startDate.setFullYear(endDate.getFullYear() - 1);

            const formatDate = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            startInput.value = formatDate(startDate);
            endInput.value = formatDate(endDate);
          };
        });

        renderTable();
      }, 50);

      return wrapper;
    }

    /* ── 협력업체 관리 - 목록 ── */
    function getPartnerListTemplate() {
      const wrapper = document.createElement('div');

      wrapper.innerHTML = `
        <div class="card search-card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
            <div class="card-title" style="margin:0;">검색 조건</div>
            <span class="badge" style="background:var(--amber-lt);color:var(--amber-dk);border:1px solid var(--amber-md);font-size:13px;padding:3px 10px;">ERP 연동 필요</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div class="form-group" style="display:flex;flex-direction:row;align-items:center;gap:12px;">
              <label style="width:130px;flex-shrink:0;font-weight:600;font-size:14px;color:var(--text-label);margin:0;">조회기간 (등록일)</label>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <div class="date-presets" style="display:flex;gap:4px;margin-right:4px;">
                  <button type="button" class="date-preset-btn" data-preset="1m">1개월</button>
                  <button type="button" class="date-preset-btn" data-preset="3m">3개월</button>
                  <button type="button" class="date-preset-btn active" data-preset="6m">6개월</button>
                  <button type="button" class="date-preset-btn" data-preset="1y">1년</button>
                </div>
                <input type="date" id="pt-start" class="form-control" style="width:150px;" value="2026-01-01">
                <span style="">~</span>
                <input type="date" id="pt-end" class="form-control" style="width:150px;" value="2026-06-30">
              </div>
            </div>
            <div class="form-group" style="display:flex;flex-direction:row;align-items:center;gap:12px;">
              <label style="width:130px;flex-shrink:0;font-weight:600;font-size:14px;color:var(--text-label);margin:0;">휴폐업구분</label>
              <div class="radio-group" style="display:flex;gap:16px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="pt-status" value="전체" checked> 전체</label>
                <label class="radio-item"><input type="radio" name="pt-status" value="정상"> 정상</label>
                <label class="radio-item"><input type="radio" name="pt-status" value="중지"> 중지</label>
                <label class="radio-item"><input type="radio" name="pt-status" value="폐업"> 폐업</label>
              </div>
            </div>
            <div class="form-group" style="display:flex;flex-direction:row;align-items:center;gap:12px;">
              <label style="width:130px;flex-shrink:0;font-weight:600;font-size:14px;color:var(--text-label);margin:0;">키워드 검색</label>
              <div style="display:flex;gap:8px;width:500px;max-width:100%;">
                <select id="pt-key" class="form-control" style="width:140px;flex-shrink:0;">
                  <option value="전체">전체</option>
                  <option value="거래처명">거래처명</option>
                  <option value="거래처코드">거래처코드</option>
                  <option value="사업자등록번호">사업자등록번호</option>
                  <option value="대표자명">대표자명</option>
                  <option value="거래담당자">거래담당자</option>
                </select>
                <input type="text" id="pt-kw" class="form-control" style="flex:1;" placeholder="검색어를 입력하세요.">
              </div>
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px;border-top:1px solid var(--border);padding-top:16px;">
            <button class="btn btn-primary" id="pt-btn-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              검색
            </button>
            <button class="btn btn-outline" id="pt-btn-reset">초기화</button>
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin:0;">협력업체 목록</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
            <div style="font-size:13px; color:var(--text-muted);">전체 <strong id="pt-total" style="color:var(--blue);">0</strong>건 &nbsp;|&nbsp; 현재 <strong id="pt-current-page" style="color:var(--text);">1/1</strong> 페이지</div>
            <div style="display:flex;gap:8px;align-items:center;">
              <select id="pt-page-size" class="form-control" style="width:110px;height:32px;font-size:13px;padding:0 8px;margin:0;">
                <option value="10">10개씩</option>
                <option value="20">20개씩</option>
                <option value="50">50개씩</option>
              </select>
              <button class="btn btn-outline" style="height:32px; padding:0 12px; font-size:13px;" onclick="alert('전체 조회 결과 목록이 엑셀(.xlsx) 파일로 다운로드되었습니다.')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                엑셀 다운로드
              </button>
            </div>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:50px;text-align:center;">No</th>
                  <th>거래처코드</th>
                  <th>거래처명</th>
                  <th>사업자등록번호</th>
                  <th>대표자명</th>
                  <th>거래담당자</th>
                  <th style="width:80px;text-align:center;">휴폐업구분</th>
                  <th>등록일</th>
                  <th>등록자</th>
                  <th style="width:80px;text-align:center;">상세정보</th>
                  <th>최종수정</th>
                </tr>
              </thead>
              <tbody id="pt-tbody"></tbody>
            </table>
          </div>
          <div class="table-footer" style="margin-top:16px;border-top:1px solid var(--border);padding-top:14px;">
            <div></div>
            <div class="pagination" id="pt-pagination"></div>
            <div></div>
          </div>
        </div>`;

      setTimeout(() => {
        let pageSize = 10, curPage = 1;

        const statusBadge = (s) => {
          const cls = s==='정상'?'badge-status-success':s==='중지'?'badge-status-warning':'badge-status-danger';
          return `<span class="badge ${cls}">${s}</span>`;
        };

        const updateTable = () => {
          const key = wrapper.querySelector('#pt-key').value;
          const kw = wrapper.querySelector('#pt-kw').value.toLowerCase().trim();
          const statusVal = wrapper.querySelector('input[name="pt-status"]:checked').value;
          const filtered = partnerList.filter(p => {
            if (statusVal !== '전체' && p.status !== statusVal) return false;
            if (kw) {
              if (key==='전체') return Object.values(p).some(v=>String(v).toLowerCase().includes(kw));
              if (key==='거래처명') return p.name.toLowerCase().includes(kw);
              if (key==='거래처코드') return p.code.toLowerCase().includes(kw);
              if (key==='사업자등록번호') return p.bizNo.includes(kw);
              if (key==='대표자명') return p.ceo.toLowerCase().includes(kw);
              if (key==='거래담당자') return p.manager.toLowerCase().includes(kw);
            }
            return true;
          });
          const total = filtered.length, pages = Math.ceil(total/pageSize)||1;
          if (curPage > pages) curPage = pages;
          const start = (curPage-1)*pageSize;
          const paged = filtered.slice(start, start+pageSize);
          wrapper.querySelector('#pt-total').textContent = total;
          wrapper.querySelector('#pt-current-page').textContent = `${curPage}/${pages}`;
          wrapper.querySelector('#pt-tbody').innerHTML = paged.map((p, i) => `<tr>
            <td style="text-align:center;">${start+i+1}</td>
            <td style="font-family:monospace;">${p.code}</td>
            <td>${p.name}</td>
            <td style="">${p.bizNo}</td>
            <td>${p.ceo}</td>
            <td>${p.manager}(${p.managerEmail})</td>
            <td style="text-align:center;">${statusBadge(p.status)}</td>
            <td style="">${p.regDate}</td>
            <td>${p.regUser}</td>
            <td style="text-align:center;"><button class="btn btn-outline" style="height:28px;padding:0 8px;font-size:13px;" onclick="openPartnerDetail(${p.id})">상세보기</button></td>
            <td style="">${p.editDate||'—'}</td>
          </tr>`).join('');

          const pag = wrapper.querySelector('#pt-pagination');
          let h = `<button class="page-btn" onclick="ptGoPage(1)">&laquo;</button>`;
          for (let i=1; i<=pages; i++) h += `<button class="page-btn ${i===curPage?'active':''}" onclick="ptGoPage(${i})">${i}</button>`;
          h += `<button class="page-btn" onclick="ptGoPage(${pages})">&raquo;</button>`;
          pag.innerHTML = h;
        };

        window.ptGoPage = (p) => { curPage=p; updateTable(); };
        window.openPartnerDetail = (id) => { selectedPartnerId=id; if(window.partnerShowDetail) window.partnerShowDetail(); };

        const presetBtns = wrapper.querySelectorAll('.date-preset-btn');
        presetBtns.forEach(btn => {
          btn.onclick = () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const preset = btn.getAttribute('data-preset');
            const e = new Date(), s = new Date();
            if (preset==='1m') s.setMonth(e.getMonth()-1);
            else if (preset==='3m') s.setMonth(e.getMonth()-3);
            else if (preset==='6m') s.setMonth(e.getMonth()-6);
            else s.setFullYear(e.getFullYear()-1);
            const fmt = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            wrapper.querySelector('#pt-start').value = fmt(s);
            wrapper.querySelector('#pt-end').value = fmt(e);
          };
        });
        wrapper.querySelector('#pt-btn-search').onclick = () => { curPage=1; updateTable(); };
        wrapper.querySelector('#pt-btn-reset').onclick = () => {
          wrapper.querySelector('#pt-kw').value = '';
          wrapper.querySelector('input[name="pt-status"][value="전체"]').checked = true;
          presetBtns.forEach(b => b.classList.remove('active'));
          curPage=1; updateTable();
        };
        wrapper.querySelector('#pt-page-size').onchange = e => { pageSize=parseInt(e.target.value); curPage=1; updateTable(); };
        updateTable();
      }, 50);

      return wrapper;
    }

    /* ── 협력업체 관리 - 상세 ── */
    function getPartnerDetailTemplate() {
      const p = partnerList.find(x => x.id === selectedPartnerId) || partnerList[0];
      const wrapper = document.createElement('div');
      const statusBadge = (s) => { const cls=s==='정상'?'badge-status-success':s==='중지'?'badge-status-warning':'badge-status-danger'; return `<span class="badge ${cls}">${s}</span>`; };
      const roStyle = `background:var(--bg);color:var(--text-muted);cursor:not-allowed;`;

      wrapper.innerHTML = `
        <div class="card" style="margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
            <div class="card-title" style="margin:0;">ERP 기본정보</div>
            <span class="badge" style="background:var(--amber-lt);color:var(--amber-dk);border:1px solid var(--amber-md);font-size:13px;">ERP 연동 (읽기전용)</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">거래처코드</label>
              <input class="form-control" readonly style="${roStyle}" value="${p.code}"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">거래처명</label>
              <input class="form-control" readonly style="${roStyle}" value="${p.name}"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">사업자등록번호</label>
              <input class="form-control" readonly style="${roStyle}" value="${p.bizNo}"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">대표자명</label>
              <input class="form-control" readonly style="${roStyle}" value="${p.ceo}"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">주소</label>
              <input class="form-control" readonly style="${roStyle}" value="${p.address}"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">거래담당자</label>
              <input class="form-control" readonly style="${roStyle}" value="${p.manager} (${p.managerEmail} / ${p.managerTel})"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">휴폐업구분</label>
              <div style="height:38px;display:flex;align-items:center;">${statusBadge(p.status)}</div></div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">PMS 추가정보</div>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">신용등급</label>
              <select id="pd-credit" class="form-control">
                ${['AAA','AA+','AA','AA-','A+','A','A-','BBB+','BBB','BBB-','BB','B','CCC','CC','C','D'].map(g=>`<option${g===p.creditGrade?' selected':''}>${g}</option>`).join('')}
              </select>
            </div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">부채비율</label>
              <input type="text" id="pd-debt" class="form-control" value="${p.debtRatio}" placeholder="예: 45.2%"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">기업매출 (당해년도)</label>
              <input type="text" id="pd-sales1" class="form-control" value="${p.sales1}" placeholder="예: 120억"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">기업매출 (전년도)</label>
              <input type="text" id="pd-sales2" class="form-control" value="${p.sales2}" placeholder="예: 98억"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">기업매출 (전전년도)</label>
              <input type="text" id="pd-sales3" class="form-control" value="${p.sales3}" placeholder="예: 85억"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">시공경험 3년 누계</label>
              <input type="text" id="pd-constexp" class="form-control" value="${p.constExp}" placeholder="예: 230억"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">상시근로자수</label>
              <input type="number" id="pd-workers" class="form-control" value="${p.workers}" placeholder="예: 15"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">연대보증</label>
              <div class="radio-group" style="display:flex;gap:16px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="pd-guarantee" value="있음"${p.guarantee==='있음'?' checked':''}> 있음</label>
                <label class="radio-item"><input type="radio" name="pd-guarantee" value="없음"${p.guarantee==='없음'?' checked':''}> 없음</label>
              </div>
            </div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">신인도(ISO 인증)</label>
              <div class="radio-group" style="display:flex;gap:16px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="pd-credit-iso" value="있음"${p.creditISO==='있음'?' checked':''}> 있음</label>
                <label class="radio-item"><input type="radio" name="pd-credit-iso" value="없음"${p.creditISO==='없음'?' checked':''}> 없음</label>
              </div>
            </div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">보증구분</label>
              <select id="pd-gtype" class="form-control">
                ${['이행보증금','공공기관','기타'].map(t=>`<option${t===p.guaranteeType?' selected':''}>${t}</option>`).join('')}
              </select>
            </div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">보증내역</label>
              <input type="text" id="pd-gdetail" class="form-control" value="${p.guaranteeDetail}" placeholder="예: 지급보증보험 100%"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">에너지사용자 소재지 (시/도)</label>
              <select id="pd-loc" class="form-control">
                ${['서울특별시','부산광역시','대구광역시','인천광역시','광주광역시','대전광역시','울산광역시','세종특별자치시','경기도','강원도','충청북도','충청남도','전라북도','전라남도','경상북도','경상남도','제주특별자치도'].map(l=>`<option${l===p.location?' selected':''}>${l}</option>`).join('')}
              </select>
            </div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">세부 주소 (시/군/구)</label>
              <input type="text" id="pd-locdetail" class="form-control" value="${p.locationDetail}" placeholder="예: 송파구"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">에너지 담당자명</label>
              <input type="text" id="pd-emgr" class="form-control" value="${p.energyManager}" placeholder="담당자 성함"></div>
            <div class="form-group"><label style="font-size:13px;font-weight:600;color:var(--text-label);">연락처</label>
              <input type="text" id="pd-contact" class="form-control" value="${p.contact}" placeholder="010-0000-0000"></div>
          </div>
          <div style="background:var(--bg);padding:10px 14px;border-radius:var(--radius-sm);border:1px dashed var(--border);font-size:13px;color:var(--text-muted);margin-top:14px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
            <div>등록일시: <strong>${p.regDate}</strong></div>
            <div>등록자: <strong>${p.regUser}</strong></div>
            <div>최종수정: <strong>${p.editDate||'—'}</strong></div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px;border-top:1px solid var(--border);padding-top:16px;">
            <button class="btn btn-outline" onclick="partnerShowList&&partnerShowList()">목록</button>
            <button class="btn btn-primary" id="pd-btn-save">수정 저장</button>
          </div>
        </div>`;

      setTimeout(() => {
        wrapper.querySelector('#pd-btn-save').onclick = () => {
          const idx = partnerList.findIndex(x => x.id === p.id);
          if (idx === -1) return;
          const now = new Date();
          const fmtS = d => `${d.getFullYear()}. ${String(d.getMonth()+1).padStart(2,'0')}. ${String(d.getDate()).padStart(2,'0')}`;
          partnerList[idx] = {
            ...partnerList[idx],
            creditGrade: wrapper.querySelector('#pd-credit').value,
            debtRatio: wrapper.querySelector('#pd-debt').value,
            sales1: wrapper.querySelector('#pd-sales1').value,
            sales2: wrapper.querySelector('#pd-sales2').value,
            sales3: wrapper.querySelector('#pd-sales3').value,
            constExp: wrapper.querySelector('#pd-constexp').value,
            workers: parseInt(wrapper.querySelector('#pd-workers').value)||0,
            guarantee: wrapper.querySelector('input[name="pd-guarantee"]:checked')?.value||'없음',
            creditISO: wrapper.querySelector('input[name="pd-credit-iso"]:checked')?.value||'없음',
            guaranteeType: wrapper.querySelector('#pd-gtype').value,
            guaranteeDetail: wrapper.querySelector('#pd-gdetail').value,
            location: wrapper.querySelector('#pd-loc').value,
            locationDetail: wrapper.querySelector('#pd-locdetail').value,
            energyManager: wrapper.querySelector('#pd-emgr').value,
            contact: wrapper.querySelector('#pd-contact').value,
            editDate: `${fmtS(now)}(이희성)`
          };
          alert('협력업체 PMS 추가정보가 저장되었습니다.');
          if(window.partnerShowList) window.partnerShowList();
        };
      }, 50);

      return wrapper;
    }

    /* ── 공지사항 관리 - 목록 ── */
    function getNoticeListTemplate() {
      const wrapper = document.createElement('div');

      // 상세보기 모달 생성 (동적)
      const detailModal = document.createElement('div');
      detailModal.id = 'notice-detail-modal';
      detailModal.className = 'manual-modal';
      detailModal.style.width = '720px';
      detailModal.style.maxWidth = '95vw';
      detailModal.innerHTML = `
        <div class="manual-modal-header" style="background-color:var(--navy);">
          <h3>공지사항 상세</h3>
          <button class="manual-modal-close" onclick="ntCloseDetail()">×</button>
        </div>
        <div class="manual-modal-body" style="padding:20px;max-height:70vh;overflow-y:auto;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border);">
            <div><span style="">게시대상</span><div id="ntd-target" style="font-weight:700;color:var(--navy);margin-top:4px;"></div></div>
            <div><span style="">우선노출</span><div id="ntd-pinned" style="font-weight:700;margin-top:4px;"></div></div>
            <div><span style="">게시여부</span><div id="ntd-status" style="font-weight:700;margin-top:4px;"></div></div>
            <div style="grid-column:1/-1;"><span style="">제목</span><div id="ntd-title" style="font-size:16px;font-weight:700;color:var(--navy);margin-top:4px;"></div></div>
            <div><span style="">게시기간</span><div id="ntd-period" style="margin-top:4px;"></div></div>
            <div><span style="">작성자</span><div id="ntd-author" style="margin-top:4px;"></div></div>
            <div><span style="">조회수</span><div id="ntd-views" style="margin-top:4px;"></div></div>
          </div>
          <div style="margin-bottom:16px;">
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px;">내용</div>
            <div id="ntd-content" style="min-height:100px;background:var(--bg);padding:14px;border-radius:var(--radius-sm);border:1px solid var(--border);font-size:14px;line-height:1.7;white-space:pre-wrap;"></div>
          </div>
          <div id="ntd-files-wrap" style="display:none;">
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px;">첨부파일</div>
            <div id="ntd-files" style="display:flex;flex-direction:column;gap:6px;"></div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px;border-top:1px solid var(--border);padding-top:14px;">
            <button class="btn btn-outline" onclick="ntCloseDetail()">목록</button>
            <button class="btn btn-primary" onclick="ntOpenEdit()">수정</button>
            <button class="btn btn-outline" style="color:var(--red-dk);border-color:var(--red-md);" onclick="ntDeleteFromDetail()">삭제</button>
          </div>
        </div>`;
      document.body.appendChild(detailModal);

      const detailOverlay = document.createElement('div');
      detailOverlay.id = 'notice-detail-overlay';
      detailOverlay.className = 'manual-modal-overlay';
      detailOverlay.onclick = () => ntCloseDetail();
      document.body.appendChild(detailOverlay);

      window.ntCloseDetail = () => {
        detailModal.classList.remove('open');
        detailOverlay.classList.remove('open');
      };
      window.ntOpenDetail = (id) => {
        const n = noticeList.find(x => x.id===id);
        if (!n) return;
        selectedNoticeId = id;
        n.views = (n.views||0) + 1;
        document.getElementById('ntd-target').textContent = n.target;
        document.getElementById('ntd-pinned').innerHTML = n.pinned==='Y'?`<span class="badge badge-status-warning" style="font-size:13px;">우선노출</span>`:'—';
        document.getElementById('ntd-status').innerHTML = n.postStatus==='게시'?`<span class="badge badge-status-success">게시</span>`:`<span class="badge badge-status-secondary">미게시</span>`;
        document.getElementById('ntd-title').textContent = n.title;
        document.getElementById('ntd-period').textContent = n.period;
        document.getElementById('ntd-author').textContent = n.author;
        document.getElementById('ntd-views').textContent = n.views.toLocaleString()+'회';
        document.getElementById('ntd-content').textContent = n.content || '(내용이 없습니다.)';
        const fw = document.getElementById('ntd-files-wrap');
        const fd = document.getElementById('ntd-files');
        if (n.files && n.files.length > 0) {
          fw.style.display='';
          fd.innerHTML = n.files.map(f=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:13px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span style="flex:1;">${f}</span>
            <button class="btn btn-outline" style="height:28px;padding:0 8px;font-size:13px;" onclick="alert('파일을 미리봅니다: ${f}')">바로보기</button>
            <button class="btn btn-outline" style="height:28px;padding:0 8px;font-size:13px;" onclick="alert('파일을 다운로드합니다: ${f}')">다운로드</button>
          </div>`).join('');
        } else fw.style.display = 'none';
        updateTable();
        detailModal.classList.add('open');
        detailOverlay.classList.add('open');
      };
      window.ntOpenEdit = () => {
        ntCloseDetail();
        noticeEditMode = true;
        if(window.ntShowRegister) window.ntShowRegister();
      };
      window.ntDeleteFromDetail = () => {
        const n = noticeList.find(x => x.id===selectedNoticeId);
        if (!n) return;
        if (!confirm(`"${n.title}"\n\n해당 공지사항을 삭제하시겠습니까?`)) return;
        const idx = noticeList.findIndex(x => x.id===selectedNoticeId);
        if (idx !== -1) noticeList.splice(idx, 1);
        ntCloseDetail();
        alert('삭제되었습니다.');
        updateTable();
      };

      wrapper.innerHTML = `
        <div class="card search-card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
            <div class="card-title" style="margin:0;">검색 조건</div>
            <span class="badge" style="background:var(--amber-lt);color:var(--amber-dk);border:1px solid var(--amber-md);font-size:13px;padding:3px 10px;">ERP 연동 필요</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div class="form-group" style="display:flex;flex-direction:row;align-items:center;gap:12px;">
              <label style="width:130px;flex-shrink:0;font-weight:600;font-size:14px;color:var(--text-label);margin:0;">조회기간</label>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <div class="date-presets" style="display:flex;gap:4px;margin-right:4px;">
                  <button type="button" class="date-preset-btn" data-preset="1m">1개월</button>
                  <button type="button" class="date-preset-btn" data-preset="3m">3개월</button>
                  <button type="button" class="date-preset-btn active" data-preset="6m">6개월</button>
                  <button type="button" class="date-preset-btn" data-preset="1y">1년</button>
                </div>
                <input type="date" id="nt-start" class="form-control" style="width:150px;" value="2026-01-01">
                <span style="">~</span>
                <input type="date" id="nt-end" class="form-control" style="width:150px;" value="2026-06-30">
              </div>
            </div>
            <div class="form-group" style="display:flex;flex-direction:row;align-items:center;gap:12px;">
              <label style="width:130px;flex-shrink:0;font-weight:600;font-size:14px;color:var(--text-label);margin:0;">게시여부</label>
              <div class="radio-group" style="display:flex;gap:16px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="nt-post-status" value="전체" checked> 전체</label>
                <label class="radio-item"><input type="radio" name="nt-post-status" value="게시"> 게시</label>
                <label class="radio-item"><input type="radio" name="nt-post-status" value="미게시"> 미게시</label>
              </div>
            </div>
            <div class="form-group" style="display:flex;flex-direction:row;align-items:center;gap:12px;">
              <label style="width:130px;flex-shrink:0;font-weight:600;font-size:14px;color:var(--text-label);margin:0;">키워드 검색</label>
              <div style="display:flex;gap:8px;width:500px;max-width:100%;">
                <select id="nt-key" class="form-control" style="width:130px;flex-shrink:0;">
                  <option value="전체">전체</option>
                  <option value="제목">제목</option>
                  <option value="작성자">작성자</option>
                  <option value="게시대상">게시대상</option>
                </select>
                <input type="text" id="nt-kw" class="form-control" style="flex:1;" placeholder="검색어를 입력하세요.">
              </div>
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px;border-top:1px solid var(--border);padding-top:16px;">
            <button class="btn btn-primary" id="nt-btn-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> 검색
            </button>
            <button class="btn btn-outline" id="nt-btn-reset">초기화</button>
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin:0;">공지사항 목록</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
            <div style="font-size:13px; color:var(--text-muted);">전체 <strong id="nt-total" style="color:var(--blue);">0</strong>건 &nbsp;|&nbsp; 현재 <strong id="nt-current-page" style="color:var(--text);">1/1</strong> 페이지</div>
            <button class="btn btn-primary" onclick="ntOpenRegister()" style="height:32px;padding:0 14px;font-size:13px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              등록
            </button>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:50px;text-align:center;">No</th>
                  <th style="width:70px;text-align:center;">게시구분</th>
                  <th style="width:70px;text-align:center;">우선노출</th>
                  <th>제목</th>
                  <th>게시기간</th>
                  <th style="width:80px;">작성자</th>
                  <th style="width:90px;">등록일</th>
                  <th style="width:70px;text-align:center;">게시여부</th>
                  <th style="width:70px;text-align:right;">조회수</th>
                </tr>
              </thead>
              <tbody id="nt-tbody"></tbody>
            </table>
          </div>
          <div class="table-footer" style="margin-top:20px; border-top:1px solid var(--border); padding-top:14px;"><div></div><div class="pagination" id="nt-pagination"></div><div></div></div>
        </div>`;

      let ntCurrentPage = 1;
      const ntPageSize = 10;
      const updateTable = window.ntUpdateTable = () => {
        const key = wrapper.querySelector('#nt-key').value;
        const kw = wrapper.querySelector('#nt-kw').value.toLowerCase().trim();
        const postStatus = wrapper.querySelector('input[name="nt-post-status"]:checked').value;
        const filtered = noticeList.filter(n => {
          if (postStatus !== '전체' && n.postStatus !== postStatus) return false;
          if (kw) {
            if (key==='전체') return n.title.toLowerCase().includes(kw)||n.author.toLowerCase().includes(kw)||n.target.toLowerCase().includes(kw);
            if (key==='제목') return n.title.toLowerCase().includes(kw);
            if (key==='작성자') return n.author.toLowerCase().includes(kw);
            if (key==='게시대상') return n.target.toLowerCase().includes(kw);
          }
          return true;
        });
        const ntTotal = filtered.length, ntPages = Math.ceil(ntTotal/ntPageSize)||1;
        if (ntCurrentPage > ntPages) ntCurrentPage = ntPages;
        const ntStart = (ntCurrentPage-1)*ntPageSize;
        const ntPaged = filtered.slice(ntStart, ntStart+ntPageSize);
        wrapper.querySelector('#nt-total').textContent = ntTotal;
        wrapper.querySelector('#nt-current-page').textContent = `${ntCurrentPage}/${ntPages}`;
        const tbody = wrapper.querySelector('#nt-tbody');
        tbody.innerHTML = ntPaged.map((n, i) => `<tr>
          <td style="text-align:center;">${ntStart+i+1}</td>
          <td style="text-align:center;"><span class="badge badge-status-secondary" style="font-size:13px;">${n.target}</span></td>
          <td style="text-align:center;">${n.pinned==='Y'?'<span class="badge badge-status-warning" style="font-size:13px;">Y</span>':'—'}</td>
          <td style="text-align:left;"><a href="#" style="color:inherit;text-decoration:none;" onclick="event.preventDefault();ntOpenDetail(${n.id})">${n.title}</a></td>
          <td style="">${n.period}</td>
          <td>${n.author}</td>
          <td style="">${n.regDate}</td>
          <td style="text-align:center;">${n.postStatus==='게시'?'<span class="badge badge-status-success" style="font-size:13px;">게시</span>':'<span class="badge badge-status-secondary" style="font-size:13px;">미게시</span>'}</td>
          <td style="text-align:right;">${n.views.toLocaleString()}</td>
        </tr>`).join('');
        const pag = wrapper.querySelector('#nt-pagination');
        pag.innerHTML = Array.from({length: ntPages}, (_, j) => `<button class="page-btn ${j+1===ntCurrentPage?'active':''}" data-page="${j+1}">${j+1}</button>`).join('');
        pag.querySelectorAll('.page-btn').forEach(b => b.onclick = () => { ntCurrentPage = Number(b.dataset.page); updateTable(); });
      };

      window.ntOpenRegister = () => { noticeEditMode = false; selectedNoticeId = null; if(window.ntShowRegister) window.ntShowRegister(); };

      setTimeout(() => {
        const presetBtns = wrapper.querySelectorAll('.date-preset-btn');
        presetBtns.forEach(btn => {
          btn.onclick = () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const preset = btn.getAttribute('data-preset');
            const e = new Date(), s = new Date();
            if (preset==='1m') s.setMonth(e.getMonth()-1);
            else if (preset==='3m') s.setMonth(e.getMonth()-3);
            else if (preset==='6m') s.setMonth(e.getMonth()-6);
            else s.setFullYear(e.getFullYear()-1);
            const fmt = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            wrapper.querySelector('#nt-start').value = fmt(s);
            wrapper.querySelector('#nt-end').value = fmt(e);
          };
        });
        wrapper.querySelector('#nt-btn-search').onclick = () => { ntCurrentPage = 1; updateTable(); };
        wrapper.querySelector('#nt-btn-reset').onclick = () => {
          wrapper.querySelector('#nt-kw').value = '';
          wrapper.querySelector('input[name="nt-post-status"][value="전체"]').checked = true;
          ntCurrentPage = 1;
          updateTable();
        };
        updateTable();
        // 클린업
        const obs = new MutationObserver(() => {
          if (!document.body.contains(wrapper)) {
            if (document.body.contains(detailModal)) document.body.removeChild(detailModal);
            if (document.body.contains(detailOverlay)) document.body.removeChild(detailOverlay);
            obs.disconnect();
          }
        });
        if (wrapper.parentNode) obs.observe(wrapper.parentNode, {childList:true});
      }, 50);

      return wrapper;
    }

    /* ── 공지사항 관리 - 등록/수정 ── */
    function getNoticeRegisterTemplate() {
      const n = noticeEditMode && selectedNoticeId ? noticeList.find(x => x.id===selectedNoticeId) : null;
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="card">
          <div class="card-title">${n ? '공지사항 수정' : '공지사항 등록'}</div>
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">게시대상 <span class="required">*</span></label>
              <div class="radio-group" style="display:flex;gap:20px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="ntr-target" value="전체"${!n||n.target==='전체'?' checked':''}> 전체</label>
                <label class="radio-item"><input type="radio" name="ntr-target" value="내부"${n&&n.target==='내부'?' checked':''}> 내부</label>
                <label class="radio-item"><input type="radio" name="ntr-target" value="외부"${n&&n.target==='외부'?' checked':''}> 외부</label>
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">우선노출 <span class="required">*</span></label>
              <div class="radio-group" style="display:flex;gap:20px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="ntr-pinned" value="Y"${n&&n.pinned==='Y'?' checked':''}> 예</label>
                <label class="radio-item"><input type="radio" name="ntr-pinned" value="N"${!n||n.pinned==='N'?' checked':''}> 아니오</label>
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">제목 <span class="required">*</span></label>
              <input type="text" id="ntr-title" class="form-control" placeholder="제목을 입력해주세요." value="${n?n.title:''}">
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">게시기간 <span class="required">*</span></label>
              <div style="display:flex;gap:12px;align-items:center;">
                <label class="radio-item"><input type="radio" name="ntr-period-type" value="무관"${!n||n.period==='무관'?' checked':''} onchange="toggleNtPeriod()"> 무관</label>
                <label class="radio-item"><input type="radio" name="ntr-period-type" value="기간설정"${n&&n.period!=='무관'?' checked':''} onchange="toggleNtPeriod()"> 기간 설정</label>
                <div id="ntr-period-range" style="${n&&n.period!=='무관'?'':'display:none;'}display:flex;align-items:center;gap:8px;">
                  <input type="date" id="ntr-period-start" class="form-control" style="width:150px;" value="${n&&n.period!=='무관'?n.period.split('~')[0]:''}">
                  <span style="">~</span>
                  <input type="date" id="ntr-period-end" class="form-control" style="width:150px;" value="${n&&n.period!=='무관'?n.period.split('~')[1]||'':''}">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">게시여부 <span class="required">*</span></label>
              <div class="radio-group" style="display:flex;gap:20px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="ntr-post-status" value="게시"${!n||n.postStatus==='게시'?' checked':''}> 게시</label>
                <label class="radio-item"><input type="radio" name="ntr-post-status" value="미게시"${n&&n.postStatus==='미게시'?' checked':''}> 미게시</label>
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">작성자</label>
              <input type="text" class="form-control" value="${n?n.author:'이희성'}" readonly style="width:200px;background:var(--bg);color:var(--text-muted);cursor:not-allowed;">
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">내용</label>
              <div class="nt-editor-wrap">
                <div class="nt-editor-toolbar" id="ntr-toolbar">
                  <button type="button" class="nt-tool-btn" data-cmd="bold" title="굵게"><b>B</b></button>
                  <button type="button" class="nt-tool-btn" data-cmd="italic" title="기울임"><i>I</i></button>
                  <button type="button" class="nt-tool-btn" data-cmd="underline" title="밑줄"><u>U</u></button>
                  <button type="button" class="nt-tool-btn" data-cmd="strikeThrough" title="취소선"><s>S</s></button>
                  <div class="nt-tool-sep"></div>
                  <select class="nt-tool-select" id="ntr-font-size" title="글자 크기">
                    <option value="2">작게</option>
                    <option value="3" selected>보통</option>
                    <option value="5">크게</option>
                    <option value="6">아주 크게</option>
                  </select>
                  <div class="nt-tool-sep"></div>
                  <button type="button" class="nt-tool-btn" data-cmd="insertUnorderedList" title="글머리 기호 목록">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  </button>
                  <button type="button" class="nt-tool-btn" data-cmd="insertOrderedList" title="번호 목록">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
                  </button>
                  <div class="nt-tool-sep"></div>
                  <button type="button" class="nt-tool-btn" data-cmd="justifyLeft" title="왼쪽 정렬">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
                  </button>
                  <button type="button" class="nt-tool-btn" data-cmd="justifyCenter" title="가운데 정렬">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="12" x2="7" y2="12"/><line x1="19" y1="18" x2="5" y2="18"/></svg>
                  </button>
                  <button type="button" class="nt-tool-btn" data-cmd="justifyRight" title="오른쪽 정렬">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="9" y2="12"/><line x1="21" y1="18" x2="7" y2="18"/></svg>
                  </button>
                  <div class="nt-tool-sep"></div>
                  <button type="button" class="nt-tool-btn" data-cmd="removeFormat" title="서식 지우기">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M5 20h6"/><path d="M13 4l-4 16"/><line x1="17" y1="10" x2="22" y2="15"/><line x1="22" y1="10" x2="17" y2="15"/></svg>
                  </button>
                </div>
                <div id="ntr-content" class="nt-editor-body" contenteditable="true" data-placeholder="공지사항 내용을 입력해주세요.">${n&&n.content?n.content:''}</div>
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">첨부파일</label>
              <div class="nt-dropzone" id="ntr-dropzone">
                <div class="nt-dropzone-icon">
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <div class="nt-dropzone-text">파일을 여기에 끌어다 놓거나 <span>클릭하여 선택</span>하세요.</div>
                <div class="nt-dropzone-hint">PDF, HWP, DOC, DOCX, XLS, XLSX, JPG, PNG &nbsp;·&nbsp; 파일당 최대 10MB</div>
              </div>
              <input type="file" id="ntr-file-input" multiple hidden accept=".pdf,.hwp,.doc,.docx,.xls,.xlsx,.jpg,.png">
              <div id="ntr-file-list" style="display:flex;flex-direction:column;gap:6px;margin-top:8px;"></div>
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px;border-top:1px solid var(--border);padding-top:16px;">
            <button class="btn btn-outline" onclick="ntShowList&&ntShowList()">목록</button>
            <button class="btn btn-primary" id="ntr-btn-save">${n ? '수정' : '등록'}</button>
          </div>
        </div>`;

      window.toggleNtPeriod = () => {
        const isRange = wrapper.querySelector('input[name="ntr-period-type"]:checked')?.value === '기간설정';
        const el = wrapper.querySelector('#ntr-period-range');
        if (el) el.style.display = isRange ? 'flex' : 'none';
      };

      setTimeout(() => {
        // ── 에디터 툴바 ──
        const editor = wrapper.querySelector('#ntr-content');
        wrapper.querySelector('#ntr-toolbar').querySelectorAll('.nt-tool-btn').forEach(btn => {
          btn.onmousedown = (e) => {
            e.preventDefault();
            document.execCommand(btn.dataset.cmd, false, null);
            editor.focus();
          };
        });
        wrapper.querySelector('#ntr-font-size').onchange = function() {
          document.execCommand('fontSize', false, this.value);
          editor.focus();
        };
        editor.addEventListener('keyup', () => {
          wrapper.querySelector('#ntr-toolbar').querySelectorAll('.nt-tool-btn[data-cmd]').forEach(btn => {
            try { btn.classList.toggle('active', document.queryCommandState(btn.dataset.cmd)); } catch(e) {}
          });
        });
        editor.addEventListener('mouseup', () => editor.dispatchEvent(new Event('keyup')));

        // ── 드래그앤드롭 파일 업로드 ──
        const dropzone = wrapper.querySelector('#ntr-dropzone');
        const fileInput = wrapper.querySelector('#ntr-file-input');
        let ntrFiles = n&&n.files&&n.files.length ? n.files.map(f => ({ name: f, size: null })) : [];

        const fmtSize = bytes => bytes == null ? '' : bytes < 1024*1024 ? `${(bytes/1024).toFixed(0)}KB` : `${(bytes/1024/1024).toFixed(1)}MB`;

        const renderFileList = () => {
          wrapper.querySelector('#ntr-file-list').innerHTML = ntrFiles.map((f, i) => `
            <div class="nt-file-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span class="nt-file-item-name">${f.name}</span>
              ${f.size!=null?`<span class="nt-file-item-size">${fmtSize(f.size)}</span>`:''}
              <button class="btn btn-outline" style="height:28px;padding:0 8px;font-size:13px;flex-shrink:0;" onclick="ntrRemoveFile(${i})">삭제</button>
            </div>`).join('');
        };

        dropzone.onclick = () => fileInput.click();
        dropzone.ondragover = (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); };
        dropzone.ondragleave = (e) => { if (!dropzone.contains(e.relatedTarget)) dropzone.classList.remove('drag-over'); };
        dropzone.ondrop = (e) => {
          e.preventDefault();
          dropzone.classList.remove('drag-over');
          [...e.dataTransfer.files].forEach(f => { if (!ntrFiles.find(x => x.name===f.name)) ntrFiles.push({ name: f.name, size: f.size }); });
          renderFileList();
        };
        fileInput.onchange = () => {
          [...fileInput.files].forEach(f => { if (!ntrFiles.find(x => x.name===f.name)) ntrFiles.push({ name: f.name, size: f.size }); });
          fileInput.value = '';
          renderFileList();
        };
        window.ntrRemoveFile = (i) => { ntrFiles.splice(i, 1); renderFileList(); };
        renderFileList();

        // ── 저장 ──
        wrapper.querySelector('#ntr-btn-save').onclick = () => {
          const title = wrapper.querySelector('#ntr-title').value.trim();
          if (!title) { alert('제목을 입력해주세요.'); return; }
          const target = wrapper.querySelector('input[name="ntr-target"]:checked').value;
          const pinned = wrapper.querySelector('input[name="ntr-pinned"]:checked').value;
          const periodType = wrapper.querySelector('input[name="ntr-period-type"]:checked').value;
          let period = '무관';
          if (periodType==='기간설정') {
            const ps = wrapper.querySelector('#ntr-period-start').value;
            const pe = wrapper.querySelector('#ntr-period-end').value;
            period = ps&&pe ? `${ps}~${pe}` : '무관';
          }
          const postStatus = wrapper.querySelector('input[name="ntr-post-status"]:checked').value;
          const content = wrapper.querySelector('#ntr-content').innerHTML;
          const files = ntrFiles.map(f => f.name);
          const now = new Date();
          const fmtD = d => `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
          if (n) {
            const idx = noticeList.findIndex(x => x.id===n.id);
            if (idx !== -1) noticeList[idx] = {...noticeList[idx], target, pinned, title, period, postStatus, content, files};
            alert('수정되었습니다.');
          } else {
            noticeList.unshift({ id: Date.now(), target, pinned, title, period, author:'이희성', regDate:fmtD(now), postStatus, views:0, content, files });
            alert('등록되었습니다.');
          }
          noticeEditMode = false;
          if(window.ntShowList) window.ntShowList();
        };
      }, 50);

      return wrapper;
    }

    /* ── 자료실 관리 - 목록 ── */
    function getResourceListTemplate() {
      const wrapper = document.createElement('div');

      // 상세보기 모달 생성 (동적)
      const detailModal = document.createElement('div');
      detailModal.id = 'res-detail-modal';
      detailModal.className = 'manual-modal';
      detailModal.style.width = '680px';
      detailModal.style.maxWidth = '95vw';
      detailModal.innerHTML = `
        <div class="manual-modal-header" style="background-color:var(--navy);">
          <h3>자료 상세</h3>
          <button class="manual-modal-close" onclick="resCloseDetail()">×</button>
        </div>
        <div class="manual-modal-body" style="padding:20px;max-height:70vh;overflow-y:auto;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border);">
            <div><span style="">대상구분</span><div id="resd-target" style="font-weight:700;color:var(--navy);margin-top:4px;"></div></div>
            <div><span style="">우선노출</span><div id="resd-pinned" style="font-weight:700;margin-top:4px;"></div></div>
            <div><span style="">게시여부</span><div id="resd-status" style="font-weight:700;margin-top:4px;"></div></div>
            <div style="grid-column:1/-1;"><span style="">제목</span><div id="resd-title" style="font-size:16px;font-weight:700;color:var(--navy);margin-top:4px;"></div></div>
            <div><span style="">게시기간</span><div id="resd-period" style="margin-top:4px;"></div></div>
            <div><span style="">등록자</span><div id="resd-author" style="margin-top:4px;"></div></div>
            <div><span style="">다운로드 수</span><div id="resd-views" style="margin-top:4px;"></div></div>
          </div>
          <div id="resd-files-wrap" style="margin-bottom:16px;">
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px;">첨부파일 (자료)</div>
            <div id="resd-files" style="display:flex;flex-direction:column;gap:6px;"></div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;border-top:1px solid var(--border);padding-top:14px;">
            <button class="btn btn-outline" onclick="resCloseDetail()">목록</button>
            <button class="btn btn-primary" onclick="resOpenEdit()">수정</button>
            <button class="btn btn-outline" style="color:var(--red-dk);border-color:var(--red-md);" onclick="resDeleteFromDetail()">삭제</button>
          </div>
        </div>`;
      document.body.appendChild(detailModal);

      const detailOverlay = document.createElement('div');
      detailOverlay.id = 'res-detail-overlay';
      detailOverlay.className = 'manual-modal-overlay';
      detailOverlay.onclick = () => resCloseDetail();
      document.body.appendChild(detailOverlay);

      window.resCloseDetail = () => {
        detailModal.classList.remove('open');
        detailOverlay.classList.remove('open');
      };
      window.resOpenDetail = (id) => {
        const r = resourceList.find(x => x.id===id);
        if (!r) return;
        selectedResourceId = id;
        r.views = (r.views||0) + 1;
        document.getElementById('resd-target').textContent = r.target;
        document.getElementById('resd-pinned').innerHTML = r.pinned==='Y'?`<span class="badge badge-status-warning" style="font-size:13px;">우선노출</span>`:'—';
        document.getElementById('resd-status').innerHTML = r.postStatus==='게시'?`<span class="badge badge-status-success">게시</span>`:`<span class="badge badge-status-secondary">미게시</span>`;
        document.getElementById('resd-title').textContent = r.title;
        document.getElementById('resd-period').textContent = r.period;
        document.getElementById('resd-author').textContent = r.author;
        document.getElementById('resd-views').textContent = r.views.toLocaleString()+'회';
        const fd = document.getElementById('resd-files');
        fd.innerHTML = r.files && r.files.length > 0 ? r.files.map(f=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:13px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span style="flex:1;">${f}</span>
          <button class="btn btn-outline" style="height:28px;padding:0 8px;font-size:13px;" onclick="alert('파일을 미리봅니다: ${f}')">바로보기</button>
          <button class="btn btn-primary" style="height:28px;padding:0 8px;font-size:13px;" onclick="alert('파일을 다운로드합니다: ${f}')">다운로드</button>
        </div>`).join('') : `<div style="color:var(--text-muted);font-size:13px;padding:12px;">등록된 파일이 없습니다.</div>`;
        resUpdateTable();
        detailModal.classList.add('open');
        detailOverlay.classList.add('open');
      };
      window.resOpenEdit = () => { resCloseDetail(); resourceEditMode = true; if(window.resShowRegister) window.resShowRegister(); };
      window.resDeleteFromDetail = () => {
        const r = resourceList.find(x => x.id===selectedResourceId);
        if (!r) return;
        if (!confirm(`"${r.title}"\n\n해당 자료를 삭제하시겠습니까?`)) return;
        const idx = resourceList.findIndex(x => x.id===selectedResourceId);
        if (idx !== -1) resourceList.splice(idx, 1);
        resCloseDetail();
        alert('삭제되었습니다.');
        resUpdateTable();
      };

      wrapper.innerHTML = `
        <div class="card search-card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
            <div class="card-title" style="margin:0;">검색 조건</div>
            <span class="badge" style="background:var(--amber-lt);color:var(--amber-dk);border:1px solid var(--amber-md);font-size:13px;padding:3px 10px;">ERP 연동 필요</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div class="form-group" style="display:flex;flex-direction:row;align-items:center;gap:12px;">
              <label style="width:130px;flex-shrink:0;font-weight:600;font-size:14px;color:var(--text-label);margin:0;">조회기간</label>
              <div style="display:flex;align-items:center;gap:8px;">
                <div class="date-presets" style="display:flex;gap:4px;margin-right:4px;">
                  <button type="button" class="date-preset-btn" data-preset="1m">1개월</button>
                  <button type="button" class="date-preset-btn" data-preset="3m">3개월</button>
                  <button type="button" class="date-preset-btn active" data-preset="6m">6개월</button>
                  <button type="button" class="date-preset-btn" data-preset="1y">1년</button>
                </div>
                <input type="date" id="res-start" class="form-control" style="width:150px;" value="2026-01-01">
                <span style="">~</span>
                <input type="date" id="res-end" class="form-control" style="width:150px;" value="2026-06-30">
              </div>
            </div>
            <div class="form-group" style="display:flex;flex-direction:row;align-items:center;gap:12px;">
              <label style="width:130px;flex-shrink:0;font-weight:600;font-size:14px;color:var(--text-label);margin:0;">게시여부</label>
              <div class="radio-group" style="display:flex;gap:16px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="res-post-status" value="전체" checked> 전체</label>
                <label class="radio-item"><input type="radio" name="res-post-status" value="게시"> 게시</label>
                <label class="radio-item"><input type="radio" name="res-post-status" value="미게시"> 미게시</label>
              </div>
            </div>
            <div class="form-group" style="display:flex;flex-direction:row;align-items:center;gap:12px;">
              <label style="width:130px;flex-shrink:0;font-weight:600;font-size:14px;color:var(--text-label);margin:0;">키워드 검색</label>
              <div style="display:flex;gap:8px;width:500px;max-width:100%;">
                <select id="res-key" class="form-control" style="width:130px;flex-shrink:0;">
                  <option value="전체">전체</option>
                  <option value="제목">제목</option>
                  <option value="등록자">등록자</option>
                  <option value="대상구분">대상구분</option>
                </select>
                <input type="text" id="res-kw" class="form-control" style="flex:1;" placeholder="검색어를 입력하세요.">
              </div>
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px;border-top:1px solid var(--border);padding-top:16px;">
            <button class="btn btn-primary" id="res-btn-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> 검색
            </button>
            <button class="btn btn-outline" id="res-btn-reset">초기화</button>
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin:0;">자료실 목록</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
            <div style="font-size:13px; color:var(--text-muted);">전체 <strong id="res-total" style="color:var(--blue);">0</strong>건 &nbsp;|&nbsp; 현재 <strong id="res-current-page" style="color:var(--text);">1/1</strong> 페이지</div>
            <button class="btn btn-primary" onclick="resOpenRegister()" style="height:32px;padding:0 14px;font-size:13px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              등록
            </button>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:50px;text-align:center;">No</th>
                  <th style="width:70px;text-align:center;">대상구분</th>
                  <th style="width:70px;text-align:center;">우선노출</th>
                  <th>제목</th>
                  <th>게시기간</th>
                  <th style="width:80px;">등록자</th>
                  <th style="width:90px;">등록일</th>
                  <th style="width:70px;text-align:center;">게시여부</th>
                  <th style="width:70px;text-align:right;">다운로드</th>
                </tr>
              </thead>
              <tbody id="res-tbody"></tbody>
            </table>
          </div>
          <div class="table-footer" style="margin-top:20px; border-top:1px solid var(--border); padding-top:14px;"><div></div><div class="pagination" id="res-pagination"></div><div></div></div>
        </div>`;

      let resCurrentPage = 1;
      const resPageSize = 10;
      const resUpdateTable = window.resUpdateTable = () => {
        const key = wrapper.querySelector('#res-key').value;
        const kw = wrapper.querySelector('#res-kw').value.toLowerCase().trim();
        const postStatus = wrapper.querySelector('input[name="res-post-status"]:checked').value;
        const filtered = resourceList.filter(r => {
          if (postStatus !== '전체' && r.postStatus !== postStatus) return false;
          if (kw) {
            if (key==='전체') return r.title.toLowerCase().includes(kw)||r.author.toLowerCase().includes(kw)||r.target.toLowerCase().includes(kw);
            if (key==='제목') return r.title.toLowerCase().includes(kw);
            if (key==='등록자') return r.author.toLowerCase().includes(kw);
            if (key==='대상구분') return r.target.toLowerCase().includes(kw);
          }
          return true;
        });
        const resTotal = filtered.length, resPages = Math.ceil(resTotal/resPageSize)||1;
        if (resCurrentPage > resPages) resCurrentPage = resPages;
        const resStart = (resCurrentPage-1)*resPageSize;
        const resPaged = filtered.slice(resStart, resStart+resPageSize);
        wrapper.querySelector('#res-total').textContent = resTotal;
        wrapper.querySelector('#res-current-page').textContent = `${resCurrentPage}/${resPages}`;
        wrapper.querySelector('#res-tbody').innerHTML = resPaged.map((r, i) => `<tr>
          <td style="text-align:center;">${resStart+i+1}</td>
          <td style="text-align:center;"><span class="badge badge-status-secondary" style="font-size:13px;">${r.target}</span></td>
          <td style="text-align:center;">${r.pinned==='Y'?'<span class="badge badge-status-warning" style="font-size:13px;">Y</span>':'—'}</td>
          <td style="text-align:left;"><a href="#" style="color:inherit;text-decoration:none;" onclick="event.preventDefault();resOpenDetail(${r.id})">${r.title}</a></td>
          <td style="">${r.period}</td>
          <td>${r.author}</td>
          <td style="">${r.regDate}</td>
          <td style="text-align:center;">${r.postStatus==='게시'?'<span class="badge badge-status-success" style="font-size:13px;">게시</span>':'<span class="badge badge-status-secondary" style="font-size:13px;">미게시</span>'}</td>
          <td style="text-align:right;">${r.views.toLocaleString()}</td>
        </tr>`).join('');
        const resPag = wrapper.querySelector('#res-pagination');
        resPag.innerHTML = Array.from({length: resPages}, (_, j) => `<button class="page-btn ${j+1===resCurrentPage?'active':''}" data-page="${j+1}">${j+1}</button>`).join('');
        resPag.querySelectorAll('.page-btn').forEach(b => b.onclick = () => { resCurrentPage = Number(b.dataset.page); resUpdateTable(); });
      };

      window.resOpenRegister = () => { resourceEditMode = false; selectedResourceId = null; if(window.resShowRegister) window.resShowRegister(); };

      setTimeout(() => {
        const presetBtns = wrapper.querySelectorAll('.date-preset-btn');
        presetBtns.forEach(btn => {
          btn.onclick = () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const preset = btn.getAttribute('data-preset');
            const e = new Date(), s = new Date();
            if (preset==='1m') s.setMonth(e.getMonth()-1);
            else if (preset==='3m') s.setMonth(e.getMonth()-3);
            else if (preset==='6m') s.setMonth(e.getMonth()-6);
            else s.setFullYear(e.getFullYear()-1);
            const fmt = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            wrapper.querySelector('#res-start').value = fmt(s);
            wrapper.querySelector('#res-end').value = fmt(e);
          };
        });
        wrapper.querySelector('#res-btn-search').onclick = () => { resCurrentPage = 1; resUpdateTable(); };
        wrapper.querySelector('#res-btn-reset').onclick = () => {
          wrapper.querySelector('#res-kw').value = '';
          wrapper.querySelector('input[name="res-post-status"][value="전체"]').checked = true;
          resCurrentPage = 1;
          resUpdateTable();
        };
        resUpdateTable();
        const obs = new MutationObserver(() => {
          if (!document.body.contains(wrapper)) {
            if (document.body.contains(detailModal)) document.body.removeChild(detailModal);
            if (document.body.contains(detailOverlay)) document.body.removeChild(detailOverlay);
            obs.disconnect();
          }
        });
        if (wrapper.parentNode) obs.observe(wrapper.parentNode, {childList:true});
      }, 50);

      return wrapper;
    }

    /* ── 자료실 관리 - 등록/수정 ── */
    function getResourceRegisterTemplate() {
      const r = resourceEditMode && selectedResourceId ? resourceList.find(x => x.id===selectedResourceId) : null;
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="card">
          <div class="card-title">${r ? '자료 수정' : '자료 등록'}</div>
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">대상구분 <span class="required">*</span></label>
              <div class="radio-group" style="display:flex;gap:20px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="resr-target" value="전체"${!r||r.target==='전체'?' checked':''}> 전체</label>
                <label class="radio-item"><input type="radio" name="resr-target" value="내부"${r&&r.target==='내부'?' checked':''}> 내부</label>
                <label class="radio-item"><input type="radio" name="resr-target" value="외부"${r&&r.target==='외부'?' checked':''}> 외부</label>
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">우선노출 <span class="required">*</span></label>
              <div class="radio-group" style="display:flex;gap:20px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="resr-pinned" value="Y"${r&&r.pinned==='Y'?' checked':''}> 예</label>
                <label class="radio-item"><input type="radio" name="resr-pinned" value="N"${!r||r.pinned==='N'?' checked':''}> 아니오</label>
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">제목 <span class="required">*</span></label>
              <input type="text" id="resr-title" class="form-control" placeholder="제목을 입력해주세요. (예: HW_물품계약서)" value="${r?r.title:''}">
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">게시기간 <span class="required">*</span></label>
              <div style="display:flex;gap:12px;align-items:center;">
                <label class="radio-item"><input type="radio" name="resr-period-type" value="무관"${!r||r.period==='무관'?' checked':''} onchange="toggleResPeriod()"> 무관</label>
                <label class="radio-item"><input type="radio" name="resr-period-type" value="기간설정"${r&&r.period!=='무관'?' checked':''} onchange="toggleResPeriod()"> 기간 설정</label>
                <div id="resr-period-range" style="${r&&r.period!=='무관'?'':'display:none;'}display:flex;align-items:center;gap:8px;">
                  <input type="date" id="resr-period-start" class="form-control" style="width:150px;" value="${r&&r.period!=='무관'?r.period.split('~')[0]:''}">
                  <span style="">~</span>
                  <input type="date" id="resr-period-end" class="form-control" style="width:150px;" value="${r&&r.period!=='무관'?r.period.split('~')[1]||'':''}">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">게시여부 <span class="required">*</span></label>
              <div class="radio-group" style="display:flex;gap:20px;height:38px;align-items:center;">
                <label class="radio-item"><input type="radio" name="resr-post-status" value="게시"${!r||r.postStatus==='게시'?' checked':''}> 게시</label>
                <label class="radio-item"><input type="radio" name="resr-post-status" value="미게시"${r&&r.postStatus==='미게시'?' checked':''}> 미게시</label>
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">등록자</label>
              <input type="text" class="form-control" value="${r?r.author:'이희성'}" readonly style="width:200px;background:var(--bg);color:var(--text-muted);cursor:not-allowed;">
            </div>
            <div class="form-group">
              <label style="font-weight:600;font-size:13px;color:var(--text-label);">첨부파일 <span class="required">*</span></label>
              <div class="nt-dropzone" id="resr-dropzone">
                <div class="nt-dropzone-icon">
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <div class="nt-dropzone-text">파일을 여기에 끌어다 놓거나 <span>클릭하여 선택</span>하세요.</div>
                <div class="nt-dropzone-hint">PDF, HWP, Word, Excel, PowerPoint &nbsp;·&nbsp; 파일당 최대 50MB</div>
              </div>
              <input type="file" id="resr-file-input" multiple hidden accept=".pdf,.hwp,.doc,.docx,.xls,.xlsx,.ppt,.pptx">
              <div id="resr-file-list" style="display:flex;flex-direction:column;gap:6px;margin-top:8px;"></div>
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px;border-top:1px solid var(--border);padding-top:16px;">
            <button class="btn btn-outline" onclick="resShowList&&resShowList()">목록</button>
            <button class="btn btn-primary" id="resr-btn-save">${r ? '수정' : '등록'}</button>
          </div>
        </div>`;

      window.toggleResPeriod = () => {
        const isRange = wrapper.querySelector('input[name="resr-period-type"]:checked')?.value === '기간설정';
        const el = wrapper.querySelector('#resr-period-range');
        if (el) el.style.display = isRange ? 'flex' : 'none';
      };

      setTimeout(() => {
        // ── 드래그앤드롭 파일 업로드 ──
        const dropzone = wrapper.querySelector('#resr-dropzone');
        const fileInput = wrapper.querySelector('#resr-file-input');
        let resrFiles = r&&r.files&&r.files.length ? r.files.map(f => ({ name: f, size: null })) : [];

        const fmtSize = bytes => bytes == null ? '' : bytes < 1024*1024 ? `${(bytes/1024).toFixed(0)}KB` : `${(bytes/1024/1024).toFixed(1)}MB`;

        const renderFileList = () => {
          wrapper.querySelector('#resr-file-list').innerHTML = resrFiles.map((f, i) => `
            <div class="nt-file-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span class="nt-file-item-name">${f.name}</span>
              ${f.size!=null?`<span class="nt-file-item-size">${fmtSize(f.size)}</span>`:''}
              <button class="btn btn-outline" style="height:28px;padding:0 8px;font-size:13px;flex-shrink:0;" onclick="resrRemoveFile(${i})">삭제</button>
            </div>`).join('');
        };

        dropzone.onclick = () => fileInput.click();
        dropzone.ondragover = (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); };
        dropzone.ondragleave = (e) => { if (!dropzone.contains(e.relatedTarget)) dropzone.classList.remove('drag-over'); };
        dropzone.ondrop = (e) => {
          e.preventDefault();
          dropzone.classList.remove('drag-over');
          [...e.dataTransfer.files].forEach(f => { if (!resrFiles.find(x => x.name===f.name)) resrFiles.push({ name: f.name, size: f.size }); });
          renderFileList();
        };
        fileInput.onchange = () => {
          [...fileInput.files].forEach(f => { if (!resrFiles.find(x => x.name===f.name)) resrFiles.push({ name: f.name, size: f.size }); });
          fileInput.value = '';
          renderFileList();
        };
        window.resrRemoveFile = (i) => { resrFiles.splice(i, 1); renderFileList(); };
        renderFileList();

        wrapper.querySelector('#resr-btn-save').onclick = () => {
          const title = wrapper.querySelector('#resr-title').value.trim();
          if (!title) { alert('제목을 입력해주세요.'); return; }
          const target = wrapper.querySelector('input[name="resr-target"]:checked').value;
          const pinned = wrapper.querySelector('input[name="resr-pinned"]:checked').value;
          const periodType = wrapper.querySelector('input[name="resr-period-type"]:checked').value;
          let period = '무관';
          if (periodType==='기간설정') {
            const ps = wrapper.querySelector('#resr-period-start').value;
            const pe = wrapper.querySelector('#resr-period-end').value;
            period = ps&&pe ? `${ps}~${pe}` : '무관';
          }
          const postStatus = wrapper.querySelector('input[name="resr-post-status"]:checked').value;
          const now = new Date();
          const fmtS = d => `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
          const files = resrFiles.map(f => f.name);
          if (r) {
            const idx = resourceList.findIndex(x => x.id===r.id);
            if (idx !== -1) resourceList[idx] = {...resourceList[idx], target, pinned, title, period, postStatus, files};
            alert('수정되었습니다.');
          } else {
            resourceList.unshift({ id: Date.now(), target, pinned, title, period, author:'이희성', regDate:fmtS(now), postStatus, views:0, content:'', files });
            alert('등록되었습니다.');
          }
          resourceEditMode = false;
          if(window.resShowList) window.resShowList();
        };
      }, 50);

      return wrapper;
    }

    /* ── 래퍼: 권한그룹 및 권한 관리 ── */
    function getAuthGroupManageTemplate() {
      const outer = document.createElement('div');
      outer.style.cssText = 'height:100%;display:flex;flex-direction:column;';
      const inner = document.createElement('div');
      inner.style.cssText = 'flex:1;';
      outer.appendChild(inner);
      window.authShowList = () => { inner.innerHTML = ''; inner.appendChild(getAuthGroupListTemplate()); };
      window.authShowRegister = () => { inner.innerHTML = ''; inner.appendChild(getAuthGroupSettingTemplate()); };
      window.authShowList();
      return outer;
    }

    /* ── 래퍼: 협력업체 관리 ── */
    function getPartnerManageTemplate() {
      const outer = document.createElement('div');
      outer.style.cssText = 'height:100%;display:flex;flex-direction:column;';
      const inner = document.createElement('div');
      inner.style.cssText = 'flex:1;';
      outer.appendChild(inner);
      window.partnerShowList = () => { inner.innerHTML = ''; inner.appendChild(getPartnerListTemplate()); };
      window.partnerShowDetail = () => { inner.innerHTML = ''; inner.appendChild(getPartnerDetailTemplate()); };
      window.partnerShowList();
      return outer;
    }

    /* ── 래퍼: 공지사항 관리 ── */
    function getNoticeManageTemplate() {
      const outer = document.createElement('div');
      outer.style.cssText = 'height:100%;display:flex;flex-direction:column;';
      const inner = document.createElement('div');
      inner.style.cssText = 'flex:1;';
      outer.appendChild(inner);
      window.ntShowList = () => { inner.innerHTML = ''; inner.appendChild(getNoticeListTemplate()); };
      window.ntShowRegister = () => { inner.innerHTML = ''; inner.appendChild(getNoticeRegisterTemplate()); };
      window.ntShowList();
      return outer;
    }

    /* ── 래퍼: 자료실 관리 ── */
    function getResourceManageTemplate() {
      const outer = document.createElement('div');
      outer.style.cssText = 'height:100%;display:flex;flex-direction:column;';
      const inner = document.createElement('div');
      inner.style.cssText = 'flex:1;';
      outer.appendChild(inner);
      window.resShowList = () => { inner.innerHTML = ''; inner.appendChild(getResourceListTemplate()); };
      window.resShowRegister = () => { inner.innerHTML = ''; inner.appendChild(getResourceRegisterTemplate()); };
      window.resShowList();
      return outer;
    }
