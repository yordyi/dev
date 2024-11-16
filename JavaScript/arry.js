// let arr = [];
// let arr2 = [6,7,8,9,10]
// arr.push(3,4,5);
// console.log(arr);
// let index = arr.at(2)
// console.log(index)
// arrsum=arr.concat(arr2)
// console.log(arrsum)
// console.log(arr.length)

let arr = [3,4];
arr.push(0,1,5,6,7);
// arr.sort()
// console.log(arr)
// console.log(arr[1])
// console.log(arr[2])
// console.log(arr.length)
let sum=0;
for (let i =0;i<arr.length;i++){
    sum = arr.sort()[i] + sum
    // console.log(sum)
}
let avg = sum/arr.length
console.log(sum)
console.log(avg)
