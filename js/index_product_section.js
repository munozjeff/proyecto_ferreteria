const container = document.getElementById('container')
const previous = document.getElementById('previous')
const next = document.getElementById('next')
const menu = document.querySelector('#menu_burger')
const desplegable = document.querySelector('#nav_var_header')
var item_list = [];
var products_list=[];
let isDragging = false;
let currentX;
let initialX;
let xOffset = 0;

function renderProducts(product){
        const card = document.createElement('div'),
                card2 = document.createElement('div'),
                input = document.createElement('input')
                input.type = 'hidden'
                figure = document.createElement('figure'),
                img = document.createElement('img'),
                fast_view = document.createElement('submit'),
                item_name = document.createElement('span'),
                item_price = document.createElement('span');

                img.src = ('user_image/'+product.image)
                img.classList.add('img')
                fast_view.textContent = ('Vista rapida')
                fast_view.classList.add('input')
                item_name.textContent = (product.name)
                input.value = product.code
                item_name.classList.add('span')
                item_price.textContent = ('$'+product.price)
                item_price.classList.add('span')
                figure.appendChild(img)
                figure.classList.add('card_figure')
                card2.appendChild(input)
                card2.classList.add('card2')
                card2.addEventListener('dblclick',view_product)
                card.appendChild(card2)
                card.appendChild(figure)
                card.appendChild(fast_view)
                card.appendChild(item_name)
                card.appendChild(item_price)
                card.classList.add('card')
                card.value=2;
                item_list.push(card)
                container.appendChild(card)
}
function view_product(event){
    console.log("click")
    products_list.forEach(product=>{
        product.code == event.target.firstChild.value
        if(product.code == event.target.firstChild.value){
            data_send = JSON.stringify({"name":product.name,
                                        "price":product.price,
                                        "description":product.description,
                                        "image":product.image,
                                        "code":product.code})
            window.open('products/view_product.html?product='+encodeURIComponent(data_send))
            return
        }
    })
    
}

container.addEventListener("mousedown", dragStart);
container.addEventListener("mouseup", dragEnd);
container.addEventListener("mouseleave", dragEnd);
container.addEventListener("mousemove", drag);

function dragStart(e) {
    initialX = e.clientX;
    isDragging = true;
    container.removeEventListener("mousedown", dragStart);
}

function dragEnd(e) {
    isDragging = false;
    let xleft = container.scrollLeft;
    let div = xleft / 216;
    let partEntera = Math.floor(div);
    let partDecimal = div - partEntera
    let redondeo = partDecimal * 10
    let position=0;
    const distance = (partDecimal) / 100;
    if(partDecimal > 0.5){
        position = (partEntera * 216)+216;
        transitionRight()
    }
    else{
        position = (partEntera * 216);
        transitionLeft()
    }
    //container.scrollLeft = position;
    function transitionRight(){
        const distance = (partDecimal) / 0.1;
        container.scrollLeft += distance;
        if(container.scrollLeft<position){
            requestAnimationFrame(transitionRight);
        }
        else{
            container.scrollLeft = position
            container.addEventListener("mousedown", dragStart);
        }
    }
    function transitionLeft(){
        const distance = (partDecimal) / 0.1;
        container.scrollLeft -= distance;
        if(container.scrollLeft>position){
            requestAnimationFrame(transitionLeft);
        }
        else{
            container.scrollLeft = position
            container.addEventListener("mousedown", dragStart);
        }
    }
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.clientX;
    xOffset = currentX - initialX;
    container.scrollLeft = container.scrollLeft - xOffset;
    initialX = currentX;
    console.log(container.scrollWidth)
    
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    if (scrollLeft + clientWidth >= scrollWidth) {
        loadRight()
    }
    
    if(scrollLeft == 0 ){
        console.log('Ha llegado al inicio del scroll');
        loadLeft()
    }
    
}
function loadLeft(){
    let width = container.scrollWidth;
    console.log(container.childElementCount)
    item_list_reverse = item_list.slice().reverse()
    item_list_reverse.forEach(item=>{
        let newItem= item.cloneNode(true);
        newItem.addEventListener('dblclick',view_product)
        container.insertBefore(newItem, container.firstElementChild);
    })
    container.scrollBy(container.scrollWidth-width, 0);
    
    if(container.childElementCount>=30){
        for(let i=29;i>=20;i--){
            container.removeChild(container.children[i])
        }
    }
    container.scrollLeft = container.scrollWidth/2
}
function loadRight(){
    item_list.forEach(item=>{
        let newItem= item.cloneNode(true);
        newItem.addEventListener('dblclick',view_product)
        container.appendChild(newItem)
    })   
    if(container.childElementCount>=30){
        for(let i=0;i<10;i++){
            container.removeChild(container.children[0])
        }
        container.scrollLeft = container.scrollWidth/2-container.clientWidth
    }
}
function click_previous(){
    if(container.scrollLeft == 0){
        previous.addEventListener('click',click_previous)
        loadLeft()
    }
    const position = container.scrollLeft-216;
    previous.removeEventListener('click',click_previous)
    container.removeEventListener("mousedown", dragStart);
    transition();
    function transition(){
        
        const distance = 216 / 18;
        container.scrollLeft += - distance;
        console.log(container.scrollLeft)
        console.log(position)
        if(container.scrollLeft>(position)){
            requestAnimationFrame(transition);
        }
        else{
            container.scrollLeft = position
            previous.addEventListener('click',click_previous)
            container.addEventListener("mousedown", dragStart);
        }
    }
    //container.scrollLeft = container.scrollLeft-216
}
function click_next(){
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    if (scrollLeft + clientWidth >= scrollWidth) {
        loadRight()
        next.addEventListener('click',click_next)
    }
    next.removeEventListener('click',click_next)
    container.removeEventListener("mousedown", dragStart);
    const position = container.scrollLeft+216;
    transition();
    console.log("position1")
    function transition(){
        const distance = 216/18
        container.scrollLeft += distance
        console.log(container.scrollLeft)
        console.log(position)
        console.log("position")
        if(container.scrollLeft<(position)){
            requestAnimationFrame(transition);
        }
        else{
            container.scrollLeft=position
            next.addEventListener('click',click_next)
            container.addEventListener("mousedown", dragStart);
        }
    }
    //container.scrollLeft = container.scrollLeft+216
}
function get_products(){
    fetch('logic/show_views.php', {
        method: 'POST',
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
previous.addEventListener('click',click_previous)
next.addEventListener('click',click_next)
menu.addEventListener('click',()=>{desplegable.style.display = "block"})
window.onload = get_products()