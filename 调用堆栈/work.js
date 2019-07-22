var needTime;
// console.time(needTime);

setTimeout(function() {
  // console.timeEnd(needTime);
  console.log(1);
}, 1000);

fo(42);
console.log(2);

setTimeout(function() {
  console.log(3);
});

new Promise(function(resolve) {
  console.log(4);
  resolve();
}).then(function() {
  console.log(5);
});

setTimeout(function() {
  console.log(6);
});

function fo(num) {
  return num <= 2 ? 1 : fo(num - 1) + fo(num - 2);
}
