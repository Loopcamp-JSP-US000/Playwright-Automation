import { expect, test } from "@playwright/test";

test.describe("", () => {
  // create beforeEach function
  test.beforeEach(async ({ page }) => {
    console.log("Opening the browser");
    await page.goto("https://loopcamp.vercel.app/javascript-alerts.html");
    await page.waitForTimeout(2000);
  });

  test("Regular/Basic JS Aleert", async ({ page }) => {
    // you can still handle it calling the on() method but not needed for basic alerts -  jsut keeping here 
    //page.on("dialog", async (dialog) => {
    //    console.log(`Alert messge: ${dialog.message()}`);
    //    await dialog.accept();
    //});


    let clickForJSAlertButton = page.locator("//button[@onclick='jsAlert()']");
    clickForJSAlertButton.click();

    // since this Basict JS Alert will be handled automatically, we can jsut check is the expected text is there after alert handled
    await expect(page.getByText("You successfully clicked an alert")).toBeVisible();

  });



  test("JS Confirmation Alert", async ({ page }) => {
    // First run it commenting out this on() section and observe thta it "Cancel" alert automatically
    // you will see -- > You clicked: Cancel
    // no lets it turn on the dilog mode to not Cancel but Accept 
    page.on("dialog", async (anyValue) => { // "dialog" -- this has to be named like this but "(dialog)" can be any value 
        console.log(`Alet message: ${anyValue.message()}`);
        await anyValue.accept();
    });


    let clickForJSConfirmButton = page.locator("//button[@onclick='jsConfirm()']");
    clickForJSConfirmButton.click();

    await page.waitForTimeout(2000); 

    await expect(page.getByText("You clicked: Ok")).toBeVisible();


  });




  test("JS Promt Alert", async ({ page }) => {

    page.on("dialog", async (alert) => { 
        // Also, let say that you need to verify what kind of alert it is, the veirification has to be done in .on() method
        expect(alert.message()).toBe("I am a JS prompt");  // this is to verify that it is a prompt alert 

        console.log(`Alet message: ${alert.message()}`);
        await alert.accept("LOOPCAMP School");
    });

    let clickForJSPromtButton = page.locator("//button[@onclick='jsPrompt()']");
    clickForJSPromtButton.click();

    await page.waitForTimeout(2000); 

    await expect(page.getByText("You entered: LOOPCAMP School")).toBeVisible();
    // another assertion
    await expect(page.locator("//p[@id='result']")).toHaveText("You entered: LOOPCAMP School")
    // or this one 
    await expect(page.locator("//p[@id='result']")).toContainText("LOOPCAMP School")


  });
});
