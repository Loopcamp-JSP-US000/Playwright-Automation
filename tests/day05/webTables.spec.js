import { expect, test } from '@playwright/test';

test.describe('', () => {
    let table;
    let allRows;
    let allColumns;
    let allCells;



    //create beforeEach function
    test.beforeEach(async ({ page }) => {
        console.log("Opening the browser");
        await page.goto("https://loopcamp.vercel.app/web-tables.html#");
        await page.waitForTimeout(2000);

        // step 1 - locate whole table 
        table = page.locator("//table[@class='SampleTable']");

        // step 2 - locate all the rows in the table - we use the <table> element and go to the child <tr>
        allRows = await table.locator("//tr").all();

        
        // step 3 - locate all the columnns
        allColumns = await table.locator("//th").all();

        // step 4 - locate all the cells
        allCells = await table.locator("//td").all();

    });

    test('Verify that there are 9 ros, 13 columns and 104 cells', async ({ page }) => {

        /*
        // Since we will need those in the other tests, lets also initialize them in beforeEachTEst();
        // step 1 - locate whole table 
        table = page.locator("//table[@class='SampleTable']");

        // step 2 - locate all the rows in the table - we use the <table> element and go to the child <tr>
        allRows = await table.locator("//tr").all();

        
        // step 3 - locate all the columnns
        allColumns = await table.locator("//th").all();

        // step 4 - locate all the cells
        allCells = await table.locator("/td").all();
        */
        expect (allRows.length === 9).toBeTruthy();
        expect (allColumns.length === 13).toBeTruthy();
        expect (allCells.length === 104).toBeTruthy();


    });

    test('Read all the data from the table', async ({ page }) => {
        
        // this loop will print the empty columns as well
        for (const eachCell of allCells) {
            let cellText = await eachCell.innerText();
            console.log(cellText);
        }

        console.log("----------------------------------");
        // lets not print the empty columns 
        for (let i = 1; i < allRows.length-1; i++) {
            let cellsInEachRow = await allRows[i].locator("//td").all();
            for (let j = 1; j < cellsInEachRow.length-1; j++) {
                let eachCellText = await cellsInEachRow[j].innerText();
                console.log(eachCellText);
            }
            console.log("**************************");
        }
        

    });

    test('Check all the check boxes on the web table', async ({ page }) => {
        
        let allCheckBoxes = await table.locator("//input").all(); 
        for (const eachElem of allCheckBoxes) {
            await page.waitForTimeout(2000);
            await eachElem.check();

            // we can also validate if it is checked or not 
            expect(eachElem.isChecked()).toBeTruthy();
        }

    });
});