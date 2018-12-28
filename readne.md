> ### 闭包

#### 闭包是什么

- 闭包是一个拥有许多变量和绑定了这些变量的环境的表达式。

* 闭包是嵌套的内部函数,包含被引用的变量的对象，存在于嵌套的内部函数中

#### 闭包产生的条件

- 函数嵌套，内部函数引用了外部函数的数据(变量/函数)

#### 常见闭包

- 将函数作为另一个函数的返回值
- 将函数作为实参传递给另一个函数调用

#### 闭包的作用

#### 闭包的生命周期

在嵌套内部函数定义执行完成就产生了,死亡在嵌套内部函数产生垃圾对象时

#### 闭包引用 自定义模块

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
```

#### 闭包之内存溢出与内存泄露

1、内存溢出，即程序运行需要内存超过剩余的内存,导致内存溢出的错误

```
var obj = {};
for(var i; i < 10000; i++){
  obj[i] = new Array(10000000)
}
```

2、内存泄露，即占用的内存没有及时释放。内存泄露积累过多容易导致内存溢出

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

1、forEach 数组中的每一项做一件事

```
[1,2,3].forEach(function(item,index){
  return item*4;
})
```

2、map 让数组通过某种计算产生新的数组

3、filter 刷选出数组中符合添加的项

4、reduce 让数组的前后项做某种计算

5、every 检测数组中的每一项是否符合条件

6、some 检测数组中的某一项是否符合条件
7、indexOf
8、lastIndexOf
9、reduceRight
**浏览器支持**
Opera 11+ Firefox 3.6+ Safari 5+ Chrome 8+ Internet Explorer 9+
[兼容 ie6-8](https://www.zhangxinxu.com/study/201304/es5-array.js)

> ### 调用堆栈

###概念

- **调用栈** ： 这是代码执行的地方。例如：运行一个函数,它会将其放到栈顶，当返回时，就会将这个函数从栈顶弹出。
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
- **内存堆** ：这是内存分配发生的地方
  ![内存堆](https://user-gold-cdn.xitu.io/2017/11/11/5d0653fff3ec904dbe210161f3ec9196?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
  **待定---执行上下文-创建阶段/执行阶段**
  **待定---词法环境/变量环境**
  ```
  var a = a;
  const b = b;
  //在创建阶段，引擎检查代码找出变量和函数声明，但是变量最初设置为undefined(var 的情况下)，但let cosnt并未初始化值(直到引擎在代码中找到实际声明位置找到let const变量的值,它才会赋值或undefined)。
  ```

### runtime

![javascript运行](https://static.oschina.net/uploads/space/2017/1213/104047_yNc9_2896879.png)

### javascript 事件循环

概念：

**macro-task(宏任务):** 包括整体代码 script，setTimeout，setInterval
**micro-task(微任务):** Promise，process.nextTick

```
setTimeout(function() {
    console.log('setTimeout');
})

new Promise(function(resolve) {
    console.log('promise');
}).then(function() {
    console.log('then');
})
console.log('console');
```

- 这段代码作为宏任务，进入主线程。
- 先遇到 setTimeout，那么将其回调函数注册后分发到宏任务 Event Queue。(注册过程与上同，下文不再描述)
- 接下来遇到了 Promise，new Promise 立即执行，then 函数分发到微任务 Event Queue。
- 遇到 console.log()，立即执行。
- 整体代码 script 作为第一个宏任务执行结束，看看有哪些微任务？我们发现了 then 在微任务 Event Queue 里面，执行。
- 第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务 Event Queue 开始。我们发现了宏任务 Event Queue 中 setTimeout 对应的回调函数，立即执行。

**关系图**
![事件循环关系图](https://user-gold-cdn.xitu.io/2017/11/21/15fdcea13361a1ec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**代码分析**

```
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})

new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```

**小结：**

- 事件循环是 js 实现异步的一种方法，也是 js 的执行机制
- javascript 是一门单线程语言
