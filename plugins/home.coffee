# Homepage plugin
# Inspired by shovon.github.io

module.exports = (env, callback) ->

  defaults =
    homePage: 'true'
    template: 'home.hbs'
    articles: 'articles'
    filename: 'index.html'
    blogPage: '/blog/'

    # There's already a `paginator.perPage`. We don't need another
    # `home.articlesPerPage`, since the former represents the latter exactly.
    articlesPerPage: 3

  options = env.config.home or {}
  for key, value of defaults
    if defaults.hasOwnProperty key
      options[key] ?= defaults[key]

  options.socials ?= []

  options.articles = env.config.shared.articles or options.articles

  getArticles = (contents) ->
    articles = contents[options.articles]._.directories.map((item) ->
      item.index
    )
    articles.sort (a, b) -> b.date - a.date
    return articles

  class HomePage extends env.plugins.Page

    constructor: (@articles) ->

    getFilename: -> 'index.html'

    getView: -> (env, locals, contents, templates, callback) ->
      template = templates[options.template]
      if not template?
        return callback new Error "unknown template '#{ options.template }'"

      ctx =
        homePage: true
        env: env

        contents: contents
        articles: @articles.slice 0, options.articlesPerPage

        blogPage: options.blogPage
        socials: options.socials

      env.utils.extend ctx, locals

      template.render ctx, callback

  env.registerGenerator 'home', (contents, callback) ->
    callback null, 'index.page': new HomePage getArticles contents

  callback()