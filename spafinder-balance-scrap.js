const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const readlineSync = require('readline-sync');

const getDetail = (link) => new Promise ((resolve, reject) => {
    fetch(`${link}`, {
    method: 'GET',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': 'JSESSIONID=2CD23187CAC441CA620D47F06788B755',
        'Referer': 'https://www.upwork.com/',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
    }
})
.then(res => res.text())
.then(result => {
    const $ = cheerio.load(result);
    const balance = $('#giftCard').text();
    const a = balance.split(':')[1]
    const card = $('#cardNumber2').text();
    const b = card.split(':')[0]
    const cvv = $('#cvv2').text();
    const c = cvv.split(':')[0]
    const date = $('#expirationDate').text();
    const d = date.split(':')[0]
    const full = `${b}|${d}|${c}  =>  ${a}`
    resolve(full.replace(/\n\s+/g, ""))
})
.catch(err => {
    reject(err)
})
});

(async () => {
    const link = readlineSync.question('Input link for scrap ex. https://egift.activationspot.com/egift?xxx : ')
    const balance = await getDetail(link)
    console.log(balance)
    fs.appendFile("card.txt",balance,function (err) {
        if (err) throw err;
        console.log('Saved!');
      })

})();
