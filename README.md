# 한코한코

> **격자에 색을 칠해 나만의 코바늘 도안을 만들면, 한 단씩 따라 뜰 수 있는 설명으로 바꿔 주고, 막히는 부분은 내 수준에 맞춰 AI가 알려 주는 웹사이트**

- 사이트: https://hanko-red.vercel.app/
- 인프 중간고사 바이브 코딩 과제: PRD와 Todo 리스트로 AI(Claude Code)와 함께 만든 프로젝트

---

## 1. 제작한 것 소개

### 왜 만들었나요?

유튜브를 보고 코스터를 한두 개 떠 보면, 그다음에는 "내가 원하는 무늬"를 뜨고 싶어진다. 그런데 그런 도안은 찾기 어렵고, 모눈종이에 직접 그려도 그 그림을 "몇 단에 무슨 색 몇 코"로 바꾸는 일은 초보에게 너무 어렵다. 겨우 뜨기 시작해도 지금 몇 단째인지 헷갈리고, 모르는 용어가 나오면 다시 검색해야 한다.

한코한코는 **디자인 → 단별 설명 → 따라 뜨기 → 질문하기**를 한 사이트에서 잇는다. 만든 도안은 로그인 없이 브라우저에 저장되고, 화면에는 영어 약어(sc, ch) 없이 한국어 뜨개 용어만 쓴다.

### 이렇게 써요

1. **수준 고르기**: 처음 들어오면 "완전 초보" 또는 "기초는 앎"을 고른다. AI 도우미의 설명 깊이가 이 수준에 맞춰진다.
2. **새 도안 만들기**: 빈 격자 또는 무늬 템플릿(하트 사각 코스터 20×20칸, 산 태피스트리 벽걸이 30×40칸)에서 시작한다.
3. **격자에 칠하기**: 색을 고르고 칸을 누르거나 드래그해서 칠한다. 완성품 미리보기와 완성 크기(cm)가 바로 바뀐다.
4. **따라 뜨기**: "시작: 사슬 21코"와 단별 설명을 보며 한 단을 뜰 때마다 "N단 완료하기"를 누른다. 막히면 AI 도우미에게 묻는다.
5. **내 작업실**: 만든 도안이 상태(디자인 중 / 뜨는 중 / 완성), 진행률과 함께 모여 있다. 다음 날 들어와도 멈춘 단부터 이어서 뜬다.

### 핵심 기능

| 기능 | 내용 |
|---|---|
| 수준 선택 | 첫 접속 때 고르고, 내 작업실 오른쪽 위 "내 수준 설정"에서 언제든 바꾼다. |
| 격자 편집기 | 클릭·드래그로 칠하고, 휴대폰에서는 손가락으로도 칠할 수 있다. 배색은 최대 6색이고, 3색을 넘으면 "초보에게는 2~3색을 추천해요" 안내가 뜬다. 격자 크기는 5~60칸이며, 줄이면 왼쪽 아래(1단 시작점)를 기준으로 남긴다. 게이지(10cm당 코·단 수)를 넣으면 완성 크기를 계산한다. |
| AI 배색 추천 | "봄 느낌으로"처럼 분위기를 쓰면 지금과 같은 색 수로 배색 3안이 나온다. 하나를 누르면 무늬는 그대로 두고 색만 바뀐다. |
| 단별 설명 | 맨 아래 줄이 1단이다. 홀수 단은 오른쪽 → 왼쪽, 짝수 단은 왼쪽 → 오른쪽으로 읽고(오른손잡이 왕복뜨기), 같은 색이 이어지면 "연노랑 8코 → 올리브 4코 → 연노랑 8코"처럼 묶는다. |
| 따라 뜨기 | 지금 단을 목록과 작은 격자 양쪽에서 강조한다. 화면 아래 고정된 큰 버튼으로 한 단씩 체크하고, 체크를 취소할 수도 있다. 뜨는 동안 휴대폰 화면이 꺼지지 않게 "화면 켜두기"를 켤 수 있다. |
| AI 도우미 | 질문할 때 지금 단의 방향·색·코 수와 내 수준을 함께 보낸다. 자주 묻는 질문 3개("이 단 어떻게 떠요?", "색은 어떻게 바꿔요?", "짧은뜨기가 뭐예요?")는 버튼으로 바로 묻는다. |
| 내 작업실 | 도안마다 미리보기·상태·진행률을 보여 주고, 이어서 뜨기, 이름 바꾸기, 삭제(확인창을 띄움)를 할 수 있다. |

