# Image Downloader from UNHCR Kobo API

This project consists of a Node.js script that fetches data from the UNHCR Kobo API, extracts images from the response, and downloads them locally.

## Requirements

- Node.js
- Axios library for HTTP requests
- A configuration file `config.json` with the authentication token

## Configuration

Create a file named `config.json` in the root directory of the project with the following structure:

```json
{
  "AUTH_TOKEN": "your-authentication-token-here"
}
```

Replace your-authentication-token-here with your actual authentication token.

## Installation

1. Clone the repository or download the files to your local machine.
2. Navigate to the project directory.
3. Run npm install to install the required dependencies.

## Running the Script

1. Ensure that the configuration file is properly set up with the correct authentication token.
2. Run node script.js (or the name you've given to the script file) from the command line in the project directory.

## Functionality

1. Fetches data from the specified API URL.
2. Filters the attachments in the response to only include those with a mimetype of image/jpeg.
3. Builds the download links for the images using the filenames.
4. Downloads the images and saves them locally.

## Error Handling

1. If the API request fails, an error message is logged to the console.
2. If an image fails to download, an error message specific to that image is logged to the console.

## To RUN the script

### install axios

```bash
npm install axios
```

### Run script

```bash
node downloadImages.js
```

## License

This project is licensed under the terms of the MIT license.
