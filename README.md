# HubSpot CRM Dashboard

## Project Idea

Create a simple CRM dashboard that allows users to authenticate with HubSpot, view their contacts, and add new contacts directly from our application.

## Project Overview

**Project Name**: HubSpot CRM Dashboard

### Technologies Used

- **Backend**: 
  - **NestJS**: Progressive Node.js framework for building efficient and scalable server-side applications.
  - **TypeORM**: ORM library that can run in Node.js and can be used with TypeScript.
  - **PostgreSQL**: Powerful, open-source relational database system (or any other SQL database).
  - **dotenv**: Zero-dependency module that loads environment variables from a `.env` file into `process.env`.

- **Frontend**: 
  - **React**: JavaScript library for building user interfaces.
  - **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
  - **Vite**: Fast build tool and development server for modern web projects.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/hubspot-crm-dashboard.git
   cd hubspot-crm-dashboard
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory and add your environment variables:
     ```
     HUBSPOT_CLIENT_ID=your_client_id
     HUBSPOT_CLIENT_SECRET=your_client_secret
     REDIRECT_URI=http://localhost:3000/auth/callback
     SCOPE=crm.objects.contacts.read
     ```
   - Start the backend server:
     ```bash
     npm run start
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

### Features

- **User Authentication**: Users can log in to their HubSpot accounts.
- **View Contacts**: Users can view their HubSpot contacts directly from the dashboard. --- in progress
- **Add New Contacts**: Users can add new contacts to their HubSpot account from the application. --- in progress

### Future Improvements

- Implement token storage in the backend for better security.
- Expand the user interface to include additional features based on HubSpot's API capabilities.
- Enhance error handling and user feedback mechanisms.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
