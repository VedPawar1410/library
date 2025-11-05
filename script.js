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
    const submitBtn = document.querySelector(".btn");

    if(submitBtn){
        submitBtn.addEventListener("click", function(e) {
            e.preventDefault(); // stops page reload
    
            // Collect form data
            const title = document.getElementById("title").value.trim();
            const author = document.getElementById("author").value.trim();
            const pages = document.getElementById("pages").value.trim();
            const year = document.getElementById("year").value.trim();
            const bookRead = document.querySelector('input[name="bookRead"]:checked')?.value === "yes";

    
            // Pass to your function
            addBookToLibrary(title, author, pages, year, bookRead);
    
            // Clear the form (optional)
            e.target.reset();
    });
}
}


if (document.body.classList.contains("home-page")) {
    // run code for home page
}

//removing duplicates

//adding books
addBookToLibrary('AI 2041','Chen Quifan', 400, true);
addBookToLibrary('Three body problem','Que Fan',345,false);
addBookToLibrary('Investing','Zerodha',111,true);

displayLibrary()