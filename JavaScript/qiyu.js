// let numbers = [1,2,3,4,5];
// let  [d1,d2,...data]=numbers;
// console.log(data)



// function add(d1,d2,...data){
//     console.log(d1,d2)
//     console.log(data)

// }

// add(1,2,3,4,4,5,6,6,67,7,7)

// let [n1,n2,n3,...data] = [2,3,4,4,5,5,6,6,4]
// console.log(n1,n2,n3,data)

// let {x,y,...obj} = {x:3,y:4,z:6,q:5,w:6}
// console.log(x,y,obj)

// function add(n1,n2,...data){
//     console.log(n1,n2,data)
// }
// add(1,2,3,4,45,5,6,6,)

function add (n1,n2,...args){
    console.log(n1,n2,args)
    tatal = n1+n2;
    for(let i = 0;i < args.length;i++){
        tatal = tatal+args[i]
    }
    console.log(tatal)
}

export default add;