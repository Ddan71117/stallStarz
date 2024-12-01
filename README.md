<!-- # stallStarz

![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Tests](#tests)
5. [Contributing](#contributing)
6. [Questions](#questions)
7. [License](#license)

## Description

An app that allows users to find, rate, and review local bathrooms.

## Installation

## Usage

## Tests

## Contributing

## Questions

## License

[MIT](https://opensource.org/licenses/MIT) -->

## Description

stallStarz is a modern web application that allows users to find, rate, and review public bathrooms. Whether you are traveling or in a new area, StallStarz provides a comprehensive database of user-reviewed restrooms, helping you make informed decisions. Key features include:

- **Search by Location**: Find restrooms near your current location or search by address.
- **Ratings and Reviews**: Browse user reviews and ratings for cleanliness, accessibility, and amenities.
- **Contribute**: Add new bathroom locations, leave reviews, and rate facilities.
- **Interactive Map**: Visualize nearby restrooms on an intuitive map interface.

The app is designed to enhance convenience and comfort for travelers, parents, and individuals with specific accessibility needs.

---

## Installation

### Prerequisites

Before installing, ensure you have the following:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- A modern web browser

### Steps to Install

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/stallstarz.git
   ```

2. Navigate to the project directory:

   ```
   cd stallstarz
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the required API keys and configuration details:

     ```
     PORT=3000

     DB_HOST=localhost

     DB_PORT=5432

     DB_USERNAME=postgres

     DB_PASSWORD=

     DB_NAME=auth_app

     JWT_SECRET=

     NODE_ENV=development
     ```

5. (Optional) Seed the database with sample data:

   ```
   npm run seed
   ```

---

## Usage

### Running the App Locally

1. Start the development server:

   ```
   npm start
   ```

2. Open a browser and visit:

   ```
   http://localhost:3000
   ```

### Features

- **Search Bathrooms**: Use the search bar or the map interface to find bathrooms near you.
- **Submit Reviews**: Click on a bathroom location to submit a review and rate its cleanliness, accessibility, and amenities.
- **Interactive Map**: Pan, zoom, and explore bathroom locations in your area.

---

## Tests

Testing is essential to ensure the app runs reliably. The project includes unit and integration tests.

### Running Tests

1. To run all tests:

   ```
   npm test
   ```

2. For detailed test output:

   ```
   npm run test:verbose
   ```

---

## Contributing

Contributions are welcome! Follow these steps to contribute to the project:

1. **Fork the Repository**:

   - Click the "Fork" button on the project GitHub page.

2. **Clone the Forked Repository**:

   ```
   git clone https://github.com/yourusername/stallstarz.git
   ```

3. **Create a Feature Branch**:

   ```
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes and Commit**:

   - Follow coding standards and write descriptive commit messages:

     ```
     git commit -m "Add feature: your feature description"
     ```

5. **Push Changes**:

   ```
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request**:

   - Go to the original repository on GitHub and click "New Pull Request."

### Contribution Guidelines

- Adhere to the project's coding standards.
- Test your changes before submitting.
- Document new features in the README.

---

## Questions

For questions, feedback, or support, feel free to reach out:

- **GitHub**: [yourusername](https://github.com/yourusername)
- **Email**: your-email@example.com

---
