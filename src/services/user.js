import express from 'express'
import { User } from '../models'
import passport from 'passport';
var router = express.Router();


router.post('/login', passport.authenticate('local'), (req, res, next)=> {
  res.redirect('/');
});

router.post('/register', passport.authenticate('local'), (req, res, next)=> {
  User.register(new User({username: req.body.username}), req.body.password, (err, account)=> {
    if (err) {
      return res.render('register', {account: account});
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

module.exports = router;