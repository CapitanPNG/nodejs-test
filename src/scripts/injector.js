const fs = require('fs');

// Returns [Error]
function FileSystemException (message)
{
    return new Error(message);
}

// Returns [string] | Throws [FileSystemException]
function read (file)
{
    let text = null;
    
    try
    {
        text = fs.readFileSync(file, 'utf8');    
    }
    catch (err)
    {
        throw new FileSystemException(err);
    }

    return text;
}

// Returns [string]
function fill (text, kv)
{
    let value = text;

    for (let k in kv)
    {
        let v = kv[k];

        value = value.replace('{{ ' + k + ' }}', v);
    }

    return value;
}

// Returns [string] | Throws [FileSystemException]
function inject (file, kv)
{
    let text = null;
    
    try
    {
        text = read(file);
    }
    catch (err)
    {
        throw new FileSystemException(err);
    }

    return fill(text, kv);
}

module.exports = 
{
    read,
    fill,
    inject
};