import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { formatTimeStampToTime } from '@/utils/index'
import './index.scss'

type Props = {
  list: Array<{
    artId: string,
    createTime: number,
    artName: string,
    artSummary: string,
    cateDesc: string,
    artTags: Array<string>,
    artThumb: Array<{
      url: string
    }>
  }>
}
export default class List extends Component<Props, {}> {
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
        {list && list.map(item => (
          <View className='article-list_item' key={item.artId} onClick={this.goDetail.bind(this, item)}>
            <View className='article-list_item-l'>
              <View className='item-title text-line2-ellipsis'>
                {item.artName}
              </View>
              <View className='item-intro'>
                {item.artSummary}
              </View>
              {/* <View className='mt10'>
                {
                  item.artTags && item.artTags.map((val, idx) => (
                    <Text className='item-tag' key={idx}>{val}</Text>
                  ))
                }
              </View> */}
              <View className='item-create-time mt10'>
                {formatTimeStampToTime(item.createTime)}
              </View>
            </View>
            {item.artThumb &&
              <View className='article-list_item-r'>
                <Image className='article-list_item-r_img'

                  src={item.artThumb[0].url}
                />
              </View>
            }

          </View>
        ))}
      </View>
    )
  }
}
