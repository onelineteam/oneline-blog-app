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

  render() {
    const { list } = this.props
    return (
      <View className='article-list'>
        {list.map(item => (
          <View className='article-list_item' key={item.id}>
            <View className='article-list_item-l'>
              <View>
                <Text >
                  {item.title}
                </Text>
              </View>
              <View>
                <Text >
                  {item.intro}
                </Text>
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
