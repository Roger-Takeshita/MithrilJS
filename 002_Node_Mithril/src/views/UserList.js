const m = require('mithril');
const User = require('../models/User');

module.exports = {
    oninit: User.loadList,
    //+ Notice that we added an oninit method to the component, which references
    //+ User.loadList.This means that when the component initializes,
    //+ User.loadList will be called, triggering an XHR request.When the server
    //+ returns a response, User.list gets populated.
    //- Also notice we didn't do oninit: User.loadList() (with parentheses at
    //- the end).The difference is that oninit: User.loadList() calls the
    //- function once and immediately, but oninit: User.loadList only calls that
    //- function when the component renders.
    view: () => {
        return m(
            '.user-list',
            User.list.map((user) => {
                return m(
                    m.route.Link,
                    // m.route.Link with that class and the same children.
                    // We added an href that references the route we want.What
                    // this means is that clicking the link would change the
                    // part of URL that comes after the hashbang #!(thus
                    // changing the route without unloading the current HTML
                    // page).Behind the scenes, it uses an < a > to implement
                    // the link, and it all just works.
                    {
                        class: '.user-list-item',
                        href: `/edit/${user.id}`,
                    },
                    `${user.firstName} ${user.lastName}`
                );
            })
        );
    },
};
