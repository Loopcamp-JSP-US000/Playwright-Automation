// Lets create test group since we will do everything on our practice URL, so we do not code to go to that URL for every test.
import { expect, test } from "@playwright/test";
import exp from "constants";
import { openAsBlob } from "fs";

test.describe("Test Group", () => {
  // Create beforeEach function to open the browser and navigate to the URL
  test.beforeEach(async ({ page }) => {
    console.log("Opening the browser");
    await page.goto("https://loopcamp.vercel.app/index.html");
  });

  // Create afterEach function to close the browser after each

  test("check(); - checks the radio button and checkbox if they have'nt checked yet", async ({
    page,
  }) => {
    // locating the element by the text - instead of Xpath. - Always do not forget to check the return time
    let checkboxLink = page.locator("text='Checkboxes'");
    await checkboxLink.click();

    //wait 2 sec
    await page.waitForTimeout(2000);

    // now lets checkmark both of those checboxes - locate that box element and lets use CSS this time
    // - you can use Teabnine or Perplexity
    // -always verify by searching it on Web to make sure it is unique
    let firstCheckbox = page.locator("input[type='checkbox']:nth-of-type(1)");
    let secondCheckbox = page.locator("input[type='checkbox']:nth-of-type(2)");

    await page.waitForTimeout(2000);
    await firstCheckbox.check();

    await page.waitForTimeout(2000);
    await secondCheckbox.check(); // pay attension after your code run - how many secs this tool
    await page.waitForTimeout(2000);
    // You can change the check(); with click(); and see what happens - it will check first and uncheck second since it does not check if they have been checked or not

    // on the next class PDF, you can see that there are a lot of assertions methods -exampe: toBeChekced()
    // you can do this keeping the above with click() and then to it with .check();
    // also, please pay attension the once we used the 'expect' function, it was imported from '@playwright/test' - see all the way above
    await expect(firstCheckbox).toBeChecked();
    await expect(secondCheckbox).toBeChecked();
  });

  test("uncheck(); - unchecks the radio button and checkbox if they have'nt unchecked yet", async ({
    page,
  }) => {
    // now lets do the same but with uncheck()
    let checkboxLink = page.locator("text='Checkboxes'");
    await checkboxLink.click();

    await page.waitForTimeout(2000);

    let firstCheckbox = page.locator("input[type='checkbox']:nth-of-type(1)");
    let secondCheckbox = page.locator("input[type='checkbox']:nth-of-type(2)");

    await page.waitForTimeout(2000);
    await firstCheckbox.check();
    await page.waitForTimeout(2000);
    await secondCheckbox.check();

    await page.waitForTimeout(2000);
    await firstCheckbox.uncheck();
    await page.waitForTimeout(2000);
    await secondCheckbox.uncheck();

    // Her we will use .not --- > kind of like not operator
    await expect(firstCheckbox).not.toBeChecked();
    await expect(secondCheckbox).not.toBeChecked();
  });

  test("selectOptions(); -this is for drop downs", async ({ page }) => {
    // We could have move the following code int the beforeEach function, but we only move the section which is commoen for all tests. In this test we will do something else which we do not click on Checkboxes
    /*
    await checkboxLink.click();

    await page.waitForTimeout(2000);

    let firstCheckbox = page.locator("input[type='checkbox']:nth-of-type(1)");
    let secondCheckbox = page.locator("input[type='checkbox']:nth-of-type(2)");
     */

    // .selectOption() - this is for dropdown menus
    // In selenium, we have 3 options - selectByValue(), selectByText(), selectByIndex()
    // In Playwright, we can achieve the same with .selectOption()

    // lcoate the element
    let dropdownList = page.getByText("Dropdown");
    await dropdownList.click();

    // wait 2 sec
    await page.waitForTimeout(2000);

    let dropdownBox = page.locator("//select[@id='dropdown']");

    // select by value - > examine the HTML element the attribute 'value'
    //await dropdownBox.selectOption("1");

    // select by text
    //await dropdownBox.selectOption({label: "Option 1"});

    // select by index
    await dropdownBox.selectOption({ index: 1 });

    // wait 2 sec
    await page.waitForTimeout(2000);
  });

  test("innerText() - gets only the visible text of element", async ({
    page,
  }) => {
    // copy the HTML elment for header of the main page
    let heeaderElement = page.locator("//span[@class='h1y']");

    let expectedText = "Test Automation Practice";
    let actualText = await heeaderElement.innerText();

    // both are string - for assertion look at the next class PDF again.
    expect(actualText).toEqual(expectedText);

    // we can also do the assertion iwht elment - for assertion look at the next class PDF again.
    await expect(heeaderElement).toHaveText(expectedText);
  });

  test("inputValue() - ", async ({ page }) => {
    //
    let inputsLInk = page.locator("text='Inputs'");
    await inputsLInk.click();

    // wait 2 sec
    await page.waitForTimeout(2000);


    let numberInputBox = page.locator("//input[@type='number']");
    await numberInputBox.fill("98765");

    // now retrive the value to verify if it is the number we entered 
    let inputVlaue = await numberInputBox.inputValue(); 

    expect(inputVlaue).toEqual("98765");
    console.log(inputVlaue);

    // wait 2 sec
    await page.waitForTimeout(2000);
    

  });

  test("getAttribute() - get the given attribute", async ({ page }) => {

    // lets get the element A/B Testing 
    // lets locate it by text
    let abTestingLink = page.getByText("A/B Testing");

    // abTestingLink.getAttribute("id");  // this will return the value of id attribute if exists otherwise it will return null
    // abTestingLink.getAttribute("class");  // this will return the value of class attribute if exists otherwise it will return null


    // since the one we located has only one 
    let actualHrefVlaue = await abTestingLink.getAttribute("href");
    console.log(actualHrefVlaue)

    expect(actualHrefVlaue).toEqual("ab-test.html"); // you can also invalid to see the assertion failure 

  });

  // create empty test function
  test("Methods - State: all locators of this method.", async ({ page }) => {

    // validate that Available Exmaples visible 
    let header2Element = page.getByText("Available Examples");

    // we can do this - from next class PDF again.
    expect(await header2Element.isVisible()).toBeTruthy();
    expect(await header2Element.isVisible()).not.toBeFalsy(); // same thig - reverse logic

    // but we do nto need to do this way directly, 
    await expect(header2Element).toBeVisible();
    

    //----------------------------------------------------------------
    // lets locate it by text
    let abTestingLink = page.getByText("A/B Testing");
    expect(await abTestingLink.isEnabled()).toBeTruthy(); 

    // or like this 
    await expect(abTestingLink).toBeEnabled();


    //----------------------------------------------------------------
    // add these to the ".check()" method test
    //await expect(firstCheckbox).toBeChecked();

    // it can be done also like this
    //expect(await firstCheckbox.isChecked()).toBeTruthy();


    //----------------------------------------------------------------
    // lets say that we want to verify if the link is disabled 
    expect(await abTestingLink.isDisabled()).not.toBeTruthy();  //just put the .not operator so it doe snot fail

    // or like this 
    await expect(abTestingLink).not.toBeDisabled();
    
   
  });


});
