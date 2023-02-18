const container = document.querySelector(".products_container"),
        search_input = document.querySelector("#search_input"),
        provider_input = document.querySelector("#provider_input"),
        category_input = document.querySelector("#category_input");


let isDragging = false;
let currentY;
let initialY;
let yOffset = 0;


function dragStart(e) {
    initialY = e.clientY;
    isDragging = true;
}

function dragEnd(e) {
    isDragging = false;
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    currentY = e.clientY;
    yOffset = currentY - initialY;
    container.scrollTop = container.scrollTop - yOffset;
    initialY = currentY;
    
}



function add_item(product){
    let properties = ["code: ","name: ","category: ","provider: ","cant: ","price: "],
        array_properties = [];

    const item_container = document.createElement('div'),
            figure_item = document.createElement('figure'),
            img_item = document.createElement('img'),
            item_info = document.createElement('div'),
            item_description = document.createElement('p');

            item_container.classList.add('item_container')
            img_item.classList.add('img')
            figure_item.classList.add('figure')
            item_info.classList.add('item_info')
            item_description.classList.add('item_description')

    properties.forEach(props=>{
        const item_properties = document.createElement("div"), 
                item_properties_name = document.createElement("span"),
                item_properties_value = document.createElement("span");
        switch(props){
            case 'code: ':
                item_properties_name.textContent = (props)
                item_properties_value.textContent = (product.code)
            break;
            case 'name: ':
                item_properties_name.textContent = (props)
                item_properties_value.textContent = (product.name)
            break;
            case 'category: ':
                item_properties_name.textContent = (props)
                item_properties_value.textContent = (product.category)
            break;
            case 'provider: ':
                item_properties_name.textContent = (props)
                item_properties_value.textContent = (product.provider)
            break;
            case 'cant: ':
                item_properties_name.textContent = (props)
                item_properties_value.textContent = (product.cant)
            break;
            case 'price: ':
                item_properties_name.textContent = (props)
                item_properties_value.textContent = (product.price)
            break;
        }

        item_properties.append(item_properties_name,item_properties_value)
        item_properties.classList.add('prop')
        item_info.appendChild(item_properties)
    })
    img_item.src = "../../user_image/"+product.image
    figure_item.appendChild(img_item)
    item_description.textContent = ("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, numquam nihil. Minus voluptatum reiciendis amet fugiat asperiores distinctio dolore quo, odit accusamus, assumenda quibusdam alias animi quaerat numquam, earum neque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, numquam nihil. Minus voluptatum reiciendis amet fugiat asperiores distinctio dolore quo, odit accusamus, assumenda quibusdam alias animi quaerat numquam, earum neque.") 
    item_container.append(figure_item,item_info,item_description)
    container.appendChild(item_container)
}

function load_products(){
    fetch('../../logic/get_all_products.php', {
        method: 'POST',
    })
    .then(function(data){
        return data.json();
    })
    .then(myJson => { 
        products = Array.from(myJson)
        products.forEach(product=>{
            add_item(product);
        })
    });
}

function filter(){
    // var searchString = search_input.value;
    // var filteredProducts = products.filter(function(product) {
    //     return filterByName(product, searchString);
    // });
    // return filteredProducts
}

function filterByName(product, searchString) {
    if(provider_input.value != ""){
        if(provider_input.value == product.provider){
            if(product.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1){
                return true
            }
            else if(product.code.toLowerCase().indexOf(searchString.toLowerCase()) !== -1){
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
        }
         
    }
    if(category_input.value != ""){
        if(category_input.value == product.category){
            if(product.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1){
                return true
            }
            else if(product.code.toLowerCase().indexOf(searchString.toLowerCase()) !== -1){
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }
    if(category_input.value == "" && provider_input.value == ""){
        if(product.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1){
            return true
        }
        else if(product.code.toLowerCase().indexOf(searchString.toLowerCase()) !== -1){
            return true
        }
        else{
            return false
        }
    }
}

function search(){
    var searchString = search_input.value;
    var filteredProducts = products.filter(function(product) {
         return filterByName(product, searchString);
    });
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
    filteredProducts.forEach(product=>{
        add_item(product)
    })
}

container.addEventListener("mousedown", dragStart);
container.addEventListener("mouseup", dragEnd);
container.addEventListener("mouseleave", dragEnd);
container.addEventListener("mousemove", drag);
search_input.addEventListener("keyup", search);
provider_input.addEventListener("change",search)
category_input.addEventListener("change",search)

window.onload = load_products();