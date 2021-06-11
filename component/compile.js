const svelte = require('svelte/compiler');
const fs = require('fs');

fs.readFile('./component.svelte', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const result = svelte.compile(data, {
        sveltePath: '../node_modules/svelte',
    });
    if (result.js.code) {
        fs.writeFile('component.js', result.js.code, function (err) {
            if (err) return console.log(err);
            console.log('JS Code > component.js');
        });
    }
    if (result.css.code) {
        fs.writeFile('component.css', result.css.code, function (err) {
            if (err) return console.log(err);
            console.log('CSS Code > component.css');
        });
    }
});
