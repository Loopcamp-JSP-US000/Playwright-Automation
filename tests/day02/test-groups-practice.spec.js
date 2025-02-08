import { test } from "@playwright/test";

test.describe("", () => {
  // create beforeEach function
  test.beforeEach(async ({ page }) => {
    console.log("Opening the browser");
    await page.goto("https://loopcamp.vercel.app/");
    await page.waitForTimeout(2000);
  });

  // create afterEach function - NOTE: In Playwright we do not need to close the browser like we do in Selenium, it closes it itself. 
  test.afterEach(async ({ page }) => {
        console.log("Closing the browser");
  });

  test("Test A", async ({ page }) => {
    console.log("Test A function is executed");
  });


  test("Test B", async ({ page }) => {
    console.log("Test B function is executed");
  });


  test("Test C", async ({ page }) => {
    console.log("Test C function is executed");
  });

});
