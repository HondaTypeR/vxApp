import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.less';

@connect(({execute}) => ({
  ...execute,
}))
export default class Execute extends Component {
  config = {
    navigationBarTitleText: 'execute',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="execute-page">
        execute
      </View>
    )
  }
}
