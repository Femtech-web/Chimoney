# Simple Web Application Backend

This backend part of the simple web application. It's built using Node.js with Express and TypeScript. The backend handles user authentication, integrates with Chimoney's API for sending and receiving payments, and implements necessary security measures to protect sensitive user data.

## Technologies Used:

- **Framework:** Node.js with Express
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma
- **Security Libraries/Middlewares:**
  - **hpp:** Prevents HTTP Parameter Pollution attacks by sanitizing query string parameters.
  - **xss-clean:** Prevents Cross-Site Scripting (XSS) attacks by sanitizing user input.
  - **morgan:** HTTP request logger middleware for logging incoming requests.
  - **helmet:** Sets various HTTP headers to secure Express apps.
  - **express-rate-limiter:** Rate limiting middleware for Express to prevent brute force attacks and DDoS attacks.
- **API Integration:** Chimoney API for sending and receiving payments

## Features:

### User Authentication:

- Users' authentication is handled securely using Firebase Authentication.
- User data such as email and password are stored securely in Firebase.

### Payment Integration:

- The backend integrates with Chimoney's API to facilitate sending and receiving payments.
- Calls to Chimoney's API are made securely to handle payment transactions.

### Security Measures:

- **XSS Prevention:** Utilizes the `xss-clean` middleware to sanitize user input and prevent XSS attacks.
- **HTTP Parameter Pollution Prevention:** Utilizes the `hpp` middleware to prevent HTTP Parameter Pollution attacks.
- **Request Logging:** Utilizes the `morgan` middleware for logging HTTP requests for monitoring and debugging purposes.
- **Helmet Security Headers:** Utilizes the `helmet` middleware to set various security HTTP headers to secure Express apps.
- **Rate Limiting:** Utilizes the `express-rate-limiter` middleware to implement rate limiting and prevent brute force attacks and DDoS attacks.

### Folder Structure:

- The folder structure is kept simple and organized to enhance code readability and maintainability.
- Code is structured in a modular way to improve reusability and scalability.
- Follows best practices to ensure robustness and reliability of the codebase.

## Security:

Sensitive user data such as passwords and payment information are stored securely and encrypted. Necessary security measures, including XSS prevention, HTTP parameter pollution prevention, request logging, helmet security headers, and rate limiting, are implemented to prevent common vulnerabilities and enhance the overall security of the application.

## API Integration:

Chimoney's API is integrated into the backend to facilitate sending and receiving payments. Refer to Chimoney's API documentation for details on endpoints and authentication methods.
