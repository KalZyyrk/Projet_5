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

function addProduct() {
    var title = document.getElementById('title').innerText;
    var choice = document.getElementById('colors');
    var image = document.getElementsByClassName('item__img')[0].innerText
    var colors = choice.options[choice.selectedIndex].innerText;
    var quantity = document.getElementById('quantity').value;
    console.log(quantity)
    if (quantity == 0) {
        return window.alert("Veuillez selectioner une quantitée");
    } else if (colors == '--SVP, choisissez une couleur --') {
        return window.alert("Veuillez choisir une couleur")
    } else {
        for (let i = 0; i < localStorage.length; i++) {
            let index = localStorage.key(i);
            let infoJSON = localStorage.getItem(index);
            let info = JSON.parse(infoJSON);
            if (info.id == productId && info.color == colors) {
                console.log(typeof info.quantity)
                quantity = parseInt(info.quantity) + parseInt(quantity)
            }
        }
        product = {
            name: title,
            id: productId,
            color: colors,
            image: image,
            quantity: quantity
        }
        let productJson = JSON.stringify(product);
        localStorage.setItem((product.name + product.color), productJson)
    }
}


fetchInfo()
document.getElementById('addToCart').addEventListener('click', addProduct)
// localStorage.clear()
console.log(localStorage)

