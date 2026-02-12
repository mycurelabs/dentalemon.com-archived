import { test, expect } from '@playwright/test';

test.describe('Dentist Profile Page - Round 3', () => {
  test('should load profile page without errors', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/find-a-dentist/dr-jane-smith');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Verify no error overlay or 404
    await expect(page.locator('text=Application error')).not.toBeVisible();
    await expect(page.locator('text=404')).not.toBeVisible();
    
    // Verify page title is correct
    await expect(page).toHaveTitle(/Dr\. Jane Smith/i);
  });

  test('should render profile header with photo, name, and specialty', async ({ page }) => {
    await page.goto('/find-a-dentist/dr-jane-smith');
    await page.waitForLoadState('networkidle');
    
    // Verify profile photo exists
    const profilePhoto = page.locator('img[alt*="Dr. Jane Smith"]').first();
    await expect(profilePhoto).toBeVisible();
    
    // Verify name is displayed
    await expect(page.locator('text=Dr. Jane Smith')).toBeVisible();
    
    // Verify specialty is displayed
    await expect(page.locator('text=General Dentistry')).toBeVisible();
  });

  test('should render bio section', async ({ page }) => {
    await page.goto('/find-a-dentist/dr-jane-smith');
    await page.waitForLoadState('networkidle');
    
    // Verify bio section heading
    await expect(page.locator('text=About')).toBeVisible();
    
    // Verify bio content exists (should contain some text)
    const bioSection = page.locator('text=About').locator('..');
    await expect(bioSection).toBeVisible();
  });

  test('should render clinic schedules section', async ({ page }) => {
    await page.goto('/find-a-dentist/dr-jane-smith');
    await page.waitForLoadState('networkidle');
    
    // Verify schedule section
    await expect(page.locator('text=Schedule')).toBeVisible();
  });

  test('should render sidebar with affiliations and FAQ', async ({ page }) => {
    await page.goto('/find-a-dentist/dr-jane-smith');
    await page.waitForLoadState('networkidle');
    
    // Verify affiliations section with badges
    await expect(page.locator('text=Affiliations')).toBeVisible();
    
    // Verify FAQ accordion exists
    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();
  });

  test('should render breadcrumb navigation', async ({ page }) => {
    await page.goto('/find-a-dentist/dr-jane-smith');
    await page.waitForLoadState('networkidle');
    
    // Verify breadcrumb structure: Home > Find a Dentist > Dr. Jane Smith
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Find a Dentist')).toBeVisible();
  });

  test('should capture screenshots at all viewports', async ({ page }) => {
    await page.goto('/find-a-dentist/dr-jane-smith');
    await page.waitForLoadState('networkidle');
    
    // Desktop (1280px)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.screenshot({ 
      path: 'screenshots/profile-page-desktop.png', 
      fullPage: true 
    });
    
    // Tablet (768px)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ 
      path: 'screenshots/profile-page-tablet.png', 
      fullPage: true 
    });
    
    // Mobile (375px)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ 
      path: 'screenshots/profile-page-mobile.png', 
      fullPage: true 
    });
  });

  test('should show 404 for nonexistent profile', async ({ page }) => {
    await page.goto('/find-a-dentist/nonexistent-slug');
    await page.waitForLoadState('networkidle');
    
    // Verify 404 page is shown
    await expect(page.locator('text=404')).toBeVisible();
    
    // Capture screenshot
    await page.screenshot({ 
      path: 'screenshots/profile-page-404.png', 
      fullPage: true 
    });
  });
});
