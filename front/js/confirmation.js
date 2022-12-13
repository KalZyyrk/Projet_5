function addOrderID() {
    var str = window.location.href
    var url = new URL(str)
    var orderId = url.searchParams.get("orderId")
    console.log(orderId);
    document.getElementById('orderId').innerText = orderId;
}
addOrderID()