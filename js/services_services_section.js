const container = document.getElementById("product_section")
const menu = document.querySelector('#menu_burger')
const desplegable = document.querySelector('#nav_var_header')

for(let i=0;i<=10;i++){
    add_item()
}


function add_item(){
    let item = document.createElement('div');
    item.classList.add('item')
    let figure = document.createElement('figure');
    figure.classList.add('figure_item')
    let img = document.createElement('img')
    img.classList.add('img_item')
    let info_1 = document.createElement('span')
    info_1.classList.add('info_item')
    let info_2 = document.createElement('span')
    info_1.classList.add('info_item')

    img.src = ('../img/alicate.png')
    info_1.textContent = ('PRODUCT NAME')
    info_2.textContent = ('PRODUCT INFO')

    figure.appendChild(img)
    item.appendChild(figure)
    item.appendChild(info_1)
    item.appendChild(info_2)
    container.appendChild(item)
}

menu.addEventListener('click',()=>{desplegable.style.display = "block"})
