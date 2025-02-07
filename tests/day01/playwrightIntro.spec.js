// import @playwright/test for testing
// We can use const to import
// const {} --- > inside of {} if you do control + space -- > it will show all available functions and methods to be imported. 
// const {test} = require('@playwright/test');  

// NOTE: pay attentions to the ... dot warning and if you hover over it, it will say: File is a CommonJS module; it may be converted to an ES module.ts(80001)
// this ES module is added later on, there is another import statement which is "import" like the one below.
import { test } from '@playwright/test';


// async ({ page }) --- >{} is used for the fixture to be passed as SET to be unique 
// page --- > it is like a driver for a web page
test("Simple Google Search test @google01", async ({ page }) => {
    // we do nto need to create Driver drive object like in Selenium, but we will use fixture - "page"
    // now since page has some methods, we can use them like this:

    // this will give an error becuase of async nature of playwright - we need to use await before page.goto -> hover over goto and it will show that it returns Promises - so we need to use await to give additional time
    // page.goto("https://www.google.com"); // navigate to google home page --> Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
    await page.goto("https://www.google.com"); // navigate to google home page 


    // now we need to locate element  - lets use the xpath -- >//tagName[@attributeName='value'] --- > make sure you find the unique element by searching on web browser
    // "// textarea[@class='gLFyf']"
    // you can hover over the 'locator' and see if it returns Promises or not - since it does not, no need to use 'await'
    // page.locator("// textarea[@class='gLFyf']")
    // We can assign it to a variable
    let searchBox = page.locator("//textarea[@class='gLFyf']");

    // since locator method does not return Promises, we do not need to use 'await' and it actually give a warning with ... three dots 
    //let searchBox = await page.locator("// textarea[@class='gLFyf']")

    // to fill the search box with text
    // type is deprecated that is why it is showing strikethrough - it types each char at a time taking longer, that is why it is deprecated - but still works 
    // Again, hover over the type() and see what it returns Promises or not - since it does, need to use 'await'
    // since the automation is so fast, we can slow it down with the wait  
    await page.waitForTimeout(3000); // 2 sec
    //await searchBox.type("Playwright Automation "); 

    // or we can use another method to fill the search box which provides all the inputs at once 
    await searchBox.fill("Playwright Automation "); 
    await page.waitForTimeout(3000); // 2 sec


    // Now, we need to press enter to search
    await searchBox.press("Enter"); // press enter to search
    await page.waitForTimeout(3000); // 2 sec


}); 


// lets add another test
// I want to run only one test from this file, we can use tags - since this tags needs to be UNIQUE, we can provide the Jira Ticket ID as a tag
test ("Simple YouTube Search Test @youtube", async({ page }) => {
//test ("Simple YouTube Search Test", async({ page }) => {
    await page.goto("https://www.youtube.com"); // navigate to youtube home page 


});