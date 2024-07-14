# Bookmark Management API

This is a versatile backend REST API designed to manage users, books, and bookmarks. It supports storing the name of a book and the count of bookmarks for each book. For each bookmark, it stores the name of the bookmark and a link to the bookmark. A user can have multiple books, and each book can have multiple bookmarks. The API offers two levels of authentication: user-level and book-level, providing potential (feature yet to be added) for collaboration on books.

## Features

### User Endpoints
- **Show All Users**: `GET /api/users/all` - Retrieve a list of all users.
- **Create New User**: `POST /api/users/register` - Register a new user.
- **Login User**: `POST /api/users/login` - Authenticate a user.
- **Show Current User Info**: `GET /api/users/current` - Retrieve the authenticated user's info.

### Book Endpoints
- **Show All Books**: `GET /api/books/all` - Retrieve a list of all books for a user.
- **Create New Book**: `POST /api/books/create` - Create a new book for a user.
- **Show Current Book Info**: `GET /api/books/current` - Retrieve the info of a specific book.
- **Update Book**: `PUT /api/books/update/:id` - Update a specific book's details.
- **Delete Book**: `DELETE /api/books/delete/:bookId` - Delete a specific book.

### Bookmark Endpoints
- **Show All Bookmarks**: `GET /api/bookmarks` - Retrieve a list of all bookmarks for a book.
- **Create New Bookmark**: `POST /api/bookmarks` - Create a new bookmark for a book.
- **Show Current Bookmark Info**: `GET /api/bookmarks/current/:id` - Retrieve the info of a specific bookmark.
- **Update Bookmark**: `PUT /api/bookmarks/update/:id` - Update a specific bookmark's details.
- **Delete Bookmark**: `DELETE /api/bookmarks/delete/:id` - Delete a specific bookmark.

## Use Cases

### Browser Extension
The primary motivation for this project is to serve as a backend for a browser extension. This extension can store questions from different online judges in an organized manner using folders and bookmarks. The two levels of authentication provide a secure way to manage and collaborate on these resources.

### Collaboration on Books
Although not yet implemented, the API's design supports collaboration on books. This feature will allow multiple users to work on the same book, adding and managing bookmarks collaboratively.

### Educational Resource Management
Teachers and students can use this API to manage educational resources. Teachers can create books (representing courses or subjects) and bookmarks (representing chapters or topics) and share them with students.

### Personal Knowledge Management
Individuals can use this API to manage their own collection of resources. Books can represent different topics or projects, and bookmarks can store links to relevant articles, videos, or notes.