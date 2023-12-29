---
title: How to Edit a crontab
description: Crontab is a powerful scheduling tool in Unix-like systems. This article provides a comprehensive guide on using crontab, covering the basics of creating a crontab, setting up environment variables, scheduling jobs, and error handling.
slug: edit-crontab
authors: muhammad_khabbab
tags: [kubernetes, docker, dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-12-27-kubectl-edit-crontab/social.png
hide_table_of_contents: false
---

## Introduction

When it comes to scheduling tasks in Unix-like systems, crontab is your go-to tool. Through crontab, you can manage all your cronjobs. In windows, the equivalent is task scheduler. Note that the crontab environment isn't quite the same as your regular shell environment. Here's why:

- **Isolation**: The crontab environment operates independently. It doesn't load your shell's interactive startup files. This means that the environment variables and path settings you're used to in your regular shell might not be available to your cron jobs.
- **Minimalism**: Crontab comes with a more stripped-down environment. It's designed to run scheduled tasks without the overhead of a full shell environment.

Let's see how to create a basic crontab.

## Create your first crontab

Creating a crontab is very easy. You can specify any of the following to be executed as a cronjob:

1.  **Built-in commands**: `ls`, `cp`, `mv`, `rm`, etc.
2.  **Shell functions**: User-defined functions within the crontab entry.
3.  **Scripting languages**: Python, Ruby, Perl, Bash, etc.
4.  **External applications**: Web browsers, email clients, media players, etc.
5.  **Sending emails**: `mail`, `sendmail`, etc.
6.  **Backups**: `tar`, `rsync`, etc.
7.  **System processes**: Start, stop, or restart processes.

We will go with the option of bash script. Let's start with that.

### Creating Script for Crontab

I created a sample script to print the current date/time in a log file. Here the content of this script:

```
echo "Current date and time: $(date)" >> /home/muhammad_khabbab/crontablog.txt
```

This script, when executed, will print the date and time to a log file named crontablog.txt. Now, we will schedule the execution of this script through crontab.

### Using `crontab -e`

Crontabs are created, installed, and managed by the command `crontab`. There will be only one active crontab for each user. You do not need to worry about their location.

They are automatically linked with the user who creates them. The command to create a crontab is `crontab -e`, which will open the editor, and you can edit your crontab. It is not recommended to directly edit the crontab file by going to the file system and editing it manually. Instead, you should always use the `crontab` command so that the crontab daemon is managing everything and is synced with the crontab changes. Here is what you will see when you will run this command for the first time:

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-12-27-kubectl-edit-crontab/image1.png" alt="crontab editor" />
</div>

### Setting Up Environment Variables in Crontab

Now, let's look at how to ensure your cron jobs have the environment they need to run successfully. At the top of the file, define the necessary environment variables. The PATH environment variable needs to include the directories where system commands like `bash` and `echo` are present. Usually, `/bin` and `/usr/bin` are needed. Your crontab entry for PATH will look something similar to this:

`PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin`

This line will make sure that the cron job can execute basic shell commands.

### **Schedule Your Job**

After setting your environment variables, you can add your cron jobs below these lines. Look at the below example:
`* * * * * /path/to/your/script.sh`

This example sets up a cron job that runs every minute. The asterisk `*`: wildcard represents every minute, hour, day of the month, month, and day of the week. This means
the script will run every minute. You can use specific values instead of `*` to define the schedule. See some examples below:

- `0 0 * * *`: This entry runs the task at midnight every day.
- `11 * * * WED`: This entry runs the task at 11:00 AM every Wednesday.
- `20 15 * * 1-5`: This entry runs the task at 3:20 PM every weekday (Monday to Friday).

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-12-27-kubectl-edit-crontab/image2.png" alt="crontab wild cards explanation" />
</div>

** Wild cards in crontab. Source: https://ltonline.wordpress.com/2013/05/04/linux-cron-scheduler/ **

Below are the contents of this crontab:

```
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
* * * * * /home/muhammad_khabbab/crontab_script.sh
```

Once you've made your changes, save the file and exit the editor. Your cron jobs will now use the environment variables you've defined. At the same time, the crontab will be installed as well. Let's see the below screenshot:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-12-27-kubectl-edit-crontab/image3.png" alt="crontab installation through editor" />
</div>

Another way to install the crontab is through the command `crontab <path to crontab>` However, there is a slight difference between the two options. `crontab -e` opens a text editor to create or edit a user's crontab file directly, and as soon as you save it, it automatically installs it. In contrast, `crontab <path to file>` installs a crontab file from a specified path without opening an editor, replacing any existing crontab for the user.

### **Verify Your Crontab**

If you execute the command `crontab -l`, you will see your current active crontab. To make sure the crontab is working, let's see if the log file mentioned in the script is being created and filled with the date/time every minute; let's go and check the log file.

  <div className="centered-image">
<img src= "https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-12-27-kubectl-edit-crontab/image4.png" alt= "crontab running and executing script"/>
</div>

You can delete your current crontab using the command `crontab -r` (It will not ask for confirmation !!!) Another way to achieve the same is to edit your crontab and comment out the script in your crontab.

**Expert tips:**

- You can edit the system-wide crontab (`/etc/crontab`) for tasks that affect the entire system, like system updates or log rotation. You will need admin/root privileges to do that.
- If cronjob is installed successfully but fails to run, you will not get any failure notification; you will need to set up error handling or notifications yourself.

## Automating Backup of Crontab

Crontab backups are essential for ensuring that your scheduled jobs can be quickly restored in case of accidental deletion or corruption. Automating this process saves time and reduces human error.

1. **Locate Crontab File**: Identify the crontab file for the user. Typically, it's located in `/var/spool/cron/crontabs/` for the respective user.
2. **Create Backup Directory**: Choose or create a directory for storing the crontab backups, such as `/backup/crontabs/`.
3. **Write Backup Script**: Craft a shell script to copy the crontab file to the backup directory with a timestamp. Here is a sample script:

```
#!/bin/bash
#Specify the backup path
BACKUP_DIR="/backup/crontab/"
CRONTAB_FILE="/var/spool/cron/crontabs/$(username)"
TIMESTAMP=$(date +\%F-\%T)  # It will create a timestamp YYYY-MM-DD-HH:MM:SS
#Create backup directory if not already there
mkdir -p "$BACKUP_DIR"
#Take the backup of crontab
cp "$CRONTAB_FILE" "${BACKUP_DIR}crontab-backup-$TIMESTAMP"
```

1. **Set Script Permissions**: Ensure the script has execute permissions with `chmod +x`.
2. **Schedule Backup Job**: Add a new cron job to execute this script at regular intervals.

## Advanced Scenarios of Crontab

### Combining multiple commands in one crontab

Sometimes, you need to perform multiple tasks in a single crontab. For example, you want to take a backup of your database and then compress it as well. Here is how you will do it. This job will run at 1 AM every night and will not only take backup but will compress it using gzip as well.

```
0 1 * * * /usr/bin/pg_dump devdatabase > /backup/devdatabase.sql && /usr/bin/gzip /backup/devdatabase.sql
```

### Conditional Execution

Let's say you want to run a script only if a particular file is present. Here is how you can do it.

`0 4 * * * [ -f /path/to/trigger.file ] && /path/to/your/script.sh`

So the script will run at 4AM every morning IF the file named "trigger.file" is present.

### Automatic Error Logging

As mentioned earlier, the failures in crontab are silent. You will need to write something yourself to be notified about any errors. The below example will ensure that if the task mentioned in `/path/to/you/crontab_script.sh` fails for any reason (e.g., incorrect syntax, missing files, permission issues, etc.), an error message along with the failure time will be logged to `/path/to/you/crontaberror.log` file.

```
0 3 * * * /path/to/your/script.sh > /dev/null 2> /path/to/your/error.log || echo "Script failed on $(date)" >> /path/to/your/crontaberror.log
```

Let's understand the different parameters of this command:

- `> /dev/null`: This part redirects standard output (stdout) to `/dev/null`, effectively discarding it.
- `2> /path/to/your/error.log`: This redirects standard error (stderr) to `/path/to/your/error.log.` If the script fails and produces an error output, it will be logged here.
- `||`: This is a logical OR operator. The following command is executed if the preceding script fails (returns a non-zero exit status).
- `echo "Script failed on $(date)">> /path/to/your/crontaberror.log`: This command appends a custom error message with the date and time of the failure to the error log.

## Conclusion

The article provides a comprehensive guide on using crontab, a powerful scheduling tool in Unix-like systems. It covers the basics of creating a crontab, setting up environment variables, scheduling jobs, and error handling. The article emphasizes the importance of understanding the isolated environment in which crontab operates and guides the reader through various scenarios, from simple scheduling to conditional execution and error logging.

Automating backups of crontab files is also addressed, ensuring safety and reliability in managing scheduled tasks. This guide is a useful resource for beginners and experienced users to effectively utilize crontab for automating and managing tasks in a Unix environment.
