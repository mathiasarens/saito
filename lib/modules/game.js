var saito = require('../../../saito');
var ModTemplate = require('../../template');
var util = require('util');

/*

 GAME MODULE
 
 This is a general parent class for modules that wish to implement Game logic. It 
 introduces underlying methods for saving GAME STATE to the options file, as well
 as handling email invitations (to games) and for the random number routines that
 are needed for rolling dice, etc.

 Developers please note that every interaction with a random dice requires an
 exchange between machines, so games that do not have more than one random dice
 roll per move are easier to implement on a blockchain than those which require
 multiple random moves.

*/


//////////////////
// CONSTRUCTOR  //
//////////////////
function Game(app) {

  if (!(this instanceof Game)) { return new Game(app); }

  Game.super_.call(this);

  this.app             = app;

  this.name            = "Game";
  this.browser_active  = 0;
  this.emailAppName    = "Game";

  this.gameboardWidth  = 5100;
  this.screenRatio     = 1;

  this.game            = {};

  return this;

}
module.exports = Game;
util.inherits(Game, ModTemplate);




///////////
// Email //
///////////
Game.prototype.displayEmailForm = function displayEmailForm(app) {
  element_to_edit = $('#module_editable_space');
  element_to_edit_html = '<div id="module_instructions" class="module_instructions">Invite the recipient to play a game of '+this.emailAppName+'.</div>';
  element_to_edit.html(element_to_edit_html);
}
Game.prototype.formatEmailTransaction = function formatEmailTransaction(tx, app) {
  tx.transaction.msg.module  = this.name;
  tx.transaction.msg.request = "invite";
  tx.transaction.msg.random  = app.wallet.returnPublicKey();
  return tx;
};
Game.prototype.onConfirmation = function onConfirmation(blk, tx, conf, app) {

  let txmsg = tx.returnMessage();

  let game_self  = app.modules.returnModule(txmsg.module);
  let email_self = app.modules.returnModule("Email");

  let remote_address = tx.transaction.from[0].add;;
  let game_id = tx.transaction.from[0].add + tx.transaction.ts + tx.transaction.to[0].add;

  if (conf == 0) {

    if (txmsg.request == "invite") {

      newtx = app.wallet.createUnsignedTransaction(remote_address, 0.0, 0.0);
      if (newtx == null) { return; }
      newtx.transaction.msg.module   = "Email";
      newtx.transaction.msg.title    = game_self.emailAppName + " Invitation";
      newtx.transaction.msg.data     = 'You have been invited to a game of '+game_self.emailAppName+'. <div style="display:inline;text-decoration:underline;cursor:pointer" class="accept_invite" id="'+game_id+'">click here to accept</div>.';
      newtx.transaction.msg.markdown = 0;
      newtx = app.wallet.signTransaction(newtx);

      game_self.app.archives.saveTransaction(newtx);
      email_self.addMessageToInbox(newtx, app);

    }

    if (txmsg.request == "accept") {

      newtx = app.wallet.createUnsignedTransaction(remote_address, 0.0, 0.0);
      if (newtx == null) { return; }
      newtx.transaction.msg.module   = "Email";
      newtx.transaction.msg.title    = game_self.emailAppName + "Accepted";
      newtx.transaction.msg.data     = 'You have accepted a match of Game Struggle.';
      newtx.transaction.msg.markdown = 0;
      newtx = app.wallet.signTransaction(newtx);

      game_self.app.archives.saveTransaction(newtx);
      email_self.addMessageToInbox(newtx, app);

    }
  }
}
Game.prototype.attachEmailEvents = function attachEmailEvents(app) {

  var game_self = this;

  if (app.BROWSER == 1) {

    $('.accept_invite').off();
    $('.accept_invite').on('click', function() {

      let game_id = $(this).attr('id');
      let remote_address  = $('.lightbox_message_from_address').text();

      newtx = app.wallet.createUnsignedTransaction(remote_address, 0.0, 0.0);
      if (newtx == null) { return; }
      newtx.transaction.msg.module   = "Game";
      newtx.transaction.msg.title    = game_self.emailAppName + " Accepted";
      newtx.transaction.msg.data     = 'You have accepted a match of " + game_self.emailAppName;

      game_self.saveGame(game_id);

      newtx.transaction.msg.game_id  = game_id;
      newtx.transaction.msg.markdown = 0;
      newtx = app.wallet.signTransaction(newtx);

      game_self.app.archives.saveTransaction(newtx);
      email_self.addMessageToInbox(newtx, app);
      email_self.showBrowserAlert("You have accepted the game invitation");
      email_self.closeMessage();

    });
  }

}








////////////////
// initialize //
////////////////
Game.prototype.initialize = function initialize(app) {

  if (app.BROWSER == 0) { return; }

  let gameheight = $('.gameboard').height();
  let gamewidth  = $('.gameboard').width();

  this.screenRatio = gamewidth / this.gameboardWidth;

}
Game.prototype.scale = function scale(x) {
  let y = Math.floor(this.screenRatio * x);
  return y+'px';
}







Game.prototype.loadGame = function loadGame(game_id = null) {

  if (game_id == null) { return null; }

  if (this.app.options.games == undefined) { this.app.options.games = []; }

  if (game_id != null) {
    for (let i = 0; i < this.app.options.games.length; i++) {
      if (this.app.options.games[i].id == game_id) {
        this.game = this.app.options.games[i];
        return this.game;
      }
    }
  }

  this.game = this.newGame(game_id);
  return this.game;

}


Game.prototype.newGame = function newGame(game_id) {

  let game = {};
      game.id       = game_id;
      game.random   = 0.5131312341313124214;

  return game;

}


Game.prototype.saveGame = function saveGame(game_id = null) {

  if (this.app.options.games == undefined) { this.app.options.games = []; }

  if (game_id != null) {
    for (let i = 0; i < this.app.options.games.length; i++) {
      if (this.app.options.games[i].id == game_id) {
        this.app.options.games[i] = this.game;
        this.app.storage.saveOptions();
        return;
      }
    }
  }


  this.app.options.games.push(this.newGame(game_id));
  this.app.storage.saveOptions();
  return;

}



