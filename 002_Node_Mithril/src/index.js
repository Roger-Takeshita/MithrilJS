const m = require('mithril');
const UserList = require('./views/UserList');
const UserForm = require('./views/UserForm');
const Layout = require('./views/Layout');

m.mount(document.body, UserList);

m.route(document.body, '/list', {
    '/list': () => {
        return m(Layout, m(UserList));
    },
    '/edit/:id': (vnode) => {
        return m(Layout, m(UserForm, vnode.attrs));
    },
});
