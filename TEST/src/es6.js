// const Test0 = () => {
//   const [x, p] = 'xcppp';
//   console.log(`string text line 1
// string text 
// line 2`);
//   function say(something) {
//     console.log('she say' + " '" + something + "'");
//   }
//   say`hello`;
//   //解构
//   let [a, b, c] = [1, 2, 3];
//   let { x1, x2 } = { x2: 5, x1: 6 };
//   console.log(b, x1);
//   //展开运算
//   const alp = { first: 'a', second: 'b' };
//   const ccc = { ...alp, three: 'c' };
//   const cca = { ...alp, ...ccc };
//   console.log(ccc, 'cccc', cca);
//   const blp = [1, 2, 3, 4];
//   const bbb = [...blp, ...blp];
//   console.log(bbb);
//   const clp = {
//     ac: 'name',
//     bc: 'cpm',
//     cc: '360'
//   };
//   const { ac, ...other } = clp;
//   console.log(other);
//   for (let index of ['a', 'b'].keys()) {
//     console.log(index);
//   }
// };
// (function() {
//   return;
//   const map = new Map([['name', '张三'], ['name', '张三'], ['name', '张三'], ['title', 'Author']]);
//   console.log(map.get('title'));
//   console.log(map);
// })();
// var handler = {
//   get: function(target, name) {
//     if (name === 'prototype') {
//       return Object.prototype;
//     }
//     return 'Hello, ' + name;
//   },
//   //拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)
//   apply: function(target, thisBinding, args) {
//     return args[0];
//   },
//   //拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)
//   construct: function(target, args) {
//     return { value: args[1] };
//   }
// };

// var fproxy = new Proxy(function(x, y) {
//   console.log(x, y);
//   return x + y;
// }, handler);
// console.log(fproxy(1, 2));
// console.log(new fproxy(1, 2));
function* creatUid() {
  const u = yield Math.random().toString(10).substring(2, 6);
  return +new Date() + u;
}
console.log(creatUid())
