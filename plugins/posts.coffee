# This is a plugin that injects a list of articles to pages.
# Inspired by shovon.github.io

module.exports = (env, callback) ->
  defaults =
    articles: 'articles'

  options = env.config.posts or {}
  for key, value of defaults
    if defaults.hasOwnProperty key
      options[key] ?= defaults[key]

  options.articles = env.config.shared.articles or options.articles

  env.getContents (err, contents) ->
    articles = contents[options.articles]._.directories.map (item) ->
      item.index

    articles.sort (a, b) -> b.date - a.date

    env.locals.articles = articles.slice 0, options.articlesPerPage

    callback()