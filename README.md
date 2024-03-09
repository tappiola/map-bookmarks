# Mobilyze test task

In order to install dependencies run:

### `npm i`

In order to start the project locally run:

### `npm start`

## Features

- MapBoxGL is used for rendering map
- 2 types of locations are handled: Points of interest and plain addresses
- Geocoding API is used for collecting additional data on clicked locations
- Click on location in the list changes map center (calls `flyTo`)
- Simplest persistent storage possible in used in this task (`localStorage`), as work with DB / APIs is not the main focus of this task

![Screenshot](public/screenshot.png "Screenshot")
