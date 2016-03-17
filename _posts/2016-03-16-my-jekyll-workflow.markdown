---
layout: post
title: "My Jekyll Drafts Workflow"
date: March 16, 2016
pageClass: post
---

Making this website introduced me to Jekyll. I'd thought about using some sort of CMS like Wordpress to house my blog but eventually decided against it.

Jekyll looked simpler; I found out that it integrated with GitHub pages and requires no database. For a simple site like this, I thought a fully fledged CMS would be overkill.

I began with a simple workflow, creating my first two posts inside the ```_drafts``` folder and moving them into the ```_posts``` folder when they were ready to be published. I added the ```_drafts``` folder to my ```.gitignore``` file because I don't want them visible on my GitHub repo.

I realised right away that there was a problem with my workflow. Because my drafts folder was being ignored by git, any draft posts were not being tracked for changes. I could only work on my drafts on the current device and if something happened to the device, my work would be lost.

I did a little bit of research and came across an [article](https://24ways.org/2013/keeping-parts-of-your-codebase-private-on-github/) by Harry Roberts ([CSS Wizardry](http://csswizardry.com/)) which explains the same problem and how to resolve it using multiple remotes.

I've since updated my workflow so that I can keep my drafts away from my live repo but push them to a separate private repo where they can be tracked for changes.

I have:

* Added a new branch called drafts: ```git checkout -b drafts```
* Added a private remote to the new branch ```git remote add private [https://github.com/user/repo.git]``` which is separate to my master remote
* Updated the ```.gitignore``` file in the new branch by removing ```_drafts``` so that the folder is trackable.

I now work directly in the ```drafts``` branch, moving any completed drafts into the ```_posts``` folder within the same branch when they are ready to be published. All commits in this branch are pushed to my private repository.

When I am ready to make my draft post live, I move back into the master branch and checkout the ```_posts``` folder within the drafts branch. This will merge any new files from the drafts branch into my master copy.

```
git checkout master
git checkout drafts _posts/
git add .
git commit -m "New Post"
git push
```
