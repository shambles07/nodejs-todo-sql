const sqlite3 = require('sqlite3').verbose();

// open the database in memory
let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
	db.each(`SELECT PlaylistId as id, Name as name FROM playlists`, (err, row) => {
		if (err) {
			console.error(err.message);
		}
		console.log(row.id + "\t" + row.name);
	});
});

// close the database connection
db.close((err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Close the database connection.');
});
