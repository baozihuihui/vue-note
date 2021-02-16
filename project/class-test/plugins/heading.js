// 插件需要实现install
const MyPlugin = {
  install(Vue, options) {
    // heading组件
    // <heading :level="1" :title="title" icon="cart">{{title}}</heading>
    // <h2 title=""></h2>
    Vue.component('heading', {
      props: {
        level: {
          type: String,
          required: true
        },
        title: {
          type: String,
          default: ''
        },
        icon: {
          type: String
        }
      },
      render(h) {
        // 子节点数组
        let children = []

        // icon属性处理逻辑
        if (this.icon) {
          // <svg class="icon"><use xlink:href="#icon-cart"/></svg>
          children.push(h(
            'svg',
            { class: 'icon' },
            [h('use', { attrs: { 'xlink:href': '#icon-' + this.icon } })]
          ))

        }

        // 拼接子节点
        children = children.concat(this.$slots.default)

        const vnode = h(
          'h' + this.level, // 参数1：tagname
          { attrs: { title: this.title } }, // 参数2：{。。。}
          children // 参数3：子节点VNode数组
        )
        console.log(vnode);
        // 返回createElement返回的VNode
        return vnode
      }
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  // 使用插件使用Vue.use()
  window.Vue.use(MyPlugin)
}