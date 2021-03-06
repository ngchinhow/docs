---
title: Workato API - Recipes
date: 2019-03-21 11:20:00 Z
---

# Recipes
Use the following endpoints to work with recipes in Workato.

### Supported Formats
* Json

## Get recipe details

> GET /api/integrations

### Description
Returns a recipe object.

<details> <summary> <b>Details</b></summary>

<h3> Parameters</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Parameter name</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <b>id</b> <br>required</td>
    <td>
    Recipe ID
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be number</li>
    </ul>
    </td>
  </tr>
  </tbody>
</table>

<h3> Responses</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Code</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <kbd>200</kbd> </td>
    <td> Success </td>
  </tr>
  <tr>
    <td width =200 > <kbd>401</kbd> </td>
    <td> Unauthorized </td>
  </tr>
  <tr>
    <td width =200 > <kbd>404</kbd> </td>
    <td> Not found </td>
  </tr>
  <tr>
    <td width =200 > <kbd>500</kbd> </td>
    <td> Server error </td>
  </tr>
  </tbody>
</table>

<h3> Examples </h3>

<h4> Success: 200</h4>
<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes/48
200
{
  "id": 48,
  "user_id": 36,
  "name": "Recipe 48",
  "created_at": "2015-05-26T22:53:36.904Z",
  "updated_at": "2015-05-26T22:53:36.904Z",
  "copy_count": 1,
  "trigger_application": "custom_adapter",
  "action_applications": [
    "custom_adapter"
  ],
  "applications": [
    "custom_adapter"
  ],
  "description": "Recipe description 48",
  "parameters_schema": [
    {
      "label": "Status",
      "name": "status",
      "type": "string",
      "control_type": "text",
      "hint": "new/completed etc"
    }
  ],
  "running": false,
  "job_succeeded_count": 0,
  "job_failed_count": 0,
  "last_run_at": null,
  "config": [
    {
      "keyword": "application",
      "provider": "custom_adapter",
      "name": "custom_adapter",
      "account_id": 7
    }
  ],
  "author_name": "Test User36"
}
</code></pre>

<h4> Not found: 404</h4>
<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes/100500
404
{
  "message": "Not found"
}
</code></pre>

</details>

## Create a recipe

> POST /api/recipes

### Description
Creates a recipe in Workato based on parameters in request.

<details> <summary><b>Details</b></summary>

<h3> Parameters</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Parameter name</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <b>recipe</b> <br>optional</td>
    <td>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a hash</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>recipe[name]</b> <br>optional</td>
    <td>
    Name of the recipe
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a string</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>recipe[code]</b> <br>optional</td>
    <td>
    JSON string representing the recipe lines
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a string</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>recipe[config]</b> <br>optional</td>
    <td>
    JSON string representing the connection lines
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a string</li>
    </ul>
    </td>
  </tr>
  </tbody>
</table>

<h3> Responses</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Code</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <kbd>200</kbd> </td>
    <td> Success </td>
  </tr>
  <tr>
    <td width =200 > <kbd>401</kbd> </td>
    <td> Unauthorized </td>
  </tr>
  <tr>
    <td width =200 > <kbd>500</kbd> </td>
    <td> Server error </td>
  </tr>
  </tbody>
</table>

<h3> Examples</h3>

<h4> Success: 200</h4>
<pre><code style="display: block; white-space: pre-wrap;">POST /api/recipes
{
  "name": "Send mail",
  "code": "{\"number\":0,\"provider\":\"clock\",\"name\":\"timer\",\"as\":\"timer\",\"keyword\":\"trigger\",\"dynamicPickListSelection\":{},\"toggleCfg\":{},\"input\":{\"interval\":\"5\",\"start_at\":\"\"},\"block\":[{\"number\":1,\"provider\":\"email\",\"name\":\"send_mail\",\"as\":\"send_mail\",\"keyword\":\"action\",\"dynamicPickListSelection\":{},\"toggleCfg\":{},\"input\":{},\"uuid\":\"cd865246-ece7-4188-845e-33d021664be3\"}],\"uuid\":\"c4b0778d-5a23-4c52-a5bb-4a99ae5d25ae\"}",
  "config": "[{\"keyword\":\"application\",\"name\":\"clock\",\"provider\":\"clock\"},{\"keyword\":\"application\",\"name\":\"email\",\"provider\":\"email\"}]"
}
200
{
  "success": true,
  "id": 116
}
</code></pre>

