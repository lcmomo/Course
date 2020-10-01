// let state = {
//   count: 1
// }

// let listeners = [];

// function subscribe(listener) {
//   listeners.push(listener)
// }
// function changeState(count) {
//   state.count = count;
//   for (let i =0; i<listeners.length;i++) {
//     listeners[i]()
//   }
// }
// subscribe(() => {
//   console.log('出发了', state.count)
// })

// 封装

const createStore = (initState) => {
  let state = initState;
  
}