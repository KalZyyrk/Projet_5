
function addCart() {
    let index = localStorage.getItem('products');
    let articles = JSON.parse(index);
    fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((products) => {
            for (product of products) {
                for (article of articles)
                    if (product._id == article.id) {
                        let cartItem = document.getElementById('cart__items');

                        let cartArticle = document.createElement('article');
                        cartArticle.classList.add('cart__item');
                        cartArticle.setAttribute('data-id', product._id);
                        cartArticle.setAttribute('data-color', article.color);

                        cartItem.appendChild(cartArticle);

                        const cartImgDiv = document.createElement('div');
                        cartImgDiv.classList.add('cart__item__img');
                        const cartImg = document.createElement('img');
                        cartImg.setAttribute('src', product.imageUrl);
                        cartImg.setAttribute('alt', product.altTxt);

                        cartImgDiv.appendChild(cartImg);
                        cartArticle.appendChild(cartImgDiv);

                        const cartItemContent = document.createElement('div');
                        cartItemContent.classList.add('cart__item__content');

                        cartArticle.appendChild(cartItemContent);

                        const cartItemContDesc = document.createElement('div');
                        cartItemContDesc.classList.add('cart__item__content__description');
                        let descTitle = document.createElement('h2');
                        descTitle.innerText = product.name;
                        let descColor = document.createElement('p');
                        descColor.innerText = article.color;
                        let descPrice = document.createElement('p');
                        descPrice.innerText = product.price + ' €';

                        cartItemContDesc.appendChild(descTitle);
                        cartItemContDesc.appendChild(descColor);
                        cartItemContDesc.appendChild(descPrice);

                        const cartItemContSet = document.createElement('div');
                        cartItemContSet.classList.add('cart__item__content__settings');

                        const cartItemContSetQ = document.createElement('div');
                        cartItemContSetQ.classList.add('cart__item__content__settings__quantity');
                        let cartItemContSetQty = document.createElement('p');
                        cartItemContSetQty.innerText = 'Qté : ';
                        let cartItemContSetQInput = document.createElement('input');
                        cartItemContSetQInput.setAttribute('type', 'number');
                        cartItemContSetQInput.classList.add('itemQuantity');
                        cartItemContSetQInput.setAttribute('name', 'itemQuantity');
                        cartItemContSetQInput.setAttribute('min', '1');
                        cartItemContSetQInput.setAttribute('max', '100');
                        cartItemContSetQInput.setAttribute('value', article.quantity);

                        cartItemContSetQ.appendChild(cartItemContSetQty);
                        cartItemContSetQ.appendChild(cartItemContSetQInput);
                        const cartItemContSetDel = document.createElement('div');
                        cartItemContSetDel.classList.add('cart__item__content__settings__delete');
                        let cartItemContSetDelete = document.createElement('p');
                        cartItemContSetDelete.classList.add('deleteItem');
                        cartItemContSetDelete.innerText = 'Supprimer';
                        cartItemContSetDelete.addEventListener('click', deleteItem, option);

                        cartItemContSetDel.appendChild(cartItemContSetDelete);

                        cartItemContSet.appendChild(cartItemContSetQ);
                        cartItemContSet.appendChild(cartItemContSetDel);

                        cartItemContent.appendChild(cartItemContDesc);
                        cartItemContent.appendChild(cartItemContSet);

                    }
            }
        })

}

function deleteItem() {
    console.log('on Supprime');
    let del = document.querySelectorAll('.deleteItem');
    console.log(del);
}

addCart();







// var deleteItem = document.getElementsByClassName('deleteItems');
// Array.from(deleteItem).forEach(function (deleteItem) {
//     deleteItem.addEventListener('click', deleteCart)
// });
