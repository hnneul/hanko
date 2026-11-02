# 한코한코

> **격자에 색을 칠해 나만의 코바늘 도안을 만들면, 한 단씩 따라 뜰 수 있는 설명으로 바꿔 주고, 막히는 부분은 내가 고른 설명 방식대로 AI가 알려 주는 웹사이트**

- 사이트: https://hanko-red.vercel.app/

<!-- 📷 사진 ① 대표 사진: 격자 편집기 (노트북, 가로로 넓게)
     찍을 것: 하트 코스터를 칠한 상태. 왼쪽 색 고르기, 가운데 격자, 오른쪽 완성품 미리보기·단별 설명이 한 화면에
     사진을 docs/images/editor.png 로 넣은 뒤 아래 두 줄의 주석을 풀기
![격자 편집기](docs/images/editor.png)
*색을 칠하면 오른쪽에 완성품 미리보기와 한 단씩 따라 뜰 단별 설명이 바로 바뀐다.*
-->

---

## 1. 제작한 것 소개

### 왜 만들었나요?

겨울이 되니 뜨개질을 해 보고 싶어졌다. 막상 시작하려니 나는 완전 초보였고, 남이 만든 도안을 그대로 따라 하기보다는 **내가 원하는 도안을 직접 만들어 보고 싶었다.** 또 다른 사람의 도안이나 영상을 보다가 막힐 때 **하나하나 자세히 알려 주는 곳**이 있으면 좋겠다고 생각했다. 그래서 이 두 가지를 한곳에서 할 수 있는 웹을 만들었다.

유튜브를 보고 코스터를 한두 개 떠 보면, 그다음에는 "내가 원하는 무늬"를 뜨고 싶어진다. 그런데 그런 도안은 찾기 어렵고, 모눈종이에 직접 그려도 그 그림을 "몇 단에 무슨 색 몇 코"로 바꾸는 일은 초보에게 너무 어렵다. 겨우 뜨기 시작해도 지금 몇 단째인지 헷갈리고, 모르는 용어가 나오면 다시 검색해야 한다.

한코한코는 **디자인 → 단별 설명 → 따라 뜨기 → 질문하기**를 한 사이트에서 잇는다. 만든 도안은 로그인 없이 브라우저에 저장되고, 화면에는 영어 약어(sc, ch) 없이 한국어 뜨개 용어만 쓴다.

### 이렇게 써요

1. **설명 방식 고르기**: 처음 들어오면 "차근차근" 또는 "핵심만"을 고른다. AI 도우미의 설명 깊이가 이 선택에 맞춰진다.
2. **새 도안 만들기**: 빈 격자 또는 무늬 템플릿(하트 사각 코스터 20×20칸, 산 태피스트리 벽걸이 30×40칸)에서 시작한다.
3. **격자에 칠하기**: 색을 고르고 칸을 누르거나 드래그해서 칠한다. 완성품 미리보기와 완성 크기(cm)가 바로 바뀐다.
4. **따라 뜨기**: "시작: 사슬 21코"와 단별 설명을 보며 한 단을 뜰 때마다 "N단 완료하기"를 누른다. 막히면 AI 도우미에게 묻는다.

   <!-- 📷 사진 ② 따라 뜨기 + AI 도우미 (노트북 1장 + 휴대폰 375px 1장 나란히)
        찍을 것: 몇 단 진행해서 지금 단이 강조된 상태, AI 도우미에게 "이 단 어떻게 떠요?"를 물어 답이 나온 상태
        사진을 docs/images/knit.png, docs/images/knit-mobile.png 로 넣은 뒤 주석을 풀기
   <img src="docs/images/knit.png" alt="따라 뜨기 화면" width="68%"> <img src="docs/images/knit-mobile.png" alt="휴대폰 따라 뜨기 화면" width="28%">

   *지금 뜰 단이 강조되고, 막히면 옆의 AI 도우미가 지금 단의 색·코 수를 알고 답해 준다. 휴대폰을 옆에 세워 두고 뜰 수 있다.*
   -->
5. **내 작업실**: 만든 도안이 상태(디자인 중 / 뜨는 중 / 완성), 진행률과 함께 모여 있다. 다음 날 들어와도 멈춘 단부터 이어서 뜬다.

   <!-- 📷 사진 ③ 내 작업실 (노트북)
        찍을 것: 도안 2~3개가 "디자인 중 / 뜨는 중 / 완성" 상태와 진행률과 함께 보이는 상태
        사진을 docs/images/home.png 로 넣은 뒤 주석을 풀기 (사진이 많아 보이면 빼도 됨)
   ![내 작업실](docs/images/home.png)

   *만든 도안이 상태와 진행률과 함께 모여 있고, 누르면 멈춘 단부터 이어서 뜬다.*
   -->
6. **영상 보며 배우기**(선택 기능): 유튜브 뜨개 영상의 주소와 자막을 붙여 넣으면 AI가 단계별로 정리하고, 단계를 누르면 그 장면부터 재생된다.
7. **도안 풀어 보기**(선택 기능): 갖고 있는 남의 글 도안을 붙여 넣으면 AI가 부분·단별로 한 코씩 풀어 쓰고, 코 수가 도안에 적힌 숫자와 맞는지 확인해 준다. 원형·입체 도안도 되고, 단을 체크하며 뜰 수 있다. 막히는 단은 그 단의 "이 단 물어보기"로 바로 물어본다.

### 핵심 기능

