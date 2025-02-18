# ✅ RESTful API Todo List  

A simple and efficient **RESTful API for managing a Todo List**, built with **Node.js, Express, PostgreSQL, and Supabase**. This API allows users to **create, read, update, and delete (CRUD)** tasks with ease.  

🚀 **Live Demo:** [Try the API](https://backend-project-flax.vercel.app/)  

---

## 📌 Features  
✅ **CRUD Operations** – Create, Read, Update, and Delete tasks.  
✅ **RESTful API Architecture** – Follows best practices.  
✅ **PostgreSQL Database** – Efficient and scalable data storage.  
✅ **Supabase Integration** – Used for database hosting.  
✅ **Deployed on Vercel** – Fast and reliable cloud deployment.  

---

## 🛠️ Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (hosted on Supabase)  
- **Deployment:** Vercel  
- **Tools:** Postman (for API testing)  

---

## 🚀 API Endpoints  
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/todos` | Get all todos |
| POST   | `/todos` | Create a new todo |
| POST | `/todos/:id` | Delete a todo by ID |

🔹 **Note:** Use **Postman** or any API testing tool to interact with these endpoints.

---

## 🏗️ Installation & Setup  
To run this project locally, follow these steps:  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/tahreeminamdar22/backend-project.git
cd backend-project

### 2️⃣ **Install Dependencies**
```bash
npm install

###  3️⃣**Setup Environment Variables**
Create a .env file in the root directory and add:
DATABASE_URL=your_supabase_postgresql_url
PORT=5000

###  4️⃣ **Run Server**
node index.js

