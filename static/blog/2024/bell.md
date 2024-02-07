---
slug: bell
date: "2024-01-22"
title: Bell
image: /blog/2024/bell.png
blurb: A REST scripting language
github: https://github.com/pjflanagan/bell
website: 
---

I've always felt that Postman was too bogged down with menus. Collaboratively, Postman does not work as well as Github. Postman for teams is also expensive.

As a programmer, nothing is more clear than a simple script. It's just text that does what it says it will do. Nothing is buried in menus or tabs.

So I came up with bell.

A simple bell file might look like this:

```
# status.GET.bell
id = 1234
url test.com/status/{id}
GET
```

A more complicated one like this:

```
# status.POST.bell

domain "test.com"
path "/login"

body
{
  username: "testuser",
  password: "testpass"
}

POST

token = response.body.token

path "/post"

headers
{
  Authorization: `Bearer: ${token}`
} 

body
{
  message: input('Write a message')
}

POST

log response.body.status
```

With the help of some syntax highlighting and VSCode plugins, this script language could be a viable alternative to Postman.
