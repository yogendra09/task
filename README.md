# API Documentation

## Overview
This API supports user management, product management, cart functionality, and order processing.

**BASE URL**: `http://localhost:4000/api`

- **User Endpoint**: `/user`
- **Order Endpoint**: `/order`
- **Product Endpoint**: `/product`

---

## User Routes

### POST /
- **Description**: Fetch the current authenticated user.
- **Middleware**: `isAuthenticated`
- **Controller**: `userController.currentUser`

### GET /getallusers
- **Description**: Retrieve all registered users.
- **Middleware**: `isAuthenticated`
- **Controller**: `userController.getAllUsers`

### POST /register
- **Description**: Register a new user.
- **Controller**: `userController.register`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "password": "string"
  }
  ```

### POST /login
- **Description**: Log in a user.
- **Controller**: `userController.login`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### POST /logout
- **Description**: Log out the current user.
- **Middleware**: `isAuthenticated`
- **Controller**: `userController.logout`

### GET /getmyorders
- **Description**: Retrieve the authenticated user's orders.
- **Middleware**: `isAuthenticated`
- **Controller**: `userController.getMyOrders`

### POST /placeorder
- **Description**: Place a new order.
- **Middleware**: `isAuthenticated`
- **Controller**: `userController.placeOrder`
- **Request Body**:
  ```json
  {
    "items": [
      {
        "productId": "string",
        "quantity": "number"
      }
    ],
    "totalAmount": "number",
    "shippingAddress": {
      "street": "string",
      "city": "string",
      "state": "string",
      "postalCode": "string"
    },
    "paymentMethod": "string"
  }
  ```

---

## Product Routes

### GET /getallproducts
- **Description**: Fetch all products with pagination.
- **Controller**: `getAllProductsWithPagination`

### POST /addupdateproduct
- **Description**: Add or update a product.
- **Middleware**: `isAuthenticated`, `isAdmin`
- **Controller**: `addUpdateProduct`
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "category": "string",
    "imageUrl": "string"
  }
  ```

### POST /deleteproduct
- **Description**: Delete a product.
- **Middleware**: `isAuthenticated`, `isAdmin`
- **Controller**: `deleteProduct`
- **Request parmas**:
  ```json
  {
    "productId": "string"
  }
  ```

---

## Cart Routes

### GET /getcartproducts
- **Description**: Retrieve all products in the authenticated user's cart.
- **Middleware**: `isAuthenticated`
- **Controller**: `getCartProducts`

### POST /addproducttocart/:productId
- **Description**: Add a product to the user's cart.
- **Middleware**: `isAuthenticated`
- **Controller**: `addProductToCart`

  ```

### POST /removeproductfromcart/:productId
- **Description**: Remove a product from the user's cart.
- **Middleware**: `isAuthenticated`
- **Controller**: `removeProductFromCart`

---

## Order Routes

### GET /getallorders
- **Description**: Retrieve all orders.
- **Middleware**: `isAuthenticated`, `isAdmin`
- **Controller**: `orderController.getAllOrders`

### PUT /updateorder/:id
- **Description**: Update the status of an order.
- **Middleware**: `isAuthenticated`, `isAdmin`
- **Controller**: `orderController.updateOrder`

