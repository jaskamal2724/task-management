## User Dashboard

For viewing the user dashboard, go to `/dashboard` URL.

## Setup Instructions

After cloning the repo, create a `.env` file inside the `server` directory and add:

```env
MONGO_URI="your connection string of MongoDB"
JWT_SECRET="JWT SECRET"

Then create `.env` file inside client 

```env
VITE_BACKEND_URL="backend url"
