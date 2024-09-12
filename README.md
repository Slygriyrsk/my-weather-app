# 🌦️ WeatherApp

Welcome to **WeatherApp**, a modern React application that provides weather forecasts with a sleek, futuristic UI. This guide will help you set up, understand, and troubleshoot the application.

## 🛠️ Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Lucide React**: A collection of open-source icons for React.
- **CSS**: For styling the application with a futuristic theme and dark mode support.
- **OpenWeatherMap API**: Provides weather data for cities around the world.
- **Vercel**: For deployment and seamless UI rendering.

## 📸 Website Layout

### Home Screen
![Screenshot 2024-09-12 144800](https://github.com/user-attachments/assets/8c1ca23f-bd28-43c9-9228-86ce46e93adf)

### Dark Mode
![Screenshot 2024-09-12 144812](https://github.com/user-attachments/assets/86fa5d4e-83e2-4d4b-bfd6-c9dd56cdd9c9)

## 🚀 Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (optional)

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Slygriyrsk/weather-app.git
   cd weather-app `

1.  **Install Dependencies**

    Using npm:

    ```bash
    npm install
    ```

    Using Yarn:

    ```bash
    yarn install
    ```

2.  **Set Up Environment Variables**

    Create a `.env` file in the root directory and add the following lines. Replace `your_openweathermap_api_key` with your actual API key.

    ```plaintext
    REACT_APP_API_KEY=your_openweathermap_api_key
    REACT_APP_API_URL=https://api.openweathermap.org/data/2.5/weather?q=
    ```

3.  **Start the Development Server**

    Using npm:

    ```bash
    npm start
    ```

    Using Yarn:

    ```bash
    yarn start
    ```

    The application will be available at `http://localhost:3000`.

4.  **Deploy to Vercel**

    To deploy your app with Vercel, follow these steps:

    -   Push your code to a Git repository (GitHub, GitLab, Bitbucket).
    -   Sign up or log in to Vercel.
    -   Sign up or log in to Netlify and directly drop your build folder or manually add it there.
    -   Import your project from your Git repository.
    -   Vercel will automatically build and deploy your application. You will receive a live URL for your deployed app.

    For detailed deployment instructions, refer to the Vercel documentation.

## 📂 File Structure


Here's a breakdown of the file structure:

```bash
/weather-app
  ├── /public
  │   └── index.html         # Main HTML file
  ├── /src
  │   ├── /components
  │   │   ├── WeatherApp.js  # Main weather application component
  │   │   ├── WeatherBox.js  # Component for displaying weather data
  │   │   └── WeatherAnimation.js # Component for weather-specific animations
  │   ├── /styles
  │   │   └── styles.css     # CSS styling
  │   ├── index.js           # Entry point of the React application
  │   └── App.js             # Main App component
  ├── .env                   # Environment variables
  ├── package.json           # Project metadata and dependencies
  └── README.md              # This file
  ```

💻 Code Examples
----------------

### Main Weather Component (`WeatherApp.js`)

```javascript
import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Cloud, CloudRain, CloudSnow, Wind, Droplet, Thermometer, Sunrise, Sunset, Search, MapPin, RefreshCcw, CloudLightning, CloudDrizzle } from 'lucide-react';
import '../styles/styles.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export default function WeatherApp() {
  // State management and effect hooks for fetching and displaying weather data.
  // Detailed implementation of fetching weather, toggling modes, and handling UI interactions.
}
```

### Weather Box Component (`WeatherBox.js`)

```javascript
import React from 'react';

function WeatherBox({ icon, label, value }) {
  return (
    <div className="data-item">
      <div className="data-icon">{icon}</div>
      <p className="data-label">{label}</p>
      <p className="data-value">{value}</p>
    </div>
  );
}

export default WeatherBox;
```

### Weather Animation Component (`WeatherAnimation.js`)

```javascript
import React, { useState, useEffect } from 'react';

function WeatherAnimation({ condition, darkMode }) {
  // Logic for generating and rendering weather-specific animations based on the weather condition.
}

export default WeatherAnimation;
```

🌟 Features
-----------

-   **City Search**: Enter a city name to get weather updates.
-   **Dark Mode**: Toggle between light and dark modes for improved readability.
-   **Unit Toggle**: Switch between Celsius and Fahrenheit.
-   **Current Location**: Get weather information for your current location using geolocation.
-   **Recent Searches**: View and quickly access recent search queries.

🎨 Styling
----------

The application employs a futuristic design with CSS customizations located in `styles/styles.css`. You can modify the styles to suit your preferences.

🔧 Troubleshooting
------------------

-   **Error: City not found**: Double-check the city name for accuracy and ensure it's properly spelled.
-   **Error: Unable to fetch weather for your location**: Verify that your browser's location services are enabled and that you have granted permission to the site.
-   **Loading issues**: Ensure your `.env` file contains the correct API key and URL. Restart the development server if necessary.

📄 License
----------

This project is licensed under the MIT License. See the LICENSE file for details.

🤝 Contributing
---------------

We welcome contributions to improve the application. To contribute:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add new feature'`).
5.  Push to the branch (`git push origin feature-branch`).
6.  Open a pull request.

📝 FAQ
------

**Q: How do I get an API key for OpenWeatherMap?**\
A: Sign up at OpenWeatherMap and follow their instructions to generate an API key.

**Q: What should I do if the weather data isn't loading?**\
A: Ensure your API key is valid and correctly set in the `.env` file. Check the browser console for any error messages.

**Q: Can I deploy the app to other platforms besides Vercel?**\
A: Yes, you can deploy the app to other hosting services like Netlify, Heroku, or AWS. Follow their deployment guides for React applications.

**Q: How can I customize the UI?**\
A: Modify the `styles/styles.css` file to adjust colors, fonts, and layout according to your design preferences.

📣 Contact
----------

For further questions or support, please reach out to slygrin005@gmail.com.

* * * * *

Thank you for using **WeatherApp**! We hope you enjoy the sleek design and powerful features. Happy coding! 🌟