| 기능 | 내용 |
|---|---|
| 설명 방식 선택 | 첫 접속 때 고르고, 내 작업실 오른쪽 위 "설명 방식"에서 언제든 바꾼다. |
| 격자 편집기 | 클릭·드래그로 칠하고, 휴대폰에서는 손가락으로도 칠할 수 있다. 배색은 최대 6색이고, 3색을 넘으면 "초보에게는 2\~3색을 추천해요" 안내가 뜬다. 격자 크기는 5\~60칸이며, 줄이면 왼쪽 아래(1단 시작점)를 기준으로 남긴다. 게이지(10cm당 코·단 수)를 넣으면 완성 크기를 계산하고, 정사각형이 아니면 "정사각형으로 뜨려면 세로를 22단으로 해 보세요"처럼 단 수를 알려 준다. |
| AI 배색 추천 | "봄 느낌으로"처럼 분위기를 쓰면 지금과 같은 색 수로 배색 3안이 나온다. 하나를 누르면 무늬는 그대로 두고 색만 바뀐다. |
| 단별 설명 | 맨 아래 줄이 1단이다. 홀수 단은 오른쪽 → 왼쪽, 짝수 단은 왼쪽 → 오른쪽으로 읽고(오른손잡이 왕복뜨기), 같은 색이 이어지면 "연노랑 8코 → 올리브 4코 → 연노랑 8코"처럼 묶는다. |
| 따라 뜨기 | 지금 단을 목록과 작은 격자 양쪽에서 강조한다. 화면 아래 고정된 큰 버튼으로 한 단씩 체크하고, 체크를 취소할 수도 있다. 뜨는 동안 휴대폰 화면이 꺼지지 않게 "화면 켜두기"를 켤 수 있다. |
| AI 도우미 | 질문할 때 지금 단의 방향·색·코 수와 설명 방식을 함께 보낸다. 자주 묻는 질문 3개("이 단 어떻게 떠요?", "색은 어떻게 바꿔요?", "짧은뜨기가 뭐예요?")는 버튼으로 바로 묻는다. 대화는 도안마다 최근 20개까지 저장돼 나갔다 와도 남고, "대화 지우기"로 지울 수 있다. |
| 내 작업실 | 도안마다 미리보기·상태·진행률을 보여 주고, 따라 뜨기·이어서 뜨기, 이름 바꾸기, 삭제(확인창을 띄움)를 할 수 있다. 새로고침해도 보던 편집기·따라 뜨기 화면이 그대로 열린다. |
| 영상 보며 배우기 (선택) | 유튜브 영상 주소와 시각이 붙은 자막을 붙여 넣으면 AI가 단계와 시각을 정리하고(자막의 sc 같은 약어는 한국어 용어로), 단계를 누르면 그 시각부터 재생한다. 처음 들어오면 자막도 넣어야 한다는 안내 팝업이 뜨고, 정리한 결과는 내 작업실 "영상으로 배운 것"에 저장돼 다시 열거나 지울 수 있다. 공식 기능으로는 남의 영상 자막을 가져올 수 없어서 자막은 직접 붙여 넣는 축소판이다. |
| 도안 풀어 보기 (선택) | 글 도안을 붙여 넣으면 "꽃", "이파리"처럼 부분으로 나누고, 단마다 `(짧은뜨기, 늘리기)*6 [18]` 같은 줄임 표기를 "다음 코에 짧은뜨기 1번 → 다음 코에 늘리기 → 6번 반복"처럼 풀어 쓴다. 도안에 적힌 `[18]`·`(16코)`와 AI가 직접 센 코 수가 같으면 "✓ 도안과 같아요", 다르면 "⚠"로 알린다(AI가 베끼지 못하게 적힌 숫자는 지우고 보냄). 나온 용어(매직링, 늘리기 등)는 눌러서 뜻을 본다. 단마다 "이 단 물어보기"를 누르면 그 단의 원문과 풀이를 아는 AI에게 바로 묻는다(답은 저장하지 않음). `5-8단`처럼 여러 단을 한 줄로 쓴 건 5·6·7·8단을 하나씩 체크한다. 단을 체크하면 내 작업실 "풀어 본 도안"에 진행률과 함께 저장된다. 격자로 바꾸거나 미리보기를 그리지는 않고, 글자를 복사할 수 없는 그림·사진 도안은 아직 안 된다. |

### 비슷한 서비스와 다른 점

> **내가 만든 도안이든 남의 글 도안이든, 지금 뜨는 단에서 막히면 그 자리에서 내 설명 방식에 맞게 물어볼 수 있다.**

| | Stitch Fiddle | knitCompanion | 유튜브 튜토리얼 | 한코한코 |
|---|---|---|---|---|
| 내 무늬 직접 디자인 | O | X (도안을 따로 구해 옴) | X (정해진 작품만) | O |
| 단별 설명 | 영어 형식, 색 이름을 직접 입력 | 불러온 도안 PDF를 그대로 봄 | 영상 속 설명 | **입력 없이 한국어로 바로** |
| 뜨다가 막히면 | 물어볼 곳 없음 | FAQ·Ravelry 그룹 | 댓글 | **지금 단을 아는 AI가 고른 설명 방식대로 바로 답함** |
| 남의 글 도안 읽기 | 없음 | 도안 PDF를 불러와 지금 단 표시 | 없음 | **줄임 표기를 한 코씩 풀고 코 수 확인** |
| 영상 따라 하기 | 없음 | 없음 | 영상만 있음 | **자막을 단계로 정리, 누르면 그 장면부터 재생** |
| 비용 | 무료(차트 15개) + 유료 | 기본 무료 + 연 구독 | 무료 | 무료, 로그인 없음 |

