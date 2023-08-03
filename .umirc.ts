import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'csychenci',
  description: "csychenci's blog",
  base: '/',
  mode: 'site',
  // 页面配置，doc | site
  hash: true,
  sass: {
    // 默认值 Dart Sass，如果要改用 Node Sass，可安装 node-sass 依赖，然后使用该配置项
    // implementation: require('node-sass'),
    // 传递给 Dart Sass 或 Node Sass 的配置项，可以是一个 Function
    sassOptions: {},
  },
  devServer: {
    port: 3000
  },
  dynamicImport: {},
  exportStatic: {},
  fastRefresh: {},
  // Plugin:['@umijs/plugin-access'],
  // routes: [{
  //   path: "/stylesheets/layout",
  //   access: false
  // }] as IRoute[],
  workerLoader: {

  },
  favicon:
    '/image/fav.png',
  logo: '/image/fav.png',
  // more config: https://d.umijs.org/config
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    // {
    //   title: '原站',
    //   isRootNav: true,
    //   path: 'https://jetmine.cn',
    // },
    {
      title: '外部站点',
      isRootNav: true,
      path: '/extendweb',
    },
    {
      title:'随笔',
      isRootNav: true,
      path: '/vlog',
    },
    {
      title: '合集',
      isRootNav: true, // 配置是否作为一级导航栏展示
      // path: '链接是可选的',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        {
          title: 'JavaScript',
          path: '/javascript',
        },
        // {
        //   title: 'JavaScript进阶',
        //   path: '/level',
        // },
        {
          title: 'NodeJs',
          path: '/nodejs',
        },
        {
          title: 'React',
          path: '/react',
        },
        {
          title: 'Fiber',
          path: '/fiber',
        },
        {
          title: 'Hooks',
          path: '/hooks',
        },
        {
          title: 'Vue',
          path: '/vue',
        },
        {
          title: 'random',
          path: '/wanthome',
        },
        {
          title: 'CSS',
          path: '/css',
        },
        {
          title: '前端数据结构',
          path: '/structure',
        },
        {
          title: 'LeetCode',
          path: '/leetcode',
        },
        {
          title: 'TypeScript',
          path: '/typescript',
        },
        {
          title: 'Class',
          path: '/class',
        },
        {
          title: 'Promise',
          path: '/promise',
        },
        {
          title: '网络向',
          path: '/network',
        },
        {
          title: '移动端开发',
          path: '/mobileweb',
        },
        {
          title: '浏览器原理',
          path: '/browser',
        },
        {
          title: 'rust',
          path: '/rust',
        },
        {
          title: 'Dart',
          path: '/dart',
        },
        {
          title: 'Webpack',
          path: '/webpack',
        },
        {
          title:'可视化',
          path:'/visualization'
        },
        {
          title:'WebGPU',
          path:'/webgpu'
        }
      ],
    },
  ]
});
