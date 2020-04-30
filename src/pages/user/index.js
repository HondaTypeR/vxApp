import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtMessage, AtAvatar, AtModal,AtDivider,AtNoticebar  } from 'taro-ui'
import { connect } from '@tarojs/redux';
import './index.less';


@connect(({user}) => ({
  ...user,
}))
export default class User extends Component {
    
  
  constructor (props) {
    super(props)
    this.state = {
     
    }
  }
  componentDidMount = () => {

  };

  config = {
    navigationBarTitleText: '用户中心',
  };

  handleClick =  () => {
    if(this.props.username.length>0&&this.props.password.length>0){
      this.props.dispatch({
        type:'user/login',
      }).then((res)=>{
        if(res.code === 1){
          Taro.atMessage({
                'message': `登陆成功,欢迎${res.data.userInfo.name}`,
                'type': 'success',
            })
         }else{
          Taro.atMessage({
            'message': `${res.message}`,
            'type': 'error',
        })
         }
      })
      this.props.dispatch({
        type:'user/updateLoginFlag',
        payload:true,
      })
    }else{
      Taro.atMessage({
        'message': '请输入账号或密码',
        'type': 'warning',
      })
    }
  }

  handleReset = () => {
    this.props.dispatch({
      type:'user/resetData',
    })
  }

  handleChangeUser = (value) => {
    this.props.dispatch({
      type:'user/changeUsername',
      payload:value,
    })
  }

  handleChangePass = (value) => {
    this.props.dispatch({
      type:'user/changePassword',
      payload:value,
    })
  }

  loginOut = () =>{
   this.props.dispatch({
     type:'user/loginOut'
   })
  }

  render() {
    return (
      <View className='user-page'>
       <AtMessage />
      {Taro.getStorageSync('TOKEN') ? 
      <View className='allBack'>
      <Image className='back' src={this.props.imgs.url2} />
      <AtNoticebar  marquee icon='volume-plus' speed={40} single>
         车马集团:创立于2020年,公司总部坐落于美丽的海滨城市——大连市，公司目前主要从事互联网开发行业，目前公司全球现有员工2名，期待你的加入，联系电话:13079897299
        </AtNoticebar>
      <View className='at-row' style={{marginTop:'6px'}}>
        <View style='height:100px' className='at-col'>
          <AtAvatar size='large' className='avatar' image={`http://saas.crrcdt.com:8015/api/oss/upload${Taro.getStorageSync('photo')}?access-token=${Taro.getStorageSync('TOKEN')}`}>
          </AtAvatar>
        </View>
        <View className='at-col'>
          <View className='at-col'>
            <Text className='name'>{Taro.getStorageSync('name')}</Text>
          </View>
          <View className='at-col'><Text className='ora'>所属机构:{Taro.getStorageSync('oraName')}</Text></View>
          <View className='at-col'><Text className='ora'>员工工号:{Taro.getStorageSync('no')}</Text></View>
          <View className='at-col'><Text className='ora'>手机号:{Taro.getStorageSync('mobile')}</Text></View>
        </View>
      </View>
        <View>
        <AtDivider  lineColor='red' />
        </View>
        <View>
        <AtButton className='buttonSubmit' onClick={this.loginOut}>安全退出</AtButton>
        </View>
    </View>
       : 
       <View className='allBack'>
         <Image className='back' src={this.props.imgs.url} />
         <AtForm
           onSubmit={this.submit}
           onReset={this.reset}
         >
         <AtModal
           isOpened={this.props.logining}
           content='正在登陆...请等待'
         />
       
        <AtInput
          name='name'
          title='用户名'
          type='text'
          placeholder='请输入用户名'
          value={this.props.username}
          onChange={this.handleChangeUser}
        />

         <AtInput
           name='pass'
           title='密码'
           type='password'
           placeholder='请输入密码'
           value={this.props.password}
           onChange={this.handleChangePass}
         />
          
        <AtButton className='buttonSubmit' onClick={this.handleClick}>提交</AtButton>
        <AtButton onClick={this.handleReset}>重置</AtButton>
       </AtForm>
      </View>
       } 
       <Text className='bottom'>©️2020 CopyRight Power by 车马集团(大中华区)</Text>
      </View>
    )
  }
}
