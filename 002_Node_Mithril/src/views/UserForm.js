const m = require('mithril');
const User = require('../models/User');

module.exports = {
    oninit: async (vnode) => {
        await User.load(vnode.attrs.id);
    },
    view: () => {
        return m(
            'form',
            {
                onsubmit: async (e) => {
                    e.preventDefault();
                    const user = await User.save();
                    console.log(
                        `User has been updated!\nUser id: ${user.id}\nFirst Name: ${user.firstName}\nLast Name: ${user.lastName}`
                    );
                },
            },
            [
                m('label.label', 'First name'),
                m('input.input[type=text][placeholder=First Name]', {
                    oninput: (e) => {
                        User.current.firstName = e.target.value;
                    },
                    value: User.current.firstName,
                }),
                m('label.label', 'Last name'),
                m('input.input[type=text][placeholder=Last Name]', {
                    oninput: (e) => {
                        User.current.lastName = e.target.value;
                    },
                    value: User.current.lastName,
                }),
                m('button.button[type=submit]', 'Save'),
            ]
        );
    },
};
