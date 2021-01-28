const root = document.body;
const helloComponent = {
    view: () => {
        return m('h1', 'Hello World hello method');
    },
};

// = MOUNT
// _Render overrides everything
// m.render(root, 'Hello World');

// _Append new component
// m.mount(root, helloComponent);
// m.mount(document.getElementById('content'), helloComponent);
// m.render(root, m('h1', 'My first app'));

// _Add a single element with a CSS class (body)
// m.render(root, m('h1', { class: 'title' }, 'My first app'));

// _Add a multiple elements with a CSS class (body)
// m.render(root, [
//     m('h1', { class: 'title' }, 'My first app'),
//     m('button', 'A button'),
// ]);

// _Add a multiple elements with a CSS class to an element
// m.render(root, [
//     m('main', [
//         m('h1', { class: 'main-title' }, 'Main Title'),
//         m('button', 'Main Button'),
//     ]),
// ]);

// = COMPONENT
// const Hello = {
//     view: () => {
//         return m('main', [
//             m('h1', { class: 'title' }, 'My first app from hello component'),
//             m('button', 'hello button'),
//         ]);
//     },
// };

// m.mount(root, Hello);

// = RENDER VS MOUNT
//! Only updates the component
// let count = 0; // added a variable
// const Hello = {
//     view: () => {
//         return m('main', [
//             m('h1', { class: 'title' }, 'My first app'),
//             // changed the next line
//             m(
//                 'button',
//                 {
//                     onclick: () => {
//                         count++;
//                     },
//                 },
//                 count + ' clicks'
//             ),
//         ]);
//     },
// };

// m.mount(root, Hello);

// = ROUTE
// // ! Hello Page ------------------------------------------
// let count = 0; // added a variable
// const Hello = {
//     view: () => {
//         return m('main', [
//             m('h1', { class: 'title' }, 'My first app'),
//             // changed the next line
//             m(
//                 'button',
//                 {
//                     onclick: () => {
//                         count++;
//                     },
//                 },
//                 count + ' clicks'
//             ),
//         ]);
//     },
// };

// // ! Splash Page ------------------------------------------
// const Splash = {
//     view: () => {
//         return m('a', { href: '#!/hello' }, 'Enter!');
//     },
// };

// m.route(root, '/splash', {
//     '/splash': Splash,
//     '/hello': Hello,
// });

// = XHR (API Calls)
let count = 0;
const increment = () => {
    m.request({
        method: 'PUT',
        url: '//rem-rest-api.herokuapp.com/api/tutorial/1',
        body: { count: count + 1 },
        withCredentials: true,
    }).then((data) => {
        count = parseInt(data.count);
    });
};

var Hello = {
    view: () => {
        return m('main', [
            m('h1', { class: 'title' }, 'My first app'),
            m('button', { onclick: increment }, count + ' clicks'),
        ]);
    },
};

const Splash = {
    view: () => {
        return m('a', { href: '#!/hello' }, 'Enter!');
    },
};

m.route(root, '/splash', {
    '/splash': Splash,
    '/hello': Hello,
});
