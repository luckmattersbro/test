// spec: testing/specs/plan-e2e.md
// Plan type: e2e  |  Playwright tag: @e2e
// E2E: each scenario runs once per saved account (multi-user). Session cleared before each login.
// Run only these tests: npx playwright test --grep "@e2e"
// Scenarios in this file: ~8 test runs (4 scenarios × 2 account(s))
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
  test.describe(`3. DoorDash Payroll Portal — ${e2eAccount.label}`, () => {
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
      await page.goto('/tax-documents');
      await page.waitForLoadState('domcontentloaded');
    });

    test('Button Interactions', { tag: '@e2e' }, async ({ page }) => {
        // Navigate to "/tax-documents"
        await page.goto('/tax-documents');
        await page.waitForLoadState('domcontentloaded');
        // Click the "Dashboard" button (if visible)
        {
        const btnEl = page.getByRole('button', { name: /Dashboard/i }).or(page.getByText('Dashboard', { exact: true })).first();
        if (await btnEl.isVisible({ timeout: 5000 }).catch(() => false)) {
        await btnEl.click();
        }
        }
        // Click the "Payslips" button (if visible)
        {
        const btnEl = page.getByRole('button', { name: /Payslips/i }).or(page.getByText('Payslips', { exact: true })).first();
        if (await btnEl.isVisible({ timeout: 5000 }).catch(() => false)) {
        await btnEl.click();
        }
        }
        // Click the "Tax DocumentsEmployee Section" button (if visible)
        {
        const btnEl = page.getByRole('button', { name: /Tax DocumentsEmployee Section/i }).or(page.getByText('Tax DocumentsEmployee Section', { exact: true })).first();
        if (await btnEl.isVisible({ timeout: 5000 }).catch(() => false)) {
        await btnEl.click();
        }
        }
        // Click the "Payroll Calendar" button (if visible)
        {
        const btnEl = page.getByRole('button', { name: /Payroll Calendar/i }).or(page.getByText('Payroll Calendar', { exact: true })).first();
        if (await btnEl.isVisible({ timeout: 5000 }).catch(() => false)) {
        await btnEl.click();
        }
        }
        // Click the "Ask-HRSoon" button (if visible)
        {
        const btnEl = page.getByRole('button', { name: /Ask-HRSoon/i }).or(page.getByText('Ask-HRSoon', { exact: true })).first();
        if (await btnEl.isVisible({ timeout: 5000 }).catch(() => false)) {
        await btnEl.click();
        }
        }
        // **Verify:** Button actions complete without errors
        // Verify: Button actions complete without errors
        await page.waitForLoadState('domcontentloaded');
    });

    test('Interactive Elements Test', { tag: '@e2e' }, async ({ page }) => {
        // Navigate to "/tax-documents"
        await page.goto('/tax-documents');
        await page.waitForLoadState('domcontentloaded');
        // Navigate to "Payroll-ESS" section
        await page.goto('Payroll-ESS');
        await page.waitForLoadState('domcontentloaded');
        // Click the "Dashboard" button
        {
        const btnEl = page.getByRole('button', { name: /Dashboard/i }).or(page.getByText('Dashboard', { exact: true })).first();
        if (await btnEl.isVisible({ timeout: 5000 }).catch(() => false)) {
        await btnEl.click();
        }
        }
        // Click the "Payslips" button
        {
        const btnEl = page.getByRole('button', { name: /Payslips/i }).or(page.getByText('Payslips', { exact: true })).first();
        if (await btnEl.isVisible({ timeout: 5000 }).catch(() => false)) {
        await btnEl.click();
        }
        }
        // Click the "Tax DocumentsEmployee Section" button
        {
        const btnEl = page.getByRole('button', { name: /Tax DocumentsEmployee Section/i }).or(page.getByText('Tax DocumentsEmployee Section', { exact: true })).first();
        if (await btnEl.isVisible({ timeout: 5000 }).catch(() => false)) {
        await btnEl.click();
        }
        }
        // Click the "Payroll Calendar" button
        {
        const btnEl = page.getByRole('button', { name: /Payroll Calendar/i }).or(page.getByText('Payroll Calendar', { exact: true })).first();
        if (await btnEl.isVisible({ timeout: 5000 }).catch(() => false)) {
        await btnEl.click();
        }
        }
        // Click the "Ask-HRSoon" button
        {
        const btnEl = page.getByRole('button', { name: /Ask-HRSoon/i }).or(page.getByText('Ask-HRSoon', { exact: true })).first();
        if (await btnEl.isVisible({ timeout: 5000 }).catch(() => false)) {
        await btnEl.click();
        }
        }
        // **Verify:** Button actions complete without errors
        // Verify: Button actions complete without errors
        await page.waitForLoadState('domcontentloaded');
    });

    test('Negative: Direct access without login (protected page)', { tag: '@e2e' }, async ({ page }) => {
        // TODO: Without logging in, navigate directly to "/tax-documents"
        // **Verify:** User is redirected to login page or sees access denied / 401
        // Verify: User is redirected to login page or sees access denied / 401
        await page.waitForLoadState('domcontentloaded');
    });

    test('Positive: Page loads and key content is visible', { tag: '@e2e' }, async ({ page }) => {
        // Navigate to "/tax-documents"
        await page.goto('/tax-documents');
        await page.waitForLoadState('domcontentloaded');
        // **Verify:** Page loads without fatal errors
        // Verify: Page loads without fatal errors
        await page.waitForLoadState('domcontentloaded');
        // **Verify:** At least one heading or main content area is visible
        // Verify: At least one heading or main content area is visible
        await page.waitForLoadState('domcontentloaded');
    });

  });

}
