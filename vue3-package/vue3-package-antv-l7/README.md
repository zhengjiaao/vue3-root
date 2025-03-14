# vue3-package-antv-l7

This template should help get you started developing with Vue 3 in Vite.

- [AntV 官网](https://antv.antgroup.com/)
- [AntV/L7 地图](https://l7.antv.antgroup.com/zh)

## AntV/L7 地图前提条件-申请地图API Key

> 生产环境需要申请地图API Key

- [申请地图API Key-高德](https://lbs.amap.com/api/javascript-api/guide/abc/prepare)
- [申请地图API Key-MapBox](https://docs.mapbox.com/help/glossary/access-token/)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## 安装组件

```sh
# 安装 antv/l7 地图
npm install --save @antv/l7
# 安装第三方底图依赖
npm install --save @antv/l7-maps

# 可选的组件

# 绘制组件（支持绘制点、线、面、矩形、圆等）
npm install --save @antv/l7-draw
# 行政区域数据可视化
npm install --save @antv/l7plot

```

## 组件应用

### AntV/L7 地图

在 Vue 3 和 TypeScript 的环境中集成 L7 和高德地图，可以通过以下步骤实现。我们将结合 Vue 3 的组件化开发模式和 TypeScript 的类型安全特性，来构建一个基于 L7 和高德地图的地理数据可视化应用。

#### 1.准备工作

1.1 安装依赖

```shell
npm install @antv/l7 @antv/l7-maps
```

* @antv/l7: L7 核心库。
* @antv/l7-maps: L7 的地图适配器，支持高德地图等

1.2 获取高德地图 API Key

在 [高德开放平台](https://lbs.amap.com/?spm=a2ty_o01.29997169.0.0.3d4d5171CyxxqD) 注册账号并获取 API Key。

#### 2. 创建 Vue 组件

我们创建一个 Vue 3 组件，用于加载高德地图并展示 L7 的可视化效果。

2.1 创建 L7Map.vue 文件

```vue
<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';

export default defineComponent({
  name: 'L7Map',
  setup() {
    const mapContainer = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (mapContainer.value) {
        // 初始化 L7 场景
        const scene = new Scene({
          id: mapContainer.value, // 指定容器
          map: new GaodeMap({
            style: 'dark', // 地图样式
            center: [120.19382669582967, 30.258134], // 初始中心点坐标
            zoom: 10, // 初始缩放级别
            pitch: 0, // 倾斜角度
            key: '你的高德地图API Key', // 替换为你的高德地图 API Key
          }),
        });

        // 场景加载完成后执行的操作
        scene.on('loaded', () => {
          console.log('地图加载完成');
        });
      }
    });

    return {
      mapContainer,
    };
  },
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px; /* 设置地图容器的高度 */
}
</style>
```

#### 3. 在主应用中使用组件

在你的主应用文件（如 App.vue）中引入并使用 L7Map 组件。

3.1 修改 App.vue

```vue
<template>
  <div id="app">
    <h1>L7 集成高德地图示例</h1>
    <L7Map />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import L7Map from './components/L7Map.vue';

export default defineComponent({
  name: 'App',
  components: {
    L7Map,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
```

#### 4. 运行应用

```shell
npm run dev
```

#### 5. 添加数据可视化层

如果你想在地图上添加点、线或面等数据可视化层，可以在 L7Map.vue 中扩展代码。以下是一个简单的点数据可视化示例：

修改 L7Map.vue

```javascript
import { PointLayer } from '@antv/l7';

// 点数据
const pointData = [
  { lng: 120.19382669582967, lat: 30.258134, value: 10 },
  { lng: 120.2, lat: 30.3, value: 20 },
];

scene.on('loaded', () => {
  console.log('地图加载完成');

  // 添加点图层
  const pointLayer = new PointLayer()
    .source(pointData, {
      parser: {
        type: 'json',
        x: 'lng',
        y: 'lat',
      },
    })
    .shape('circle')
    .size('value', [10, 50]) // 根据 value 动态调整点的大小
    .color('value', ['#f00', '#0f0']) // 根据 value 动态调整颜色
    .style({
      opacity: 0.8,
    });

  // 将图层添加到场景中
  scene.addLayer(pointLayer);
});
```
