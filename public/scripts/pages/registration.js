window.onload = function ()
{
    PasswordViewer.make();

    let form = document.getElementById('registration-form');

    form.onsubmit = function (e)
    {
        e.preventDefault();

        let invalidTarget = form.querySelectorAll(':invalid');

        let invalidInput = false;

        invalidTarget.forEach(function (el) {
            if (el.tagName !== 'FIELDSET')
            {
                if (!invalidInput)
                {
                    invalidInput = true;

                    el.focus();
                }
            }
            
            el.classList.add('is-invalid');
            el.parentElement.querySelector('.invalid-feedback').innerHTML = 'Valore mancante';
        });

        let validTarget = form.querySelectorAll(':valid');

        validTarget.forEach(function (el) {
            el.classList.remove('is-invalid');
        });

        if (invalidTarget.length === 0)
        {// (Input ok)
            let fdo = Object.fromEntries(new FormData(form));

            let req = new Request('/registration', {
                'method': 'post',
                'headers': new Headers({
                    'Content-Type': 'application/json'
                }),
                'body': JSON.stringify(fdo)
            });

            fetch(req).then(function (res) {
                let o = res.text();

                o.then(function (data) {
                    //console.debug(data);

                    let dd = JSON.parse(data);

                    const fields = dd.fields;
                    
                    let invalidInput = false;

                    for (let key in fields)
                    {
                        let input = form.querySelector('[name="' + key + '"]');

                        if (!invalidInput)
                        {
                            invalidInput = (fields[key] ? true : false);

                            if (invalidInput)
                            {
                                input.focus();
                            }
                        }

                        input.classList[(fields[key] ? 'add' : 'remove')]('is-invalid');
                        input.parentElement.querySelector('.invalid-feedback').innerHTML = fields[key];
                    }

                    if (dd.result)
                    {// (OK)
                        window.location.href = '/dashboard';
                    }
                });
            }).catch(function (err) {
                //console.debug(err);
            });
        }
    }
}
