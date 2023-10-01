import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://gkaps.com/singup.php');
  await page
    .locator('input[name="usuario"]')
    .fill('leonardogarciabarbero@hotmail.com');
  await page
    .locator('#login_cuadro input[name="contrasena"]')
    .fill('283ej118*gs');
  await page
    .locator('#login_cuadro')
    .getByRole('button', { name: 'Login' })
    .click();
  await page.waitForURL('https://gkaps.com/store/home.php');

  await page.goto('https://gkaps.com/plus/index.php');
  await page
    .getByRole('button', { name: /WATCH COLLECTION|VER COLECCION/ })
    .click();

  await page.waitForTimeout(3000);
  const test = await page.locator(
    ':text("CAOS 01. MENSAJES Dani DaOrtiz FUERA DE ESTE MUNDO A LA VIS Dani DaOrtiz Caotico") > div'
  );

  if ((await test.count()) > 11) {
    console.log('Hay un nuevo video:');
    console.log(await test.nth(9).innerText());
  }

  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/gkaps_chaos.png' });

  await page.close();
  await browser.close();
})();
