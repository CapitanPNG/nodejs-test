// Returns [Error]
function MySQLException (message)
{
    return new Error(message);
}

// Returns [string]
function normalizeKey (key)
{
    return ('`' + key + '`');
}

// Returns [string] | Throws [MySQLException]
function normalizeValue (connection, value)
{
    if (value === null)
    {
        value = 'NULL';
    }
    else
    if (typeof value === 'boolean')
    {
        switch (value)
        {
            case false:
                value = 'FALSE';
            break;
            case true:
                value = 'TRUE';
            break;
        }
    }
    else
    if (typeof value === 'string')
    {
        value = connection.escape(value);
    }
    else
    if (typeof value === 'number')
    {
        value = value.toString();
    }
    else
    {
        throw new MySQLException('Unsupported value type');
    }

    return value;
}

// Returns [null]
function insert (connection, tableName, kv, callback)
{
    let k = Object.keys(kv);
    k.forEach(function(el, i){k[i] = normalizeKey(el);});

    let v = Object.values(kv);
    v.forEach(function(el, i){v[i] = normalizeValue(connection, el);});

    const query = ('INSERT INTO `' + tableName + '` (' + k + ') VALUES (' + v + ');');

    connection.query(query, function (err, rows, fields) {callback(err);});

    return null;
}

// Returns [Array<object>]
function getRows (rows)
{
    let r = [];

    for (let i in rows)
    {
        let el = {};

        let rdp = rows[i];

        for (let key in rdp)
        {
            el[key] = rdp[key];
        }

        r.push(el);
    }

    return r;
}

// Returns [null]
function select (connection, query, callback)
{
    connection.query(query, function (err, rows, fields) {
        rows = getRows(rows);

        callback(err, rows, fields);
    });

    return null;
}

// Returns [null]
function updateById (connection, tableName, idKV, valuesKV, callback)
{
    let kvs =
    {
        'set': [],
        'where': null
    };

    for (let k in valuesKV)
    {
        let kvr = (normalizeKey(k) + ' = ' + normalizeValue(connection, valuesKV[k]));
        
        kvs.set.push(kvr);
    }

    kvs.set = kvs.set.join(',');

    for (let k in idKV)
    {
        let kvr = (normalizeKey(k) + ' = ' + normalizeValue(connection, idKV[k]));

        kvs.where = kvr;

        break;
    }

    const query = ('UPDATE `' + tableName + '` SET ' + kvs.set + ' WHERE ' + kvs.where + ';');
    
    connection.query(query, function (err, rows, fields) {callback(err);});

    return null;
}

// Returns [null]
function deleteById (connection, tableName, idKV, callback)
{
    let kvs = null;

    for (let k in idKV)
    {
        let kvr = (normalizeKey(k) + ' = ' + normalizeValue(connection, idKV[k]));

        kvs = kvr;

        break;
    }

    const query = ('DELETE FROM `' + tableName + '` WHERE ' + kvs + ';');

    connection.query(query, function (err, rows, fields) {callback(err);});

    return null;
}

module.exports =
{
    MySQLException,
    normalizeKey,
    normalizeValue,
    insert,
    select,
    updateById,
    deleteById
};