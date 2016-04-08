import express from 'express';
import { Blog } from '../models';

var router = express.Router();

router.get('/', (req ,res ,next)=> {
    Blog.find({}, (err, blogs)=> {
        console.log('blog service request');
        if (err) return next(err);
        res.send(blogs);
    });
});

router.post('/', (req ,res ,next)=> {
    Blog.create(req.body, (err, post)=> {
        if (err) return next(err);
        res.send(post);
    });
});

router.get('/:id', (req ,res ,next)=> {
    Blog.findById(req.params.id, (err, post)=> {
        if (err) return next(err);
        res.send(post);
    });
});

router.put('/:id', (req, res, next)=> {
    Blog.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, post)=> {
        if (err) return next(err);
        res.send(post);
    });
});

router.delete('/:id', (req ,res ,next)=> {
    Blog.findByIdAndRemove(req.params.id, req.body, (err)=> {
        if (err) return next(err);
        res.send({success: true});
    });
});

export default router;

