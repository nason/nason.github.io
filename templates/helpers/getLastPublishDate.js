module.exports = function() {
  var articles = this.env.helpers.getArticles(this.contents);
  return articles[0].rfc822date;
};