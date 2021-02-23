[toc]



# 说一下事件循环机制

JavaScript有一个基于事件循环的并发模型，事件循环负责执行代码、收集和处理事件以及执行队列中的子任务。

运行时可视化描述：

![Stack, heap, queue](https://mdn.mozillademos.org/files/17124/The_Javascript_Runtime_Environment_Example.svg)



## 一、为什么会有Event Loop？

JavaScript的任务分为两种：同步和异步。**同步任务**是直接放在主线程上排队依次执行，**异步任务**会放在任务队列中，若有多个异步任务则需要在任务队列中排队等待，任务队列类似于缓冲区，任务下一步会被移到调用栈然后主线程执行调用栈的任务。

> 调用栈：调用栈是一个栈结构，函数调用会形成一个栈帧，帧中包含了当前执行函数的参数和局部变量等上下文信息，函数执行完后，它的执行上下文会从栈中弹出。

JavaScript是单线程的，单线程是指JS引擎中解析和执行js代码的线程只有一个（主线程），每次只能做一件事情。ajax请求中，主线程在等待响应的过程中回去做其他事情，浏览器先在事件表注册ajax的回调函数，响应回来后回调函数被添加到任务队列中等待执行，不会造成线程阻塞，所以说js处理ajax请求的方式是异步的。

综上所述，检查调用栈是否为空以及将某个任务添加到调用栈中的过程就是event loop，这就是JavaScript实现异步的核心。

## 二、浏览器中的Event Loop

### 2.1 microtask和macrotask

浏览器端事件循环中的异步队列有两种：macro（宏任务）队列和micro（微任务）队列。

常见的macrotask：setTimeout、setInterval、script（整体代码）、I/O操作、UI渲染等。

常见的microtask：new Promise().then(callback)、MutationObserve等。

### 2.2 requestAnimationFrame

requestAnimationFrame也属于异步执行的方法，但该方法既不属于宏任务，也不属于微任务。按照MDN中的定义：

> window.requestAnimationFrame()告诉浏览器--你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调参数更新动画。该方法需要传入一个回调函数作为参数，该回调参数会在浏览器下一次重绘之前执行。

requestAnimationFrame是GUI渲染之前执行，但在Microtask之后，不过requestAnimationFrame不一定会在当前帧必须执行，由浏览器根据当前的策略自行决定在哪一帧执行。

### 2.3 event loop过程

![image-20210222172058764](/Users/lishu/Library/Application Support/typora-user-images/image-20210222172058764.png)

1. 检查macrotask队列是否为空，非空则到2，为空则到3
2. 执行macrotask队列中的一个任务
3. 继续检查microtask队列是否为空，若有则到4，否则到5
4. 取出microtask队列中的任务，执行完成返回到步骤3
5. 执行视图更新

> 当某个宏任务执行完后，会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，会读取宏任务队列中排在最前的任务，执行宏任务的过程中，遇到微任务，依次加入微任务队列。栈空后，再次读取微任务队列里的任务，依次类推。



## 三、Node中的Event Loop

Node中的Event Loop和浏览器中的是完全不相同的东西。Node.js采用V8作为js的解析引擎，而IO处理方面使用了自己设计的libuv。libuv是一个基于事件驱动的跨平台抽象层，封装了不同操作系统的一些底层特性，对外提供统一的API，事件循环机制也是它里面的实现。

![image-20210221162704832](/Users/lishu/Library/Application Support/typora-user-images/image-20210221162704832.png)

根据上图node的运行机制如下：

1. V8引擎解析JavaScript脚本。
2. 解析后的代码，调用Node API。
3. libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
4. V8引擎再将结果返回给用户。

### 3.1 六大阶段

其中libuv引擎中的事件循环分为6个阶段，他们会按照顺序反复运行。每当进入某一阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

![image-20210221165101249](/Users/lishu/Library/Application Support/typora-user-images/image-20210221165101249.png)



1. timers阶段：这个阶段执行timer（）的回调，并且是由poll阶段控制的。
2. I/O callbacks阶段：处理一些上一轮循环中的少数未执行的I/O回调。
3. idle,prepare阶段：仅node内部使用
4. poll阶段：获取新的I/O事件，适当的条件下Node将阻塞在这里
5. check阶段：执行setImmediate()的回调
6. close callbacks阶段：执行socket的close事件回调

### 3.2 NodeJS中宏队列主要有4个

1. Timers Queue
2. IO Callbacks Queue
3. Check Queue
4. Close Callbacks Queue

这4个都属于宏队列，但是在浏览器中，可以认为只有一个宏队列，所有的macrotask都会被加到这一个宏队列中，但是在NodeJS中，不同的macrotask会被放置在不同的宏队列中。

### 3.3NodeJS中微队列主要有2个

1. Next Tick Queue：放置process.nextTick(callback)的回调任务的
2. Other Micro Queue：放置其他的microtask，比如Promise等

在浏览器中，也可以认为只有一个微队列，所有的microtask都会被加到这一个微队列中，但是在NodeJS中，不同的microtask会被放置在不同的微队列中。

### 3.4 NodeJS中的Event Loop过程

1. 执行全局script的同步代码
2. 执行microtask微任务，先执行所有Next Tick Queue中的所有任务，再执行Other Microtask Queue中的所有任务
3. 开始执行macrotask宏任务，共6个阶段，从第1个阶段开始执行相应每一个阶段macrotask中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的Event Loop中是只取宏队列的第一个任务出来执行，每一个阶段的macrotask任务执行完毕后，开始执行微任务，也就是步骤2
4. Timers Queue -> 步骤2 -> I/O Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback Queue  -> 步骤2 -> Timers Queue......
5. 这就是Node的Event Loop

### 3.5 Node 11.x新变化

现在node11在timer阶段的setTimeout,setInterval...和在check阶段的immediate都在node11里面修改为一旦执行一个阶段里的一个任务就立刻执行微任务队列。和浏览器更加趋同。

# 面试题1

```JavaScript
const fs = require('fs');
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log(1);
  },0);
  setImmediate(() => {
    console.log(2);
  });
});

// 2,1
```





# 面试题2

```JavaScript

```

