function addCart() {
    let index = localStorage.getItem('products');
    let articles = JSON.parse(index);
    localStorage.clear()
    fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((products) => {
            let prices = 0;
            for (product of products) {
                for (article of articles)
                    if (product._id == article.id) {

                        let id = articles.indexOf(article)

                        let cartItem = document.getElementById('cart__items');

                        let cartArticle = document.createElement('article');
                        cartArticle.classList.add('cart__item');
                        cartArticle.setAttribute('data-id', product._id);
                        cartArticle.setAttribute('data-color', article.color);

                        // cartItem.appendChild(cartArticle);

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
                        cartItemContSetQInput.addEventListener('change', function () {
                            if (this.value < 1) {
                                cartItem.removeChild(cartArticle);
                                articles.splice(id, 1);
                                updateDB(articles);
                            } else if (this.value > 100) {
                                return window.alert("Veuillez selectioner une quantitée valide");
                            }
                            cartItemContSetQInput.value = this.value;
                            articles[id].quantity = cartItemContSetQInput.value;
                            updateDB(articles);
                            prices += product.price * article.quantity
                        })

                        cartItemContSetQ.appendChild(cartItemContSetQty);
                        cartItemContSetQ.appendChild(cartItemContSetQInput);
                        const cartItemContSetDel = document.createElement('div');
                        cartItemContSetDel.classList.add('cart__item__content__settings__delete');
                        let cartItemContSetDelete = document.createElement('p');
                        cartItemContSetDelete.classList.add('deleteItem');
                        cartItemContSetDelete.innerText = 'Supprimer';
                        cartItemContSetDelete.addEventListener('click', function () {
                            cartItem.removeChild(cartArticle);
                            articles.splice(id, 1);
                            updateDB(articles);
                        });

                        cartItemContSetDel.appendChild(cartItemContSetDelete);

                        cartItemContSet.appendChild(cartItemContSetQ);
                        cartItemContSet.appendChild(cartItemContSetDel);

                        cartItemContent.appendChild(cartItemContDesc);
                        cartItemContent.appendChild(cartItemContSet);

                        prices += product.price * article.quantity

                        console.log(prices);

                        cartItem.insertAdjacentElement('beforeend', cartArticle);
                        updateDB(articles);
                    }
            }
            console.log(prices);

            document.getElementById('totalPrice').innerText = prices
        })
}


function changeValue(value, newValue) {
    console.log(value)
    value = newValue;
    console.log(value);
    return value;
}

function updateDB(articles) {
    let articlesJSON = JSON.stringify(articles)
    localStorage.setItem('products', articlesJSON)
}
function orderButton() {
    document.getElementById('order').addEventListener('click', async (event) => {
        const regex = /^[a-zA-Z]+$/
        let firstName = document.getElementById('firstName')
        if (!(regex.test(firstName.value))) {
            console.log("refus");
            alert("Veuillez saisir prénom valide")
            event.preventDefault();
        }
        let lastName = document.getElementById('lastName')
        let address = document.getElementById('address')
        let city = document.getElementById('city')
        let email = document.getElementById('email')
        let client = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        };
        event.preventDefault();
    });
}

addCart();
orderButton();







// var deleteItem = document.getElementsByClassName('deleteItems');
// Array.from(deleteItem).forEach(function (deleteItem) {
//     deleteItem.addEventListener('click', deleteCart)
// });
