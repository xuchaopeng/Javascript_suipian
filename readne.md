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
浏览器支持
Opera 11+
Firefox 3.6+
Safari 5+
Chrome 8+
Internet Explorer 9+
//https://www.zhangxinxu.com/study/201304/es5-array.js
