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
                        console.log(color)
                        var option = document.createElement('option')
                        var colors = document.createTextNode(color)
                        option.appendChild(colors)
                        document.getElementById('colors').appendChild(option)
                    }
                }
            }
        })
}

fetchInfo()