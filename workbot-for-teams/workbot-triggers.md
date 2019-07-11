---
title: Workbot for Teams triggers
date: 2019-07-11 05:00:00 Z
---

# Workbot command trigger
Workbot commands allow you to trigger recipes from Teams. These recipes can then perform actions in your apps (e.g. creating new ServiceNow tickets, listing Salesforce opportunities).

This means you can from perform actions in your apps from within Teams!

![Command example](/assets/images/workbot-for-teams/workbot-command-example.png)
*Sending a 'newissue' command with additional parameters in Teams, then receiving a reply*

When a command is sent to Workbot in Teams, it will trigger the Workbot recipe and execute its actions.

![Command recipe](/assets/images/workbot-for-teams/command-recipes.png)
*A Workbot recipe with a Workbot command trigger*

## Configuring the command
![New command](/assets/images/workbot-for-teams/new-command.png)
*Example 'newissue' command*

### Input fields
The table below lists the input fields in the trigger and what they do.

<table class="unchanged rich-diff-level-one">
    <thead>
        <tr>
            <th>Input field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="#command-name">Command name</a></td>
            <td>
              Name of the command.
            </td>
        </tr>
        <tr>
            <td><a href="#parameters">Parameters</a></td>
            <td>
              Parameter can store additional data that can be used as datapills in follow-up recipe actions.
            </td>
        </tr>
        <tr>
            <td>Command hint</td>
            <td>
            Display this instead of command name in response to <b>help</b> messages.
            </td>
        </tr>
        <tr>
            <td>Hidden command</td>
            <td>
              If <b>Yes</b>, command will not show up as a command in <b>help</b> messages. Defaults to <b>No</b>.
            </td>
        </tr>
    </tbody>
</table>

#### Command name
Workbot commands can invoke their recipes by:
1.  Sending the command name in a direct message to Workbot, e.g. **newissue**
2. Sending the command name in a channel and tagging Workbot, e.g. **@workbot newissue**
3. Submitting a button with the command name configured:
![Command name in button](/assets/images/workbot-for-teams/button-command.png)
*A button can be configured to invoke a Workbot command of another recipe*

![Command name in button example](/assets/images/workbot-for-teams/button-submission.png)
*The 'Create issue' button invokes the 'newissue' command and executes the recipe when submitted*

#### Parameters
The user (or a preceding recipe) can provide additional information to a recipe by passing parameters to it.

This requires defining the parameters (link to defining parameters) in the Workbot trigger, ensuring that the parameter's name is the same in both upstream and downstream recipes.

This step is critical - it makes sure that:

1. The correct parameter value to passed to the correct parameter through the recipes.
2. Parameter datapills become available in the downstream recipe's datatree for use in subsequent recipe actions.

![Parameters configured](/assets/images/workbot-for-teams/parameters-configured.png)
*3 parameters configured for the 'newissue' command*

##### Defining parameters
To add a parameter, click on the **+Add parameter** button under the **Parameters** section of a Workbot command trigger.

![Adding a parameter](/assets/images/workbot-for-teams/adding-a-parameter.png)
*Adding a new parameter*

By configuring the parameter, you can control how the users interact with the parameter in the task module.

![Parameter form empty](/assets/images/workbot-for-teams/parameter-form-filled.png)
*Configuring a parameter*

The table below describes in further detail what each parameter configuration field does.

<table class="unchanged rich-diff-level-one">
    <thead>
        <tr>
            <th>Input field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Name</td>
            <td>
              Name of the parameter. This is the name you use to reference the parameter in:<br>
              <ul>
                <li>
                  In-line commands</li><br><img src="/assets/images/workbot-for-teams/workbot-command-example.png"></img>
                </li>
                <li>
                  Choice parameters<br><img src="/assets/images/workbot-for-teams/choice-param-recipe.png"></img>
                </li>
                <li>
                  Additional parameters in buttons<br><img src="/assets/images/workbot-for-teams/button-command.png"></img>
                </li>
            </td>
        </tr>
        <tr>
            <td>Data type</td>
            <td>
              Data type of the parameter. Currently supports <code>String</code>, <code>Number</code>, <code>Integer</code>, <code>Date</code>, <code>Time</code> and <code>Boolean</code> data types. The data type will influence the input interface used to collect this parameter in task modules. For example, if <code>Date</code> is chosen, a date picker will be used.
            </td>
        </tr>
        <tr>
            <td>Optional?</td>
            <td>
              If set to <b>Yes</b>, users can skip this input. If set to <b>No</b>, users are required to provide this input.
            </td>
        </tr>
        <tr>
            <td>Hint</td>
            <td>
              Hints are displayed just below the input field  for users when filling in the input field.
            </td>
        </tr>
        <tr>
            <td>Example input value</td>
            <td>
              Displays a placeholder for the field in the task module. Useful in giving the user a sense of what the requested input should look like, as well as the desired format.
            </td>
        </tr>
        <tr>
            <td>Options</td>
            <td>
              Comma-separated list of options, e.g. <b>APPROVED, REJECTED, EXPIRED</b>. If the display name and the value are different, separate the two by a colon, e.g. <b>High:1, Medium:2, Low:3</b>. Only visible when data type is <code>String</code>.
            </td>
        </tr>
    </tbody>
</table>

# Learn more
- [Using Workbot for MS Teams](/workbot-for-teams/using-workbot-for-teams.md)
- [Workbot actions](/workbot-for-teams/workbot-actions.md)
- [Passing parameters](/workbot-for-teams/passing-parameters.md)
