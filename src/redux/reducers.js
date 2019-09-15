import { CLICK, CHANGE, DELETE, GET_LIST } from "./actionTypes";


const initialState = {
	inputValue: "",
	data: []
}

export default (state=initialState, action)=>{
	if (action.type === CLICK) {
		let newState = JSON.parse(JSON.stringify(state));
		if (newState.inputValue) {
			newState.data.push(newState.inputValue);
			newState.inputValue = ""
		}
		return newState
	}
	if (action.type === CHANGE) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.inputValue = action.value;
		return newState
	}
	if (action.type === DELETE) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.data.splice(action.index, 1)
		return newState
	}
	if (action.type === GET_LIST) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.data = action.data
		return newState
	}
	return state;
}