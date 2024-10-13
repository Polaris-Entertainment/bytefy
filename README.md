
## Overview

This project consists of two main components:
1. **Image Converter Frontend**: An Angular application for converting images.
2. **Image Converter Backend**: A .NET 8.0 application that handles the image processing.

## Prerequisites

- **Node.js** (for the Angular frontend)
- **.NET SDK** (for the backend)
- **Docker** (for containerization)

## Getting Started

### Frontend (Angular)

1. **Navigate to the frontend directory**:
    ```sh
    cd path/to/frontend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the development server**:
    ```sh
    npm start
    ```

    The Angular application will be available at `http://localhost:4200`.

### Backend (.NET)

1. **Navigate to the backend directory**:
    ```sh
    cd path/to/backend
    ```

2. **Restore .NET dependencies**:
    ```sh
    dotnet restore
    ```

3. **Build the project**:
    ```sh
    dotnet build
    ```

4. **Run the application**:
    ```sh
    dotnet run
    ```

    The backend API will be available at `http://localhost:5000`.

### Using Docker

1. **Build and run the Docker containers**:
    ```sh
    docker-compose up --build
    ```

    This will build and start both the frontend and backend services.

2. **Access the applications**:
    - Frontend: `http://localhost:4200`
    - Backend: `http://localhost:5000`

## Additional Information

### Running Tests

#### Frontend

To run the tests for the Angular application:
```sh
npm test
```

#### Backend

To run the tests for the .NET application:
```sh
dotnet test
```

### Building for Production

#### Frontend

To build the Angular application for production:
```sh
npm run build
```

#### Backend

To publish the .NET application:
```sh
dotnet publish -c Release
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
