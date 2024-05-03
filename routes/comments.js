// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from 'express';
import { properties, comments } from '../data/index.js';
import { ObjectId } from 'mongodb';
import { validateId, validateString } from '../helpers.js';
const router = express.Router();

router
  .route('/:propertyId')
  .get(async (req, res) => {
    //code here for GET
    try {
      const propertyId = req.params.propertyId;
      if (!ObjectId.isValid(propertyId)) {
        return res
          .status(400)
          .render('error', { title: 'error', error: 'invalid property Id' });
      }
      const property = await comments.getAllComments(propertyId);
      if (!property)
        return res.status(404).json({ error: 'property not found' });
      if (!property || property.length === 0)
        return res.status(404).json({ error: 'comments not found' });
      return res.status(200).json(property);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    //code here for POST

    let isAuthenticated = false;
    if (req.session.user) {
      isAuthenticated = true;
    }
    const propertyId = req.params.propertyId;
    const commentData = req.body;
    if (!ObjectId.isValid(propertyId))
      return res.status(400).json({ error: 'Invalid propertyId' });
    if (!commentData || Object.keys(commentData).length === 0)
      return res
        .status(400)
        .render('error', { title: 'error', error: 'invalid property Id' });

    try {
      req.body.commentText = validateString(
        req.body.commentText,
        'CommentText'
      );
    } catch (e) {
      return res
        .status(400)
        .render('error', { title: 'error', error: 'invalid property Id' });
    }
    try {
      const userId = req.session.user.id;
      const CommentText = req.body.commentText;
      const property = await comments.createComment(
        propertyId,
        userId,
        CommentText
      );
      const propertyDetails = await properties.get(req.params.propertyId);
      res.render('property', {
        title: 'Property',
        propertyDetails: propertyDetails,
        isAuthenticated: isAuthenticated,
      });
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  });

router
  .route('/comment/:commentId')
  .get(async (req, res) => {
    //code here for GET
    const commentId = req.params.commentId;
    if (!ObjectId.isValid(commentId))
      return res.status(400).json({ error: 'invalid commentId' });
    try {
      const comment = await comments.getComment(commentId);
      return res.status(200).json(comment);
    } catch (e) {
      res.status(404).json({ error: 'comment not found' });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    const commentId = req.params.commentId;
    if (!ObjectId.isValid(commentId)) {
      return res.status(400).json({ error: 'invalid commentId' });
    }
    try {
      const updatedPropertyAfterDeletion = await comments.removeComment(
        commentId
      );
      return res.status(200).json(updatedPropertyAfterDeletion);
    } catch (e) {
      return res.status(404).json({ error: 'comment not found' });
    }
  });

export default router;
