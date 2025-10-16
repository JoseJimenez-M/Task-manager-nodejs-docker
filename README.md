# Task Manager Application (Node.js & Docker Compose)

This is a complete web application built with a Node.js API and a static Frontend UI, containerized and orchestrated using **Docker Compose**.

---

## Technologies Used

* **Backend (API):** Node.js, Express.js (routing), CORS.
* **Frontend (UI):** HTML, CSS, JavaScript (`fetch` requests).
* **Containerization:** Docker and Docker Compose.
* **Data Persistence:** In-memory Array (tasks are reset upon container restart).

---

## Implemented Functionalities (Full CRUD)

The application implements all four fundamental operations (CRUD) via the REST API:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/tasks` | Retrieves the complete list of tasks. |
| **POST** | `/tasks` | Creates a new task. |
| **PATCH** | `/tasks/:id` | **Updates** the task status (toggles completed/incomplete). |
| **DELETE** | `/tasks/:id` | Deletes a specific task. |
| **DELETE** | `/tasks` | Clears all tasks. |

---

## Execution Instructions

To run the application, **Docker Desktop** must be installed and running on your system.

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPOSITORY_LINK]
    cd task-manager-nodejs-docker
    ```

2.  **Build and Start Containers:**
    From the root folder, run the following command. This will build the images for both the frontend (Nginx) and backend (Node.js) services and start them on the Docker network.
    ```bash
    docker compose up --build
    ```

3.  **Access the Application:**
    Once both services are running, open your web browser and navigate to:
    **`http://localhost:8080`**

---

## Key Notes for Evaluation

* **Communication:** The Frontend communicates with the Backend via the exposed port: **`http://localhost:3000`**.
* **CORS:** The **CORS** library was enabled on the backend to allow cross-port communication between the frontend (8080) and the backend (3000).
* **Docker Hub Submission:** The final project images are hosted on Docker Hub under the username: **`jos3jm`**.
    * Backend Image: `jos3jm/task-manager-backend:latest`
    * Frontend Image: `jos3jm/task-manager-frontend:latest`
