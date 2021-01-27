<h1 id='contents'>TABLE OF CONTENTS</h1>

- [MITHRILJS](#mithriljs)
  - [Installation](#installation)
  - [Render](#render)
  - [Mount a New Element](#mount-a-new-element)
    - [Element By Id](#element-by-id)

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
      </body>

      </html>
    ```

## Render

[Go Back to Contents](#contents)

- To render a new thing into the **DOM**, we first need to target the element then we add the code

  ```JavaScript
    m.render(document.body, "Hello World")
  ```

## Mount a New Element

[Go Back to Contents](#contents)

- We can mount a new element/component into the DOM using `m.mount()`

  ```JavaScript
    const body = document.body;
    const helloComponent = {
        view: () => {
            return m('h1', 'Hello World hello method');
        },
    };

    m.mount(body, helloComponent);
  ```

  - A **component** is a `JavaScript Object` with the `view` **method/property**
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
  const body = document.body;
  const helloComponent = {
      view: () => {
          return m('h1', 'Hello World hello method');
      },
  };

  m.mount(document.getElementById('content'), helloComponent);
```
