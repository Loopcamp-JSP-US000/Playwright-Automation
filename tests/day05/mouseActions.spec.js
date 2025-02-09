import { test } from '@playwright/test';

test.describe('', () => {

    // create beforeEach function
    test.beforeEach(async ({ page }) => {
        console.log("Opening the browser");
        await page.goto("https://loopcamp.vercel.app/index.html");
        await page.waitForTimeout(2000);
    });

    test('Left Click', async ({ page }) => {  
        await page.click("text='A/B Testing'"); // by default, it will do the Left Click, if we do not specify.
        await page.waitForTimeout(2000);
    });

    test('Right CLick', async ({ page }) => {
        await page.click("text='A/B Testing'", { button: 'right' }); // here specifying the Right Click
        await page.waitForTimeout(2000);
    });

    test('Hover', async ({ page }) => {
        // Again instead of locating the element and then clicking, we us mouse actions, since we will need it only once 
        await page.click("text='Hovers'");
        await page.waitForTimeout(2000);

        // now lets hover the element - we need to locate the elment we want to hover over 
        //img[@alt='User Avatar'] -- > this locator returns 3, we can specify it by index number. If not, it will get the fist matching one. 
        await page.hover("//img[@alt='User Avatar']");
        await page.waitForTimeout(2000);

        // You can also validate the text to be visible since hovering overing display a text 


        // lets say, now I want to hover over all the three images - we can use Array Elements and iterate 
        // let userProfiles = page.locator("//img[@alt='User Avatar']"); // this again returns only the first match
        let userProfiles = await page.locator("//img[@alt='User Avatar']").all();

        for (const eachElement of userProfiles) {
            await eachElement.hover(); // pay attention that here we used the "eachElement"
            await page.waitForTimeout(2000);
        }

    });

    test('Drag & Drop', async ({ page }) => {
        await page.click("text='Drag and Drop'");
        await page.waitForTimeout(2000);

        // we need to locate 2 elements: source and target
        await page.dragAndDrop("//div[@id='column-a']", "//div[@id='column-b']")
        await page.waitForTimeout(2000);

    });

    test('Double Click', async ({ page }) => {
        // on the preactice webpage, we do not have double click event
        // You guys know that once you double click on the text, it highlights it, so lets locate header test and double click it
        await page.dblclick("//span[@class='h1y']");
        await page.waitForTimeout(2000);
    });

    test('Scrolling', async ({ page }) => {
       
        await page.mouse.wheel(0, 500); // 0 -> horizontal, 500 -> scroll down by 500 pixels horizontally
        await page.waitForTimeout(2000);

        // lets say now, I want to scroll to bring the element into view 
        let elem = page.locator("text='Inputs'");
        await elem.scrollIntoViewIfNeeded()
        await page.waitForTimeout(2000);


    });
});