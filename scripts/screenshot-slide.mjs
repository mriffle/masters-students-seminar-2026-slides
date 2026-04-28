#!/usr/bin/env node
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

async function main() {
  const [slideArg, outputArg, widthArg, heightArg] = process.argv.slice(2);

  if (!slideArg || !outputArg) {
    console.error('Usage: screenshot-slide.mjs <slide-number> <output-path> [width] [height]');
    process.exit(1);
  }

  const slide = parseInt(slideArg, 10);
  if (!Number.isInteger(slide) || slide < 1 || slide > 31) {
    console.error(`Invalid slide number: ${slideArg} (must be integer 1-31)`);
    process.exit(1);
  }

  const width = widthArg ? parseInt(widthArg, 10) : 1920;
  const height = heightArg ? parseInt(heightArg, 10) : 1080;
  const outputPath = resolve(outputArg);

  mkdirSync(dirname(outputPath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    const url = `http://localhost:5173/#slide=${slide}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);
    await page.screenshot({ path: outputPath, type: 'png' });
    console.log(`Wrote ${outputPath} (slide ${slide}, ${width}x${height})`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(`Screenshot failed: ${err.message}`);
  process.exit(1);
});
