import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import './article-detail.scss'
import { API_ARTICLE } from '@/services/api'
import fetch from '@/services/fetch'

class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: ''
  }
  componentWillMount() {
    const { id } = this.$router.params;
    this.getArticleDetails(id)
  }

  componentDidMount() {}

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  getArticleDetails(id:string) {
    fetch.post({
      url: API_ARTICLE,
      data: {
        request: [
          {
            type: 'article',
            action: 'item',
            params: {
              artId: id
            }
          }
        ]

      }
    }).then(res => {
      console.log(res.data.data, '请求列表');
      const data = res.data.data
      // this.setState({
      //   contentList: data.articlecateList.rows
      // })
    })
  }
  render () {
    return (
      <View className='article-view'></View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass
