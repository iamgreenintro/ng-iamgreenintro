# NG-IAMGREENINTRO

An expanding Angular workspace intented to develop libraries that are useful and can be imported as-needed.

## Table of contents

- [Features](#features)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

## Features

- [x] Draggable components - a directive to make Angular components draggable.
- [x] Notification component & service - a toast component and service to manage customizable notifications out of the box.
- [x] Angular demo application with above mentioned features.

## Development

### Step 1: Build the library project in watch mode:

If there are multiple libraries in the workspace you can swap out the `gi-libby` library name with another library.

`ng build gi-libby --watch`

### Step 2: Build and serve the demo project (example application) in watch mode:

`ng serve demo -o`

## Troubleshooting:

`Error: Cannot find module 'gi-libby' or its corresponding type declarations.`

<p>
The demo project might have been built <b>before</b> the gi-libby project (the library). Make sure the library is available to the demo application by ensuring it completes building before building the demo application.
</p>
