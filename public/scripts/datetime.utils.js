const { DateTime } = require('luxon');

const CONSOLE_WARNINGS = true;

const DATE_FORMAT = 'dd/MM/yyyy';
const TIME_FORMAT = 'hh:mm:ss';

const DATETIME_FORMAT = (DATE_FORMAT + ' ' + TIME_FORMAT);

const MYSQL_DATE_FORMAT = 'yyyy-MM-dd';
const MYSQL_TIME_FORMAT = 'hh:mm:ss';

const MYSQL_DATETIME_FORMAT = (MYSQL_DATE_FORMAT + ' ' + MYSQL_TIME_FORMAT);

// Returns [object]
function toDateTime (text, format)
{
    if (format === undefined)
    {// (Value not found)
        format = DATETIME_FORMAT;

        if (CONSOLE_WARNINGS)
        {
            console.warn('Default value has been applied for \'format\'');
        }
    }
    
    return DateTime.fromFormat(text, format);
}

// Returns [bool]
function check (text, format)
{
    let dt = toDateTime(text, format);

    return dt.isValid;
}

// Returns [string]
function normalize (datetime, type)
{
    let format = null;

    switch (type)
    {
        case 'date':
            format = MYSQL_DATE_FORMAT;
        break;
        case 'time':
            format = MYSQL_TIME_FORMAT;
        break;
        case 'datetime':
            format = MYSQL_DATETIME_FORMAT;
        break;
    }

    return datetime.toFormat(format); 
}

module.exports =
{
    DATE_FORMAT,
    TIME_FORMAT,
    DATETIME_FORMAT,
    MYSQL_DATE_FORMAT,
    MYSQL_TIME_FORMAT,
    MYSQL_DATETIME_FORMAT,
    toDateTime,
    check,
    normalize
};