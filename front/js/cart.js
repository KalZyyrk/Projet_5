
function addCart() {
    let index = localStorage.getItem('products');
    let articles = JSON.parse(index);
    fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((products) => {
            for (product of products) {
                for (article of articles)
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
                                    <p>${product.price} €</p>
                                 </div>
                                <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItems">Supprimer</p>
                                    <p id="length"><p>
                                </div>
                                </div>
                                </div>
                            </article>`;
                        document.getElementById('cart__items').insertAdjacentHTML('afterbegin', display)
                    }
            }
        })
}


addCart();
let del = document.getElementsByClassName("deleteItems");
console.log(del);
console.log(del.length);



// var deleteItem = document.getElementsByClassName('deleteItems');
// Array.from(deleteItem).forEach(function (deleteItem) {
//     deleteItem.addEventListener('click', deleteCart)
// });
