# BYTEBAZAAR

A full-stack e-commerce application built with React (TypeScript) frontend and Express.js backend, featuring Firebase authentication and XML-based data storage.

## 🚀 Features

### User Features

- **Authentication**: Firebase-based user registration and login with reCAPTCHA verification
- **Product Browsing**: Browse products by categories with pagination and filtering
- **Product Details**: View detailed product information with comprehensive tagging system
- **Shopping Cart**: Add products to cart, manage quantities, and view cart items
- **Order Management**: Place orders and track order status
- **Responsive Design**: Modern UI built with Tailwind CSS and DaisyUI

### Admin Features

- **User Management**: View and manage registered users
- **Product Management**: Add, edit, and delete products with image upload
- **Inventory Control**: Manage product stock and pricing
- **Category Management**: Organize products by categories

### Product Categories

- Laptops, Desktops, All-in-One PCs
- Mini PCs, Gaming PCs
- Hardware Components, Storage
- Peripherals (Keyboards, Mice, Monitors)
- Networking Equipment, Accessories
- Software, Speakers, Microphones

## 🛠️ Technology Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router DOM** for routing
- **Tailwind CSS** + **DaisyUI** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Firebase** for authentication
- **Axios** for HTTP requests
- **js-cookie** for cookie management

### Backend

- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **XML2JS** for XML parsing
- **Multer** for file uploads
- **UUID** for unique ID generation
- **CORS** for cross-origin requests
- **dotenv** for environment variables

### Data Storage

- **XML files** for data persistence:
  - `users.xml` - User accounts
  - `products.xml` - Product catalog with detailed tagging
  - `orders.xml` - Order history
  - `cart.xml` - Shopping cart data
  - `categories.xml` - Product categories

## 📁 Project Structure

```
e-commerce/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── admin/        # Admin-specific components
│   │   │   ├── common/       # Shared components
│   │   │   └── user/         # User-facing components
│   │   ├── pages/            # Page components
│   │   │   ├── admin/        # Admin dashboard pages
│   │   │   ├── auth/         # Authentication pages
│   │   │   └── user/         # User pages
│   │   ├── layouts/          # Layout components
│   │   ├── routes/           # Route protection components
│   │   ├── config/           # Configuration files
│   │   ├── context/          # React context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/            # Utility functions
│   └── public/               # Static assets
└── backend/                  # Express.js backend
    ├── src/
    │   ├── controllers/      # Request handlers
    │   ├── routes/           # API route definitions
    │   ├── middlewares/      # Express middlewares
    │   ├── utils/            # Utility functions
    │   ├── xml/              # XML data files
    │   └── images/           # Uploaded product images
    └── dist/                 # Compiled JavaScript files
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Firebase project setup

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   cd frontend
   pnpm install

   # Install backend dependencies
   cd ../backend
   pnpm install
   ```

3. **Environment Setup**

   Create a `.env` file in the backend directory:

   ```env
   PORT=3000
   # Add any additional environment variables
   ```

   Update Firebase configuration in `frontend/src/config/firebase.ts` with your Firebase project credentials.

4. **Start the development servers**

   **Backend:**

   ```bash
   cd backend
   pnpm dev
   ```

   Server will run on `http://localhost:3000`

   **Frontend:**

   ```bash
   cd frontend
   pnpm dev
   ```

   Application will run on `http://localhost:5173`

### Production Build

**Frontend:**

```bash
cd frontend
pnpm build
```

**Backend:**

```bash
cd backend
pnpm build
pnpm start
```

## 🔐 Authentication & Authorization

- **Firebase Authentication** for user management
- **Role-based access control**: Users with `@admin.com` email domain have admin privileges
- **Protected routes** for authenticated users and admin-only sections
- **Token-based authentication** with cookie storage (30-day expiration)

## 📊 Data Management

The application uses XML files for data persistence:

- **Products**: Comprehensive product information with detailed tagging system for connectivity, usage, features, and miscellaneous attributes
- **Users**: User account information linked with Firebase authentication
- **Orders**: Order history with item details and status tracking
- **Cart**: Shopping cart management per user
- **Categories**: Product categorization system

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Components**: DaisyUI component library for consistent design
- **Animations**: Framer Motion for smooth page transitions
- **Loading States**: Comprehensive loading indicators
- **Error Handling**: User-friendly error messages and validation
- **Accessibility**: Screen reader friendly components

## 🔧 Development Features

- **TypeScript**: Full type safety across frontend and backend
- **ESLint**: Code linting and formatting
- **Hot Reload**: Development servers with hot module replacement
- **Lazy Loading**: Code splitting for optimal performance
- **File Upload**: Multer middleware for product image uploads

## 📝 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Add new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart

- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove item from cart

### Orders

- `GET /api/orders/:userId` - Get user's orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

### Users

- `GET /api/users` - Get all users (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🐛 Known Issues

- XML-based storage may not be suitable for high-traffic production environments
- Consider migrating to a proper database (MongoDB, PostgreSQL) for production use

## 🚀 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Payment gateway integration (PayPal/Stripe)
- Email notifications for orders
- Product reviews and ratings
- Wishlist functionality
- Advanced search and filtering
- Real-time inventory updates
- Analytics dashboard for admin

---

For more information or support, please open an issue in the repository.
