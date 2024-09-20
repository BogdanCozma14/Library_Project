const myLibrary = [];
let booksNumber = 0;

function Book(author, title, pages, readStatus) {
    // the constructor for the book object
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
    // method for toggling the read status of the book
    Book.prototype.toggleReadStatus = function() {
        this.readStatus = this.readStatus === "Read" ? "Not read yet": "Read";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const addBookButton = document.querySelector("#newBook");
    const dialog = document.querySelector("#dialog");
    const closeDialogBtn = document.querySelector("#close");
    const addBookBtn = document.querySelector("#add");
    const booksContainer = document.querySelector(".books-container");
    addBookButton.addEventListener("click", () => {
        // Clear the input fields before showing the dialog
        dialog.querySelectorAll("input[type='text']").forEach(input => input.value = '');
        dialog.showModal();
    })
    addBookBtn.addEventListener("click", (e) => {
        // function for adding the element
        e.preventDefault();
        // capture input values
        const author = dialog.querySelector('input[type="text"]').value;
        const title = dialog.querySelectorAll('input[type="text"]')[1].value;
        const pages = dialog.querySelectorAll('input[type="text"]')[2].value;
        const readStatus = dialog.querySelector("select").value;
        const newBook = new Book(author, title, pages, readStatus);
        myLibrary.push(newBook);
        booksNumber ++;
        // update the library
        addBookToLibrary(booksContainer);
        // reseting the inputs values
        dialog.close();
    })
    closeDialogBtn.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
    });

})

function addBookToLibrary(container) {
    const i = booksNumber;
        const newBook = document.createElement("div");
        newBook.classList.add("book");
        const bookNumber = document.createElement("h1");
        bookNumber.innerText = `Book number ${i}`;
        bookNumber.classList.add("bookNumber");
        newBook.appendChild(bookNumber);
        // creating a button for deleting the book
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBook");
        deleteBtn.innerText = "Delete Book"
        newBook.appendChild(deleteBtn);
        // Author divs
        const author = document.createElement("h1");
        author.innerText = "Author: ";
        const authorName = document.createElement("h1");
        authorName.innerText = `${myLibrary[i-1].author}`;
        const authorDiv = document.createElement("div");
        authorDiv.appendChild(author);
        authorDiv.appendChild(authorName);
        // Title div
        const title = document.createElement("h1");
        title.innerText = "Title: ";
        const titleName = document.createElement("h1");
        titleName.innerText = `${myLibrary[i-1].title}`;
        const titleDiv = document.createElement("div");
        titleDiv.appendChild(title);
        titleDiv.appendChild(titleName);
        // number of pages
        const pages = document.createElement("h1");
        pages.innerText = "Number of pages: ";
        const nrPages = document.createElement("h1");
        nrPages.innerText = `${myLibrary[i-1].pages}`;
        const pagesDiv = document.createElement("div");
        pagesDiv.appendChild(pages);
        pagesDiv.appendChild(nrPages);
        // Read status
        const read = document.createElement("h1");
        read.innerText = "Read Status: ";
        const readStatus = document.createElement("h1");
        readStatus.innerText = `${myLibrary[i-1].readStatus}`;
        const readStatusDiv = document.createElement("div");
        readStatusDiv.appendChild(read); // Append the "Read Status: " header
        readStatusDiv.appendChild(readStatus); // Append the actual read status value
        // event listener for the delete button
        deleteBtn.addEventListener("click", ()=> {
            container.removeChild(newBook);
        })
        // toggle button
        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.classList.add("toggleReadStatus");
        toggleReadBtn.innerText = "Change Read Status";
        newBook.appendChild(toggleReadBtn);
        // adding the divs to newbook
        newBook.appendChild(authorDiv);
        newBook.appendChild(titleDiv);
        newBook.appendChild(pagesDiv);
        newBook.appendChild(readStatusDiv);
        // adding the newbook to the library container
        container.appendChild(newBook);
        // event listener for the toggle read status button
        toggleReadBtn.addEventListener("click", () => {
            // Capture the current book instance
            const bookInstance = myLibrary[i-1];
        
            // Ensure the book instance is valid before calling the method
            if (bookInstance) {
                bookInstance.toggleReadStatus();
                // Update the displayed read status
                readStatus.innerText = bookInstance.readStatus;
            }
        });
}
// addBookToLibrary();