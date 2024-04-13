# Flickr App - Seesaw Assessment

## Overview
The Flickr App is a React-based application that allows users to search for images using the Flickr API. It features an infinite scroll gallery, where more images are loaded as the user scrolls down. The app is built with React 18 and utilizes TailwindCSS for styling.

## How to Run the App

### Prerequisites
- Node.js installed on your machine.
- An API key from Flickr.

### Steps
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your Flickr API key as follows:
   ```env
   REACT_APP_FLICKR_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```bash
   npm start
   ```
6. Open `http://localhost:3000` in your browser to view the app.

## API Endpoints Used

The app uses the Flickr API to fetch images based on the user's search query. The specific endpoint used is:

- **Flickr Photos Search API**: `https://api.flickr.com/services/rest?method=flickr.photos.search`

The request to this endpoint includes parameters such as the API key, search text, response format, and additional parameters to fetch specific photo details. The response is then processed and displayed in the app's gallery.

For more details on the Flickr API, refer to the [Flickr API documentation](https://www.flickr.com/services/api/).

## Key Features

- **Search**: Users can search for images using keywords.
- **Infinite Scrolling**: More images are loaded as the user scrolls down.
- **Image Details**: Clicking on an image opens a modal with more details about the image.

## Development

This project is set up with ESLint and Prettier for code linting and formatting. TailwindCSS is used for styling, and the project structure follows a modular approach for ease of development and maintenance.