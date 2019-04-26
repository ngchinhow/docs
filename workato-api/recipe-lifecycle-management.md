---
title: Workato API - Recipe lifecycle management
date: 2019-04-25 12:20:00 Z
---

# Recipe lifecycle management
Use the following endpoints to automate the import and export of packages.

### Supported Formats
* Json

## Export package based on a manifest

> POST /api/packages/export/:manifest_id

### Description
Export package based on a manifest. Manifest ID is required.

<details> <summary> <b>Details</b></summary>

<h3> Responses </h3>
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
    <td width =200 > <kbd>400</kbd> </td>
    <td> Bad request </td>
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
    <td width =200 > <b>manifest_id</b> <br>required</td>
    <td>
    Export manifest ID
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be string</li>
    </ul>
    </td>
  </tr>
  </tbody>
</table>

<h3> Examples</h3>

<h4>Success: 200</h4>
<pre><code style="display: block; white-space: pre-wrap;">GET /api/packages/242
200
{  
   "id":242,
   "operation_type":"export",
   "status":"completed",
   "export_manifest_id":3,
   "download_url":"https://workato-staging-assets,com/packages/zip_files/000/000/242/original/exportdemo.zip"
}
</code></pre>
</details>

## Import package into a folder

> POST /api/packages/import/:folder_id

### Description
Import a package (zip file) into the folder. The input is a “application/octet-stream” payload containing package content. `restart_recipes` should be “true” if running recipes need to be restarted upon import.

<details> <summary> <b>Details</b></summary>

<h3> Responses </h3>
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
    <td width =200 > <kbd>400</kbd> </td>
    <td> Bad request </td>
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
    <td width =200 > <b>folder_id</b> <br>required</td>
    <td>
    Folder ID
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be string</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td width =200 > <b>restart_recipes</b> <br>optional</td>
    <td>
    Set to 'true' to allow the restarting of running recipes
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be string</li>
    </ul>
    </td>
  </tr>
  </tbody>
</table>

<h3> Examples</h3>

<h4>Success: 200</h4>
<pre><code style="display: block; white-space: pre-wrap;">POST /api/packages/import/2617
200
{  
   "id":251,
   "operation_type":"import",
   "status":"completed",
   "download_url":"https://workato-staging-assets,com/packages/zip_files/000/000/242/original/exportdemo.zip"
}
</code></pre>
</details>

## Get package by ID

> GET /api/packages/:id

### Description
Get details of an imported or exported package.

<details> <summary> <b>Details</b></summary>

<h3> Responses </h3>
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
    <td width =200 > <kbd>400</kbd> </td>
    <td> Bad request </td>
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

<h4>Success: 200</h4>
<pre><code style="display: block; white-space: pre-wrap;">GET /api/packages/242
200
{  
   "id":242,
   "operation_type":"export",
   "status":"completed",
   "export_manifest_id":3,
   "download_url":"https://workato-staging-assets,com/packages/zip_files/000/000/242/original/exportdemo.zip"
}
</code></pre>

<pre><code style="display: block; white-space: pre-wrap;">GET /api/packages/245
200
{  
   "id":242,
   "operation_type":"export",
   "status":"failed",
   "error":"error_message"
   "export_manifest_id":4,
   "download_url":"null"
}
</code></pre>

</details>

## Download package

> GET /api/packages/:id/download

### Description
If successful, redirects to package content. Returns `404` if package not found or doesn't have content.

<details> <summary> <b>Details</b></summary>

<h3> Responses </h3>
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
    <td width =200 > <kbd>400</kbd> </td>
    <td> Bad request </td>
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
    Package ID
    <br>
    <b>Validations:</b> <br>
    <ul>
    <li>Must be string</li>
    </ul>
    </td>
  </tr>
  </tbody>
</table>
