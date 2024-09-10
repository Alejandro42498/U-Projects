
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

function operations(arr) {
    return arr
        .filter(product => product.product_price > 70000 && product.product_quantity < 100)
        .map(product => {
            
            const iva = product.product_price * 0.19;
            const ivaTotal = product.product_price + iva;
            return {
                ...product,  
                product_iva_value: iva,  
                product_total_value: ivaTotal,  
            };
        });
}

const result = operations(products);

console.log({result})

/* Respuesta más organizada, pero no sé si no se podía.
console.log("Productos filtrados y con valores calculados:");
result.forEach(product => {
    console.log(`ID: ${product.id_product}`);
    console.log(`Nombre: ${product.product_name}`);
    console.log(`Precio: $${product.product_price}`);
    console.log(`Cantidad: ${product.product_quantity}`);
    console.log(`Valor del impuesto (19%): $${product.product_tax_value}`);
    console.log(`Valor total (Precio + Impuesto): $${product.product_total_value}`);
    console.log(''); // Línea en blanco para separar los productos
});
*/