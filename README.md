# form-react-express

## Project Overview

The goal of this project is to build a user registration form with a back-end API and a front-end React application. The back-end handles user data validation and registration, while the front-end provides the user interface.

### **Form Fields:**
1. **Name**  
   - A text field where the user can input their name.

2. **Email**  
   - A text field for the user to enter their email address.

3. **CEP**  
   - A field to input the postal code (CEP). The input must only allow numeric characters and be in the format `XXXXXXXX`.

4. **Submit Button**  
   - A button that sends the form data to the backend for registration.
  
  ![Formulário](https://github.com/JessanyKaline/form-react-express/blob/main/images/tela.png)
  

### **Validations:**

1. **Name:**
   - The name cannot contain numeric characters.
   - If the email is valid, the name should be accepted.
  
2. **Email:**
   - The email field should be validated to ensure the entered email is in the correct format.
   - If the email already exists in the database, the user should be notified that the email is taken.

3. **CEP:**
   - The CEP field must contain only numbers and be formatted as `XXXXX-XXX`.

### **Optional Features:**

1. **Data Listing:**
   - After submitting the form, a list of all registered users will be displayed below the form, showing their name, email, and CEP.

2. **Edit Functionality:**
   - Users should be able to click on any item in the list to pre-fill the form for editing purposes. Upon submission, the data should be updated.
     
![Edição](https://github.com/JessanyKaline/form-react-express/blob/main/images/edi%C3%A7%C3%A3o.png)

---

## Project Setup

### **Back-end Setup (API):**

Project Structure with Clean Architecture

```plaintext
src/
├── domain/
│   ├── entities/
│   │   └── user.entity.ts
│   └── repositories/
│       └── user.repository.ts
├── application/
│   ├── dtos/
│   │   └── user.dto.ts
│   └── useCases/
│       ├── create-user.UseCase.ts
│       ├── find-user-by-id.UseCase.ts
│       └── list-user-by-id.UseCase.ts
│       ├── list-users.UseCase.ts
│       └── update-user.UseCase.ts
├── infrastructure/
│   ├── database/
│   │   ├── database.config.ts
│   │   ├── user.repository.ts
│   │   └── migrations/
│   │       └── create-users-table.ts
│   └── http/
│       ├── user-controller.ts
│       ├── user-routes.ts
│       └── user-validator.ts
├── shared/
│   ├── errors/
│   │   └── app.error.ts
│   └── services/
│       └── cep.service.ts
├── index.ts
├── tsconfig.json
├── package.json
├── .env
├── docker-compose.yml
```


To get the back-end API running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JessanyKaline/form-react-express
   cd form-react-express/back
   ```

2. Set up the Docker PostgreSQL container:

Ensure Docker is installed. The project uses docker-compose to run PostgreSQL:
  ```bash
    docker-compose up -d
  ```

3. Install dependencies:

Install the necessary back-end dependencies:
  ```bash
    npm install
  ```

4. Run database migrations (if necessary):

If you need to run migrations to create the necessary database tables, use the following command:
  ```bash
    npm run migrate
  ```
5. Start the back-end server:

To start the back-end server in development mode (with hot-reloading), run:
  ```bash
    npm run dev
  ```
The back-end API will now be available at http://localhost:3030.

---

### **Front-end Setup (React Application):**

Project Structure

```plaintext
front/
├── src/
│   ├── components/
│   │   ├── Form/
│   │   │   ├── Form.styles.ts
│   │   │   ├── Form.tsx
│   │   └── UserList/
│   │   │   ├── UserList.styles.ts
│   │   │   ├── UserList.tsx
│   ├── services/
│   │   └── api.ts
│   ├── utils/
│   │   └── validations.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
```


After starting the back-end, follow these steps to set up the front-end React application:

1. Navigate to the front-end directory:
  ```bash
   cd form-react-express/front
  ```
2. Install front-end dependencies:

Run the following command to install the required dependencies:
  ```bash
  npm install
  ```
3. Start the front-end development server:

To start the React front-end application, run:
 ```bash
  npm start
  ```

The React application will be available at http://localhost:3000.

---
**Technologies Used:**
- Frontend: React, TypeScript, Axios
- Backend: Node.js, Express, PostgreSQL
- Database: PostgreSQL (Dockerized using docker-compose)
- Validation: Express-validator
- Development Tools: Nodemon, TypeScript, Ts-Node

