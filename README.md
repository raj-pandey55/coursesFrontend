# Frontend Repository - Course Listing Application

This repository contains the frontend of the Course Listing Application, developed as part of the **Internship Application Assignment 2024-25** for the **Application Software Centre, IIT Bombay**. The frontend is built using **React** with **Vite** and styled with **Tailwind CSS**. The backend for this project is implemented in **Django**.

## Project Structure

The project is structured as follows:

```
├── public/
├── src/
│   ├── components/       # React components
│   ├── pages/            # Pages for routing
│   ├── services/         # API calls to the Django backend
│   ├── styles/           # Custom Tailwind styles
│   └── App.jsx           # Main entry point of the application
├── index.html
├── Dockerfile            # Dockerfile for containerizing the frontend application
├── tailwind.config.js    # Tailwind configuration file
├── vite.config.js        # Vite configuration file
└── package.json
```

## Features

This frontend application allows users to:

1. **List all courses**: Display a list of all available courses fetched from the backend API.
2. **Create a new course**: Submit a form to add a new course to the database.
3. **View course details**: Click on a course to view detailed information about it.
4. **Delete a course**: Remove a course from the database by selecting and deleting it.
5. **Manage course delivery instances**:
   - List all course instances for a particular year and semester.
   - Create a new instance for a course delivery.
   - View details of a specific course instance.
   - Delete a course instance.

## Technologies Used

- **React + Vite**: For a fast and efficient frontend development environment.
- **Tailwind CSS**: For modern and responsive design.
- **Axios**: For making HTTP requests to the Django backend API.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v14.x or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/raj-pandey55/coursesFrontend.git
   ```

2. Navigate into the project directory:

   ```bash
   cd frontend-repo
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Development Server

To start the development server:

```bash
npm run dev
```

This will start the frontend application on `http://localhost:5173`.

### Building for Production

To create a production build, run:

```bash
npm run build
```

The build output will be stored in the `dist/` directory.

## API Integration

This frontend interacts with the **Courses API** provided by the Django backend. The following API endpoints are used:

- **GET /api/courses**: Fetches a list of all courses.
- **POST /api/courses**: Creates a new course.
- **GET /api/courses/:id**: Fetches details of a specific course.
- **DELETE /api/courses/:id**: Deletes a specific course.
- **GET /api/instances/:year/:semester**: Fetches course instances for a specific year and semester.
- **POST /api/instances**: Creates a new course instance.
- **DELETE /api/instances/:year/:semester/:id**: Deletes a specific course instance.

These API calls are implemented in the `services/` folder using **Axios**.

## Styling

The project uses **Tailwind CSS** for styling. The configuration is stored in `tailwind.config.js`. Custom utility classes are applied across components for responsive and adaptive design.

## Docker

This frontend application is containerized using **Docker**. The Docker image is pushed to DockerHub, and it is set up to be pulled and run with **docker-compose** alongside the Django backend.


### Build and Run the Docker Container

To build and run the frontend container:

1. Ensure Docker is installed.
2. Build the Docker image:

   ```bash
   docker build -t yourusername/frontend-app .
   ```

3. Run the container:

   ```bash
   docker run -p 80:80 yourusername/frontend-app
   ```

Alternatively, use `docker-compose.yaml` to run both frontend and backend together.

## Deployment

You can deploy this application by using services like **Netlify**, **Vercel**, or Docker-based platforms. The application is optimized for fast loading times and scalability.

## Contribution

Feel free to contribute to this project by forking the repository, making your changes, and creating a pull request. Ensure you commit regularly and follow best practices in coding and documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Application Software Centre, IIT Bombay** for the assignment guidelines and resources.
- **React, Vite, and Tailwind** for their powerful tools and frameworks.

---

This frontend is part of a larger Course Listing system. You can find the backend repository [here](https://github.com/raj-pandey55/CoursesApi).