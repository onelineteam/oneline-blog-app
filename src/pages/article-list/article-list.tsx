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
    cateId: string
  }>,
  articleList: Array<{
    artId: string,
    createTime: number,
    artName: string,
    artSummary: string,
    cateDesc: string,
    artTags: Array<string>,
    artThumb: Array<{
      url: string
    }>
  }>,
  activeIndex: number,
  cateId: string,
  index: number,
  size: number,
  hasMore: boolean,
}

class ArticleIist extends Component<{}, PageState> {

  config: Config = {
    navigationBarTitleText: 'One Line',
  }

  constructor(props) {
    super(props)
    this.state = {
      bannerList: [
        {
          rank: 1,
          img: 'http://imagetest.meilif.cn/meiyehui/20200528/fG2aY6nbnJ354261439480158420.png'
        },
        // {
        //   rank: 2,
        //   img: 'https://yanxuan.nosdn.127.net/1f31c090095d995bf856b990fc106be6.jpg'
        // },
      ],
      articleList: [],
      articleCateTyepList: [],
      activeIndex: 0,
      cateId: '',
      index: 1,
      size: 20,
      hasMore: true
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
      if (data.articlecateList.rows.length) {
        this.setState({
          articleCateTyepList: data.articlecateList.rows,
          cateId: data.articlecateList.rows[0].cateId
        }, () => {
          this.getArticleList()
        })
      }
    })
  }

  //文章列表
  getArticleList() {
    fetch.post({
      url: API_ARTICLE,
      data: {
        request: [
          {
            type: 'article',
            action: 'list',
            params: {
              cateId: this.state.cateId,
              index: this.state.index,
              size: this.state.size
            }
          }
        ]
      }
    }).then(res => {
      const data = res.data.data
      const earticleListTem = this.state.articleList;
      const articleList = data.articlelist.rows;
      if (articleList.length < this.state.size) {
        this.setState({
          articleList: earticleListTem.concat(articleList),
          hasMore: false
        })
      } else {
        this.setState({
          articleList: earticleListTem.concat(articleList),
          hasMore: true,
          index: this.state.index + 1
        })
      }
    })
  }

  loadRArticleList = () => {
    if (this.state.hasMore) {
      this.getArticleList();
    }
  }

  tabChage(cateId: string, key) {
    this.setState({
      cateId: cateId,
      activeIndex: key,
      index: 1,
      articleList: []
    }, () => {
      this.getArticleList()
    })

  }

  render() {
    const { bannerList, articleCateTyepList, activeIndex, articleList } = this.state
    return (
      <ScrollView
        scrollY
        className='article-view'
        onScrollToLower={this.loadRArticleList}
      >
        <Banner list={bannerList} />
        <ScrollView
          scrollX
          className='article-type-scroll mt20'
        >
          <View className='article-type-view'>
            {articleCateTyepList && articleCateTyepList.map((item, key) => {
              return (
                <View className={classNames('article-type_item', activeIndex == key && 'active')} onClick={this.tabChage.bind(this, item.cateId, key)}>{item.cateName}</View>
              )
            })
            }
          </View>
        </ScrollView>
        <List list={articleList} />
      </ScrollView>
    )
  }
}


export default ArticleIist as ComponentClass
