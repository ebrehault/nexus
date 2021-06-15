import Component from './component.js';

let response = await fetch('./data.json');
let data = await response.json();
const component = new Component({
    target: document.body,
    props: data,
});

export default component;
