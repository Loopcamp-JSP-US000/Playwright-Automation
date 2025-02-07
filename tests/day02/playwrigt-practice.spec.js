// // to be able to use the test() function, we need to import it from the '@playwright/test' package - we use the omport one not the require 
// import {test} from '@playwright/test';

// test("", async ({ page }) => {
//     // script goes here
// });


// now I will use the AI to get the code above with out command - > /empty-test -> "Insert at cursor position"
import { test } from '@playwright/test';

test('', async ({ page }) => {
  // Navigate to https://www.youtube.com
  await page.goto('https://www.youtube.com');

   // Now we need to locate the search box element - instead doing it for each element, we can utilize the AI 
   let searchBox = page.locator("//input[@name='search_query' and @class='ytSearchboxComponentInput yt-searchbox-input title' and @placeholder='Search']");

   // click the search box 
   await searchBox.click();

   // Make sure the search box is focused
   await page.keyboard.type('Minions');

   // pause the execution for 3 seconds 
   await page.waitForTimeout(3000);

   // Press Enter to search
   await page.keyboard.press('Enter');

   // pause the execution for 3 seconds 
   await page.waitForTimeout(3000);

   // lets get the first one - we can locate alement and ask to use index if we get more than matching element 
   // let firstResult = page.locator("//a[@id='video-title'])[1]").first();
   let firstResult = page.locator("(//a[@id='video-title'])[1]");

   // click the first result
   await firstResult.click();

   // pause the execution for 10 seconds 
   await page.waitForTimeout(10000);

 
});

