import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtForm, AtButton, AtTag , AtCard, AtInput, AtCheckbox   } from 'taro-ui'
import { connect } from '@tarojs/redux';
import './index.less';


@connect(({reportmission}) => ({
  ...reportmission,
}))
export default class Reportmission extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      data:{},
      checkedList: [],
    }
  }

  componentDidMount = () => {
    this.props.dispatch({
      type:'reportmission/getPeople',
      payload:{
        position:this.$router.params.position,
        id:this.$router.params.id
      }
    })
    this.setState({
      data:this.$router.params
    })
  };

  config = {
    navigationBarTitleText: '报工',
  };

  checkboxOption = (record) => {
    const arr = [];
    if(record.length>0){
      record.map((item,index)=>{
        arr.push({
          id:index,
          value:item.id,
          label:item.username,
          shift:item.shift
        }) 
      })
      return arr
    }
  }

  handleChange = (value) => {
    this.setState({
      checkedList: value
    })
  }

  handleSubmit = () => {
    console.log(this.$router.params.id)
    console.log(this.state.checkedList)
  }


  render() {
    const {data, checkedList} = this.state
    const {peopleList}=this.props
    return (
      <View className='reportmission-page'>
        <AtCard
          note=' 报工后，该道工序信息将不可修改'
          extra={data.producttext}
          title='报工信息'
        >
         <AtTag className='tags' >序列号:{data.matnr}</AtTag>
         <AtTag className='tags' >工序号:{data.operationcode}</AtTag>
         <AtTag className='tags' >SAP:{data.ztmbh}</AtTag>
         <AtTag className='tags' >订单号:{data.orderno}</AtTag>
         <Text className='font'>请选择报工人(*必填)</Text>
         <AtCheckbox
           options={this.checkboxOption(peopleList)}
           selectedList={checkedList}
           onChange={this.handleChange}
         />
        </AtCard>
        <AtButton className='buttonSubmit' onClick={this.handleSubmit}>提交</AtButton>
      </View>
    )
  }
}
