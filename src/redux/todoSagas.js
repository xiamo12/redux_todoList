import { put, takeEvery } from 'redux-saga/effects'
import { GET_INIT_LIST } from "./actionTypes"
import axios from "axios"
import { getListAction } from "./actions"

function* getInitList (){
	const res = yield axios.get('/mock', {dataType: 'json'});
	const action = getListAction(res.data.userinfo);
	yield put(action)
	console.log('abn')
}


function* mySaga() { //必须是一个generator函数
  yield takeEvery(GET_INIT_LIST, getInitList );
}

export default mySaga