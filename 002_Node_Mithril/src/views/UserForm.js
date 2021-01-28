const m = require('mithril');

module.exports = {
    view: () => {
        return m('form', [
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
            m('button.button[type=button]', 'Save'),
        ]);
    },
};
