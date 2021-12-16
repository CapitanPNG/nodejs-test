const emailUtils = require('../public/scripts/email.utils.js');

const connections = require('../src/scripts/mysql.connections.js');

const Utente = require('../models/utente.js');

const hash = require('../src/scripts/hash.js');

function serveGet (req, res, next)
{
    /*const file = path.join(__dirname + '/../views/pages/login.ejs');
    res.sendFile(file);*/

    res.render('pages/login');
}

function servePost (req, res, next)
{
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
    {// (Email is ok)
        data['email'] = emailUtils.normalize(data['email']);
    }

    if (!data['password'])
    {
        errors['password'] = 'Valore mancante';
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
            {// (Email exists)
                const row = rows[0];
                
                const password = row['password'];

                const passwordMatch = hash.match(data['password'], password);

                if (passwordMatch)
                {// (Match OK)
                    req.session.regenerate(function (err) {
                        if (err)
                        {
                            res.send(output);
                            return null;
                        }
                        else
                        {
                            req.session.user = {};

                            req.session.user.account = {};
                            
                            req.session.user.account.id = row['id'];
                            req.session.user.account.email = row['email'];
                            
                            req.session.user.account.isAdmin = (row['is_admin'] === 1);
                            
                            output.result = true;

                            res.send(output);
                            return null;
                        }
                    });
                }
                else
                {// (Match failed)
                    output.fields['email'] = 'Autenticazione fallita';

                    res.send(output);
                    return null;
                }
            }
            else
            {// (Email does not exist)
                output.fields['email'] = 'Autenticazione fallita';

                res.send(output);
                return null;
            }
        }
    });

    return null;
}

module.exports =
{
    serveGet,
    servePost
}