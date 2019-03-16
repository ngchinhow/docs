---
title: Workato connector - Dropbox - Download file
date: 2019-01-31 06:00:00 Z
---

# Dropbox action - Download file
This action downloads contents of a file. The `File contents` output from this action can be used in subsequent steps of the recipe to upload the file into other applications.

The following image is an example of uploading a file using `File contents`. Here, we map `File contents` from the action `Download file` to the action [Upload file using file contents](/connectors/dropbox/action-upload-file-contents.md):

![Download & upload file in Dropbox](/assets/images/connectors/dropbox/download-upload-file.png)

## Input fields

| Field name | Description |
|---|---|
| File / file path | The file in Dropbox that you want to download the contents.  |

## Output fields

| Field name | Description |
|---|---|
| File contents | String contents of the file. This can be used to upload the file to another place, using actions such as Dropbox's [Upload file using file contents](/connectors/dropbox/action-upload-file-contents.md)  |
| Size | Size of the file in bytes. |
