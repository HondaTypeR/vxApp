import '@tarojs/async-await';
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import { Provider } from '@tarojs/redux';
import Taro, { Component } from '@tarojs/taro';
import Home from './pages/home';
import dva from './utils/dva';
import models from './models';


const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {
  componentDidMount() {}
  config = {
    pages: [
      'pages/home/index',
      'pages/message/index',
      'pages/user/index',
      'pages/product/index',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '我的软件',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: './assets/home.png',
          selectedIconPath: './assets/home-active.png',
        },
        {
          pagePath: 'pages/message/index',
          text: '信息',
          iconPath: './assets/cart.png',
          selectedIconPath: './assets/cart-active.png',
        },
        {
          pagePath: 'pages/user/index',
          text: '我的',
          iconPath: './assets/user.png',
          selectedIconPath: './assets/user-active.png',
        }
      ],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: '#fff',
      borderStyle: 'white',
    },
  };

 

  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
