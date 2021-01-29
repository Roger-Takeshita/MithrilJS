const m = require('mithril');
const UserList = require('./views/UserList');
const UserForm = require('./views/UserForm');
const Layout = require('./views/Layout');

m.route(document.body, '/list', {
    '/list': {
        render: () => {
            return m(Layout, m(UserList));
        },
    },
    '/edit/:id': {
        render: (vnode) => {
            return m(Layout, m(UserForm, vnode.attrs));
        },
    },
});
