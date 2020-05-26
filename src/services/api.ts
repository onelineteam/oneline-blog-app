/**
 * 接口请求url
 * 
 */
/**
 * NOTE HOST是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
// @ts-ignore
export const host = HOST

 // article
 export const API_ARTICLE = `${host}/api/sw3SYSe0wKeVxRX`