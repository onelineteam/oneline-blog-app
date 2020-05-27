import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'

type Props = {
  list: Array<{
    img: string,
    rank: number
  }>
}
export default class Banner extends Component<Props,{}> {
  
  render () {
    const { list } = this.props
    return (
      <View className='article-banner'>
        <Swiper
          className='article-banner__swiper'
          circular
          autoplay
          indicatorDots
          indicatorActiveColor='#656EE3'
        >
          {list.map(item => (
            <SwiperItem
              key={item.rank}
              className='article-banner__swiper-item'
            >
              <Image
                className='article-banner__swiper-item-img'
                src={item.img}
              />
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    )
  }
}
