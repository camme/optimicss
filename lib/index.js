
const postcss = require('postcss');
const mm = require('micromatch');
const MD5 = require('md5.js');
const LRU = require('lru-cache');
const cssCache = LRU({ max: 500, maxAge: 1000 * 60 * 60 * 24 * 365 });

const plugin = postcss.plugin('postcss-exclude', (options = { from: 'undefined'}) => {

    return root => {

        root.walkDecls(decl => {

            let selector = decl.parent.selector ? decl.parent.selector : '';
            let exists = selector.indexOf('.') !== 0 || options.whitelist.indexOf(selector)  > -1 || mm.isMatch(selector, options.predefinedWhitelist);

            if (!exists) {
                if (decl.parent.parent) {
                    decl.parent.parent.removeChild(decl.parent);
                }
            }

        });

    };

});

const optimize = async ({html, css, whitelist = [], cache = true}) => {

    let key = new MD5().update(`${html}-${whitelist.join('-')}`).digest('hex');

    let partialCss = cssCache.get(key);

    if (partialCss) {
        return partialCss;
    }

    let re = /class=["'](.*?)["']/ug;
    let cssClassMatch = html.match(re) || [];

    const allCssClasses = cssClassMatch.reduce((result, item) => {

        let localClasses = item.replace(/(class=|'|")/gu, '').replace(/(^\s+|\s+$)/g, '').split(' ');

        let uniqueClasses = localClasses
            .filter(item => {
                let add = !result.cache[item];
                if (add) {
                    result.cache[item] = true;
                }
                return add;
            });

        result.list = [...result.list, ...uniqueClasses];

        return result;

    }, {cache: {}, list: []});

    allCssClasses.list = allCssClasses.list.map(className => `.${className}`);

    partialCss = await postcss([plugin({ predefinedWhitelist: whitelist, whitelist: allCssClasses.list, from: 'src/app.css', to: 'dest/app.css' })])
        .process(css)
        .then(result => {
            return result.css;
        });

    if (cache) {
        cssCache.set(key, partialCss);
    }

    return partialCss;

};

module.exports = optimize;
