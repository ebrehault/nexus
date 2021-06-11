import Component from './component.js';

const component = new Component({
    target: document.body,
    props: {
        name: 'world',
    },
});

export default component;
