class VNode {
    constructor (tag, data, children, text, elm) {
        /* 当前节点的标签名 */
        this.tag = tag;
        /* 当前节点的数据信息，如 props, attrs 等数据 */
        this.data = data;
        /* 当前节点的子节点，是一个数组 */
        this.children = children;
        /* 当前节点的文本 */
        this.text = text;
        /* 当前虚拟节点对应的真实 dom 节点 */
        this.elm = elm;
    }
}

/***
 * 用 VNode 描述以下 Vue 组件
 * <template>
 *   <span class="demo" v-show="isShow">
 *     This is a span.
 *   </span>
 * </template>
*/
function render () {
    return new VNode(
        'span',
        {
            /* 指令集合数据 */
            directives: [
                {
                    /* v-show 指令 */
                    rawName: 'v-show',
                    expression: 'isShow',
                    name: 'show',
                    value: true
                }
            ],
            /* 静态 class */
            staticClass: 'demo'
        },
        [ new VNode(undefined, undefined, undefined, 'This is a span.') ]
    );
}

const node = new VNode()
/**
 * {
 *   tag: 'span',
 *   data: {
 *     directives: [
 *       {
 *         raowName: 'v-show',
 *         express: 'isShow',
 *         name: 'show',
 *         value: true
 *       }
 *     ],
 *     staticClass: 'demo'  
 *   },
 *   text: undefined,
 *   children: [
 *     tag: undefined,
 *     data: undefined,
 *     children: undefined,
 *     text: 'This is a span.'
 *   ]
 *   
 * }
 * 
*/

// 封装 VNode，实现一些产生常用 VNode 的方法

// 创建一个空节点
function createEmptyVNode () {
    const node = new VNode()
    node.text = '';
    return node;
}

// 创建一个文本节点
function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val));
}

// 克隆一个 VNode 节点
function cloneVNode (node) {
    const cloneVnode = new VNode(
        node.tag,
        node.data,
        node.children,
        node.text,
        node.elm
    );
    return cloneVnode;
}