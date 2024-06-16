# Weather App

This project is a weather dashboard application that allows users to get the current weather and a 5-day forecast for a city they enter or their current location. The application fetches data from the OpenWeatherMap API and displays it in a user-friendly format.

Table of Contents:

- Getting Started
- Running the Application Locally
- Technologies Used
- Known Issues Limitations

# Getting Started

 To get a local copy of the project up and running, follow these simple steps.
 
 Prerequisites:
   - Node.js (version 14 or later)
   - npm (Node Package Manager)

 Installation:

 - Clone the repository:

    git clone https://github.com/manojkumar9786/weather-app.git

- Navigate to the project directory:

     cd weather-app
  
- Install the necessary npm packages:

     npm install

- Start the application:

     npm run dev

- Open your browser and navigate to:

      http://localhost:5173

# Technologies Used

- React.js: A JavaScript library for building user interfaces.

- Tailwind CSS: A utility-first CSS framework for rapidly building custom user interfaces.

- OpenWeatherMap API: A service to get weather data.

# Brief Description of the Approach

- Component Structure: The application is structured using React functional components

- State Management: React hooks (useState, useEffect) are used for managing state and side effects.

- Responsive Design: Tailwind CSS is used for styling the application, ensuring it is responsive and user-friendly across different devices.

- API Integration: The application integrates with the OpenWeatherMap API to fetch weather data based on city name or user’s current location.

# Known Issues Limitations

 - Geolocation: If the user denies geolocation permissions, the application cannot fetch the current location's weather data.

 - API Limits: The application relies on the OpenWeatherMap free tier, which has limitations on the number of requests per minute.

 - Error Handling: Basic error handling is implemented, but could be enhanced for better user feedback.
     
