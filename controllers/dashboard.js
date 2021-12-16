function serveGet (req, res, next)
{
    if (!req.session.user)
    {// (Authorization failed)
        res.redirect('/logout');
    }
    else
    {// (Authorization OK)
        res.render('pages/dashboard.ejs', {'userData': req.session.user});
    }
}

module.exports =
{
    serveGet
}