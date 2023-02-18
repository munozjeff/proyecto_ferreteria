const form_login = document.getElementById('form_login');
console.log("carga");
form_login.addEventListener('submit',function(e){
    e.preventDefault();
    var data_form=new FormData(form_login);
    var data_login = JSON.stringify({"username":data_form.get('username'),"password":data_form.get('password')});
    fetch('logic/login.php', {
        method: 'POST',
        body: data_login
        })
        .then(function(data){
            return data.json();
        })
        .then(myJson => { 
            console.log(myJson);
            var code=myJson.code;
            if(code==0){
                alert(myJson.message);
            }
            else if(code==1){
                window.location.replace(myJson.message);
            }
        });
});