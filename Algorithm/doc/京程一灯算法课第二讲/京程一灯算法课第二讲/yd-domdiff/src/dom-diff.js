//1.{type:"ATTRS",attrs:{class:"list-item"}}
//2.{type:"REMOVE",index:3}
//3.{type:"TEXT",text:1}
//4.{type:"REPLACE",newNode:newNode}
//补丁包
// {
//     0:{type:"ATTRS",attrs:{class:"list-item"}},
//     2.{type:"TEXT",text:1},
//     8.{type:"TEXT",text:4}
// }
/**
 * 生成的补丁包 样式上面一样
 */
import _ from "./util.js";
let patchs = {};
//全局索引  
let globalIndex = 0;

function diff(oldTree, newTree) {
    dfswalk(oldTree, newTree, globalIndex);
    return patchs;
}

function dfswalk(oldTree, newTree, index) {
    //每个元素都有一补丁对象
    let currentPatchs = [];
    //如果新节点不存在
    if (!newTree) {
        currentPatchs.push({
            type: "REMOVE",
            index
        })
    } else if (_.isString(oldTree)) {
        if (_.isString(newTree) && oldTree != newTree) {
            currentPatchs.push({
                type: "REPLACE",
                newNode: newTree
            })
        }
    } else if (oldTree.type == newTree.type) {
        //两个节点的元素类型一致
        //比属性
        //比子节点
        diffChildrens(oldTree.children, newTree.children);
    }
    if (currentPatchs.length > 0) {
        patchs[index] = currentPatchs;
    }
}

function diffProps() {}

function diffChildrens(oldChildrens, newChildrens) {
    oldChildrens.forEach((child, idx) => {
        dfswalk(child, newChildrens[idx], ++globalIndex);
    });
}
export {
    diff
}