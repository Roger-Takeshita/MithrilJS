const sliderEl = document.getElementById('slider');
let count = 2;

const cookiesCalculator = (cookies) => {
    return cookies * 50;
};

const Hello = {
    view: function () {
        return m('main', [
            m('input[type=range]', {
                class: 'slider',
                min: 2,
                max: 100,
                step: 1,
                value: count,
                oninput: function () {
                    count = this.value;
                },
            }),
            m(
                'p',
                `When you eat ${count} cookies you consume ${cookiesCalculator(
                    count
                )} calories.`
            ),
        ]);
    },
};

m.mount(sliderEl, Hello);
