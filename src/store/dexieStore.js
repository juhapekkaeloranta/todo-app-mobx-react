import Dexie from 'dexie';
import 'dexie-observable';

export default class dexieStore {
  constructor() {
    console.log('dexieStore.constructor')
    this.db = new Dexie('TodoDB-observable');
    this.init()
    this.updateCallback = () => console.log('no update callback defined')
    this.createCallback = () => console.log('no create callback defined')
    this.deleteCallback = () => console.log('no delete callback defined')
  }

  setUpdateCallback(func) {
    this.createCallback = func
  }

  setCreateCallback(func) {
    this.updateCallback = func
  }

  setDeleteCallback(func) {
    this.deleteCallback = func
  }

  init() {
    const self = this
    console.log('dexie.init')
    this.db.version(1).stores({ todos: '++id' });
    this.db.on('changes', function (changes) {
      changes.forEach(function (change) {
        
        switch (change.type) {
          case 1: // CREATED
            console.log('An object was created: ' + JSON.stringify(change.obj));
            self.createCallback()
            break;
          case 2: // UPDATED
            console.log('An object with key ' + change.key + ' was updated with modifications: ' + JSON.stringify(change.mods));
            self.updateCallback()
            break;
          case 3: // DELETED
            console.log('An object was deleted: ' + JSON.stringify(change.oldObj));
            self.deleteCallback()
            break;
        }
      });
    });  
  }

  getTable = (tableName) => {
    console.log('dexieStore.getTable')
    return this.db.table(tableName).toArray()
  }

  insertIntoTable = (tableName, item) => {
    const idb = this.db
    return idb.table(tableName).add(item)
      .then(function(id) {
        return idb.table(tableName).get(id)
      })
      .then(function (newItem) {
        return newItem
      })
      .catch(function (err) {
        alert ("Error: " + (err.stack || err))
      })
  }

}