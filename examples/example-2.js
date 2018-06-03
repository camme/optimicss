const optimicss = require('../');

const css = `body { padding: 20rem; } .foo { background-color: red; } .bar { color: lime; } 
.datamaskin { font-family: serif; } .tjena { color: black; } .tjena--hej { color: yellow; }`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
</head>
<body>
    <div class="foo"></div>
    <div class="bar"></div>
</body>
</html>`;

async function run () {
    let opmizedCss = await optimicss({html, css, include: ['.tjena*']});
    console.log(opmizedCss);
}

run();
