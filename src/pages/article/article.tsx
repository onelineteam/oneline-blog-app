import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import Banner from './banner'
import List from './list'
import './article.scss'

class Article extends Component {

  config: Config = {
    navigationBarTitleText: '文章列表'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  constructor(props) {
    super(props)
    this.state = {
      bannerList: [
        {
          rank: 1,
          img: 'https://yanxuan.nosdn.127.net/62399a2be90be4c8df3ca64e154d5351.jpg'
        },
        {
          rank: 2,
          img: 'https://yanxuan.nosdn.127.net/1f31c090095d995bf856b990fc106be6.jpg'
        },
      ],
      contentList: [
        {
          id: 1,
          title: '文章1',
          intro: '这是文章1',
          img: 'https://yanxuan.nosdn.127.net/62399a2be90be4c8df3ca64e154d5351.jpg'
        },
        {
          id: 2,
          title: '文章2',
          intro: '这是文章2',
          img: 'https://yanxuan.nosdn.127.net/1f31c090095d995bf856b990fc106be6.jpg'
        },
      ]
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { bannerList, contentList } = this.state
    return (
      <View className='article-view'>
        <Banner list={bannerList} />
        <ScrollView
          scrollY
        >
          <List list={contentList} />
        </ScrollView>
      </View>
    )
  }
}


export default Article as ComponentClass
