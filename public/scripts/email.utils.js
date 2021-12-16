// Returns [bool]
function check (text)
{
    const regex = /^[^\@]+\@[^\.\@]+\.[^\.\@]+$/;

    return regex.test(text);
}

// Returns [string]
function normalize (text)
{
    const separator = '@';

    let parts = text.split(separator);

    parts[1] = parts[1].toLowerCase();

    return parts.join(separator);
}

module.exports =
{
    check,
    normalize
};