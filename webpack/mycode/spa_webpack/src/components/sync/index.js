import { isArray } from "lodash-es";
import item from './sync.css';
import help from '../common/help.js';

console.log("sync引用： ", help.version)

const sync = function () {
    console.log("sync");

    fetch("/api/test").then(response => response.json()).then(data => { console.log("result: ", data.message) })
    setTimeout(function () {
        document.getElementById("app").innerHTML=`<h1 class="${item.test}">Hello Li</h1>`
    }, 2000)
    //document.getElementById("app").innerHTML=`<h1 class="${item.test}">Hello Li</h1>`
}

const isArrayFun=function(args){
    console.log(isArray(args));
}

export {
    sync,isArrayFun
}