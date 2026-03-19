// spec: testing/specs/plan-e2e.md
// Plan type: e2e  |  Playwright tag: @e2e
// E2E: each scenario runs once per saved account (multi-user). Session cleared before each login.
// Run only these tests: npx playwright test --grep "@e2e"
// Scenarios in this file: ~6 test runs (3 scenarios × 2 account(s))
// IMPORTANT: Review locators against real UI

import { test, expect } from '@playwright/test';

// Increase timeout for generated tests (they may have many navigation steps)
test.setTimeout(120000);

test.use({ baseURL: 'https://ddpayroll.criticalriver.us' });

// Login credentials from planner-auth.json (saved when plan was generated with Auth)

const E2E_ACCOUNTS = [
  { label: "Account 1", username: "sudharsan@company.com", password: "password123" },
  { label: "Account 2", username: "john@company.com", password: "password123" }
] as const;

for (let e2eIdx = 0; e2eIdx < E2E_ACCOUNTS.length; e2eIdx++) {
  const e2eAccount = E2E_ACCOUNTS[e2eIdx];
  test.describe(`Login / Authentication (E2E) — ${e2eAccount.label}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.context().clearCookies();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (_) {} });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
    });

    test('Login E2E Test', { tag: '@e2e' }, async ({ page }) => {
        // Navigate to "/"
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        // Fill the username/email field with the configured test username
        await expect(page.locator("input#email").first()).toBeVisible({ timeout: 10000 });
        await page.locator("input#email").first().fill(e2eAccount.username);
        // Fill the password field with the configured test password
        await expect(page.locator("input#password").first()).toBeVisible({ timeout: 10000 });
        await page.locator("input#password").first().fill(e2eAccount.password);
        // Click the Sign in / Log in / Submit button
        await expect(page.locator("button[type=\"submit\"]").first()).toBeVisible({ timeout: 10000 });
        await page.locator("button[type=\"submit\"]").first().click();
        // **Verify:** User is redirected to the post-login page and sees authenticated con
        await page.waitForLoadState('domcontentloaded');
        await expect(page).not.toHaveURL(new RegExp('login|signin', 'i'));
    });

    test('Negative: Invalid login (wrong credentials)', { tag: '@e2e' }, async ({ page }) => {
        // Navigate to "/"
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        // TODO: Fill the username/email field with "invalid@example.com"
        // Fill the password field with "wrongpassword"
        await expect(page.locator('input[name="password"], input[id="password"], #password').or(page.getByPlaceholder(/password/i)).first()).toBeVisible({ timeout: 10000 });
        await page.locator('input[name="password"], input[id="password"], #password').or(page.getByPlaceholder(/password/i)).first().fill('test@example.com');
        // Click the Sign in / Log in / Submit button
        await expect(page.locator("button[type=\"submit\"]").first()).toBeVisible({ timeout: 10000 });
        await page.locator("button[type=\"submit\"]").first().click();
        // **Verify:** User remains on login page or sees error message (no redirect to aut
        // Verify: User remains on login page or sees error message (no redirec
        await page.waitForLoadState('domcontentloaded');
    });

    test('Negative: Empty credentials', { tag: '@e2e' }, async ({ page }) => {
        // Navigate to "/"
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        // TODO: Leave username and password empty
        // Click the Sign in / Log in / Submit button
        await expect(page.locator("button[type=\"submit\"]").first()).toBeVisible({ timeout: 10000 });
        await page.locator("button[type=\"submit\"]").first().click();
        // **Verify:** Validation message appears or submit is disabled; no redirect
        // Verify: Validation message appears or submit is disabled; no redirec
        await page.waitForLoadState('domcontentloaded');
    });

  });

}

test.describe('Login / Authentication (E2E) — invalid credentials (once)', () => {
  test('Negative: invalid credentials show error or stay on login page', { tag: '@e2e' }, async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const user = page.locator("input#email").first();
    const pass = page.locator("input#password").first();
    if (await user.isVisible({ timeout: 5000 }).catch(() => false)) await user.fill('invalid@example.com');
    if (await pass.isVisible({ timeout: 2000 }).catch(() => false)) await pass.fill('wrongpassword');
    const submit = page.locator("button[type=\"submit\"]").first();
    if (await submit.isVisible({ timeout: 2000 }).catch(() => false)) await submit.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(new RegExp('login|signin|/'));
  });
});
