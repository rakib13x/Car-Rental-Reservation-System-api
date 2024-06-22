# Car Rental Reservation API

This API allows users to book cars and administrators to manage car information and charge users based on their return time. It is secured using JWT tokens with protected routes for both admin and user functionalities.

## Features

- **User Features:**
  - **Book a Car:** Users can browse available cars and make reservations.
  - **User Authentication:** Secure user authentication using JWT tokens.
  - **User Dashboard:** View current bookings and reservation details.

- **Admin Features:**
  - **Manage Cars:** Admins can add, update, and delete car information.
  - **Charge Users:** Admins can calculate charges based on the return time of cars.

## Technologies Used

- **Backend:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Authentication:** [JWT (JSON Web Tokens)](https://jwt.io/)
- **Deployment:** [Vercel](https://vercel.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your/repository.git
   cd repository
