let products = [
    {
        id_product: 1,
        product_name: "Camiseta",
        product_price: 50000,
        product_quantity: 89
    },
    {
        id_product: 2,
        product_name: "Pantalón",
        product_price: 90000,
        product_quantity: 44
    },
    {
        id_product: 3,
        product_name: "Chaqueta",
        product_price: 160000,
        product_quantity: 23 
    },
    {
        id_product: 4,
        product_name: "Correa",
        product_price: 80000,
        product_quantity: 104 
    }
];

function productDetails(products) {
   
    const productsMap = products.map(product => ({
        ...product,  
        totalValue: product.product_price * product.product_quantity 
    }));

    
    const productsPrices = products.reduce((acc, product) => acc + product.product_price, 0);

    
    const productsQuantity = products.reduce((acc, product) => acc + product.product_quantity, 0);

   
    const topPrice = products
        .slice() 
        .sort((a, b) => b.product_price - a.product_price)[0]; 

    
    return {
        productsPrices,  
        productsQuantity,  
        topPrice: {  
            product_name: topPrice.product_name,
            product_price: topPrice.product_price,
            product_quantity: topPrice.product_quantity
        }

    };
}

const result = productDetails(products);

console.log(result);


/* Respuesta más organizada, pero no sé si no se podía.
console.log("Resumen de productos:");
console.log(`Suma total de precios: $${result.productsPrices}`);
console.log(`Cantidad total de productos: ${result.productsQuantity}`);
console.log("");
console.log("Producto más costoso:");
console.log(`Nombre: ${result.topPrice.product_name}`);
console.log(`Precio: $${result.topPrice.product_price}`);
console.log(`Cantidad: ${result.topPrice.product_quantity}`);
*/

/** Expected result: 
 * // { totalPrice: 170, totalQuantity: 10, mostExpensiveProduct: { product_name: "Chaqueta", product_price: 160000, product_quantity: 44 } }
 
Según no que pedía el enuncuiano no podría dar este resultado, lo dejé con el que considero correcto.
* */