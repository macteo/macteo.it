---
layout: post
title: "Customize GitLab interface"
date: 2019-02-23T09:14:20+01:00
categories:
image: /assets/images/gitlab.png
tags: gitlab js css
excerpt_separator: <!--more-->
---

I love [GitLab](https://gitlab.org), I use it daily [@Dimension](https://dimension.it) and I even have an omnibus instance on a [NUC](https://www.intel.com/content/www/us/en/products/boards-kits/nuc.html) @home for my personal projects and scripts.

For instance our teams are adopting Kanban to optimize the process and we heavily rely on [boards](https://about.gitlab.com/product/issueboard/) for issue management. One of the key principles of Kanban is called **visualize** and we would strongly like to customize cards background to immediately recognize different kind of issues between _features_, _bugs_ and generic _tasks_.

<!--more-->

![gitlab-board-white](/assets/images/gitlab/board-white.png#center100r)

Unfortunately and understandably GitLab doesn't provide a way to customize that as it would be difficult to generalize, so we came up with a workaround involving custom made browser plugins (Safari, Chrome and Firefox) that injects javascript and CSS in the board pages. Turns out this approach has many issues:

- Hard to maintain: each time a new feature is introduced, every plugin should be updated and everybody needs to download it.
- Mobile browsers don't support plugins, so the visualization is inconsistent between platforms.
- If someone doesn't upgrade or install the appropriate plugin she'll have a second class experience.

Turns out there's a better solution, suggested by [Kenn Hermann](https://gitlab.com/gitlab-org/gitlab-ce/issues/15635#note_15111380), that involves injecting javascript and CSS through nginx on every served page.

This is what we ended up implementing, but beware that there are security considerations to understand: injecting custom javascript can cause misbehaviors, data leakage or worse[^1].

With this approach we are indeed able to solve every issue we accused using client side browser plugins.

### Custom Javascript and CSS

All we need is some place to host a CSS file an one or more javascript documents.
There are several options, we choose one but you are free to follow other paths.

1. Create a new GitLab group (in our case we named it _public-group_) and project (gitlab-custom-ui), setting the privileges to _Internal_.
2. Disable the features you don't need and ensure that everyone has access in file visualization.
3. Leave the the `master` branch protected, so only members with at least the _maintainer_ privileges can push on that branch. This is paramount to avoid malware javascript injection by unauthorized users.

![gitlab-project-permissions](/assets/images/gitlab-project-permissions.jpeg#center400)

4. Create a _custom.css_ file and _custom.js_ file inside that repository. Those files will be injected on every GitLab page. The external paths will be something like `/public-group/gitlab-custom-ui/raw/master/custom.js`. Replace `public-group` with the name of your group and `gitlab-custom-ui` with the slug of the project, or just copy the proper raw path.

### A second nginx

[GitLab Omnibus](https://docs.gitlab.com/omnibus/) ships everything needed inside a single package, including the nginx web server. However you are free to put another web server like nginx itself in front of GitLab. This is [fully supported](https://docs.gitlab.com/omnibus/settings/nginx.html#using-a-non-bundled-web-server).

So we installed another nginx instance, adjusted the [`gitlab.rb`](https://docs.gitlab.com/omnibus/settings/configuration.html) configuration and created a public project on GitLab itself that will host the javascript and CSS files to be injected.

#### GitLab configuration

Open the [`gitlab.rb`](https://docs.gitlab.com/omnibus/settings/configuration.html) file and be sure that the listening port is set to something different than `80` if you plan to install the other nginx instance on the same machine. In this case we set to it `8088` and disable https listening as the certificate management is demanded to the other nginx instance.

```ruby
nginx['listen_port'] = 8088
nginx['listen_https'] = false
nginx['redirect_http_to_https'] = false
```

#### nginx configuration

This is the nginx configuration we used.

1. Replace `gitlab.example.com` with your domain.
2. Configure TLS properly, I highly suggest [LetsEncrypt](https://letsencrypt.org) but every valid TLS certificate is OK.
3. Customize the javascript and CSS injection path based on your needs. We included jQuery as the initial script is lazy, but the it's completely optional.
4. Include the mime type override only if needed. We did it just because we decided to use directly the raw file provided by GitLab itself. If you choose to host the files elsewhere and the mime type is properly set, that part is not needed.

```nginx
server {
    if ($host = gitlab.example.com) {
        return 301 https://$host$request_uri;
    }
    listen 80;
    server_name gitlab.example.com;
    return 404;
}

server {
  listen 443 ssl;
  server_name gitlab.example.com;

  # Your TLS specification below
  ssl_certificate /etc/gitlab/ssl/example.com.crt;
  ssl_certificate_key /etc/gitlab/ssl/example.com.key;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;
  ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';

  client_max_body_size 5024M;

  location / {
    # We inject three files on every html returned by GitLab
    # * custom.css
    # * jQuery from a CDN
    # * custom.js
    sub_filter '</head>' '\n<link rel="stylesheet" media="all" href="/public-group/gitlab-custom-ui/raw/master/custom.css" type="text/css" />\n<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E=" crossorigin="anonymous"></script>\n<script type="text/javascript" src="/public-group/gitlab-custom-ui/raw/master/custom.js"></script>\n</head>';

    # The GitLab istante IP and listening port
    # You also need to change the GitLab listening port from 80 to 8088
    # It is important to not include a trailing forward slash here otherwise the web IDE won't work anymore
    proxy_pass http://10.10.1.4:8088;
    proxy_set_header   Host $host;
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Host $server_name;
    proxy_set_header   X-Forwarded-Proto   https;

    # Overriding the mime type of the raw javascript so it can be executed.
    # This is necessary
    if ($request_uri ~* /public-group/gitlab-custom-ui/raw/master/custom.js$) {
      add_header Content-Type "text/javascript";
    }
  }
}
```

### Colored cards background

This the lazy javascript we wrote to add background customization based on the labels assigned to each single issue, narrow the width of each column and enlarge the avatars.

In particular if the card includes a label containing a the `feature` word it will be green, bugs will red and tasks yellow.

```js
'use strict';
document.addEventListener("DOMContentLoaded", function (event) {
  (function () {
    if (window.top === window) {
      function addStyleString(str) {
        var node = document.createElement('style');
        node.innerHTML = str;
        document.body.appendChild(node);
      }

      function setListWidth(str) {
        localStorage.setItem('gitlab-list-width', str);
        addStyleString('.board {width: ' + width + 'px;}');
      }

      // Improves the board styles: narrower columns, bigger avatars, colored cards.
      if (window.location.pathname.indexOf("/boards") > -1) {
        var width = localStorage.getItem('gitlab-list-width');
        if (width && width < 50) {
          width = 50;
        } else if (width == null) {
          width = 235;
        }
        addStyleString('.board {width: ' + width + 'px;}');
        addStyleString('img.avatar.s24 {width: 32px; height:32px;}');
        addStyleString('.board-card.feature {background-color: #ECF9DE; }');
        addStyleString('.board-card.task {background-color: #FEFBDA; }');
        addStyleString('.board-card.bug {background-color: #F8D9DD; }');

        window.setInterval(function () {
          $("li.board-card").each(function (index) {
            var match = $(this).text().match(/feature/g);
            if (match && match.length > 0) {
              $(this).addClass('feature');
              $(this).removeClass('bug');
              $(this).removeClass('task');
            }
            match = $(this).text().match(/task/g);
            if (match && match.length > 0) {
              $(this).addClass('task');
              $(this).removeClass('bug');
              $(this).removeClass('fature');
            }
            match = $(this).text().match(/bug/g);
            if (match && match.length > 0) {
              $(this).addClass('bug');
              $(this).removeClass('task');
              $(this).removeClass('feature');
            }
          });
        }
     }
  })();
});
```

This is just a suggestion, the javascript can be surely optimized and with this approach you can add more features.

### Final board appearance

![gitlab-board-colored](/assets/images/gitlab/board-colored.png#center100r)

If the solution in generalized enough you can even try propose merge it in the GitLab source code so everyone can benefit.

[^1]: [Crypto mining in browsers](https://thenextweb.com/hardfork/2018/08/14/coinhive-mining-monero-profits/) can be an idea...
