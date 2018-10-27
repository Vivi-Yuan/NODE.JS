// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 2. 定义友情链接集合的 骨架  (用来约束集合的)
var linkSchema =  new mongoose.Schema({
	name : String,  	// 友情链接名称
	addr : String,		// 友情链接地址
	info : String,		// 友情链接简介
	ctime: {
		type: Date,		//  创建时间
		default: new Date()
	},
});

// 创建 栏目 数据模型
var linkModel = mongoose.model('link',linkSchema);

// 暴露 itemModel
module.exports = linkModel;