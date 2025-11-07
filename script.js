// /localStorage allows you to store data in the user’s browser — it stays there even if the page reloads or changes.
let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

function Book(id, title, author, pages, year, bookRead){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.bookRead = bookRead;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, published in year${this.year}, Read the book: ${this.bookRead}`
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

    //Add prototype toggle function
    Book.prototype.toggleRead = function () {
        this.bookRead = !this.bookRead;
    };

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
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                <p><strong>Read:</strong> ${book.bookRead ? "Yes" : "No"}</p>

                <button class="remove-btn" data-id="${book.id}">Remove</button>
                <button class="toggle-btn" data-id="${book.id}">Toggle Read</button>
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