import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should display page with title', async () => {
    await page.goto(baseUrl);
    const title = await page.title();
    expect(title).toBe('Credit Card Validator');
  });

  test('should highlight Visa icon and show valid message for valid Visa', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '4111111111111111');
    await page.click('button[type="submit"]');

    await page.waitForSelector('.card-icon.visa.active', { timeout: 2000 });
    const message = await page.$eval('#message', el => el.textContent);
    expect(message).toContain('валидна');
    expect(message).toContain('visa');
  });

  test('should show invalid message for wrong number', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '1234567890123456');
    await page.click('button[type="submit"]');

    await page.waitForSelector('#message.invalid', { timeout: 2000 });
    const message = await page.$eval('#message', el => el.textContent);
    expect(message).toBe('Номер карты недействителен');
  });
});