</details>

## Update a recipe

> PUT /api/recipes/:id

### Description
Updates a recipe in Workato based on specified recipe ID.

<details> <summary><b>Details</b></summary>

<h3> Parameters</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Parameter name</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <b>id</b> <br>required</td>
    <td>
    Recipe ID
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a number</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>recipe</b> <br>optional</td>
    <td>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a Hash</li>
    </ul>
    </td>
  </tr>
    <tr>
    <td width =200 > <b>recipe[name]</b> <br>optional</td>
    <td>
    Name of the recipe
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a string</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>recipe[code]</b> <br>optional</td>
    <td>
    JSON string representing the recipe lines
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a string</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>recipe[config]</b> <br>optional</td>
    <td>
    JSON string representing the connection lines
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a string</li>
    </ul>
    </td>
  </tr>
  </tbody>
</table>

<h3>Responses</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Code</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <kbd>200</kbd> </td>
    <td> Success </td>
  </tr>
  <tr>
    <td width =200 > <kbd>401</kbd> </td>
    <td> Unauthorized </td>
  </tr>
  <tr>
    <td width =200 > <kbd>404</kbd> </td>
    <td> Not found </td>
  </tr>
  <tr>
    <td width =200 > <kbd>500</kbd> </td>
    <td> Server error </td>
  </tr>
  </tbody>
</table>

<h3> Examples</h3>

