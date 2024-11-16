let boss = {
  firstName: "Musk",
  lastName: "Elon",
};

let proxy = new Proxy(boss, {
  get: function (target, property) {
    if (property == "chineseName") {
      return target.lastName + target.firstName;
    } else {
      return target[property];
    }
  },
});

console.log(proxy.chineseName);
console.log(proxy.firstName);
