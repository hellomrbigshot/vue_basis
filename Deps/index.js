/**
 * 响应式系统的依赖手机追踪
*/

// 订阅者 Dep
// 用来存放 Wathcer 观察者对象
class Dep {
    constructor () {
        /* 用来存放 Watcher 对象的数组 */
        this.subs = [];
    }

    /* 在 subs 中添加一个 Watcher 对象 */
    addSub (sub) {
        this.subs.push(sub);
    }

    /* 通知所有 Watcher 对象更新视图 */
    notify () {
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}
/*
 * 1. 用 addSub 方法在 Dep 对象中添加一个 Watcher 的订阅操作
 * 2. 用 notify 方法通知目前 Dep 对象的 subs 中所有的 Watcher 对象触发更新操作 
*/

// 观察者 Watcher
class Watcher {
    constructor () {
        /* 在 new 一个 Watcher 对象时将该对象赋值给 Dep.target, 在 get 中会用到 */
        Dep.target = this;
    }
    /* 更新视图的方法 */
    update () {
        console.log('视图更新');
    }
}

Dep.target = null;


// 依赖收集
function defineReactive (obj, key, val) {
    /* 一个 Dep 类对象 */
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            /*   */
        }
    })
}