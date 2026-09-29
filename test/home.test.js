import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('..', import.meta.url);

async function readHome() {
  return readFile(new URL('src/pages/index.astro', root), 'utf8');
}

test('홈에 새 버전 배지와 요청한 히어로가 있고 기존 업데이트 배너는 없습니다', async () => {
  const home = await readHome();

  assert.match(home, /<Layout title="demo3 실습 시작" homeLayout=\{true\}>/);
  assert.match(home, /<p class="hero-badge">DEMO3-LIVE-03<\/p>/);
  assert.match(home, /<h1 id="hero-title">아이디어에서 배포까지, AI와 함께<\/h1>/);
  assert.match(home, /Copilot이 코드를 제안하고, 사람이 검토하며, GitHub Actions로 배포하는 개발 흐름을 한눈에 살펴보세요\./);
  assert.doesNotMatch(home, /DEMO3-UPDATE-02|update-banner|두 번째 데모 업데이트가 반영되었습니다/);
});

test('히어로 버튼과 바로가기 카드는 정규화된 BASE_URL 경로를 사용합니다', async () => {
  const home = await readHome();

  assert.ok(home.includes("const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;"));
  assert.match(home, /href=\{`\$\{base\}lesson\/`\}>세션 요약 보러 가기<\/a>/);
  assert.match(home, /href=\{`\$\{base\}diy\/`\}>직접 실습하기<\/a>/);
  assert.match(home, /href=\{`\$\{base\}pipeline\/`\}>파이프라인 안내 보기/);
  assert.match(home, /href=\{`\$\{base\}secure-supply-chain\/`\}>공급망 보안 안내 보기/);
  assert.match(home, /href=\{`\$\{base\}diy\/`\}>실습 안내 보기/);
});

test('6단계 개발 흐름은 순서 있는 목록으로 정확한 순서와 라벨을 표시합니다', async () => {
  const home = await readHome();
  const steps = home.match(/<ol class="steps">([\s\S]*?)<\/ol>/)?.[1];

  assert.ok(steps, '6단계 흐름은 ol.steps 안에 있어야 합니다');
  assert.equal((steps.match(/<li class="step-card">/g) ?? []).length, 6);
  assert.deepEqual(
    [...steps.matchAll(/<h3>(.*?)<\/h3>/g)].map(([, label]) => label),
    ['이슈 등록', 'Copilot 코드 작성', '코드 리뷰', '사람의 병합', 'Actions 검사·배포', '사이트 확인'],
  );
  assert.match(home, /개발 흐름 안내 · 실시간 실행 상태가 아닙니다/);
});

test('세 바로가기 카드, 소개 영역과 기존 피드백 위젯을 유지합니다', async () => {
  const home = await readHome();

  assert.equal((home.match(/<article class="shortcut-card">/g) ?? []).length, 3);
  assert.match(home, /<h3>파이프라인 살펴보기<\/h3>/);
  assert.match(home, /<h3>공급망 보안 이해하기<\/h3>/);
  assert.match(home, /<h3>직접 실습하기<\/h3>/);
  assert.match(home, /<FeedbackWidget \/>/);
  assert.match(home, /demo3는 AI Genius 시즌 5 에피소드 3의 완료 상태 백업을 준비하는 독립 저장소입니다/);
  assert.match(home, /시작 코드 출처는 <a href="https:\/\/github\.com\/ijhan-biz\/demo2\/tree\/0c223e286763df0e243e4e263f14a099d684b271">/);
  assert.match(home, /출처 저장소의 실행 기록은 demo3의 실행 증거가 아닙니다/);
});

test('넓은 레이아웃은 홈에서만 선택되며 다른 페이지 폭은 기본값을 유지합니다', async () => {
  const [home, layout] = await Promise.all([
    readHome(),
    readFile(new URL('src/layouts/Layout.astro', root), 'utf8'),
  ]);

  assert.match(home, /homeLayout=\{true\}/);
  assert.match(layout, /homeLayout\?: boolean;/);
  assert.match(layout, /class=\{homeLayout \? 'home-page' : undefined\}/);
  assert.match(layout, /class=\{homeLayout \? 'home-main' : undefined\}/);
  assert.match(layout, /max-width: 1200px;/);
  assert.match(layout, /--max-width: 780px;/);
  assert.match(layout, /@media \(max-width: 460px\)\s*\{\s*\.home-main \{ padding: 1rem 0\.85rem 3rem; \}/);
  assert.doesNotMatch(home, /\.home-main\s*\{/);
  assert.match(home, /outline: 3px solid var\(--home-rose-dark\);/);
  assert.match(home, /\.hero a:focus-visible \{ outline-color: var\(--home-focus-on-dark\); \}/);
});
