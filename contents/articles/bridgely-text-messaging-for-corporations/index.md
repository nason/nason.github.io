---
title: 'Bridgely: Text Messaging for Corporations'
author: Michael Nason
date: 2013-10-18
template: article.hbs
categories: Code
comments: true
---

[ForUs](https://www.forusall.com) is on a mission! They are an awesome company that makes interactive & intelligent guides about retirement benefits. Honestly, what do you know about your 401(k)? They help make this stuff simple and actionable. I think its great.

They encountered a bit of a roadblock distributing their content at companies they work with: HR departments often don't have accurate or up-to-date employee email addresses or mobile phone numbers.

![bridgely_logo](bridgely_logo.png)

I teamed up with ForUs to develop an open-source tool, [Bridgely](https://github.com/nason/bridgely), that helps bridge this gap and enables companies to deliver content to employees via text messaging.
<span class="more" />

## Bridgely


At a high level, Bridgely is a mobile communications platform that makes corporate communications via SMS a snap. It is opt-in only, meaning employees have to send a text message to the company to register for these communications.

![Bridgely is a mobile communications platform that gives companies the ability to send text messages to employees](https://raw.github.com/nason/bridgely/master/screenshots/welcome.png)

Not only can Bridgely broadcast messages to any number of employees, two-way communication is also possible. Questions can be asked via SMS, and SMS responses can be stored as tags on each employee. This feature allows a company to ask questions like:


> What department do you work in?


or


> We're planning a company dinner. Would you prefer a chicken, steak, or vegetarian option?


![Bridgely sends questions via SMS](https://raw.github.com/nason/bridgely/master/screenshots/send_question.png) Employee responses are stored in their directory record. The possibilities here really are endless!


## Self-Registration


Bridgely is deployed to a company via a pretty simple campaign: _Text your name to **(999) 999-9999** to receive occasional updates about XYZ_.


#### Phone Numbers


Bridgely utilizes Twilio for messaging capabilities. When Bridgely is set up for a company, it provisions a new phone number from Twilio to be used for sending and receiving text messages.


#### Autoresponders


![Bridgely Company Settings](https://raw.github.com/nason/bridgely/master/screenshots/company_settings.png) Upon registering for mobile communications, Bridgely can respond with welcome text and an optional, uniquely generated link for each employee. This makes further analytics and subsequent integrated content delivery via the web possible.


## Modern Messaging


SMS is widely available, and for the most part unused by employers to communicate with employees. Changing that is simple with Bridgely.


#### SMS Broadcast


Companies can send messages to any number of employees. Employees can be selected one-by-one or filtered by any criteria that has been stored in employee records. ![Employee directories are filterable by any employee data, including question responses](https://raw.github.com/nason/bridgely/master/screenshots/filter_employees.png) Alternatively, the company's entire mobile directory can easily be selected for messaging.


#### Message Variables


When composing a new message in Bridgely, a few variables are available:

* Unique welcome link (the same one that was sent in the autoresponder, if enabled)
* Company name
* Employee's first name

Using the recipient's name in a message is a nice touch that helps the communications seem less robotic and more personal.


#### Asking Questions


This one is huge! Leveraging the message broadcasting capabilities of Bridgely is powerful in itself; the ability to ask questions and process responses is massive.


## Tech Stack


Bridgely is an open-source application made up of two separate components: the frontend and the backend. Both are freely available and easily extensible.


### Backend


**Disclaimer**: I learned Ruby on Rails for this project. In that light, I welcome any code review and/or pull requests

The Bridgely backend is a RESTful Rails 4 API. It uses the rails-api gem to keep the app as lightweight as possible.

The API has three main types of functionality:

1. Serving JSON data to the frontend
2. Receiving and sending message data to Twilio
3. Maintaining a database of all messages, employees, and employee response data


More information about the Bridgely API can be found on GitHub at [https://github.com/nason.bridgely-api](https://github.com/nason.bridgely-api)


### Frontend


The Bridgely frontend is a lightweight Backbone.js single page application. It incorporates Backgrid and some of its plugins for tabular data and filtering, and has basic responsive styling based on Bootstrap. Functionally, it wraps the backend's features in an easy to use interface.

The app will be used by a handful of people to reach thousands of employees. My goal was to design a lightweight, modular, and easily extensible web application. In this regard I think Bridgely's frontend shines. Additional business logic can be added without interfering with Bridgely's core functionality. It's simple, clean code.


## Conclusion


All in all this was an awesome experience. Working with the ForUs team was a pleasure. During the three week project period I tackled new challenges and expanded my programming toolkit every day. I learned Ruby on Rails for Bridgely and anticipate this won't be my last Rails project.

I was personally responsible for architecting Bridgely to meet ForUs's business needs, developing and testing its code, and it felt so great to deliver a full-featured app on time! Very soon, Bridgely will start delivering helpful information to people across the country. I couldn't ask for more.

You can find more about this project on GitHub: [https://github.com/nason/bridgely](https://github.com/nason/bridgely). Feel free to [get in touch](http://nason.us/contact) if you have any questions or would like more information about Bridgely!
