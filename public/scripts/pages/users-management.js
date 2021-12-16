window.onload = function ()
{
    let target = document.querySelectorAll('.btn-delete-account');

    target.forEach(function (el) {
        el.onclick = function (e)
        {
            if (confirm('Sei sicuro di volere eliminare questo account ?'))
            {
                const baseUserId = el.value;
    
                let req = new Request(('/users-management/' + baseUserId), {
                    'method': 'delete',
                    'headers': new Headers({
                        'Content-Type': 'application/json'
                    }),
                    'body': null
                });
    
                fetch(req).then(function (res) {
                    let o = res.text();
    
                    o.then(function (data) {
                        //console.debug(data);
    
                        let dd = JSON.parse(data);
    
                        if (dd.result)
                        {// (OK)
                            alert('L\'utente è stato eliminato correttamente');
                            
                            window.location.href = '';
                        }
                    });
                }).catch(function (err) {
                    //console.debug(err);
                });
            }
        }
    });
}
