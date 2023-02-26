const container = document.getElementById("product_section")
const menu = document.querySelector('#menu_burger')
const desplegable = document.querySelector('#nav_var_header')

function add_item(category){
    let item = document.createElement('div');
    item.classList.add('item')
    let item2 = document.createElement('div');
    item2.classList.add('item2')
    item2.addEventListener('click',view_category)
    let figure = document.createElement('figure');
    figure.classList.add('figure_item')
    let img = document.createElement('img')
    let img1 = document.createElement('img')
    let img2 = document.createElement('img')
    let img3 = document.createElement('img')
    img.classList.add('img_item')
    img1.classList.add('img_item')
    img2.classList.add('img_item')
    img3.classList.add('img_item')
    let info_1 = document.createElement('span')
    info_1.classList.add('info_item')
    let info_2 = document.createElement('span')
    info_1.classList.add('info_item')

    img.src = ('../user_image/'+category.image[0])
    img1.src = ('../user_image/'+category.image[1])
    img2.src = ('../user_image/'+category.image[2])
    img3.src = ('../user_image/'+category.image[3])
    info_1.textContent = (category.category)
    info_2.textContent = ('PRODUCT INFO')

    figure.appendChild(img)
    figure.appendChild(img1)
    figure.appendChild(img2)
    figure.appendChild(img3)
    item.appendChild(item2)
    item.appendChild(figure)
    item.appendChild(info_1)
    item.appendChild(info_2)
    container.appendChild(item)
}
function view_category(event){
    window.open('show_products.html?category='+event.target.parentNode.childNodes[2].textContent,)
}
function get_provider_category(){
    fetch('../logic/get_provider_category.php', {
        method: 'POST',
    })
    .then(function(data){
        return data.json();
    })
    .then(myJson => { 
        if(myJson.code==1){
            fetch('../logic/get_images.php', {
                method: 'POST',
                body : JSON.stringify({"category":myJson.category})
            })
            .then(function(data){
                return data.json();
            })
            .then(myJson => { 
                Array.from(myJson).forEach(category=>{
                    add_item(category)
                })
            });
        }
    });
}
menu.addEventListener('click',()=>{desplegable.style.display = "block"})

window.onload = get_provider_category();