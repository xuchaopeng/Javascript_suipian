> ## 调用堆栈

**引言**
```
var needTime;
console.time(needTime);

setTimeout(function() {
  console.timeEnd(needTime);
  console.log(1);
}, 1000);

console.log(2);

setTimeout(function() {
  console.log(3);
});

new Promise(function(resolve) {
  console.log(4);
  reslove();
}).then(function() {
  console.log(5);
});

setTimeout(function() {
  console.log(6);
});

function fo(num) {
  return num <= 2 ? 1 : fo(num - 1) + fo(num - 2);
}
//以上代码的输出顺序
```

#### 需要了解的几个概念

- **调用栈**  这是代码执行的地方。例如：运行一个函数,它会将其放到栈顶，当返回时，就会将这个函数从栈顶弹出。
  ```
    function multiply(x, y) {
      return x * y;
    }
    function printSquare(x) {
      var s = multiply(x, x);
      console.log(s);
    }
    printSquare(5);
  ```
  ![调用栈](https://user-gold-cdn.xitu.io/2017/11/11/bc37a6231fca3b0aa3cd36369e866837?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- **内存堆** 内存分配发生的地方
  ![内存堆](https://user-gold-cdn.xitu.io/2017/11/11/5d0653fff3ec904dbe210161f3ec9196?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

  ```
  var a = a;
  const b = b;
  //在创建阶段，引擎检查代码找出变量和函数声明，但是变量最初设置为undefined(var 的情况下)，但let cosnt并未初始化值(直到引擎在代码中找到实际声明位置找到let const变量的值,它才会赋值或undefined)。
  ```
* **同步任务、异步任务** Javascript是一门单线程语言。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

#### Event Loop(事件循环)
**JS解析引擎执行机制**
* 同步、异步任务分别进入不同的场所；
* 同步进入主线程；
* 异步进入Event Table并注册回调函数,指定事情完成时，Event Table将函数移入Event Queue；
* 主线程内任务执行完毕为空，会从Event Queue读取对应的函数，进入主线程执行；
* 已上过程的不断重复，就是常说的Evnet Loop（事件循环）；
  
**思维导图**
![导图](https://user-gold-cdn.xitu.io/2017/11/21/15fdd88994142347?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**结合代码**
```
console.log('代码执行开始');
setTimeout(function () {
  console.log('发送成功');
}, 1000);
console.log('代码执行结束');
```

- 这段代码作为宏任务，进入主线程。
- 遇到console.log('代码执行开始')，立即执行。
- 遇到 setTimeout进入Event Table，并注册回调函数。
- 执行console.log('代码执行结束') 。
- 1s后，setTimeout回调函数进入Event Queue,主线程从Event Queue读取回调函数并执行。

### setTimeout、setInterval
* setTimeout延时1s,并不是真的1s执行回调。
```
var time1;
<!-- console.time(time1); -->
setTimeout(function () {
  console.log('setTimeout');
  <!-- console.timeEnd(time1); -->
}, 1000);
function fo(num) {
  return num <= 2 ? 1 : fo(num - 1) + fo(num - 2);
}
fo(40);
```
* 一旦setInterval的回调函数fn执行时间超过了延迟时间ms，那么就完全看不出来有时间间隔了。
```
function fn1() {
  console.log('setInterval');
}
setInterval(fn1, 1000);
```
### Promise

**概念**

* 宏任务: 包括整体代码script，setTimeout，setInterval;
* 微任务：Promise，process.nextTick;
* 不同类型的任务会进入对应的Event Queue，比如setTimeout和setInterval会进入相同的Event Queue。事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。
  
**结合代码**
```
setTimeout(function () {
  console.log('setTimeout');
});

new Promise(function (resolve) {
  console.log('promise');
}).then(function () {
  console.log('then');
});

console.log('console');
```

| 宏任务Event Queue | 微任务Event Queue |
| ----------------- | ----------------: |
| setTimeout1       |             then1 |
| setTimeout2       |             then2 |

* 1、这段代码作为宏任务，进入主线程。 先遇到setTimeout，那么将其回调函数注册后分发到宏任务Event Queue。(注册过程与上同，下文不再描述) 
* 2、接下来遇到了Promise，new Promise立即执行，then函数分发到微任务Event Queue。 
* 3、遇到console.log()，立即执行。
* 4、整体代码作为第一个宏任务执行结束，看看有哪些微任务？我们发现了then在微任务Event Queue里面，执行。
* 5、至此，第一轮事件循环结束了。我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中setTimeout对应的回调函数，立即执行。

### 小结

- 事件循环是js实现异步的一种方法，也是js的执行机制。
- javascript 是一门单线程语言。


> ### 闭包

#### 1、闭包是什么

* 闭包是嵌套的内部函数,包含被引用的变量的对象，存在于嵌套的内部函数中。
* 闭包在本质上，是将函数内部和函数外部连接起来的桥梁。

#### 2、常见闭包

- 将函数作为另一个函数的返回值
```
function fn1() {
  var a = 10 ;
  return function () {
    a++;
    console.log(a);
  }
}
var fn = fn1();
fn();
fn();
```
- 将函数作为实参传递给另一个函数调用
```
function fn2(callback) {
  var a = 10 ;
  callback();
}
function fn3 () {
  console.log(a)
}
fn2(fn3)
```

#### 3、闭包的作用
闭包是靠作用域链来实现的

#### 4、闭包的生命周期

在嵌套内部函数定义执行完成就产生了,死亡在嵌套内部函数产生垃圾对象时

#### 5、闭包引用 自定义模块

```
var module = (function() {
  function a() {
    console.log('a');
  }
  function b() {
    console.log('b');
  }
  return {
    a: a,
    b: b
  };
})();
//在你不用框架时， 
```

#### 7、闭包之内存溢出与内存泄露

* **内存溢出**，即程序运行需要内存超过剩余的内存,导致内存溢出的错误

```
var obj = {};
for(var i; i < 10000; i++){
  obj[i] = new Array(10000000)
}
```

* **内存泄露**，即占用的内存没有及时释放。内存泄露积累过多容易导致内存溢出

```
//没有及时清理的计时器或回调函数
var t = 0,timer = null ;
timer = setInterval(function(){
  t++;
  console.log('计时器')
  if(t >= 20){
    clearInterval(timer)
  }
},1000)

//闭包
function fn1() {
  var arr = new Array(100);
  return function () {
    console.log(arr.length)
  }
}
var f = fn1();
f();
f = null;

//意外的全局变量
function fn2() {
  a = new Array(100)
  console.log(a);
}
```

> ### 高阶函数

#### 概念
一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数

#### 常用的几个高阶函数

* **forEach** 数组中的每一项做一件事
```
var arr = ['a','b','c'];
arr.forEach(function(item,index,arry){
  console.log(arguments);
  console.log(this)
},arr)
//参数 回调函数  执行回调函数用作指定this的值
//返回值  undefined
//注意: 1、没办法终止或跳出forEach循环;2、 箭头函数表达式传入函数参数,thisArg参数会被忽略，
//因为箭头函数在词法上绑定了this值;3、数组在迭代时被修改,其它元素会被跳过;
var arr1 = ['one','two','three'];
arr1.forEach(function(item){
  console.log(item)
  if(item === 'two'){
    arr1.shift();
  }
})
```

* **map** 让数组通过某种计算产生新的数组
```
var arr2 = [1,3,5];
const map2 = arr2.map(function(item,index,arr){
  return item*2
})
console.log(map2);
//参数 回调函数 指定上下文
//返回值  回调函数执行结果组成的一个新数组，不改变原数组（可以在回调中改变）
//注意: 1、map方法处理数组时,数组元素范围在callback方法第一次调用前就确定了。
//在map执行中：原数组增加元素将不会被callback访问;已经存在的元素被改变，
//则它们传递到callback的值就为map遍历到它们那一时刻的值;被删除的元素将不会被访问到;
['1','2','3'].map(parseInt);
```

* **filter** 刷选出数组中符合添加的项
```
var arr3 = [7,40,50,2,10,6];arr3.filter(function(item,index,arr){
  return item >= 10
})
 //[40, 50, 10]
//参数 callback  thisArg（指定回调的上下文）
//注意:  1、不改变原数组,返回过滤的新数组；2、filter遍历执行中的规则，如上;
```

* **reduce** 让数组的前后项做某种计算
```
const arr4 = [1,2,3,4];
const reducer = (prev,next) => prev+next;
arr4.reduce(reducer)
//参数  callback initialValue(作为第一次调用 callback函数时的第一个参数的值)
//callback 上一次的累计值 当前值 当前索引值 源数组
//返回值  累计处理的结果
//注意： 如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。
arr4.reduce(reducer,10)
//二维数组转为一维数组
[[0, 1], [2, 3], [4, 5]].reduce(
  function(a, b) {
    return a.concat(b);
  },
  []
);
//计算数组中每个元素出现的次数
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
```

* **every** 检测数组中的每一项是否符合条件
```
var arr5 = [1, 30, 39, 29, 10, 13];
arr5.every(cur => cur > 20)
//参数 callback thisArg
//返回值 所有元素都符合条件才返回true,否则返回false,空数组也返回true
```

* **some** 检测数组中的某一项是否符合条件
```
var arr6 = [1, 30, 39, 29, 10, 13];
arr6.every(cur => cur > 20)
//参数与every一致
//返回值 如果回调函数返回值，存在为true，则返回true;否则为false。
```
**浏览器支持**
Opera 11+ Firefox 3.6+ Safari 5+ Chrome 8+ Internet Explorer 9+
[兼容 ie6-8](https://www.zhangxinxu.com/study/201304/es5-array.js)


