//1.插件一定要有apply
//2.插件里面compiler 
//3.compiler->留钩子 ->给外界留下可以注册的接口
//4.该执行的时候定位的插件的时机给执行了
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        // 在compiler的Hooks中注册一个方法，当执行到该阶段时会调用
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
            console.log("============================");
        });
    }
}
module.exports = ConsoleLogOnBuildWebpackPlugin;

// webpack 利用了 tapable 这个库（https://github.com/webpack/tapable）来协助实现对于整个
// 构建流程各个步骤的控制。 tapable 定义了主要构建流程后，使用 tapable 这个库添加了各种各样的
// 钩子方法来将 webpack 扩展至功能十分丰富,这就是plugin 的机制