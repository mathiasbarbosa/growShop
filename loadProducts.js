
///// Cargar productos window location
import  {Carrito} from './classCarrito.js';

const arrayProductsdb = [];

const requestProducts = async () => {
    
    const peticion = await fetch("../products.json")
    const respuesta =  await peticion.json()
    
    for (let i = 0; i < respuesta.length; i++) {
        arrayProductsdb.push(respuesta[i])
        
    }
    
    let path = location.pathname
    console.log(location);
    switch (path) {
        case "/pages/grinders.html":
            filterProducts(arrayProductsdb,"grinders")
            break;
        
        case "/pages/bongs.html":
            filterProducts(arrayProductsdb,"bongs")
            break;

        case "/pages/encendedores.html":
            filterProducts(arrayProductsdb,"encendedores")
            break;    

        case "/pages/products.html":
            mapProducts(arrayProductsdb)
            break;    
    
        default:
            break;
    }
    console.log(respuesta);
};

requestProducts();

const filterProducts = (arr,category) => {
    const filtrados = arr.filter( item => item.category == category);
    mapProducts(filtrados)
}

const mapProducts = (arr) => {

    const containerProducts = document.querySelector(".containerProducts")

    arr.map(item => {
        
        containerProducts.innerHTML +=  `
            
            <div class="cardProducts">
                <img src=${item.image} class="imgProducts" alt="">
                <h2>${item.product}</h2>
                <p>${item.price}</p>
                <button class="buttonAdd" id=${item.id}>Agregar al carrito</button>
            </div>
                
        `
        const buttonAdd = document.querySelectorAll(".buttonAdd")
        for (let i = 0; i < buttonAdd.length; i++) {
            buttonAdd[i].addEventListener("click", (e) =>  addToCart(e.target.id))
            
        }
    })
}

const arrayProductsAgregados =JSON.parse( localStorage.getItem("arrayProductsAgregados")) || [];

const addToCart = (param) => {

    const filter = arrayProductsdb.find( e => e.id == param)
    const duplicado = arrayProductsAgregados.findIndex(item => item.id === filter.id)
    console.log(duplicado  );
    if (duplicado === -1 ) {
        const newItemCart = new Carrito (filter.id, filter.category,filter.product, filter.price, filter.image, 1)
        arrayProductsAgregados.push(newItemCart)
        console.log(arrayProductsAgregados);
    }else{
        arrayProductsAgregados[duplicado].cantidad += 1
    }
    localStorage.setItem("arrayProductsAgregados",JSON.stringify(arrayProductsAgregados))
    
}

