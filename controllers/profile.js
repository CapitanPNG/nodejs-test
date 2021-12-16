const emailUtils = require('../public/scripts/email.utils.js');
const datetimeUtils = require('../public/scripts/datetime.utils.js');

const connections = require('../src/scripts/mysql.connections.js');

const Utente = require('../models/utente.js');

const hash = require('../src/scripts/hash.js');

const AnagraficaUtente = require('../models/anagrafica_utente.js');

const { DateTime } = require('luxon');

function serveGet (req, res, next)
{
    if (!req.session.user)
    {// (Authorization failed)
        res.redirect('/logout');
    }
    else
    {// (Authorization OK)
        let userData = {};

        userData.account = {};

        for (let k in req.session.user.account)
        {
            userData.account[k] = req.session.user.account[k];
        }
        
        const anagraficaUtente = new AnagraficaUtente(connections['default']);

        anagraficaUtente.readById(userData.account.id, function (err, rows, fields) {
            if (!err)
            {
                userData.anagrafica = {};

                const row = rows[0];

                for (let k in row)
                {
                    if (k === 'utente')
                    {
                        continue;
                    }

                    let v = row[k];

                    if (k.startsWith('data_'))
                    {
                        v = DateTime.fromFormat(v, datetimeUtils.MYSQL_DATE_FORMAT).toFormat(datetimeUtils.DATE_FORMAT);
                    }

                    userData.anagrafica[k] = v;
                }
                
                res.render('pages/profile.ejs', {userData});
            }
        });
    }
}

function servePut (req, res, next)
{
    if (!req.session.user)
    {// (Authorization failed)
        return null;
    }

    const data = req.body;

    let errors = {};

    for (let key in data)
    {
        errors[key] = null;
    }
    
    if (!data['email'])
    {// (Email is empty)
        errors['email'] = 'Valore mancante';
    }
    else
    if (!emailUtils.check(data['email']))
    {// (Email is not valid)
        errors['email'] = 'Valore non valido';
    }
    else
    {// (Email is ok)
        data['email'] = emailUtils.normalize(data['email']);
    }

    if (!data['password'])
    {
        errors['password'] = 'Valore mancante';
    }

    if (data['is_admin'])
    {
        switch (data['is_admin'])
        {
            case 'off':
            case 'on':
                switch (data['is_admin'])
                {
                    case 'off':
                        data['is_admin'] = false;
                    break;
                    case 'on':
                        data['is_admin'] = true;
                    break;
                }
            break;
            default:
                errors['is_admin'] = 'Valore non valido';
        }
    }
    else
    {
        data['is_admin'] = false;
    }

    if (!data['nome'])
    {
        errors['nome'] = 'Valore mancante';
    }

    if (!data['cognome'])
    {
        data['cognome'] = 'Valore mancante';
    }

    if (!data['data_nascita'])
    {
        errors['data_nascita'] = 'Valore mancante';
    }
    else
    {
        let dt = datetimeUtils.toDateTime(data['data_nascita'], datetimeUtils.DATE_FORMAT);
        
        if (!dt.isValid)
        {
            errors['data_nascita'] = 'Valore non valido';
        }
        else
        {
            data['data_nascita'] = datetimeUtils.normalize(dt, 'date');
        }
    }

    if (!data['luogo_nascita'])
    {
        errors['luogo_nascita'] = 'Valore mancante';
    }

    if (!data['sesso'])
    {
        errors['sesso'] = 'Valore mancante';
    }
    else
    {
        switch(data['sesso'])
        {
            case 'M':
            case 'F':
                // OK
            break;
            default:
                errors['sesso'] = 'Valore non valido';
        }
    }

    if (!data['data_emissione_carta'])
    {
        errors['data_emissione_carta'] = 'Valore mancante';
    }
    else
    {
        let dt = datetimeUtils.toDateTime(data['data_emissione_carta'], datetimeUtils.DATE_FORMAT);

        if (!dt.isValid)
        {
            errors['data_emissione_carta'] = 'Valore non valido';
        }
        else
        {
            data['data_emissione_carta'] = datetimeUtils.normalize(dt, 'date');
        }
    }

    if (!data['data_scadenza_carta'])
    {
        errors['data_scadenza_carta'] = 'Valore mancante';
    }
    else
    {
        let dt = datetimeUtils.toDateTime(data['data_scadenza_carta'], datetimeUtils.DATE_FORMAT);

        if (!dt.isValid)
        {
            errors['data_scadenza_carta'] = 'Valore non valido';
        }
        else
        {
            data['data_scadenza_carta'] = datetimeUtils.normalize(dt, 'date');
        }
    }

    if (!data['codice_carta'])
    {
        errors['codice_carta'] = 'Valore mancante';
    }

    let output =
    {
        'fields': errors,
        'result': false
    };

    for (let key in errors)
    {
        if (errors[key])
        {// (There is an error)
            res.send(output);
            return null;
        }
    }

    const utente = new Utente(connections['default']);
    
    utente.readByKey('email', data['email'], function (err, rows, fields) {
        if (err)
        {
            res.send(output);
            return null;
        }
        else
        {
            if (rows.length > 0)
            {// (Email already exists)
                if (data['email'] !== req.session.user.account.email)
                {// (Email is not the user current email)
                    output.fields['email'] = 'Email associata ad un altro account';

                    res.send(output);
                    return null;
                }
            }

            utente.updateById(
                req.session.user.account.id,
                {
                    'email': data['email'],
                    'password': hash.hash(data['password']),
                    'is_admin': data['is_admin']
                },
                function (err)
                {
                    if (err)
                    {
                        res.send(output);
                        return null;
                    }
                    else
                    {
                        req.session.user.account.email = data['email'];
                        req.session.user.account.isAdmin = data['is_admin'];

                        const anagraficaUtente = new AnagraficaUtente(connections['default']);

                        anagraficaUtente.updateById(
                            req.session.user.account.id,
                            {
                                'nome': data['nome'],
                                'cognome': data['cognome'],

                                'data_nascita': data['data_nascita'],
                                'luogo_nascita': data['luogo_nascita'],

                                'sesso': data['sesso'],

                                'data_emissione_carta': data['data_emissione_carta'],
                                'data_scadenza_carta': data['data_scadenza_carta'],
                                'codice_carta': data['codice_carta']
                            },
                            function (err)
                            {
                                if (err)
                                {
                                    res.send(output);
                                    return null;
                                }
                                else
                                {// (OK)
                                    output.result = true;
                                    res.send(output);
                                    return null;
                                }
                            }
                        );
                    }
                }
            );
        }
    });

    return null;
}

function serveDelete (req, res, next)
{
    if (!req.session.user)
    {// (Authorization failed)
        return null;
    }

    let output = {
        'result': false
    };

    const utente = new Utente(connections['default']);

    utente.deleteById(req.session.user.account.id, function (err) {
        if (err)
        {
            res.send(output);
            return null;
        }
        else
        {// (OK)
            req.session.destroy(function (err) {
                if (!err)
                {
                    output.result = true;
                    res.send(output);
                    return null;
                }
            });
        }
    });

    return null;
}

module.exports =
{
    serveGet,
    servePut,
    serveDelete
}