var str = window.location.href
var url = new URL(str)
var productId = url.searchParams.get("id")
function fetchInfo() {
    fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((products) => {
            for (product of products) {
                if (product._id == productId) {
                    var img = document.createElement('img')
                    img.setAttribute('src', product.imageUrl)
                    document.getElementsByClassName('item__img')[0].appendChild(img)
                    var title = document.createTextNode(product.name)
                    document.getElementById('title').appendChild(title)
                    var id = document.createTextNode(product.price)
                    document.getElementById('price').appendChild(id)
                    var desc = document.createTextNode(product.description)
                    document.getElementById('description').appendChild(desc)
                    for (color of product.colors) {
                        var option = document.createElement('option')
                        var colors = document.createTextNode(color)
                        option.appendChild(colors)
                        document.getElementById('colors').appendChild(option)
                    }
                }
            }
        })
}

function getProductFromLocalStorage() {
    let truc = localStorage.getItem('products')
    return JSON.parse(truc)
}

function addProduct() {
    const storage = getProductFromLocalStorage() || [];
    var title = document.getElementById('title').innerText;
    var choice = document.getElementById('colors');
    var colors = choice.options[choice.selectedIndex].innerText;
    var quantity = document.getElementById('quantity').value;
    console.log(storage)
    if (quantity == 0) {
        return window.alert("Veuillez selectioner une quantitée valide");
    } else if (colors == '--SVP, choisissez une couleur --') {
        return window.alert("Veuillez choisir une couleur")
    } else {
        for (let i = 0; i < storage.length; i++) {
            if (storage[i].id == productId && storage[i].color == colors) {
                quantity = parseInt(storage[i].quantity) + parseInt(quantity)
                if (quantity > 100) {
                    quantity = 100;
                    window.alert('100 unités max')
                }
                storage.splice(i, 1)
            }
        };
        product = {
            name: title,
            id: productId,
            color: colors,
            quantity: quantity
        }
        storage.push(product)
        let productJson = JSON.stringify(storage);
        localStorage.setItem('products', productJson)
    }
}


fetchInfo()
document.getElementById('addToCart').addEventListener('click', addProduct)


