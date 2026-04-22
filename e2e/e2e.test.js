const puppeteer = require('puppeteer');
const { fork } = require('child_process');

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
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // headless: false,
      // slowMo: 250,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should validate valid Visa card', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '4111111111111111');
    await page.click('button[type="submit"]');
    // Ждём, пока в #result появится текст
    await page.waitForFunction(
      () => document.querySelector('#result').textContent.trim() !== '',
      { timeout: 5000 }
    );
    const resultText = await page.$eval('#result', el => el.textContent);
    expect(resultText).toContain('Карта валидна');
    expect(resultText).toContain('visa');
  });

  test('should show invalid for wrong number', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '4111111111111112');
    await page.click('button[type="submit"]');
    await page.waitForFunction(
      () => document.querySelector('#result').textContent.trim() !== '',
      { timeout: 5000 }
    );
    const resultText = await page.$eval('#result', el => el.textContent);
    expect(resultText).toContain('Неверный номер карты');
  });

  test('should highlight card type on input', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '411111');
    const visaIconClass = await page.$eval('#visa-icon', el => el.className);
    expect(visaIconClass).toContain('active');
  });
});
