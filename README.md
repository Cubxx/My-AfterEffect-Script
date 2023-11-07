- [脚本依赖包](#脚本依赖包)
- [脚本列表](#脚本列表)
  - [Toolbox.jsx](#toolboxjsx)
  - [ShapeLayerSaver.jsx](#shapelayersaverjsx)
***

# 脚本依赖包
如无特殊说明，包/模块文件都应放到`.\Support Files\Scripts\Startup`

本项目所有脚本都需要依赖包: **[cubx-package.jsx](./cubx-package.jsx)**
|                     脚本                     |        其他依赖包        |
| :------------------------------------------: | :----------------------: |
|         [Toolbox.jsx](./Toolbox.jsx)         |                          |
| [ShapeLayerSaver.jsx](./ShapeLayerSaver.jsx) | [json2.jsx](./json2.jsx) |


# 脚本列表
如无特殊说明，脚本都应放到`.\Support Files\Scripts\ScriptUI Panels`


## [Toolbox.jsx](./Toolbox.jsx)
私的个人工具箱


## [ShapeLayerSaver.jsx](./ShapeLayerSaver.jsx)
用于形状层存储

**导入图层**: 选择json文件导入

**导出图层**: 导出为json文件，默认导出路径为 `C:\Users\用户名\Documents\ShapeLayerSaver\layers`

> 如果默认路径不存在，则新建文件夹
>
> 每个图层对应一个json文件。如果图层名重复，会提示是否覆盖
