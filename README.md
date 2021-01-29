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
  - [Lifecycle Methods](#lifecycle-methods)
  - [Passing Data To Component](#passing-data-to-component)
  - [State](#state)

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
- `withCredentials` means to enable cookies (indicates that we're using cookies)

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

## Lifecycle Methods

[Go Back to Contents](#contents)

`Components` can have the same **lifecycle methods** as virtual DOM nodes. Note that `vnode` is passed as an argument to each lifecycle method, as well as to view (with the previous `vnode` passed additionally to `onbeforeupdate`):

- Components are a mechanism to encapsulate parts of a view to make code easier to organize and/or reuse.
- Any **JavaScript object** that has a `view method` is a Mithril component. Components can be consumed via the `m()` utility:
- A component can have following lifecycle methods:

  - `oninit`
  - `oncreate`
  - `onbeforeupdate`
  - `onupdate`
  - `onbeforeremove`
  - `onremove`

  ```JavaScript
    var ComponentWithHooks = {
        oninit: function(vnode) {
            console.log("initialized")
        },
        oncreate: function(vnode) {
            console.log("DOM created")
        },
        onbeforeupdate: function(newVnode, oldVnode) {
            return true
        },
        onupdate: function(vnode) {
            console.log("DOM updated")
        },
        onbeforeremove: function(vnode) {
            console.log("exit animation can start")
            return new Promise(function(resolve) {
                // call after animation completes
                resolve()
            })
        },
        onremove: function(vnode) {
            console.log("removing DOM element")
        },
        view: function(vnode) {
            return "hello"
        }
    }
  ```

Like other types of virtual DOM nodes, components may have **additional lifecycle methods** (custom methods) defined when consumed as vnode types.

```JavaScript
  function initialize(vnode) {
      console.log("initialized as vnode")
  }

  m(ComponentWithHooks, {oninit: initialize})
```

## Passing Data To Component

[Go Back to Contents](#contents)

Data can be passed to component instances by passing an `attrs` object as the **second parameter** in the `hyperscript` function:

```JavaScript
  m(Example, {name: "Floyd"})
```

This data can be accessed in the component's view or lifecycle methods via the `vnode.attrs`:

```JavaScript
  var Example = {
      view: function (vnode) {
          return m("div", "Hello, " + vnode.attrs.name)
      }
  }
```

## State

[Go Back to Contents](#contents)

Like all virtual DOM nodes, component `vnodes` can have state. Component state is useful for supporting object-oriented architectures, for encapsulation and for separation of concerns.
Note that **unlike many other frameworks, mutating component state does not trigger redraws or DOM updates**. Instead, **redraws** `are performed when event handlers fire`, when HTTP requests made by `m.request` complete or when the browser navigates to different routes. Mithril's component state mechanisms simply exist as a convenience for applications.
If a state change occurs that is not as a result of any of the above conditions (e.g. after a setTimeout), then you can use `m.redraw()` **to trigger a redraw manually**.
