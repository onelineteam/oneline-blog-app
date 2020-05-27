import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import Banner from './banner'
import List from './list'
import './article-list.scss'
import { API_ARTICLE } from '@/services/api'
import fetch from '@/services/fetch'
import classNames from 'classnames'

type PageState = {
  bannerList: Array<any>,
  articleCateTyepList: Array<{
    cateName: string,
    cateId:string
  }>,
  contentList: Array<any>,
  activeIndex:number,
}

class ArticleIist extends Component<{}, PageState> {

  config: Config = {
    navigationBarTitleText: '',
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
      contentList: [],
      articleCateTyepList: [],
      activeIndex:0,
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentWillMount() {
  
    this.getArticleTypeList()
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() { }

  //文章分类
  getArticleTypeList() {
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
      const data = res.data.data
      if(data.articlecateList.rows.length) {
        this.getArticleList(data.articlecateList.rows[0].cateId)
        this.setState({
          articleCateTyepList: data.articlecateList.rows
        },()=>{
          console.log(this.state.articleCateTyepList,'文章列表接口请求');
        })
      }
    })
  }

  //文章列表
  getArticleList(cateId) {
    fetch.post({
      url: API_ARTICLE,
      data: {
        request: [
          {
            type: 'article',
            action: 'list',
            params: {
              cateId:cateId,
              index: 1,
              size: 20
            }
          }
        ]
      }
    }).then(res => {
      const data = res.data.data
      this.setState({
        contentList: data.articlelist.rows
      })
    })
  }

  loadRArticleList=()=> {
    console.log('11111111');
    
  }

  tabChage(cateId:string,key) {
    this.setState({
      activeIndex:key
    })
    this.getArticleList(cateId)
  }

  render() {
    const { bannerList, articleCateTyepList,activeIndex, contentList } = this.state
    return (
      
        <ScrollView
          scrollY
          className='article-view'
          onScrollToLower={this.loadRArticleList}
        >
           <Banner list={bannerList} />
          <View className='article-type-view flex-box'>
            {articleCateTyepList.map((item, key) => {
              return(
                <View className={classNames('article-type_item', activeIndex == key && 'active')} key={key} onClick={this.tabChage.bind(this, item.cateId,key)}>{item.cateName}</View>
              )
            })
            }
          </View>
          <List list={contentList} />
        </ScrollView>
  
    )
  }
}


export default ArticleIist as ComponentClass
