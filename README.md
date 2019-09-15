## 使用create-react-app搭建目录结构

```
$ create-react-app todolist_redux
$ cd todolist_redux
```

## src目录保留及创建以下文件

```
+ redux
	- actions.js
	- actionTypes.js
	- reducers.js
	- store.js
index.css
index.js
mock.js
TodoList.jsx
```

- redux：状态管理文件目录
- index.js：项目主入口文件
- mock.js：随机生成的接口数据，可以通过安装mockjs包进行模拟
- TodoList.jsx：react的容器组件

## 安装项目依赖

```
$ sudo cnpm install antd -S
$ sudo cnpm install axios -S
$ sudo cnpm install redux -S
$ sudo cnpm install redux-thunk -S

$ sudo cnpm install mockjs -D
$ sudo cnpm install redux-devtools-extension -D
```

## mockjs包的使用

- #### cnpm安装包

  ```
  $ cd todolist_redux
  $ sudo cnpm install mockjs -D
  ```

- #### 在src目录下创建mock.js文件

  ```javascript
  var Mock = require('mockjs')
  let data = Mock.mock("/mock",{ 
  	"userinfo|1-3":["夏天","春天"]//表示随机生成1-3组数组里的格式的数据
  })
  export default data
  ```

  - Mock.mock()方法里的请求地址可以随意写，但要与ajax/axios请求地址保持一致。
  - mockjs使用过程参考： [如何在react中使用mockjs来模拟数据.md](如何在react中使用mockjs来模拟数据.md) 

## store当中配置redux方法

```javascript
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers"
import thunk from "redux-thunk"

const composeEnhancers =
  	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);

export default store;
```

## 总结

- action只能export对象。

- 引入redux-thunk中间件之后，action允许我们export一个函数。此时可以在action里定义一个发送异步请求的函数。

- 发送异步请求的函数在action文件里定义；

- 组件当中只要创建一个action，并将此action使用store.dispatch(action)方法派发到store里面

- 当我们调用store.dispatch方法，把异步action发给store的时候，action会被自动执行。action自动发起请求，获取相应数据，引用一个具有初始化页面数据功能的函数，再将响应的数据作为参数传递给这个函数，从而改变store里的数据；

- action里没有store.dispatch()方法。因此在action内部，如果要把action分发到store，需要给action传入一个dispatch参数。当action是一个函数的时候，函数能够接受到dispatch方法。

  ```javascript
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
  ```

  