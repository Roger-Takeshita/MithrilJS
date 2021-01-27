const body = document.body;
const helloComponent = {
    view: () => {
        return m('h1', 'Hello World hello method');
    },
};

// Render overrides everything
m.render(body, 'Hello World');
// Append new component
m.mount(body, helloComponent);
m.mount(document.getElementById('content'), helloComponent);
