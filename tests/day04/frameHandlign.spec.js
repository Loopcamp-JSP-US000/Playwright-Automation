import { expect, test } from '@playwright/test';

test('iframe test', async ({ page }) => {
  
    await page.goto(process.env.LOOPCAMP_PRACTICE_URL);
    await page.locator("text='Frames'").click();
    await page.waitForTimeout(2000);

    // click iFrame to navigae to the nested iFrame 
    await page.locator("text='iFrame'").click();
    await page.waitForTimeout(2000);


    // Since the element is from a different source, we will use different method to locate not hte locator();
    // page.locator("//iframe[@class='tox-edit-area__iframe']");
    let textIFrame = page.frameLocator("//iframe[@class='tox-edit-area__iframe']");

    //Now, I need to locate the element from this iFrame
    let contentArea = textIFrame.locator("//body[@class='mce-content-body ']")
    // Do this first: fill it with regular text 
    //await contentArea.fill('Hello from iframe'); // dont forget fill() function takes string even if the value is "1212"

    // lets imagine that input field is the card number and we do not want to revealt it. 
    await contentArea.fill(`CC NO:\t${process.env.CC_NUMBER}\nCC exp Date:\t${process.env.CC_EXP_DATE}\nCC CVV:\t${process.env.CC_CVV} `); 

    // Now, lets say I want to locate an element which is not inside of the iframe, then I just od it with directly locator()
    let headerTextElem = page.locator("//h3[text()='An iFrame containing the TinyMCE WYSIWYG Editor']"); 
    await expect(headerTextElem).toHaveText('An iFrame containing the TinyMCE WYSIWYG Editor');
    await page.waitForTimeout(4000);
    

});
