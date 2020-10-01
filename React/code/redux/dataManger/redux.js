





const createStore = (reducer, initState) => {
    let state = initState;
    let listeners = [];
    function subscribe(listener) {
        listeners.push(listener);
    }

    function dispatch(action) {
        state = reducer(state, action);
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]()
        }
    }
    function getState() {
        return state;
    }
    return {
        subscribe,
        dispatch,
        getState
    }
}



let initState = {
    count: 1,
    name: 'yideng'
}


/**
 * 
 * @param {*} state 数据 
 * @param {*} action 计划  type
 */
function countReducer(state, action) {
    //很多 
    switch (action.type) {
        case 'INCREMENT':
            return {
                // ...state,
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                // ...state,
                count: state.count + 1
            }

        default:
            return state;
    }
}



function nameReducer(state, action) {
    switch (action.type) {
        case 'SETNAME':
            return {
                // ...state,
                name: action.payload
            }
        default:
            return state;
    }
}
//1. 定计划
//2.发送计划


function combineReducer(reducers) {
    const reducerKeys = Object.keys(reducers);
    return function combination(state, action) {
        const nextState = {};

        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];
            const reducer = reducers[key];
            const prevStateForKey = state[key];
            const nextStateForKey = reducer(prevStateForKey, action);
            nextState[key] = nextStateForKey
        }
        return nextState
    }
}

const reducer = combineReducer({
    count: countReducer,
    name: nameReducer
})




let store = createStore(reducer, initState);

store.subscribe(() => {
    //承接视图 react 
    let state = store.getState();
    console.log('触发了', state.count)
})



store.subscribe(() => {
    //承接视图 react 
    let state = store.getState();
    console.log('现在的name', state.name)
})


store.dispatch({
    type: 'INCREMENT'
})


store.dispatch({
    type: 'SETNAME',
    payload: 'yidneg'
})





