import Vue from 'vue';
import iView from 'iview';

if (process.browser) {
  require('iview')
}
Vue.use(iView);
import 'iview/dist/styles/iview.css';
