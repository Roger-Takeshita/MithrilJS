<h1 id='table-of-contents'>TABLE OF CONTENTS</h1>

- [MITHRIL.JS](#mithriljs)
  - [Links](#links)
  - [Installation](#installation)
  - [Virtual DOM](#virtual-dom)
    - [What a Virtual DOM Looks Like?](#what-a-virtual-dom-looks-like)
  - [Inline Styling](#inline-styling)
  - [Render](#render)
  - [Mount a New Element](#mount-a-new-element)
    - [Element By Id](#element-by-id)
    - [Add a Single Element With a CSS Class](#add-a-single-element-with-a-css-class)
    - [Add Multiple Elements With a CSS Class](#add-multiple-elements-with-a-css-class)
      - [Adding To an Existing Element](#adding-to-an-existing-element)
  - [Mount vs Render](#mount-vs-render)
    - [Auto-Redraw System](#auto-redraw-system)
      - [Disable Auto-Redraw](#disable-auto-redraw)
      - [After Event Handlers](#after-event-handlers)
      - [After m.request](#after-mrequest)
        - [DISABLE AUTO-REDRAW AFTER M.REQUEST](#disable-auto-redraw-after-mrequest)
      - [After Route Changes](#after-route-changes)
      - [When Mithril Does Dot Redraw](#when-mithril-does-dot-redraw)
  - [view() - Component](#view---component)
  - [m.route() - Route](#mroute---route)
  - [m.request() - XHR (API Calls)](#mrequest---xhr-api-calls)
  - [Lifecycle Methods](#lifecycle-methods)
    - [The DOM Element Lifecycle](#the-dom-element-lifecycle)
    - [oncreate](#oncreate)
    - [onupdate](#onupdate)
    - [onbeforeremove](#onbeforeremove)
    - [onremove](#onremove)
    - [onbeforeupdate](#onbeforeupdate)
  - [Passing Data To Component](#passing-data-to-component)
  - [State](#state)
  - [Closure Component State](#closure-component-state)
    - [POJO Component State](#pojo-component-state)
      - [At Initialization](#at-initialization)
      - [Via vnode.state](#via-vnodestate)
      - [Via The This Keyword](#via-the-this-keyword)
  - [Classes](#classes)
    - [Class Component State](#class-component-state)

# MITHRIL.JS

## Links

[Go Back to Contents](#table-of-contents)

- [Mithril](https://mithril.js.org/)
- [Mithril Installation](https://mithril.js.org/installation.html)
- [Mithril The auto-redraw system](https://mithril.js.org/autoredraw.html)

## Installation

[Go Back to Contents](#table-of-contents)

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

## Virtual DOM

[Go Back to Contents](#table-of-contents)

Just like in `React`, `Mithril` has a virtual DOM that only changes/renders what has been changed (component).

### What a Virtual DOM Looks Like?

[Go Back to Contents](#table-of-contents)

```JavaScript
  const m = require('mithril');

  console.log(JSON.stringify(m('h1', 'Hello')));
  // {
  //   "tag":"h1",
  //   "attrs":null,
  //   "text":"Hello"
  // }

  console.log(JSON.stringify(m('h1.foo.bar[style=color: red]', 'Hello')));
  // {
  //   "tag": "h1",
  //   "attrs": { "style": "color: red", "className": "foo bar" },
  //   "text": "Hello"
  // }
```

## Inline Styling

[Go Back to Contents](#table-of-contents)

We have 2 ways of inline styling

- Chaining

  ```JavaScript
    const Component = {
        view: () => m('h1[style=color:red]', 'Hello Friday!'),
    };

    const outputEl = document.getElementById('output');
    m.mount(outputEl, Component);
  ```

- Pass as an attribute (an object)

  ```JavaScript
    const Component = {
        view: () => m('h1', { style: 'color:blue' }, 'Hello Friday!'),
    };

    const outputEl = document.getElementById('output');
    m.mount(outputEl, Component);
  ```

## Render

[Go Back to Contents](#table-of-contents)

To render a new thing into the **DOM**, we first need to target the element then we add the code

```JavaScript
  m.render(document.body, "Hello World")
```

## Mount a New Element

[Go Back to Contents](#table-of-contents)

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

[Go Back to Contents](#table-of-contents)

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

[Go Back to Contents](#table-of-contents)

```JavaScript
  const root = document.body;
  m.render(root, m('h1', { class: 'title' }, 'My first app'));
```

### Add Multiple Elements With a CSS Class

[Go Back to Contents](#table-of-contents)

To add multiple elements at the same time, we need to specify as an **Array**

```JavaScript
  const root = document.body;

  m.render(root, [
      m('h1', { class: 'title' }, 'My first app'),
      m('button', 'A button'),
  ]);
```

#### Adding To an Existing Element

[Go Back to Contents](#table-of-contents)

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

[Go Back to Contents](#table-of-contents)

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

Remember that `m.render` expects a `vnode` tree, and m.mount expects a component:

```JavaScript
  // wrap the component in a m() call for m.render
  m.render(document.body, m(MyComponent))

  // don't wrap the component for m.mount
  m.mount(document.body, MyComponent)
```

### Auto-Redraw System

[Go Back to Contents](#table-of-contents)

- [The auto-redraw system](https://mithril.js.org/autoredraw.html)

Mithril implements a virtual DOM diffing system for fast rendering, and in addition, it offers various mechanisms to gain granular control over the rendering of an application.
Mithril employs an **auto-redraw** system that **synchronizes the DOM whenever changes are made in the data layer**. The `auto-redraw system becomes enabled` when you call `m.mount` or `m.route` (but it stays disabled if your app is bootstrapped solely via `m.render` calls).
The auto-redraw system simply consists of triggering a re-render function behind the scenes after certain functions complete.

#### Disable Auto-Redraw

[Go Back to Contents](#table-of-contents)

You can disable an `auto-redraw` for specific events by setting `e.redraw` to `false`.

```JavaScript
  const MyComponent = {
      view: function() {
          return m("div", {onclick: doSomething})
      }
  }

  function doSomething(e) {
      e.redraw = false
      // no longer triggers a redraw when the div is clicked
  }

  m.mount(document.body, MyComponent)
```

#### After Event Handlers

[Go Back to Contents](#table-of-contents)

Mithril automatically redraws after DOM event handlers that are defined in a Mithril view:

```JavaScript
  const MyComponent = {
      view: function() {
          return m("div", {onclick: doSomething})
      }
  }

  function doSomething() {
      // a redraw happens synchronously after this function runs
  }

  m.mount(document.body, MyComponent)
```

#### After m.request

[Go Back to Contents](#table-of-contents)

Mithril automatically redraws after `m.request` completes:

```JavaScript
  // Normal promise
  m.request("/api/v1/users").then(function() {
      // a redraw happens after this function runs
  })

  // async/await
  const response = await m.request('/api/v1/users')
  console.log(reponse)
```

##### DISABLE AUTO-REDRAW AFTER M.REQUEST

[Go Back to Contents](#table-of-contents)

You can **disable** an `auto-redraw` for a specific **request** by setting the `background` option to `true`:

```JavaScript
  m.request("/api/v1/users", {background: true}).then(function() {
      // does not trigger a redraw
  })

  const response = await m.request('/api/v1/users', {background: true})
```

#### After Route Changes

[Go Back to Contents](#table-of-contents)

Mithril automatically redraws after `m.route.set()` calls and after route changes via links using `m.route.Link`.

```JavaScript
  const RoutedComponent = {
      view: function() {
          return [
              // a redraw happens asynchronously after the route changes
              m(m.route.Link, {href: "/"}),
              m("div", {
                  onclick: function() {
                      m.route.set("/")
                  }
              }),
          ]
      }
  }

  m.route(document.body, "/", {
      "/": RoutedComponent,
  })
```

#### When Mithril Does Dot Redraw

[Go Back to Contents](#table-of-contents)

- **Methods**

  - Mithril **does not redraw** after:

    - `setTimeout`
    - `setInterval`
    - `requestAnimationFrame`
    - raw Promise resolutions
    - 3rd party library event handlers (e.g. Socket.io callbacks).

  - In those cases, you must manually call `m.redraw()`.

- **Lifecycle Methods**
  - Mithril also **does not redraw** after lifecycle methods. Parts of the UI may be redrawn after an `oninit` handler, but other parts of the UI may already have been redrawn when a given `oninit` handler fires. Handlers like `oncreate` and `onupdate` fire after the UI has been redrawn.
  - If you need to explicitly trigger a redraw within a lifecycle method, you should call `m.redraw()`, which will trigger an asynchronous redraw.

```JavaScript
  function StableComponent() {
      let height = 0

      return {
          oncreate: function(vnode) {
              height = vnode.dom.offsetHeight
              m.redraw()
          },
          view: function() {
              return m("div", `This component is ${height} px tall`)
          }
      }
  }
```

- **vnode trees that are rendered via m.render**

  - Mithril does not `auto-redraw` **vnode** trees that are rendered via `m.render`. **This means redraws do not occur after event changes and m.request calls for templates that were rendered via m.render**.
  - If your architecture requires manual control over when rendering occurs (as can sometimes be the case when using libraries like Redux), you should use `m.render` instead of `m.mount`.

- **Frequency**

  - **Mithril may also avoid** `auto-redrawing` **if the frequency of requested redraws is higher than one animation frame (typically around 16ms)**.
  - This means, for example, that when using fast-firing events like `onresize` or `onscroll`
  - **Mithril will automatically throttle the number of redraws to avoid lag.**

## view() - Component

[Go Back to Contents](#table-of-contents)

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

[Go Back to Contents](#table-of-contents)

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

[Go Back to Contents](#table-of-contents)

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
  let Hello = {
      view: () => {
          return m('main', [
              m('h1', { class: 'title' }, 'My first app'),
              m('button', { onclick: increment }, count + ' clicks'),
          ]);
      },
  };
```

## Lifecycle Methods

[Go Back to Contents](#table-of-contents)

Components and virtual DOM nodes can have lifecycle methods, also known as hooks, which are called at various points during the lifetime of a DOM element.

`Components` can have the same **lifecycle methods** as virtual DOM nodes. Note that `vnode` is passed as an argument to each lifecycle method, as well as to view (with the previous `vnode` passed additionally to `onbeforeupdate`):
All lifecyle methods receive the `vnode` as their first arguments, and have their **this** keyword bound to `vnode.state`.
Lifecycle methods are only called as a side effect of a `m.render()` call. **They are not called if the DOM is modified outside of Mithril**.

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
    let ComponentWithHooks = {
        oninit: (vnode) => {
            console.log("initialized")
        },
        oncreate: (vnode) => {
            console.log("DOM created")
        },
        onbeforeupdate: (newVnode, oldVnode) => {
            return true
        },
        onupdate: (vnode) => {
            console.log("DOM updated")
        },
        onbeforeremove: (vnode) => {
            console.log("exit animation can start")
            return new Promise((resolve) => {
                // call after animation completes
                resolve()
            })
        },
        onremove: (vnode) => {
            console.log("removing DOM element")
        },
        view: (vnode) => {
            return "hello"
        }
    }
  ```

Like other types of virtual DOM nodes, components may have **additional lifecycle methods** (custom methods) defined when consumed as vnode types.

```JavaScript
  const initialize = (vnode) => {
      console.log("initialized as vnode")
  }

  m(ComponentWithHooks, {oninit: initialize})
```

### The DOM Element Lifecycle

[Go Back to Contents](#table-of-contents)

A DOM element is typically created and appended to the document. It may then have attributes or child nodes updated when a UI event is triggered and data is changed; and the element may alternatively be removed from the document.
After an element is removed, it may be temporarily retained in a memory pool. The pooled element may be reused in a subsequent update (in a process called DOM recycling). Recycling an element avoids incurring the performance cost of recreating a copy of an element that existed recently.

### oncreate

[Go Back to Contents](#table-of-contents)

The `oncreate(vnode)` hook is called **after a DOM element is created and attached to the document**.
`oncreate` **is guaranteed to run at the end of the render cycle**, so it is safe to read layout values such as `vnode.dom.offsetHeight` and `vnode.dom.getBoundingClientRect()` from this method.

- Particularities

  - **This hook does not get called when an element is updated**.
  - Like in other hooks, the **this** keyword in the `oncreate` callback points to `vnode.state`. DOM elements whose `vnodes` have an oncreate hook do not get recycled.

- Applications

  - The `oncreate` hook is useful for reading layout values that may trigger a repaint, starting animations and for initializing third party libraries that require a reference to the DOM element.

```JavaScript
  const HeightReporter = {
      oncreate: (vnode) => {
          console.log("Initialized with height of: ", vnode.dom.offsetHeight)
      },
      view: () => {}
  }

  m(HeightReporter, {data: "Hello"})
```

**ATTENTION: You should not modify model data synchronously from this method**. Since oncreate is run at the end of the render cycle, model changes created from this method will not be reflected in the UI until the next render cycle.

### onupdate

[Go Back to Contents](#table-of-contents)

The `onupdate(vnode)` hook is called **after a DOM element is updated, while attached to the document**.
`onupdate` **is guaranteed to run at the end of the render cycle**, so it is safe to read layout values such as `vnode.dom.offsetHeight` and `vnode.dom.getBoundingClientRect()` from this method.

- Particularities

  - This hook is only called if the element existed in the previous render cycle. It is not called when an element is created or when it is recycled.
  - DOM elements whose `vnodes` have an onupdate hook do not get recycled.

- Applications

  - The `onupdate` hook is useful for reading layout values that may trigger a repaint, and for dynamically updating UI-affecting state in third party libraries after model data has been changed.

```JavaScript
  const RedrawReporter = () => {
      let count = 0
      return {
          onupdate: () => {
              console.log("Redraws so far: ", ++count)
          },
          view: () => {}
      }
  }

  m(RedrawReporter, {data: "Hello"})
```

### onbeforeremove

[Go Back to Contents](#table-of-contents)

The `onbeforeremove(vnode)` hook is called **before a DOM element is detached from the document**. If a Promise is returned, Mithril only detaches the DOM element after the promise completes.

- Particularities

  - This hook is only called on the DOM element that loses its parentNode, but it does not get called in its child elements.
  - Like in other hooks, the **this** keyword in the `onbeforeremove` callback points to `vnode.state`. DOM elements whose `vnodes` have an `onbeforeremove` hook do not get recycled.

```JavaScript
  const Fader = {
      onbeforeremove: (vnode) => {
          vnode.dom.classList.add("fade-out")
          return new Promise((resolve) => {
              setTimeout(resolve, 1000)
          })
      },
      view: () => {
          return m("div", "Bye")
      },
  }
```

### onremove

[Go Back to Contents](#table-of-contents)

The `onremove(vnode)` hook is called before a DOM element is removed from the document. If a `onbeforeremove` hook is also defined, the `onremove` hook runs after the promise returned from `onbeforeremove` is completed.

- Particularities

  - This hook is called on any element that is removed from the document, regardless of whether it was directly detached from its parent or whether it is a child of another element that was detached.
  - Like in other hooks, the **this** keyword in the `onremove` callback points to `vnode.state`. DOM elements whose `vnodes` have an `onremove` hook do not get recycled.

- Applications

  - The `onremove` hook is useful for running clean up tasks.

```JavaScript
  const Timer = () => {
      const timeout = setTimeout(() => {
          console.log("timed out")
      }, 1000)

      return {
          onremove: () => {
              clearTimeout(timeout)
          },
          view: () => {}
      }
  }
```

### onbeforeupdate

[Go Back to Contents](#table-of-contents)

**ATTENTION:** [onbeforeupdate hook should only be used as a last resort.](https://mithril.js.org/lifecycle-methods.html#avoid-anti-patterns)

The `onbeforeupdate(vnode, old)` hook is **called before a vnode is diffed in a update**.`If this function is defined and returns false, Mithril prevents a diff from happening to the vnode, and consequently to the vnode's children`.

- Particularities

  - This hook by itself does not prevent a virtual DOM subtree from being generated unless the subtree is encapsulated within a component.
  - Like in other hooks, the **this** keyword in the `onbeforeupdate` callback points to `vnode.state`.

- Applications

  - This hook is useful to reduce lag in updates in cases where there is a overly large DOM tree.

## Passing Data To Component

[Go Back to Contents](#table-of-contents)

Data can be passed to component instances by passing an `attrs` object as the **second parameter** in the `hyperscript` function:

```JavaScript
  m(Example, {name: "Floyd"})
```

This data can be accessed in the component's view or lifecycle methods via the `vnode.attrs`:

```JavaScript
  let Example = {
      view: (vnode) => {
          return m("div", "Hello, " + vnode.attrs.name)
      }
  }
```

## State

[Go Back to Contents](#table-of-contents)

Like all virtual DOM nodes, component `vnodes` can have state. Component state is useful for supporting object-oriented architectures, for encapsulation and for separation of concerns.

- **IMPORTANT**
  - Note that **unlike many other frameworks, mutating component state does not trigger redraws or DOM updates**. Instead, **redraws** `are performed when event handlers fire`, when HTTP requests made by `m.request` complete or when the browser navigates to different routes.
  - Mithril's component state mechanisms simply exist as a convenience for applications.
  - If a state change occurs that is not as a result of any of the above conditions (e.g. after a setTimeout), then you can use `m.redraw()` **to trigger a redraw manually**.

## Closure Component State

[Go Back to Contents](#table-of-contents)

`Closure component`, which is simply a wrapper function which returns a `POJO` (Plain Old JavaScript Object) component instance, which in turn carries its own, closed-over scope.
With a `closure component`, state can simply be maintained by variables that are declared within the outer function:

```JavaScript
  const ComponentWithState = (initialVnode) => {
      // Component state variable, unique to each instance
      let count = 0

      // POJO component instance: any object with a
      // view function which returns a vnode
      return {
          oninit: (vnode) => {
              console.log("init a closure component")
          },
          view: (vnode) => {
              return m("div",
                  m("p", "Count: " + count),
                  m("button", {
                      onclick: () => {
                          count += 1
                      }
                  }, "Increment count")
              )
          }
      }
  }
```

Any functions declared within the closure also have access to its state variables.

```JavaScript
  const ComponentWithState = (initialVnode) => {
      let count = 0

      const increment = () => {
          count += 1
      }

      const decrement = () => {
          count -= 1
      }

      return {
          view: (vnode) => {
              return m("div",
                  m("p", "Count: " + count),
                  m("button", {
                      onclick: increment
                  }, "Increment"),
                  m("button", {
                      onclick: decrement
                  }, "Decrement")
              )
          }
      }
  }
```

Closure components are consumed in the same way as POJOs.

```JavaScript
  m(ComponentWithState, { passedData: ... })
```

A **big advantage of closure components** is that we **don't need** to worry about binding **this** when attaching event handler callbacks. In fact this is never used at all and we never have to think about this context ambiguities.

### POJO Component State

[Go Back to Contents](#table-of-contents)

It is generally recommended that you use closures for managing component state. If, however, you have reason to manage state in a POJO, the state of a component can be accessed in three ways: as a blueprint at initialization, via `vnode.state` and via the **this** keyword in component methods.

#### At Initialization

[Go Back to Contents](#table-of-contents)

For POJO components, the component object is the prototype of each component instance, so any property defined on the component object will be accessible as a property of `vnode.state`. This allows simple "blueprint" state initialization.

In the example below, data becomes a property of the `ComponentWithInitialState` component's `vnode.state` object.

```JavaScript
  const ComponentWithInitialState = {
      data: "Initial content",
      view: function(vnode) {
          return m("div", vnode.state.data)
      }
  }

  m(ComponentWithInitialState)
  // <div>Initial content</div>
```

#### Via vnode.state

[Go Back to Contents](#table-of-contents)

As you can see, state can also be accessed via the `vnode.state` property, which is available to all lifecycle methods as well as the `view` method of a component.

```JavaScript
  const ComponentWithDynamicState = {
      oninit: (vnode) => {
          vnode.state.data = vnode.attrs.text
      },
      view: (vnode) => {
          return m("div", vnode.state.data)
      }
  }

  m(ComponentWithDynamicState, {text: "Hello"})
  // <div>Hello</div>
```

#### Via The This Keyword

[Go Back to Contents](#table-of-contents)

State can also be accessed via the **this** keyword, which is available to all lifecycle methods as well as the `view` method of a component.

```JavaScript
  const ComponentUsingThis = {
      oninit: (vnode) => {
          this.data = vnode.attrs.text
      },
      view: (vnode) => {
          return m("div", this.data)
      }
  }

  m(ComponentUsingThis, {text: "Hello"})
  // <div>Hello</div>
```

## Classes

[Go Back to Contents](#table-of-contents)

`Components` can also be written using `classes`:

```JavaScript
  class ClassComponent {
      constructor(vnode) {
          this.kind = "class component"
      }
      view() {
          return m("div", `Hello from a ${this.kind}`)
      }
      oncreate() {
          console.log(`A ${this.kind} was created`)
      }
  }
```

**Class components must define** a `view()` method, detected via `.prototype.view`, **to get the tree to render**.
They can be consumed in the same way regular components can.

```JavaScript
  // EXAMPLE: via m.render
  m.render(document.body, m(ClassComponent))

  // EXAMPLE: via m.mount
  m.mount(document.body, ClassComponent)

  // EXAMPLE: via m.route
  m.route(document.body, "/", {
      "/": ClassComponent
  })

  // EXAMPLE: component composition
  class AnotherClassComponent {
      view() {
          return m("main", [
              m(ClassComponent)
          ])
      }
  }
```

### Class Component State

[Go Back to Contents](#table-of-contents)

With classes, state can be managed by class instance properties and methods, and accessed via **this**:

```JavaScript
  class ComponentWithState {
      constructor(vnode) {
          this.count = 0
      }
      increment() {
          this.count += 1
      }
      decrement() {
          this.count -= 1
      }
      view() {
          return m("div",
              m("p", "Count: " + count),
              m("button", {
                  onclick: () => {this.increment()}
              }, "Increment"),
              m("button", {
                  onclick: () => {this.decrement()}
              }, "Decrement")
          )
      }
  }
```

**Note that we must use arrow functions for the event handler callbacks so the this context can be referenced correctly.**

```JavaScript
  class Person {
      constructor(firstName, lastName) {
          this.firstName = firstName;
          this.lastName = lastName;
          this.fullName = () => `${this.firstName} ${this.lastName}`;
      }
  }

  let Component = {
      view: function () {
          console.log('--------------This Before--------------');
          console.log(JSON.stringify(this, undefined, 3));
          this.person = new Person('Roger', 'Takeshita');
          console.log('--------------This  after--------------');
          console.log(JSON.stringify(this, undefined, 3));
          const name = m('span', this.person.fullName());
          return m('h1', ['Hello ', name, '!']);
      },
  };

  const outputEl = document.getElementById('output');
  m.mount(outputEl, Component);

```
