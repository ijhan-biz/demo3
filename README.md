# demo3 — 완료 상태 백업 준비

**AI Genius 시즌 5 에피소드 3 — AI로 완성하는 코드 리뷰부터 보안, 배포까지**

demo3는 **완료 상태 백업을 준비하는 저장소**입니다. 아직 완료된 백업이나
완료된 실습 결과가 아닙니다. 현재는 로컬 기준 소스와 문서만 준비하며,
원격 저장소 생성·푸시·에이전트 실행·PR 생성·병합·배포는 수행하지 않았습니다.

## 기준 소스와 현재 상태

- 직접 가져온 소스: [ijhan-biz/demo2, 0c223e286763df0e243e4e263f14a099d684b271](https://github.com/ijhan-biz/demo2/tree/0c223e286763df0e243e4e263f14a099d684b271)
- 이전 출처: [ijhan-biz/ship-with-ai-demo, 79d310030b681765f4a51050a11829d992c9d831](https://github.com/ijhan-biz/ship-with-ai-demo/commit/79d310030b681765f4a51050a11829d992c9d831)
- 원작: [anothergeorgecoldham/ship-with-ai](https://github.com/anothergeorgecoldham/ship-with-ai)
- 기준은 **한국어 Astro 페이지 10개와 테스트 48개**입니다.
  `src/pages/lesson.astro`와 **세션 요약** 메뉴는 이미 존재합니다.
- 가져온 홈에는 파란 배너 **`DEMO3-UPDATE-02`**가 있습니다.
  새 홈 UI **`DEMO3-LIVE-03`**는 아직 구현하지 않았습니다.

10개 페이지·48개 테스트는 기준 기대값이지 이번 실행의 검증 결과가 아닙니다.
실제 테스트는 주 작업 담당자가 별도로 실행·기록합니다.
출처의 커밋 이력·PR·Actions·배포는 demo3의 증거가 아닙니다.
과거 출처의 PR 번호를 demo3 기록으로 바꾸어 소개하지 않습니다.
향후 원격 상태는 **demo3의 실제 PR·Actions 링크와 해당 SHA**로만 설명합니다.

## 예정 주소

- 독립 공개 저장소: <https://github.com/ijhan-biz/demo3>
- GitHub Pages: <https://ijhan-biz.github.io/demo3>

생성·배포 예정 주소이며 현재 서비스가 준비되었다는 뜻이 아닙니다.

## 향후 홈 UI 작업

다음 작업은 demo2 LIVE03과 동일한 홈 UI입니다. 개요는 `DEMO3-LIVE-03` hero,
6단계 `ol`, 탐색 카드 3개, CTA 2개, 홈 전용 최대 폭 1200px의
charcoal/rose 디자인과 390px 모바일 대응입니다.

**이 개요와 이슈 템플릿은 정확한 전체 이슈 명세를 대체하지 않습니다.**
정확한 전체 이슈 초안은 **저장소 밖의 로컬 생성계획 JSON**에서 관리하며,
사용자가 그 원문을 미리 보고 승인한 뒤에만 이슈를 생성합니다.

향후 UI 변경 허용 파일은 `src/pages/index.astro`, `src/layouts/Layout.astro`,
`test/home.test.js`뿐입니다. 공통 Layout 변경도 홈에만 적용해야 합니다.
보안 코드·의존성·잠금 파일·워크플로·Dependabot 일정·피드백·나머지 9개 페이지는
변경하지 않습니다. 피드백의 브라우저 내 저장과 입력 검증을 유지합니다.

## 승인 후 설정할 운영 계획 — 아직 미실행

1. 공개 저장소 생성, 게시, 이슈 생성, Copilot 할당은 각각 실행 내용을
   사용자에게 미리 보여 주고 명시적으로 승인받습니다.
2. `/demo3/` 경로를 확인하고 Pages Source는 GitHub Actions,
   `github-pages` 배포 브랜치는 `main`으로 준비합니다.
   **최초 main의 CodeQL Advanced 분석과 main-push Pages 배포를 먼저 성공시킨 뒤**
   필수 CodeQL 게이트를 활성화합니다.
3. `main`은 PR 필수, 1인 데모 승인 리뷰 수 0, 리뷰 대화 해결 필수,
   우회 없음, non-fast-forward 푸시·삭제 금지로 계획합니다.
   strict 필수 검사는 `build`, `Analyze (actions)`, `Analyze (javascript-typescript)`이며,
   모두 GitHub Actions `integration_id: 15368`에 연결합니다.
   `code_scan`은 CodeQL, `error` / `high_or_higher` 기준으로 계획합니다.
4. Copilot 사용 권한을 확인하고 자동 리뷰는 `review_on_push: true`, `draft: false`로
   계획합니다. 작업 에이전트와 PR 리뷰어는 별개이며, 에이전트는 병합하지 않습니다.
5. 복사한 Dependabot yml 일정(npm 매일, GitHub Actions 매주)은 그대로 둡니다.
   원격 Dependabot alerts와 security updates는 demo2와 동일하게 **비활성화**할 계획입니다.
   Secret scanning과 push protection은 승인받은 향후 설정에서만 활성화합니다.
   보안 기능을 일괄 활성화하지 않습니다.
6. 병합 직전 **최신 diff·리뷰·검사 결과를 사용자에게 보여 주고 명시적 승인**을 받습니다.
   병합은 사용자 승인에 따라 진행 담당자가 수행하며, 이후 실제 main-push 배포와 화면을 확인해야 완료입니다.

이 목록은 설정 적용이나 검증 완료를 주장하지 않습니다.
진행 순서와 증거 확인은 [RUNSHEET.md](./RUNSHEET.md)를 따릅니다.

## 로컬 검증

Node 22.23.2에서 다음 기존 명령으로 확인합니다. 로컬 성공은 원격 검사·배포 성공이 아닙니다.

```bash
npm ci
npm test
npm audit --audit-level=high
npm run build
git diff --exit-code -- package.json package-lock.json
```

감사 결과는 실행 시점에 달라질 수 있습니다. 감사 통과를 취약점 0건으로 해석하지 말고
실제 심각도별 결과를 확인합니다. `npm audit fix`나 의존성 변경으로 이번 UI 범위를 넓히지 않습니다.
