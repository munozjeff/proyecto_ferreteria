const urlParams = new URLSearchParams(window.location.search);
const productCode = urlParams.get('product');
const product_json = decodeURIComponent(productCode);
const product = JSON.parse(product_json)
const menu = document.querySelector('#menu_burger')
const desplegable = document.querySelector('#nav_var_header')

const img_product = document.querySelector('#show_img'),
        name_product = document.querySelector('#show_name'),
        price_product = document.querySelector('#show_price'),
        show_description = document.querySelector('#show_des');

function load_product(){
    img_product.src = '../user_image/'+product.image
    name_product.textContent = product.name
    price_product.textContent = "$" + product.price
    show_description.textContent = product.description
    update_views()
}
function update_views(code){
    let data = JSON.stringify({'code':product.code})
    fetch('../logic/views.php', {
        method: 'POST',
        body:data
    })
    .then(function(data){
        return data.json();
    })
    .then(myJson => { 
        
    });
}
menu.addEventListener('click',()=>{desplegable.style.display = "block"})

window.onload = load_product()