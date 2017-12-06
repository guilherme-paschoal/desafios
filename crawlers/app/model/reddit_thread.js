'use strict'

var RedditThread = function(score, subreddit, titulo, linkComentarios, linkThread) {
  this.score = score;
  this.subreddit = subreddit;
  this.titulo = titulo;
  this.linkComentarios = linkComentarios;
  this.linkThread = linkThread;
}

RedditThread.prototype.toString = function() {
  return this.score  + ' | ' + this.subreddit + ' | ' + this.titulo  + ' | ' + this.linkComentarios  + ' | ' + this.linkThread;
}

module.exports = RedditThread;