// /localStorage allows you to store data in the user’s browser — it stays there even if the page reloads or changes.
let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

class Book{
    constructor(id, title, author, pages, year, bookRead){
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.year = year;
        this.bookRead = bookRead;
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, published in year${this.year}, Read the book: ${this.bookRead}`
    }

     //Add prototype toggle function
    toggleRead(){
        this.bookRead = !this.bookRead;
    }
}


function addBookToLibrary(title, author, pages, year, bookRead) {
    // take params, create a book then store it in the array
    let id = crypto.randomUUID();

    // Check if book with same id OR same title+author exists
    const exists = myLibrary.some(book =>
        book.id === id ||
        (book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase())
    );
    if (exists) {
        console.log("This book already exists in the library!");
        return;
    }

    const newBook = new Book(id, title, author, pages, year, bookRead);
    myLibrary.push(newBook);

    //Save to localStorage
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    console.log("Book added:", newBook);
}

function displayLibrary() {
    myLibrary.forEach(book => {
        console.log(book.info());
    });
}

function removeDuplicates() {
    myLibrary = myLibrary.filter(
        (book, index, self) =>
            index === self.findIndex(
                b =>
                    b.title.toLowerCase() === book.title.toLowerCase() &&
                    b.author.toLowerCase() === book.author.toLowerCase()
            )
    );
}

// script.js
if (document.body.classList.contains("add-book-page")) {
    //Form submission collection
    const form = document.getElementById("bookForm");
    if (form) {
        form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const pages = document.getElementById("pages").value.trim();
        const year = document.getElementById("year").value.trim();
        const bookRead =
            document.querySelector('input[name="bookRead"]:checked')?.value === "yes";

        addBookToLibrary(title, author, pages, year, bookRead);
        form.reset();
        window.location.href = "storage.html"; // go to collection
    });
}
}

if (document.body.classList.contains("storage-page")) {
    const container = document.getElementById("libraryDisplay");


    // Load library and restore prototypes
    function loadLibrary() {
        const raw = JSON.parse(localStorage.getItem("myLibrary")) || [];
        // convert plain objects → Book instances
        raw.forEach(obj => Object.setPrototypeOf(obj, Book.prototype));
        return raw;
    }

    function saveLibrary(lib) {
        localStorage.setItem("myLibrary", JSON.stringify(lib));
    }

    function displayLibrary() {
        const myLibrary = loadLibrary();

        if (!myLibrary.length) {
            container.innerHTML = `<p class="no-info">No books added yet!</p>`;
            return;
        }

        container.innerHTML = "";

        myLibrary.forEach(book => {
            const div = document.createElement("div");
            div.classList.add("book");

            div.innerHTML = `
                <div class="book-spine"></div>
                <div class="read-badge ${book.bookRead ? 'read' : 'unread'}">
                    <i class="fas ${book.bookRead ? 'fa-check-circle' : 'fa-circle'}"></i>
                    <span>${book.bookRead ? 'Read' : 'Unread'}</span>
                </div>
                
                <div class="book-content">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author"><i class="fas fa-feather-alt"></i> ${book.author}</p>
                    
                    <div class="book-details">
                        <span class="detail-item">
                            <i class="fas fa-file-alt"></i> ${book.pages} pages
                        </span>
                        <span class="detail-item">
                            <i class="fas fa-calendar-alt"></i> ${book.year}
                        </span>
                    </div>
                </div>

                <div class="book-actions">
                    <button class="btn icon-btn toggle-btn" data-id="${book.id}" title="Toggle Read Status">
                        <i class="fas fa-book-reader"></i>
                    </button>
                    <button class="btn icon-btn remove-btn" data-id="${book.id}" title="Remove Book">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;

            container.appendChild(div);
        });
    }

    //Event delegation for buttons
    container.addEventListener("click", function (e) {
        const id = e.target.dataset.id;
        if (!id) return;

        let myLibrary = loadLibrary();

        // Remove book
        if (e.target.classList.contains("remove-btn")) {
            myLibrary = myLibrary.filter(book => book.id !== id);
            saveLibrary(myLibrary);
            displayLibrary();
        }

        // Toggle read status
        if (e.target.classList.contains("toggle-btn")) {
            const book = myLibrary.find(b => b.id === id);

            if (book) {
                book.toggleRead();
                saveLibrary(myLibrary);
                displayLibrary();
            }
        }
    });

    document.addEventListener("DOMContentLoaded", displayLibrary);
}

if (document.body.classList.contains("home-page")) {
    // run code for home page
}

/* //removing duplicates

//adding books
addBookToLibrary('AI 2041','Chen Quifan', 400, true);
addBookToLibrary('Three body problem','Que Fan',345,false);
addBookToLibrary('Investing','Zerodha',111,true);

displayLibrary() */