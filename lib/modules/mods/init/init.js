//
// This module monitors the blockchain and our
// unspent transaction inputs. It creates fake
// transactions to speed up block production 
// for testing purposes.`
//
var saito = require('../../../saito');
var ModTemplate = require('../../template');
var util = require('util');
var crypto = require('crypto');
const Big      = require('big.js');
const fs = require('fs');



//////////////////
// CONSTRUCTOR  //
//////////////////
function Init(app) {

  if (!(this instanceof Init)) { return new Init(app); }

  Init.super_.call(this);

  this.app             = app;
  this.name            = "Init";

  this.max_block       = 4;
  this.payout_block    = 0;

  return this;

}
module.exports = Init;
util.inherits(Init, ModTemplate);




Init.prototype.onNewBlock = function onNewBlock(blk) {


  if (this.app.BROWSER == 1) { return; }

  if (blk.block.id == 1) {

    //
    // insert pre-signed
    //
    let tx = [];

    tx[0] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"21SLK7Qn79qfdfGbGYN3n3RaFqU9N949yxPpGxoXWX6sD","amt":"247500000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"8w9Ny8SXzYjXP2PudWGCYjN9Sz8ozG5HeDJzj58gbjX9HoMZ3qEn8VtyhcNqPLZJGt1hEeq4SpYpJW9KG5sRKDQ","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[1] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"cN7fyrDR4kRNz6AueS26LKjS8N8n8LDHp9WKghAYmm5B","amt":"76500000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"5CbagAx1265P8kGgnQBL735akKL5ShMpshn6MfmHYHf93WXZS8Gh8FUmA7Qm4vFAeAeyrwDv762Fww3uBeagMKMv","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[2] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"xtrEWbTqgy8AuUe44z6wPSp8xd9nMZ6GUqatpjJYPWe1","amt":"50400000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"24jnZPFSr5K2TZ5SDDZF6U366nVQwtBgK8wgR41bjS85JnhsCWdCDujibJytz5tRie1mvLMKHex6ffP41FEoD7uD","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[3] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"26ahwQ4axtxujGP5D4PhEdrMD9ectnERzmqp6jrWaChrJ","amt":"9000000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"4pufGrnTWXQnPjBVi8rZa4j7814sGKd4ApeNtQV5xaUpqVzCzfREabjJGkg9P63jkRkWnfgGpodQFDy8pVCjAMhp","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[4] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"vmCz9ngz6gSkeZx2SSp32VpGbRpE2jsDDYaZ8zk4smqa","amt":"9000000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"3KffQeSUWoW6JMijtAn7S8eUPGVgSsV2gW1eeBrTx6dxyv9rcXAcTeJauyAW7cYbG5KoNafQkyg4UNZ1m2Ej7s4m","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[5] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"kEcoVPyUj9zLKRUv1GsJmusuBdyZ6SgfWF5TKX44tx6L","amt":"24750000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"3cMXmTcuK7am5zQbD3wrVSvxgCntRG7cXHniraNXUgoMQc9WvFEuNj8zWhB9CUj2cbu6ec6yYNApDKfzkTfevLez","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[6] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"fnXYYs1B91RRsg1dUKS1w7otUcytC5XC9wxkNhuJxMnu","amt":"24750000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"2URwtHRm5QBifHTKcqK1Fuscc9guBvcfjV1kxApcsQ9tvU4evK2eN1uh4QfDAgHiDdg993femrK35koYxtb3bAPg","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[7] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"xLRrc6uFb795EoJ9xuN66oKp5zn7gvNA9CL9X3cpjRXB","amt":"9000000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"2Am6HnvcvqzBZPTTMMeT6stfkjRK7HiRCqRrcJFkpHu1KgnFgygKYTXLYP36eCy6KBUSFmnd2mHSatAReGx7yqPC","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[8] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"fuHjw4d6pEpDbgzeFBw8KM5JDJGQ8nuN3GhpMeikRdbz","amt":"45000000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"474ftmtrohJENVuZc4WLXpGaXVcjqHGtQNQxPoEZ8pEibLvydWHQkaptmaMwG5bStN7o6UGZkGLFqar2ZRaioTyT","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[9] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"29kNnEriRpRoe3a5Lk9v9vzpxAVAZkAdomuHo8AKTn3TG","amt":"36000000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"3cxeBnCV3LLuyDf8knowyEB6S3uyWj4CbqQUP27dJpWiMfNiAEa2MezhtoGTpNH6Cqx45ujyytShngEK2o6VVNDW","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[10] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"iT3ZsRu4nkdJsy5ELmZJf3ZBRSeytHbq162eRfk1coi1","amt":"350000000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"QnMV9uK2M198xFxDRyd4UDe45ooM32NxqDQiZGaNWZEoccfV3bKkDxWzav1rgvPmNCrV6mXiMsYmAwFxGfiTMUZ","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[11] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"23K51b1grzEY55JqPR1SS7uo4pJxodMNqrx5KC49dqMcs","amt":"300000000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"4R2YBF2xvsSEggoqTQUXMqxe2X45hgZ9teh8YHXy4rjGWuXBgR6WVFdQwRZgikWphR8LSUYGC5uv1bMGrXKV46A5","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[12] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"dRPCYehXaxja4nDYMzLR1avCdRBx2MsZtERAwPNks1vd","amt":"100000000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"4ca8muQtWTq8pyWWzyTBWMK9FeUrerydUupZCXpdYNZPB937NkWn4xXEJxJXD63rfAXSp1yA8uNbpxw1SUfo47cp","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[13] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"22o5syDcshi3Wh4rGqBoXkXcQKeArp2BEXL8yefX5UMCH","amt":"750000000","type":4,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"4v5BSbycmVi1N2j8yctWUNtfVSumwG2PCViFQNmsfQpchLcw4BbAJSykZ7SAZsKwErtivhEj4n7jj8kxNMrLfzTJ","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":4,"msg":{},"ps":0}}');

    tx[14] = new saito.transaction('{"transaction":{"id":1,"from":[{"add":"","amt":"0","type":0,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"to":[{"add":"0","amt":"5100000000","type":5,"bid":0,"tid":0,"sid":0,"bhash":"","lc":1}],"ts":0,"sig":"3XP1xWkBQZNdFGDUinoc37TBLZYaNuruAc88dk8Ai8TefBDdEQjGNN4Q6usETNbSrC84i2cvwthBCy5iAD69wWgW","mhash":"4a87bb9d804304a98ce20586bc5cb8ceb0c6f2235653d4259acef8e311fb184c","ver":1,"path":[],"type":5,"msg":{},"ps":0}}');


    //
    // add pre-gen transactions
    //
    for (let i = 0; i < tx.length; i++) {
      this.app.mempool.transactions.push(tx[i]);
    }

  }

  return;

}




