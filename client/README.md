# Frontend

This is the frontend part of a simple web application. It allows users to sign up, log in, view their dashboard, send and receive payments, view transaction history, and manage their profile. The application is built using Typescript, React with Next.js and styled using Material UI components.

## Technologies Used:

- **Framework:** React with Next.js
- **Language:** TypeScript
- **Styling:** Material UI for components and styling
- **User Authentication:** Firebase Authentication
- **API Integration:** Chimoney API for wallet creation, sending and receiving payments
- **Deployment:** Vercel

## Features:

### User Authentication:

- Users can sign up securely using their full name, email, and password through Firebase Authentication.
- Upon signup, a wallet (Chimoney subaccount) is automatically created for the user through the Chimoney API.
- Users can log in securely using their email and password.

### Dashboard:

- The dashboard page displays the user's account balance and recent transactions.
- Users can perform actions such as sending and receiving payments directly from the dashboard.

### Send Payment:

- Users can send payments by providing the recipient's email or Chimoney user ID and specifying the amount to send.
- Payments are made securely using the Chimoney API.

### Receive Payment:

- Users can receive payments from other users, which are reflected in their account balance and transaction history.
- Payments can be received via email or phone number, powered by Chimoney.

### Transaction History:

- The transaction history page displays all user transactions in batches of 20, including details such as transaction date, type (sent or received), amount, and recipient/sender information.
- Transactions are fetched securely using the Chimoney API.

### Profile Management:

- Users can view their simple profile information on the profile page.
- Profile details may include the user's name and email.

### Security:

- Sensitive user data, such as passwords and payment information, is stored securely and encrypted.
- Necessary security measures are implemented to prevent common vulnerabilities such as XSS and CSRF attacks.

## Getting Started:

To run this frontend application locally or contribute to its development, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the `client` directory.
3. Install dependencies by running `npm install`.
4. Create a `.env.local` file and add necessary environment variables (e.g., Firebase configuration).
5. Run the development server by running `npm run dev`.