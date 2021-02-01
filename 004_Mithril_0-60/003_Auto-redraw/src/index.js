let appState = 0;
let appStateOutside = 0;

const buttonOutside = m(
    'button',
    {
        onclick: function () {
            appStateOutside++;
            console.log(`Click Outside View: ${appStateOutside}`);
        },
    },
    `Clicks Outside: ${appStateOutside}`
);

const buttonOutsideCorrection = function () {
    return m(
        'button',
        {
            onclick: function () {
                appStateOutside++;
                console.log(`Click Outside View: ${appStateOutside}`);
            },
        },
        `Clicks Outside: ${appStateOutside}`
    );
};

const App1 = {
    view: function () {
        return m(
            'button',
            {
                onclick: function () {
                    appState++;
                    console.log(`Click Inside View: ${appState}`);
                },
            },
            `Clicks: ${appState}`
        );
    },
};

//+ This happens when the page loads
const App2 = {
    view: function () {
        return buttonOutside;
    },
};

//+ To fix that, we can declare as a function, then this function will be invoke every time we click
//+ Our auto-redraw works because we have our view mounted inside a component, and the component is mounted to our page
const App2Correction = {
    view: function () {
        return buttonOutsideCorrection();
    },
};

m.mount(document.getElementById('button1'), App1);
m.mount(document.getElementById('button2'), App2);
m.mount(document.getElementById('button2'), App2Correction);
