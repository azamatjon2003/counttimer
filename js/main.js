const openCart = document.querySelector("#cart-icon")
const closeCart = document.querySelector("#close-cart")
const cart = document.querySelector(".cart")
const cartProduct = document.querySelector(".cartProduct")
const totalPrice = document.querySelector(".total-price")
const shopContent = document.querySelector(".shop-content")
const modal = document.querySelector(".modal")
const exitBtn = document.querySelector(".exit-icon")
const modalInfo = document.querySelector(".modal-info")
const ratedEl = document.getElementById("ratedEl")
const loader = document.getElementsByClassName("loader")[0]

const api_link = 'https://fakestoreapi.com/products'

var otsenka = [];

const getProduct = (async (idx)=>{
    loader.classList.add("active")

    const api_link = `https://fakestoreapi.com/products/${idx}`
    modal.classList.add("active")
    exitBtn.classList.add("active")

    let req = await fetch(api_link)
    let data  = await req.json()
    const {image, price, description, rating, title, category} = data;


    modalInfo.innerHTML = `
    <img src=${image} class="product-image">
    <div>
        <h3 class="title">Name of product : ${title.slice(0, 10)}</h3>
        <p><b>Category: </b> ${category}</p>
        <br> 
        <p><b>Description :</b>${description}</p>
        <p id="ratedEl">Rate : <b> ${rating.rate} </b> </p>
        <p id="priceEl">Price : <b> $${price} </b> </p>
        
    </div>
    `
    loader.classList.remove("active")
})

exitBtn.addEventListener('click', ()=>{
    modal.classList.remove("active")
    exitBtn.classList.remove("active")
})

async function getData (api) {
    let req = await fetch(api)
    let data = await req.json()
    data.forEach((item)=>{
        const title = item.title.slice(0, 25)
        const {image, price, id} = item
        shopContent.innerHTML += `
        <div class="product-box" onclick="getProduct(${id})" data-aos="fade-up"
        data-aos-anchor-placement="center-bottom">
                <img src=${image} alt="" class="product-img">
                <h2 class="product-title">${title + "..."}</h2>
                <span>$</span><span class="price">${price}</span>
                <i class='bx bx-shopping-bag add-cart'></i>
        </div>
        `
        
        loader.classList.remove("active")
    })
}

getData (api_link)
let products = JSON.parse(localStorage.getItem("obj")) ? JSON.parse(localStorage.getItem("obj")) : []



// variable
let num = 0;
let sum = 0;


function shoppinCart (products){
    sum = 0
    cartProduct.innerHTML = ""
    products.forEach((item, idx)=>{
        sum+= parseInt(item.price)
            cartProduct.innerHTML += `

            <div class="cart-content" data-aos="zoom-out-left">
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
        `

    totalPrice.innerHTML = "$" +sum
    })
    
}


function del(id){
    const delTodo = products.filter((item, i) =>{
        return  i !== id
    })
    products = delTodo
    localStorage.setItem('obj', JSON.stringify(products))
    totalPrice.innerHTML = "$" + 0
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
        
})

openCart.addEventListener("click", ()=>{
    cart.classList.add("active")
})

closeCart.addEventListener("click", ()=>{
    cart.classList.remove("active")
})

