//虚拟dom 
//      <ul class="list">
//     <li class="item">a</li>
//     <li class="item">b</li>
//     <li class="item">c</li>
//     <li class="item">d</li>
// </ul>

import { createElement } from './element.js'
import { diff } from './dom-diff.js'
let VirtualDom1 = createElement("ul", { class: "list" }, [
  createElement("li",{class:"item"},["a"]),
  createElement("li",{class:"item"},["b"]),
  createElement("li",{class:"item"},["c"]),
  createElement("li",{class:"item"},["d"]),
])

let VirtualDom2 = createElement("ul",{class:"list-item"},[
  createElement("li",{className:"item"},["1"]),
  createElement("li",{class:"item"},["b"]),
  createElement("li",{class:"item"},["c"]),
  createElement("li",{class:"item"},["4"]),
]);

console.log(VirtualDom1)

console.log(VirtualDom2)

//将虚拟DOM渲染到页面
// $dom => VirtualDom1 => oldTree
// let $dom = render(VirtualDom1);
// renderDom($dom, getElementById("app"))

// 假设用户这时候调用了setState
// 得到补丁包
const patchs = diff(VirtualDom1, VirtualDom2)

// Patchs($dom, $patchs)
console.log("得到的补丁包",patchs);

