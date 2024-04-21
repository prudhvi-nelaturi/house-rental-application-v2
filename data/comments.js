import { properties } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import { validateString } from '../helpers.js';

export const createComment = async (propertyId, userId, CommentText) => {
  if (!propertyId || !userId || !CommentText) {
    throw 'All fields need to have valid values';
  }
  propertyId = validateString(propertyId, 'propertyId');
  userId = validateString(userId, 'userId');
  CommentText = validateString(CommentText, 'CommentText');

  if (!ObjectId.isValid(propertyId)) throw 'Invalid PropertyId';
  if (!ObjectId.isValid(userId)) throw 'Invalid userId';
  const commentId = new ObjectId();
  const currentDate = new Date();
  const postTime = currentDate.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const commentObj = {
    commentId: new ObjectId(commentId),
    userId,
    CommentText,
    postTime,
  };
  const propertyCollection = await properties();
  const property = await propertyCollection.findOne({
    _id: new ObjectId(propertyId),
  });
  if (!property) throw 'property not found';
  await propertyCollection.updateOne(
    { _ids: new ObjectId(propertyId) },
    { $push: { comments: commentObj } }
  );
  return commentObj;
};

export const getAllComments = async (propertyId) => {
  if (!propertyId) throw 'propertyId is required';
  if (typeof propertyId !== 'string') throw 'Property Id must be a string';
  if (!ObjectId.isValid(propertyId)) throw 'invalid propertyId';

  const propertyCollection = await properties();
  const property = await propertyCollection.findOne({
    propertyId: new ObjectId(propertyId),
  });
  if (!property) throw 'property not found';
  return property.comments;
};

export const getComment = async (commentId) => {
  if (!commentId) throw 'commentId is required';
  if (typeof commentId !== 'string') throw 'commentId must be a string';
  if (!ObjectId.isValid(commentId)) throw 'Invalid commentId';

  const propertyCollection = await properties();
  const property = await propertyCollection.findOne({
    'comments.commentId': new ObjectId(commentId),
  });
  if (!property) throw 'property not found';
  const foundComment = property.comments.find(
    (comment) => comment.commentId.toString() === commentId
  );
  if (!foundComment) throw 'comment not found';
  return foundComment;
};

export const updateComment = async (commentId, updateObj) => {
  if (!commentId) throw 'commentId is required';
  if (typeof commentId !== 'string') throw 'commentId must be a string';
  if (!ObjectId.isvalid(commentId)) throw 'Invalid commentId';
  const { CommentText } = updateObj;
  updateObj.CommentText = validateString(updateObj.CommentText, 'CommentText');

  const propertyCollection = await properties();
  const property = await propertyCollection.findOne({
    'comments.commentId': new ObjectId(commentId),
  });
  if (!property) throw 'property not found';

  const reqCommentIndex = product.comments.findIndex(
    (comment) => comment.commentId.toString() === commentId
  );

  if (reqCommentIndex < 0) throw 'comment not found';

  property.comments[reqCommentIndex].CommentText = CommentText;

  const currentDate = new Date();
  property.comments[reqCommentIndex].postTime = currentDate.toLocaleString(
    'en-US',
    {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }
  );
  await propertyCollection.updateOne(
    { 'comments.commentId': new ObjectId(commentId) },
    { $set: { comments: property.comments } }
  );
  const updatedProperty = await productCollection.findOne({
    'comments.commentId': new ObjectId(commentId),
  });
  return updatedProperty;
};

export const removeComment = async (commentId) => {
  if (!commentId) throw 'commentId is required';
  if (typeof commentId !== 'string') throw 'commentId must be a string';
  if (!ObjectId.isvalid(commentId)) throw 'Invalid commentId';

  const propertyCollection = await properties();
  const property = await propertyCollection.findOne({
    'comments.commentId': new ObjectId(commentId),
  });
  if (!property) throw 'property not found';

  await propertyCollection.updateOne(
    { 'comments.commentId': new ObjectId(commentId) },
    { $pull: { comments: { commentId: new ObjectId(commentId) } } }
  );

  const finProperty = await propertyCollection.findOne({
    propertyId: property.propertyId,
  });
  return finProperty;
};
