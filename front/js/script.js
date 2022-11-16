function fetchData() {
    let url = 'http://localhost:3000/api/products'

    fetch(url)
        .then((res) => res.json())
        .then((products) => {
            for (product of products) {
                console.log(product)
                let display = ''
                display += `<a href="./product.html?id=${product._id}">
                            <article>
                                <img src="${product.imageUrl}" alt="${product.altTxt}">
                                <h3 class="productName">${product.name}</h3>
                                <p class="productDescription">${product.description}</p>
                            </article>
                            </a>`
                document.getElementById("items").insertAdjacentHTML('afterbegin', display)
            }
        })
}