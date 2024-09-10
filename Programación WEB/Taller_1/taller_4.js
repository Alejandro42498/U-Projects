const users = [
    { name: "Carlos", age: 20 },
    { name: "Juana", age: 17 },
    { name: "Oliver", age: 25 },
    { name: "Katherine", age: 30 },
];

function operations(users) {
    return users
        .filter(user => user.age >= 18) 
        .map(user => ({
            ...user,                        
            ageInDays: user.age * 365       
        }));
}

const result = operations(users);

console.log(result);

/* Respuesta más organizada, pero no sé si no se podía.
console.log("Usuarios de 18 años o más y su edad en días:");
result.forEach(user => {
    console.log(`Nombre: ${user.name}, Edad: ${user.age}, Edad en Días: ${user.ageInDays}`);
});
*/