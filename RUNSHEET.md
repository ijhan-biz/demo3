# demo3 진행표 — 완료 상태 백업 준비

이 문서는 **향후 승인 후 실행할 절차**이며 성공 기록이 아닙니다.
현재는 로컬 준비만 진행합니다. 원격 생성·푸시·에이전트·PR·병합·배포는 미실행이며,
demo3는 아직 완료된 백업이 아닙니다.

## 1. 기준과 출처 확인

- 직접 소스: [demo2 / 0c223e286763df0e243e4e263f14a099d684b271](https://github.com/ijhan-biz/demo2/tree/0c223e286763df0e243e4e263f14a099d684b271)
- 이전 소스: [ship-with-ai-demo / 79d310030b681765f4a51050a11829d992c9d831](https://github.com/ijhan-biz/ship-with-ai-demo/commit/79d310030b681765f4a51050a11829d992c9d831)
- 원작: <https://github.com/anothergeorgecoldham/ship-with-ai>
- 기준 기대값: 한국어 Astro **10개 페이지·48개 테스트**. lesson과 세션 요약 메뉴는
  이미 있으며, 홈은 가져온 파란 배너 `DEMO3-UPDATE-02` 상태입니다.
  새 `DEMO3-LIVE-03` UI는 미구현입니다.

주 작업 담당자의 실제 로컬 검사 결과는 별도로 기록합니다. 이 문서는 새 결과를 주장하지 않습니다.
출처 이력·PR·Actions는 demo3 증거가 아니며, 과거 PR 번호나 실행 번호를 재사용하지 않습니다.

## 2. 사용자 미리보기 승인 후 원격 준비

공개 저장소 생성·게시 계획을 먼저 보여 주고 명시적 승인을 받습니다.
예정 주소는 <https://github.com/ijhan-biz/demo3>와 <https://ijhan-biz.github.io/demo3>입니다.
승인 전에는 생성하거나 푸시하지 않습니다.

1. 독립 공개 저장소와 초기 `main`을 준비하고 `/demo3/` 경로를 확인합니다.
2. Pages Source는 GitHub Actions, `github-pages` 배포 브랜치는 `main`으로 준비합니다.
3. **최초 main CodeQL Advanced 분석과 main-push Pages 배포를 먼저 실행·확인합니다.**
   그 뒤에 필수 CodeQL 게이트를 활성화합니다. 초기 분석 없이 게이트부터 잠그지 않습니다.
4. `main` 보호 계획: PR 필수, 승인 리뷰 0(1인 데모), 리뷰 대화 해결 필수,
   우회 없음, non-fast-forward 푸시·삭제 금지.
5. strict 필수 검사: `build`, `Analyze (actions)`, `Analyze (javascript-typescript)`.
   각 검사는 GitHub Actions `integration_id: 15368`에 연결합니다.
   `code_scan`은 CodeQL의 `error` / `high_or_higher` 기준입니다.
6. Copilot 자동 리뷰 계획: `review_on_push: true`, `draft: false`.
   해당 저장소의 실제 권한과 적용 상태는 승인 후 따로 확인합니다.
7. 복사한 Dependabot yml 일정(npm 매일·GitHub Actions 매주)은 변경하지 않습니다.
   원격 Dependabot alerts·security updates는 demo2와 동일하게 비활성화할 계획입니다.
   Secret scanning·push protection은 승인받은 향후 설정에서만 활성화합니다.
   보안 기능 일괄 활성화는 하지 않습니다.

위 항목은 **미적용 계획**입니다. 완료 여부는 demo3의 실제 설정과 PR·Actions 증거로 확인합니다.

## 3. 전체 이슈 원문 승인과 Copilot 할당

정확한 전체 이슈 초안은 **저장소 밖 로컬 생성계획 JSON**에서 관리합니다.
그 원문을 사용자에게 보여 주고 명시적 승인 후 이슈를 생성합니다.
이 진행표와 일반 기능 템플릿을 축약된 공식 명세로 사용하지 않습니다.
Copilot 할당도 별도 미리보기·명시적 승인을 받은 후에만 진행합니다.

미래 과제는 demo2 LIVE03과 동일한 홈 UI입니다. 개요는 `DEMO3-LIVE-03` hero,
6단계 `ol`, 탐색 카드 3개, CTA 2개, 홈 전용 1200px charcoal/rose 스타일,
390px 모바일 대응입니다. 정확한 문구·구조·검증 조건은 승인할 전체 원문을 따릅니다.

UI 변경 허용 파일은 `src/pages/index.astro`, `src/layouts/Layout.astro`,
`test/home.test.js`뿐입니다. Layout 스타일은 홈에만 적용합니다.
보안·의존성·잠금 파일·워크플로·Dependabot 일정·피드백·나머지 9개 페이지는 그대로 둡니다.

## 4. 실제 PR 리뷰와 최신 검사

- 실제 이슈에 연결된 PR과 작업 브랜치를 확인합니다. 에이전트 작업 완료 후 리뷰하며,
  작업 에이전트의 설명을 별도 Copilot 코드 리뷰로 간주하지 않습니다.
- 전체 diff의 허용 파일 범위와 요구 사항을 확인합니다. 워크플로 실행 승인이 필요하면
  diff·권한을 먼저 검토합니다. 실제 리뷰 의견을 처리하고 대화를 해결합니다.
- 최신 PR SHA에서 strict 필수 `build` 및 두 `Analyze` 검사, CodeQL `code_scan` 조건을
  모두 확인합니다. 추가 커밋이 생기면 다시 확인합니다.
- `build`에서는 잠금 파일 설치, 테스트, high 수준 감사, 빌드, 매니페스트·잠금 파일
  무변경을 확인합니다. 기준은 기존 48개 테스트·10개 페이지이며 필요한 홈 테스트도 검증합니다.
  감사나 로컬 테스트 통과를 CodeQL 또는 원격 검사 성공으로 대신하지 않습니다.
- 실패를 무시하거나 `npm audit fix`로 잠금 파일을 바꾸지 않습니다.
  실제 수행한 검사와 미수행 검사를 구분하고 PR·Actions 링크와 SHA를 기록합니다.

## 5. 사용자 승인 병합과 배포 확인

병합 직전 **최신 diff·리뷰·검사 결과를 사용자에게 미리 보여 주고 명시적 승인**을 받습니다.
승인 리뷰 수 0은 사용자 검토 생략을 뜻하지 않습니다.
병합은 사용자 승인에 따라 진행 담당자가 수행합니다. 코딩 에이전트 병합이나 관리자 우회는 사용하지 않습니다.

병합 후 실제 **main push**의 Actions와 Pages 배포 성공을 확인하고,
main 커밋 SHA·Actions 실행 SHA·배포 SHA를 대조합니다.
PR 검사나 수동 실행을 main-push 배포 증거로 대신하지 않습니다.
배포된 홈의 새 UI, 390px 화면, 링크·CTA, 기존 9개 페이지와 피드백 동작을 확인합니다.
피드백은 브라우저에만 저장되고 정상 입력·빈 입력 검증이 유지되어야 합니다.

실제 demo3 PR·Actions·배포 증거가 없으면 미완료로 남깁니다.
출처의 성공 기록이나 예상 URL만으로 완료를 선언하지 않습니다.
