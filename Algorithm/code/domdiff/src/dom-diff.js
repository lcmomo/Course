// patch = {
//   1 : {
//       type: "ATTRS", attrs: {class: 'list-item' } 
//   },
//   2: {
//     type: "REMOVE", index: 3
//   },
//   3: {
//     type: "TEXT", text: 1
//   },
//   4: {
//     type: "REPLACE", newNode: newNode
//   }
// }

//补丁包
// {
//     0:{type:"ATTRS",attrs:{class:"list-item"}},
//     2.{type:"TEXT",text:1},
//     8.{type:"TEXT",text:4}
// }
/**
 * 生成的补丁包 样式上面一样
 */

 import _ from './utils.js'

 let patchs = {} // 初始补丁包

 let globalIndex = 0 // 全局索引

 function diff (oldTree, newTree) {
   dfswalk(oldTree, newTree, globalIndex);
   return patchs
 }

 function dfswalk(oldTree, newTree,index) {
   // 每个元素都有一个补丁对象
   let currentPatchs = [];
   // 新树中该节点不存在
   if (!newTree) {
     currentPatchs.push({
       type: 'REMOVE',
       index
     })
   } else if (_.isString(oldTree)) { // 叶子节点（内容text）
    if (_.isString(newTree) && newTree != oldTree) {
      currentPatchs.push({
        type: 'REPLACE',
        newNode: newTree
      })
    }
   } else if (oldTree.type == newTree.type) { //两树类型一样
    // 比属性
    diffProps()

    // 比子节点
    diffChildren(oldTree.children, newTree.children);
   }
   // 有更新
   if (currentPatchs.length) {
    patchs[index] = currentPatchs
  }
 }

 function diffProps () {}

 function diffChildren(oldChildren, newChildren) {
   oldChildren.forEach((item, idx) => {
     dfswalk(item, newChildren[idx], ++globalIndex);
   })
 }
 export { diff } 