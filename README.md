# Spring-activiti

#### 软件架构
Ruoyi-boot[输入链接说明](http://doc.ruoyi.vip/ruoyi/)是有名的开源权限管理系统，集权限管理和代码快速生成于一体，将其作为基础开发平台集成activiti框架完成工作流引擎开发，打造流程设计、流程管理、流程执行、任务办理、流程监控于一体的强大工作流平台。

#### 安装教程

1. 新建mysql数据库ry-activiti，导入SQL脚本ry-activiti.sql。
2. 编译打包工程，运行java -jar ruoyi-admin.jar。
3. 打开http://localhost访问登录页面。

#### 使用说明

1.  为保持平台的通用性，所有的用户任务办理的接口可以复用/task/manage/completeTask/{taskId}。
2.  对于表单的处理，一律使用外置表单，将业务表单数据保存在业务表中，不保存在activiti流程的变量表中。
3.  前端页面与用户任务通过formkey进行管联，办理任务时，用过获取formkey值展示对应的前端页面。
4.  整合流程图在线设计器，设计后需要发布，完成流程的部署。
5.  如需添加新的流程，设计好后还需编写前后端代码完成业务逻辑的开发。
6.  增删改查、权限管理、代码生成、页面交互的基础设施由若依平台提供。
7.  流程实例管理用于管理正在运行的流程实例列表，你可以挂起或唤醒一个流程实例。
8.  流程运行历史用于查看流程的历史记录（包含运行中和已结束），还可以查看所有流程的变量。
#### 效果图
- 模型管理和流程设计：

![输入图片说明](pic/%E8%AE%BE%E8%AE%A1%E5%99%A8.gif)

- 请假流程

![输入图片说明](pic/%E8%AF%B7%E5%81%87%E6%B5%81%E7%A8%8B.gif)

- 采购流程

![输入图片说明](pic/%E4%BC%9A%E8%AE%AE%E6%B5%81%E7%A8%8B.gif)

- 流程监控

![输入图片说明](pic/%E6%B5%81%E7%A8%8B%E7%9B%91%E6%8E%A7.gif)

- 登录页

![输入图片说明](pic/%E7%99%BB%E5%BD%95.jpg)

- 流程图在线设计

![输入图片说明](pic/%E6%B5%81%E7%A8%8B%E5%9B%BE%E8%AE%BE%E8%AE%A1%E5%99%A8.jpg)

- 模型管理

![输入图片说明](pic/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86.jpg)

- 功能表

![输入图片说明](pic/%E5%8A%9F%E8%83%BD%E8%A1%A8.jpg)

- 流程实例管理

![输入图片说明](pic/%E6%B5%81%E7%A8%8B%E5%AE%9E%E4%BE%8B%E7%AE%A1%E7%90%86.jpg)

- 流程运行历史

![输入图片说明](pic/%E6%B5%81%E7%A8%8B%E8%BF%90%E8%A1%8C%E5%8E%86%E5%8F%B2.jpg)

#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
