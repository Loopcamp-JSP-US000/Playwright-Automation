import { test, expect } from '@playwright/test';

test('Environment Variable Practice @test01', async ({ page }) => {
  
    console.log(`Username is: ${process.env.PRACTICE_USERNAME}`);
    console.log(`Password is: ${process.env.PRACTICE_PASSWORD}`);

});


test('Bypass authetication by encoding the credentials base64 format from .json file @sep_login', async ({ page }) => {
  
    // 1. encoding the credentials.
    let encodedCreds = Buffer.from(`${process.env.PRACTICE_USERNAME}:${process.env.PRACTICE_PASSWORD}`).toString('base64'); 
    // .toString(), we return it as a string and 'base64' is the encoding we use among all the other options 
    console.log(encodedCreds);
  
  
    // 2. Add the credentials to the HTTP headers - > from API classes if you remember we had "Beaer tokent". You can thoink of it the same way. 
    await page.setExtraHTTPHeaders({Autherization: `Basic ${encodedCreds}`});
  
    await page.goto('https://loopcamp.vercel.app/basic-auth.html');
  
  
    // after logging in, lets validate 
    let elem = page.locator("//p[contains(text(),'Congratulations!')]");
    await expect(elem).toBeVisible();
  });