// Import required modules
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config.json'); // Importing the configuration file

/* API URL - The API uses MONGODB database query and projection operators to query the database. See documentations below for more information. You will need to rewrite this API call to pass different file_id parameters based on profile.
https://www.mongodb.com/docs/manual/reference/operator/query/
https://github.com/SEL-Columbia/formhub/wiki/Formhub-Access-Points-(API)#api-parameters */

const url = 'https://kobo.unhcr.org/api/v2/assets/a9bsMNixpr7VEtKBGUhtvf/data/?format=json&query={%22group1/file_id%22:%220170VAN%22}';

// Headers containing the authentication token
const headers = {
  Authorization: `Token ${config.AUTH_TOKEN}`,
};

// Function to download image
function downloadImage(downloadLink, filename) {
  axios.get(downloadLink, { responseType: 'stream', headers })
    .then((imageResponse) => {
      imageResponse.data.pipe(fs.createWriteStream(filename)); // Saving the image to local file
      console.log(`Downloaded and saved ${filename}`);
    })
    .catch((error) => {
      console.error(`Error downloading ${filename}: ${error}`);
    });
}

// Function to process attachments, filtering images and building download links
function processAttachments(attachments) {
  attachments.forEach((attachment) => {
    if (attachment.mimetype === 'image/jpeg') { // Check for image/jpeg mime type
      const downloadLink = 'https://kobocat.unhcr.org/media/original?media_file=' + attachment.filename;
      const filename = path.basename(attachment.filename); // Extract filename from path
      downloadImage(downloadLink, filename); // Call download function
    }
  });
}

// Main function to fetch API data and process attachments
axios.get(url, { headers })
  .then((response) => {
    const attachments = response.data.results[0]._attachments; // Extract attachments from API response
    processAttachments(attachments); // Process attachments
  })
  .catch((error) => {
    console.error(`Error fetching API data: ${error}`); // Log error if API call fails
  });
