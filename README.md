- [脚本依赖包](#脚本依赖包)
- [脚本列表](#脚本列表)
  - [Toolbox.jsx](#toolboxjsx)
  - [Shape Layer Saver.jsx](#shape-layer-saverjsx)
***

# 脚本依赖包
如无特殊说明，包/模块文件都应放到`.\Support Files\Scripts\Startup`

|                         脚本                         |                        依赖包                        |
| :--------------------------------------------------: | :--------------------------------------------------: |
|                       所有脚本                       |        [cubx-package.jsx](./cubx-package.jsx)        |
|             [Toolbox.jsx](./Toolbox.jsx)             | [Shape Layer Saver.jsx](./Shape%20Layer%20Saver.jsx) |
| [Shape Layer Saver.jsx](./Shape%20Layer%20Saver.jsx) |               [json2.jsx](./json2.jsx)               |


# 脚本列表
如无特殊说明，脚本都应放到`.\Support Files\Scripts\ScriptUI Panels`


## [Toolbox.jsx](./Toolbox.jsx)
私的个人工具箱


## [Shape Layer Saver.jsx](./Shape%20Layer%20Saver.jsx)
用于形状层存储

**导入图层**: 选择json文件导入

**导出图层**: 导出为json文件，默认导出路径为 `C:\Users\用户名\Documents\ShapeLayerSaver\layers`

> 如果默认路径不存在，则新建文件夹
>
> 每个图层对应一个json文件。如果图层名重复，只会导出最后一个图层

**作为模块**: 放至`Startup`文件夹，通过全局变量`ShapeLayerSaver`调用模块

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
