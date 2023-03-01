const openCart = document.querySelector("#cart-icon")
const closeCart = document.querySelector("#close-cart")
const cart = document.querySelector(".cart")
const cartProduct = document.querySelector(".cartProduct")

let products = JSON.parse(localStorage.getItem("obj")) ? JSON.parse(localStorage.getItem("obj")) : []
// localStorage.clear()
// variable
let num = 0;
function shoppinCart (products){
    cartProduct.innerHTML = ""  
    products.forEach((item, idx)=>{
            if (item.num != 0){
            cartProduct.innerHTML += `

            <div class="cart-content">
                <img src=${item.img} alt="" class="cart-img">
                <div class="cart-box">
                <div class="cart-product-title">
                        ${item.name}
                </div>
                <div class="cart-price">
                        ${item.price} $
                </div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <!-- Remove cart -->
                <i class="bx bxs-trash-alt cart-remove" onclick="del(${idx})"></i>
            </div> 
        `}else {
            console.log(item);
        }
    })
    
}


function del(id){
    const delTodo = products.filter((item, i) =>{
        return  i !== id
    })
    localStorage.setItem('obj', JSON.stringify(products))
    products = delTodo
    shoppinCart(products)
}


shoppinCart(products)
document.addEventListener("click", (e)=>{
    num+=1
    if(e.target.classList.contains("add-cart")){
        let img = e.target.parentNode.childNodes[1].getAttribute("src");
        let name = e.target.parentNode.childNodes[3].textContent
        let price = e.target.parentNode.childNodes[6].textContent       
       
        let obj = {
            img,
            name,
            price,
            num,
        }
        products.push(obj)
        localStorage.setItem("obj",JSON.stringify(products))
        let object = JSON.parse(localStorage.getItem("obj"))
        shoppinCart(object)
    }
    if (e.target.classList.contains("cart-remove")){
        
    }
})


openCart.addEventListener("click", ()=>{
    cart.classList.add("active")
})

closeCart.addEventListener("click", ()=>{
    cart.classList.remove("active")
})









 