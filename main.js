

const loadCategory = async () => {

const categoryProducts = document.querySelector("#categoryProducts")
    
const peticion = await fetch("category.json")
const respuesta = await peticion.json()

for (let i = 0; i < respuesta.length; i++) {
    
    categoryProducts.innerHTML += `
    <div class="ccontainerCategory">
        <button class="categoryItem btn-changePath" value="${respuesta[i]}" id="btn${respuesta[i]}">${respuesta[i]}</button>
    </div>
`
}

const button = document.querySelectorAll(".categoryItem")

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", (e) =>{
    let path =  e.target.value;
    location.href =  `./pages/${path}.html`
    
    })
    
}
}

loadCategory() /// evento load quizas















