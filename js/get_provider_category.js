var providers = [];
var category = [];
const category_list = document.querySelector('#category');
const provider_list = document.querySelector('#provider');

function get_provider_category(){
    fetch('../../logic/get_provider_category.php', {
        method: 'POST',
    })
    .then(function(data){
        return data.json();
    })
    .then(myJson => { 
        if(myJson.code==1){
            Array.from(myJson.category).forEach(item=>{
                const option = document.createElement('option');
                option.value = item;
                category_list.appendChild(option)
            })
            Array.from(myJson.provider).forEach(item=>{
                const option = document.createElement('option');
                option.value = item;
                provider_list.appendChild(option)
            })
        }
    });
}

window.onload = function() {
    get_provider_category();
}