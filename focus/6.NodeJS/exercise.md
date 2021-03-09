# nodejs中的事件循环

## 1 关于libuv执行过程

```js
const fs = require('fs');

fs.readFile(filename, (err, data) => {
  setTimeout(() => {
    console.log('1');
  }, 0);
  setImmediate(() => {
    console.log('2');
  });
});

```

libuv中的执行过程

```js

//                 ------------
//     -------->  |   timers   |   检查过期的setTimeout在这里执行
//    |            ------------
//    |                 |
//    |        ----------------------
//    |       |   pengding callbacks |  TCP的回调可能在这个阶段执行
//    |        ----------------------
//    |                 |
//    |         ----------------
//    |        |  idle, prepare |  内部调用
//    |         ----------------
//    |                 |                           ______________
//    |               ------                       |  incoming:   |
//    |              | poll |  <-------------------| connections, |
//    |               ------                       |  data, etc.  |
//    |                 |                           --------------
//    |              --------
//    |             |  check |  检查执行setImmediate
//    |              --------
//    |                 |
//    |          -------------------
//    |         |  close callbacks  |  
//    |          -------------------
//    |-----------------|
//  
/**
 * 1. poll不是空，执行完受系统控制
 * 2. poll已经为空
 * 2-1. 如果里面有setImmediate，直接到check阶段
 * 2-2. 如果里面有过期的timers，直接进入到timers阶段
 * （所以说其实是poll阶段控制timers什么时候执行，具体的执行位置在timers阶段）
 * 3. 如果什么都没有了，poll会进入一个等待阶段（阻塞），poll会有一个一直检查是否活着的方式，最终阶段poll不会进入新的东西了，整个就结束了。
 * 
 * 
 * poll怎么知道timers什么时候过期呢？
 * 观察者（负责将事件分类）：idle观察者、IO观察者、check观察者
 * 
 * 
 * 
 * /


```