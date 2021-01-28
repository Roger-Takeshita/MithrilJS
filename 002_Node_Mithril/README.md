<h1 id='table-of-contents'>TABLE OF CONTENTS</h1>

- [NODE MITHRIL](#node-mithril)
  - [Folder and Files](#folder-and-files)
  - [Packages](#packages)

# NODE MITHRIL

## Folder and Files

[Go Back to Contents](#contents)

```Bash
  @touch -n src/models/user.js src/views/UserList.js + UserForm.js + Layout.js src/index.js
```

- Final folder structure

```Bash
  .
  ├─                      src
  │   ├── models
  │   │   └── User.js
  │   ├── views
  │   │   ├── Layout.js
  │   │   ├── UserForm.js
  │   │   └── UserList.js
  │   └── index.js
  ├── index.html
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
