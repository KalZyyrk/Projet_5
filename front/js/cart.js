
function addCart() {
    for (let i = 0; i < localStorage.length; i++) {
        let index = localStorage.key(i);
        let articleJSON = localStorage.getItem(index);
        let article = JSON.parse(articleJSON);
        fetch('http://localhost:3000/api/products')
            .then((res) => res.json())
            .then((products) => {
                for (product of products) {
                    if (product._id == article.id) {
                        let display = '';
                        display +=
                            `<article class="cart__item" data-id="${product._id}" data-color="${article.color}">
                                <div class="cart__item__img">
                                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                                </div>
                                <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                     <h2>${product.name}</h2>
                                    <p>${article.color}</p>
                                    <p>${product.price}</p>
                                 </div>
                                <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItems">Supprimer</p>
                                </div>
                                </div>
                                </div>
                            </article>`;
                        document.getElementById('cart__items').insertAdjacentHTML('afterbegin', display)
                    }
                }
            })
    }
}

// function deleteCart() {
//     console.log('on est la')
// }

addCart()
let selected = document.querySelector(`[data-id="`)
console.log(quantity)
// var deleteItem = document.getElementsByClassName('deleteItems');
// Array.from(deleteItem).forEach(function (deleteItem) {
//     deleteItem.addEventListener('click', deleteCart)
// });
