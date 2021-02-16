const MyPlugin = {
  // 插件必须实现 install 函数 ，接收 Vue实例，以及 options 参数
  install: function (Vue, options) {
    Vue.component("title-custom", {
      functional: true,
      props: {
        level: {
          type: String,
          default: 1,
          required: true,
        },
        title: {
          type: String,
          default: "",
        },
        icon: {
          type: String,
        },
      },
      render(h, context) {
        let children = [];
        const { level, title, icon } = context.props;
        // 处理 icon
        if (icon) {
          // <svg class="icon"><use xlink:href="#icon-cart"/></svg>
          children.push(
            h("svg", { class: "icon" }, [
              h("use", {
                attrs: { "xlink:href": "#icon-" + icon },
              }),
            ])
          );
        }
        console.log(context);
        children.push(context.children);
        return h(
          "h" + level, // 标签名称
          { attrs: { title: title } }, // 描述参数 id/class/style/html attrs/on/指令/key...
          children // 子节点数组
        );
      },
    });

    // 全局指令
    Vue.directive("custom-directive", {
      bind: function (el, binding, vnode) {
        var s = JSON.stringify;
        el.innerHTML =
          "自定义指令解析: <br>" +
          "name: " +
          s(binding.name) +
          "<br>" +
          "value: " +
          s(binding.value) +
          "<br>" +
          "expression: " +
          s(binding.expression) +
          "<br>" +
          "argument: " +
          s(binding.arg) +
          "<br>" +
          "modifiers: " +
          s(binding.modifiers) +
          "<br>" +
          "vnode keys: " +
          Object.keys(vnode).join(", ");
      },
    });
  },
};

// 需要使用 Vue.use 进行注册
if (typeof window !== "undefined" && window.Vue) {
  // 使用插件使用Vue.use()
  window.Vue.use(MyPlugin);
}
