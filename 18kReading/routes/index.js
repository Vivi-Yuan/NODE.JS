var express = require('express');
var router = express.Router();

// 引入前台控制器
var indexController = require('../controllers/indexController.js');

/* 首页 */
router.get('/',indexController.index);
/* 全部文章-列表页 */
router.get('/list',indexController.list);
/* 分类文章-列表页 */
router.get('/alist/:id',indexController.alist);
/* 内容页 */
router.get('/details/:id',indexController.details);
/* 搜索页 */
router.get('/search',indexController.search);

module.exports = router;
