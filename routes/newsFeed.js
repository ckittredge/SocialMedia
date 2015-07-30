var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    next();
});

/* GET news feed items. */
router.get('/items/:user_id', function(req, res, next) {
  res.json({data: [
                {
                    type: 0,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Kittredge',
                        imageUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/0ad/39d/0944912.jpg'
                    },
                    text: 'I just ate some great Sushi!',
                    createDT: new Date('07/28/2014')
                },
                {
                    type: 1,
                    user: {
                        firstName: 'Chris',
                        lastName: 'Rock',
                        imageUrl: 'http://d1oi7t5trwfj5d.cloudfront.net/b8/fb/e79307884bf98515e3317b78e1f1/chris-rock.jpg'
                    },
                    text: 'I hate when people post about food!',
                    createDT: new Date('07/29/2014')
                }]});
});

module.exports = router;