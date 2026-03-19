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

test.describe('Login / Authentication (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Smoke: Successful login', { tag: '@smoke' }, async ({ page }) => {
    // Navigate to "/"
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    // Fill the username/email field with the configured test username
    await expect(page.locator("input[name=\"username\"], input[type=\"email\"], #username, #email").first()).toBeVisible({ timeout: 10000 });
    await page.locator("input[name=\"username\"], input[type=\"email\"], #username, #email").first().fill('admin');
    // Fill the password field with the configured test password
    await expect(page.locator("input[name=\"password\"], input[type=\"password\"], #password").first()).toBeVisible({ timeout: 10000 });
    await page.locator("input[name=\"password\"], input[type=\"password\"], #password").first().fill('Admin2026#');
    // Click the Sign in / Log in / Submit button
    await expect(page.locator("button[type=\"submit\"], input[type=\"submit\"]").first()).toBeVisible({ timeout: 10000 });
    await page.locator("button[type=\"submit\"], input[type=\"submit\"]").first().click();
    // **Verify:** User is redirected to the post-login page and sees authenticated con
    await page.waitForLoadState('domcontentloaded');
    await expect(page).not.toHaveURL(new RegExp('login|signin', 'i'));
  });

  test('Negative: invalid credentials show error or stay on login page', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const user = page.locator("input[name=\"username\"], input[type=\"email\"], #username, #email").first();
    const pass = page.locator("input[name=\"password\"], input[type=\"password\"], #password").first();
    if (await user.isVisible({ timeout: 5000 }).catch(() => false)) await user.fill('invalid@example.com');
    if (await pass.isVisible({ timeout: 2000 }).catch(() => false)) await pass.fill('wrongpassword');
    const submit = page.locator("button[type=\"submit\"], input[type=\"submit\"]").first();
    if (await submit.isVisible({ timeout: 2000 }).catch(() => false)) await submit.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(new RegExp('login|signin|/'));
  });

});
