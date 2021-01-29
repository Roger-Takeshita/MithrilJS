<h1 id='table-of-contents'>TABLE OF CONTENTS</h1>

- [NODE WITH MITHRIL](#node-with-mithril)
  - [Folder and Files](#folder-and-files)
  - [Packages](#packages)
    - [Config Webpack](#config-webpack)
      - [webpack.config.js](#webpackconfigjs)
      - [package.json](#packagejson)
  - [User App](#user-app)
    - [Index.html](#indexhtml)
    - [Index.js](#indexjs)
    - [Layout.js](#layoutjs)
    - [UserList.js](#userlistjs)
    - [UserForm.js](#userformjs)
    - [Users.js](#usersjs)

# NODE WITH MITHRIL

Node.js + Webpack + Mithril.js

## Folder and Files

[Go Back to Contents](#contents)

```Bash
  @touch -n src/models/user.js src/views/UserList.js + UserForm.js + Layout.js src/index.js webapack.config.js
```

- Final folder structure

```Bash
  .
  ├─ src
  │   ├── models
  │   │   └── User.js
  │   ├── views
  │   │   ├── Layout.js
  │   │   ├── UserForm.js
  │   │   └── UserList.js
  │   └── index.js
  ├── index.html
  ├── webpack.config.js
  ├── package-lock.json
  ├── package.json
  └── styles.css
```

## Packages

[Go Back to Contents](#contents)

Install the following packages

```Bash
  npm i mithril webpack
  npx webpack --config webpack.config.js
```

### Config Webpack

#### webpack.config.js

[Go Back to Contents](#contents)

In `webpack.config.js`

We are going to config the `entry` file and the `output` file (build)

```JavaScript
  const path = require('path');

  module.exports = {
      mode: 'development',
      entry: './src/index.js',
      output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'app.js',
      },
  };
```

#### package.json

[Go Back to Contents](#contents)

In our `package.json` we need to update our scripts to handle to watch the webpack

```JSON
  "scripts": {
      "build": "webpack",
      "watch": "webpack --watch"
  },
```

## User App

### Index.html

[Go Back to Contents](#contents)

In `Index.html`

```HTML
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script defer type="text/javascript" src="dist/app.js"></script>
      <link rel="stylesheet" href="styles.css">
      <title>Document</title>
  </head>

  <body>

  </body>

  </html>
```

### Index.js

[Go Back to Contents](#contents)

- Entry point of our (In this case `/list`)

  ```JavaScript
    const m = require('mithril');
    const UserList = require('./views/UserList');
    const UserForm = require('./views/UserForm');
    const Layout = require('./views/Layout');

    m.route(document.body, '/list', {
        '/list': {
            render: () => {
                return m(Layout, m(UserList));
            },
        },
        '/edit/:id': {
            render: (vnode) => {
                return m(Layout, m(UserForm, vnode.attrs));
            },
        },
    });
  ```

  - Note that we are using `vnode.attrs` to send the `:id` to our child component.
  - In our child component we can get the this value using `vnode.children`

### Layout.js

[Go Back to Contents](#contents)

We add the navbar to all `vnode.children`

In `src/views/Layout.js`

Notice there's also a <section> element with `vnode.children` as `children.vnode`is a reference to the vnode that represents an instance of the Layout component(i.e.the vnode returned by a `m(Layout)` call).
Therefore, `vnode.children` refer to any children of that vnode.

```JavaScript
  const m = require('mithril');

  module.exports = {
      view: (vnode) => {
          return m('main.layout', [
              m('nav.menu', [
                  m(
                      m.route.Link,
                      {
                          href: '/list',
                      },
                      'Users'
                  ),
              ]),
              m('section', vnode.children),
          ]);
      },
  };
```

### UserList.js

[Go Back to Contents](#contents)

In `src/views/UserList.js`

- Notice that we added an **oninit** method to the component, which references `User.loadList`.**This means that when the component initializes, User.loadList will be called**, triggering an XHR request.When the server returns a response, `User.list` gets populated.
- Also notice we didn't do **oninit**: `User.loadList()` (with parentheses at the end).

  - The difference is that:
    - `oninit: User.loadList()` calls the function once and immediately, but
    - `oninit: User.loadList` only calls that function when the component renders.

- `m.route.Link` with that `class` and the same children. We added an `href` that references the route we want.What this means is that clicking the link would change the part of URL that comes after the **hashbang** **#!**(thus changing the route without unloading the current HTML page).Behind the scenes, it uses an < a > to implement the link, and it all just works.

```JavaScript
  const m = require('mithril');
  const User = require('../models/User');

  module.exports = {
      oninit: User.loadList,
      view: () => {
          return m(
              '.user-list',
              User.list.map((user) => {
                  return m(
                      m.route.Link,
                      {
                          class: '.user-list-item',
                          href: `/edit/${user.id}`,
                      },
                      `${user.firstName} ${user.lastName}`
                  );
              })
          );
      },
  };
```

### UserForm.js

[Go Back to Contents](#contents)

In `src/views/UserForm.js`

We have a form, we can break the form into 3 partes

1. type (`form`)
2. method (`onsubmit`)
3. form structure

   ```JavaScript
     m('form',
       { onsubmit: async (e) => {e.preventDefault()}},
       [ form_structure_here ]
     );
   ```

```JavaScript
  const m = require('mithril');
  const User = require('../models/User');

  module.exports = {
      oninit: async (vnode) => {
          await User.load(vnode.attrs.id);
      },
      view: () => {
          return m(
              'form',
              {
                  onsubmit: async (e) => {
                      e.preventDefault();
                      const user = await User.save();
                      console.log(
                          `User has been updated!\nUser id: ${user.id}\nFirst Name: ${user.firstName}\nLast Name: ${user.lastName}`
                      );
                  },
              },
              [
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
                  m('button.button[type=submit]', 'Save'),
              ]
          );
      },
  };
```

### Users.js

[Go Back to Contents](#contents)

In `src/models/User.js`

We have all our API calls (async calls)

```JavaScript
  const m = require('mithril');

  let User = {
      list: [],
      loadList: async () => {
          try {
              const response = await m.request({
                  method: 'GET',
                  url: 'https://rem-rest-api.herokuapp.com/api/users',
                  withCredentials: true,
              });
              User.list = response.data;
              return User.list;
          } catch (error) {
              console.log(error);
          }
      },
      current: {},
      load: async (id) => {
          try {
              const response = await m.request({
                  method: 'GET',
                  url: `https://rem-rest-api.herokuapp.com/api/users/${id}`,
                  withCredentials: true,
              });
              User.current = response;
          } catch (error) {
              console.log(error);
          }
      },
      save: async () => {
          try {
              const response = await m.request({
                  method: 'PUT',
                  url: `https://rem-rest-api.herokuapp.com/api/users/${User.current.id}`,
                  body: User.current,
                  withCredentials: true,
              });
              const idx = User.list.findIndex((user) => user.id === response.id);
              User.list[idx] = response;
              return response;
          } catch (error) {
              console.log(error);
          }
      },
  };

  module.exports = User;
```
