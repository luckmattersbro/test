// Auto-generated from planner-auth.json — one test per saved account
// Re-run Test Spec Generate after changing credentials. Run: npx playwright test --grep @multi-account
// Plan tag mirror: @e2e
import { test, expect } from '@playwright/test';

test.setTimeout(120000);

test.use({ baseURL: 'https://ddpayroll.criticalriver.us' });

test.describe('Multi-account login verification', () => {
  // If tests fail while login works in browser, your app may keep /login in the URL — adjust waitForURL below.

  test('Login OK: Account 1', { tag: ['@multi-account', "@e2e"] }, async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (_) {} });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.locator("input#email").first().fill('sudharsan@company.com');
    await page.locator("input#password").first().fill('password123');
    const submit = page.locator("button[type=\"submit\"]").first();
    await expect(submit).toBeVisible({ timeout: 10000 });
    await submit.click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForURL((url) => !/(^|\/)login($|\/|\?)/i.test(url.pathname) && !/(^|\/)sign-in($|\/)/i.test(url.pathname), { timeout: 30000 });
  });

  test('Login OK: Account 2', { tag: ['@multi-account', "@e2e"] }, async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (_) {} });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.locator("input#email").first().fill('john@company.com');
    await page.locator("input#password").first().fill('password123');
    const submit = page.locator("button[type=\"submit\"]").first();
    await expect(submit).toBeVisible({ timeout: 10000 });
    await submit.click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForURL((url) => !/(^|\/)login($|\/|\?)/i.test(url.pathname) && !/(^|\/)sign-in($|\/)/i.test(url.pathname), { timeout: 30000 });
  });

});
