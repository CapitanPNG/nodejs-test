const mysqlUtils = require('../src/scripts/mysql.utils.js');

const TABLE_NAME = 'anagrafica_utente';

class AnagraficaUtente
{
    constructor (connection)
    {
        this.connection = connection;
    }

    // Returns [null]
    create (kv, callback)
    {
        mysqlUtils.insert(this.connection, TABLE_NAME, kv, function (err) {console.debug(err);callback(err);});

        return null;
    }

    // Returns [null]
    readById (id, callback)
    {
        const query = ('SELECT * FROM `' + TABLE_NAME + '` WHERE `utente` = ' + id + ';');

        mysqlUtils.select(this.connection, query, function (err, rows, fields) {
            callback(err, rows, fields);
        });

        return null;
    }

    // Returns [null]
    updateById (id, valuesKV, callback)
    {
        mysqlUtils.updateById(this.connection, TABLE_NAME, {'utente': id}, valuesKV, function (err) {callback(err);});

        return null;
    }
}

module.exports = AnagraficaUtente;