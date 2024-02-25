import {createApp} from 'vue';
import {createPinia} from 'pinia';
// 导入全局样式
import App from './App.vue';
import router from './router';

// 导入ui组件
import ElementPlus from 'element-plus'

// 指定语言，如果这里面报错可以使用@ts-ignore忽略检查
import zhCn from 'element-plus/dist/locale/zh-cn.min.js'

import {useUI} from '@/utils/setGlobal'

// 引入全局样式
import '@/styles/index.scss';

const app = createApp(App);

app.use(ElementPlus, {locale: zhCn});

app.use(createPinia());
app.use(router);
// 注册图标
useUI(app);
app.mount('#app');
