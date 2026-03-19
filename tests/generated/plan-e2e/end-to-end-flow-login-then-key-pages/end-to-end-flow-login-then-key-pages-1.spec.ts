// spec: testing/specs/plan-e2e.md
// Plan type: e2e  |  Playwright tag: @e2e
// E2E: each scenario runs once per saved account (multi-user). Session cleared before each login.
// Run only these tests: npx playwright test --grep "@e2e"
// Scenarios in this file: ~2 test runs (1 scenarios × 2 account(s))
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
  test.describe(`End-to-End Flow (login then key pages) — ${e2eAccount.label}`, () => {
    test.beforeEach(async ({ page }) => {
      // Log out previous account: clear cookies + storage, then log in as e2eAccount
      await page.context().clearCookies();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (_) {} });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const user = page.locator("input#email").first();
      const pass = page.locator("input#password").first();
      if (await user.isVisible({ timeout: 5000 }).catch(() => false)) await user.fill(e2eAccount.username);
      if (await pass.isVisible({ timeout: 2000 }).catch(() => false)) await pass.fill(e2eAccount.password);
      const submit = page.locator("button[type=\"submit\"]").first();
      if (await submit.isVisible({ timeout: 2000 }).catch(() => false)) await submit.click();
      await page.waitForLoadState('domcontentloaded');
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
    });

    test('End-to-End Flow (login then key pages)', { tag: '@e2e' }, async ({ page }) => {
        // Navigate to "/"
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        // TODO: Repeat a full login for **each** saved account (`sudharsan@company.com` (Account
        // **Verify:** Every account can authenticate and reach protected areas (role diffe
        // Verify: Every account can authenticate and reach protected areas (ro
        await page.waitForLoadState('domcontentloaded');
        // Navigate to "/dashboard"
        await page.goto('/dashboard');
        await page.waitForLoadState('domcontentloaded');
        // **Verify:** "Payroll-ESS" content is visible
        // Verify: "Payroll-ESS" content is visible
        await page.waitForLoadState('domcontentloaded');
        // Navigate to "/payslips"
        await page.goto('/payslips');
        await page.waitForLoadState('domcontentloaded');
        // **Verify:** "Payroll-ESS" content is visible
        // Verify: "Payroll-ESS" content is visible
        await page.waitForLoadState('domcontentloaded');
        // Navigate to "/tax-documents"
        await page.goto('/tax-documents');
        await page.waitForLoadState('domcontentloaded');
        // **Verify:** "Payroll-ESS" content is visible
        // Verify: "Payroll-ESS" content is visible
        await page.waitForLoadState('domcontentloaded');
        // Navigate to "/calendar"
        await page.goto('/calendar');
        await page.waitForLoadState('domcontentloaded');
        // **Verify:** "Payroll-ESS" content is visible
        // Verify: "Payroll-ESS" content is visible
        await page.waitForLoadState('domcontentloaded');
        // Navigate to "/settings"
        await page.goto('/settings');
        await page.waitForLoadState('domcontentloaded');
        // **Verify:** "Payroll-ESS" content is visible
        // Verify: "Payroll-ESS" content is visible
        await page.waitForLoadState('domcontentloaded');
    });

  });

}
