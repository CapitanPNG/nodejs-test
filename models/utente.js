const mysqlUtils = require('../src/scripts/mysql.utils.js');

const TABLE_NAME = 'utente';

class Utente
{
    constructor (connection)
    {
        this.connection = connection;
    }

    // Returns [null]
    create (kv, callback)
    {
        mysqlUtils.insert(this.connection, TABLE_NAME, kv, function (err) {callback(err);});

        return null;
    }

    // Returns [null]
    readById (id, callback)
    {
        const query = ('SELECT * FROM `' + TABLE_NAME + '` WHERE `id` = ' + id + ';');

        mysqlUtils.select(this.connection, query, function (err, rows, fields) {
            callback(err, rows, fields);
        });

        return null;
    }

    // Returns [null]
    readByKey (k, v, callback)
    {
        const query =
        (
            'SELECT * FROM `' + TABLE_NAME + '` WHERE BINARY `' + k + '` = '
            +
            mysqlUtils.normalizeValue(this.connection, v)
            +
            ';'
        );
        
        mysqlUtils.select(this.connection, query, function (err, rows, fields) {callback(err, rows, fields);});

        return null;
    }

    // Returns [null]
    updateById (id, valuesKV, callback)
    {
        mysqlUtils.updateById(this.connection, TABLE_NAME, {id}, valuesKV, function (err) {callback(err);});

        return null;
    }

    // Returns [null]
    deleteById (id, callback)
    {
        mysqlUtils.deleteById(this.connection, TABLE_NAME, {id}, function (err) {callback(err);});

        return null;
    }

    // Returns [null]
    getAllBaseUsers (callback)
    {
        const query = ('SELECT * FROM `' + TABLE_NAME + '` WHERE `is_admin` IS FALSE;');

        mysqlUtils.select(this.connection, query, function (err, rows, fields) {
            callback(err, rows, fields);
        });
    }
}

module.exports = Utente;