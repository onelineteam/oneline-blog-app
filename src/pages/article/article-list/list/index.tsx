import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

type Props = {
  list: Array<{
    id: number,
    title: string,
    intro: string,
    img: string,
  }>
}
export default class SwiperBanner extends Component<Props, {}> {
  // app全局样式在组件中生效
  static options = {
    addGlobalClass: true
  }
  goDetail = (item) => {
    Taro.navigateTo({
      url: `/pages/article/article-detail/article-detail?id=${item.id}`
    })
  }
  render() {
    const { list } = this.props
    return (
      <View className='article-list'>
        {list.map(item => (
          <View className='article-list_item' key={item.id} onClick={this.goDetail.bind(this,item)}>
            <View className='article-list_item-l mr10'>
              <View className='item-title text-line2-ellipsis'>
                {item.title}
              </View>
              <View className='item-intro'>
                  {item.intro}
              </View>
            </View>
            <View className='article-list_item-r'>
              <Image
                className='article-list_item-r-img'
                src={item.img}
              />
            </View>
          </View>
        ))}
      </View>
    )
  }
}
