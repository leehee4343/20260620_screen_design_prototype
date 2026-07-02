# KEPCO ES PMS 프로토타입 — Claude 작업 규칙

이 파일은 Claude Code가 매 대화 시작 시 자동으로 읽는 설정 파일입니다.

## ⚠️ 최우선 지시: 작업 전 디자인 시스템 필독

**화면을 새로 만들거나 수정하기 전에 반드시 `DESIGN_SYSTEM.md`를 전체 읽어라.**
색상·타이포그래피·컴포넌트·폼·테이블·모달 등 모든 UI 명세가 해당 파일에 있으며,
그 명세를 따르지 않으면 디자인 일관성이 깨진다.

---

## 프로젝트 개요

- **프로젝트**: KEPCO ES 사업관리시스템(PMS) 화면설계 프로토타입
- **기준 디자인**: 시안 C (`DESIGN_SYSTEM.md` 전체 명세 준수)
- **주요 파일**:
  - `index.html` — 메인 앱 진입점, 공통 레이아웃·모달
  - `css/styles.css` — 전체 스타일
  - `js/pages/page-registry.js` — 화면별 템플릿 함수
  - `js/data/prototype-data.js` — 목업 데이터
  - `js/components/layout.js` — 공통 레이아웃·메뉴 구성

---

## 추가 규칙 (DESIGN_SYSTEM.md의 결정사항 요약)

### 입력 폼은 반드시 1열로 구성한다

등록·수정·상세 화면의 입력 필드는 **항상 1열 세로 나열**로 구성한다.
2열 그리드를 **절대 사용하지 않는다**.

```html
<!-- ✅ 올바른 방식 -->
<div style="display:flex; flex-direction:column; gap:16px;">
  <div class="form-group">...</div>
  <div class="form-group">...</div>
</div>

<!-- ❌ 금지 — form-row (repeat auto-fit → 2열) -->
<div class="form-row">...</div>

<!-- ❌ 금지 — 명시적 2열 그리드 -->
<div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">...</div>
```

> **예외 없음**: 팝업(모달) 내 입력 필드도 동일하게 1열 적용.
> 검색 조건 카드(`.search-card`)도 아래 "검색 조건은 반드시 1줄에 1개씩 배치한다" 규칙을 따른다 — 다열 허용 아님.

### 1-1. 검색 조건은 반드시 1줄에 1개씩 배치한다

검색/조회 화면의 검색 조건은 **조건 하나당 한 행(줄)**으로 세로 나열한다.
한 행에 검색 조건을 2개 이상 나란히 배치하지 않는다. `.form-row`, `.search-grid` 같은
`grid-template-columns: repeat(auto-fit, ...)` 다열 그리드 클래스는 검색 영역에 **사용 금지**이며
프로젝트 CSS에서 제거되었다(재도입 금지). 상세 패턴은 `DESIGN_SYSTEM.md`의 "검색 폼" 절 참조.

```html
<!-- ✅ 올바른 방식 — 조건마다 한 행, label 고정너비 + flex-shrink:0 -->
<div style="display:flex; flex-direction:column; gap:12px;">
  <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
    <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">조회기간</label>
    <div style="display:flex; align-items:center; gap:8px;">...</div>
  </div>
  <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:12px;">
    <label style="width:130px; flex-shrink:0; font-weight:600; font-size:14px; color:var(--text-label); margin:0;">상태</label>
    <select class="form-control" style="width:220px;">...</select>
  </div>
</div>

<!-- ❌ 금지 — 한 행에 조건 2개 이상 -->
<div class="form-row">
  <div class="form-group"><label>조회기간</label>...</div>
  <div class="form-group"><label>상태</label>...</div>
</div>
```

### 2. 최소 폰트 크기는 13px

모든 UI 텍스트의 `font-size`는 **13px 미만 금지**. `10px`, `11px`, `12px` 사용 불가.
가장 작은 보조 주석·툴팁·배지·버튼 안 텍스트도 최소 `13px`로 작성한다.

### 3. 버튼 높이 규칙

모든 버튼의 `height`는 **28px 미만 금지**. 인라인 스타일로 크기를 줄이는 경우도 동일.

**같은 행에 나란히 배치된 버튼은 반드시 동일한 `height`를 사용한다.**
역할·색상·중요도가 달라도 높이가 다르면 정렬이 무너진다.

| 용도 | height | padding |
|------|--------|---------|
| 기본 버튼 (폼 제출 등) | 38px | `0 18px` |
| 툴바 소형 버튼 (카드 헤더·테이블 위 행) | **32px** | `0 12px` |
| 주요 액션 툴바 버튼 (accent/primary) | **32px** | `0 14px` |
| 테이블 내 소형 버튼 (최소) | **28px** | `0 8px` |

### 4. 테이블 셀(td) 텍스트 통일 규칙

`<td>` 안의 모든 텍스트(버튼 포함)는 아래 세 가지를 반드시 지킨다.

| 항목 | 규칙 |
|---|---|
| 폰트 색상 | **`#2d3748`(`var(--text)`) 고정** — `color:var(--text-muted)` 등 인라인 color 지정 **절대 금지** |
| 폰트 크기 | **13px 고정** — 인라인 `font-size` 지정 금지, CSS 상속으로 처리 |
| Bold | **금지** — `font-weight:500/700/bold`, `<strong>` 사용 불가. 배지 포함 `font-weight:400` 고정 |

추가 규칙:
- `<td>` 내 인라인 링크 색상 **금지** — `style="color:inherit; text-decoration:none;"` 사용
- `<td>` 내 버튼도 동일 규칙 적용 — `font-size:13px`, color 인라인 지정 금지
- 상태 표시는 반드시 **`.badge-status-*` 컴포넌트**만 사용 (`badge-success` 등 직접 사용 금지)

```html
<!-- ✅ 올바른 방식 -->
<td>사업명</td>
<td><span class="badge badge-status-success">완료</span></td>
<td><a href="#" style="color:inherit; text-decoration:none;" onclick="...">제목</a></td>
<td><button class="btn btn-outline" style="height:28px; padding:0 8px; font-size:13px;">상세보기</button></td>

<!-- ❌ 금지 -->
<td style="color:var(--text-muted);">텍스트</td>
<td style="font-size:14px;">텍스트</td>
<td><strong>텍스트</strong></td>
<td><a href="#" style="color:var(--blue);">제목</a></td>
<td><button style="font-size:14px; color:var(--red-dk);">삭제</button></td>
```
