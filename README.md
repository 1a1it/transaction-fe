# Transaction Management System (Frontend)

This is the frontend application for the Transaction Management System, built using React, Redux, and React Router. It provides a user interface for managing transactions, including features like login, registration, viewing transactions, and updating transaction statuses.

---

## Features

- **Authentication:**

  - Login and registration functionality.
  - Protected routes accessible only after login.

- **Transaction Management:**

  - View all transactions.
  - Search for a transaction by ID.
  - Update transaction statuses.

- **Navigation:**
  - A responsive `Navbar` for navigating between protected routes.

---

## Tech Stack

- **Frontend Framework:** React
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **API Communication:** Axios

---

---

## Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd trans-fe
   npm i
   ```

## API Endpoints

The application communicates with the backend using the following API endpoints:

### Authentication

- Login: POST /auth/login

Request Body:

```json
{
  "email": "example@gmail.com",
  "password": "password123"
}
```


- Register: POST /transaction/auth/register

Request Body:

```json
{
  "name": "John Doe",
  "email": "example@gmail.com",
  "password": "password123"
}
```

- Transactions

1. Fetch All Transactions: 
> GET /transactions?page=<page-number>
2. Fetch Transaction by ID: 
> GET /transaction/collect/:collect_id
3. Update Transaction Status:
> POST /transactions/webhook/status-update


Protected Routes
The following routes are protected and require the user to be logged in:

1. /transactions - View all transactions.
2. /transaction/:id - Search for a transaction by ID.
3. /status - Update transaction status.
If the user is not authenticated, they will be redirected to the login page.

## Components
- Navbar
Displays navigation links for protected routes.
- Links:
1. All Transactions: /transactions
2. Transaction by ID: /transaction/:id
3. Transaction Status: /status
- ProtectedRoute
Ensures that only authenticated users can access protected routes.
Redirects unauthenticated users to the login page.
- Redux State Management
### Authentication (authSlice.js)
Manages user authentication state (token, user, status, error).
- Actions:
1. login: Handles user login.
2. register: Handles user registration.
###  Transactions (transactionSlice.js)
Manages transaction data (allTransactions, transactionByCollectId, updatedTransaction).
- Actions:
1. fetchTransactions: Fetches all transactions.
2. fetchTransactionByCollectId: Fetches a transaction by its collect_id.
3. updateTransactionStatus: Updates the status of a transaction.

### Additional 
1. Add pagination for the transactions list.
2. Implement search and filtering for transactions.
