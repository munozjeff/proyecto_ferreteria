const container = document.getElementById('container')
const previous = document.getElementById('previous')
const next = document.getElementById('next')

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
                //item_list.push(card)
                container.appendChild(card)
    }
}

container.addEventListener("scroll",function(){
})