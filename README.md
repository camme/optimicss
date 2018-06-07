# Optimicss

A simple css optimizer that takes in your html and your complete css and returns onyl the CSS content that existed in the HTML.
Since that might not be enough, you can also send in a include with wildcards.

## How to use it

Simple example:

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

Example with include:

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
    let opmizedCss = await optimicss({html, css, include: ['.tjena*']});
    console.log(opmizedCss);
}

run();

```


## Options

```
let opmizedCss = await optimicss({
    html: 'YOUR HTML STRING',   // Your pages HTML
    css: 'YOUR COMPLETE CSS',   // Your complete CSS including everything
    include: ['.foo*'].       // An array of strings with optional wildcards to include no matter what,
    cache: true,                // Use your HTML and the include as a key to cache the result for the next time. 
                                // Defaults to true
});
```

