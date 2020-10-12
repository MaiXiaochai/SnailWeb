import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'menu.home': '主页',
  'menu.dashboard': '任务监控',
  'menu.dashboard.analysis': '历史统计',
  'menu.dashboard.monitor': '实时状态',
  'menu.dashboard.workplace': '任务列表',
  'menu.jobs': '任务设置',
  'menu.jobs.editor': '任务编辑'
}

export default {
  ...components,
  ...locale
}
