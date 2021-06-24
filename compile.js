const svelte = require('svelte/compiler');
const fs = require('fs');

const args = process.argv.slice(2);
const source = args[0];
const ABFAB_ROOT = '/db/my-app';

fs.readFile(source, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const result = svelte.compile(data, {
        sveltePath: ABFAB_ROOT + '/node_modules/svelte',
    });
    if (result.js.code) {
        fs.writeFile(source + '.js', result.js.code, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
    if (result.css.code) {
        fs.writeFile(source + '.css', result.css.code, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
});
