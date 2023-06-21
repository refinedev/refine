---
title: How to Delete Local and Remote Git Branches
description: We will take a look the example of deleting local and remote Git branches.
slug: git-delete-remote-branch-and-local-branch
authors: muhammad_khabbab
tags: [git, dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-27-git-delete/social.png
hide_table_of_contents: false
---











## Introduction
Branches are kind of blocks in a repository where we write new features, fix bugs etc. For example, if three developers are working on a project, they can create their own branches and work on them as the branches are isolated, so everyone can work in their branch.

A branch can be:
-	Local – only on your local machine.
-	Remote – it is on a remote location, for example in the GitHub repo


Actually, there is a third type of branch, which is the reference to the remote branches. During the cleanup, these branches should be cleaned up too. 
Today we will discuss various scenarios related to branch deletion. We will show you how to **delete local and remote branches** on GitHub. We will also go through some common errors while deleting a branch. 

For this article, we assume you have installed GIT, and you have the access rights to **delete a branch**. Let's start with the need to delete a branch. 

Steps we'll cover:

- [Why you might need to remove a branch](#why-you-might-need-to-remove-a-branch)
- [Deleting a GIT local branch](#deleting-a-git-local-branch)
- [Deleting a Git remote branch](#deleting-a-git-remote-branch)
- [Deleting a branch with merged changes](#deleting-a-branch-with-merged-changes)
- [Deleting a git branch with unmerged changes](#deleting-a-git-branch-with-unmerged-changes)
- [What are tracking branches and how to delete them](#what-are-tracking-branches-and-how-to-delete-them)
- [How to delete a branch on Github using web console](#how-to-delete-a-branch-on-github-using-web-console)
- [Frequently asked questions](#frequently-asked-questions)
  - [I am unable to delete my branch](#i-am-unable-to-delete-my-branch)
  - [I deleted a branch by mistake, can I recover it?](#i-deleted-a-branch-by-mistake-can-i-recover-it)
  - [How to automatically delete a branch when it is merge back into master](#how-to-automatically-delete-a-branch-when-it-is-merge-back-into-master)
  - [I am getting an error when I delete a branch having the same name as a tag](#i-am-getting-an-error-when-i-delete-a-branch-having-the-same-name-as-a-tag)


## Why you might need to remove a branch
You need to ensure that your Git repository is not a mess of outdated and old branches that are not being worked on anymore. You should perform periodic cleanup of the branches where you would either remove the old branches or you would merge them into the master. Your code repository should be neat, tidy, and easy to navigate.

---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />

---

## Deleting a GIT local branch
Please note that deleting a branch locally will not delete the remote branch. Here is the command to delete branch locally:  
```
git branch -d "branch name"
```

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-27-git-delete/git-delete-branch-1.png"  alt="git delete branch" />
</div>

<br/>

The below command will also perform the same function, just a minor syntax difference.
```
git branch --delete <branch>
```

Note that the -d option is an abbreviation for --delete, which only removes the branch if it is fully merged in its parent branch. If you have unmerged changes, then it will not remove the branch, and you will get an error. You will need to forcibly remove the branch if you want to delete the branch, irrespective of the merge status. You can use the below command to remove the local branch forcibly:

```
git branch -D <branchName>
```


Another point to remember is the rebasing/merging progress. If your branch is in rebasing/merging process, You will see an error "Rebase/Merge in progress", and you won't be able to delete your branch. You can forcibly delete if you want to, or you can solve the rebasing/merging before trying again.

## Deleting a Git remote branch
To delete a branch from the remote repository, type:

```
git push origin -d "branch name" 
```

<div className="centered-image"  >
   <img style={{alignSelf:"center", }}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-27-git-delete/git-delete-branch-2.png"  alt="git delete branch" />
</div>

<br/>

In the above example, the remote branch "dev-testing" is deleted. 
Both the below commands delete the remote branch, you can use whichever is more intuitive to you. 

```
git push <remote_name> --delete <branch_name>
```

The following command is appropriate if you are on a version of Git older than 1.7.0

```
git push <remote_name> :<branch_name> 
```

Note that executing "`git push origin –delete` "will delete your remote branch only. Note that the branch name is not mentioned at the end of the command. However, if you put the branch name at the end, it will delete and push it to remote simultaneously.
## Deleting a branch with merged changes

When we are deleting a branch having merged changes, we delete it by using small "d" like below:
```
git branch -d <BranchName>
```

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-27-git-delete/git-delete-branch-3.png"  alt="git delete branch" />
</div>


## Deleting a git branch with unmerged changes
When we are deleting a branch having unmerged changes, then we will need to use the capital "D" to force the deletion like below:
```
git branch -D <branchName>
```


<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-27-git-delete/git-delete-branch-4.png"  alt="git delete branch" />
</div>

<br/>

Another version of the same command is as below:
```
git branch --delete --force <branch_name>
``` 
It will also remove the branch forcibly even if there are unmerged changes in the branch. 

## What are tracking branches and how to delete them
When we check out a local branch from a remote branch, it automatically creates what is called a tracking branch. These are local branches that have a direct association with a remote branch. It means it exists on our local machine cache but not on the remote repository.  

If you have deleted a remote branch using the command `git push origin :<branchname>`, its references still exist in local code repo of your team members. Now, you need to delete the local references too. `git remote prune origin` "deletes the refs to the branches that don't exist on the remote.   

Another version of the same command is:
```git fetch <remote> --prune``` 
This will delete all the obsolete remote-tracking branches. A shorter version of the command is below:
```git fetch <remote> -p```

To delete a particular local remote-tracking branch, you can use following command:
```git branch --delete --remotes <remote>/<branch>```
A shorted version of the command is:
```git branch -dr <remote>/<branch> ```

Note that if you delete a remote branch "X" from the command line using `git push` then it will also remove the local remote-tracking branch "origin/X" so there is no need to prune the obsolete remote-tracking branch with `git fetch –prune` or `git fetch –p`. 



<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-27-git-delete/git-delete-branch-5.png"  alt="git delete branch" />
</div>

<br/>

To confirm if the remote tracking branch was delete or not, you can run the following command 

```
git branch –remotes
```

And the shorter version is:

``` 
git branch –r
```


## How to delete a branch on Github using web console
1.  Navigate to the main page of the repository.
2. Above the list of files, click branches.
3. Navigate to the branch you want to delete, then click delete icon


<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-27-git-delete/git-delete-branch-6.png"  alt="git delete branch" />
</div>

<br/>


<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>

## Frequently asked questions

### I am unable to delete my branch

Solution: You cannot delete a branch you are already on. You must first switch to another branch and then delete the required branch. See the below example:


<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-27-git-delete/git-delete-branch-7.png"  alt="git delete branch" />
</div>

<br/>

In the above example, we switched to another branch named "dev-arsam" and then we were able to delete the "test" branch successfully. 


### I deleted a branch by mistake, can I recover it?

Solution: Yes, you should use `git reflog` command and find the SHA1 for the commit at the tip of your deleted branch, then just `git checkout [sha]` . And once you're at that commit, you can just `git branch branchname <SHA>`  to recreate the branch from there.  

The `git reflog` command is used to record updates made to the tip of branches. It allows to return to commits. After rewriting history, the reflog includes a history of previous branch commits and makes it possible to go back to a particular state if needed.  

The below snapshot provides an example where a branch named "dev-arsam" will be recovered. 


<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-27-git-delete/git-delete-branch-8.png"  alt="git delete branch" />
</div>

<br/>

### How to automatically delete a branch when it is merge back into master

To avoid dangling branches, you can set up the configuration so that your branch will be automatically deleted as soon as it is merged into its parent branch e.g. Master branch
1. On GitHub.com, go to the home page of the repository.
2. Under your repository name, click Settings.
3. Under "Pull Requests", select or unselect Automatically delete head branches.


<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-27-git-delete/git-delete-branch-9.png"  alt="git delete branch" />
</div>

<br/>

### I am getting an error when I delete a branch having the same name as a tag

You might get an error if you try to delete a branch having the same name as the tag. You will see an error similar to this "branch-or-tag-name matches more than one".

If you want to specify the deletion of branches and not tag, try the below command:
```
git push origin :refs/heads/branch-name
```

Similarly if you want to specify the deletion of tags and not branch, then use below command:
```
git push origin :refs/tags/tag-name
``` 


## Conclusion

In this article, we learned about the different ways to delete a branch in Git also answered frequently asked questions related to deleting a branch in Git.