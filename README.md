- [脚本依赖包](#脚本依赖包)
  - [cubx-package.js](#cubx-packagejs)
- [脚本列表](#脚本列表)
  - [Shape Layer Saver.jsx](#shape-layer-saverjsx)
***

# 脚本依赖包
**使用脚本前需要先安装以下所有文件**

如无特殊说明，包/库/模块文件都应放到`.\Support Files\Scripts\Startup`

## cubx-package.js

# 脚本列表

如无特殊说明，脚本都应放到`.\Support Files\Scripts\ScriptUI Panels`

## Shape Layer Saver.jsx

用于形状层存储

**导入图层**: 从文件/文件夹导入，默认导入路径为`当前工程文件夹\layers`

> 如果默认路径不存在，则打开文件选择框

**导出图层**: 导出为json文件，默认导出路径为`当前工程文件夹\layers`

> 如果默认路径不存在，则新建文件夹
>
> 每个图层对应一个json文件。如果图层名重复，只会导出最后一个图层

> 放至`Startup`文件夹可作为模块使用，通过全局变量`ShapeLayerSaver`调用模块
>
> 作为模块使用前，需要删除jsx文件末的UI方法调用
>
> ``` typescript
> // 模块接口
> declare const ShapeLayerSaver: {
>     import_layers(path?: string): void;
>     export_layers(path?: string): void;
>     UI(): void;
> }
> ```
