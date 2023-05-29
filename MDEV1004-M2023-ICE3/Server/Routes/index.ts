import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Express' });
});

router.get('/movie-list', function(req, res, next)
{
  res.json({});
});

export default router;
