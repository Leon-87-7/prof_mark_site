const fs = require('fs');

const html = fs.readFileSync(
  'C:\\Users\\leone\\Downloads\\localhost_4321-20251213T184353',
  'utf8'
);

const match = html.match(/window\.__LIGHTHOUSE_JSON__ = ({.*?});/s);

if (match) {
  const json = JSON.parse(match[1]);

  console.log('=== LIGHTHOUSE AUDIT RESULTS ===\n');
  console.log(
    `Performance:     ${Math.round(json.categories.performance.score * 100)}/100`
  );
  console.log(
    `Accessibility:   ${Math.round(json.categories.accessibility.score * 100)}/100`
  );
  console.log(
    `Best Practices:  ${Math.round(json.categories['best-practices'].score * 100)}/100`
  );
  console.log(
    `SEO:             ${Math.round(json.categories.seo.score * 100)}/100`
  );

  console.log('\n=== KEY METRICS ===\n');
  console.log(
    `First Contentful Paint: ${json.audits['first-contentful-paint'].displayValue}`
  );
  console.log(
    `Largest Contentful Paint: ${json.audits['largest-contentful-paint'].displayValue}`
  );
  console.log(
    `Speed Index: ${json.audits['speed-index'].displayValue}`
  );
  console.log(
    `Total Blocking Time: ${json.audits['total-blocking-time'].displayValue}`
  );
  console.log(
    `Cumulative Layout Shift: ${json.audits['cumulative-layout-shift'].displayValue}`
  );

  console.log('\n=== PERFORMANCE OPPORTUNITIES ===\n');
  const opportunities = json.audits;

  // Find all failed or warning audits
  const issues = [];

  for (const [key, audit] of Object.entries(opportunities)) {
    if (audit.score !== null && audit.score < 0.9 && audit.details) {
      issues.push({
        id: key,
        title: audit.title,
        score: Math.round(audit.score * 100),
        displayValue: audit.displayValue,
        description: audit.description,
      });
    }
  }

  // Sort by score (worst first)
  issues.sort((a, b) => a.score - b.score);

  issues.forEach((issue) => {
    console.log(`[${issue.score}/100] ${issue.title}`);
    if (issue.displayValue) console.log(`  → ${issue.displayValue}`);
    console.log('');
  });

  // Device type
  console.log('\n=== TEST CONFIGURATION ===\n');
  console.log(
    `Device: ${json.configSettings.formFactor || 'unknown'}`
  );
  console.log(
    `Network throttling: ${json.configSettings.throttlingMethod || 'unknown'}`
  );
}
