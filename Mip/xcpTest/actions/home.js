/**
 * @file 针对特定路由的处理
 * @author wangyisheng@baidu.com (wangyisheng)
 */

module.exports = {
  /**
   * 路由方法，可选值 'get', 'post', 'put', 'del', 'all'
   * 默认 'get'
   *
   * @type {string}
   */
  method: 'get',

  /**
   * 路由规则，内部使用 path-to-regexp 进行匹配
   * 例如 '/weather/:city'。
   * 必填，无默认值。
   *
   * @type {string}
   */
  pattern: '/',

  async handler (ctx, render) {
    ctx.body = render('index', {
      date: '2019/03/10',
      temp: '12',
      text: '晴'
    })
  }
}
