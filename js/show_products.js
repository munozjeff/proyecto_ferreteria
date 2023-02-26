var urlParams = new URLSearchParams(window.location.search);
var category = urlParams.get('category');

const productsContainer = document.querySelector('.products-container');
const menu = document.querySelector('#menu_burger')
const desplegable = document.querySelector('#nav_var_header')
productList = [];

function renderProducts(product){
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');
    const productContainer2 = document.createElement('div');
    const code = document.createElement('input')
    code.type = 'hidden'
    code.value = product.code
    productContainer2.classList.add('product-container2');
    productContainer2.addEventListener('click',view_product)
    const productImg = document.createElement('img');
    productImg.setAttribute('src', "../user_image/"+product.image);
    const productDescriptionContainer = document.createElement('div');
    productDescriptionContainer.classList.add('product-description');
    const productDescription = document.createElement('p');
    productDescription.innerText = product.name;
    productDescription.value
    const productPrice = document.createElement('p');
    productPrice.innerText= '$' + product.price;

    productDescriptionContainer.append(productDescription,productPrice);
    productContainer2.appendChild(code)
    productContainer.append(productContainer2,productImg,productDescriptionContainer);

    productsContainer.appendChild(productContainer);
}
function view_product(event){
    event.target.firstChild.value
    products_list.forEach(product=>{
        product.code == event.target.firstChild.value
        if(product.code == event.target.firstChild.value){
            data_send = JSON.stringify({"name":product.name,
                                        "price":product.price,
                                        "description":product.description,
                                        "image":product.image,
                                        "code":product.code})
            window.open('../products/view_product.html?product='+encodeURIComponent(data_send))
            return
        }
    })
    
}
function get_products(){
    let data = JSON.stringify({"category":category})
    fetch('../logic/get_product_category.php', {
        method: 'POST',
        body:data
    })
    .then(function(data){
        return data.json();
    })
    .then(myJson => { 
        products_list = Array.from(myJson)
        products_list.forEach(product=>{
            renderProducts(product);
        })
    });
}
menu.addEventListener('click',()=>{desplegable.style.display = "block"})

window.onload = get_products();