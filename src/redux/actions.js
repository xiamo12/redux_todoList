import { CLICK, CHANGE, DELETE, GET_LIST } from "./actionTypes";
import axios from "axios"

export const handleClickAction = () => ({
	type: CLICK
})

export const handleChangeAction = (value) => ({
	type: CHANGE,
	value
})

export const deleteAction = (index)=>({
	type:DELETE,
	index
})

export const getListAction = (data)=>({
	type:GET_LIST,
	data
})


export const getTodoList = ()=>{
	return (dispatch)=>{
		axios.get('/mock', {dataType: 'json'})
		.then(res => {
			const data = res.data.userinfo;
			const action = getListAction(data);
			dispatch(action)
		})
	}
}

