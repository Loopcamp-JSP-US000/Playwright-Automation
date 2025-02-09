/*
    Task:
        1. Verify that there are exactly 50 link elements which in the <ul> tag
        2. Verify that each of the 50 link elmenets which the <ul> tag is visible and clickable
        3. Verify that each of the 50 link elmenets which the <ul> tag has href attribut
*/

// Since all those three will be on the same link, I will group them.
import { expect, test } from "@playwright/test";
import { beforeEach } from "node:test";

test.describe("Array of Elements Tests", () => {

    let elements; // I amdeclaring it here at group level becuase need to be able to access in all the functions and initializing it in the .beforeEach() function. So, I can use the assigned value on each test()

  // create beforeEach
  test.beforeEach(async ({ page }) => {
    await page.goto("https://loopcamp.vercel.app/");
    await page.waitForTimeout(2000);
    elements = await page.locator("//ul[@class='list-group list-group-flush']/li//a").all(); // now gettign Array of Locator
  });

  // Create test cases here.

  test("Verify that there are exactly 50 link elements which in the <ul> tag", async ({
    page,
  }) => {
    //page.locator("//ul[@class='list-group list-group-flush']/li"); // this will retiurn ONLY 1 and the 1st matching one
    //let elements = await page.locator("//ul[@class='list-group list-group-flush']/li").all(); // now gettign Array of Locator
    expect(elements.length).toBe(50); // .toBe(50); is used to validate is it is strict equal

    // how about if we want to verify if there at list 20 links
    expect(elements.length).toBeGreaterThanOrEqual(20);

    // how about if we want to verify if there less than 100 links
    expect(elements.length).toBeLessThan(100);
  });



  test("Verify that each of the 50 link elmenets which the <ul> tag is visible and clickable", async ({
    page,
  }) => {
    // get each element and veridy
    //let elements = await page.locator("//ul[@class='list-group list-group-flush']/li").all(); // now gettign Array of Locator

    for (let eachElement of elements) {
      await expect(eachElement).toBeVisible(); // verify if element is visible
      expect(await eachElement.isVisible()).toBeTruthy(); // same as above

      await expect(eachElement).toBeEnabled(); // verify if element is clickable
      expect(await eachElement.isEnabled()).toBeTruthy(); // same as above)
    }
  });

  test("Verify that each of the 50 link elmenets which the <ul> tag has href attribut", async ({
    page,
  }) => {
    for (let eachElement of elements) {
        let href = await eachElement.getAttribute("href");
        expect(href).not.toBeNull(); // verify if href attribute is not null)
        // or we can do one below which is more easier way     
        await expect(eachElement).toHaveAttribute("href");
        // console.log(`${await eachElement.innerText()} has href: ${await eachElement.getAttribute("href")}`);
    }
  });
});

//<a href="ab-test.html">A/B Testing</a>