import { isArray } from "lodash-es";
import item from './sync.css';
const sync = function () {
    console.log("sync");
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