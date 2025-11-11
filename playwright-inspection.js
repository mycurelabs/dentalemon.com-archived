const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function inspectWebsite() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'inspection-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const report = {
    timestamp: new Date().toISOString(),
    findings: [],
    screenshots: []
  };

  try {
    console.log('🔍 Starting Dentalemon Website Inspection...\n');

    // Navigate to the site
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for animations

    // ==========================================
    // 1. THEME DETECTION & DARK MODE ANALYSIS
    // ==========================================
    console.log('📋 1. CHECKING THEME BEHAVIOR...');

    // Check initial theme
    const htmlClasses = await page.evaluate(() => {
      return {
        htmlClass: document.documentElement.className,
        bodyClass: document.body.className,
        computedBg: window.getComputedStyle(document.body).backgroundColor,
        dataTheme: document.documentElement.getAttribute('data-theme'),
        colorScheme: window.getComputedStyle(document.documentElement).colorScheme
      };
    });

    console.log('Initial theme state:', htmlClasses);
    report.findings.push({
      category: 'Theme Detection',
      details: htmlClasses,
      issue: htmlClasses.htmlClass.includes('dark') ? 'Page defaulting to dark mode' : 'Theme appears correct'
    });

    // Take initial screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, '01-initial-state.png'),
      fullPage: true
    });
    report.screenshots.push('01-initial-state.png');

    // Check for theme toggle
    const themeToggle = await page.locator('button[aria-label*="theme"], button[aria-label*="Theme"], [data-theme-toggle]').count();
    console.log(`Theme toggle buttons found: ${themeToggle}`);

    // Try to find and toggle dark mode if available
    const toggleSelectors = [
      'button[aria-label*="theme"]',
      'button[aria-label*="Theme"]',
      '[data-theme-toggle]',
      'button:has-text("Dark")',
      'button:has-text("Light")'
    ];

    let toggleFound = false;
    for (const selector of toggleSelectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        console.log(`Found theme toggle with selector: ${selector}`);
        await page.locator(selector).first().click();
        await page.waitForTimeout(1000);
        await page.screenshot({
          path: path.join(screenshotsDir, '02-theme-toggled.png'),
          fullPage: true
        });
        report.screenshots.push('02-theme-toggled.png');
        toggleFound = true;
        break;
      }
    }

    if (!toggleFound) {
      console.log('⚠️  No theme toggle found on page');
      report.findings.push({
        category: 'Theme Toggle',
        issue: 'No theme toggle button detected',
        severity: 'warning'
      });
    }

    // Reset to initial state
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // ==========================================
    // 2. BUTTON INSPECTION
    // ==========================================
    console.log('\n📋 2. INSPECTING BUTTONS...');

    // Find all buttons
    const buttons = await page.locator('button, a[role="button"], .button, [class*="button"]').all();
    console.log(`Total buttons/button-like elements found: ${buttons.length}`);

    // Specific focus on Schedule Consultation button
    const scheduleButtons = await page.locator('button:has-text("Schedule"), a:has-text("Schedule")').all();
    console.log(`Schedule consultation buttons found: ${scheduleButtons.length}`);

    for (let i = 0; i < scheduleButtons.length; i++) {
      const btn = scheduleButtons[i];
      const boundingBox = await btn.boundingBox();

      if (boundingBox) {
        // Highlight and screenshot the button
        await btn.evaluate(el => {
          el.style.outline = '3px solid red';
          el.style.outlineOffset = '2px';
        });

        const btnDetails = await btn.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            text: el.textContent?.trim(),
            width: computed.width,
            height: computed.height,
            padding: computed.padding,
            fontSize: computed.fontSize,
            overflow: computed.overflow,
            textOverflow: computed.textOverflow,
            whiteSpace: computed.whiteSpace,
            display: computed.display,
            classes: el.className,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            isOverflowing: el.scrollWidth > el.clientWidth
          };
        });

        console.log(`\nButton ${i + 1} details:`, btnDetails);
        report.findings.push({
          category: 'Schedule Button',
          buttonIndex: i + 1,
          details: btnDetails,
          issue: btnDetails.isOverflowing ? 'TEXT OVERFLOW DETECTED' : 'No overflow',
          boundingBox
        });

        await page.screenshot({
          path: path.join(screenshotsDir, `03-schedule-button-${i + 1}.png`),
          fullPage: false
        });
        report.screenshots.push(`03-schedule-button-${i + 1}.png`);

        // Remove highlight
        await btn.evaluate(el => {
          el.style.outline = '';
          el.style.outlineOffset = '';
        });
      }
    }

    // Check all ShimmerButton components
    const shimmerButtons = await page.locator('[class*="shimmer"], [class*="Shimmer"]').all();
    console.log(`\nShimmerButton components found: ${shimmerButtons.length}`);

    for (let i = 0; i < shimmerButtons.length; i++) {
      const btn = shimmerButtons[i];
      const shimmerDetails = await btn.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          text: el.textContent?.trim(),
          classes: el.className,
          width: computed.width,
          height: computed.height,
          position: computed.position,
          animation: computed.animation,
          background: computed.background,
          overflow: computed.overflow
        };
      });

      console.log(`ShimmerButton ${i + 1}:`, shimmerDetails);
      report.findings.push({
        category: 'ShimmerButton',
        index: i + 1,
        details: shimmerDetails
      });
    }

    // ==========================================
    // 3. RESPONSIVE TESTING
    // ==========================================
    console.log('\n📋 3. TESTING RESPONSIVE BEHAVIOR...');

    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1280, height: 720 }
    ];

    for (const viewport of viewports) {
      console.log(`\nTesting ${viewport.name} (${viewport.width}x${viewport.height})`);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000);

      // Take screenshot
      await page.screenshot({
        path: path.join(screenshotsDir, `04-${viewport.name}-view.png`),
        fullPage: true
      });
      report.screenshots.push(`04-${viewport.name}-view.png`);

      // Check button rendering at this viewport
      const responsiveButtonCheck = await page.evaluate(() => {
        const scheduleBtn = document.querySelector('button:has-text("Schedule"), a:has-text("Schedule")');
        if (scheduleBtn) {
          const computed = window.getComputedStyle(scheduleBtn);
          return {
            visible: scheduleBtn.offsetWidth > 0 && scheduleBtn.offsetHeight > 0,
            width: computed.width,
            height: computed.height,
            fontSize: computed.fontSize,
            padding: computed.padding,
            isOverflowing: scheduleBtn.scrollWidth > scheduleBtn.clientWidth
          };
        }
        return null;
      });

      console.log(`Button rendering at ${viewport.name}:`, responsiveButtonCheck);
      report.findings.push({
        category: 'Responsive - Button',
        viewport: viewport.name,
        details: responsiveButtonCheck
      });

      // Check for horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      if (hasHorizontalScroll) {
        console.log(`⚠️  HORIZONTAL SCROLL DETECTED at ${viewport.name}`);
        report.findings.push({
          category: 'Responsive - Layout',
          viewport: viewport.name,
          issue: 'Horizontal scroll detected',
          severity: 'high'
        });
      }

      // Check navigation behavior
      const navCheck = await page.evaluate(() => {
        const nav = document.querySelector('nav');
        const hamburger = document.querySelector('[aria-label*="menu"], .hamburger, [class*="hamburger"]');
        if (nav) {
          const computed = window.getComputedStyle(nav);
          return {
            display: computed.display,
            position: computed.position,
            hasHamburger: !!hamburger,
            hamburgerVisible: hamburger ? hamburger.offsetWidth > 0 : false
          };
        }
        return null;
      });

      console.log(`Navigation at ${viewport.name}:`, navCheck);
      report.findings.push({
        category: 'Responsive - Navigation',
        viewport: viewport.name,
        details: navCheck
      });
    }

    // Reset to desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(1000);

    // ==========================================
    // 4. INTERACTIVE ELEMENTS CHECK
    // ==========================================
    console.log('\n📋 4. CHECKING INTERACTIVE ELEMENTS...');

    // Check all links
    const links = await page.locator('a').all();
    console.log(`Total links found: ${links.length}`);

    let brokenLinks = 0;
    const linkSample = links.slice(0, 10); // Check first 10 links

    for (const link of linkSample) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      console.log(`Link: "${text?.trim()}" -> ${href}`);

      if (href && (href === '#' || href === '')) {
        brokenLinks++;
      }
    }

    report.findings.push({
      category: 'Links',
      total: links.length,
      brokenOrEmpty: brokenLinks,
      issue: brokenLinks > 0 ? `${brokenLinks} links with no href or href="#"` : 'All checked links have valid hrefs'
    });

    // Check hover states on buttons
    console.log('\nChecking hover states...');
    const mainButton = await page.locator('button:has-text("Schedule"), a:has-text("Schedule")').first();

    if (await mainButton.count() > 0) {
      // Get initial state
      const initialState = await mainButton.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          background: computed.background,
          color: computed.color,
          transform: computed.transform,
          boxShadow: computed.boxShadow
        };
      });

      // Hover
      await mainButton.hover();
      await page.waitForTimeout(500);

      const hoverState = await mainButton.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          background: computed.background,
          color: computed.color,
          transform: computed.transform,
          boxShadow: computed.boxShadow
        };
      });

      await page.screenshot({
        path: path.join(screenshotsDir, '05-button-hover.png'),
        fullPage: false
      });
      report.screenshots.push('05-button-hover.png');

      const hasHoverEffect = JSON.stringify(initialState) !== JSON.stringify(hoverState);
      console.log(`Hover effect detected: ${hasHoverEffect}`);
      console.log('Initial:', initialState);
      console.log('Hover:', hoverState);

      report.findings.push({
        category: 'Hover States',
        element: 'Schedule Button',
        hasEffect: hasHoverEffect,
        initialState,
        hoverState
      });
    }

    // ==========================================
    // 5. VISUAL BUGS & DESIGN CONSISTENCY
    // ==========================================
    console.log('\n📋 5. CHECKING FOR VISUAL BUGS...');

    // Check for overlapping elements
    const overlaps = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('section, div[class*="container"], header, nav'));
      const overlapping = [];

      for (let i = 0; i < elements.length; i++) {
        for (let j = i + 1; j < elements.length; j++) {
          const rect1 = elements[i].getBoundingClientRect();
          const rect2 = elements[j].getBoundingClientRect();

          const overlap = !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
          );

          if (overlap && rect1.width > 0 && rect2.width > 0) {
            overlapping.push({
              element1: elements[i].tagName + '.' + elements[i].className,
              element2: elements[j].tagName + '.' + elements[j].className
            });
          }
        }
      }

      return overlapping.slice(0, 5); // Return first 5
    });

    if (overlaps.length > 0) {
      console.log('⚠️  Potential overlapping elements found:', overlaps);
      report.findings.push({
        category: 'Visual Bugs',
        issue: 'Overlapping elements detected',
        details: overlaps,
        severity: 'medium'
      });
    }

    // Check color contrast
    const contrastIssues = await page.evaluate(() => {
      const issues = [];
      const textElements = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button'));

      for (const el of textElements.slice(0, 20)) { // Check first 20
        const computed = window.getComputedStyle(el);
        const color = computed.color;
        const bg = computed.backgroundColor;

        if (color && bg && bg !== 'rgba(0, 0, 0, 0)') {
          // Simple check - just log the values
          issues.push({
            text: el.textContent?.trim().substring(0, 30),
            color,
            background: bg,
            fontSize: computed.fontSize
          });
        }
      }

      return issues.slice(0, 5);
    });

    console.log('Color samples:', contrastIssues);

    // Check font consistency
    const fontCheck = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
      const paragraphs = Array.from(document.querySelectorAll('p'));

      return {
        headings: headings.slice(0, 5).map(h => ({
          tag: h.tagName,
          fontFamily: window.getComputedStyle(h).fontFamily,
          fontSize: window.getComputedStyle(h).fontSize,
          fontWeight: window.getComputedStyle(h).fontWeight
        })),
        paragraphs: paragraphs.slice(0, 3).map(p => ({
          fontFamily: window.getComputedStyle(p).fontFamily,
          fontSize: window.getComputedStyle(p).fontSize,
          lineHeight: window.getComputedStyle(p).lineHeight
        }))
      };
    });

    console.log('Font consistency check:', fontCheck);
    report.findings.push({
      category: 'Typography',
      details: fontCheck
    });

    // ==========================================
    // 6. MAGIC UI COMPONENTS
    // ==========================================
    console.log('\n📋 6. INSPECTING MAGIC UI COMPONENTS...');

    const magicUIComponents = await page.evaluate(() => {
      const components = {
        shimmerButtons: [],
        animatedElements: [],
        gradients: []
      };

      // Find shimmer buttons
      const shimmerElements = document.querySelectorAll('[class*="shimmer"], [class*="Shimmer"]');
      shimmerElements.forEach(el => {
        const computed = window.getComputedStyle(el);
        components.shimmerButtons.push({
          text: el.textContent?.trim(),
          classes: el.className,
          hasAnimation: computed.animation !== 'none',
          animationName: computed.animationName,
          animationDuration: computed.animationDuration
        });
      });

      // Find elements with animations
      const allElements = document.querySelectorAll('*');
      Array.from(allElements).forEach(el => {
        const computed = window.getComputedStyle(el);
        if (computed.animation !== 'none' && computed.animation !== '') {
          components.animatedElements.push({
            tag: el.tagName,
            classes: el.className,
            animation: computed.animation
          });
        }
      });

      // Find gradient backgrounds
      Array.from(allElements).forEach(el => {
        const computed = window.getComputedStyle(el);
        if (computed.background.includes('gradient')) {
          components.gradients.push({
            tag: el.tagName,
            classes: el.className,
            background: computed.background.substring(0, 100)
          });
        }
      });

      return {
        shimmerButtons: components.shimmerButtons.slice(0, 5),
        animatedElements: components.animatedElements.slice(0, 10),
        gradients: components.gradients.slice(0, 5)
      };
    });

    console.log('Magic UI Components:', magicUIComponents);
    report.findings.push({
      category: 'Magic UI Components',
      details: magicUIComponents
    });

    // Take final full page screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, '06-final-full-page.png'),
      fullPage: true
    });
    report.screenshots.push('06-final-full-page.png');

    // ==========================================
    // 7. GENERATE SUMMARY
    // ==========================================
    console.log('\n📋 7. GENERATING REPORT...');

    // Save detailed report
    fs.writeFileSync(
      path.join(__dirname, 'inspection-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n✅ INSPECTION COMPLETE!');
    console.log(`Screenshots saved to: ${screenshotsDir}`);
    console.log(`Detailed report saved to: ${path.join(__dirname, 'inspection-report.json')}`);

  } catch (error) {
    console.error('❌ Error during inspection:', error);
    report.findings.push({
      category: 'Error',
      error: error.message,
      stack: error.stack
    });
  } finally {
    await browser.close();
  }

  return report;
}

// Run the inspection
inspectWebsite().then(report => {
  console.log('\n' + '='.repeat(60));
  console.log('INSPECTION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total findings: ${report.findings.length}`);
  console.log(`Screenshots captured: ${report.screenshots.length}`);

  // Highlight critical issues
  const criticalIssues = report.findings.filter(f =>
    f.severity === 'high' ||
    f.issue?.includes('OVERFLOW') ||
    f.issue?.includes('dark mode')
  );

  if (criticalIssues.length > 0) {
    console.log('\n⚠️  CRITICAL ISSUES FOUND:');
    criticalIssues.forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.category}] ${issue.issue || 'See details'}`);
    });
  }
}).catch(err => {
  console.error('Failed to run inspection:', err);
  process.exit(1);
});
