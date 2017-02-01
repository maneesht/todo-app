import { Action } from '@ngrx/store';
export const ADD = "ADD";
export const ADDTOLIST = "ADDTOLIST";
export const REMOVE = "REMOVE";
export const REMOVEFROMLIST = "REMOVEFROMLIST";
export const UPDATEDONE = "UPDATEDONE";
export const UPDATECART = "UPDATECART";
export const UPDATEDATA = "UPDATEDATA";
export const GOTARRAY = "GOT_FIREBASE_ARRAY";
const update = (state, action: Action) => {
    switch(action.type) {
        case ADDTOLIST: 
            if(state === action.payload.addTo) {
                let newArr;
                if(state.list)
                    newArr = state.list;
                else
                    newArr = []
                newArr = newArr.concat(action.payload.newItem);
                return Object.assign({}, state, { list: newArr, newItem: ""});
            }
            return state;
        case REMOVEFROMLIST:
            if(state === action.payload.item) {
                let newArr = [
                    ...state.list.slice(0, action.payload.index),
                    ...state.list.slice(action.payload.index + 1)
                ]
                return Object.assign({}, state, {list: newArr});
            }
            return state;
        case UPDATEDONE:
            if(state === action.payload.item) {
                let newArr = action.payload.item.list.splice();
                let obj = newArr[action.payload.item.index];
                obj.done = !obj.done;
                return Object.assign({}, state, {list: newArr});
            }
            return state;
        case UPDATECART:
            if(state === action.payload) {
                let cart = action.payload.cart;
                return Object.assign({}, state, {cart: !cart});
            }
    }
}
export function todoReducer(state = [], action: Action) {
    switch(action.type) {
        case ADD:
            return [
                ...state,
                action.payload
            ]
        case REMOVE:
            return state.filter(todo => todo !== action.payload);
        case UPDATEDATA:
            return action.payload;
        case GOTARRAY:
            return action.payload;
        case ADDTOLIST:
        case UPDATECART:
        case UPDATEDONE:
        case UPDATECART:
        case REMOVEFROMLIST:
                return state.map(todo => update(todo, action));
        default:
            return state;
    }
}
