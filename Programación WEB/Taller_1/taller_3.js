
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function operations(arr) {
    return arr
        .filter(num => num % 2 === 0)  
        .map(num => num * 2);          
}


const result = operations(numbers);


console.log(result);  
