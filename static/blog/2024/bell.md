---
slug: bell
date: "2024-01-22"
title: Bell
image: 
blurb: A REST scripting language
github: https://github.com/pjflanagan/bell
website: 
---

I've always felt that Postman was too bogged down with menus. Collaboratively, Postman does not work as well as Github.

As a programmer, nothing is more clear than a simple script. It's just text, that does what it says it will do. Nothing is buried in menus or tabs.

A simple bell file might look like this:

```
# status.GET.bell
id = 1234
url test.com/status/{id}
GET
```
