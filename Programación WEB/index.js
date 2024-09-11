let firstname = "Alejandro"
console.log (firstname)

let age = 28
console.log(age)

console.log(typeof age)
console.log(typeof firstname)

let saludar = function(){

console.log ("Hola desde una función")

}

console.log(saludar)

let estudiantes = ["pepe", "maría", "lucía"];
console.log(estudiantes)
for (let i = 0; i < estudiantes.length; i++){
    console.log (estudiantes[i])

}

console.log("---")
estudiantes.forEach(function(estudiantes){
    console.log(estudiantes)
})

console.log("---")
console.log("map")
let estudiantesMayuscula = estudiantes.map(function(estudiantes){
    return estudiantes.toUpperCase()

})

console.log(estudiantesMayuscula)

//mdn array
// map, filter reduce 

/*function colocarEnMayuscula(cadena, index, arreglo){
    console.log("CurrentValue:",cadena)
    console.log("Index:",index)
    console.log("Array:",arreglo)
    return cadena.toUpperCase()
}

console.log(colocarEnMayuscula("hola"))

let estudiantesMayuscula = estudiantes.map(colocarEnMayuscula)
    console.log(estudiantesMayuscula)
*/

let numeros =[]
for (let i = 2; i<= 30; i++){
    numeros.push(i)


}


console.log("Arreglo original: ", numeros)

//filtrar los pares

let numerosPares = numeros.filter(function(numeros){
    return numeros % 2 === 0 

})

console.log("Arreglo origina: ", numerosPares)


