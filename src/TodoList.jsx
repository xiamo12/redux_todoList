import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input, Button, List } from "antd";
import store from "./redux/store";
import "./mock"
import { getTodoList, handleClickAction, handleChangeAction, deleteAction } from "./redux/actions"
const Item = List.Item;

class TodoList extends Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(this.storeChange);
	}

	storeChange = ()=>{
		this.setState(store.getState())
	}


	handleClick = ()=>{
		const action = handleClickAction();
		store.dispatch(action)
	}

	handleChange = (e)=>{
		const action = handleChangeAction(e.target.value)
		store.dispatch(action)
	}

	deleteItem = (index)=> {
		const action = deleteAction(index);
		store.dispatch(action)
	}

	componentDidMount(){
		document.addEventListener('keydown',this.onkeydown);
		const action = getTodoList()
		store.dispatch(action)
	}

	onkeydown = (e)=>{
		if (e.keyCode === 13) {
			this.handleClick()
		}
	}
	render(){
		const { inputValue, data } = this.state;
		return (<div>
			<Input 
				style={{width: "200px", margin: "0.5rem"}} 
				placeholder="说点什么···"
				onChange={this.handleChange}
				value={inputValue}

				/>
			<Button 
				type="primary"
				onClick={this.handleClick}
				>增加</Button>
			<List 
				bordered 
				dataSource={data} 
				renderItem={(item,index) => <Item 
					key={item.id}
					onClick={()=>{this.deleteItem(index)}}
					onKeyDown={this.onkeydown}
					>{item}</Item>}
				style={{width: "20rem",marginLeft: "0.5rem"}}
				></List>
		</div>)
	}
}

export default TodoList;