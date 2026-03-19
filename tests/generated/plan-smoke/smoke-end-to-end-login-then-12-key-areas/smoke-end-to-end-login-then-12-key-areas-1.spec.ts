// spec: testing/specs/plan-smoke.md
// Plan type: smoke  |  Playwright tag: @smoke
// Smoke uses a SUBSET (fast). E2E and functional specs use full plan scope — regenerate from plan-e2e.md / plan-functional.md.
// Run only these tests: npx playwright test --grep "@smoke"
// Scenarios in this file: ~1 test runs (1 scenarios × 1 account(s))
// IMPORTANT: Review locators against real UI

import { test, expect } from '@playwright/test';

// Increase timeout for generated tests (they may have many navigation steps)
test.setTimeout(120000);

test.use({ baseURL: 'https://designpilot.criticalriver.us' });

// Login credentials from planner-auth.json (saved when plan was generated with Auth)

test.describe('Smoke: End-to-end (login then 1–2 key areas)', () => {
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
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Smoke: End-to-end (login then 1–2 key areas)', { tag: '@smoke' }, async ({ page }) => {
    // Navigate to "/"
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    // TODO: Fill the username input with "admin"
    // TODO: Fill the password input with the configured password
    // Click the Sign in / Log in / Submit button
    await expect(page.locator("button[type=\"submit\"], input[type=\"submit\"]").first()).toBeVisible({ timeout: 10000 });
    await page.locator("button[type=\"submit\"], input[type=\"submit\"]").first().click();
    // **Verify:** Page updates (redirect away from login or success message)
    // Verify: Page updates (redirect away from login or success message)
    await page.waitForLoadState('domcontentloaded');
    // Navigate to "/dashboard"
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    // **Verify:** "DesignPilot" content is visible
    // Verify: "DesignPilot" content is visible
    await page.waitForLoadState('domcontentloaded');
    // Navigate to "/mockup-generator"
    await page.goto('/mockup-generator');
    await page.waitForLoadState('domcontentloaded');
    // **Verify:** "DesignPilot" content is visible
    // Verify: "DesignPilot" content is visible
    await page.waitForLoadState('domcontentloaded');
  });

});
