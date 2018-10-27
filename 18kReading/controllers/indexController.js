// 管理员  的控制器
var indexController = {};
// 引入 栏目 数据库模型
var itemModel = require('../models/itemModel.js');
// 引入 文章 数据库模型
var articleModel = require('../models/articleModel.js');
// 引入 文章 数据库模型
var linkModel = require('../models/linkModel.js');


//首页
indexController.index = function(req, res, next) {
	//查询栏目数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			res.send('数据查询失败');
		}else{
			getItemArticles(0);
			function getItemArticles(i){
				articleModel.find({itemId:data[i]._id}).limit(6).populate('itemId',{name:1}).exec(function(err,articles){
					data[i].articlelist = articles;
					if(i<data.length-1){
						getItemArticles(++i);
					}else{
						//查询友情链接数据
						linkModel.find({}).sort({order:1}).exec(function(err,data1){
							if(err){
								res.send('数据查询失败');
							}else{
								//响应模板
								res.render('index',{items:data,link:data1});
							}
						});
					}
				})
			}
		}
	})
}

// 模糊搜索页面
indexController.search = function(req, res, next) {
	//查询栏目数据
	itemModel.find().sort({order:1}).exec(function(err,data){
		if(err){
			res.send('数据查询失败');
		}else{
			var keyword = req.query.keyword;
			console.log(keyword);
			var regex = new RegExp(keyword, 'i');
			//查询对应的文章
			// articleModel.find({$or: [{keyword: regex},{title:regex},{author:regex}]}).populate('itemId',{name:1}).exec(function(err,data1){
			articleModel.find({ $or:[{author:eval('/'+ keyword +'/i')},{title:eval('/'+ keyword +'/i')}] }).populate('itemId',{name:1}).exec(function(err,data1){
				console.log(data1.length);
				//查询友情链接数据
				linkModel.find({}).sort({order:1}).exec(function(err,data2){
					if(err){
						res.send('数据查询失败');
					}else{
						//响应模板
						res.render('search',{items:data,articles:data1,link:data2});
					}
				});
			})
		}
	})
}


//全部文章列表页
indexController.list = function(req, res, next) {
	var miId6=req.params._id;

	// 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		var items=data;
		if(err){
			// 响应 报错模版
			res.send('数据查询失败');
		}else{
			getItemArticles(0);
			function getItemArticles(i){
				// 取栏目对应的 文章
				articleModel.find({}).populate('itemId',{name:1}).exec(function(err,articles){
					var total=articles.length;
	                //当前页面
	                var page = req.query.page?req.query.page:1;
	                //每页显示的数据条数
	                var limit=15;

	                //总页数( ceil 向上取整)
	                var maxPage=Math.ceil(total/limit);
	                //判断上一页的边界
	                if(page<1){page=1};
	                //判断下一页的边界
	                if(page>maxPage){page=maxPage};
	                //偏移量
	                var skip = limit*(page-1);

					// 把查到的栏目文章的列表放到 data 里
					data[i].articlelist = articles;
					if(i<data.length-1){
						getItemArticles(++i);
					}else{
						linkModel.find({}).sort({order:1}).exec(function(err,data1){
							if(err){
								res.send('数据查询失败');
							}else{
								//查询栏目数据
								itemModel.find({_id:req.params.id}).sort({order:1}).exec(function(err,data2){
									articleModel.find({}).sort({'_id':-1}).limit(limit).skip(skip).exec(function(err,data){
                                        if(err){
                                            res.send('数据查询失败');
                                        }else{
											//响应模板
											res.render('list',{items:items,link:data1,articles:data,maxPage:maxPage,page:page ,myId:miId6});
										}
									})
								})
							}
						})
					}
				})
			}
		}
	})
}

//分类列表页
indexController.alist = function(req, res, next) {
	var miId6=req.params.id;

	// 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应 报错模版
			res.send('数据查询失败');
		}else{
			getItemArticles(0);
			function getItemArticles(i){
				// 取栏目对应的 文章
				articleModel.find({itemId:miId6}).populate('itemId',{name:1}).exec(function(err,articles){
					var total=articles.length;
	                //当前页面
	                var page = req.query.page?req.query.page:1;
	                //每页显示的数据条数
	                var limit=15;

	                //总页数( ceil 向上取整)
	                var maxPage=Math.ceil(total/limit);
	                //判断上一页的边界
	                if(page<1){page=1};
	                //判断下一页的边界
	                if(page>maxPage){page=maxPage};
	                //偏移量
	                var skip = limit*(page-1);

					// 把查到的栏目文章的列表放到 data 里
					data[i].articlelist = articles;
					if(i<data.length-1){
						getItemArticles(++i);
					}else{
						linkModel.find({}).sort({order:1}).exec(function(err,data1){
							if(err){
								res.send('数据查询失败');
							}else{
								//查询栏目数据
								itemModel.find({}).sort({order:1}).exec(function(err,data2){
									articleModel.find({}).sort({'_id':-1}).limit(limit).skip(skip).exec(function(err,data){
                                        if(err){
                                            res.send('数据查询失败');
                                        }else{
											//响应模板
											res.render('alist',{items:data2,link:data1,articles:articles,maxPage:maxPage,page:page ,myId:miId6});
										}
									})
								})
							}
						})
					}
				})
			}
		}
	})
}

//内容页
indexController.details = function(req,res, next){
	//查询栏目数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			res.send('数据查询失败');
		}else{
			//查询友情链接数据
			linkModel.find({}).sort({order:1}).exec(function(err,data1){
				if(err){
					res.send('数据查询失败');
				}else{
					//查询文章数据
					articleModel.find({_id:req.params.id}).sort({order:1}).exec(function(err,data2){
						if(err){
							res.send('数据查询失败');
						}else{
							//响应模板
							res.render('details',{items:data,link:data1,articles:data2});
						}
					});
				}
			});
		}
	})
}


//暴露模块
module.exports = indexController;