'use strict';

const $ = require('jquery');

// TODO use bluebird for older browsers.
const API = {
  createComment(newComment) { 
    return new Promise((resolve, reject) => {
      $.ajax({
        url: window.location + '/add_comment',
        method: 'POST',
        data: {
          comment: {
            body: newComment.content,
            username: newComment.author,
            parent_id: newComment.parentId ? newComment.parentId : null
          }
        },
        success(data) {
          resolve(data);
        },
        error(err) {
          reject(err);
        }
      });
    });
  }
};

module.exports = API;
