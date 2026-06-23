# 프로토타입 & 프로그램 표준 디자인 시스템

> **용도**: 앞으로 제작하는 모든 프로토타입·프로그램에 적용할 디자인/UI/UX 가이드.  
> **기반**: KEPCO ES 사업관리시스템(PMS) 화면 설계 시안 C  
> **AI 학습 지시**: 이 문서의 모든 명세를 따라 HTML/CSS/JS 결과물을 생성하라.

---

## 목차

1. [색상 시스템](#1-색상-시스템)
2. [타이포그래피](#2-타이포그래피)
3. [레이아웃 구조](#3-레이아웃-구조)
4. [공통 컴포넌트](#4-공통-컴포넌트)
5. [폼 패턴](#5-폼-패턴)
6. [테이블 패턴](#6-테이블-패턴)
7. [모달 패턴](#7-모달-패턴)
8. [차트 스타일](#8-차트-스타일)
9. [인터랙션 원칙](#9-인터랙션-원칙)
10. [다크 모드](#10-다크-모드)
11. [전체 CSS 변수 (복사 즉시 사용)](#11-전체-css-변수)

---

## 1. 색상 시스템

### 브랜드 팔레트

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--navy` | `#123047` | 헤더, active 탭, 제목 |
| `--blue` | `#2563eb` | Primary 버튼, 포커스, 링크 |
| `--blue-lt` | `#e8f1ff` | Active 메뉴 배경 |
| `--blue-md` | `#93c5fd` | 보더 hover |
| `--blue-dk` | `#1d4ed8` | 버튼 hover |
| `--amber` | `#d97706` | Accent, 탭 활성 밑줄, FAB |
| `--amber-lt` | `#fff4dc` | 경고 배지 배경 |
| `--amber-dk` | `#92400e` | 경고 배지 텍스트 |
| `--green` | `#059669` | 저장/등록 버튼, 성공 배지 |
| `--green-lt` | `#e7f8f1` | 성공 배지 배경 |
| `--red` | `#dc2626` | 필수 표시, 오류 |
| `--red-lt` | `#fee2e2` | 오류 배지 배경 |
| `--red-dk` | `#991b1b` | 오류 배지 텍스트 |

### 서피스 팔레트

| 토큰 | 라이트 모드 | 다크 모드 |
|------|------------|----------|
| `--bg` | `#eef3f8` | `#0f172a` |
| `--bg2` | `#ffffff` | `#1e293b` |
| `--text` | `#172033` | `#f8fafc` |
| `--text-muted` | `#637083` | `#cbd5e1` |
| `--text-label` | `#405063` | `#cbd5e1` |
| `--border` | `#d8e0ea` | `#334155` |
| `--sidebar-bg` | `#ffffff` | `#0f172a` |

---

## 2. 타이포그래피

```html
<!-- Google Fonts 임포트 (필수) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

### 크기 스케일

| 역할 | 크기 | 굵기 | 색상 |
|------|------|------|------|
| 페이지 제목 | 20px | 700 | `--navy` |
| 카드 제목 | 15px | 700 | `--blue-dk` |
| 섹션 헤더 | 14px | 700 | `--text` |
| 본문 기본 | 15px | 400 | `--text` |
| 보조 텍스트 | 14px | 400 | `--text-muted` |
| 소형 라벨 | 13px | 600 | `--text-label` |
| 배지/버튼 | 13px | 500–700 | - |
| 메타 정보 | 13px | 400 | `--text-muted` |

---

## 3. 레이아웃 구조

```
┌──────────────────────────────────────────────────┐
│  [A] 헤더 (height: 56px, bg: --navy)             │
│  로고 | 시스템명              사용자 | 권한 | 🌙  │
├──────────┬───────────────────────────────────────┤
│          │ [C] 탭 내비게이션 (height: 58px)       │
│  [B]     │ 메뉴명 라벨 | 탭1 탭2 탭3 | ← →      │
│  LNB     ├───────────────────────────────────────┤
│  사이드바 │ [D] 브레드크럼 (제목 + 경로)          │
│  256px   ├───────────────────────────────────────┤
│          │ [E] 콘텐츠 영역 (padding: 24px)        │
│          │     카드들...                          │
│          ├───────────────────────────────────────┤
│          │ [F] 푸터                               │
└──────────┴───────────────────────────────────────┘
```

### 핵심 CSS

```css
/* 전체 레이아웃 */
body { height: 100vh; display: flex; flex-direction: column; overflow: hidden; }

.header { height: 56px; flex-shrink: 0; }

.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
  height: calc(100vh - 56px);
}

/* LNB 사이드바 */
.lnb {
  width: 256px;
  flex-shrink: 0;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.lnb.collapsed { width: 0px; overflow: hidden; border-right: none; }

/* 콘텐츠 */
.content-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.contents-area { flex: 1; padding: 24px; overflow-y: auto; }
```

---

## 4. 공통 컴포넌트

### 카드

```html
<div class="card">
  <div class="card-title">카드 제목</div>
  <!-- 내용 -->
</div>
```

```css
.card {
  background: var(--bg2);
  border-radius: var(--radius-md);   /* 10px */
  border: 1px solid var(--border);
  padding: 20px 24px;
  box-shadow: 0 10px 28px rgba(20,37,63,0.08), 0 1px 3px rgba(20,37,63,0.05);
  margin-bottom: 20px;
}
.card-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--blue-dk);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
/* 파란 세로선 장식 */
.card-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background: var(--blue);
  border-radius: 2px;
}
```

---

### 버튼

```html
<button class="btn btn-primary">조회</button>
<button class="btn btn-accent">저장</button>
<button class="btn btn-secondary">내보내기</button>
<button class="btn btn-outline">취소</button>
```

```css
.btn {
  height: 38px;
  padding: 0 18px;
  border-radius: var(--radius-sm);   /* 7px */
  font-weight: 700;
  font-size: 13px;
  font-family: var(--font-ui);
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.btn-primary  { background: var(--blue);  color: #fff; }
.btn-primary:hover  { background: var(--blue-dk); box-shadow: 0 3px 8px rgba(26,95,180,0.3); }

.btn-accent   { background: var(--green); color: #fff; }
.btn-accent:hover   { background: var(--green-dk); box-shadow: 0 3px 8px rgba(22,163,74,0.3); }

.btn-secondary { background: #64748b; color: #fff; }
.btn-secondary:hover { background: var(--text-label); }

.btn-outline  { border: 1.5px solid var(--border); background: var(--bg2); color: var(--text); }
.btn-outline:hover { border-color: var(--blue-md); color: var(--blue); background: var(--bg); }
```

---

### 배지

```html
<span class="badge badge-success">완료</span>
<span class="badge badge-warning">검토중</span>
<span class="badge badge-danger">반려</span>
<span class="badge badge-secondary">대기</span>
```

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 500;
}
.badge-success   { background: var(--green-lt); color: var(--green-dk); }
.badge-warning   { background: var(--amber-lt); color: var(--amber-dk); }
.badge-danger    { background: var(--red-lt);   color: var(--red-dk); }
.badge-secondary { background: #f1f5f9;         color: #64748b; }
```

---

### KPI 카드

```html
<div class="kpi-row">
  <div class="kpi-card">
    <div class="kpi-label">전체 사업 수</div>
    <div class="kpi-value">142<span class="kpi-unit">건</span></div>
    <div class="kpi-sub">전년 대비 +12건</div>
  </div>
  <div class="kpi-card green"> ... </div>
  <div class="kpi-card amber"> ... </div>
  <div class="kpi-card red">   ... </div>
</div>
```

```css
.kpi-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; margin-bottom: 20px; }
.kpi-card {
  background: var(--bg2);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);   /* 색상 변형: .green .amber .red */
  box-shadow: var(--card-shadow);
}
.kpi-card.green { border-left-color: var(--green); }
.kpi-card.amber { border-left-color: var(--amber); }
.kpi-card.red   { border-left-color: var(--red); }

.kpi-label { font-size: 13px; color: var(--text-muted); font-weight: 700; margin-bottom: 6px; }
.kpi-value { font-size: 28px; font-weight: 900; color: var(--navy); line-height: 1; }
.kpi-unit  { font-size: 16px; font-weight: 500; color: var(--text-muted); margin-left: 3px; }
.kpi-sub   { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
```

---

### 탭 내비게이션

```html
<div class="tab-navigation">
  <span class="tab-nav-label">사업 관리</span>
  <div class="tabs-wrapper">
    <div class="tab-item active">사업접수현황</div>
    <div class="tab-item">사업등록</div>
    <div class="tab-item">사업현황</div>
  </div>
  <div class="tab-scroll-controls">
    <button class="tab-scroll-btn">◀</button>
    <button class="tab-scroll-btn">▶</button>
  </div>
</div>
```

```css
.tab-navigation {
  height: 58px;
  background: linear-gradient(180deg, #ffffff 0%, #edf3fa 100%);
  border-bottom: 1px solid #cbd8e8;
  display: flex;
  align-items: center;
  padding: 8px 12px 8px 18px;
  gap: 12px;
  box-shadow: 0 3px 10px rgba(15,52,96,0.10);
}
.tab-item {
  height: 38px;
  padding: 0 20px;
  background: rgba(255,255,255,0.82);
  color: var(--text-label);
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.tab-item:hover {
  background: #fff;
  color: var(--blue-dk);
  border-color: var(--blue-md);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(15,52,96,0.10);
}
.tab-item.active {
  background: var(--navy);
  color: #fff;
  font-weight: 600;
  border-color: var(--navy);
  box-shadow: 0 6px 14px rgba(15,52,96,0.24);
  position: relative;
}
/* 활성 탭 하단 amber 밑줄 */
.tab-item.active::after {
  content: '';
  position: absolute;
  left: 16px; right: 16px; bottom: -9px;
  height: 3px;
  border-radius: 999px;
  background: var(--amber);
}
```

---

### 페이지네이션

```html
<div class="table-footer">
  <span>총 142건</span>
  <div class="pagination">
    <button class="page-btn">«</button>
    <button class="page-btn">‹</button>
    <button class="page-btn active">1</button>
    <button class="page-btn">2</button>
    <button class="page-btn">3</button>
    <button class="page-btn">›</button>
    <button class="page-btn">»</button>
  </div>
</div>
```

```css
.page-btn {
  min-width: 32px; height: 32px; padding: 0 8px;
  border: 1.5px solid var(--border);
  background: var(--bg2); color: var(--text-muted);
  border-radius: var(--radius-sm);
  font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.15s;
}
.page-btn:hover  { border-color: var(--blue-md); color: var(--blue); }
.page-btn.active { background: var(--blue); color: #fff; border-color: var(--blue); }
```

---

## 5. 폼 패턴

### 검색 폼

```html
<div class="card">
  <div class="card-title">조회 조건</div>
  <div class="search-grid">
    <div class="form-group">
      <label>사업명</label>
      <input class="form-control" type="text" placeholder="사업명 입력">
    </div>
    <div class="form-group">
      <label>접수 기간</label>
      <div style="display:flex; gap:6px; align-items:center;">
        <input class="form-control" type="date" style="flex:1">
        <span style="color:var(--text-muted)">~</span>
        <input class="form-control" type="date" style="flex:1">
      </div>
      <div style="display:flex; gap:4px; margin-top:4px;">
        <button class="date-preset-btn">오늘</button>
        <button class="date-preset-btn">1주</button>
        <button class="date-preset-btn">1개월</button>
        <button class="date-preset-btn active">3개월</button>
      </div>
    </div>
    <div class="form-group">
      <label>상태</label>
      <select class="form-control">
        <option value="">전체</option>
        <option>접수</option>
        <option>검토중</option>
      </select>
    </div>
  </div>
  <div style="display:flex; gap:8px; margin-top:16px; justify-content:flex-end;">
    <button class="btn btn-outline">초기화</button>
    <button class="btn btn-primary">🔍 조회</button>
  </div>
</div>
```

```css
.search-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; align-items: end; }
.form-group  { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-weight: 600; font-size: 13px; color: var(--text-label); }
.form-group label .required { color: var(--red); margin-left: 2px; }

.form-control {
  height: 38px; padding: 0 12px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 13px; background: var(--bg2); color: var(--text);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-control:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,95,180,0.16); outline: none; }

.date-preset-btn {
  height: 32px; padding: 0 10px; font-size: 13px;
  border: 1.5px solid var(--border); background: var(--bg2);
  color: var(--text-muted); border-radius: var(--radius-sm); cursor: pointer;
  transition: all 0.15s;
}
.date-preset-btn:hover  { border-color: var(--blue-md); color: var(--blue); }
.date-preset-btn.active { background: var(--blue); color: #fff; border-color: var(--blue); }
```

### 등록/수정 폼

```html
<div class="card">
  <div class="card-title">기본 정보</div>
  <div class="form-row">
    <div class="form-group">
      <label>사업명 <span class="required">*</span></label>
      <input class="form-control" type="text">
    </div>
    <div class="form-group">
      <label>사업 유형</label>
      <div class="radio-group">
        <label class="radio-item"><input type="radio" name="type" checked> 신규</label>
        <label class="radio-item"><input type="radio" name="type"> 계속</label>
      </div>
    </div>
  </div>
  <div style="display:flex; gap:8px; justify-content:flex-end;">
    <button class="btn btn-outline">취소</button>
    <button class="btn btn-accent">저장</button>
  </div>
</div>
```

```css
.form-row   { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 20px; }
.radio-group { display: flex; gap: 20px; height: 38px; align-items: center; }
.radio-item  { display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13px; }
.radio-item input { accent-color: var(--blue); width: 16px; height: 16px; }
```

---

## 6. 테이블 패턴

```html
<div class="table-container">
  <table class="data-table">
    <thead>
      <tr>
        <th style="width:50px">No</th>
        <th>사업명</th>
        <th style="width:100px">상태</th>
        <th style="width:120px">등록일</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>○○ 사업</td>
        <td><span class="badge badge-success">완료</span></td>
        <td>2026-06-20</td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.table-container { width: 100%; overflow-x: auto; margin-top: 8px; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; }
.data-table th {
  background: #f1f5f9; color: var(--text-label); font-weight: 700;
  padding: 11px 16px; border-bottom: 2px solid var(--border); white-space: nowrap;
}
.data-table td { padding: 11px 16px; border-bottom: 1px solid var(--border); color: var(--text); }
.data-table tbody tr:hover { background: #f8faff; }
```

---

## 7. 모달 패턴

```html
<!-- 중앙 모달 -->
<div class="modal-overlay" id="overlay"></div>
<div class="modal" id="my-modal">
  <div class="modal-header">
    <h3>모달 제목</h3>
    <button class="modal-close" onclick="closeModal()">✕</button>
  </div>
  <div class="modal-body">
    <!-- 내용 -->
  </div>
  <div class="modal-footer">
    <button class="btn btn-outline" onclick="closeModal()">취소</button>
    <button class="btn btn-accent">확인</button>
  </div>
</div>
```

```css
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1999;
  opacity: 0; pointer-events: none;
  transition: opacity 0.2s ease;
}
.modal-overlay.open { opacity: 1; pointer-events: auto; }

.modal {
  position: fixed; top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 520px; max-width: 90%; max-height: 80vh;
  background: var(--bg2);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 30px rgba(0,0,0,0.25);
  z-index: 2000;
  display: flex; flex-direction: column; overflow: hidden;
  opacity: 0; pointer-events: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal.open { transform: translate(-50%, -50%) scale(1); opacity: 1; pointer-events: auto; }

.modal-header {
  padding: 14px 18px;
  background: var(--navy); color: #fff;
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}
.modal-header h3 { font-size: 15px; font-weight: 700; margin: 0; }
.modal-close { background: none; border: none; color: #fff; font-size: 22px; cursor: pointer; opacity: 0.8; line-height: 1; }
.modal-close:hover { opacity: 1; }
.modal-body   { padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.6; }
.modal-footer { padding: 12px 20px; border-top: 1px solid var(--border); display: flex; gap: 8px; justify-content: flex-end; flex-shrink: 0; }
```

---

## 8. 차트 스타일

### SVG 라인 차트

```css
.chart-grid-line { stroke: var(--border); stroke-dasharray: 4,4; }
.chart-line      { stroke: var(--blue); stroke-width: 3; fill: none; }
.chart-point     { fill: var(--navy); stroke: #fff; stroke-width: 2.5; cursor: pointer; transition: r 0.2s, fill 0.2s; }
.chart-point:hover { r: 8; fill: var(--amber); }
```

### 도넛 차트

```css
.stat-donut-chart {
  width: 140px; height: 140px; border-radius: 50%;
  box-shadow: var(--card-shadow);
  border: 4px solid var(--bg2);
}
```

### 툴팁

```css
.chart-tooltip {
  position: absolute;
  background: var(--navy); color: #fff;
  padding: 6px 12px; border-radius: 4px;
  font-size: 12px; font-weight: 700;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  pointer-events: none; display: none;
}
```

### 막대 차트 (수평)

```css
.stat-bar-outer {
  height: 24px; background: var(--bg); border: 1px solid var(--border);
  border-radius: 6px; overflow: hidden;
}
.stat-bar-inner {
  height: 100%; display: flex; align-items: center;
  justify-content: flex-end; padding-right: 12px;
  color: #fff; font-size: 13px; font-weight: 700;
}
```

---

## 9. 인터랙션 원칙

| 원칙 | 명세 |
|------|------|
| transition 기본 | `all 0.15s ease` (버튼·탭·메뉴) |
| 미세 상승 hover | `translateY(-1px)` 카드/버튼, `translateY(-2px)` FAB |
| 포커스 접근성 | `outline: 2px solid rgba(26,95,180,0.35); outline-offset: 2px` |
| 스크롤바 스타일 | 너비 4–6px, track 투명, thumb `#c8d4e0`, border-radius 3px |
| 애니메이션 easing | 열기: `cubic-bezier(0.16, 1, 0.3, 1)` / 닫기: `ease` |
| 메뉴 접기 | `max-height: 0 ↔ 600px`, `cubic-bezier(0,1,0,1)` |

---

## 10. 다크 모드

```css
/* 토글: document.body.classList.toggle('dark') */
body.dark {
  --bg:          #0f172a;
  --bg2:         #1e293b;
  --text:        #f8fafc;
  --text-muted:  #cbd5e1;
  --text-label:  #cbd5e1;
  --border:      #334155;
  --sidebar-bg:  #0f172a;
  --navy:        #38bdf8;
  --blue:        #60a5fa;
  --blue-lt:     #1e3a8a;
  --blue-dk:     #93c5fd;
  --green:       #4ade80;
  --green-lt:    #064e3b;
  --green-dk:    #a7f3d0;
  --amber:       #fbbf24;
  --amber-lt:    #78350f;
  --amber-dk:    #fde68a;
  --red:         #f87171;
  --red-lt:      #7f1d1d;
  --red-dk:      #fca5a5;
}
body.dark .header      { background-color: #0b0f19; }
body.dark .tab-navigation {
  background: linear-gradient(180deg, #1e293b 0%, #111827 100%);
  border-bottom-color: #334155;
}
body.dark .data-table th { background-color: #0f172a; color: #94a3b8; }
```

---

## 11. 전체 CSS 변수

아래 블록을 모든 HTML 파일의 `<style>` 최상단에 붙여넣어 사용한다.

```css
:root {
  --blue:      #2563eb;
  --blue-lt:   #e8f1ff;
  --blue-md:   #93c5fd;
  --blue-dk:   #1d4ed8;
  --navy:      #123047;

  --green:     #059669;
  --green-lt:  #e7f8f1;
  --green-md:  #6ee7b7;
  --green-dk:  #047857;

  --amber:     #d97706;
  --amber-lt:  #fff4dc;
  --amber-md:  #fbbf24;
  --amber-dk:  #92400e;

  --red:       #dc2626;
  --red-lt:    #fee2e2;
  --red-md:    #fca5a5;
  --red-dk:    #991b1b;

  --purple:    #5e35b1;
  --purple-lt: #ede7f6;
  --purple-md: #b39ddb;

  --bg:          #eef3f8;
  --bg2:         #ffffff;
  --text:        #172033;
  --text-muted:  #637083;
  --text-label:  #405063;
  --border:      #d8e0ea;
  --sidebar-bg:  #ffffff;
  --footer-bg:   #1e293b;

  --card-shadow: 0 10px 28px rgba(20,37,63,0.08), 0 1px 3px rgba(20,37,63,0.05);
  --font-ui:     'Noto Sans KR', sans-serif;
  --radius-sm:   7px;
  --radius-md:   10px;
}
```

---

## AI에게 주는 지시사항

> 이 문서를 참조하여 HTML/CSS 결과물을 생성할 때 반드시 아래 규칙을 따른다.

1. **색상**: 이 문서의 CSS 변수 체계를 그대로 사용한다. 임의의 hex 값 사용 금지.
2. **폰트**: `Noto Sans KR`을 Google Fonts로 임포트하고 `--font-ui` 변수로 참조한다.
3. **레이아웃**: Header(56px) → 좌측 LNB(256px) + 우측 콘텐츠 구조를 기본으로 한다.
4. **카드**: 모든 콘텐츠 섹션은 `.card` + `.card-title` 패턴으로 감싼다.
5. **버튼**: 주요 액션은 `.btn-primary`, 저장은 `.btn-accent`, 취소는 `.btn-outline`.
6. **인터랙션**: 모든 클릭 가능 요소에 `transition: all 0.15s ease` 적용.
7. **다크 모드**: `body.dark` 클래스 토글 방식으로 구현한다.
8. **반응형**: `grid: repeat(auto-fit, minmax(...))` 패턴 사용.
9. **접근성**: `focus-visible` 스타일과 `aria-*` 속성을 누락하지 않는다.
10. **한국어 최적화**: `word-break: keep-all`을 제목/본문에 적용한다.
