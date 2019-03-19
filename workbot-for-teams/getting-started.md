---
title: Getting started with Workbot for MS Teams
date: 2019-02-01 05:00:00 Z
---

# Workbot for MS Teams by Workato
## What is Workato?
>**If you're familiar with Workato, or want to quickly get started with Workbot, skip to [Setup Workbot](#setup-workbot).**

Workato helps you automate business workflows across cloud apps, on-premise apps and employees, e.g. New case in Salesforce will create issue in Jira & incident in ServiceNow, and more.

Workato combines enterprise-grade workflow automation with the ease-of-use expected from consumer apps, allowing business users and IT to quickly build workflow automations.

## Workbot for MS Teams, powered by Workato
>**If you're familiar with Workbot, skip to [Setup Workbot](#setup-workbot).**

Workbot is a bot platform built on top of Workato. It helps you run these business workflows directly from Teams.

These business workflows can be initiated from Teams by using [Workbot commands](/workbot-for-teams/workbot-triggers.md). When the command is sent to Workbot (via direct messages or channels), it will look for the corresponding workflow in Workato and execute the workflow steps.

![Command example](/assets/images/workbot-for-teams/workbot-command-example-1.png)
*Sending a 'view_opportunities' command. The retrieves the open opportunities in Salesforce, then sends a reply*

These workflows — combined with Workbot — allow you to retrieve, create and update data across all your apps - directly within Teams.

In Workato, these powerful workflows are known as **Recipes**.

## Recipes
Recipes are automated workflows built by users that can span multiple apps.

Each recipe comprises of a **Trigger** and one or more **Actions** that are carried out when a trigger event occurs.

![Recipe](/assets/images/workbot-for-teams/post-reply-recipe.png)

## Workbot command trigger
Workbot commands allow you to trigger recipes from Teams. These recipes can then perform actions in your apps (e.g. creating new ServiceNow tickets, listing Salesforce opportunities).

![Command recipe](/assets/images/workbot-for-teams/command-recipes.png)
*A recipe configured with a 'newissue' Workbot command*

>**For more info, go to [Workbot commands](/workbot-for-teams/workbot-triggers.md)**.

## Setup Workbot
In Teams, go to the Workbot welcome message and click on **Setup Workbot**.

![Setup Workbot](/workbot-for-teams/setup-workbot.png)

This should open your browser (or a browser tab) and prompt you to log into your Microsoft account:

![Account created](/assets/images/workbot-for-teams/microsoft-login.png)

When prompted to allow Workato access your info, click **Yes**:

![Permissions](/assets/images/workbot-for-teams/permissions.png)

Your Workato account has now been created using your Microsoft account. It's now time to create your first Workbot recipe!

![Account created](/assets/images/workbot-for-teams/account-created.png)

## Your first Workbot recipe
Search for Workbot for Teams, and choose it as your 1st app:

![1st app](/assets/images/workbot-for-teams/1st-app.png)

Choose a 2nd app to connect. In the example below, Salesforce is selected:

![2nd app](/assets/images/workbot-for-teams/2nd-app.png)

Click on **Find recipes**.

The recipes displayed have been built by the Workato community.

![Choose recipe](/assets/images/workbot-for-teams/choose-recipe.png)

For this guide, we will be choosing the **View open opportunities in Salesforce** recipe:

![Use recipe](/assets/images/workbot-for-teams/use-recipe.png)

Click on **Use this recipe** to continue.

### Connecting your apps
To connect to Workbot for Microsoft Teams, click on **Link your account**:

![Link Teams](/assets/images/workbot-for-teams/link-teams.png)

Log into your Microsoft:

![Log into Microsoft](/assets/images/workbot-for-teams/microsoft-login.png)

If successful, you should see this screen:
![Link Teams success](/assets/images/workbot-for-teams/link-teams-success.png)

To connect to Salesforce, click on **Link your account**:

![Link Teams](/assets/images/workbot-for-teams/link-teams.png)

Log into your Salesforce:

![Log into Microsoft](/assets/images/workbot-for-teams/salesforce-login.png)

If successful, you should see this screen:
![Link Teams success](/assets/images/workbot-for-teams/link-salesforce-success.png)

Your apps are connected! Click **Next** to test the recipe.

### Starting your recipe
After a few seconds, your recipe should be ready for use:
![Recipe ready](/assets/images/workbot-for-teams/recipe-ready.png)

Close the pop-up, and click on **Start recipe**.

Go to Teams and send Workbot the **view_opportunities** command, or type **help** and choose **View opportunities**.

![Post reply](/assets/images/workbot-for-teams/post-reply.png)
*Example of a post reply listing open opportunities from Salesforce*

## Additional info
Head over to our documentation for more information on how Workbot works!

- [Workbot triggers](/workbot-for-teams/workbot-triggers.md)
- [Workbot actions](/workbot-for-teams/workbot-actions.md)
- [Workbot buttons, pick lists, and task modules](/workbot-for-teams/buttons-choices-task-modules.md)
