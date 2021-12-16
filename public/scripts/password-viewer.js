let PasswordViewer = {};

PasswordViewer.make = function (element)
{
    let target = null;

    if (element)
    {
        target = [element];
    }
    else
    {
        target = document.querySelectorAll('.password-viewer');
    }

    target.forEach(function(button) {
        let input = button.previousElementSibling;

        input.type = 'password';
        button.innerHTML = 'SHOW';

        button.onclick = function(e)
        {
            if (input.type === 'password')
            {
                input.type = 'text';
                button.innerHTML = 'HIDE';
            }
            else
            {
                input.type = 'password';
                button.innerHTML = 'SHOW';
            }
        }
    });

    return null;
}

window.onload = function ()
{
    PasswordViewer.make();
}