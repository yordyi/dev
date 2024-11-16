let data = {
  price: 300,
  count: 3,
};

let proxy = new Proxy(data, {
  get: function (target, property) {
    if (property === "total") {
      return target.price * target.count;
    } else {
      return target[property];
    }
  },
});





console.log("总价:",proxy.total);
console.log("单价:",proxy.price)
