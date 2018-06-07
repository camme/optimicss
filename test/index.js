const optimicss = require('../');

const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, './css/style.css'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, './html/index.html'), 'utf8');


async function run () {

    //console.log(css);
    //console.log(html);

    //console.log('-------------------------------');
    console.time('css1');
    let opmizedCss = await optimicss({html, css});
    console.timeEnd('css1');
    //console.log(opmizedCss);

    //console.log('-------------------------------');
    console.time('css2');
    let opmizedCssWithWhitelist = await optimicss({html, css, include: ['.tjena*']});
    console.timeEnd('css2');
    //console.log(opmizedCssWithWhitelist);

    //console.log('-------------------------------');
    console.time('css3');
    let opmizedCssWithWhitelistWithCache = await optimicss({html, css, include: ['.tjena*']});
    console.timeEnd('css3');
    //console.log(opmizedCssWithWhitelistWithCache);



}

run();


