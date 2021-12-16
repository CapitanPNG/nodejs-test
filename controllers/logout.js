function serveGet (req, res, next)
{
    req.session.destroy(function (err) {
        if (!err)
        {
            res.redirect('/login');
        }
    });
}

module.exports =
{
    serveGet
}