### 비슷한 서비스와 다른 점

"격자 → 단별 글 도안 → 현재 단 표시하며 따라 뜨기" 흐름 자체는 Stitch Fiddle에 이미 있다. 한코한코의 차이는 **초보 눈높이**다. 코스터·벽걸이 템플릿과 짧은뜨기 하나로 범위를 좁혀서, 색 이름을 따로 입력하지 않아도 한국어 단별 설명이 바로 나온다. 뜨다가 막히면 **지금 단과 내 수준에 맞춰 AI에게 묻는 것**까지 한곳에서 할 수 있다. 자세한 비교는 [PRD 2-1](PRD.md#2-1-비슷한-서비스와-차이점)에 있다.

### 만든 방식

| 부분 | 쓴 것 |
|---|---|
| 화면 | React 19 + Vite. 화면 이동은 라우터 없이 `App.jsx`의 `page` 상태로 처리 |
| 저장 | 브라우저 `localStorage`. 저장값이 망가져 있으면 그 도안만 빼고 읽어서 앱이 멈추지 않음 |
| AI | Vercel 서버리스 함수 `/api/ai` → Google Gemini API 무료 버전(`gemini-3.5-flash-lite`) |
| 테스트 | Node 내장 `node --test`로 19개(완성 크기, 크기 바꾸기, 단별 설명, 저장, AI 요청 검사) |
| 배포 | Vercel |

저장소가 Public이고 누구나 사이트에서 AI를 부를 수 있어서, AI 부분에는 안전장치를 두었다.

- API 키는 Vercel 환경 변수에만 있고, 코드와 커밋 어디에도 없다(모든 커밋을 검색해 확인, Todo 6-11).
- 화면은 정해진 값(수준, 질문, 도안 크기, 지금 단)만 보내고, AI에게 주는 지시문은 서버가 만든다.
- 질문 200자, 분위기 40자, 답 600자로 길이를 제한한다.
- 배색 답이 JSON 형식에 맞지 않으면 한 번 더 요청한다.
- AI 호출이 실패하면 "지금은 AI가 바빠요. 잠시 후 다시 시도해 주세요." 안내가 뜨고, 편집 중인 도안과 진행 기록은 그대로 남는다.

### 주요 파일

| 파일 | 하는 일 |
|---|---|
| [`src/config.js`](src/config.js) | 템플릿 크기, 게이지 기본값, 최대 색 수, 격자 범위, AI 지시문을 한곳에 모음 |
| [`src/lib/pattern.js`](src/lib/pattern.js) | 단별 설명 변환, 완성 크기, 크기 바꾸기, 색 지우기, 진행 상태 |
| [`src/lib/storage.js`](src/lib/storage.js) | 도안·수준 저장과 망가진 값 걸러내기 |
| [`src/lib/ai.js`](src/lib/ai.js) | AI 요청 검사와 답 검사(서버와 화면이 같이 씀) |
| [`api/ai.js`](api/ai.js) | Gemini를 부르는 서버리스 함수 |
| [`src/pages/`](src/pages) | 화면 5개: 수준 선택, 내 작업실, 템플릿 고르기, 격자 편집기, 따라 뜨기 |

### 직접 실행하기

```bash
npm install
```

```bash
npm run dev
```

AI 기능까지 쓰려면 [Google AI Studio](https://aistudio.google.com)에서 무료 API 키를 받아 프로젝트 폴더의 `.env.local`에 `GEMINI_API_KEY=발급받은키`를 넣는다. `.env.local`은 `.gitignore`에 들어 있어 커밋되지 않는다. 테스트는 아래 명령으로 돌린다.

```bash
npm test
```

---

## 2. PRD와 Todo 리스트

| 문서 | 내용 |
|---|---|
| [PRD.md](PRD.md) | 무엇을, 누구를 위해, 어디까지 만들지 정리한 문서다. 목적, 비슷한 서비스, 사용자·페르소나, 핵심 기능 6개, 만들지 않는 것, 디자인, 화면에 쓰는 말, 기술 조건, 열린 질문과 결정, 완성 기준이 들어 있다. |
| [TODO.md](TODO.md) | PRD를 6단계 작업으로 나눈 목록이다. 항목마다 "단계-순번" 번호, 근거가 되는 PRD 번호, 우선순위(P1~P3)를 붙였다. 단계마다 확인 방법과 테스트 기록, 맨 아래에 변경 내역이 있다. |

### 진행 방식

1. 노션에 아이디어를 정리하고, 수업 PRD 템플릿(0~10번)으로 PRD를 쓴다.
2. PRD를 바탕으로 Todo를 6단계로 나눈다. PRD 5번 "만들지 않는 것"은 Todo에 `제외-1~8`로 옮겨, AI가 기능을 멋대로 늘리지 않게 한다.
3. 단계마다 AI가 계획을 먼저 보여 주고, Todo 순서대로 구현하면서 "2-4 완료"처럼 번호로 보고한다.
4. 단계가 끝나면 브라우저에서 직접 확인하고(휴대폰 폭 375px 포함), 확인한 것과 발견해서 고친 것을 Todo의 **테스트 기록**에 남긴다.
5. Todo에 체크하고 `타입: 내용 (todo 번호)` 형식으로 커밋해서 push한다.
6. 할 일을 고치거나 빼거나 더하면 Todo 맨 아래 **변경 내역**에 날짜와 이유를 남긴다.

### Todo 한눈에 보기

| 단계 | 목표 | 항목 | 상태 |
|---|---|---|---|
| 1단계 | 프로젝트 준비와 화면 틀 | 1-1 ~ 1-7 | 완료 |
| 2단계 | 템플릿과 격자 편집기 | 2-1 ~ 2-12 | 완료(2-12는 테스트 후 추가) |
| 3단계 | 저장, 내 작업실, 수준 선택 | 3-1 ~ 3-8 | 완료 |
| 4단계 | 단별 설명과 따라 뜨기 | 4-1 ~ 4-10 | 완료 |
| 5단계 | AI 기능 | 5-1 ~ 5-10 | 완료 |
| 6단계 | PRD 10번 완성 기준 점검 | 6-1 ~ 6-13 | 12개 통과, 6-13(실제로 떠 보기) 남음 |
| 선택 | 유튜브 영상 해설 축소판 | 선택-1 | 하지 않음 |

### 커밋 기록

| 단계 | 커밋 | 내용 |
|---|---|---|
| 준비 | `73386d2` `af69984` `1196cf8` | 저장소 만들기, PRD 작성, Todo 작성 |
| 1단계 | `967ef18` `94d103b` `1640197` `7159a20` `c111bed` | Vite + React 프로젝트, 공통 스타일, config와 화면 틀, Vercel 배포 확인 |
| 2단계 | `5017877` `506597d` `bccf7b4` | 템플릿 2종과 도안 함수, 격자 편집기, 테스트 기록 |
| 3단계 | `3283bad` | 자동 저장, 내 작업실, 수준 선택 |
| 4단계 | `65af8e6` | 단별 설명과 따라 뜨기 |
| 5단계 | `f02942e` | AI 배색 추천과 따라 뜨기 도우미 |
| 6단계 | `0a75361` | 완성 기준 점검 기록 |
| 완성 후 | `cf9a1f7` `a11e77e` `a713da8` `6c44452` | 빈 격자 템플릿 추가, 전체 화면 디자인 개편, 코드 점검에서 나온 수정, 편집기 3단 화면 개편 |

---

## 3. Todo 리스트 변경 내역

처음 계획에서 바뀐 것을 시점별로 나눴다. 원본은 [TODO.md의 변경 내역](TODO.md#변경-내역)에 있다.

### 3-1. 기획 단계에서 바꾼 것 (Todo 작성 전)

처음 기획안은 "뜨개 도안 검색 + AI 유튜브 해설 + 도안 만들기 + 따라 뜨기 + AI 도우미 + 작업실"이었다. 중심을 **직접 디자인**으로 정하면서 아래처럼 바꾼 뒤 Todo를 만들었다.

| 구분 | 처음 기획 | 바꾼 것 | 이유 |
|---|---|---|---|
| 수정 | 도안 탐색 및 검색(카테고리·난이도 필터) | 템플릿 고르기 화면으로 축소 | 템플릿이 2종이라 검색·필터가 필요 없음. 남의 도안·사진은 저작권 때문에 쓸 수 없음 |
| 수정 | AI 유튜브 영상 해설(핵심 기능) | 선택 항목으로 이동 | 공식 API로는 남의 영상 자막을 받을 수 없고, 말 없이 손과 음악만 나오는 영상이 많음. 직접 디자인과 연결이 약함 |
| 수정 | 나만의 도안 만들기(모든 작품) | 평면 격자 도안만 | 미리보기와 코·단 수 계산이 쉬워지고, 실제 코바늘 배색 기법(태피스트리)과 맞음 |
| 수정 | 크기별 코·단 수 재계산(확장 기능, 어려움) | 핵심 기능에 포함 | 평면 격자에서는 나눗셈 한 번으로 계산됨 |
| 수정 | AI 뜨개 도우미와 영상 속 "AI에게 질문하기"(따로 있음) | 따라 뜨기 옆 채팅 하나로 통합 | 기능이 겹침. 지금 단을 함께 넘기면 "지금 단계 질문"이 해결됨 |
| 수정 | 사용자 수준별 설명(영상 해설 안의 기능) | 처음에 고르는 수준 선택으로 독립 | 영상 해설이 빠져도 AI 도우미 설명에 그대로 활용 |
| 수정 | 내 뜨개 작업실(계정 기반) | 로그인 없이 브라우저 저장 | 계정 기능은 과제 범위에 비해 큼 |
| 추가 | (없음) | AI 배색 추천 | 디자인 중심 컨셉에 맞는 AI 기능 |
| 추가 | (없음) | 단별 설명 자동 생성 | 직접 디자인한 도안을 따라 뜨기로 이어 주는 연결고리 |
| 삭제 | 모든 영상의 자동 도안 추출 | 삭제 | 과제 범위 밖 |
| 삭제 | 뜨개 전체(대바늘 + 코바늘) | 코바늘만 | 기획에 쓴 용어(짧은뜨기, 매직링 등)가 전부 코바늘 |

### 3-2. Todo 작성 후 바꾼 것

| 구분 | 번호 | 바꾼 것 | 이유 |
|---|---|---|---|
| 수정 | 전체 | 수업 템플릿 형식으로 다시 작성: 단계-순번 번호, PRD 번호, P1~P3, 확인 방법, 제외 목록 | 실습 때 쓴 형식이 진행 보고·확인에 편했음 |
| 추가 | 1-7 | 화면 용어 통일(PRD 6-1 "쓰는 말" 표) | 지난 과제 때 개발 중에 용어를 계속 바꿔서 PRD, Todo, 코드를 모두 고쳐야 했음 |
| 추가 | 6-13 | 직접 코스터를 디자인하고 휴대폰으로 실제로 떠 보기 | 완성 기준을 다 통과해도 실제로 써 봐야 보이는 불편이 있었음 |
| 수정 | 1-6 | 딸기우유 분홍 포인트 → 세이지 그린 메인 + 피치 포인트 | 색·글꼴·간격 규칙이 구체적으로 정리된 디자인 문서(DESIGN.md)를 따르기로 함 |
| 수정 | 5-1 | AI 제공사 Claude Opus 5.5 → Gemini API 무료 버전(월 사용 한도 설정 대신 무료 한도 확인) | 과제라 비용 없이 쓰고 싶음. Claude API는 무료 사용량이 없음([4-2](#4-2-claude-api) 참고) |
| 테스트 후 추가 | 2-12 | 빈 격자 템플릿 2종 추가(배색은 바탕색 하나만, 무늬 템플릿과 나눠 보여 줌) | 직접 써 보니 무늬가 칠해진 템플릿만 있어서, 처음부터 그리려면 하트·산을 일일이 지워야 했음 |
| 테스트 후 변경 | 1-6 | 페이지 바탕색 크림 `#FAF7F0` → 흰색 `#FFFFFF` | 써 보니 크림 바탕보다 흰 바탕이 더 깔끔해 보였음 |
| 테스트 후 변경 | 1-6, 1-7 | 전체 화면 디자인 개편: 브랜드 로고와 공통 헤더, 작업실 소개 영역, 레이아웃 정리, 설정을 오른쪽 위 메뉴로 옮김, 따라 뜨기 버튼 "이 단 끝!" → "N단 완료하기", 다 뜨면 "완성! 내 작업실로 가기" 버튼, 제목 위 장식용 영어 문구 허용 | 화면마다 헤더와 배치가 제각각이라 한 사이트처럼 보이지 않았음 |

### 3-3. 테스트하며 발견해서 고친 것

단계마다 브라우저에서 확인하다가 찾은 문제다. 할 일은 그대로 두고, 처음 만든 방식만 고쳤다.

| 단계 | 발견한 문제 | 고친 방법 |
|---|---|---|
| 1단계 | 공통 스타일을 만들 때 AI가 예전 PRD(분홍)를 보고 주색을 분홍으로 넣음 | 세이지 그린으로 고침. 흰 글자가 잘 보이도록 주요 버튼은 한 단계 진한 초록을 씀 |
| 2단계 | 드래그로 한 줄을 그으면 20칸 중 3칸만 칠해짐(빠르게 움직이면 중간 칸을 건너뜀) | 직전 칸부터 지금 칸까지 선으로 칠하도록 바꿈 |
| 2단계 | 게이지 입력칸의 숫자를 지우고 새로 입력할 수 없음 | 입력칸이 값을 직접 갖고 있게 바꿈 |
| 3단계 | 사이트 데이터가 막힌 브라우저는 저장소를 읽기만 해도 에러가 남(겪기 전에 미리 막음) | 저장소 읽기를 try 안으로 옮김 |
| 4단계 | 따라 뜨기 화면이 하얗게 비어 버림(스크롤 함수의 반환값을 React가 정리 함수로 부름) | 중괄호로 감싸 반환값을 없앰 |
| 4단계 | 지금 단으로 스크롤하면 화면 전체가 내려가 제목·진행률이 안 보임 | 단 목록 칸 안에서만 스크롤 |
| 4단계 | 휴대폰에서 지금 뜰 단의 설명이 첫 화면 아래, 고정 버튼 뒤에 숨음 | 휴대폰에서는 진행률 → 단 목록 → 작은 격자 순서로 바꿈 |
| 5단계 | AI(Flash-Lite)가 4단의 색 순서를 바꿔 말함 | 지금 단을 "뜨는 순서: 연노랑 8코 → 올리브 4코 → …"처럼 화살표로 보내고, 지시문에 "순서와 숫자를 바꾸지 말 것"을 더함. 같은 질문을 3번 했을 때 모두 맞게 답함 |
| 완성 후 | 색 이름을 비우거나 20자 넘게 쓰면 AI 도우미가 항상 실패하고 "지금은 AI가 바빠요" 안내만 뜸 | 색 이름을 20자로 제한하고, 비우면 "색 N"으로 채움 |
| 완성 후 | 드래그할 때 같은 칸 위에서도 계속 다시 칠하고 저장함 | 같은 칸이면 건너뜀 |

### 3-4. 아직 하지 않은 것

- **6-13 실제로 떠 보기**: 완성 기준 12개는 배포 주소에서 모두 통과했지만, 휴대폰으로 실제 코스터를 몇 단 떠 보는 확인은 아직 하지 않았다.
- **선택-1 유튜브 영상 해설 축소판**: 시간이 남으면 하기로 한 선택 항목이고, 이번에는 하지 않았다.
- 6단계에서 써 보며 찾은 불편한 점(다음에 고칠 것):
  - 따라 뜨기 화면에서 새로고침하면 내 작업실로 돌아가서 "이어서 뜨기"를 한 번 더 눌러야 한다.
  - 따라 뜨기 화면을 나갔다 오면 AI 도우미와의 대화가 사라진다. 다시 물으면 무료 한도를 또 쓴다.
  - AI 배색이 웹 기본 색(`#ff69b4` 핫핑크 등)으로 와서 실제 실 색보다 쨍하고, 바탕과 무늬 색이 비슷한 안도 나온다.
  - 20×20 코스터가 게이지 때문에 10cm × 9.1cm로 정사각형이 아닌데, 화면에서 이를 알려 주지 않는다.
  - 디자인 중인 도안은 내 작업실에 "따라 뜨기" 버튼이 없어 편집기를 거쳐야 한다.

---

## 4. 스킬

직접 만든 스킬은 없고, 이미 있는 스킬 2개를 썼다.

| 스킬 | 종류 | 언제 |
|---|---|---|
| ponytail | 플러그인 스킬(MIT 라이선스) | 코드를 쓴 모든 세션 |
| claude-api | Claude Code 기본 스킬 | 5단계 전, AI 제공사를 고를 때 |

### 4-1. ponytail

**무엇을 하나요?** AI가 코드를 쓸 때 "동작하는 가장 단순한 방법"을 고르게 하는 스킬이다. 코드를 쓰기 전에 7단계 사다리를 위에서부터 차례로 따져 보고, 처음으로 해결되는 단계에서 멈춘다: ① 꼭 필요한가 ② 이미 코드에 있나 ③ 표준 기능으로 되나 ④ 브라우저 기본 기능으로 되나 ⑤ 이미 설치한 라이브러리로 되나 ⑥ 한 줄로 되나 ⑦ 그래도 안 되면 최소한의 코드. 대신 입력 검사, 데이터 손실을 막는 에러 처리, 보안, 접근성은 줄이지 않는다.

**고른 이유:** 한코한코는 화면 5개짜리 작은 앱인데, AI에게 맡기면 라이브러리와 추상화를 덧붙여 코드가 금방 커진다. 과제는 README로 평가받지만 코드를 내가 이해하고 설명할 수 있어야 해서, 코드를 읽을 수 있는 크기로 유지하려고 골랐다.

**작업에서 어떻게 쓰였나요?** 세션이 시작될 때마다 자동으로 켜지게 해 두어서, 1단계부터 마지막 코드 점검까지 모든 코드 작업에 적용됐다.

| 사다리 | 한코한코에서 |
|---|---|
| ① 꼭 필요한가 | 라우터·상태 관리 라이브러리 없이 `App.jsx`의 `page` 상태로 화면 5개 사이를 이동함 |
| ② 이미 있는 것 재사용 | AI 요청 검사 함수(`src/lib/ai.js`)를 서버와 화면이 같이 씀 |
| ③ 표준 기능 | 테스트는 프레임워크 없이 Node 내장 `node --test`. Gemini 호출도 SDK 없이 `fetch` |
| ④ 브라우저 기본 기능 | 색 고르기는 `<input type="color">`, 이름 바꾸기·삭제 확인은 `prompt`/`confirm`, 진행률은 `<progress>`, 화면 켜두기는 Wake Lock API, 완성품 미리보기는 SVG |
| 결과 | 실행에 필요한 라이브러리가 `react`, `react-dom` 2개뿐 |

- **줄이지 않은 것:** 서버가 받은 요청을 하나하나 검사하고(`buildRequest`), 저장값이 망가졌는지 확인하고(`isValidPattern`), API 키를 환경 변수에만 둔 것은 스킬의 "게으르면 안 되는 곳" 규칙에 해당한다.
- **검사 하나는 남기기:** 단별 설명 변환처럼 로직이 있는 함수에만 테스트를 붙였고(19개), 화면 코드에는 테스트를 만들지 않았다.
- **마지막 코드 점검:** 쓰지 않는 파일(`public/icons.svg`)을 지우고, 드래그 중 같은 칸을 다시 칠하던 문제를 한 줄로 고쳤다.

<details>
<summary>ponytail SKILL.md 전문</summary>

```markdown
---
name: ponytail
description: >
  Forces the laziest solution that actually works, simplest, shortest, most
  minimal. Channels a senior dev who has seen everything: question whether the
  task needs to exist at all (YAGNI), reach for the standard library before
  custom code, native platform features before dependencies, one line before
  fifty. Supports intensity levels: lite, full (default), ultra. Use on ANY
  coding task: writing, adding, refactoring, fixing, reviewing, or designing
  code, and choosing libraries or dependencies. Also use whenever the user
  says "ponytail", "be lazy", "lazy mode", "simplest solution", "minimal
  solution", "yagni", "do less", or "shortest path", or complains about
  over-engineering, bloat, boilerplate, or unnecessary dependencies. Do NOT
  use for non-coding requests (general knowledge, prose, translation,
  summaries, recipes).
argument-hint: "[lite|full|ultra]"
license: MIT
---

# Ponytail

You are a lazy senior developer. Lazy means efficient, not careless. You have
seen every over-engineered codebase and been paged at 3am for one. The best
code is the code never written.

## Persistence

ACTIVE EVERY RESPONSE. No drift back to over-building. Still active if
unsure. Off only: "stop ponytail" / "normal mode". Default: **full**.
Switch: `/ponytail lite|full|ultra`.

## The ladder

Stop at the first rung that holds:

1. **Does this need to exist at all?** Speculative need = skip it, say so in one line. (YAGNI)
2. **Already in this codebase?** A helper, util, type, or pattern that already lives here → reuse it. Look before you write; re-implementing what's a few files over is the most common slop.
3. **Stdlib does it?** Use it.
4. **Native platform feature covers it?** `<input type="date">` over a picker lib, CSS over JS, DB constraint over app code.
5. **Already-installed dependency solves it?** Use it. Never add a new one for what a few lines can do.
6. **Can it be one line?** One line.
7. **Only then:** the minimum code that works.

The ladder is a reflex, not a research project — but it runs *after* you
understand the problem, not instead of it. Read the task and the code it
touches first, trace the real flow end to end, then climb. Two rungs work →
take the higher one and move on. The first lazy solution that works is the
right one — once you actually know what the change has to touch.

**Bug fix = root cause, not symptom.** A report names a symptom. Before you
edit, grep every caller of the function you're about to touch. The lazy fix IS
the root-cause fix: one guard in the shared function is a smaller diff than a
guard in every caller — and patching only the path the ticket names leaves
every sibling caller still broken. Fix it once, where all callers route through.

## Rules

- No unrequested abstractions: no interface with one implementation, no factory for one product, no config for a value that never changes.
- No boilerplate, no scaffolding "for later", later can scaffold for itself.
- Deletion over addition. Boring over clever, clever is what someone decodes at 3am.
- Fewest files possible. Shortest working diff wins — but only once you understand the problem. The smallest change in the wrong place isn't lazy, it's a second bug.
- Complex request? Ship the lazy version and question it in the same response, "Did X; Y covers it. Need full X? Say so." Never stall on an answer you can default.
- Two stdlib options, same size? Take the one that's correct on edge cases. Lazy means writing less code, not picking the flimsier algorithm.
- Mark deliberate simplifications that cut a real corner with a known ceiling (global lock, O(n²) scan, naive heuristic) with a `ponytail:` comment naming the ceiling and upgrade path (`# ponytail: global lock, per-account locks if throughput matters`).

## Output

Code first. Then at most three short lines: what was skipped, when to add it.
No essays, no feature tours, no design notes. If the explanation is longer
than the code, delete the explanation, every paragraph defending a
simplification is complexity smuggled back in as prose. Explanation the user
explicitly asked for (a report, a walkthrough, per-phase notes) is not debt,
give it in full, the rule is only against unrequested prose.

Pattern: `[code] → skipped: [X], add when [Y].`

## Intensity

| Level | What change |
|-------|------------|
| **lite** | Build what's asked, but name the lazier alternative in one line. User picks. |
| **full** | The ladder enforced. Stdlib and native first. Shortest diff, shortest explanation. Default. |
| **ultra** | YAGNI extremist. Deletion before addition. Ship the one-liner and challenge the rest of the requirement in the same breath. |

Example: "Add a cache for these API responses."
- lite: "Done, cache added. FYI: `functools.lru_cache` covers this in one line if you'd rather not own a cache class."
- full: "`@lru_cache(maxsize=1000)` on the fetch function. Skipped custom cache class, add when lru_cache measurably falls short."
- ultra: "No cache until a profiler says so. When it does: `@lru_cache`. A hand-rolled TTL cache class is a bug farm with a hit rate."

## When NOT to be lazy

Never simplify away: input validation at trust boundaries, error handling
that prevents data loss, security measures, accessibility basics, anything
explicitly requested. User insists on the full version → build it, no
re-arguing.

Never lazy about understanding the problem. The ladder shortens the
solution, never the reading. Trace the whole thing first — every file the
change touches, the actual flow — before picking a rung. Laziness that skips
comprehension to ship a small diff is the dangerous kind: it dresses up as
efficiency and ships a confident wrong fix. Read fully, then be lazy.

Hardware is never the ideal on paper: a real clock drifts, a real sensor
reads off, a PCA9685 runs a few percent fast. Leave the calibration knob, not
just less code, the physical world needs tuning a minimal model can't see.

Lazy code without its check is unfinished. Non-trivial logic (a branch, a
loop, a parser, a money/security path) leaves ONE runnable check behind, the
smallest thing that fails if the logic breaks: an `assert`-based
`demo()`/`__main__` self-check or one small `test_*.py`. No frameworks, no
fixtures, no per-function suites unless asked. Trivial one-liners need no
test, YAGNI applies to tests too.

## Boundaries

Ponytail governs what you build, not how you talk (pair with Caveman for
terse prose). "stop ponytail" / "normal mode": revert. Level persists until
changed or session end.

The shortest path to done is the right path.
```

</details>

### 4-2. claude-api

**무엇을 하나요?** Claude API(Anthropic SDK)의 최신 레퍼런스다. 모델 이름, 요금, 구조화 출력(JSON), 도구 사용 등을 담고 있고, AI 모델을 고르거나 AI 기능을 만들 때 자동으로 불린다.

**고른 이유:** 5단계 전에 AI 제공사를 정해야 했다. 모델 이름, 요금, 무료 사용량, JSON 형식 응답 지원 여부는 자주 바뀌어서, AI의 기억이 아니라 최신 문서로 확인하려고 이 스킬을 불렀다.

**작업에서 어떻게 쓰였나요?**

1. 스킬로 Claude Opus 5.5와 Haiku 5.5의 요금(100만 토큰당 입력·출력 가격)과 구조화 출력 지원을 확인하고, 요청 한 번과 1,000번에 드는 비용을 비교했다.
2. 처음에는 답변 품질을 보고 **Claude Opus 5.5**로 정했다.
3. 하지만 Claude API에는 무료 사용량이 없어서, 비용 없이 쓰려고 **Gemini API 무료 버전**(Flash-Lite)으로 바꿨다. 이 결정은 PRD 9번("처음 결정 → 바꾼 결정")과 Todo 변경 내역(5-1)에 남겼다.
4. 이때 서버리스 함수 한 곳(`api/ai.js`)만 고치면 제공사를 바꿀 수 있게 만들기로 했다.

<details>
<summary>claude-api SKILL.md 설명 부분</summary>

Claude Code에 기본으로 들어 있는 스킬이라 로컬에 SKILL.md 파일이 따로 없다. 아래는 스킬 목록에 보이는 설명(SKILL.md의 description) 그대로다.

```text
Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.
TRIGGER — read BEFORE opening the target file; don't skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
```

</details>

---

## 5. 느낀점, 결론

(작성 예정)

<!--
참고용 재료 (화면에는 안 보임)
- TODO.md 테스트 기록의 "써 보니 불편한 점" 5개
- PRD 9번의 처음 결정 → 바꾼 결정 (AI 제공사, 빈 격자 템플릿)
- AI가 색 순서를 바꿔 말한 일과 지시문으로 고친 일 (5단계)
- 기획 단계에서 유튜브 해설을 핵심에서 선택으로 뺀 일
-->
