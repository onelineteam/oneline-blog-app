import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { formatTimeStampToTime } from '@/utils/index'
import './index.scss'

type Props = {
  list: Array<{
    artId: string,
    createTime: number,
    artName: string,
    cateDesc: string,
    artTags: Array<string>,
  }>
}
export default class SwiperBanner extends Component<Props, {}> {
  // app全局样式在组件中生效
  static options = {
    addGlobalClass: true
  }
  goDetail = (item) => {
    Taro.navigateTo({
      url: `/pages/article-detail/article-detail?id=${item.artId}`
    })
  }
  render() {
    const { list } = this.props
    return (
      <View className='article-list'>
        {list.map(item => (
          <View className='article-list_item' key={item.artId} onClick={this.goDetail.bind(this, item)}>
            <View className='article-list_item-l'>
              <View className='item-title text-line2-ellipsis'>
                {item.artName}
              </View>
              <View className='item-intro'>
                {item.cateDesc}
              </View>
              <View className='mt10'>
              {
                item.artTags.map((val, idx) => (
                  <Text className='item-tag' key={idx}>{val}</Text>
                ))
              }
              </View>   
              <View className='item-create-time mt10'>
                {formatTimeStampToTime(item.createTime)}
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
