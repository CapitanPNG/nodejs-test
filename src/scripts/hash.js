const bcrypt = require('bcrypt');

const numSaltRounds = 10;

// Returns [string]
function hash (text)
{
    return bcrypt.hashSync(text, numSaltRounds);
}

// Returns [bool]
function match (text, hash)
{
    return bcrypt.compareSync(text, hash);
}

module.exports = 
{
    hash,
    match
};