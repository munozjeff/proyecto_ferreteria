const productsContainer = document.querySelector('.products-container');
productList = [];

productList.push({
    description:'Alicate',
    price:12200,
    image:'https://static.wixstatic.com/media/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg'
})

productList.push({
    description:'Alicate',
    price:12200,
    image:'https://static.wixstatic.com/media/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg'
})
productList.push({
    description:'Alicate',
    price:12200,
    image:'https://static.wixstatic.com/media/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg'
})
productList.push({
    description:'Alicate',
    price:12200,
    image:'https://static.wixstatic.com/media/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg'
})
productList.push({
    description:'Alicate',
    price:12200,
    image:'https://static.wixstatic.com/media/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg'
})
productList.push({
    description:'Alicate',
    price:12200,
    image:'https://static.wixstatic.com/media/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg'
})
productList.push({
    description:'Alicate',
    price:12200,
    image:'https://static.wixstatic.com/media/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg'
})
productList.push({
    description:'Alicate',
    price:12200,
    image:'https://static.wixstatic.com/media/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg/v1/fill/w_225,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/22e53e_0e48bd6e738a4221aa21f00bb8d8ba2e~mv2.jpg'
})


//Añadir productos al contenedor

function renderProducts(arr){

    for(product of arr){

        const productContainer = document.createElement('div');
        productContainer.classList.add('product-container');
        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.image);
        const productDescriptionContainer = document.createElement('div');
        productDescriptionContainer.classList.add('product-description');
        const productDescription = document.createElement('p');
        productDescription.innerText = product.description;
        const productPrice = document.createElement('p');
        productPrice.innerText= '$' + product.price;

        productDescriptionContainer.append(productDescription,productPrice);
        productContainer.append(productImg,productDescriptionContainer);

        productsContainer.appendChild(productContainer);

    }
}

renderProducts(productList);