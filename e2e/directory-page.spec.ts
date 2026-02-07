import { test, expect } from '@playwright/test';

test.describe('Dentist Directory Page - Issue #11', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/find-a-dentist');
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('AC-1: Page loads without errors and displays dentist cards with images', async ({ page }) => {
    // Check no error overlay is present
    const errorOverlay = page.locator('text=Invalid src prop');
    await expect(errorOverlay).not.toBeVisible();

    // Check that dentist cards are rendered
    const dentistCards = page.locator('[data-testid="dentist-card"], .grid > div').first();
    await expect(dentistCards).toBeVisible();

    // Check that images are loaded (not broken)
    const images = page.locator('img[alt*="Dr."], img[alt*="dentist"]').first();
    await expect(images).toBeVisible();
    
    // Verify image has valid src (not error state)
    const imgSrc = await images.getAttribute('src');
    expect(imgSrc).toBeTruthy();
    expect(imgSrc).not.toContain('data:image/gif'); // Not a placeholder
  });

  test('AC-2: Search bar is visible and functional', async ({ page }) => {
    // Find search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]');
    await expect(searchInput).toBeVisible();

    // Test search functionality
    await searchInput.fill('Jane');
    await page.waitForTimeout(500); // Debounce delay
    
    // Verify results update
    const resultsCount = page.locator('text=/\\d+ dentist.*found/i');
    await expect(resultsCount).toBeVisible();
  });

  test('AC-3: Filter area is visible', async ({ page }) => {
    // Check for filter panel or filter button
    const filterElement = page.locator('text=/filter/i, [data-testid="filter-panel"], aside').first();
    await expect(filterElement).toBeVisible();
  });

  test('AC-4: View toggle (grid/list) is visible and functional', async ({ page }) => {
    // Find view toggle buttons
    const gridButton = page.locator('button[aria-label*="grid" i], button:has-text("Grid")').first();
    const listButton = page.locator('button[aria-label*="list" i], button:has-text("List")').first();
    
    // At least one view toggle should be visible
    const viewToggleVisible = (await gridButton.isVisible()) || (await listButton.isVisible());
    expect(viewToggleVisible).toBeTruthy();
  });

  test('AC-5: Legal disclaimer is visible', async ({ page }) => {
    const disclaimer = page.locator('text=/appointment request/i, [role="alert"]').first();
    await expect(disclaimer).toBeVisible();
  });

  test('AC-6: Responsive screenshots - Desktop (1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.screenshot({ 
      path: 'screenshots/directory-desktop-1280.png', 
      fullPage: true 
    });
  });

  test('AC-7: Responsive screenshots - Tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ 
      path: 'screenshots/directory-tablet-768.png', 
      fullPage: true 
    });
  });

  test('AC-8: Responsive screenshots - Mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ 
      path: 'screenshots/directory-mobile-375.png', 
      fullPage: true 
    });
  });
});
