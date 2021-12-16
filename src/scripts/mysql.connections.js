const mysql = require('mysql');

// MySQL connections

const connections =
{
    'default': mysql.createConnection({
        'host': 'localhost',
        'user': 'test',
        'password': 'test',
        'database': 'test',
        'port': 3306,
        'dateStrings': true
    })
};

// ---------------------------

module.exports = connections;