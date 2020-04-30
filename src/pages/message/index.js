import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.less';

@connect(({message}) => ({
  ...message,
}))
export default class Message extends Component {
  config = {
    navigationBarTitleText: 'message',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className='message-page'>
        message
      </View>
    )
  }
}
