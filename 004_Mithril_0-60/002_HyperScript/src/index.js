const App = {
    view: function () {
        return [
            m('header', 'Header'),
            m(
                '.wrapper',
                m('aside', 'Aside'),
                m(
                    'article',
                    m('p', 'Article'),
                    m(
                        'button',
                        {
                            onclick: function () {
                                alert('You clicked Mithril!');
                            },
                        },
                        'Click Me'
                    )
                )
            ),
            m('footer', 'Footer'),
        ];
    },
};

const box2El = document.getElementById('box2');
m.mount(box2El, App);

/*
<header>Header</header>
<div class="wrapper">
    <aside>Aside</aside>
    <article>
        <p>Article</p>
        <button onclick="alert('You clicked html!')">Click Me</button>
    </article>
</div>
<footer>Footer</footer>
*/
