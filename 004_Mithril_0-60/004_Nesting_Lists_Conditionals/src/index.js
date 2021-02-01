let appState = null;
const appData = ['left', 'middle', 'right', 'far right'];

const ButtonComponent = {
    view: function (vnode) {
        return m(
            'button',
            {
                onclick: function (e) {
                    appState = e.target.textContent;
                },
            },
            vnode.attrs.label
        );
    },
};

const App = {
    view: function () {
        return [
            appData.map((label) => {
                return m(ButtonComponent, { label });
            }),
            appState && m('h2', appState),
        ];
    },
};

m.mount(document.body, App);
