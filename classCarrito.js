
class Carrito {
    constructor (id, category, product, price, image,cantidad){
        this.id = id;
        this.category = category; 
        this.product = product;  
        this.price = price;
        this.image = image;
        this.cantidad = cantidad;
    }

    addQ(params) {
        return this.cantidad += params
    };

    
    subtractQ(params) {
        return this.cantidad -= params
    }
} ;

export {Carrito}
