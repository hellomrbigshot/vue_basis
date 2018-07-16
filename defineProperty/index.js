/**
 * Vue.js 基于 Object.defineProperty 实现响应式系统
 */
/**
 * obj: 目标对象
 * prop: 需要操作的目标对象属性名
 * descriptor: 描述符
 * return value 传入对象
*/
Object.defineProperty(obj, prop, descriptor)

// 渲染视图方法 cb
function cb (val) {
    /* 渲染视图 */
    console.log('视图更新')
}

// 单个属性响应化函数
function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true, /* 属性可枚举 */
        configurable: true, /* 属性可被修改或删除 */
        get: function reactiveGetter() {
            return val;
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            cb(newVal); // 如果数据改变，则更新视图
        }

    })
}

// 整个对象响应化函数
function observer (value) {
    if (!value || typeof value !== 'object') {
        return;
    }
    Object.keys(value).forEach(key => {
        defineReactive(value, key, value[key])
    })
}

// 添加递归
function observer (value) {
    if (!value || typeof value !== 'object') {
        return;
    }
    Object.keys(value).forEach(key => {
        if (typeof value[key] === 'object') {
            observer(value[key]);
            return;
        }
        defineReactive(value, key, value[key])
    })
}

// 用 observer 封装一个 Vue
class Vue {
    /* Vue 构造类 */
    constructor (options) {
        this._data = options.data;
        observer(this._data);
    }
}

// 使用 Vue
let o = new Vue({
    data: {
        test: 'this is a test'
    }
});
o._data.test = 'hell world!'; /* 视图更新 */