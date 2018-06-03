# Optimicss

A simple css optimizer that takes in your html and your complete css and returns onyl the CSS content that existed in the HTML.
Since that might not be enough, you can also send in a whitelist with wildcards.

## Simple example

```
const optimicss = require('optimicss');

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
    let opmizedCss = await optimicss({html, css});
    console.log(opmizedCss);
}

run();

```

## Example with whitelist

```
const optimicss = require('optimicss');

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
    let opmizedCss = await optimicss({html, css, whitelist: ['.tjena*']});
    console.log(opmizedCss);
}

run();

```
