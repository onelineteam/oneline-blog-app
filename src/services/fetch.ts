const baseUrl = "https://api.wutongwei.com";
import Taro from '@tarojs/taro'
// import { logError } from './error'
export default {
  /**
   * 
   * @param {object} params 请求参数 {url:请求地址;data:请求参数;isShowLoading:是否显示遮罩层;loadingText:加载文字}
   * @param method 
   */
  baseOptions(params, method = 'GET') {
    const isShowLoading = params.isShowLoading == false ? false : true;
    const loadingText = params.loadingText || '加载中'
    if (isShowLoading) {
      Taro.showLoading({
        title: loadingText,
        mask: true
      })
    }
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    type OptionType = {
      url: string,
      data?: object | string,
      method?: any,
      header: object,
      success: any,
      error: any,
      xhrFields: object,
    }
    const setCookie = (res: {
      cookies: Array<{
        name: string,
        value: string,
        expires: string,
        path: string,
      }>,
      header: {
        'Set-Cookie': string
      }
    }) => {
      if (res.cookies && res.cookies.length > 0) {
        let cookies = ''
        res.cookies.forEach((cookie, index) => {
          // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
          if (cookie.name && cookie.value) {
            cookies += index === res.cookies.length - 1 ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` : `${cookie.name}=${cookie.value};`
          } else {
            cookies += `${cookie};`
          }
        });
        Taro.setStorageSync('cookies', cookies)
      }
      if (res.header && res.header['Set-Cookie']) {
        Taro.setStorageSync('cookies', res.header['Set-Cookie'])
      }
    }
    const option: OptionType = {
      url: baseUrl + params.url,
      data: params.data,
      method: method,
      header: {
        'content-type': contentType,
        cookie: Taro.getStorageSync('cookies')
      },
      xhrFields: { withCredentials: true },
      success(res) {
        if (isShowLoading) {
          Taro.hideLoading()
        }
        setCookie(res)
        if (res.statusCode === 404) {
          // return logError('api', '请求资源不存在')
          Taro.showToast({
            title: '请求资源不存在',
            icon: 'none'
          })
        } else if (res.statusCode === 502) {
          // return logError('api', '服务端出现了问题')
          Taro.showToast({
            title: '服务端出现了问题',
            icon: 'none'
          })
        } else if (res.statusCode === 403) {
          // return logError('api', '没有权限访问')
          Taro.showToast({
            title: '没有权限访问',
            icon: 'none'
          })
        } else if (res.statusCode === 200) {
          if(!res.data.success){
            Taro.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
          return res.data
        }
      },
      error() {
        if (isShowLoading) {
          Taro.hideLoading()
        }
        Taro.showToast({
          title: '请求接口出现问题',
          icon: 'none'
        })
        // logError('api', '请求接口出现问题', e)
      }
    }
    // eslint-disable-next-line
    return Taro.request(option)
  },
  get(option?: object) {
    return this.baseOptions(option)
  },
  post: function (option) {
    return this.baseOptions(option, 'POST')
  },
  put(option) {
    return this.baseOptions(option, 'PUT')
  },
  delete(option) {
    return this.baseOptions(option, 'DELETE')
  }
}


