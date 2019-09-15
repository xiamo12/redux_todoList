// 使用 Mock
var Mock = require('mockjs')
let data = Mock.mock("/mock",{
	// "userinfo|4":[{
	// 	"id|+1":1,
	// 	"name":"@cname",
	// 	"age|18-28":25,
	// 	"sex|1":["男","女"],
	// 	"job|1":["web","teacher","python","php"]
	// }]
	"userinfo|1-3":["夏天","春天"]
})
export default data