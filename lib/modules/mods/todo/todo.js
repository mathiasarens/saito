const util = require('util');
const ModTemplate = require('../../template');


//////////////////
// CONSTRUCTOR  //
//////////////////
function Todo(app) {

  if (!(this instanceof Todo)) { return new Todo(app); }

  Todo.super_.call(this);

  this.app             = app;

  this.tasks           = [];

  this.name            = "Todo";
  this.browser_active  = 1;
  this.handlesEmail    = 1;
  this.emailAppName    = "Todo";

  return this;

}
module.exports = Todo;
util.inherits(Todo, ModTemplate);

// Todo.prototype.initialize = function initialize() {
//   if (this.app.BROWSER) { this.attachEvents(); }
// }

Todo.prototype.onConfirmation = function onConfirmation(blk, tx, conf, app) {
  if (conf == 0) {
    switch (tx.transaction.msg.type) {
      case "task":
        this.addTask(tx);
      case "checkmark":
        this.addCheckmark(tx);
      default:
        break;
    }
  }
}

Todo.prototype.createTodoTX = function createTask(data) {
  var newtx = this.app.wallet.createUnsignedTransactionWithDefaultFee(this.app.wallet.retunrPublicKey());

  newtx.transaction.msg = Object.assign({}, data, { module: "Todo" });

  var newtx = this.app.wallet.signTransaction(newtx);

  this.app.network.propagateWithCallback(newtx, () => {
    if (this.app.BROWSER) {
      alert("your message was propagated")
    }
  })

  return tx;
}

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

Todo.prototype.attachEvents = function attachEvents(app) {
  $('#add_task_button').off();
  $('#add_task_button').on('click', function() {
    alert("You've clicked the button");
  });
}