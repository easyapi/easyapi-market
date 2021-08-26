import Vue from 'vue'
import { Input, Row, Col, Pagination, Dialog, Button, Loading, Message, Empty } from 'element-ui'
Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Loading)
Vue.use(Message)
Vue.use(Empty)
