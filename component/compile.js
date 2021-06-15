const svelte = require('svelte/compiler');
const fs = require('fs');

fs.readFile('../views/component/render.svelte', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const result = svelte.compile(data, {
        sveltePath: '/db/my-app/node_modules/svelte',
    });
    if (result.js.code) {
        fs.writeFile('../views/component/render.js', result.js.code, function (err) {
            if (err) return console.log(err);
            console.log('JS Code > render.js');
        });
    }
    if (result.css.code) {
        fs.writeFile('../views/component/render.css', result.css.code, function (err) {
            if (err) return console.log(err);
            console.log('CSS Code > render.css');
        });
    }
});
