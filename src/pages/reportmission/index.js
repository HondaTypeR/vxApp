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
      data:{},
      checkedList: [], // 报工人列表
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
      record.map((item)=>{
        arr.push({
          label:item.username,
          value:item.userEsbId+'/'+item.shiftId
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
    const tempList = this.state.checkedList;
    const params = []; // 报工人中间变量
    const lastParams = [] // 最终传递报工人参数
    const finalParams = []
    tempList.map((item)=>{
     params.push( item.split('/'))
    })
    params.map((item)=>{
      lastParams.push({employeeId:item[0],shift:item[1]})
    })
    finalParams.push({
      esbEmployeeList:lastParams,
      id:this.$router.params.id,
    })
    this.props.dispatch({
      type:'reportmission/doReport',
      payload:finalParams,
    })
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
