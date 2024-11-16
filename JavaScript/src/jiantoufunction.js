// function add(num1,num2){
//     // console.log(num1+num2)
//     return num1 + num2

// }

// result = add(1,2)
// console(result)
// console.log(add(1,23))

// let add = function(num1,num2){
//     return num1+num2
// }

// console.log(add(3,4))

// let add = (num1,num2)=>{
//     return num1+num2;
// }
// console.log(add(1,2))

// let add = (num1, num2) => (num1 + num2);
// console.log(add(1, 2));

// let sum = ()

let result = 0;

function sum() {
  for (let i = 0; i <= 10; i++) {
    result += i;
  }
  return result;
}
console.log(sum());

let add = (num1, num2) => num1 + num2;

let calculate = (max) => {
  let result = 0;
  for (let i = 0; i <= max; i++) {
    result += i;
  }
  return result;
};
console.log(calculate(20));