<h4> Success: 200</h4>
<pre><code style="display: block; white-space: pre-wrap;">PUT /api/recipes/1
{
  "name": "Send mail",
  "code": "{\"number\":0,\"provider\":\"clock\",\"name\":\"timer\",\"as\":\"timer\",\"keyword\":\"trigger\",\"dynamicPickListSelection\":{},\"toggleCfg\":{},\"input\":{\"interval\":\"5\",\"start_at\":\"\"},\"block\":[{\"number\":1,\"provider\":\"email\",\"name\":\"send_mail\",\"as\":\"send_mail\",\"keyword\":\"action\",\"dynamicPickListSelection\":{},\"toggleCfg\":{},\"input\":{},\"uuid\":\"cd865246-ece7-4188-845e-33d021664be3\"}],\"uuid\":\"c4b0778d-5a23-4c52-a5bb-4a99ae5d25ae\"}",
  "config": "[{\"keyword\":\"application\",\"name\":\"clock\",\"provider\":\"clock\"},{\"keyword\":\"application\",\"name\":\"email\",\"provider\":\"email\"}]"
}
200
{
  "success": true
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">PUT /api/recipes/2

200
{
  "success": false,
  "errors": {
    "running": [
      "can't modify running recipe"
    ]
  }
}
</code></pre>

</details>

## List recipes belonging to user

> GET /api/recipes

### Description
Returns a list of recipes belonging to the authenticated user with respect to different filters. Recipes are returned in descending ID order.

<details> <summary><b>Details</b></summary>

<h3> Parameters</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Parameter name</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <b>adapter_names_any</b> <br>optional</td>
    <td>
    List of adapters names. Resulting recipes should use at least one of given adapters
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a string</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>adapter_names_all</b> <br>optional</td>
    <td>
    List of adapters names. Resulting recipes should use all of given adapters
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a String</li>
    </ul>
    </td>
  </tr>
    <tr>
    <td width =200 > <b>active</b> <br>optional</td>
    <td>
    Is flow runnig. 'true' - running, 'false' - stopped, all recipes otherwise
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a string</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>since_id</b> <br>optional</td>
    <td>
    Find recipes with ID less than given
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a number</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>order</b> <br>optional</td>
    <td>
    Set ordering method or default if blank. Possible options: activity
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a string</li>
    </ul>
    </td>
  </tr>
  </tbody>
</table>

<h3> Responses</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Code</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <kbd>200</kbd> </td>
    <td> Success </td>
  </tr>
  <tr>
    <td width =200 > <kbd>401</kbd> </td>
    <td> Unauthorized </td>
  </tr>
  <tr>
    <td width =200 > <kbd>500</kbd> </td>
    <td> Server error </td>
  </tr>
  </tbody>
</table>

<h3> Examples</h3>

<h4> Success: 200</h4>
<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes?active=false
200
{
  "items": [
    {
      "id": 10,
      "user_id": 15,
      "name": "Recipe 10",
      "created_at": "2015-05-26T22:53:34.626Z",
      "updated_at": "2015-05-26T22:53:34.626Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [],
      "applications": [],
      "description": "Recipe description 10",
      "parameters_schema": [],
      "running": false,
      "job_succeeded_count": 1,
      "job_failed_count": 0,
      "last_run_at": null,
      "config": []
    },
    {
      "id": 8,
      "user_id": 15,
      "name": "Recipe 8",
      "created_at": "2015-05-26T22:53:34.577Z",
      "updated_at": "2015-05-26T22:53:34.577Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter"
      ],
      "applications": [
        "custom_adapter"
      ],
      "description": "Recipe description 8",
      "parameters_schema": [],
      "running": false,
      "job_succeeded_count": 1,
      "job_failed_count": 0,
      "last_run_at": null,
      "config": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes?per_page=2
200
{
  "items": [
    {
      "id": 14,
      "user_id": 17,
      "name": "Recipe 14",
      "created_at": "2015-05-26T22:53:34.895Z",
      "updated_at": "2015-05-26T22:53:34.895Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [],
      "applications": [],
      "description": "Recipe description 14",
      "parameters_schema": [],
      "running": false,
      "job_succeeded_count": 1,
      "job_failed_count": 0,
      "last_run_at": null,
      "config": []
    },
    {
      "id": 13,
      "user_id": 17,
      "name": "Recipe 13",
      "created_at": "2015-05-26T22:53:34.872Z",
      "updated_at": "2015-05-26T22:53:34.872Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 13",
      "parameters_schema": [],
      "running": true,
      "job_succeeded_count": 11,
      "job_failed_count": 3,
      "last_run_at": "2015-05-26T22:43:34.864Z",
      "config": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes?adapter_names_any=custom_adapter
200
{
  "items": [
    {
      "id": 17,
      "user_id": 19,
      "name": "Recipe 17",
      "created_at": "2015-05-26T22:53:35.130Z",
      "updated_at": "2015-05-26T22:53:35.130Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 17",
      "parameters_schema": [],
      "running": true,
      "job_succeeded_count": 15,
      "job_failed_count": 3,
      "last_run_at": "2015-05-26T22:43:35.120Z",
      "config": []
    },
    {
      "id": 16,
      "user_id": 19,
      "name": "Recipe 16",
      "created_at": "2015-05-26T22:53:35.101Z",
      "updated_at": "2015-05-26T22:53:35.101Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter"
      ],
      "applications": [
        "custom_adapter"
      ],
      "description": "Recipe description 16",
      "parameters_schema": [],
      "running": false,
      "job_succeeded_count": 1,
      "job_failed_count": 0,
      "last_run_at": null,
      "config": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes?per_page=2&since_id=22
200
{
  "items": [
    {
      "id": 21,
      "user_id": 21,
      "name": "Recipe 21",
      "created_at": "2015-05-26T22:53:35.363Z",
      "updated_at": "2015-05-26T22:53:35.363Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 21",
      "parameters_schema": [],
      "running": true,
      "job_succeeded_count": 20,
      "job_failed_count": 3,
      "last_run_at": "2015-05-26T22:43:35.353Z",
      "config": []
    },
    {
      "id": 20,
      "user_id": 21,
      "name": "Recipe 20",
      "created_at": "2015-05-26T22:53:35.337Z",
      "updated_at": "2015-05-26T22:53:35.337Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter"
      ],
      "applications": [
        "custom_adapter"
      ],
      "description": "Recipe description 20",
      "parameters_schema": [],
      "running": false,
      "job_succeeded_count": 1,
      "job_failed_count": 0,
      "last_run_at": null,
      "config": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes
200
{
  "items": [
    {
      "id": 26,
      "user_id": 23,
      "name": "Recipe 26",
      "created_at": "2015-05-26T22:53:35.615Z",
      "updated_at": "2015-05-26T22:53:35.615Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [],
      "applications": [],
      "description": "Recipe description 26",
      "parameters_schema": [],
      "running": false,
      "job_succeeded_count": 1,
      "job_failed_count": 0,
      "last_run_at": null,
      "config": []
    },
    {
      "id": 25,
      "user_id": 23,
      "name": "Recipe 25",
      "created_at": "2015-05-26T22:53:35.591Z",
      "updated_at": "2015-05-26T22:53:35.591Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 25",
      "parameters_schema": [],
      "running": true,
      "job_succeeded_count": 17,
      "job_failed_count": 4,
      "last_run_at": "2015-05-26T22:43:35.581Z",
      "config": []
    },
    {
      "id": 24,
      "user_id": 23,
      "name": "Recipe 24",
      "created_at": "2015-05-26T22:53:35.565Z",
      "updated_at": "2015-05-26T22:53:35.565Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter"
      ],
      "applications": [
        "custom_adapter"
      ],
      "description": "Recipe description 24",
      "parameters_schema": [],
      "running": false,
      "job_succeeded_count": 1,
      "job_failed_count": 0,
      "last_run_at": null,
      "config": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes?adapter_names_all=custom_adapter%2Ccustom_adapter1
200
{
  "items": [
    {
      "id": 29,
      "user_id": 25,
      "name": "Recipe 29",
      "created_at": "2015-05-26T22:53:35.802Z",
      "updated_at": "2015-05-26T22:53:35.802Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 29",
      "parameters_schema": [],
      "running": true,
      "job_succeeded_count": 16,
      "job_failed_count": 2,
      "last_run_at": "2015-05-26T22:43:35.793Z",
      "config": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes?active=true
200
{
  "items": [
    {
      "id": 33,
      "user_id": 27,
      "name": "Recipe 33",
      "created_at": "2015-05-26T22:53:36.011Z",
      "updated_at": "2015-05-26T22:53:36.011Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 33",
      "parameters_schema": [],
      "running": true,
      "job_succeeded_count": 10,
      "job_failed_count": 1,
      "last_run_at": "2015-05-26T22:43:36.002Z",
      "config": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes?page=2&per_page=2
200
{
  "items": [
    {
      "id": 36,
      "user_id": 29,
      "name": "Recipe 36",
      "created_at": "2015-05-26T22:53:36.197Z",
      "updated_at": "2015-05-26T22:53:36.197Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter"
      ],
      "applications": [
        "custom_adapter"
      ],
      "description": "Recipe description 36",
      "parameters_schema": [],
      "running": false,
      "job_succeeded_count": 1,
      "job_failed_count": 0,
      "last_run_at": null,
      "config": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes?order=activity
200
{
  "items": [
    {
      "id": 41,
      "user_id": 31,
      "name": "Recipe 41",
      "created_at": "2015-05-26T22:53:36.446Z",
      "updated_at": "2015-05-26T22:53:36.446Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 41",
      "parameters_schema": [],
      "running": true,
      "job_succeeded_count": 18,
      "job_failed_count": 3,
      "last_run_at": "2015-05-26T22:43:36.437Z",
      "config": []
    },
    {
      "id": 42,
      "user_id": 31,
      "name": "Recipe 42",
      "created_at": "2015-05-26T22:53:36.469Z",
      "updated_at": "2015-05-26T22:53:36.469Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [],
      "applications": [],
      "description": "Recipe description 42",
      "parameters_schema": [],
      "running": false,
      "job_succeeded_count": 1,
      "job_failed_count": 0,
      "last_run_at": null,
      "config": []
    },
    {
      "id": 40,
      "user_id": 31,
      "name": "Recipe 40",
      "created_at": "2015-05-26T22:53:36.420Z",
      "updated_at": "2015-05-26T22:53:36.420Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter"
      ],
      "applications": [
        "custom_adapter"
      ],
      "description": "Recipe description 40",
      "parameters_schema": [],
      "running": false,
      "job_succeeded_count": 1,
      "job_failed_count": 0,
      "last_run_at": null,
      "config": []
    }
  ]
}
</code></pre>

</details>

## Search for public recipes

> GET /api/recipes/search

### Description
Searches for public recipes and returns a list. Requires 'oem_vendor' privilege. Returns an empty list when no matching connectors are found.


<details> <summary><b>Details</b></summary>

<h3> Parameters</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Parameter name</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <b>applications</b> <br>optional</td>
    <td>
    Comma separated connector identifiers (e.g: salesforce,service_now). Resulting recipes should use at least one of given connectors
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a string</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>term</b> <br>optional</td>
    <td>
    Search term
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a String</li>
    </ul>
    </td>
  </tr>
    <tr>
    <td width =200 > <b>boost_owned</b> <br>optional</td>
    <td>
    Give higher priority to recipes in your account. Defaults to 'false'
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a string</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>page</b> <br>optional</td>
    <td>
    Page number. Defaults to 0
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a number</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>per_page</b> <br>optional</td>
    <td>
    Page size. Defaults to 20, max 20
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a number</li>
    </ul>
    </td>
  </tr>
  </tbody>
</table>

<h3> Responses</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Code</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <kbd>200</kbd> </td>
    <td> Success </td>
  </tr>
  <tr>
    <td width =200 > <kbd>401</kbd> </td>
    <td> Unauthorized </td>
  </tr>
  <tr>
    <td width =200 > <kbd>500</kbd> </td>
    <td> Server error </td>
  </tr>
  </tbody>
</table>

<h3> Examples</h3>

<h4> Success: 200</h4>
<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes/search?page=2&per_page=3
200
{
  "items": [
    {
      "id": 59,
      "user_id": 50,
      "name": "Recipe 58",
      "created_at": "2015-05-26T22:53:39.032Z",
      "updated_at": "2015-05-26T22:53:39.032Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter"
      ],
      "applications": [
        "custom_adapter"
      ],
      "description": "Recipe description 58",
      "parameters_schema": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes/search?per_page=2&since_id=66
200
{
  "items": [
    {
      "id": 65,
      "user_id": 53,
      "name": "Recipe 64",
      "created_at": "2015-05-26T22:53:39.363Z",
      "updated_at": "2015-05-26T22:53:39.363Z",
      "copy_count": 17,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 64",
      "parameters_schema": []
    },
    {
      "id": 64,
      "user_id": 53,
      "name": "Recipe 63",
      "created_at": "2015-05-26T22:53:39.337Z",
      "updated_at": "2015-05-26T22:53:39.337Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter"
      ],
      "applications": [
        "custom_adapter"
      ],
      "description": "Recipe description 63",
      "parameters_schema": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes/search?adapter_names_any=custom_adapter%2Ccustom_adapter1
200
{
  "items": [
    {
      "id": 70,
      "user_id": 56,
      "name": "Recipe 69",
      "created_at": "2015-05-26T22:53:39.648Z",
      "updated_at": "2015-05-26T22:53:39.648Z",
      "copy_count": 17,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 69",
      "parameters_schema": []
    },
    {
      "id": 71,
      "user_id": 56,
      "name": "Recipe 70",
      "created_at": "2015-05-26T22:53:39.674Z",
      "updated_at": "2015-05-26T22:53:39.674Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 70",
      "parameters_schema": []
    },
    {
      "id": 69,
      "user_id": 56,
      "name": "Recipe 68",
      "created_at": "2015-05-26T22:53:39.623Z",
      "updated_at": "2015-05-26T22:53:39.623Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter"
      ],
      "applications": [
        "custom_adapter"
      ],
      "description": "Recipe description 68",
      "parameters_schema": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes/search?user_id=60
200
{
  "items": [
    {
      "id": 77,
      "user_id": 60,
      "name": "Recipe 76",
      "created_at": "2015-05-26T22:53:40.001Z",
      "updated_at": "2015-05-26T22:53:40.001Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [],
      "applications": [],
      "description": "Recipe description 76",
      "parameters_schema": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes/search
200
{
  "items": [
    {
      "id": 80,
      "user_id": 62,
      "name": "Recipe 79",
      "created_at": "2015-05-26T22:53:40.261Z",
      "updated_at": "2015-05-26T22:53:40.261Z",
      "copy_count": 17,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 79",
      "parameters_schema": []
    },
    {
      "id": 82,
      "user_id": 63,
      "name": "Recipe 81",
      "created_at": "2015-05-26T22:53:40.326Z",
      "updated_at": "2015-05-26T22:53:40.326Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [],
      "applications": [],
      "description": "Recipe description 81",
      "parameters_schema": []
    },
    {
      "id": 81,
      "user_id": 62,
      "name": "Recipe 80",
      "created_at": "2015-05-26T22:53:40.292Z",
      "updated_at": "2015-05-26T22:53:40.292Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 80",
      "parameters_schema": []
    },
    {
      "id": 79,
      "user_id": 62,
      "name": "Recipe 78",
      "created_at": "2015-05-26T22:53:40.219Z",
      "updated_at": "2015-05-26T22:53:40.219Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter"
      ],
      "applications": [
        "custom_adapter"
      ],
      "description": "Recipe description 78",
      "parameters_schema": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes/search?adapter_names_all=custom_adapter%2Ccustom_adapter1
200
{
  "items": [
    {
      "id": 85,
      "user_id": 65,
      "name": "Recipe 84",
      "created_at": "2015-05-26T22:53:40.586Z",
      "updated_at": "2015-05-26T22:53:40.586Z",
      "copy_count": 17,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 84",
      "parameters_schema": []
    },
    {
      "id": 86,
      "user_id": 65,
      "name": "Recipe 85",
      "created_at": "2015-05-26T22:53:40.617Z",
      "updated_at": "2015-05-26T22:53:40.617Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 85",
      "parameters_schema": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes/search?per_page=2
200
{
  "items": [
    {
      "id": 90,
      "user_id": 68,
      "name": "Recipe 89",
      "created_at": "2015-05-26T22:53:40.879Z",
      "updated_at": "2015-05-26T22:53:40.879Z",
      "copy_count": 17,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 89",
      "parameters_schema": []
    },
    {
      "id": 92,
      "user_id": 69,
      "name": "Recipe 91",
      "created_at": "2015-05-26T22:53:40.937Z",
      "updated_at": "2015-05-26T22:53:40.937Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [],
      "applications": [],
      "description": "Recipe description 91",
      "parameters_schema": []
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes/search?cloned_recipe_id=true
200
{
  "items": [
    {
      "id": 95,
      "user_id": 71,
      "name": "Recipe 94",
      "created_at": "2015-05-26T22:53:41.201Z",
      "updated_at": "2015-05-26T22:53:41.201Z",
      "copy_count": 17,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 94",
      "parameters_schema": [],
      "cloned_recipe_id": null
    },
    {
      "id": 97,
      "user_id": 72,
      "name": "Recipe 96",
      "created_at": "2015-05-26T22:53:41.256Z",
      "updated_at": "2015-05-26T22:53:41.256Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [],
      "applications": [],
      "description": "Recipe description 96",
      "parameters_schema": [],
      "cloned_recipe_id": null
    },
    {
      "id": 96,
      "user_id": 71,
      "name": "Recipe 95",
      "created_at": "2015-05-26T22:53:41.227Z",
      "updated_at": "2015-05-26T22:53:41.227Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 95",
      "parameters_schema": [],
      "cloned_recipe_id": null
    },
    {
      "id": 94,
      "user_id": 71,
      "name": "Recipe 93",
      "created_at": "2015-05-26T22:53:41.143Z",
      "updated_at": "2015-05-26T22:53:41.143Z",
      "copy_count": 1,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter"
      ],
      "applications": [
        "custom_adapter"
      ],
      "description": "Recipe description 93",
      "parameters_schema": [],
      "cloned_recipe_id": 98
    }
  ]
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/recipes/search?adapter_names_any=custom_adapter%2Ccustom_adapter1&curated=true
200
{
  "items": [
    {
      "id": 100,
      "user_id": 74,
      "name": "Recipe 99",
      "created_at": "2015-05-26T22:53:41.477Z",
      "updated_at": "2015-05-26T22:53:41.477Z",
      "copy_count": 17,
      "trigger_application": null,
      "action_applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "applications": [
        "custom_adapter",
        "custom_adapter1"
      ],
      "description": "Recipe description 99",
      "parameters_schema": []
    }
  ]
}
</code></pre>

</details>

## Start recipe

> PUT /api/recipes/:id/start

### Description
Starts a recipe specified by recipe ID.

<details> <summary><b>Details</b></summary>

<h3> Parameters</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Parameter name</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <b>id</b> <br>required</td>
    <td>
    Recipe ID
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a number</li>
    </ul>
    </td>
  </tr>
  </tbody>
</table>

<h3> Responses</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Code</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <kbd>200</kbd> </td>
    <td> Success </td>
  </tr>
  <tr>
    <td width =200 > <kbd>401</kbd> </td>
    <td> Unauthorized </td>
  </tr>
  <tr>
    <td width =200 > <kbd>404</kbd> </td>
    <td> Not found </td>
  </tr>
  <tr>
    <td width =200 > <kbd>500</kbd> </td>
    <td> Server error </td>
  </tr>
  </tbody>
</table>

<h3> Examples</h3>

<h4> Success: 200</h4>
<pre><code style="display: block; white-space: pre-wrap;">PUT /api/recipes/109/start
200
{
  "success": true
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">PUT /api/recipes/111/start
200
{
  "success": false,
  "code_errors": [
    [
      0,
      [
        [
          "id",
          null,
          "can't be blank"
        ]
      ]
    ]
  ],
  "config_errors": []
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">PUT /api/recipes/112/start
200
{
  "success": true
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">PUT /api/recipes/114/start
404
{
  "message": "Not found"
}
</code></pre>

</details>

## Stop recipe

> PUT /api/recipes/:id/stop  

### Description
Stops a recipe specified by recipe ID.

<details> <summary><b>Details</b></summary>

<h3> Parameters</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Parameter name</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <b>id</b> <br>required</td>
    <td>
    Recipe ID
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a number</li>
    </ul>
    </td>
  </tr>
  </tbody>
</table>

<h3> Responses</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Code</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <kbd>200</kbd> </td>
    <td> Success </td>
  </tr>
  <tr>
    <td width =200 > <kbd>401</kbd> </td>
    <td> Unauthorized </td>
  </tr>
  <tr>
    <td width =200 > <kbd>404</kbd> </td>
    <td> Not found </td>
  </tr>
  <tr>
    <td width =200 > <kbd>500</kbd> </td>
    <td> Server error </td>
  </tr>
  </tbody>
</table>

<h3> Examples</h3>

<h4> Success: 200</h4>
<pre><code style="display: block; white-space: pre-wrap;">PUT /api/recipes/57/stop
200
{
  "success": true
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">PUT /api/recipes/58/stop
404
{
  "message": "Not found"
}
</code></pre>

</details>

## Delete recipe

> DELETE /api/recipes/:id

### Description
Deletes a the recipe specified by id

<details> <summary><b>Details</b></summary>

<h3> Parameters </h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Parameter name</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <b>id</b> <br>required</td>
    <td>
    Recipe ID
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be a number</li>
    </ul>
    </td>
  </tr>
  </tbody>
</table>

<h3> Responses</h3>
<table class="unchanged rich-diff-level-one" text-align ="center">
  <thead>
    <tr>
        <th width='20%'>Code</th>
        <th width='80%'>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width =200 > <kbd>200</kbd> </td>
    <td> Success </td>
  </tr>
  <tr>
    <td width =200 > <kbd>401</kbd> </td>
    <td> Unauthorized </td>
  </tr>
  <tr>
    <td width =200 > <kbd>404</kbd> </td>
    <td> Not found </td>
  </tr>
  <tr>
    <td width =200 > <kbd>500</kbd> </td>
    <td> Server error </td>
  </tr>
  </tbody>
</table>

<h3> Examples</h3>

<h4> Success: 200</h4>
<pre><code style="display: block; white-space: pre-wrap;">DELETE /api/recipes/1
200
{
  "success": true
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">DELETE /api/recipes/3
404
{
  "message": "Not found"
}
</code></pre>
</details>
