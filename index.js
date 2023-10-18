const puppeteer = require('puppeteer');
const excel = require('excel4node');

const jokes = [];

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: 'new' });

    // Create a page
    const page = await browser.newPage();

    // Go to your site
    await page.goto('https://dadjokegenerator.com/');

    // Wait for content to load
    sleep(1000);

    // Get 10 jokes
    for (let i = 0; i < 10; i++) {
        // Get the setup question
        const setup = await page.waitForSelector('#setup');
        const question = await setup.evaluate((el) => el.textContent);
        // This works too:
        // const question =  await page.$eval('#setup', el => el.innerText);

        // Get the tell-me button and click it
        const button = await page.waitForSelector('#buttons #tell-me');
        await button.click();
        sleep(1000);

        // Get the punchline
        const punchline = await page.waitForSelector('#joke #punchline #zing');
        const zingText = await punchline.evaluate(el => el.textContent);

        jokes.push(`${question}:${zingText}`);

        //   await element.click(); // Just an example.
        //   await element.dispose();

        const another = await page.waitForSelector('.another .another');
        await another.click();
        sleep(1000);

    }


    // Close browser.
    await browser.close();

    writeToSpreadsheet();

    console.log('Finished Successfully!');
})();


function sleep(delay) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

// Write to xlsx: https://www.npmjs.com/package/excel4node
function writeToSpreadsheet() {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Jokes');

    // header:
    worksheet.cell(1, 1).string('Setup');
    worksheet.cell(1, 2).string('Punchline');

    // content:
    for (let i = 0; i < jokes.length; i++) {
        const joke = jokes[i];
        const index = joke.indexOf(':');
        const setup = joke.slice(0, index);
        const punchline = joke.slice(index + 1);
    
        worksheet.cell(i + 2, 1).string(setup);
        worksheet.cell(i + 2, 2).string(punchline);
    }

    workbook.write('jokes.xlsx');
}