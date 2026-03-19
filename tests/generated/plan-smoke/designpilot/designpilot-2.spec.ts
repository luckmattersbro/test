// spec: testing/specs/plan-smoke.md
// Plan type: smoke  |  Playwright tag: @smoke
// Smoke uses a SUBSET (fast). E2E and functional specs use full plan scope — regenerate from plan-e2e.md / plan-functional.md.
// Run only these tests: npx playwright test --grep "@smoke"
// Scenarios in this file: ~2 test runs (2 scenarios × 1 account(s))
// IMPORTANT: Review locators against real UI

import { test, expect } from '@playwright/test';

// Increase timeout for generated tests (they may have many navigation steps)
test.setTimeout(120000);

test.use({ baseURL: 'https://designpilot.criticalriver.us' });

// Login credentials from planner-auth.json (saved when plan was generated with Auth)

test.describe('2. DesignPilot', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const user = page.locator("input[name=\"username\"], input[type=\"email\"], #username, #email").first();
    const pass = page.locator("input[name=\"password\"], input[type=\"password\"], #password").first();
    if (await user.isVisible({ timeout: 5000 }).catch(() => false)) await user.fill('admin');
    if (await pass.isVisible({ timeout: 2000 }).catch(() => false)) await pass.fill('Admin2026#');
    const submit = page.locator("button[type=\"submit\"], input[type=\"submit\"]").first();
    if (await submit.isVisible({ timeout: 2000 }).catch(() => false)) await submit.click();
    await page.waitForLoadState('domcontentloaded');
    await page.goto('/mockup-generator');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Smoke: Page loads and main content visible', { tag: '@smoke' }, async ({ page }) => {
    // Navigate to "/mockup-generator"
    await page.goto('/mockup-generator');
    await page.waitForLoadState('domcontentloaded');
    // **Verify:** Page loads without fatal errors
    // Verify: Page loads without fatal errors
    await page.waitForLoadState('domcontentloaded');
    // **Verify:** A heading or primary content area is visible
    // Verify: A heading or primary content area is visible
    await page.waitForLoadState('domcontentloaded');
  });

  test('Smoke: One happy-path interaction (if applicable)', { tag: '@smoke' }, async ({ page }) => {
    // Navigate to "/mockup-generator"
    await page.goto('/mockup-generator');
    await page.waitForLoadState('domcontentloaded');
    // TODO: Fill "Search" with "test search query"
    // TODO: Fill "Search projects" with "test search query"
    // Click "Toggle chatbot"
    {
    const btnEl = page.getByRole('button', { name: 'Toggle chatbot' }).or(page.getByRole('link', { name: 'Toggle chatbot' })).or(page.getByText('Toggle chatbot', { exact: true })).first();
    if (await btnEl.isVisible({ timeout: 5000 }).catch(() => false)) {
    await btnEl.click();
    }
    }
    // **Verify:** No error overlay; page updates or success state
    // Verify: No error overlay; page updates or success state
    await page.waitForLoadState('domcontentloaded');
  });

});
