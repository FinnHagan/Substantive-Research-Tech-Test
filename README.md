# Substantive-Research-Tech-Test

## Installation Instructions

## Prerequisites
Please ensure you have the following are installed:
- Node.js
- npm

## Installation Steps

1. **Clone the repository Using Git Bash**
   ```sh
   git clone https://github.com/FinnHagan/Substantive-Research-Tech-Test.git
   cd <repository_directory> (cd Substantive-Research-Tech-Test/)
   cd substantive-research
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

   This will install all required packages, including:
   - **Axios**: For making HTTP requests to the API.
   - **Chart.js** and **react-chartjs-2**: For the Year-on-Year Product Payment Trends chart

3. **Open the project in a code editor**
   Use your preferred code editor (e.g., VS Code) to open the project folder.

4. **Environment Variables**
   Create a `.env` file in the "substantive-research" directory and add the following environment variables:
   ```env
   REACT_APP_API_BASE_URL=<URL provided in the Technical Test Document>
   REACT_APP_API_KEY=<AUTH key provided in the Technical Test Document>
   ```

5. **Run the application**
   ```sh
   npm start
   ```
   The application will run locally on `http://localhost:3000`.
