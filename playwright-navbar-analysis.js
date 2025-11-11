const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Navigating to website...');
  await page.goto('https://agent-magicui.vercel.app/', { waitUntil: 'networkidle' });

  // Wait a bit for any dynamic content
  await page.waitForTimeout(2000);

  console.log('\n=== NAVBAR ANALYSIS ===\n');

  // 1. Find the navbar element
  const navbarHTML = await page.evaluate(() => {
    const nav = document.querySelector('nav') || document.querySelector('[role="navigation"]') || document.querySelector('header nav');
    return nav ? nav.outerHTML : 'No nav found';
  });

  console.log('1. NAVBAR HTML STRUCTURE:');
  console.log(navbarHTML.substring(0, 2000)); // First 2000 chars
  console.log('\n---\n');

  // 2. Get all nav links and their attributes
  const navLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a, header a[href^="#"]'));
    return links.map(link => ({
      text: link.textContent.trim(),
      href: link.getAttribute('href'),
      classes: link.className,
      dataAttributes: Array.from(link.attributes)
        .filter(attr => attr.name.startsWith('data-'))
        .map(attr => ({ name: attr.name, value: attr.value })),
      computedStyles: {
        color: window.getComputedStyle(link).color,
        backgroundColor: window.getComputedStyle(link).backgroundColor,
        borderBottom: window.getComputedStyle(link).borderBottom,
        textDecoration: window.getComputedStyle(link).textDecoration,
        transition: window.getComputedStyle(link).transition,
        opacity: window.getComputedStyle(link).opacity,
      },
      isActive: link.classList.contains('active') ||
                link.getAttribute('aria-current') === 'page' ||
                link.hasAttribute('data-active')
    }));
  });

  console.log('2. NAVIGATION LINKS (Initial State):');
  navLinks.forEach((link, i) => {
    console.log(`\nLink ${i + 1}: ${link.text}`);
    console.log(`  href: ${link.href}`);
    console.log(`  classes: ${link.classes}`);
    console.log(`  isActive: ${link.isActive}`);
    console.log(`  styles:`, link.computedStyles);
    if (link.dataAttributes.length) {
      console.log(`  data attributes:`, link.dataAttributes);
    }
  });
  console.log('\n---\n');

  // 3. Check for Intersection Observer or scroll listeners
  const scriptAnalysis = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script'));
    const scriptContents = scripts.map(s => s.textContent).join('\n');

    return {
      hasIntersectionObserver: scriptContents.includes('IntersectionObserver') ||
                               scriptContents.includes('intersectionObserver'),
      hasScrollListener: scriptContents.includes('addEventListener("scroll"') ||
                         scriptContents.includes('addEventListener(\'scroll\'') ||
                         scriptContents.includes('onscroll'),
      hasScrollTo: scriptContents.includes('scrollTo') || scriptContents.includes('scrollIntoView'),
      // Check window object for listeners
      hasWindowScrollListener: typeof window.onscroll === 'function',
      // Check for popular libraries
      hasReactRouter: scriptContents.includes('react-router'),
      hasNextRouter: scriptContents.includes('next/router') || scriptContents.includes('next/navigation'),
    };
  });

  console.log('3. SCROLL/INTERSECTION DETECTION:');
  console.log(scriptAnalysis);
  console.log('\n---\n');

  // 4. Get CSS for active states
  const cssAnalysis = await page.evaluate(() => {
    const styles = Array.from(document.styleSheets);
    const activeRules = [];

    styles.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          if (rule.cssText && (
            rule.selectorText?.includes('[data-active]') ||
            rule.selectorText?.includes('.active') ||
            rule.selectorText?.includes('[aria-current]') ||
            rule.selectorText?.includes(':active')
          )) {
            activeRules.push({
              selector: rule.selectorText,
              css: rule.cssText
            });
          }
        });
      } catch (e) {
        // CORS or other access issues
      }
    });

    return activeRules;
  });

  console.log('4. CSS RULES FOR ACTIVE STATES:');
  cssAnalysis.forEach(rule => {
    console.log(`\nSelector: ${rule.selector}`);
    console.log(`CSS: ${rule.css}`);
  });
  console.log('\n---\n');

  // 5. Simulate scrolling and observe changes
  console.log('5. TESTING SCROLL BEHAVIOR:\n');

  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section[id], div[id]'))
      .map(s => ({ id: s.id, text: s.textContent.substring(0, 50) }))
      .filter(s => s.id);
  });

  console.log('Found sections:', sections.map(s => s.id));

  // Scroll to each section and check nav state
  for (const section of sections.slice(0, 4)) { // Test first 4 sections
    if (!section.id) continue;

    console.log(`\nScrolling to section: ${section.id}`);
    await page.evaluate((id) => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, section.id);

    await page.waitForTimeout(1500);

    const currentNavState = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('nav a, header a[href^="#"]'));
      return links.map(link => ({
        text: link.textContent.trim(),
        href: link.getAttribute('href'),
        classes: link.className,
        isActive: link.classList.contains('active') ||
                  link.getAttribute('aria-current') === 'page' ||
                  link.hasAttribute('data-active') ||
                  link.getAttribute('data-state') === 'active',
        dataState: link.getAttribute('data-state'),
        ariaCurrents: link.getAttribute('aria-current'),
        color: window.getComputedStyle(link).color,
        opacity: window.getComputedStyle(link).opacity,
      }));
    });

    console.log('Nav state after scrolling:');
    currentNavState.forEach(link => {
      if (link.isActive || link.dataState === 'active') {
        console.log(`  ACTIVE: ${link.text} (${link.href})`);
        console.log(`    classes: ${link.classes}`);
        console.log(`    data-state: ${link.dataState}`);
        console.log(`    color: ${link.color}, opacity: ${link.opacity}`);
      }
    });
  }

  // 6. Check for React/Next.js specific implementations
  console.log('\n---\n');
  console.log('6. FRAMEWORK ANALYSIS:');

  const frameworkInfo = await page.evaluate(() => {
    return {
      hasReact: !!window.React || document.querySelector('[data-reactroot]') !== null,
      hasNext: !!window.__NEXT_DATA__,
      nextVersion: window.__NEXT_DATA__?.buildId || 'N/A',
      hasReactProps: !!document.querySelector('[data-radix-collection-item]') ||
                     !!document.querySelector('[data-radix-scroll-area-viewport]'),
    };
  });

  console.log(frameworkInfo);

  // 7. Capture event listeners on nav items
  console.log('\n---\n');
  console.log('7. EVENT LISTENERS ON NAV ITEMS:');

  const eventListeners = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a, header a[href^="#"]'));
    return links.map(link => {
      const listeners = [];
      const events = ['click', 'mouseenter', 'mouseleave', 'focus', 'blur'];

      events.forEach(eventType => {
        const handler = link[`on${eventType}`];
        if (handler) {
          listeners.push({ event: eventType, hasHandler: true });
        }
      });

      return {
        text: link.textContent.trim(),
        href: link.getAttribute('href'),
        hasClickHandler: !!link.onclick,
        listeners: listeners
      };
    });
  });

  console.log(eventListeners);

  // 8. Get computed animations/transitions
  console.log('\n---\n');
  console.log('8. ANIMATIONS & TRANSITIONS:');

  const animations = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a, header a[href^="#"]'));
    return links.map(link => {
      const styles = window.getComputedStyle(link);
      const beforeStyles = window.getComputedStyle(link, '::before');
      const afterStyles = window.getComputedStyle(link, '::after');

      return {
        text: link.textContent.trim(),
        transition: styles.transition,
        animation: styles.animation,
        transform: styles.transform,
        beforeContent: beforeStyles.content,
        beforeTransition: beforeStyles.transition,
        afterContent: afterStyles.content,
        afterTransition: afterStyles.transition,
      };
    });
  });

  animations.forEach(anim => {
    console.log(`\n${anim.text}:`);
    console.log(`  transition: ${anim.transition}`);
    console.log(`  animation: ${anim.animation}`);
    console.log(`  transform: ${anim.transform}`);
    if (anim.beforeContent !== 'none') {
      console.log(`  ::before content: ${anim.beforeContent}`);
      console.log(`  ::before transition: ${anim.beforeTransition}`);
    }
    if (anim.afterContent !== 'none') {
      console.log(`  ::after content: ${anim.afterContent}`);
      console.log(`  ::after transition: ${anim.afterTransition}`);
    }
  });

  console.log('\n\n=== ANALYSIS COMPLETE ===');
  console.log('Keeping browser open for manual inspection...');
  console.log('Press Ctrl+C to close.');

  // Keep browser open for manual inspection
  await page.waitForTimeout(300000); // 5 minutes

  await browser.close();
})();