"격자 → 단별 글 도안 → 현재 단 표시하며 따라 뜨기" 흐름 자체는 Stitch Fiddle에 이미 있다. 그래서 한코한코는 같은 기능을 더 많이 만드는 대신, 코스터·벽걸이 템플릿과 짧은뜨기 하나로 범위를 좁히고 **뜨는 도중에 묻고 답을 듣는 부분**에 집중했다. 표의 다른 서비스 내용은 2026-11-01에 각 서비스 공식 페이지에서 확인한 것이고 직접 가입해서 써 보지는 않았다. 출처와 자세한 비교는 [PRD 2-1](PRD.md#2-1-비슷한-서비스와-차이점)에 있다.

### 만든 방식

| 부분 | 쓴 것 |
|---|---|
| 화면 | React 19 + Vite. 화면 이동은 라우터 없이 `App.jsx`의 `page` 상태로 처리 |
| 저장 | 브라우저 `localStorage`. 저장값이 망가져 있으면 그 도안만 빼고 읽어서 앱이 멈추지 않음 |
| AI | Vercel 서버리스 함수 `/api/ai` → Google Gemini API 무료 버전(`gemini-3.5-flash-lite`) |
| 테스트 | Node 내장 `node --test`로 38개(완성 크기, 크기 바꾸기, 단별 설명, 저장, AI 요청 검사, 영상 자막·시각 검사, 도안 풀이·코 수 읽기) |
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
| [`src/lib/storage.js`](src/lib/storage.js) | 도안·수준·보던 화면·AI 대화·영상 정리 저장과 망가진 값 걸러내기 |
| [`src/lib/ai.js`](src/lib/ai.js) | AI 요청 검사와 답 검사(서버와 화면이 같이 씀) |
| [`api/ai.js`](api/ai.js) | Gemini를 부르는 서버리스 함수 |
| [`src/pages/`](src/pages) | 화면 7개: 수준 선택, 내 작업실, 템플릿 고르기, 격자 편집기, 따라 뜨기, 영상 보며 배우기, 도안 풀어 보기 |

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
| [TODO.md](TODO.md) | PRD를 6단계 작업으로 나누고, 써 보며 찾은 불편을 고친 7단계와 선택 항목을 더한 목록이다. 항목마다 "단계-순번" 번호, 근거가 되는 PRD 번호, 우선순위(P1~P3)를 붙였다. 단계마다 확인 방법과 테스트 기록, 맨 아래에 변경 내역이 있다. |

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
| 2단계 | 템플릿과 격자 편집기 | 2-1 ~ 2-12 | 완료 |
| 3단계 | 저장, 내 작업실, 수준 선택 | 3-1 ~ 3-8 | 완료 |
| 4단계 | 단별 설명과 따라 뜨기 | 4-1 ~ 4-10 | 완료 |
| 5단계 | AI 기능 | 5-1 ~ 5-10 | 완료 |
| 6단계 | PRD 10번 완성 기준 점검 | 6-1 ~ 6-13 | 완료 |
| 7단계 | 써 보니 불편한 점 고치기 | 7-1 ~ 7-7 | 완료 |
| 선택 | 유튜브 영상 해설 축소판 | 선택-1 | 완료 |
| 선택 | 도안 풀어 보기 | 선택-2 | 완료 |

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
| 7단계 | `370b428` `cdc9e01` `7b97b93` `b148d38` `ab5b770` `aab68ca` `21d9c27` | 바로 따라 뜨기, 새로고침 후 화면 유지, AI 배색 지시문, 정사각형 안내, AI 대화 저장, 기록, 뒤로가기·풀이 제목 |
| 선택 | `8eded7c` `597dea2` `f7c47de` `40a55bd` `f01c9a0` | 영상 해설 축소판, 기록, 안내 팝업과 내 작업실 저장, README 반영, 빠진 입력 알림 |
| 선택-2 | `7f9d1ba` `d2c8dc5` `3a24418` | 도안 풀어 보기, 코 수 확인과 단 체크, 단마다 물어보기, 범위 단 체크·화면 다듬기 |
| 그 밖 | `319766a` | 헤더 로고를 누르면 내 작업실로 이동 |

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
| 수정 | 전체 | 수업 템플릿 형식으로 다시 작성: 단계-순번 번호, PRD 번호, P1~P3, 확인 방법, 제외 목록 | 수업 템플릿 형식이 진행 보고·확인에 편했음(지난 다른 과제에서 써 봄) |
| 추가 | 1-7 | 화면 용어 통일(PRD 6-1 "쓰는 말" 표) | 지난 과제 때 개발 중에 용어를 계속 바꿔서 PRD, Todo, 코드를 모두 고쳐야 했음 |
| 추가 | 6-13 | 직접 코스터를 디자인하고 휴대폰으로 실제로 떠 보기 | 완성 기준을 다 통과해도 실제로 써 봐야 보이는 불편이 있었음 |
| 수정 | 1-6 | 딸기우유 분홍 포인트 → 세이지 그린 메인 + 피치 포인트 | 색·글꼴·간격 규칙이 구체적으로 정리된 디자인 문서(DESIGN.md)를 따르기로 함 |
| 수정 | 5-1 | AI 제공사 Claude Opus 5.5 → Gemini API 무료 버전(월 사용 한도 설정 대신 무료 한도 확인) | 과제라 비용 없이 쓰고 싶음. Claude API는 무료 사용량이 없음([4-2](#4-2-claude-api) 참고) |
| 테스트 후 추가 | 2-12 | 빈 격자 템플릿 2종 추가(배색은 바탕색 하나만, 무늬 템플릿과 나눠 보여 줌) | 직접 써 보니 무늬가 칠해진 템플릿만 있어서, 처음부터 그리려면 하트·산을 일일이 지워야 했음 |
| 테스트 후 변경 | 1-6 | 페이지 바탕색 크림 `#FAF7F0` → 흰색 `#FFFFFF` | 써 보니 크림 바탕보다 흰 바탕이 더 깔끔해 보였음 |
| 테스트 후 변경 | 1-6, 1-7 | 전체 화면 디자인 개편: 브랜드 로고와 공통 헤더, 작업실 소개 영역, 레이아웃 정리, 설정을 오른쪽 위 메뉴로 옮김, 따라 뜨기 버튼 "이 단 끝!" → "N단 완료하기", 다 뜨면 "완성! 내 작업실로 가기" 버튼, 제목 위 장식용 영어 문구 허용 | 화면마다 헤더와 배치가 제각각이라 한 사이트처럼 보이지 않았음 |
| 테스트 후 추가 | 7-1 ~ 7-6 | 7단계 추가: 바로 따라 뜨기, 새로고침 후 화면 유지, AI 배색 지시문(차분한 실 색, 바탕·무늬 밝기 차이), 정사각형 단 수 안내, AI 대화 저장. AI 대화 저장은 PRD 9번 결정("저장하지 않는다")도 바꿈 | 6단계 점검에서 직접 써 보니 불편한 점 5개가 나옴. 대화는 나갔다 오면 같은 설명을 다시 물어야 해서 무료 한도를 씀 |
| 추가 | 선택-1 | 유튜브 영상 해설 축소판: 자막 붙여넣기 → AI가 단계·시각 정리 → 누르면 그 시각부터 재생 (PRD 5번 문구도 수정) | 필요한 기능이라고 판단함. 링크만으로는 자막을 받을 수 없어 자막을 직접 붙여 넣는 축소판으로 |
| 테스트 후 추가 | 선택-1 | 영상 화면에 들어오면 사용 방법과 지금 안 되는 것을 알려 주는 팝업, "다시 보지 않기" | 주소만 넣으면 되는 줄 알 수 있어서, 자막도 넣어야 한다는 걸 먼저 알려 주려고 |
| 테스트 후 추가 | 선택-1 | 정리한 영상 단계를 내 작업실 "영상으로 배운 것"에 자동 저장, 다시 열기·삭제 | 영상으로 배운 걸 나중에 다시 보려면 자막을 또 붙여 넣어야 했음 |
| 테스트 후 변경 | 1-7, 3-6 | 수준 이름 "완전 초보 / 기초는 앎" → "차근차근 / 핵심만" | 수준이 실제로 바꾸는 건 AI 도우미의 설명 방식뿐이라, 사람을 부르는 이름 대신 설명 방식으로 이름을 붙임 |
| 테스트 후 변경 | 6-13 | "휴대폰으로" → "노트북(또는 휴대폰)으로" 떠 보기 | 실제로는 노트북 화면을 옆에 두고 떠 봄. 휴대폰 폭 화면은 6-10에서 375px로 이미 확인함 |
| 추가 | 선택-2, 제외-4·5 | 도안 풀어 보기: 남의 글 도안을 붙여 넣으면 단별로 풀고 코 수 확인, 단 체크. 제외-4·5(원형·다른 기법)는 직접 디자인에만 적용 | 만든 이유 중 하나가 "남의 도안을 볼 때 자세히 알려 주는 곳"인데 영상으로만 됐음. 실제 도안을 보니 대부분 원형이고 `(짧은뜨기, 늘리기)*6 [18]`처럼 줄여 써서 초보가 읽기 어려움 |
| 테스트 후 변경 | 선택-2 | AI에게 보낼 때 적힌 코 수를 지우고 줄 번호를 붙임, 원문은 코드가 줄 번호로 꺼냄 | AI가 틀린 코 수를 베껴서 "도안과 같아요"라고 보여 줌 |
| 테스트 후 추가 | 선택-2 | AI가 코 수를 못 세면 경고, 휴대폰에서는 풀이를 입력칸보다 먼저 | 확인 문구가 조용히 사라지는 단이 있었고, 휴대폰에서 다시 열면 풀이가 안 보였음 |
| 테스트 후 추가 | 7-7 | 브라우저·휴대폰 뒤로가기로 직전 화면으로 | 화면만 바뀌고 브라우저 기록이 안 남아서, 뒤로가기를 누르면 사이트 밖으로 나가 버림. 휴대폰을 옆에 두고 뜨면 습관처럼 밀어서 뒤로 감 |
| 테스트 후 추가 | 선택-2-7 | 도안 풀어 보기의 단마다 "이 단 물어보기" | README에 "남의 도안이든 막히면 물어볼 수 있다"고 썼는데, 실제로는 따라 뜨기 화면에서만 물어볼 수 있었음 |

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
| 5단계 | AI 도우미가 1단 질문에 "기둥코로 사슬 1코를 더 뜨고 사슬 첫 코에 넣으라"고 답함. 시작 사슬 21코에 기둥코가 이미 있어서 그대로 하면 코 수가 어긋남. 답마다 "안녕하세요, 한코한코 뜨개 도우미예요" 인사도 붙음 | 1단 질문에는 "사슬을 더 뜨지 않고 바늘에서 두 번째 사슬부터"를 코드가 함께 보내고, 지시문에 "인사 없이 바로 답한다" 추가. 다시 물어보니 두 번 모두 두 번째 사슬부터 뜨라고 답함 |
| 선택-2 | `5-8단`처럼 여러 단을 한 줄로 쓴 도안이 체크 하나로 묶여, 4단을 뜨는 동안 몇 번째 단인지 표시할 곳이 없음 | 범위 단은 단마다 체크 칸을 만들고, 모두 체크해야 그 줄이 완료. 진행률도 단 수로 셈 |
| 4단계 | 흰색을 실제 흰색으로 바꾼 뒤, 따라 뜨기 "도안 위치"와 작업실 썸네일에서 흰 단이 배경에 묻혀 1단 표시 줄이 그림 밖에 떠 있는 것처럼 보임 | 미리보기에 얇은 테두리 |
| 4단계 | 한 가지 색만 뜨는 단에도 "색이 바뀌는 지점에서…" 안내가 나옴 | 색이 2가지 이상인 단에만 보여 줌 |
| 선택-2 | 도안에 제목이 없는데 AI가 "인형 몸통"처럼 제목을 지어 붙임 | 도안에 적힌 제목을 쓰고, 없으면 "붙여 넣은 도안"으로 쓰라고 지시문을 고침 |
| 1-7 | 화면에 "내 수준 설정", "선택한 수준"이 남아 README의 "설명 방식"과 말이 다름 | 화면 문구를 "설명 방식"으로 통일 |
| 선택-2 | 일부러 틀리게 쓴 `7단: 줄이기*6 [7]`에 "✓ 7코: 도안과 같아요"가 뜸(AI가 적힌 숫자를 베낌) | 적힌 코 수를 지우고 보내 AI가 직접 세게 함. 다시 해 보니 "⚠ 도안은 7코, 풀이는 6코예요" |

### 3-4. 아직 하지 않은 것

- **휴대폰에서 화면 켜두기**: 6-13은 노트북으로 떠 봐서, 휴대폰에서 "화면 켜두기"(Wake Lock)가 실제로 켜지는지는 아직 확인하지 못했다.
- 6단계에서 써 보며 찾은 불편한 점 5개는 7단계(7-1 ~ 7-5)에서 모두 고쳤다.

---

## 4. 스킬

직접 만든 스킬은 없고, 이미 있는 스킬 4개를 썼다. 기능 개발은 Claude Code, 디자인 개편은 Codex에서 했다.

| 스킬 | 종류 | 언제 |
|---|---|---|
| ponytail | 플러그인 스킬(MIT 라이선스) | 코드를 쓴 모든 세션 |
| claude-api | Claude Code 기본 스킬 | 5단계 전, AI 제공사를 고를 때 |
| sites | Codex 플러그인 스킬(Sites) | 디자인 개편: 반응형 구성, 로컬 미리보기·검증 |
| react-best-practices | Codex 플러그인 스킬(Vercel) | 디자인 개편 후 여러 컴포넌트의 접근성·구조·성능 점검 |

### 4-1. ponytail

**무엇을 하나요?** AI가 코드를 쓸 때 "동작하는 가장 단순한 방법"을 고르게 하는 스킬이다. 코드를 쓰기 전에 7단계 사다리를 위에서부터 차례로 따져 보고, 처음으로 해결되는 단계에서 멈춘다: ① 꼭 필요한가 ② 이미 코드에 있나 ③ 표준 기능으로 되나 ④ 브라우저 기본 기능으로 되나 ⑤ 이미 설치한 라이브러리로 되나 ⑥ 한 줄로 되나 ⑦ 그래도 안 되면 최소한의 코드. 대신 입력 검사, 데이터 손실을 막는 에러 처리, 보안, 접근성은 줄이지 않는다.

**고른 이유:** 한코한코는 화면 7개짜리 작은 앱인데, AI에게 맡기면 라이브러리와 추상화를 덧붙여 코드가 금방 커진다. 과제는 README로 평가받지만 코드를 내가 이해하고 설명할 수 있어야 해서, 코드를 읽을 수 있는 크기로 유지하려고 골랐다.

**작업에서 어떻게 쓰였나요?** 세션이 시작될 때마다 자동으로 켜지게 해 두어서, 1단계부터 마지막 코드 점검까지 모든 코드 작업에 적용됐다.

| 사다리 | 한코한코에서 |
|---|---|
| ① 꼭 필요한가 | 라우터·상태 관리 라이브러리 없이 `App.jsx`의 `page` 상태로 화면 7개 사이를 이동함 |
| ② 이미 있는 것 재사용 | AI 요청 검사 함수(`src/lib/ai.js`)를 서버와 화면이 같이 씀 |
| ③ 표준 기능 | 테스트는 프레임워크 없이 Node 내장 `node --test`. Gemini 호출도 SDK 없이 `fetch` |
| ④ 브라우저 기본 기능 | 색 고르기는 `<input type="color">`, 이름 바꾸기·삭제 확인은 `prompt`/`confirm`, 진행률은 `<progress>`, 화면 켜두기는 Wake Lock API, 완성품 미리보기는 SVG |
| 결과 | 실행에 필요한 라이브러리가 `react`, `react-dom` 2개뿐 |

- **줄이지 않은 것:** 서버가 받은 요청을 하나하나 검사하고(`buildRequest`), 저장값이 망가졌는지 확인하고(`isValidPattern`), API 키를 환경 변수에만 둔 것은 스킬의 "게으르면 안 되는 곳" 규칙에 해당한다.
- **검사 하나는 남기기:** 단별 설명 변환처럼 로직이 있는 함수에만 테스트를 붙였고(38개), 화면 코드에는 테스트를 만들지 않았다.
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

스킬이 알려 준 요금(스킬의 모델 표, 2026-10-06 기준)과, 배색 추천 한 번을 입력 1,000토큰·출력 500토큰으로 잡고 계산한 비용이다. README를 정리하면서 같은 스킬로 다시 확인했다.

| 모델 | 입력 (100만 토큰당) | 출력 (100만 토큰당) | 요청 1번 | 요청 1,000번 | JSON 형식 응답 |
|---|---|---|---|---|---|
| Claude Opus 5.5 | $4.00 | $20.00 | 약 $0.014 | 약 $14 | 지원(`output_config.format`) |
| Claude Haiku 5.5 | $0.10 | $0.50 | 약 $0.00035 | 약 $0.35 | 지원 |
| Gemini Flash-Lite 무료 버전 (최종 선택) | 무료 | 무료 | $0 | $0 (분당 15회 한도) | 지원 |

Haiku도 아주 싸지만 결제 수단을 등록해야 하고, Gemini 무료 버전은 결제 없이 한도 안에서 쓸 수 있어서 과제에는 Gemini가 맞았다.

<details>
<summary>claude-api SKILL.md 설명 부분</summary>

Claude Code에 기본으로 들어 있는 스킬이라 로컬에 SKILL.md 파일이 따로 없다. 아래는 스킬 목록에 보이는 설명(SKILL.md의 description) 그대로다.

```text
Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.
TRIGGER — read BEFORE opening the target file; don't skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
```

</details>

### 4-3. sites

**무엇을 하나요?** Codex의 Sites 플러그인 스킬이다. 웹사이트를 만들거나 고칠 때 "열기 → 준비 → 구현 → 검사 → 배포" 순서를 따르게 하고, 디자인 원칙(사용자의 주 작업 중심, 기존 브랜드 유지, 반응형, 읽기 쉬운 글자, 접근 가능한 상호작용)을 함께 준다.

**고른 이유:** 기능을 다 만든 뒤 전체 화면 디자인을 개편해야 했다. 화면이 여러 개라 한 번에 고치면 휴대폰 폭에서 깨지기 쉬워서, 반응형 구성과 로컬 미리보기·검증 순서가 정해진 스킬을 골랐다.

**작업에서 어떻게 쓰였나요?**

- 전체 화면 디자인 개편(`a11e77e`: 브랜드 헤더, 흰 바탕, 설정 위치, 화면 전환)과 편집기 3단 화면 개편(`6c44452`: 옵션 / 격자 / 미리보기·단별 설명)에 썼다.
- 스킬의 "로컬 전용" 흐름만 썼다. 배포는 이미 Vercel로 하고 있어서, Sites 호스팅 등록·게시 단계는 건너뛰었다.
- 먼저 스킬의 디자인 원칙에 따라, 미리 정해 둔 디자인 방향("포근한 뜨개 작업실 + 깔끔한 편집 도구", 크림·세이지·피치)과 지금 화면을 비교해 화면별로 바꿀 점을 정리한 뒤 고쳤다.
- 고친 화면을 로컬 미리보기로 띄워 375px 폭에서 수준 선택 → 내 작업실 → 템플릿 → 편집기 → 따라 뜨기 전체 흐름을 확인했다.
- 이 미리보기 확인에서 새 화면이 비어 보이는 문제를 찾았다. 화면을 옮길 때 스크롤을 맨 위로 올리는 효과(`useEffect`)가 원인이어서 고쳤다(`src/App.jsx`).

<details>
<summary>sites SKILL.md 전문</summary>

````markdown
---
name: sites
description: Use Sites when the user wants a website built for them (including a landing page, portfolio, dashboard, portal, tracker, hub, game, event registration, or tool), requests changes to a website already built with Sites, wants to publish a website with Sites, or wants to manage Sites hosting.
---

# Sites

Take the requested website through the supported development and publishing workflow. Publish completed new Sites and edits unless the user requests local-only work or saving without deployment. New Sites start private; preserve an existing Site's audience unless the user requests a change. Native tool approvals apply without an additional conversational publishing gate.

For hosting-only changes, use the relevant native Sites tool and confirm its returned state; source preparation is needed only for source changes or publication.

## Workflow

`<plugin-root>` is the installed directory containing `scripts/` and `skills/`. Run helpers with absolute paths and literal arguments from the selected checkout. Keep credentials in session memory and pass them through stdin, never shell arguments, files, or output.

### 1. Select and open

Default to a new Site unless a specific existing Site is identified.

- **Existing hosted Site:** retain its `project_id` and audience, call `get_site` and `create_source_repository_write_credential`, and open with the [source helper](#source-helper) before editing. Omit `archivePath`; use an empty directory when source is missing, then the returned `checkout_path`.
- **New Site:** create a unique, new empty project subdirectory in the task's workspace, normally `/workspace/sites/<slug>` in managed Linux. Default simple pages and browser-local interactions to buildless HTML/JS; use the supplied Vinext starter for server behavior. Preserve retained templates.
- **Local-only:** use the available checkout; skip registration, source synchronization, and publication.

### 2. Prepare and launch

For new Vinext projects, run:

```text
node <plugin-root>/scripts/project-setup.mjs
```

This copies the starter and configures ignored checkout-local state. Helpers select `managed-linux` only for `SITES_MANAGED_LINUX_CONTAINER=1`, otherwise `portable`. For buildless HTML/JS, prepare `dist/` for `index.html` and assets; skip starter setup, installation, and build.

For a retained template, add `--template-source <absolute-sanitized-source-directory>`; exclude Site identity, Git metadata, credentials, and runtime data. For explicitly requested Worker ESM, add `--starter worker-esm` and follow [its README](templates/worker-esm-starter/README.md). Use [Troubleshooting](references/troubleshooting.md#project-configuration) for profile repair or static-to-Worker migration.

After minimal setup, launch registration for new hosted work in a retained execution cell when available. Native `create_site` creates a private, unpublished Site and returns its ID and source credential. Immediately persist the ID when it returns. For static Sites, include `--static-directory` when known to set both fields at once; omit it for Worker builds. For buildless HTML/JS, run:

```text
node <plugin-root>/scripts/set-project-id.mjs --project-id <returned-id> --static-directory dist
```

Reuse an existing ID or registration attempt; resolve uncertain creation before retrying. For app integrations, first read [discovery and declarations](references/app-integrations.md#discover-and-declare).

Start needed dependency installation before feature implementation:

```text
node <plugin-root>/scripts/install-dependencies.mjs
```

Run only when dependencies are missing or their inputs changed. The installer handles host settings, package-manager selection, and interrupted setup; it takes no flags. Use one installer; keep dependency inputs unchanged while it runs. Proceed to implementation once the applicable operations are launched.

For managed-image pnpm additions, use `node "$SITES_PNPM_BIN" add <package>`.

Start required image search or generation when its brief is clear, alongside independent source work. Consider a parallel subagent for image downloads. Delegate bounded asset or research tasks; the Site owner handles the checkout, native Sites calls in the owning conversation, and publication.

### 3. Implement

Write application files while setup runs. For hosted work, await persisted Site identity before further manifest edits or source synchronization. Await installed dependencies before commands that need them.

Implement the requested experience in one focused pass; revise for observed failures or unmet requirements. Replace starter title and description and remove temporary `codex-preview` metadata during implementation. Integrate required assets and complete the requested behavior before publishing.

When `SITES_MANAGED_LINUX_CONTAINER=1`, preview is internal QA. Start it only when the task needs browser QA and `cua_repl.js` is available. If `cua_repl.js` is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.

When `SITES_MANAGED_LINUX_CONTAINER` is not `1`, use local preview. In visible tasks with user-facing preview support, show the first recognizable version once it serves successfully and keep it current. Background tasks skip user-facing handoff.

Before any preview, browser test, or screenshot, read the selected reference: [managed](references/preview/managed.md) or [local](references/preview/local.md). If preview infrastructure is unavailable, report the verification limit and continue appropriate checks and publication unless passing browser QA is required. Follow [Troubleshooting](references/troubleshooting.md#preview) after failures.

### 4. Validate and package

Collect any remaining registration and installation results, then finalize the source manifest before checks/builds and packaging.

#### Hosting manifest

The tracked `.openai/hosting.json` declares Site identity and deployment configuration. After registration, a minimal static Site uses:

```json
{
  "project_id": "<returned-id>",
  "static": {"directory": "dist"}
}
```

| Field | Contract |
| --- | --- |
| `project_id` | Persist with `set-project-id.mjs` on creation; preserve on updates. |
| `static` | Object with `directory`: `dist`, `dist/client`, `out`, `build`, or `.output/public`. Omit for Worker builds. |
| `d1`, `r2` | [Storage bindings](references/storage.md#bindings); leave unused bindings `null`. |
| `capabilities` | Declare [a Site MCP server](references/site-mcp-server.md#build-the-server) when needed. |
| `plugins`, `connectors` | [App integration declarations](references/app-integrations.md#discover-and-declare). |

Preserve existing fields. Edit the source manifest; build helpers emit Worker deployment metadata.

Run checks appropriate to the change; lint only when requested. For hosted work, package with the source helper using remaining checks/builds as ordered argument arrays and an absolute `archivePath`. Pass the complete prior opening result as `source` when available.

Buildless HTML/JS uses `commands: []` when no checks remain. Framework projects, including Vinext and static exports, build with `["node", "<plugin-root>/scripts/build-site.mjs"]`. Omit commands already completed successfully with unchanged inputs. Local-only work runs checks/builds directly and skips packaging for publication.

#### Source helper

Use the repository access from registration or `create_source_repository_write_credential` for the same Site. If `auth_mode` is `work_proxy`, it contains no token. Use the same helper or ordinary Git with `remote_url`; Work supplies authentication outside the executor. If Git reports expired access, call `create_source_repository_write_credential` again. Do not configure a token or authentication header for this mode.

```text
node <plugin-root>/scripts/site-workflow.mjs --project-id <project_id>
```

Launch with `exec_command(tty: true, yield_time_ms: 1000)`. After `Ready for Site workflow JSON on stdin (input is hidden).`, send one newline-terminated JSON object with `write_stdin`. Wait for successful exit and retain the final JSON result.

| Input | Value |
| --- | --- |
| `credential` | Returned credential object, through stdin only. |
| `source` | Complete prior opening result, when available. |
| `commands` | Remaining checks/builds as ordered argument arrays; packaging only. |
| `archivePath` | Absolute output archive path for packaging; omit for opening. |

The helper owns Git preparation, ordered commands, commit/push, and packaging. Pass its verified `project_id`, `commit_sha`, and `archive` directly to publishing; keep the archive unchanged until saving succeeds.

### 5. Publish

Use the audience from creation or `get_site`; refresh unknown or changed ownership/access before selecting a tool.

| Audience | Native calls |
| --- | --- |
| Confirmed owner-private | `save_version_and_deploy_private`; if unavailable, `save_site_version` then `deploy_private_site_version`. |
| Other supported audiences | `save_site_version` then `deploy_site_version`. |

Save-only uses `save_site_version` without deployment. A matching archive-backed saved version needs only deployment; source-only versions still need their matching archive. Preserve returned version IDs, including `saved_version_id`, when resuming. Continue an existing deployment rather than starting another.

### 6. Finish

Poll `get_deployment_status` only for `pending`, `building`, or `publishing`; stop on a terminal result. A successful native result with its URL verifies deployment without another status call or browser visit.

Return the literal deployed URL, saved version for save-only work, or local result. In visible tasks, open the deployed URL in the existing Site tab with `open_in_codex` or equivalent when supported; background tasks skip browser handoff. Handoff failure does not invalidate a verified deployment. Report incomplete verification or blockers; read [Troubleshooting](references/troubleshooting.md) after a failure or incomplete result.

## Design

Build around the user's primary task. Choose a coherent visual direction suited to the subject and audience, and preserve established branding when editing. Keep layouts responsive, text readable, and interactions accessible. Use imagery when it contributes to the experience.

Keep functionality within the requested scope. For open-ended presentation-led briefs, develop content and structure as needed for a complete experience. Preserve explicit content constraints and keep bounded edits bounded.

Read applicable guidance before choosing content and structure. Select by the experience's purpose, not merely its visual subject.

| Design guidance | When to use it |
| --- | --- |
| [Presentation-led sites](references/design/presentation-led.md) | New websites primarily meant to introduce, explain, persuade, or showcase: landing pages, marketing sites, portfolios, and interactive presentation sites. |

## Capabilities

Choose capabilities from the requested behavior and preserve those an existing Site uses. This is a reference index, not a checklist of features to add. Read only the relevant pages.

| Capability | When to use it |
| --- | --- |
| [Data and files](references/storage.md) | Durable records in D1 and uploads or generated files in R2. |
| [Identity and access](references/identity-and-secrets.md) | ChatGPT sign-in, user-owned data, runtime secrets, and private service access. |
| [App integrations](references/app-integrations.md) | Let the Site read data and perform actions in apps visitors have connected to ChatGPT. |
| [Site MCP server](references/site-mcp-server.md) | Expose the Site's operations as tools agents can call. |
| [Browser agent support (WebMCP)](references/browser-agent-support.md) | Optionally make the page's actions easier for browser agents to use. |
| [Scheduled updates](references/recurring-updates.md) | Update a published Site while it is closed, using an unattended data path and a linked automation. |

Hosted server code runs in Cloudflare Workers, with 128 MB per isolate and HTTP-based external connections; raw TCP is unavailable. Preserve the starter's `sites()` build integration. Capability references specify any required manifest declarations; not every feature is a `capabilities` entry.
````

</details>

### 4-4. react-best-practices

**무엇을 하나요?** Vercel 플러그인의 React 점검 스킬이다. 여러 React 컴포넌트를 고친 뒤 컴포넌트 구조, 훅 사용, 접근성, 성능을 체크리스트로 점검하게 한다. 규칙 64개가 8개 분야로 나뉘어 있고 영향이 큰 순서로 우선순위가 붙어 있다.

**고른 이유:** 디자인 개편 때 여러 컴포넌트(`Brand.jsx`, `Helper.jsx`, `Preview.jsx`와 각 화면)를 한꺼번에 고쳤다. 모양만 바꾸다 접근성이나 구조가 망가지지 않았는지 따로 확인하고 싶어서 골랐다.

**작업에서 어떻게 쓰였나요?**

- 디자인 개편에서 화면 5개(`Level`, `Home`, `Templates`, `Editor`, `Knit`)와 `Brand` 컴포넌트를 한꺼번에 고친 뒤, 마무리 단계에서 이 스킬로 점검했다.
- 모양을 바꾸면서 키보드 포커스 표시와 손가락으로 누르기 충분한 버튼 크기 같은 접근성이 그대로 유지되는지 확인했다. 기능과 저장 데이터는 건드리지 않았다.
- 점검 뒤 테스트 19개, 빌드, 린트가 모두 통과했고, 새 브라우저 세션에서 콘솔 오류가 없었다.
- 한코한코는 Next.js나 서버 컴포넌트를 쓰지 않는 Vite + React 앱이라, 서버 성능·데이터 가져오기 규칙은 해당하지 않았다. 다시 그리기(re-render), 렌더링, 일반 자바스크립트 규칙만 해당됐다.

<details>
<summary>react-best-practices SKILL.md 전문</summary>

````markdown
---
name: react-best-practices
description: React best-practices reviewer for TSX files. Triggers after editing multiple TSX components to run a condensed quality checklist covering component structure, hooks usage, accessibility, performance, and TypeScript patterns.
metadata:
  priority: 4
  docs:
    - "https://react.dev/reference/react"
    - "https://react.dev/learn"
  pathPatterns:
    - 'src/components/**/*.tsx'
    - 'src/components/**/*.jsx'
    - 'app/components/**/*.tsx'
    - 'app/components/**/*.jsx'
    - 'components/**/*.tsx'
    - 'components/**/*.jsx'
    - 'src/ui/**/*.tsx'
    - 'lib/components/**/*.tsx'
  bashPatterns: []
  importPatterns:
    - 'react'
    - 'react-dom'
validate:
  -
    pattern: 'from\s+[''"](styled-components|@emotion/styled|@emotion/react|@mui/material|@chakra-ui/react)[''"]|styled\.'
    message: 'Legacy CSS-in-JS or component library detected. Consider shadcn/ui + Tailwind for modern Vercel-native UI.'
    severity: warn
    upgradeToSkill: shadcn
    upgradeWhy: 'Migrate from CSS-in-JS/MUI/Chakra to shadcn/ui + Tailwind CSS for better SSR performance and Vercel ecosystem alignment.'
    skipIfFileContains: '@/components/ui|shadcn|tailwindcss'
retrieval:
  aliases:
    - react review
    - component quality
    - tsx linter
    - react patterns
  intents:
    - review react code
    - improve component quality
    - check accessibility
    - optimize react
  entities:
    - hooks
    - accessibility
    - React
    - TSX
    - component
chainTo:
  -
    pattern: 'from\s+[''\"](styled-components|@emotion/styled|@emotion/react|@mui/material|@chakra-ui/react)[''"]|styled\.'
    targetSkill: shadcn
    message: 'Legacy CSS-in-JS or component library detected — loading shadcn/ui guidance for modern Vercel-native UI.'

---

# Vercel React Best Practices

Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains 64 rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.

## When to Apply

Reference these guidelines when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Quick Reference

### 1. Eliminating Waterfalls (CRITICAL)

- `async-defer-await` - Move await into branches where actually used
- `async-parallel` - Use Promise.all() for independent operations
- `async-dependencies` - Use better-all for partial dependencies
- `async-api-routes` - Start promises early, await late in API routes
- `async-suspense-boundaries` - Use Suspense to stream content

### 2. Bundle Size Optimization (CRITICAL)

- `bundle-barrel-imports` - Import directly, avoid barrel files
- `bundle-dynamic-imports` - Use next/dynamic for heavy components
- `bundle-defer-third-party` - Load analytics/logging after hydration
- `bundle-conditional` - Load modules only when feature is activated
- `bundle-preload` - Preload on hover/focus for perceived speed

### 3. Server-Side Performance (HIGH)

- `server-auth-actions` - Authenticate server actions like API routes
- `server-cache-react` - Use React.cache() for per-request deduplication
- `server-cache-lru` - Use LRU cache for cross-request caching
- `server-dedup-props` - Avoid duplicate serialization in RSC props
- `server-hoist-static-io` - Hoist static I/O (fonts, logos) to module level
- `server-serialization` - Minimize data passed to client components
- `server-parallel-fetching` - Restructure components to parallelize fetches
- `server-after-nonblocking` - Use after() for non-blocking operations

### 4. Client-Side Data Fetching (MEDIUM-HIGH)

- `client-swr-dedup` - Use SWR for automatic request deduplication
- `client-event-listeners` - Deduplicate global event listeners
- `client-passive-event-listeners` - Use passive listeners for scroll
- `client-localstorage-schema` - Version and minimize localStorage data

### 5. Re-render Optimization (MEDIUM)

- `rerender-defer-reads` - Don't subscribe to state only used in callbacks
- `rerender-memo` - Extract expensive work into memoized components
- `rerender-memo-with-default-value` - Hoist default non-primitive props
- `rerender-dependencies` - Use primitive dependencies in effects
- `rerender-derived-state` - Subscribe to derived booleans, not raw values
- `rerender-derived-state-no-effect` - Derive state during render, not effects
- `rerender-functional-setstate` - Use functional setState for stable callbacks
- `rerender-lazy-state-init` - Pass function to useState for expensive values
- `rerender-simple-expression-in-memo` - Avoid memo for simple primitives
- `rerender-split-combined-hooks` - Split hooks with independent dependencies
- `rerender-move-effect-to-event` - Put interaction logic in event handlers
- `rerender-transitions` - Use startTransition for non-urgent updates
- `rerender-use-deferred-value` - Defer expensive renders to keep input responsive
- `rerender-use-ref-transient-values` - Use refs for transient frequent values
- `rerender-no-inline-components` - Don't define components inside components

### 6. Rendering Performance (MEDIUM)

- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG element
- `rendering-content-visibility` - Use content-visibility for long lists
- `rendering-hoist-jsx` - Extract static JSX outside components
- `rendering-svg-precision` - Reduce SVG coordinate precision
- `rendering-hydration-no-flicker` - Use inline script for client-only data
- `rendering-hydration-suppress-warning` - Suppress expected mismatches
- `rendering-activity` - Use Activity component for show/hide
- `rendering-conditional-render` - Use ternary, not && for conditionals
- `rendering-usetransition-loading` - Prefer useTransition for loading state
- `rendering-resource-hints` - Use React DOM resource hints for preloading
- `rendering-script-defer-async` - Use defer or async on script tags

### 7. JavaScript Performance (LOW-MEDIUM)

- `js-batch-dom-css` - Group CSS changes via classes or cssText
- `js-index-maps` - Build Map for repeated lookups
- `js-cache-property-access` - Cache object properties in loops
- `js-cache-function-results` - Cache function results in module-level Map
- `js-cache-storage` - Cache localStorage/sessionStorage reads
- `js-combine-iterations` - Combine multiple filter/map into one loop
- `js-length-check-first` - Check array length before expensive comparison
- `js-early-exit` - Return early from functions
- `js-hoist-regexp` - Hoist RegExp creation outside loops
- `js-min-max-loop` - Use loop for min/max instead of sort
- `js-set-map-lookups` - Use Set/Map for O(1) lookups
- `js-tosorted-immutable` - Use toSorted() for immutability
- `js-flatmap-filter` - Use flatMap to map and filter in one pass

### 8. Advanced Patterns (LOW)

- `advanced-event-handler-refs` - Store event handlers in refs
- `advanced-init-once` - Initialize app once per app load
- `advanced-use-latest` - useLatest for stable callback refs

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/async-parallel.md
rules/bundle-barrel-imports.md
```

Each rule file contains:
- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
````

</details>

---

## 5. 느낀점, 결론

<!-- 📷 (있으면) 사진 ④ 실제로 뜬 코스터 + 화면 속 도안 나란히
     사진을 docs/images/coaster.jpg 로 넣은 뒤 주석을 풀기
<img src="docs/images/editor.png" alt="화면 속 도안" width="48%"> <img src="docs/images/coaster.jpg" alt="실제로 뜬 코스터" width="48%">

*왼쪽은 한코한코로 만든 도안, 오른쪽은 그 도안을 보며 실제로 뜬 코스터.*
-->

(작성 예정)

<!--
참고용 재료 (화면에는 안 보임)
- TODO.md 테스트 기록의 "써 보니 불편한 점" 5개
- PRD 9번의 처음 결정 → 바꾼 결정 (AI 제공사, 빈 격자 템플릿)
- AI가 색 순서를 바꿔 말한 일과 지시문으로 고친 일 (5단계)
- 기획 단계에서 유튜브 해설을 핵심에서 선택으로 뺀 일
-->
