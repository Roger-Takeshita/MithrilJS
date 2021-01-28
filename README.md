<h1 id='contents'>TABLE OF CONTENTS</h1>

- [MITHRILJS](#mithriljs)
  - [Installation](#installation)
  - [Render](#render)
  - [Mount a New Element](#mount-a-new-element)
    - [Element By Id](#element-by-id)
    - [Add a Single Element With a CSS Class](#add-a-single-element-with-a-css-class)
    - [Add Multiple Elements With a CSS Class](#add-multiple-elements-with-a-css-class)
      - [Adding To an Existing Element](#adding-to-an-existing-element)
  - [Mount vs Render](#mount-vs-render)
  - [view() - Component](#view---component)
  - [m.route() - Route](#mroute---route)
  - [m.request() - XHR (API Calls)](#mrequest---xhr-api-calls)

# MITHRILJS

## Installation

[Go Back to Contents](#contents)

- In `index.html`

  - Add the following `script` and `variable`

    ```HTML
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script defer type="text/javascript" src="https://unpkg.com/mithril/mithril.js"></script>
          <script defer type="text/javascript" src="./JavaScript/index.js"></script>
          <title>Mithril.js</title>
      </head>

      <body>
          <div id="content"></div>
          <main></main>
      </body>

      </html>
    ```

## Render

[Go Back to Contents](#contents)

To render a new thing into the **DOM**, we first need to target the element then we add the code

```JavaScript
  m.render(document.body, "Hello World")
```

## Mount a New Element

[Go Back to Contents](#contents)

We can mount a new element/component into the DOM using `m.mount()`

```JavaScript
  const root = document.body;
  const helloComponent = {
      view: () => {
          return m('h1', 'Hello World hello method');
      },
  };

  m.mount(root, helloComponent);
```

A **component** is a `JavaScript Object` with the `view` **method/property**

- the `view` method/property is a function that returns a mithril method

  ```JavaScript
    const helloComponent = {
        view: () => {
            return m('h1', 'Hello World hello method');
        },
    };
  ```

### Element By Id

[Go Back to Contents](#contents)

```JavaScript
  const root = document.body;
  const helloComponent = {
      view: () => {
          return m('h1', 'Hello World hello method');
      },
  };

  m.mount(document.getElementById('content'), helloComponent);
```

### Add a Single Element With a CSS Class

[Go Back to Contents](#contents)

```JavaScript
  const root = document.body;
  m.render(root, m('h1', { class: 'title' }, 'My first app'));
```

### Add Multiple Elements With a CSS Class

[Go Back to Contents](#contents)

To add multiple elements at the same time, we need to specify as an **Array**

```JavaScript
  const root = document.body;

  m.render(root, [
      m('h1', { class: 'title' }, 'My first app'),
      m('button', 'A button'),
  ]);
```

#### Adding To an Existing Element

[Go Back to Contents](#contents)

Add a multiple elements with a CSS class to an element

```JavaScript
  m.render(root, [
      m('main', [
          m('h1', { class: 'main-title' }, 'Main Title'),
          m('button', 'Main Button'),
      ]),
  ]);
```

## Mount vs Render

[Go Back to Contents](#contents)

The `m.mount` function is similar to `m.render`, but instead of rendering some HTML only once, it activates Mithril's **auto-redrawing system**. To understand what that means, let's add some events:

```JavaScript
  let count = 0; // added a variable

  const Hello = {
      view: () => {
          return m('main', [
              m('h1', { class: 'title' }, 'My first app'),
              // changed the next line
              m(
                  'button',
                  {
                      onclick: () => {
                          count++;
                      },
                  },
                  count + ' clicks'
              ),
          ]);
      },
  };

  m.mount(root, Hello);
```

- We defined an **onclick** event on the `button`, which increments a variable `count` (which was declared at the top). We are now also rendering the value of that variable in the `button label`.
- You can now update the `label` of the button by clicking the `button`. Since we used `m.mount`, you don't need to manually call `m.render` to apply the changes in the count variable to the HTML; Mithril does it for you.

**Mithril only touches the parts of the DOM it absolutely needs to**. So in our example above, when you click the button, the text in it is the only part of the DOM Mithril actually updates.

## view() - Component

[Go Back to Contents](#contents)

A Mithril component is just an **Javascript object** with a `view function`.

```JavaScript
  const Hello = {
      view: () => {
          return m('main', [
              m('h1', { class: 'title' }, 'My first app'),
              m('button', 'A button'),
          ]);
      },
  };
```

## m.route() - Route

[Go Back to Contents](#contents)

Routing just means going from one screen to another in an application with several screens.
Let's add a splash page that appears before our click counter. First we create a component for it:

```JavaScript
  const Splash = {
      view: () => {
          return m('a', { href: '#!/hello' }, 'Enter!');
      },
  };
```

As you can see, this component simply renders a link to `#!/hello`. The **#!** part is known as a **hashbang**, and it's a `common convention used in Single Page Applications to indicate that the stuff after it (the /hello part) is a route path`.
Now that we're going to have **more than one screen**, we use m.route instead of `m.mount`.

```JavaScript
  m.route(root, '/splash', {
      '/splash': Splash,
      '/hello': Hello,
  });
```

The `m.route` function still **has the same auto-redrawing functionality** that `m.mount` does, and it also enables URL awareness; in other words, it lets Mithril know what to do when it sees a **#!** in the URL.

- The `"/splash"` right after root **means that's the default route**
- If the **hashbang** in the URL **doesn't point to one of the defined routes** (`/splash` and `/hello`, in our case), then `Mithril redirects to the default route`.
- So if you open the page in a browser and your URL is `https://localhost`, then you get redirected to `https://localhost/#!/splash`.

## m.request() - XHR (API Calls)

[Go Back to Contents](#contents)

Basically, **XHR** is just a way to talk to a server.
First we create a function that calls `m.request`.

- `method` PUT
- `url` specifies an endpoint that represents a resource
- `body` is the payload that we're sending to the endpoint
- `withCredentials` means to enable cookies (a requirement for the REM API to work)

```JavaScript
  let count = 0;
  const increment = () => {
      m.request({
          method: 'PUT',
          url: '//rem-rest-api.herokuapp.com/api/tutorial/1',
          body: {
            count: count + 1
          },
          withCredentials: true,
      }).then((data) => {
          count = parseInt(data.count);
      });
  };
```

Calling the `increment function`, sends an object `{count: 1}` to the `/api/tutorial/1` endpoint.
In this case this endpoint returns an object with the same count value that was sent to it.

```JavaScript
  var Hello = {
      view: () => {
          return m('main', [
              m('h1', { class: 'title' }, 'My first app'),
              m('button', { onclick: increment }, count + ' clicks'),
          ]);
      },
  };
```
