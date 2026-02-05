/**
 * 
 * === E2E Testing with Playwright ===
 * In a "Full-Fledged" MERN app, your API might work, and your database might be fine,
 * but if a CSS overlay is blocking the "Submit" button, the user is stuck.
 * E2E Testing solves this by launching a real browser and "clicking" through your app.
 * 
 * === Headless Browser Automation ===
 * Playwright is a framework that allows you to automata Chromium, Firefox, and WebKit with a single API.
 * >> Resilience: Playwright waits for elements to be "actionable" (visible and stable) before clicking, reducing "flaky" tests.
 * >> Trace Viewer: If a test fails in your CI/CD pipeline, Playwright records a video and a frame-by-frame trace so you can see exactly what went wrong.
 * 
 */


// MICROLAB
// Write a test that simulates a full User Journey:
// 1. Navigate to the Login page.
// 2. Enter credentials.
// 3. Verify that the user is redirected to the Dashboard.
const {test, expect} = require('@playwright/test');

test('user can log in successfully', async ({page}) => {
    await page.goto('http://localhost:3000/login');

    // Fill the form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Click submit
    await page.click('button[type="submit"]');

    // Verify redirection
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    await expext(page.locator('h1')).toContainText('Welcome back');
});