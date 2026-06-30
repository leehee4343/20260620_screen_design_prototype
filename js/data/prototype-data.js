/* 날짜만 추출 (목록화면용 — 시/분 제거) */
    function dateOnly(str) { return str ? str.split(' ')[0] : ''; }

    /* ── 메뉴 데이터 (1Depth 메뉴 업데이트) ── */
    const menuData = [
      {
        id: 'menu-biz', label: '사업접수',
        icon: 'inbox', iconBg: '#dde8f8',
        children: [
          { id: 'rec-create', label: '신규 프로젝트 생성' },
          { id: 'rec-status', label: '사업접수현황 조회' }
        ]
      },
      {
        id: 'menu-proj', label: '프로젝트 관리',
        icon: 'layout', iconBg: '#dde8f8',
        children: [
          { id: 'proj-1', label: '프로젝트 현황' }
        ]
      },
      {
        id: 'menu-con', label: '계약관리',
        icon: 'clipboard', iconBg: '#dde8f8',
        children: [
          { id: 'con-1', label: '계약 현황' }
        ]
      },
      {
        id: 'menu-fund', label: '자금관리',
        icon: 'credit-card', iconBg: '#e3f9ed',
        children: [
          { id: 'rep-1', label: '상환 스케줄' },
          { id: 'acc-1', label: '월별/연도별 결산' }
        ]
      },
      {
        id: 'menu-stat-analysis', label: '통계',
        icon: 'bar-chart', iconBg: '#e3f9ed',
        children: [
          { id: 'stat-analysis-1', label: '종합현황' },
          { id: 'stat-analysis-2', label: '연도별 추이' },
          { id: 'stat-analysis-3', label: '부서/분야별 현황' },
          { id: 'stat-analysis-4', label: '진행/이상 현황' },
          { id: 'stat-analysis-5', label: '상환/회수 현황' },
          { id: 'stat-analysis-6', label: '수익율 분석' },
          { id: 'stat-analysis-7', label: '상환스케쥴 현황' }
        ]
      },
      {
        id: 'menu-trip', label: '출장관리',
        icon: 'car', iconBg: '#dde8f8',
        children: [
          { id: 'trip-1', label: '출장신청 및 내역' }
        ]
      },
      {
        id: 'menu-mypage', label: '마이페이지',
        icon: 'user', iconBg: '#fdecec',
        children: [
          { id: 'mypage-1', label: '내 정보' }
        ]
      },
      {
        id: 'menu-common', label: '공통관리',
        icon: 'settings', iconBg: '#f1f5f9',
        children: [
          { id: 'common-1', label: '관리자 관리' },
          { id: 'common-2', label: '권한그룹 및 권한 관리' },
          { id: 'common-3', label: '접속 아이피(IP) 관리' },
          { id: 'common-4', label: '코드관리' },
          { id: 'common-5', label: '로그인 현황' },
          { id: 'common-6', label: '메뉴별 접속현황' },
          { id: 'common-7', label: '협력업체 관리' },
          { id: 'common-8', label: '공지사항 관리' },
          { id: 'common-9', label: '양식 등 자료실 관리' }
        ]
      }
    ];

    const tabData = {
      'login-1':   ['로그인'],
      'rec-create': ['신규 프로젝트 생성'],
      'rec-status': ['사업접수현황 조회'],
      'proj-1':    ['프로젝트 목록', '프로젝트 상세'],
      'con-1':     ['계약 목록', '계약 등록'],
      'rep-1':     ['상환 스케줄러', '상환 수금등록'],
      'acc-1':     ['결산 목록', '결산 세부현황'],
      'trip-1':    ['출장 신청', '출장 정산'],
      'stat-analysis-1': ['종합현황'],
      'stat-analysis-2': ['연도별 추이'],
      'stat-analysis-3': ['부서/분야별 현황'],
      'stat-analysis-4': ['진행/이상 현황'],
      'stat-analysis-5': ['상환/회수 현황'],
      'stat-analysis-6': ['수익율 분석'],
      'stat-analysis-7': ['상환스케쥴 현황'],
      'mypage-1':  ['내 정보'],
      'common-1':  ['관리자 목록'],
      'common-2':  ['검색/조회', '권한그룹 추가하기'],
      'common-3':  ['IP 목록'],
      'common-4':  ['코드 목록'],
      'common-5':  ['로그인 현황'],
      'common-6':  ['메뉴별 접속현황'],
      'common-7':  ['협력업체 목록', '협력업체 상세'],
      'common-8':  ['공지사항 목록', '공지사항 등록'],
      'common-9':  ['자료실 목록', '자료 등록'],
    };

    function addPrototypeSubMenus() {
      const temporaryLabels = ['A 서브메뉴', 'B 서브메뉴', 'C 서브메뉴'];
      menuData.forEach(parent => {
        if (parent.children.length > 1) return;
        temporaryLabels.forEach((label, index) => {
          const childId = `${parent.id}-temp-${index + 1}`;
          parent.children.push({ id: childId, label });
          tabData[childId] = [label];
        });
      });
    }
    addPrototypeSubMenus();

    // Mock databases for new screens
    let accessIpList = [
      { id: 1, ip: '211.215.111.2', reason: '회사 아이피(IP) – 내부 접속용', regDate: '2026. 06. 09', regUser: '이희성' },
      { id: 2, ip: '1.112.11.2', reason: '2026년 1년간 홍길동 차장의 재택근무 지원용', regDate: '2026. 06. 09', regUser: '이희성' }
    ];
    for (let i = 3; i <= 55; i++) {
      accessIpList.push({
        id: i,
        ip: `192.168.10.${10 + i}`,
        reason: `개발부서 운영 업무 접속용 IP #${i}`,
        regDate: '2026. 06. 12',
        regUser: '이희성'
      });
    }

    let codeList = [
      { id: 1, code: 'KepcoES0001', codeName: '사업구분', codeDesc: '사업접수 시 사용하는 사업구분', useStatus: '사용(Y)', regDate: '2026. 06. 09', regUser: '이희성', editDate: '2026.06.10(이희성)', values: [
        { id: 1, valCode: 'KepcoES0001_001', valName: '산업체', useStatus: '사용(Y)', regDate: '2026. 06. 09', regUser: '이희성', order: 1, editDate: '2026.06.10(이희성)' },
        { id: 2, valCode: 'KepcoES0001_002', valName: '건축물', useStatus: '중지(N)', regDate: '2026. 06. 09', regUser: '이희성', order: 2, editDate: '' },
        { id: 3, valCode: 'KepcoES0001_003', valName: '공공', useStatus: '사용(Y)', regDate: '2026. 06. 09', regUser: '이희성', order: 3, editDate: '' },
        { id: 4, valCode: 'KepcoES0001_004', valName: '한전고효율', useStatus: '사용(Y)', regDate: '2026. 06. 09', regUser: '이희성', order: 4, editDate: '' },
        { id: 5, valCode: 'KepcoES0001_005', valName: '자가소비형', useStatus: '사용(Y)', regDate: '2026. 06. 09', regUser: '이희성', order: 5, editDate: '' }
      ]}
    ];
    for (let i = 2; i <= 55; i++) {
      codeList.push({
        id: i,
        code: `KepcoES${String(i).padStart(4, '0')}`,
        codeName: `공통코드_${i}`,
        codeDesc: `시스템 표준 분류를 위한 공통코드 ${i}`,
        useStatus: i % 5 === 0 ? '중지(N)' : '사용(Y)',
        regDate: '2026. 06. 12',
        regUser: '이희성',
        editDate: '2026.06.12(이희성)',
        values: [
          { id: 1, valCode: `KepcoES${String(i).padStart(4, '0')}_001`, valName: '기본값A', useStatus: '사용(Y)', regDate: '2026. 06. 12', regUser: '이희성', order: 1, editDate: '' },
          { id: 2, valCode: `KepcoES${String(i).padStart(4, '0')}_002`, valName: '기본값B', useStatus: '사용(Y)', regDate: '2026. 06. 12', regUser: '이희성', order: 2, editDate: '' }
        ]
      });
    }

    let adminList = [
      { id: 1, empNo: 'EMP001', username: 'hslee', name: '이희성', dept: '에너지사업부', position: '부장', email: 'hslee@kepcoes.co.kr', status: '사용', regDate: '2026-06-01 09:15:30', regUser: '관리자A', editDate: '2026-06-15 14:30:22', ip: '192.168.10.11', authGroups: ['1', '3'] },
      { id: 2, empNo: 'EMP002', username: 'cskim', name: '김철수', dept: 'ICT지원부', position: '대리', email: 'cskim@kepcoes.co.kr', status: '사용', regDate: '2026-06-02 10:20:45', regUser: '관리자A', editDate: '2026-06-14 11:15:10', ip: '192.168.10.12', authGroups: ['3'] },
      { id: 3, empNo: 'EMP003', username: 'yhpark', name: '박영희', dept: '기획실', position: '과장', email: 'yhpark@kepcoes.co.kr', status: '사용', regDate: '2026-06-03 14:05:12', regUser: '이희성', editDate: '2026-06-12 16:45:00', ip: '192.168.10.13', authGroups: ['1', '4'] },
      { id: 4, empNo: 'EMP004', username: 'gdhong', name: '홍길동', dept: '에너지사업부', position: '차장', email: 'gdhong@kepcoes.co.kr', status: '중지', regDate: '2026-05-15 09:00:00', regUser: '관리자A', editDate: '2026-05-30 18:22:15', ip: '192.168.10.14', authGroups: ['4'] },
      { id: 5, empNo: 'EMP005', username: 'mkchoi', name: '최미경', dept: '재무관리부', position: '사원', email: 'mkchoi@kepcoes.co.kr', status: '사용', regDate: '2026-06-10 11:30:24', regUser: '이희성', editDate: '2026-06-11 10:05:59', ip: '192.168.10.15', authGroups: ['3', '4'] }
    ];

    // 사업접수 화면용 프로토타입 데이터
    let projectReceiptList = [
      { id: 1, receiptNo: 'PRJ-2026-0008', projectName: 'OO산업 공장 에너지효율화 사업', customer: 'OO산업(주)', type: 'ESCO', manager: '김철수', receiptDate: '2026-06-20', status: '접수완료', budget: '1,250,000,000' },
      { id: 2, receiptNo: 'PRJ-2026-0007', projectName: '공공청사 LED 교체 사업', customer: 'OO시청', type: '시설개선', manager: '박영희', receiptDate: '2026-06-18', status: '검토중', budget: '480,000,000' },
      { id: 3, receiptNo: 'PRJ-2026-0006', projectName: '태양광 자가소비형 구축 사업', customer: 'OO물류센터', type: '신재생', manager: '이희성', receiptDate: '2026-06-15', status: '승인완료', budget: '920,000,000' },
      { id: 4, receiptNo: 'PRJ-2026-0005', projectName: '냉난방 설비 고효율화 사업', customer: 'OO대학교', type: 'ESCO', manager: '김철수', receiptDate: '2026-06-11', status: '보완요청', budget: '760,000,000' },
      { id: 5, receiptNo: 'PRJ-2026-0004', projectName: '스마트 에너지 관리시스템 구축', customer: 'OO병원', type: '시설개선', manager: '박영희', receiptDate: '2026-06-04', status: '접수완료', budget: '315,000,000' }
    ];

    let projectList = [
      { id: 1, no: 'PJ-2026-0012', name: 'OO산업 공장 에너지효율화 사업', customer: 'OO산업(주)', type: 'ESCO', manager: '김철수', start: '2026-06-01', end: '2027-05-31', progress: 35, status: '진행중', amount: '1,250,000,000' },
      { id: 2, no: 'PJ-2026-0011', name: '공공청사 LED 교체 사업', customer: 'OO시청', type: '시설개선', manager: '박영희', start: '2026-05-15', end: '2026-11-30', progress: 62, status: '진행중', amount: '480,000,000' },
      { id: 3, no: 'PJ-2026-0010', name: '태양광 자가소비형 구축 사업', customer: 'OO물류센터', type: '신재생', manager: '이희성', start: '2026-04-01', end: '2026-09-30', progress: 78, status: '완료예정', amount: '920,000,000' },
      { id: 4, no: 'PJ-2026-0009', name: '냉난방 설비 고효율화 사업', customer: 'OO대학교', type: 'ESCO', manager: '김철수', start: '2026-06-10', end: '2027-01-31', progress: 10, status: '준비중', amount: '760,000,000' }
    ];
    let selectedProjectId = 1;

    // ── 협력업체 Mock 데이터 ──
    let partnerList = [
      { id:1, code:'02663', name:'큐비트엑스', bizNo:'349-83-01795', ceo:'이홍태, 윤지병', manager:'이희성', managerEmail:'leehee43@naver.com', managerTel:'010-6844-2810', status:'정상', regDate:'2026. 06. 09', regUser:'이희성', editDate:'2026.06.10(이희성)', address:'서울특별시 송파구 중대로 113(대한전기협회 9층)', creditGrade:'AA', debtRatio:'45.2%', sales1:'120억', sales2:'98억', sales3:'85억', constExp:'230억', workers:15, guarantee:'없음', creditISO:'없음', guaranteeType:'이행보증금', guaranteeDetail:'지급보증보험 100%', location:'서울특별시', locationDetail:'송파구', energyManager:'홍길동', contact:'010-1234-5678' },
      { id:2, code:'01234', name:'한솔에너지솔루션', bizNo:'123-45-67890', ceo:'김한솔', manager:'박철수', managerEmail:'park@hansol.co.kr', managerTel:'010-2345-6789', status:'정상', regDate:'2026. 06. 10', regUser:'이희성', editDate:'2026.06.11(이희성)', address:'경기도 안산시 단원구 원포공원1로 70', creditGrade:'A+', debtRatio:'62.1%', sales1:'85억', sales2:'71억', sales3:'65억', constExp:'185억', workers:12, guarantee:'있음', creditISO:'있음', guaranteeType:'공공기관', guaranteeDetail:'이행보증보험 100%', location:'경기도', locationDetail:'안산시', energyManager:'이관리', contact:'010-5678-9012' },
      { id:3, code:'03456', name:'그린텍솔루션', bizNo:'234-56-78901', ceo:'최그린', manager:'이무관', managerEmail:'mgr@greentech.co.kr', managerTel:'010-3456-7890', status:'중지', regDate:'2026. 06. 12', regUser:'이희성', editDate:'', address:'서울특별시 강남구 테헤란로 123', creditGrade:'BBB', debtRatio:'88.5%', sales1:'42억', sales2:'38억', sales3:'45억', constExp:'95억', workers:8, guarantee:'없음', creditISO:'없음', guaranteeType:'기타', guaranteeDetail:'', location:'서울특별시', locationDetail:'강남구', energyManager:'김에너지', contact:'010-3456-7890' },
      { id:4, code:'04567', name:'스마트에너지텍', bizNo:'345-67-89012', ceo:'홍스마트', manager:'김담당', managerEmail:'kim@smartenergy.co.kr', managerTel:'010-4567-8901', status:'정상', regDate:'2026. 06. 13', regUser:'박영희', editDate:'2026.06.15(박영희)', address:'부산광역시 해운대구 센텀중앙로 55', creditGrade:'A', debtRatio:'55.0%', sales1:'67억', sales2:'59억', sales3:'51억', constExp:'143억', workers:10, guarantee:'없음', creditISO:'있음', guaranteeType:'이행보증금', guaranteeDetail:'이행보증보험 100%', location:'부산광역시', locationDetail:'해운대구', energyManager:'신에너지', contact:'010-6789-0123' },
      { id:5, code:'05678', name:'에코파워시스템', bizNo:'456-78-90123', ceo:'박에코', manager:'최파워', managerEmail:'choi@ecopower.co.kr', managerTel:'010-5678-9012', status:'폐업', regDate:'2026. 06. 01', regUser:'이희성', editDate:'2026.06.20(이희성)', address:'대전광역시 유성구 과학로 125', creditGrade:'C', debtRatio:'145.2%', sales1:'18억', sales2:'22억', sales3:'31억', constExp:'52억', workers:4, guarantee:'없음', creditISO:'없음', guaranteeType:'기타', guaranteeDetail:'', location:'대전광역시', locationDetail:'유성구', energyManager:'오담당', contact:'010-7890-1234' }
    ];
    for (let i = 6; i <= 55; i++) {
      partnerList.push({
        id:i, code:String(10000+i).slice(1), name:`에너지파트너스_${i}`, bizNo:`${100+i}-${10+i}-${10000+i}`, ceo:`대표자${i}`, manager:`담당자${i}`, managerEmail:`manager${i}@corp.co.kr`, managerTel:`010-${1000+i}-${2000+i}`,
        status:i%7===0?'폐업':i%5===0?'중지':'정상', regDate:'2026. 06. 15', regUser:'이희성', editDate:'',
        address:`서울특별시 강남구 테헤란로 ${i*10}`, creditGrade:['AA','A+','A','BBB'][i%4], debtRatio:`${(30+i).toFixed(1)}%`,
        sales1:`${50+i}억`, sales2:`${45+i}억`, sales3:`${40+i}억`, constExp:`${100+i*2}억`, workers:5+i%10,
        guarantee:i%2===0?'있음':'없음', creditISO:i%3===0?'있음':'없음', guaranteeType:'이행보증금', guaranteeDetail:'', location:'서울특별시', locationDetail:'강남구', energyManager:`에너지담당${i}`, contact:`010-${3000+i}-${4000+i}`
      });
    }
    let selectedPartnerId = 1;

    // ── 공지사항 Mock 데이터 ──
    let noticeList = [
      { id:1, target:'전체', pinned:'Y', title:"'협력업체 선정 세부기준'이 개정되었습니다.", period:'무관', author:'이희성', regDate:'2026.06.30', postStatus:'게시', views:10235, content:"협력업체 선정 세부기준이 2026년 7월 1일부터 개정 적용됩니다.\n\n주요 변경 내용:\n1. 신용등급 평가 기준 강화 (A- 이상 → A 이상)\n2. 시공경험 3년 누계 기준 상향 (100억 → 150억)\n3. 부채비율 기준 조정 (200% 이하 → 150% 이하)\n\n기존 협력업체는 3개월 유예기간 이후 재평가 예정입니다.", files:['협력업체선정기준_개정안.PDF','개정전후비교표.HWP'] },
      { id:2, target:'내부', pinned:'Y', title:'2026년 하반기 업무 지침 안내', period:'2026.07.01~2026.07.31', author:'이희성', regDate:'2026.06.25', postStatus:'미게시', views:0, content:'', files:[] },
      { id:3, target:'외부', pinned:'N', title:'협력업체 계약 양식 변경 안내', period:'무관', author:'박영희', regDate:'2026.06.20', postStatus:'게시', views:3841, content:'', files:['계약양식_변경안내.PDF'] },
      { id:4, target:'전체', pinned:'N', title:'시스템 정기 점검 안내 (2026.07.05)', period:'2026.07.04~2026.07.06', author:'이희성', regDate:'2026.06.15', postStatus:'게시', views:1234, content:'', files:[] },
      { id:5, target:'내부', pinned:'N', title:'2026년 상반기 실적 보고 양식 배포', period:'무관', author:'김철수', regDate:'2026.06.10', postStatus:'미게시', views:0, content:'', files:[] }
    ];
    let selectedNoticeId = 1;
    let noticeEditMode = false;

    // ── 자료실 Mock 데이터 ──
    let resourceList = [
      { id:1, target:'전체', pinned:'Y', title:'HW_물품계약서', period:'무관', author:'이희성', regDate:'2026.06.30', postStatus:'게시', views:10235, content:'', files:['HW_물품계약서.HWP','작성가이드.PDF'] },
      { id:2, target:'내부', pinned:'Y', title:'ESCO 사업 표준계약서 (2026년판)', period:'무관', author:'이희성', regDate:'2026.06.25', postStatus:'미게시', views:0, content:'', files:[] },
      { id:3, target:'외부', pinned:'N', title:'공사대금 정산 신청서 양식', period:'무관', author:'박영희', regDate:'2026.06.20', postStatus:'게시', views:5621, content:'', files:['정산신청서.HWP'] },
      { id:4, target:'전체', pinned:'N', title:'에너지 진단 보고서 작성 지침', period:'무관', author:'이희성', regDate:'2026.06.15', postStatus:'게시', views:2890, content:'', files:['진단보고서작성지침.PDF'] },
      { id:5, target:'내부', pinned:'N', title:'2026 업무 매뉴얼 (내부직원용)', period:'무관', author:'김철수', regDate:'2026.06.10', postStatus:'미게시', views:0, content:'', files:[] }
    ];
    let selectedResourceId = 1;
    let resourceEditMode = false;

