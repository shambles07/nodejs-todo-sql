const sqlite3 = require('sqlite3').verbose();

// open a database connection

var taskdb = 'tasks.db';
let db = new sqlite3.Database(taskdb);
let db = new sqlite3.Database('./db/tasks.db');
let sql = `SELECT \* FROM tasks`;

db.all(sql, [], (err, row) => {
  if (err) {
    throw err;
  }
  console.log(JSON.stringify(row));
});

db.close();
