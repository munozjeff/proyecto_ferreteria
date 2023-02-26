const register_form = document.querySelector('#register_form'),
        product_image  = document.querySelector('#image');

register_form.addEventListener('submit',function(e){
    e.preventDefault();
    let data_form = new FormData(register_form);
    let image = product_image.files[0];
    if (image && image.type.startsWith("image/")) {
        let reader = new FileReader();
        reader.onload = function(event) {
            var imageData = event.target.result;
        
            const data_register = JSON.stringify({"code":data_form.get('code'),
                                    "name":data_form.get('name'),
                                    "description":data_form.get('description'),
                                    "image":imageData,
                                    "category":data_form.get('category_input'),
                                    "provider":data_form.get('provider_input'),
                                    "existence":data_form.get('existence'),
                                    "price":data_form.get('price'),
                                    "publish":data_form.get('publish')});
            fetch('../../logic/product_register.php', {
                method: 'POST',
                body: data_register
            })
            .then(function(data){
                return data.json();
            })
            .then(myJson => { 
                console.log(myJson.message);
                alert(myJson.message);
            });
            
        };
        reader.readAsDataURL(image);
    } else {
        console.log("No se ha seleccionado una imagen");
    }
    
});