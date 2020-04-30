import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button,Image,Swiper, SwiperItem } from '@tarojs/components';
import {  AtGrid , AtNoticebar } from 'taro-ui'
import { connect } from '@tarojs/redux';
import './index.less';

@connect(({ home,}) => ({
  ...home,
}))
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag:false,
    }
  }

  componentDidMount = () => {
    if(Taro.getStorageSync('TOKEN')){
      this.setState({
       flag:true,
      })
    }
    this.props.dispatch({
      type:'home/fetchNotify'
    })
  };
  

  componentWillUnmount = () => {
    this.setState({
      flag:false,
    })
  }

  config = {
    navigationBarTitleText: '首页',
  };

  login = () => {
    Taro.navigateTo({
      url:'pages/userlogin/index'
    })
  }

  goto = (record) => {
    if(record.value==='生产订单'){
      Taro.navigateTo({
        url:'/pages/product/index'
      })
    }
  }

  render() {
    const { notifyList } = this.props 
    return (
      <View className='home-page'>
      {this.state.flag ? <View>
       <Swiper
         indicatorColor='#999'
         indicatorActiveColor='#333'
         circular
         indicatorDots
         autoplay
       >
         {
           this.props.swiperImg.map((item,index)=>{
             return (
              <SwiperItem key={index}>
                <Image className='img'  src={item.img_src} />
              </SwiperItem>
             )
           })
         } 
      </Swiper>
      <AtNoticebar single speed={40}  marquee icon='volume-plus'>
        {notifyList.map((item,index) => {
          return(
             <Text key={index}>通知{item.title}-{item.content} ---{item.sendBy} {item.createDateSimple}</Text>
          )
        })}
      </AtNoticebar>
       <AtGrid  data={
        [
          {
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            value: '生产订单'
          },
          {
            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
            value: '检修中心'
          },
          {
            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
            value: '执行中心'
          },
        ]
      }
         onClick={(index)=>this.goto(index)}
       />
       </View>
        : 
        <View>
          <Image className='back' src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2886730833,328880207&fm=11&gp=0.jpg' />
          <Button className='loginButton' onClick={this.login}>去登陆</Button>
        </View>
        
        }
      </View>
    );
  }
}

export default Home;
