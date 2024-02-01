/**
 * @function 初始化vite-plugin-cdn-import所需的modules
 * @returns {array[object]} cdn modules
 *
 * TODO: vue3在持续更新 cnd版本也需要持续关注
 *
 * vue v3.2.25
 * vue-router v4.0.14
 * html2canvas v1.4.1 (https://html2canvas.hertzen.com)
 * vConsole v3.14.6 (https://github.com/Tencent/vConsole)
 */
export const initCdnModules = (baseUrl = '') => {
  /**
   * @field name {string} 需要 CDN 加速的包名称
   * @field var {string} 全局分配给模块的变量，Rollup 需要这个变量名称
   * @field path {string | string[]} 指定 CDN 上的加载路径
   * @field css {string | string[]} 可以指定从 CDN 地址上加载多个样式表
   */
  const cdns = [
    {
      name: 'vue',
      var: 'Vue',
      path: `${baseUrl}vue3.min.js`
    },
    {
      name: 'vue-router',
      var: 'VueRouter',
      path: `${baseUrl}vue-router4.min.js`
    },
    {
      name: 'html2canvas',
      var: 'html2canvas',
      path: `${baseUrl}html2canvas.min.js`
    },
    {
      name: 'vconsole',
      var: 'VConsole',
      path: `${baseUrl}vconsole.min.js`
    }
  ]

  return cdns
}
