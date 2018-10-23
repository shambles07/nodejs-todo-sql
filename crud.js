const sqlite3 = require('sqlite3').verbose();
const _ = require('lodash');
const yargs = require('yargs');
const argv = yargs.argv;
const taskdb = './db/tasks.db';


var createjs = () => {
	// create the database
	let db = new sqlite3.Database(taskdb);

	// create the initial tasks table

	db.run(('CREATE TABLE IF NOT EXISTS tasks(taskID INTEGER PRIMARY KEY AUTOINCREMENT, task text, date text)'), (err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Created tasks table.');
	});

	// close the database connection

	db.close((err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Closed the database connection.');
	});
}

var alljs = () => {

	// open a database connection
	let db = new sqlite3.Database(taskdb);
	// run select all on table tasks
	let sql = `SELECT \* FROM tasks`;
	// db function
	db.all(sql, [], (err, row) => {
	  if (err) {
	    throw err;
	  }
	  console.log(JSON.stringify(row));
	});

	db.close();
}

var deletejs = () => {
	var id = argv.id;

	if (id == undefined) {
		console.log('Must input ID!');
	} else {
		// open a database connection
		let db = new sqlite3.Database(taskdb, (err) => {
			if (err) {
				console.error(err.message);
			}
		});

		let sql = `SELECT \* FROM tasks WHERE taskid=` + id;

		db.all(sql, [], (err, row) => {
		  if (err) {
	    	throw err;
	  	}
	  	console.log('Current table: ' + JSON.stringify(row));
		});

		db.run(`DELETE FROM tasks WHERE taskid=?`, id, function (err) {
			if (err) {
				return console.error(err.message);
			}
			console.log(`Row(s) deleted ${this.changes}`);
		});

		db.close();
	}
}

var insertjs = () => {

	// get input from stdin
	var taskinput = argv.task;

	// open the database
	var taskdb = './db/tasks.db';
	let db = new sqlite3.Database(taskdb);
	let sql = 'INSERT INTO tasks(task, date) VALUES ((?), datetime("now", "localtime"))';

	// insert one row into the tasks table
	db.run(sql, [taskinput], function(err) {
		if (err) {
			return console.log(err.message);
		}
		// get the last insert id
		console.log(`Row inserted: rowid = ${this.lastID}`);
	});

	// display current table

	let sqlall = 'SELECT \* FROM tasks';
	db.all(sqlall, [], (err, row) => {
	  if (err) {
	    throw err;
	  }
	  console.log(JSON.stringify(row));
	});

	db.close();
}

var selectjs = () => {
	// get input from stdin
	var id = argv.id;

	// open the database

	var taskdb = './db/tasks.db';

	let db = new sqlite3.Database(taskdb);
	let sql = 'SELECT \* FROM tasks WHERE taskid=' + id;


	// insert one row into the tasks table
	db.all(sql, [], (err, row) => {
		if (err) {
			throw err;
		}
		console.log(row);
		});

	db.close();
}

module.exports = {
	createjs,
	alljs,
	deletejs,
	insertjs,
	selectjs
};
