import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import Banner from './banner'
import List from './list'
import './article-list.scss'
import { API_ARTICLE } from '../../services/api'
import fetch from '../../services/fetch'
type PageState = {
  bannerList: Array<any>,
  contentList: Array<any>
}

class Article extends Component<{}, PageState> {

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
        {
          id: 3,
          title: '文章3',
          intro: '这是文章3',
          img: 'https://yanxuan.nosdn.127.net/1f31c090095d995bf856b990fc106be6.jpg'
        },
        {
          id: 4,
          title: '文章4',
          intro: '这是文章4',
          img: 'https://yanxuan.nosdn.127.net/1f31c090095d995bf856b990fc106be6.jpg'
        },
      ]
    }
  }

  componentWillUnmount() { }

  componentDidShow() {
    this.getArticleList()
  }

  componentDidHide() { }

  getArticleList() {
    fetch.post({
      url: API_ARTICLE,
      data: {
        request: [
          {
            type: 'article',
            action: 'cateList',
            params: {
              index: 1,
              size: 20
            }
          }
        ]

      }
    }).then(res => {
      console.log(res.data.data, '请求列表');

    })
  }

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
