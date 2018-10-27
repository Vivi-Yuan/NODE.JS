## CMS  内容管理系统

### 用到的技术
* html  css  js
* Bootstrap  框架
* Node.js
* Express 框架
* mongoDB
    * mongoose
* 文件上传
* multer模块
* 验证码模块 	captchapng
* 加密的方式	md5

### 网页前台：
1. ##### 首页
2. ##### 列表页
	- 全部文章列表
	- 分类文章列表
	- 分页
3. ##### 内容页
4. ##### 搜索页
	- 模糊搜索
5. ##### 友链链接

### 管理员后台：
1. ##### 账号/密码：
	- vivi/vivi
	- cici/cici

2. ##### 管理员首页
	- 判断登录状态
	- 验证码 判断

3. ##### 栏目管理

		属性 		类型			描述
		_id			ObjectId		一条数据的唯一标记
		name 		String			栏目名称
		info 		String			栏目简介
		ctime		Date			栏目创建时间
		order		Number			排序

	- 添加栏目
	- 栏目列表
	- 删除栏目
	- 编辑栏目
4. ##### 文章管理

		属性 			类型			描述
		_id				ObjectId		一条数据的唯一标记
		itemId	 		ObjectId		所在栏目
		title 			String			标题
		author 			String			作者
		content 		String 			内容
		keywords		String			关键字
		description		String			描述
		imgurl			String 			封面路径
		ctime 			Date			栏目创建时间

	- 添加文章
	- 文章列表
	- 分页
	- 文章封面
	- 删除文章
	- 编辑文章
5. ##### 管理员管理

		属性 			类型				描述
		_id				ObjectId		一条数据的唯一标记
		name	 		String			账号
		password		String			密码
		info  			String          简介
		tel  			String          电话
		ctime 			Date			创建时间

	- 添加管理员
	- 管理员列表
	- 删除管理员
	- 编辑管理员
	- 验证码 判断

6. ##### 友情链接管理

		属性 			类型				描述
		_id				ObjectId		一条数据的唯一标记
		name	 		String			账号
		addr			String			地址
		info  			String          简介
		ctime 			Date			创建时间

	- 添加友情链接
	- 友情链接列表
	- 删除友情链接

### 项目目录结构

	-|bin/							启动项目录
	-|--|www 						启动文件
	-|configs/						配置文件目录
	-|--|db_config.js       		数据库的配置文件
	-|--|uploadImage_config.js      图片上传配置文件
	-|controllers/					控制器的目录
	-|--|adminController.js 		管理员的控制器
	-|--|indexController.js 		首页的控制器
	-|models/						放 model 目录
	-|--|itemModel.js 				栏目的数据模型
	-|--|articleModel.js 			文章的数据模型
	-|--|adminModel.js 				管理员的数据模型
	-|--|linkModel.js				友情链接的数据模型
	-|routes/						路径文件的目录
	-|--|index.js 					前台路由(用户)
	-|--|admin.js 					后台路由(管理员)
	-|views/						模版(视图)目录
	-|--|admin/						管理员页面目录
	-|--|index.ejs					网站首页
	-|--|alist.ejs					文章内容页
	-|--|details.ejs				全部文章列表页
	-|--|error.ejs					报错页
	-|--|header.ejs					头部
	-|--|footer.ejs					尾部
	-|--|list.ejs					全部文章列表页
	-|--|search.ejs					模糊搜索文章列表
	-|public/						静态资源库
	-|--|assets/					管理员页面模版资源目录
	-|--|ueditor/					百度富文本编辑器
	-|--|js/						js 的目录
	-|--|css/						css 的目录
	-|--|images/					图片的目录
	-|uploads/						接收上传图片的目录
	-|node_modules/					项目依赖模块的目录（删了，需要重新安装依赖模块）
	-|app.js 						项目入口文件
	-|package.json 					项目的配置文件