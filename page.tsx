"use client"; 

import React, { useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
}

const initialBooks: Book[] = [
    { id: 1, title: "Harry Potter", author: "J.K. Rowling", available: true },
    { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", available: true },
];

export default function Home() {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [editingBook, setEditingBook] = useState<Book | undefined>(undefined); 

    const addBook = (book: Omit<Book, "id" | "available">) => {
        setBooks([...books, { ...book, id: Date.now(), available: true }]);
    };

    const updateBook = (book: Omit<Book, "id" | "available">) => {
        if (editingBook) {
            setBooks(
                books.map((b) =>
                    b.id === editingBook.id
                        ? { ...editingBook, ...book }
                        : b
                )
            );
            setEditingBook(undefined);
        }
    };

    const deleteBook = (id: number) => {
        setBooks(books.filter((book) => book.id !== id));
    };

    return (
        <div>
            <h1>Book Manager</h1>
            <BookForm
                onSubmit={editingBook ? updateBook : addBook}
                initialData={editingBook} 
            />
            <BookList
                books={books}
                onDelete={deleteBook}
                onEdit={setEditingBook}
            />
        </div>
    );
}
