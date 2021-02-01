/*
 * appState [{name, value}]
 * increment function
 * rgb background calc
 * hex background calc
 * color channel component?
 */

const appState = [
    { name: "R", value: 119 },
    { name: "G", value: 119 },
    { name: "B", value: 119 },
];

const stepValue = (channel, increment) => (_e) => {
    const temp = channel.value + increment * 17;
    if (temp > -1 && temp < 256) channel.value = temp;
};

const rgbColor = (channel) => `rgb(${appState.map((chan) => (channel === chan ? chan.value : 0))})`;

const hexValue = (number) => `${number < 16 ? "0" : ""}${number.toString(16)}`;

const hexColor = () => `#${appState.map((chan) => hexValue(chan.value)).join("")}`;

const App = {
    view: () => {
        const bgColor = hexColor();

        return m(
            ".wrapper",
            { style: { background: bgColor } },
            appState.map((channel) => {
                return m(
                    ".color-channel",
                    m("span", channel.name),
                    m(".chip", { style: { background: rgbColor(channel) } }),
                    m(
                        ".button-wrapper",
                        m("button", { onclick: stepValue(channel, -1) }, "-"),
                        m("button", { onclick: stepValue(channel, +1) }, "+")
                    ),
                    m("span.decimal", channel.value)
                );
            }),
            m("span", `Hex value: ${bgColor}`)
        );
    },
};

m.mount(document.getElementById("mithril"), App);

/*
<div class="wrapper" style="background-color: #777777;">
    <div class="color-channel">
        <span>R</span>
        <div class="chip" style="background-color: #770000;"></div>
        <div class="button-wrapper">
            <button>-</button>
            <button>+</button>
        </div>
        <span class="decimal">119</span>
    </div>
    <div class="color-channel">
        <span>G</span>
        <div class="chip" style="background-color: #007700;"></div>
        <div class="button-wrapper">
            <button>-</button>
            <button>+</button>
        </div>
        <span class="decimal">119</span>
    </div>
    <div class="color-channel">
        <span>B</span>
        <div class="chip" style="background-color: #000077;"></div>
        <div class="button-wrapper">
            <button>-</button>
            <button>+</button>
        </div>
        <span class="decimal">119</span>
    </div>
    <span>HEX value: #777777</span>
</div>
*/
