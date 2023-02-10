const container = document.getElementById('container')
const previous = document.getElementById('previous')
const next = document.getElementById('next')
var item_list = [];
let isDragging = false;
let currentX;
let initialX;
let xOffset = 0;

const create=createElements()
function createElements(){
    for(let i=0;i<10;i++){
        const card = document.createElement('div'),
                figure = document.createElement('figure'),
                img = document.createElement('img'),
                fast_view = document.createElement('submit'),
                item_name = document.createElement('span'),
                item_price = document.createElement('span');

                img.src = ('../img/alicate.png')
                img.classList.add('img')
                fast_view.textContent = ('Vista rapida')
                fast_view.classList.add('input')
                item_name.textContent = ('name' +i)
                item_name.classList.add('span')
                item_price.textContent = ('$9999')
                item_price.classList.add('span')
                figure.appendChild(img)
                figure.classList.add('card_figure')
                card.appendChild(figure)
                card.appendChild(fast_view)
                card.appendChild(item_name)
                card.appendChild(item_price)
                card.classList.add('card')
                card.value=2;
                card.addEventListener("dblclick",dbClickEvent)
                item_list.push(card)
                container.appendChild(card)
    }
}
function dbClickEvent(){
    console.log(this.value)
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
        newItem.addEventListener("dblclick",dbClickEvent)
        container.insertBefore(newItem, container.firstElementChild);
    })
    //container.scrollBy(container.scrollWidth-width, 0);
    
    if(container.childElementCount>=30){
        for(let i=29;i>=20;i--){
            container.removeChild(container.children[i])
        }
    }
    container.scrollLeft = container.scrollWidth/2
}
function loadRight(){
    let position=container.scrollLeft
    item_list.forEach(item=>{
        let newItem= item.cloneNode(true);
        newItem.addEventListener("dblclick",dbClickEvent)
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
            next.addEventListener('click',click_next)
            container.addEventListener("mousedown", dragStart);
        }
    }
    //container.scrollLeft = container.scrollLeft+216
}
previous.addEventListener('click',click_previous)
next.addEventListener('click',click_next)