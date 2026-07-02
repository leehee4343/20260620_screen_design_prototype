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
9. [아이콘 시스템](#9-아이콘-시스템)
10. [특수 화면 패턴](#10-특수-화면-패턴)
11. [인터랙션 원칙](#11-인터랙션-원칙)
12. [다크 모드](#12-다크-모드)
13. [전체 CSS 변수 (복사 즉시 사용)](#13-전체-css-변수)

---

## 1. 색상 시스템

> **주의**: 아래 값이 실제 index.html에서 사용 중인 확정값이다. 임의로 변경하지 말 것.

### 브랜드 팔레트

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--navy` | `#0F3460` | 헤더 배경, active 탭, 모달 헤더, 페이지 제목 |
| `--blue` | `#1a5fb4` | Primary 버튼, 포커스, 링크, 강조 |
| `--blue-lt` | `#dde8f8` | Active 메뉴 배경, hover 배경 |
| `--blue-md` | `#7db0e8` | 보더 hover, 아이콘 accent |
| `--blue-dk` | `#103d80` | 버튼 hover, 카드 제목, 링크 hover |
| `--amber` | `#f5870a` | Accent, 탭 활성 밑줄, FAB, auth-btn active |
| `--amber-lt` | `#fff1e0` | 경고 배지 배경 |
| `--amber-md` | `#ffb35c` | amber 중간 톤 |
| `--amber-dk` | `#c2660a` | 경고 배지 텍스트 |
| `--green` | `#16a34a` | 저장/등록 버튼(btn-accent), 성공 배지 |
| `--green-lt` | `#e3f9ed` | 성공 배지 배경 |
| `--green-md` | `#7fe0ac` | green 중간 톤 |
| `--green-dk` | `#0d7a3a` | 버튼 hover |
| `--red` | `#ef4444` | 필수 표시, 오류 |
| `--red-lt` | `#fdecec` | 오류 배지 배경 |
| `--red-md` | `#fca5a5` | red 중간 톤 |
| `--red-dk` | `#c0291a` | 오류 배지 텍스트 |
| `--purple` | `#5e35b1` | 보조 accent |
| `--purple-lt` | `#ede7f6` | purple 배경 |
| `--purple-md` | `#b39ddb` | purple 중간 톤 |

### 서피스 팔레트

| 토큰 | 라이트 모드 | 다크 모드 |
|------|------------|----------|
| `--bg` | `#f5f7fa` | `#0f172a` |
| `--bg2` | `#ffffff` | `#1e293b` |
| `--text` | `#2d3748` | `#f8fafc` |
| `--text-muted` | `#64748b` | `#cbd5e1` |
| `--text-label` | `#475569` | `#cbd5e1` |
| `--border` | `#e2e8f0` | `#334155` |
| `--sidebar-bg` | `#eef1f6` | `#0f172a` |
| `--footer-bg` | `#1e293b` | — |

### 헤더 전용 색상 (CSS 변수 없음, 직접 사용)

| 용도 | 값 |
|------|----|
| 헤더 하위 텍스트 | `#cdd9e8` |
| 권한 레이블 | `#90adc8` |
| 로그아웃 버튼 | `#ff9e9e` (hover: `#ff6b6b`) |
| 비활성 auth-btn | `rgba(255,255,255,0.1)` / `rgba(255,255,255,0.5)` |

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
  font-family: 'Noto Sans KR', sans-serif;  /* var(--font-ui) */
  font-size: 15px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
/* 모든 폼 요소도 동일 폰트 적용 */
button, input, select, textarea { font-family: var(--font-ui); }
```

### 크기 스케일

| 역할 | 크기 | 굵기 | 색상 |
|------|------|------|------|
| 페이지 제목 (breadcrumb-title) | 20px | 700 | `--navy` |
| 카드 제목 | 15px | 700 | `--blue-dk` |
| 섹션 헤더 | 14px | 700 | `--text` |
| 본문 기본 | 15px | 400 | `--text` |
| 보조 텍스트 | 14px | 400 | `--text-muted` |
| 소형 라벨 | 13px | 600 | `--text-label` |
| 배지/버튼 | 13px | 500–700 | — |
| 메타 정보 | 13px | 400 | `--text-muted` |
| 보조 주석 (최소) | **13px** | 400 | `--text-muted` |
| KPI 숫자 | 28px | 900 | `--navy` |
| 로그인 메인 카피 | 36px | 800 | `--navy` |

> ⚠️ **최소 폰트 기준: 13px**
> 이 프로젝트의 모든 UI 텍스트는 `13px` 미만을 절대 사용하지 않는다.
> `12px`, `11px`, `10px` 등 13px 미만 값은 금지. 가장 작은 보조 주석도 `13px`로 작성한다.

### 한국어 최적화

```css
/* 줄바꿈 제어 - 제목/본문에 적용 */
word-break: keep-all;
```

---

## 3. 레이아웃 구조

```
┌──────────────────────────────────────────────────┐
│  [A] 헤더 (height: 56px, bg: --navy)             │
│  토글 | 로고 | 시스템명          사용자 | 권한 | 🌙  │
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

/* [A] 헤더 */
.header {
  height: 56px;
  background-color: var(--navy);
  color: #ffffff;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px;
  z-index: 100;
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
  flex-shrink: 0;
}

.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
  height: calc(100vh - 56px);
}

/* [B] LNB 사이드바 */
.lnb {
  width: 256px;
  background-color: var(--sidebar-bg);   /* #eef1f6 */
  border-right: 1px solid var(--border);
  flex-shrink: 0;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s;
}
.lnb.collapsed { width: 0px !important; border-right: none; overflow: hidden; }

/* 콘텐츠 패널 */
.content-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: var(--bg); }
.contents-area { flex: 1; padding: 24px; overflow-y: auto; }
```

### 브레드크럼 바

```css
.breadcrumb-bar {
  padding: 10px 24px;
  background-color: var(--bg2);
  display: flex; align-items: center; justify-content: space-between;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.breadcrumb-title { font-size: 20px; font-weight: 700; color: var(--navy); }
.breadcrumb-path  { font-size: 14px; color: var(--text-muted); }
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
  background-color: var(--bg2);
  border-radius: var(--radius-md);   /* 8px */
  border: 1px solid var(--border);
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(15,23,42,0.07), 0 1px 2px rgba(15,23,42,0.04);
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

> ⚠️ **버튼 높이 규칙**
> 1. 모든 버튼의 `height`는 **28px 미만 금지**.
> 2. **같은 행에 나란히 배치된 버튼은 반드시 동일한 height를 사용한다.** 역할·색상·중요도가 달라도 높이는 동일해야 정렬이 유지된다.
>
> | 용도 | height | padding | font-size |
> |------|--------|---------|-----------|
> | 기본 버튼 (폼 제출 등) | 38px | `0 18px` | 13px |
> | 툴바 소형 버튼 (카드 헤더·테이블 위 행) | **32px** | `0 12px` | 13px |
> | 주요 액션 툴바 버튼 (accent/primary, 텍스트 길 때) | **32px** | `0 14px` | 13px |
> | 테이블 내 소형 버튼 (최소) | **28px** | `0 8px` | 13px |
>
> **툴바 행 버튼 예시** — 같은 행이면 모두 `height:32px` 통일:
> ```html
> <!-- ✅ 올바른 예: 같은 행 버튼 모두 height:32px -->
> <div style="display:flex; gap:8px;">
>   <button class="btn btn-outline" style="height:32px; padding:0 12px; font-size:13px;">삭제</button>
>   <button class="btn btn-outline" style="height:32px; padding:0 12px; font-size:13px;">엑셀 다운로드</button>
>   <button class="btn btn-accent"  style="height:32px; padding:0 14px; font-size:13px;">그룹 추가하기</button>
> </div>
>
> <!-- ❌ 금지: height 혼재 -->
> <div style="display:flex; gap:8px;">
>   <button class="btn btn-outline">삭제</button>                              <!-- 38px 기본 -->
>   <button class="btn btn-outline" style="height:32px;">엑셀 다운로드</button> <!-- 32px -->
>   <button class="btn btn-accent">그룹 추가하기</button>                       <!-- 38px 기본 -->
> </div>
> ```

```html
<button class="btn btn-primary">조회</button>
<button class="btn btn-accent">저장</button>
<button class="btn btn-secondary">내보내기</button>
<button class="btn btn-outline">취소</button>

<!-- 테이블 내 소형 버튼 (최소 사이즈) -->
<button class="btn btn-outline" style="height:28px; padding:0 8px; font-size:13px;">상세보기</button>
```

```css
.btn {
  height: 38px;
  padding: 0 18px;
  border-radius: var(--radius-sm);   /* 6px */
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
.btn-primary  { background-color: var(--blue);  color: #fff; }
.btn-primary:hover  { background-color: var(--blue-dk); box-shadow: 0 3px 8px rgba(26,95,180,0.3); }

.btn-accent   { background-color: var(--green); color: #fff; }
.btn-accent:hover   { background-color: var(--green-dk); box-shadow: 0 3px 8px rgba(22,163,74,0.3); }

.btn-secondary { background-color: #64748b; color: #fff; }
.btn-secondary:hover { background-color: var(--text-label); }

.btn-outline  { border: 1.5px solid var(--border); background-color: var(--bg2); color: var(--text); }
.btn-outline:hover { background-color: var(--bg); border-color: var(--blue-md); color: var(--blue); }
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
.badge-success   { background-color: var(--green-lt); color: var(--green-dk); }
.badge-warning   { background-color: var(--amber-lt); color: var(--amber-dk); }
.badge-danger    { background-color: var(--red-lt);   color: var(--red-dk); }
.badge-secondary { background-color: #f1f5f9;         color: #64748b; }
```

#### 테이블 상태 배지 (`badge-status-*`)

**테이블 `<td>` 내 상태 표시에는 반드시 `badge-status-*` 변형을 사용한다.**
배경색으로 상태를 구분하되, 텍스트 색상은 `var(--text)` (#2d3748) 고정.

```html
<!-- ✅ 테이블 상태 배지 올바른 사용 -->
<span class="badge badge-status-success">사용</span>
<span class="badge badge-status-warning">검토중</span>
<span class="badge badge-status-danger">중지</span>
<span class="badge badge-status-secondary">미게시</span>
```

```css
/* 복합 선택자(명시도 0,2,0)로 .badge(0,1,0)의 font-weight:500을 항상 덮어씌움 */
.badge.badge-status-success   { background-color: var(--green-lt); color: var(--text); font-weight: 400; }
.badge.badge-status-warning   { background-color: var(--amber-lt); color: var(--text); font-weight: 400; }
.badge.badge-status-danger    { background-color: var(--red-lt);   color: var(--text); font-weight: 400; }
.badge.badge-status-secondary { background-color: #f1f5f9;         color: var(--text); font-weight: 400; }
```

| 클래스 | 배경색 | 텍스트 | 사용 예 |
|---|---|---|---|
| `badge-status-success` | 연초록 | `var(--text)` | 사용, 게시, 정상, 접수완료, 진행중 |
| `badge-status-warning` | 연노랑 | `var(--text)` | 검토중, 완료예정, 진행중, 우선노출 |
| `badge-status-danger`  | 연빨강 | `var(--text)` | 중지, 폐업, 보완요청 |
| `badge-status-secondary` | 연회색 | `var(--text)` | 미게시, 대기, 준비중 |

> **주의**: `badge-success/warning/danger/secondary` (색상 텍스트 버전)는 통계 카드 상단의 요약 레이블 등 테이블 외부의 일반 배지에만 사용한다.

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
  border-left: 4px solid var(--blue);
  box-shadow: 0 1px 3px rgba(15,23,42,0.07), 0 1px 2px rgba(15,23,42,0.04);
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
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px 8px 18px;
  gap: 12px;
  box-shadow: 0 3px 10px rgba(15,52,96,0.10);
}
/* 메뉴명 라벨 (앰버 도트 포함) */
.tab-nav-label {
  display: inline-flex; align-items: center; gap: 7px;
  height: 34px; padding: 0 12px; border-radius: 6px;
  background-color: rgba(15,52,96,0.08);
  color: var(--navy); font-size: 13px; font-weight: 800;
  border: 1px solid rgba(15,52,96,0.12);
}
.tab-nav-label::before {
  content: '';
  width: 7px; height: 7px; border-radius: 50%;
  background-color: var(--amber);
  box-shadow: 0 0 0 3px rgba(245,135,10,0.18);
}

.tab-item {
  height: 38px; padding: 0 20px;
  background-color: rgba(255,255,255,0.82);
  color: var(--text-label);
  border: 1px solid #cbd5e1; border-radius: 7px;
  font-size: 14px; font-weight: 400;
  transition: all 0.15s ease;
  white-space: nowrap; position: relative;
}
.tab-item:hover {
  background-color: #ffffff; color: var(--blue-dk);
  border-color: var(--blue-md); transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(15,52,96,0.10);
}
.tab-item.active {
  background-color: var(--navy); color: #ffffff;
  font-weight: 600; border-color: var(--navy);
  box-shadow: 0 6px 14px rgba(15,52,96,0.24);
}
/* 활성 탭 하단 amber 밑줄 */
.tab-item.active::after {
  content: '';
  position: absolute; left: 16px; right: 16px; bottom: -9px;
  height: 3px; border-radius: 999px;
  background-color: var(--amber);
}

.tab-scroll-btn {
  width: 34px; height: 34px;
  border: 1px solid #cbd5e1; background-color: #ffffff;
  border-radius: 6px; color: var(--navy); font-size: 13px;
  transition: all 0.15s;
}
.tab-scroll-btn:hover { background-color: var(--navy); color: #ffffff; border-color: var(--navy); }
```

---

### 게시물 수 표시 + 페이지네이션 (표준 패턴)

모든 목록 화면의 테이블 상단/하단은 **아래 구조를 반드시 따른다.**

| 위치 | 내용 | 규칙 |
|------|------|------|
| 테이블 **상단 왼쪽** | 전체 건수 + 현재 페이지 | `<strong>`으로 숫자 강조, 툴바 버튼과 같은 flex 행에 배치 |
| 테이블 **하단 가운데** | 페이지 버튼들 | `.table-footer` 3열 그리드(빈칸 \| 페이징 \| 빈칸)로 가운데 정렬 |

```html
<!-- ✅ 표준 패턴 — 툴바 행: 게시물 수(왼쪽) + 버튼(오른쪽) -->
<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
  <div style="font-size:13px; color:var(--text-muted);">
    전체 <strong id="XXX-total" style="color:var(--blue);">0</strong>건 &nbsp;|&nbsp;
    현재 <strong id="XXX-current-page" style="color:var(--text);">1/1</strong> 페이지
  </div>
  <div style="display:flex; gap:8px;">
    <!-- 툴바 버튼들 -->
  </div>
</div>

<!-- 테이블 본문 -->
<div class="table-container">...</div>

<!-- ✅ 표준 footer — 페이징 가운데 정렬 -->
<div class="table-footer" style="margin-top:20px; border-top:1px solid var(--border); padding-top:14px;">
  <div></div>
  <div class="pagination" id="XXX-pagination"></div>
  <div></div>
</div>
```

> **주의**: `.table-footer`는 `display:flex; justify-content:space-between` 레이아웃이므로
> 반드시 `<div></div>` 빈 칸 2개를 포함해야 페이징이 가운데에 정렬된다.
> `<div class="pagination">` 하나만 넣으면 왼쪽 정렬됨 — **금지**.

```html
<!-- ❌ 금지 — 빈 칸 없는 단독 pagination -->
<div class="table-footer"><div class="pagination" id="..."></div></div>

<!-- ❌ 금지 — 건수를 오른쪽 버튼 그룹에 포함 -->
<div style="display:flex; ...">
  <div class="card-title">목록</div>
  <div style="display:flex; gap:8px;">
    <span>전체 N건</span>  <!-- count가 오른쪽에 있음 -->
    <button>...</button>
  </div>
</div>
```

```css
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
}
.pagination { display: flex; gap: 4px; }
.page-btn {
  min-width: 32px; height: 32px; padding: 0 8px;
  border: 1.5px solid var(--border);
  background-color: var(--bg2); color: var(--text-muted);
  border-radius: var(--radius-sm);
  font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.15s;
}
.page-btn:hover  { border-color: var(--blue-md); color: var(--blue); }
.page-btn.active { background-color: var(--blue); color: #fff; border-color: var(--blue); }
```

---

### LNB 메뉴 (1·2 Depth)

```css
/* 1Depth */
.menu-1depth-header {
  height: 44px; padding: 0 10px 0 14px;
  display: flex; align-items: center; gap: 9px;
  font-size: 14px; font-weight: 700; color: var(--text);
  margin: 1px 8px; border-radius: 8px;
  transition: background 0.15s, color 0.15s;
}
.menu-1depth-header:hover      { background-color: rgba(26,95,180,0.07); }
.menu-1depth-header.active     { background-color: var(--blue-lt); color: var(--blue-dk); }

/* 2Depth */
.menu-2depth-list { max-height: 0; overflow: hidden; transition: max-height 0.3s cubic-bezier(0,1,0,1); }
.menu-2depth-list.open { max-height: 600px; transition: max-height 0.3s ease-in-out; }

.menu-2depth-item {
  height: 38px; padding: 0 14px 0 55px;
  display: flex; align-items: center; gap: 8px;
  color: var(--text-muted); font-size: 13px;
  margin: 1px 8px; border-radius: 8px;
  transition: background 0.15s, color 0.15s;
}
.menu-2depth-item::before { /* 5px 점 아이콘 */
  content: ''; width: 5px; height: 5px;
  border-radius: 50%; background-color: #cbd5e1; flex-shrink: 0;
}
.menu-2depth-item:hover            { background-color: rgba(26,95,180,0.07); color: var(--blue); }
.menu-2depth-item:hover::before    { background-color: var(--blue-md); }
.menu-2depth-item.active           { font-weight: 700; color: var(--blue-dk); background-color: var(--blue-lt); }
.menu-2depth-item.active::before   { background-color: var(--blue); }
```

---

### FAB (플로팅 액션 버튼)

```html
<button class="fab-btn">📋 기획 가이드</button>
```

```css
.fab-btn {
  position: fixed; bottom: 60px; right: 24px; z-index: 999;
  background-color: var(--amber); color: #ffffff;
  border: none; border-radius: var(--radius-md);
  padding: 10px 18px; font-size: 14px; font-weight: 700;
  display: flex; align-items: center; gap: 6px;
  box-shadow: 0 4px 10px rgba(245,135,10,0.35);
  transition: all 0.2s ease;
}
.fab-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 14px rgba(245,135,10,0.45); }
```

---

### 준비중 카드

```html
<div class="prep-card">
  <div class="prep-icon">🚧</div>
  <div class="prep-title">준비 중입니다</div>
  <div class="prep-desc">해당 기능은 현재 개발 중입니다.</div>
</div>
```

```css
.prep-card {
  text-align: center; padding: 80px 40px;
  background-color: var(--bg2); border-radius: var(--radius-md);
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(15,23,42,0.07), 0 1px 2px rgba(15,23,42,0.04);
  display: flex; flex-direction: column; align-items: center; gap: 14px;
}
.prep-icon  { font-size: 52px; }
.prep-title { font-size: 20px; font-weight: 700; color: var(--navy); }
.prep-desc  { font-size: 14px; color: var(--text-muted); }
```

---

### 시스템 링크 버튼 (LNB 하단)

```html
<div class="lnb-systems-container">
  <a class="system-link-btn" href="#">
    <span class="system-icon">...</span>
    연계 시스템명
  </a>
</div>
```

```css
.system-link-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 14px; border-radius: var(--radius-md);
  border: 1.5px solid var(--border); background-color: var(--bg);
  color: var(--text); font-size: 13.5px; font-weight: 700;
  text-decoration: none; transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.system-link-btn:hover {
  background-color: var(--blue-lt); border-color: var(--blue-md);
  color: var(--blue-dk); transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(26,95,180,0.08);
}
/* Google 컬러 링 아이콘 */
.system-link-btn .system-icon {
  width: 30px; height: 30px; border-radius: 50%; display: inline-flex;
  align-items: center; justify-content: center;
  background: linear-gradient(var(--bg2), var(--bg2)) padding-box,
              conic-gradient(#4285f4, #34a853, #fbbc05, #ea4335, #4285f4) border-box;
  border: 2px solid transparent;
  box-shadow: 0 4px 10px rgba(15,23,42,0.13), 0 1px 2px rgba(15,23,42,0.07);
}
```

---

### 헤더 인증 버튼 (권한 전환)

```html
<div class="auth-group-container">
  <button class="auth-btn active">관리자</button>
  <button class="auth-btn">담당자</button>
  <button class="auth-btn">열람자</button>
</div>
```

```css
.auth-btn {
  border: none; padding: 4px 12px; border-radius: 4px;
  font-size: 13px; font-weight: 700;
  background-color: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5);
  transition: all 0.2s ease; cursor: pointer;
}
.auth-btn.active {
  background-color: var(--amber); color: #ffffff;
  box-shadow: 0 2px 6px rgba(245,135,10,0.4);
}
.auth-btn:hover { filter: brightness(1.15); }
```

---

### 패널 섹션 헤더

코드관리의 대분류/중분류/소분류처럼 패널이나 컬럼을 구분하는 **섹션 타이틀 헤더**에 적용하는 규칙.

> ⚠️ **핵심 원칙**: 섹션 헤더는 아래 테이블 헤더(`#f1f5f9`)·카드 배경(흰색)과 명확히 구분되어야 한다.
> 밝은 계열 배경(`var(--sidebar-bg)`, `var(--bg2)`, `#eef1f6` 등)은 테이블 헤더와 색차가 없어 **사용 금지**.
> 반드시 **어두운 배경 + 흰 텍스트** 조합으로 시각적 계층을 만든다.

```html
<!-- ✅ 올바른 패널 섹션 헤더 -->
<div style="display:flex; align-items:center; justify-content:space-between;
            padding:10px 12px;
            background:var(--navy); border-bottom:1px solid rgba(255,255,255,0.12);
            font-size:13px; font-weight:600; color:#ffffff;">
  <span>대분류</span>
  <span class="badge" style="background:rgba(255,255,255,0.18); color:#fff; font-size:13px; font-weight:400;">15건</span>
</div>

<!-- ❌ 금지 — 밝은 배경으로는 테이블 헤더와 구분 불가 -->
<div style="background:var(--sidebar-bg); color:var(--navy); ...">대분류</div>
<div style="background:var(--bg2); color:var(--navy); ...">대분류</div>
```

| 속성 | 값 |
|---|---|
| 배경색 | `var(--navy)` (`#0F3460`) |
| 텍스트 색 | `#ffffff` |
| 폰트 크기 | `13px` |
| 폰트 굵기 | `600` |
| 패딩 | `10px 12px` |
| 하단 구분선 | `1px solid rgba(255,255,255,0.12)` |
| 내부 배지 (건수 표시) | `background:rgba(255,255,255,0.18); color:#fff; font-weight:400;` |

---

## 5. 폼 패턴

### 검색 폼

> ⚠️ **규칙: 검색 조건은 반드시 1개 조건당 1줄(행)로 세로 나열한다.**
> 한 행에 검색 조건을 2개 이상 나란히 배치하는 다열 그리드는 **절대 사용하지 않는다.**
> `.form-row`, `.search-grid` 등 `grid-template-columns: repeat(auto-fit, ...)` 방식의
> 다열 레이아웃 클래스는 검색 영역에 **금지**되며, 프로젝트 CSS에서도 제거되었다(재도입 금지).
>
> **행 구조**: `<label>`은 고정 너비(기본 `130px`, 좁은 팝업 등은 `90px`) + `flex-shrink:0`,
> 나머지 컨트롤 영역은 같은 행에서 오른쪽으로 이어진다. 여러 화면(공통관리 전체, 통계 등)에서
> 이미 이 패턴을 따르고 있으며, 신규 화면도 반드시 이 구조를 그대로 사용한다.

```html
<div class="card search-card">
  <div class="card-title">검색 조건</div>
  <div style="display:flex; flex-direction:column; gap:12px;">
    <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
      <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">접수 기간</label>
      <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
        <div class="date-presets" style="display:flex; gap:4px; margin-right:4px;">
          <button type="button" class="date-preset-btn">오늘</button>
          <button type="button" class="date-preset-btn">1주</button>
          <button type="button" class="date-preset-btn">1개월</button>
          <button type="button" class="date-preset-btn active">3개월</button>
        </div>
        <input class="form-control" type="date" style="width:150px;">
        <span style="color:var(--text-muted)">~</span>
        <input class="form-control" type="date" style="width:150px;">
      </div>
    </div>
    <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
      <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">상태</label>
      <select class="form-control" style="width:220px;">
        <option value="">전체</option>
        <option>접수</option>
        <option>검토중</option>
      </select>
    </div>
    <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
      <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">사업명</label>
      <input class="form-control" type="text" style="width:500px; max-width:100%;" placeholder="사업명 입력">
    </div>
  </div>
  <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px; border-top:1px solid var(--border); padding-top:16px;">
    <button class="btn btn-primary">🔍 검색</button>
    <button class="btn btn-outline">초기화</button>
  </div>
</div>
```

```html
<!-- ❌ 금지 — 한 행에 조건 2개 이상(다열 그리드) -->
<div class="form-row">
  <div class="form-group"><label>접수 기간</label>...</div>
  <div class="form-group"><label>상태</label>...</div>
</div>
```

```css
.form-group  { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-weight: 600; font-size: 13px; color: var(--text-label); }
.form-group label .required { color: var(--red); margin-left: 2px; }

.form-control {
  height: 38px; padding: 0 12px;
  border: 1.5px solid var(--border); border-radius: var(--radius-sm);
  font-size: 13px; font-family: var(--font-ui);
  background: var(--bg2); color: var(--text); outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-control:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,95,180,0.16); }

/* 날짜 간편선택 */
.date-preset-btn {
  height: 32px; padding: 0 10px; font-size: 13px; font-weight: 500;
  border: 1.5px solid var(--border); background-color: var(--bg2);
  color: var(--text-muted); border-radius: var(--radius-sm);
  cursor: pointer; transition: all 0.15s ease;
}
.date-preset-btn:hover  { border-color: var(--blue-md); color: var(--blue); }
.date-preset-btn.active { background-color: var(--blue); color: #fff; border-color: var(--blue); }
```

### 등록/수정 폼

> **규칙**: 등록·수정·상세 화면의 입력 필드는 **반드시 1열** 세로 나열로 구성한다.
> `form-row`(2열 그리드)나 `grid-template-columns: 1fr 1fr` 사용 금지.

```html
<div class="card">
  <div class="card-title">기본 정보</div>
  <div style="display:flex; flex-direction:column; gap:16px;">
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
  <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:24px; padding-top:16px; border-top:1px solid var(--border);">
    <button class="btn btn-outline">취소</button>
    <button class="btn btn-accent">저장</button>
  </div>
</div>
```

```css
/* 등록/수정 폼: 1열 세로 나열 (2열 금지) */
.form-group  { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-weight: 600; font-size: 13px; color: var(--text-label); }
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
  background-color: #f1f5f9; color: var(--text-label); font-weight: 700;
  padding: 11px 16px; border-bottom: 2px solid var(--border); white-space: nowrap;
}
.data-table td { padding: 11px 16px; border-bottom: 1px solid var(--border); color: var(--text); }
.data-table tbody tr:hover { background-color: #f8faff; }
```

> ⚠️ **테이블 텍스트 규칙 (반드시 준수)**
>
> | 항목 | 규칙 |
> |---|---|
> | 폰트 색상 | **`#2d3748` 통일** — `color:var(--text-muted)` 등 인라인 color 지정 금지 |
> | 폰트 크기 | **13px 통일** — 인라인 `font-size` 지정 금지, CSS 상속으로 처리 |
> | Bold | **금지** — `font-weight:500/700/bold`, `<strong>` 사용 불가. 배지 포함 모든 `<td>` 텍스트는 `font-weight:400` 고정 |
> | 색상 링크 | **금지** — `<a style="color:var(--blue);">` 불가, 반드시 `style="color:inherit; text-decoration:none;"` |
> | 상태 표시 | **`.badge-status-*` 컴포넌트만 허용** — `badge-success/warning/danger/secondary` 직접 사용 금지 |
> | `<td>` 내 버튼 | **동일 규칙 적용** — `color:#2d3748; font-size:13px; font-weight:400;` |
> | 선택된 행 강조 | **`<tr>` 배경색만 허용** — `<td>` 텍스트에 `font-weight` 또는 `color` 인라인 변경 금지 |
>
> ```html
> <!-- ✅ 올바른 예 -->
> <td>텍스트</td>
> <td style="text-align:center;"><span class="badge badge-status-success">완료</span></td>
> <td><a href="#" style="color:inherit; text-decoration:none;" onclick="...">제목</a></td>
> <td><button class="btn btn-outline" style="height:28px; padding:0 8px; font-size:13px;">상세보기</button></td>
>
> <!-- ✅ 선택된 행 강조 — tr 배경색만 사용 -->
> <tr style="${active ? 'background:var(--blue-lt);' : ''}">
>   <td>${item.name}</td>  <!-- td 텍스트 스타일 변경 금지 -->
> </tr>
>
> <!-- ❌ 금지 예 -->
> <td style="color:var(--text-muted);">텍스트</td>
> <td style="font-size:14px;">텍스트</td>
> <td><a href="#" style="color:var(--blue);">제목</a></td>
> <td><button style="font-size:14px; color:var(--red-dk);">삭제</button></td>
> <td style="font-weight:700; color:var(--navy);">${item.name}</td>  <!-- 선택 강조에 td 스타일 금지 -->
> ```
>
> CSS 안전망: `.data-table td { color: var(--text); }` `.data-table td .btn { color: var(--text); font-size: 13px; font-weight: 400; }`

---

## 7. 모달 패턴

### 중앙 모달 (기본형)

```html
<div class="manual-modal-overlay" id="overlay"></div>
<div class="manual-modal" id="my-modal">
  <div class="manual-modal-header">
    <h3>모달 제목</h3>
    <button class="manual-modal-close">✕</button>
  </div>
  <div class="manual-modal-body">
    <!-- 내용 -->
  </div>
  <div class="modal-footer">
    <button class="btn btn-outline">취소</button>
    <button class="btn btn-accent">확인</button>
  </div>
</div>
```

```css
/* 오버레이 */
.manual-modal-overlay {
  position: fixed; inset: 0;
  background-color: rgba(0,0,0,0.4); z-index: 1999;
  opacity: 0; pointer-events: none;
  transition: opacity 0.2s ease;
}
.manual-modal-overlay.open { opacity: 1; pointer-events: auto; }

/* 모달 */
.manual-modal {
  position: fixed; top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 520px; max-width: 90%; max-height: 80vh;
  background-color: var(--bg2); border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 30px rgba(0,0,0,0.25);
  z-index: 2000; display: flex; flex-direction: column; overflow: hidden;
  opacity: 0; pointer-events: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.manual-modal.open { transform: translate(-50%, -50%) scale(1); opacity: 1; pointer-events: auto; }

/* 헤더: navy 배경 */
.manual-modal-header {
  padding: 14px 18px; background-color: var(--navy); color: #ffffff;
  display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
}
.manual-modal-header h3 { font-size: 15px; font-weight: 700; margin: 0; }
.manual-modal-close { background: none; border: none; color: #ffffff; font-size: 24px; cursor: pointer; opacity: 0.8; }
.manual-modal-close:hover { opacity: 1; }
.manual-modal-body { padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.6; }
.modal-footer { padding: 12px 20px; border-top: 1px solid var(--border); display: flex; gap: 8px; justify-content: flex-end; flex-shrink: 0; }
```

### 팝오버 모달 (우측 하단 고정형)

```css
/* FAB 기획 가이드 등 우측 하단 팝업 */
.desc-modal {
  position: fixed; bottom: 115px; right: 24px;
  width: 380px; max-height: 480px;
  background-color: var(--bg2); border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15); z-index: 1000;
  display: flex; flex-direction: column; overflow: hidden;
  transform: scale(0.9); opacity: 0; pointer-events: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.desc-modal.open { transform: scale(1); opacity: 1; pointer-events: auto; }
.desc-modal-header { padding: 12px 16px; background-color: var(--navy); color: #ffffff; }
.desc-modal-body { padding: 16px; overflow-y: auto; font-size: 14px; line-height: 1.5; }
```

---

## 8. 차트 스타일

### SVG 라인 차트

```css
.chart-grid-line { stroke: var(--border); stroke-dasharray: 4,4; }
.chart-line      { stroke: var(--blue); stroke-width: 3; fill: none; }
.chart-point     { fill: var(--navy); stroke: #ffffff; stroke-width: 2.5; cursor: pointer; transition: r 0.2s, fill 0.2s; }
.chart-point:hover { r: 8; fill: var(--amber); }
```

### 툴팁

```css
.chart-tooltip-el {
  position: absolute;
  background: var(--navy); color: #ffffff;
  padding: 6px 12px; border-radius: 4px;
  font-size: 13px; font-weight: 700;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  pointer-events: none; display: none; z-index: 1000;
}
```

### 수평 막대 차트

```css
.stat-bar-outer {
  height: 24px; background-color: var(--bg); border: 1px solid var(--border);
  border-radius: 6px; overflow: hidden;
}
.stat-bar-inner {
  height: 100%; display: flex; align-items: center;
  justify-content: flex-end; padding-right: 12px;
  color: #ffffff; font-size: 13px; font-weight: 700;
}
```

### 도넛 차트 + 범례

```html
<div class="stat-donut-container">
  <canvas class="stat-donut-chart" id="myChart"></canvas>
  <div class="stat-donut-legend">
    <div class="stat-donut-legend-item">
      <span class="stat-donut-color-dot" style="background:#1a5fb4"></span>
      항목명 (42%)
    </div>
  </div>
</div>
```

```css
.stat-donut-container { display: flex; align-items: center; gap: 30px; flex-wrap: wrap; margin: 16px 0; }
.stat-donut-chart { width: 140px; height: 140px; border-radius: 50%; flex-shrink: 0; border: 4px solid var(--bg2); }
.stat-donut-legend { display: flex; flex-direction: column; gap: 8px; }
.stat-donut-legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text); }
.stat-donut-color-dot { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }
```

### 통계 그리드 카드

```html
<div class="stat-cards-grid">
  <div class="stat-grid-card">
    <div class="stat-grid-card-num" style="color:var(--blue)">142</div>
    <div class="stat-grid-card-title">전체 사업</div>
    <div class="stat-grid-card-desc">2026년 기준</div>
  </div>
</div>
```

```css
.stat-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 16px 0; }
.stat-grid-card {
  background: var(--bg2); border: 1.5px solid var(--border);
  border-radius: var(--radius-md); padding: 16px;
  box-shadow: 0 1px 3px rgba(15,23,42,0.07), 0 1px 2px rgba(15,23,42,0.04);
}
.stat-grid-card-num   { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
.stat-grid-card-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.stat-grid-card-desc  { font-size: 13px; color: var(--text-muted); line-height: 1.5; }
```

---

## 9. 아이콘 시스템

### SVG 인라인 아이콘 (.ui-icon)

프로젝트는 외부 아이콘 라이브러리 없이 SVG를 인라인으로 삽입한다.

```html
<span class="ui-icon">
  <svg viewBox="0 0 24 24">
    <!-- stroke-based SVG path -->
  </svg>
</span>
```

```css
.ui-icon {
  width: 17px; height: 17px;
  display: inline-block; flex-shrink: 0; color: currentColor; vertical-align: -3px;
}
.ui-icon svg {
  width: 100%; height: 100%; display: block;
  stroke: currentColor; stroke-width: 2.35;
  stroke-linecap: round; stroke-linejoin: round; fill: none;
}
/* LNB 1Depth 아이콘: 더 굵게 */
.menu-1depth-icon .ui-icon { width: 20px; height: 20px; }
.menu-1depth-icon .ui-icon svg { stroke-width: 3; }
```

### 아이콘 멀티컬러 규칙 (Google 4색)

```css
/* SVG 자식 요소에 Google 4색 순환 적용 */
.ui-icon svg > *:nth-child(4n+1) { stroke: #4285f4; }
.ui-icon svg > *:nth-child(4n+2) { stroke: #34a853; }
.ui-icon svg > *:nth-child(4n+3) { stroke: #fbbc05; }
.ui-icon svg > *:nth-child(4n)   { stroke: #ea4335; }
```

### 닷 아이콘 (.icon-dot)

```css
.icon-dot {
  width: 8px; height: 8px; border-radius: 50%;
  display: inline-block; margin-right: 6px; vertical-align: 1px;
}
```

---

## 10. 특수 화면 패턴

### 로그인 화면

좌우 2-컬럼 구조: 좌측 브랜드 카피, 우측 로그인 폼.

```css
.login-screen {
  min-height: calc(100vh - 56px - 58px - 45px);
  display: grid; grid-template-columns: minmax(420px, 1fr) 390px;
  align-items: center; gap: 42px; padding: 56px 64px;
  background: linear-gradient(135deg, #f0f5ff 0%, #e8f1ff 40%, #f4f8ff 100%);
  position: relative;
}
/* 배경 그라디언트 블롭 */
.login-screen::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 18% 76%, rgba(26,95,180,0.10), transparent 34%);
  pointer-events: none;
}
/* 메인 카피 */
.login-main-copy { font-size: 36px; font-weight: 800; color: var(--navy); line-height: 1.34; word-break: keep-all; }
.login-main-copy .highlight { color: var(--blue); font-weight: 900; }
/* 로그인 카드 */
.login-card {
  padding: 28px; border-radius: var(--radius-md);
  background: rgba(255,255,255,0.94); border: 1px solid rgba(255,255,255,0.45);
  box-shadow: 0 24px 70px rgba(0,0,0,0.32);
  backdrop-filter: blur(10px);
}
/* 로그인 입력 필드 */
.login-field input {
  height: 42px; padding: 0 12px;
  border: 1.5px solid #cbd5e1; border-radius: var(--radius-sm);
  background: #ffffff; font-size: 14px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.login-field input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,95,180,0.14); }
```

---

## 11. 인터랙션 원칙

| 원칙 | 명세 |
|------|------|
| transition 기본 | `all 0.15s ease` (버튼·탭·메뉴) |
| 미세 상승 hover | `translateY(-1px)` 카드/버튼, `translateY(-2px)` FAB |
| 포커스 접근성 | `outline: 2px solid rgba(26,95,180,0.35); outline-offset: 2px` |
| 스크롤바 스타일 (LNB) | 너비 4px, track 투명, thumb `#c8d4e0`, border-radius 2px |
| 스크롤바 스타일 (콘텐츠) | 너비 6px, track 투명, thumb `#c8d4e0`, border-radius 3px |
| 애니메이션 easing | 열기: `cubic-bezier(0.16, 1, 0.3, 1)` / 닫기: `ease` |
| 메뉴 접기 | `max-height: 0 ↔ 600px`, `cubic-bezier(0,1,0,1)` |
| 한국어 줄바꿈 | `word-break: keep-all` 적용 |

---

## 12. 다크 모드

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

  --purple:      #c084fc;
  --purple-lt:   #3b0764;
  --purple-md:   #c084fc;

  --card-shadow: 0 4px 6px -1px rgba(0,0,0,0.5);
}
body.dark .header            { background-color: #0b0f19; }
body.dark .data-table th     { background-color: #0f172a; color: #94a3b8; }
body.dark .tab-navigation    {
  background: linear-gradient(180deg, #1e293b 0%, #111827 100%);
  border-bottom-color: #334155;
  box-shadow: 0 3px 10px rgba(0,0,0,0.32);
}
body.dark .tab-nav-label     { background-color: rgba(255,255,255,0.07); color: #e2e8f0; }
body.dark .tab-item          { background-color: rgba(15,23,42,0.86); color: #cbd5e1; border-color: #334155; }
body.dark .tab-item:hover    { background-color: #1e293b; color: #ffffff; border-color: #60a5fa; }
body.dark .tab-item.active   { background-color: #2563eb; border-color: #60a5fa; }
body.dark .tab-scroll-btn    { background-color: #0f172a; color: #cbd5e1; border-color: #334155; }
body.dark .tab-scroll-btn:hover { background-color: #2563eb; color: #ffffff; }
```

---

## 13. 전체 CSS 변수

아래 블록을 모든 HTML 파일의 `<style>` 최상단에 붙여넣어 사용한다.

```css
:root {
  /* === 브랜드 === */
  --blue:      #1a5fb4;
  --blue-lt:   #dde8f8;
  --blue-md:   #7db0e8;
  --blue-dk:   #103d80;
  --navy:      #0F3460;

  --green:     #16a34a;
  --green-lt:  #e3f9ed;
  --green-md:  #7fe0ac;
  --green-dk:  #0d7a3a;

  --amber:     #f5870a;
  --amber-lt:  #fff1e0;
  --amber-md:  #ffb35c;
  --amber-dk:  #c2660a;

  --red:       #ef4444;
  --red-lt:    #fdecec;
  --red-md:    #fca5a5;
  --red-dk:    #c0291a;

  --purple:    #5e35b1;
  --purple-lt: #ede7f6;
  --purple-md: #b39ddb;

  /* === 서피스 === */
  --bg:          #f5f7fa;
  --bg2:         #ffffff;
  --text:        #2d3748;
  --text-muted:  #64748b;
  --text-label:  #475569;
  --border:      #e2e8f0;
  --sidebar-bg:  #eef1f6;
  --footer-bg:   #1e293b;

  /* === 레거시 호환 === */
  --primary-color:  var(--navy);
  --accent-color:   var(--amber);
  --content-bg:     var(--bg);
  --white:          #ffffff;
  --text-color:     var(--text);
  --border-color:   var(--border);
  --success-color:  var(--green);
  --danger-color:   var(--red-dk);
  --info-color:     var(--blue);

  /* === 공용 토큰 === */
  --card-shadow: 0 1px 4px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
  --font-ui:     'Noto Sans KR', sans-serif;
  --radius-sm:   6px;
  --radius-md:   8px;
}
```

---

## AI에게 주는 지시사항

> 이 문서를 참조하여 HTML/CSS 결과물을 생성할 때 반드시 아래 규칙을 따른다.

1. **색상**: 13번 항목의 `:root` CSS 변수를 그대로 복사한다. 임의의 hex 값 사용 금지.
2. **폰트**: `Noto Sans KR`을 Google Fonts로 임포트하고 `--font-ui` 변수로 참조한다.
3. **레이아웃**: Header(56px) → 좌측 LNB(256px) + 우측 콘텐츠 구조를 기본으로 한다.
4. **카드**: 모든 콘텐츠 섹션은 `.card` + `.card-title` 패턴으로 감싼다.
5. **버튼**: 주요 액션은 `.btn-primary`, 저장은 `.btn-accent`, 취소는 `.btn-outline`.
6. **인터랙션**: 모든 클릭 가능 요소에 `transition: all 0.15s ease` 적용.
7. **다크 모드**: `body.dark` 클래스 토글 방식으로 구현한다.
8. **반응형**: `grid: repeat(auto-fit, minmax(...))` 패턴 사용.
9. **접근성**: `focus-visible` 스타일(`outline: 2px solid rgba(26,95,180,0.35)`)과 `aria-*` 속성을 누락하지 않는다.
10. **한국어 최적화**: `word-break: keep-all`을 제목/본문에 적용한다.
11. **아이콘**: 외부 아이콘 라이브러리 대신 `.ui-icon` + 인라인 SVG 방식을 사용한다.
12. **radius**: `--radius-sm: 6px` / `--radius-md: 8px`로 통일한다.
