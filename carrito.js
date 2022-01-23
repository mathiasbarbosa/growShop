import { Carrito } from "./classCarrito.js";

// import {Carrito} from './classCarrito'
console.log(localStorage.arrayProductsAgregados);

let cart = []
window.addEventListener("load", () => {

    const data = JSON.parse(localStorage.getItem("arrayProductsAgregados"))
    if (localStorage.length > 0) {
        for (let i = 0; i < data.length; i++) {
            cart.push( new Carrito (data[i].id, data[i].category, data[i].product, data[i].price, data[i].image, data[i].cantidad) )
        }
        console.log(cart);
        
        interfazCart()
        interfazForm()
        
    }
    else{
        const cartContainer = document.querySelector(".cartContainer")
        cartContainer.innerHTML = `<h1> No hay productos en el carrito, empeza a llenarlo! <a href="./products.html">Vamos</a></h1>`
    }
})

const interfazForm = () => {
    const aside = document.querySelector("aside")
    console.log(aside);
    aside.innerHTML += `
                                <form action="">
                                                                        
                                    <input type="text" name="" id="" placeholder="Ingrese su nombre">

                                    <input type="text" name="" id="" placeholder="Ingrese su apellido">
                                    
                                    <input type="number" name="" id="" placeholder="cel">
                                </form>

                                <div class="order">
                                    <p>Items</p>
                                    <p>$total</p>
                                </div>
                                    
                                <button class="finishOrder"> Finalizar compra </button>
                                    
                            
                                `
}

const interfazCart = () => {
    const cartContainer = document.querySelector(".cartContainer")
    cartContainer.innerHTML = ""
    cart.map( product => {
        cartContainer.innerHTML += `
                                    <div class="detailCart">
                                        <img src=${product.image} alt="">
                                        <span id=${product.id}>${product.product}</span>
                                        <p>${product.price}</p>
                                        <button class="addQuantity">+</button>
                                        <p class="cantidadproducto">${product.cantidad}</p>
                                        <button class="subtractQuantity ">-</button>
                                    </div>
                                    `
    })
    addQuantity()
    subtractQuantity()
}

const addQuantity = () => {
    const buttonAdd = document.querySelectorAll(".addQuantity")

    for (let i = 0; i < buttonAdd.length; i++) {
        buttonAdd[i].addEventListener("click", () => {
            const children = buttonAdd[i].parentNode.childNodes[3]
            const filter = cart.findIndex( product => product.id == children.id )
            cart[filter].addQ(1)
            console.log(cart);
            localStorage.setItem("arrayProductsAgregados", JSON.stringify(cart))
            interfazCart()    
        })
        
    }
}

const subtractQuantity = () => {
    const buttonSubtract = document.querySelectorAll(".subtractQuantity")
    
    for (let i = 0; i < buttonSubtract.length; i++) {
        buttonSubtract[i].addEventListener("click", () => {
            const children = buttonSubtract[i].parentNode.childNodes[3]
            const filter = cart.findIndex( product => product.id == children.id )
            cart[filter].subtractQ(1)
            console.log(cart);
            localStorage.setItem("arrayProductsAgregados", JSON.stringify( cart))
            interfazCart()    
        })
        
    }
}