# Local Area Restaurant Review App

## Objectives

This should behave as a progressive web application serving the cached content first and defaulting to the server if no cache content is found. The site is available offline.

The website should observe and comply with best practices for accessibility.

## How to use

Please download the zip file and open index.html. The service worker will run and cache the resources, navigate with network enabled through the pages of the application.

You will also need to download Python from [here](https://www.python.org/downloads/)

Depending on your version run:

- Python 2: python -m SimpleHTTPServer 8000
- Python 3: python3 -m http.server 8000

### Testing no connectivity

To test no connectivity, open the browser's developer tools and on the network tab, tick the offline checkbox and run the pages you have previously cached.

## What to do to improve this project?

Add update notifications to the service worker that allow the refresh of the page.
