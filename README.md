# Client

This folder contains the client-side code for the application. It includes all the components, styles, and assets used in the frontend of the application.

## Structure

- `public`: This directory contains static files that are served directly by the server.
- `src`: This directory contains the source code for the frontend of the application.

## Key Files

- `src/App.js`: This is the main component of the application. It sets up the routing for the application and wraps the application in any context providers.
- `src/index.js`: This is the entry point for the frontend of the application. It renders the `App` component into the root div in `index.html`.
- `src/components`: This directory contains all the React components used in the application.
- `src/assets`: This directory contains all the static assets like images and icons used in the application.
- `src/styles`: This directory contains all the CSS styles used in the application.

## Usage

To start the client-side application, navigate to the `client` directory in your terminal and run the following command:

```bash
npm start
```

# Config

This folder contains configuration files for the application. These files are used to set up and configure various aspects of the application, such as database connections, middleware, and environment variables.

## Files

- `db.js`: This file sets up the connection to the database. It uses Mongoose to connect to a MongoDB database.
- `env.js`: This file loads environment variables from a `.env` file and makes them available throughout the application.

## Usage

To use these configurations, import them into your file like so:

```javascript
import db from "./config/db.js";
import { PORT } from "./config/env.js";
```

# Controllers

This folder contains the controller files for the application. Controllers handle the business logic for different routes in the application.

## Files

- `categoryController.js`: This file contains the controller functions for the category routes. It includes functions for creating, reading, updating, and deleting categories.

## Usage

To use these controllers, import them into your route files like so:

```javascript
import {
  getCategory,
  createCategory,
} from "./controllers/categoryController.js";
```

# Helpers

This folder contains helper functions that are used throughout the application. These functions perform common tasks that are needed in multiple places in the code.

## Files

- `authHelper.js`: This file contains functions for hashing and comparing passwords. These functions are used when creating a new user and when logging in.

## Usage

To use these helpers, import them into your file like so:

```javascript
import { hashPassword, comparePassword } from "./helpers/authHelper.js";
```

# Middlewares

This folder contains middleware functions that are used in the application. Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.

## Files

- `authMiddleware.js`: This file contains middleware functions for authentication. These functions check if a user is authenticated before they can access certain routes.

## Usage

To use these middlewares, import them into your route files like so:

```javascript
import { isAuthenticated } from "./middlewares/authMiddleware.js";
```

You can then use the imported functions in your routes. For example:

```javascript
router.get("/profile", isAuthenticated, getProfile);
```

In the above example, isAuthenticated is a middleware function that checks if a user is authenticated. If the user is authenticated, getProfile is called. If the user is not authenticated, isAuthenticated sends a response to the client without calling getProfile.

# Models

This folder contains the data models for the application. Each file represents a different entity in the system and defines the schema for documents of that entity in the database.

## Files

- `categoryModel.js`: This file defines the schema for Category documents. Each Category has a `name` (which is required and must be unique) and a `slug` (which is converted to lowercase).

## Usage

To use these models, import them into your file like so:

```javascript
import Category from "./models/categoryModel.js";
```

# Routes

This folder contains the route files for the application. Each file defines the routes for a different part of the application.

## Files

- `categoryRoutes.js`: This file defines the routes for the category part of the application. It includes routes for creating, reading, updating, and deleting categories.
- `userRoutes.js`: This file defines the routes for user-related operations like registration, login, and profile management.
- `productRoutes.js`: This file defines the routes for product-related operations like creating, reading, updating, and deleting products.

## Usage

To use these routes, import them into your server file like so:

```javascript
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
```

You can then use the imported routes in your application. For example:

```javascript
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
```

In the above example, all routes defined in categoryRoutes are mounted on /api/categories, userRoutes on /api/users, and productRoutes on /api/products. So if categoryRoutes defines a GET route at /, you can access it at /api/categories.
