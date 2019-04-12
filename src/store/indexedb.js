import Dexie from 'dexie';

const db = new Dexie('TodoDB');
db.version(1).stores({ todos: '++id' });

//
// Manipulate and Query Database
//

export const getTable = (tableName) => {
  return db.table(tableName).toArray()
}

export const insertIntoTable = (tableName, item) => {
  return db.table(tableName).add(item)
    .then(function(id) {
      return db.table(tableName).get(id)
    })
    .then(function (newItem) {
      return newItem
    })
    .catch(function (err) {
      alert ("Error: " + (err.stack || err))
    })
}