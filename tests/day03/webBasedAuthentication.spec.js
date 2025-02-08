import { test } from '@playwright/test';

test('Bypass authentication by embedding the credentials in the URL', async ({ page }) => {
  // https://username:passwrod@loopcamp.vercel.app/basic-auth.html
  // https://admin:admin@loopcamp.vercel.app/basic-auth.html
  // https://loopcamp.vercel.app/basic-auth.html

  // NOTE: our webpage is not working this way  
  await page.goto('https://admin:admin@loopcamp.vercel.app/basic-auth.html');

  // after logging in, lets validate 
  let elem = page.locator("//p[contains(text(),'Congratulations!')]");
  await expect(elem).toBeVisible();

});


test('Bypass authetication by encoding the credentials base64 format', async ({ page }) => {
  
    // 1. encoding the credentials.
    let encodedCreds = Buffer.from('admin:admin').toString('base64'); 
    // .toString(), we return it as a string and 'base64' is the encoding we use among all the other options 
    console.log(encodedCreds);


    // 2. Add the credentials to the HTTP headers - > from API classes if you remember we had "Beaer tokent". You can thoink of it the same way. 
    await page.setExtraHTTPHeaders({Autherization: `Basic ${encodedCreds}`});

    await page.goto('https://loopcamp.vercel.app/basic-auth.html');


    // after logging in, lets validate 
    let elem = page.locator("//p[contains(text(),'Congratulations!')]");
    await expect(elem).toBeVisible();
});


