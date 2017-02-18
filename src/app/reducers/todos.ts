import { Action } from '@ngrx/store';
export const ADD = "ADD";
export const ADDTOLIST = "ADDTOLIST";
export const REMOVE = "REMOVE";
export const REMOVEFROMLIST = "REMOVEFROMLIST";
export const UPDATEDONE = "UPDATEDONE";
export const UPDATECART = "UPDATECART";
export const UPDATEDATA = "UPDATEDATA";
export const GOTARRAY = "GOT_FIREBASE_ARRAY";
export interface TodoItem {
    date: string;
    title: string;
    $key: string;
}
export interface State {
    todos: TodoItem[]
}
let initialState: State = { todos: [] };
const update = (state: TodoItem, action: Action) => {
    /*switch(action.type) {
        case ADDTOLIST: 
            if(state === action.payload.addTo) {
                let newArr:any;
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
                let newArr = action.payload.item.list.slice();
                let index = action.payload.index;
                newArr[index].done = !!newArr[index].done;
                return Object.assign({}, state, {list: newArr});
            }
            return state;
        case UPDATECART:
            if(state === action.payload) {
                let cart = action.payload.cart;
                return Object.assign({}, state, {cart: !cart});
            }
            return state;
    }*/
}
export function todoReducer(state = initialState, action: Action) {
    switch(action.type) {
        case ADD:
            return Object.assign({}, state)
            .todos.concat(action.payload);
        case REMOVE:
            return state.todos.filter((todo:any) => todo !== action.payload);
        case UPDATEDATA:
            return action.payload;
        case GOTARRAY:
            let s = Object.assign({});
            s.todos = [
                ...action.payload
            ];
            return s;
        case ADDTOLIST:
        case UPDATEDONE:
        case UPDATECART:
        case REMOVEFROMLIST:
                return state;
                //return state.map((todo:any) => update(todo, action));
        default:
            return state;
    }
}
