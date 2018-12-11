# Create Your First Module

So now that you have Saito installed and you can connect to the network, it's time to start building on top of it. We'll show you the basics of getting an app up on Saito. As an example, we'll create a basic TODO app (decentralized of course).

## Module App Structure

Before we can start coding, we need to get our module structure in order. Modules are located in the `lib/modules` directory in our Saito codebase.

```
.
└── lib
    └── modules
        └── mods
            └── todo
                └── web
                    ├── index.html
                    ├── style.css
                todo.js
        ├── game.js
        ├── mods.js
        ├── template.js

```

Notice that we have the files `game.js`, `mods.js`, and `template.js`. Both `game.js` and `template.js` act as templates that we can implement in our own modules. `mods.js` is the way that our node is able to interface the functionality of the Saito network with the modules that exist in our `modules` directory. 

We've created a new directory in our modules directory called `todo` with a `web` directory that has our `index.html` and `style.css` file that we'll serve using `todo.js`. Next, let's add some structure to our `todo.js` file.


## Coding our Module

First thing to do is to make the constructor for our TODO module

```javascript
const util = require('util');
const ModTemplate = require('../../template');

function Todo(app) {

  if (!(this instanceof Todo)) { return new Todo(app); }

  Todo.super_.call(this);

  this.app             = app;

  this.name            = "Todo";
  this.browser_active  = 0;
  this.handlesEmail    = 1;
  this.emailAppName    = "Todo";

  return this;
}

module.exports = Todo;
util.inherits(Todo, ModTemplate);
```

Our module is inhereting our `template` so that it has all of the necessary functions. We will be overwriting the ones we want to use in order to add the business logic of our module.

The constructor is a place to setup any local app state that will be necessary for our application. Lets add a field to save our TODOS to the state of our module.

```javascript
// todo.js

const util = require('util');
const ModTemplate = require('../../template');

function Todo(app) {

  if (!(this instanceof Todo)) { return new Todo(app); }

  Todo.super_.call(this);

  this.app             = app;

  this.tasks           = [];

  this.name            = "Todo";
  this.browser_active  = 0;
  this.handlesEmail    = 1;
  this.emailAppName    = "Todo";

  return this;
}

module.exports = Todo;
util.inherits(Todo, ModTemplate);
```

Next, we want to think about how our module will work and transact with the Saito chain. Let's say that it will cost someone their default fee to both create a task and to toggle its status of completion. So, we'll want to create that logic first in our `onConfirmation` function first.

```javascript
// todo.js

Todo.prototype.onConfirmation = function onConfirmation(blk, tx, conf, app) {
  if (conf == 0) {
    switch (tx.transaction.msg.type) {
      case "task":
        this.addTask(tx);
      case "checkmark":
        this.toggleCheckmark(tx);
      default:
        break;
    }
  }
}
```

We'll hold off on fleshing out the render logic to these functions until we've built out our html and css.


Next thing that we'll want to do is allow the user to create transactions for both tasks and checkmarks and then propagate them into the network. We can write out our logic for that in a custom function called `createTodoTx`.

```javascript
// todo.js

Todo.prototype.createTodoTX = function createTodoTx(data) {
  var newtx = this.app.wallet.createUnsignedTransactionWithDefaultFee(this.app.wallet.retunrPublicKey());

  newtx.transaction.msg = Object.assign({}, data, { module: "Todo" });

  var newtx = this.app.wallet.signTransaction(newtx);

  this.app.network.propagateWithCallback(newtx, () => {
    if (this.app.BROWSER) {
      alert("your message was propagated")
    }
  });

  return newtx;
}
```

Cool, this allows us to generically create TX for both our tasks and our checkmarks. Now that we have some of our chain logic coded, we can start to connect this to the view logic of our module.

```html
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <script type="text/javascript" src="/lib/jquery/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="/lib/jquery/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="/lib/jquery/jquery-ui.min.css" type="text/css" media="screen" />

    <link rel="stylesheet" type="text/css" href="/todo/style.css" />
    <link rel="icon" media="all" type="image/x-icon" href="/favicon.ico?v=2"/>

    <title>Saito R</title>
  </head>
  <body>
    <div id="Registry_browser_active"></div>
      <div class="container">
        <div class="header">
          <a href="/">
            <img src="/img/saito_logo_black.png" class="logo" />
          </a>
          <a href="/" style="text-decoration:none;color:inherits">
            <div class="module_label">saito todo</div>
          </a>
        </div>
        <div class="module_container">
          <div class="headerSpace">
            <h1>Saito Todo Module</h1>
          </div>
          <div class="addTaskSpace">
            <button class="addTaskButton">Add Task</button>
            <input type="text" class="submit_task" id="submit_task" name="submit_task" />
          </div>
          <div class="todoListSpace">
            <div class="todoList">
              New task
            </div>
          </div>
        </div>
      </div>
    <script src="/socket.io/socket.io.js"></script>
  </body>
</html>
```

```css
body {
    font-family: arial, helvetica, sans-serif;
    font-size: 13px;
    padding:0px;
    margin:0px;
}

h1 {
    margin: 0em;
}

.container {
    display: grid;
    grid-template-rows: 3.1rem auto;
    grid-template-areas:
    "header"
    "content"
}

.header {
    grid-area: header;
    border-bottom: 1px solid #a5a5a5;
    font-size:2em;
}

.logo {
    width: 35px;
    margin-top: 10px;
    margin-left: 1.3em;
    margin-right: 0.35em;
    float: left;
}

.module_container {
    grid-area: content;
    display: grid;
    grid-template-rows: 3.2rem;
    grid-template-columns: 1fr;
    padding: 3em;
    grid-template-areas:
    "headerSpace headerSpace addTaskSpace"
    "todoListSpace todoListSpace todoListSpace"
    "todoListSpace todoListSpace todoListSpace"
}

.module_label {
    font-family:Georgia;
    padding-top:5px;
    font-size:1.2em;
    color:#444;
}

.headerSpace {
    grid-area: headerSpace
}

.addTaskSpace {
    grid-area: addTaskSpace
}

.todoListSpace {
    grid-area: todoListSpace
}
```

```javascript
// todo.js

// ...

Todo.prototype.webServer = function webServer(app, expressapp) {
  expressapp.get('/todo/', (req, res) => {
    res.sendFile(__dirname + '/web/index.html');
    return;
  });
  expressapp.get('/todo/style.css', (req, res) => {
    res.sendFile(__dirname + '/web/style.css');
    return;
  });
}
```

```javascript
// mods.js

// ...

this.mods.push(require('./mods/reddit/reddit')(this.app));
this.mods.push(require('./mods/remix/remix')(this.app));
this.mods.push(require('./mods/money/money')(this.app));
this.mods.push(require('./mods/debug/debug')(this.app));

this.mods.push(require('./mods/todo/todo')(this.app));
```

Ok, now we're starting to see it take form! If you don't have your Saito instance started at this point, start it and take a look at [`http://localhost:12101/todo`](http://localhost:12101/todo) to check it out and see what it looks like.

It's starting to form, but it still doesn't do anything for us. Lets create a form to add tasks to our list, and add them to the Saito network.

