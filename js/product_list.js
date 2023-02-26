const container = document.querySelector(".products_container"),
        search_input = document.querySelector("#search_input"),
        provider_input = document.querySelector("#provider_input"),
        category_input = document.querySelector("#category_input"),
        close = document.querySelector("#close"),
        form = document.querySelector("#register_form"),
        update_input = document.querySelector("#update_input"),
        delete_input = document.querySelector("#delete_input"),
        code_input = document.querySelector('#code'),
        alert_yes = document.querySelector("#alert_yes"),
        alert_no = document.querySelector("#alert_no"),
        alert_container = document.querySelector('#message_alert_container'),
        provider_icon_delete = document.querySelector('#provider_icon_delete'),
        category_icon_delete = document.querySelector('#category_icon_delete');
var products_list;
var update_delete=null;
var data_alert=null;


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
            item_container2 =document.createElement('div'),
            figure_item = document.createElement('figure'),
            img_item = document.createElement('img'),
            item_info = document.createElement('div'),
            item_description = document.createElement('p');

            item_container.classList.add('item_container')
            item_container2.classList.add('item_container2')
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
    item_description.textContent = (product.description) 
    item_container.append(figure_item,item_info,item_description,item_container2)
    item_container.addEventListener("dblclick",edit)
    container.appendChild(item_container)
}
function edit(event){
    const code_product = event.target.parentNode.childNodes[1].firstChild.lastChild.textContent
    products_list.forEach(product=>{
        if(product.code == code_product){
            document.querySelector('#code').value = product.code
            document.querySelector('#name').value = product.name
            document.querySelector('#description').value = product.description
            document.querySelector('#input_category').value = product.category
            document.querySelector('#input_provider').value = product.provider
            document.querySelector('#input_cant').value = product.cant
            document.querySelector('#input_price').value = product.price
            return
        }
    })
    form.style.display = "block"
}
register_form.addEventListener('submit',function(e){
    e.preventDefault();
    if(update_delete == "ACTUALIZAR"){
        let image = document.querySelector('#image').files[0];
        if (image && image.type.startsWith("image/")) {
            let reader = new FileReader();
            reader.onload = function(event) {
            var imageData = event.target.result;
                send_data(imageData)
            }
            reader.readAsDataURL(image);
        } else {
            send_data()
        }
    }
    else if(update_delete == "ELIMINAR"){
        let data = JSON.stringify({'code':code_input.value})
        fetch('../../logic/product_delete.php', {
            method: 'POST',
            body: data
        })
        .then(function(data){
            return data.json();
        })
        .then(myJson => { 
            alert(myJson.message);
        });
    }
});
function send_data(imageData=null){
    let data_form = new FormData(form);
    const data_register = JSON.stringify({"code":data_form.get('code'),
                                            "name":data_form.get('name'),
                                            "description":data_form.get('description'),
                                            "image":imageData,
                                            "category":data_form.get('category_input'),
                                            "provider":data_form.get('provider_input'),
                                            "existence":data_form.get('existence'),
                                            "price":data_form.get('price'),
                                            "publish":data_form.get('publish')});
    fetch('../../logic/product_update.php', {
        method: 'POST',
        body: data_register
    })
    .then(function(data){
        return data.json();
    })
    .then(myJson => { 
        alert(myJson.message);
    });
}
function load_products(){
    fetch('../../logic/get_all_products.php', {
        method: 'POST',
    })
    .then(function(data){
        return data.json();
    })
    .then(myJson => { 
        products_list = Array.from(myJson)
        products_list.forEach(product=>{
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
    var filteredProducts = products_list.filter(function(product) {
         return filterByName(product, searchString);
    });
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
    filteredProducts.forEach(product=>{
        add_item(product)
    })
}

function show_alert(event){
    if(event.target.parentNode.parentNode.childNodes[3].value != ""){
        alert_container.style.display="flex"
        document.querySelector('#info_alert').textContent = "Esta seguro de eliminar "+event.target.parentNode.parentNode.childNodes[3].value
        data_alert = JSON.stringify({'column':event.target.parentNode.parentNode.childNodes[3].placeholder,'value':event.target.parentNode.parentNode.childNodes[3].value})
    }
}
function delete_category_provider(){
    if(data_alert!=null){
        fetch('../../logic/category_update_delete.php', {
            method: 'POST',
            body: data_alert
        })
        .then(function(data){
            return data.json();
        })
        .then(myJson => { 
            alert(myJson.message);
            alert_container.style.display="none"
        });
    }
}


container.addEventListener("mousedown", dragStart);
container.addEventListener("mouseup", dragEnd);
container.addEventListener("mouseleave", dragEnd);
container.addEventListener("mousemove", drag);
search_input.addEventListener("keyup", search);
provider_input.addEventListener("change",search)
category_input.addEventListener("change",search)
update_input.addEventListener('click',()=>{update_delete = update_input.value})
delete_input.addEventListener('click',()=>{update_delete = delete_input.value})
close.addEventListener('click',function (){form.style.display = "none"})
alert_no.addEventListener('click',()=>{alert_container.style.display = 'none'})
alert_yes.addEventListener('click',delete_category_provider)
provider_icon_delete.addEventListener('click',show_alert)
category_icon_delete.addEventListener('click',show_alert)

window.onload = load_products();