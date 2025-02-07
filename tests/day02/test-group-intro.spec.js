// Since we are going to use that practive webpage, we can group everything under one test group. 

import { test } from '@playwright/test';


// Pay attension! -- > sometimes, you see that there is not RUN button. Go go Testing app on the left and click on the refresh button 
test.describe('User Story01 @US-ID01', async () => {


    // create beforeAll funciton - do not provide the page in the asiny fro beforeAll and afterAll functions
    test.beforeAll(async ({ }) => {
        console.log("BeforeAll function is executed");
    });


    // create afterAll function
    test.afterAll(async ({ }) => {
        console.log("AfterAll function is executed");
    });


    // create beforeEach function
    test.beforeEach(async ({ page }) => {
        console.log("BeforeEach function is executed");
    });


    // create afterEach function
    test.afterEach(async ({ page }) => {
        console.log("AfterEach function is executed");
    });


    test('Test Case01', async ({ page }) => {
        console.log("Test Case01 function is executed");
    });

    test('Test Case02', async ({ page }) => {
        console.log("Test Case02 function is executed");
    });

    test('Test Case03', async ({ page }) => {
        console.log("Test Case03 function is executed");
    });

});

/*
LOOK AT THE CONSOLE 

BeforeAll function is executed
BeforeEach function is executed
Test Case01 function is executed
AfterEach function is executed
[chromium] › tests/day02/test-group-intro.spec.js:38:9 › User Story01 @US-ID01 › Test Case02
BeforeEach function is executed
Test Case02 function is executed
AfterEach function is executed
[chromium] › tests/day02/test-group-intro.spec.js:42:9 › User Story01 @US-ID01 › Test Case03
BeforeEach function is executed
Test Case03 function is executed
AfterEach function is executed
AfterAll function is executed
*/


// Since we will be using creating the test group, lets create anothe PROMPT for this. 