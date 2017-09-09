// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import Routers from './router'
import axios from 'axios'
import pro from 'promise-polyfill'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import Util from './libs/util';
Vue.use(Router);
Vue.use(iView);
Vue.prototype.$http=axios;
if (!window.Promise) {
    window.Promise=pro;
}
Vue.config.productionTip = false
// 路由配置
const RouterConfig = {
    mode: 'hash',
    routes: Routers,
};
  Vue.prototype.$handleError=(data)=>{
    let r=data.data;
    console.log(r);
    // if(r.i==10001){
    //     iView.Message.error({content:"未登录或者登陆已过期,请重新登录",duration: 3,onClose:()=>{router.push({path:'/'});}});
        
    // }else if(r.i==10002){
    //      iView.Message.error({content:"您没有权限执行该操作",duration: 5});
    // }else if(!r.i){
    //      iView.Message.error({content:r.ec,duration: 5});
    // }
}
const router = new Router(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});
router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
