import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtPagination , AtList, AtListItem,AtFloatLayout, AtTag, AtSearchBar, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux';
import moment from 'moment'; 
import './index.less';

@connect(({product}) => ({
  ...product,
}))
export default class Product extends Component {
  state={
    isOpen:false,
    source:{},
    value: '',
  }

  componentDidMount = () => {
    this.props.dispatch({
      type:'product/fetch',
      payload:{
        pageNum:1,
        pageSize:10
      }
    })
  };

  config = {
    navigationBarTitleText: '生产订单',
  };


  handleClicks =(record) =>{
    this.setState({
      isOpen:true,
      source:record,
    })
  }

  handleClose = () => {
    this.setState({
      isOpen:false
    })
  }

  changePages = (record) => {
    if(this.state.value.length === 0 ){
      this.props.dispatch({
        type:'product/fetch',
        payload:{
          pageNum:record.current,
          pageSize:10
        }
      })
    }else{
      this.props.dispatch({
        type:'product/fetch',
        payload:{
          pageNum:record.current,
          pageSize:10,
          ztmbh:this.state.value,
        }
      })
    }
  }

  valueChanged = (record) => {
    this.setState({
      value:record,
    })
  }

  handldClick = () => {
    this.props.dispatch({
      type:'product/fetch',
      payload:{
        ztmbh:this.state.value,
      }
    })
  }

  handldClear = () => {
    this.setState({
      value:'',
    })
    this.props.dispatch({
      type:'product/fetch',
      payload:{
        pageNum:1,
        pageSize:10
      }
    })
  }

  handleReport= () => {
    Taro.navigateTo({
      url:`/pages/reportmission/index?matnr=${this.state.source.matnr}&operationcode=${this.state.source.operationcode}&ztmbh=${this.state.source.ztmbh}&orderno=${this.state.source.orderno}&producttext=${this.state.source.producttext}&id=${this.state.source.id}&position=${this.state.source.position}`
    })
  }

  render() {
    const {isOpen,source}=this.state
    const {list,dataLists} = this.props
    return (
      <View className='product-page'>
         <AtSearchBar
           onClear={this.handldClear}
           onActionClick={this.handldClick}
           onChange={record => this.valueChanged(record)}
           value={this.state.value}
           showActionButton
           fixed
           placeholder='请输入sap编码'
         />
       <View  className='lists'>
       <AtList>
         {
           dataLists.map((item,index)=>{
             return(
               <View key={index}>
                <AtListItem 
                  arrow='right'
                  note={item.orderSta === '0' ? '状态:已下达'+'——工序'+item.operationcode : item.orderSta === '1' ? '状态:已完工'+'——工序'+item.operationcode : item.orderSta === '2' ? '状态:已入库'+'——工序'+item.operationcode : '状态:其他'+'——工序'+item.operationcode}
                  title={item.ztmbh ? item.ztmbh : '暂无数据'}
                  extraText='详细信息请点击'
                  onClick={()=>{this.handleClicks(item)}}
                  iconInfo={{ size: 25, color: '#78A4FA', value: 'calendar', }}
                />
               </View>
             )
           })
         }
           <AtFloatLayout isOpened={isOpen}  title='订单详情' onClose={this.handleClose} >
           <AtTag className='message'>序列号:{source.childrenserialno ? source.childrenserialno : '暂无数据'}</AtTag>
           <AtTag className='message'>SAP标识:{source.ztmbh ? source.ztmbh : '暂无数据'}</AtTag>
           <AtTag className='message'>订单号:{source.productorderCode ? source.productorderCode : '暂无数据'}</AtTag>
           <AtTag className='message'>工序号:{source.operationcode ? source.operationcode : '暂无数据'}</AtTag>
           <AtTag className='message'>描述:{source.processtext ? source.processtext : '暂无数据'}</AtTag>
           <AtTag className='message'>台位:{source.position ? source.position : '暂无数据'}</AtTag>
           <AtTag className='message'>状态:{source.orderSta === '0' ? '已下达' : source.orderSta === '1' ? '已完工' : source.orderSta === '2' ? '已入库' : '其他'}</AtTag>
           <AtTag className='message'>计划开工时间:{source.operationStartTime ? moment(source.operationStartTime).format('YYYY-MM-DD h:mm') : '暂无数据' }</AtTag>
           <AtTag className='message'>计划完工时间:{source.operationEndTime ? moment(source.operationEndTime).format('YYYY-MM-DD h:mm') : '暂无数据'}</AtTag>
          <View>
          <AtTag className='bottonOne' circle onClick={this.handleReport}>完工</AtTag>
          <AtTag className='bottonTwo' circle>去录入</AtTag>
          <AtTag className='bottonThird' circle>溯源</AtTag>
          </View>
          </AtFloatLayout>
        </AtList>
      </View>
      <View className='footer'>
      <AtPagination 
        total={list.total} 
        pageSize={list.pageSize}
        current={list.pageNum}
        onPageChange={(e)=>this.changePages(e)}
      > 
        </AtPagination>
        <Text className='textFooter'>共{list.total}条</Text>
      </View>
      </View>
    )
  }
}
