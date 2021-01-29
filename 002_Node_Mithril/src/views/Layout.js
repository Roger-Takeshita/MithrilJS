const m = require('mithril');

module.exports = {
    view: (vnode) => {
        //+ Notice there's also a <section> element with vnode.children as
        //+ children.vnode is a reference to the vnode that represents an
        //+ instance of the Layout component(i.e.the vnode returned by a
        //+ m(Layout) call).Therefore, vnode.children refer to any children of that vnode.
        return m('main.layout', [
            m('nav.menu', [
                m(
                    m.route.Link,
                    {
                        href: '/list',
                    },
                    'Users'
                ),
            ]),
            m('section', vnode.children),
        ]);
    },
};
