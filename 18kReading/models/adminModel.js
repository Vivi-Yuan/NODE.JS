// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 2. 定义 管理员 集合的 骨架  (用来约束集合的)
var adminSchema =  new mongoose.Schema({
	name : String,  	// 账号
	password:String,
	info : String,		// 简介
	tel  : String,		// 电话
	ctime: {
		type: Date,		//  创建时间
		default: new Date()
	},
});

// 创建 管理员 数据模型
var adminModel = mongoose.model('admin',adminSchema);

// 暴露 adminModel
module.exports = adminModel;