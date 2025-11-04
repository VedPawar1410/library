function Book(id, title, author, pages, bookRead){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.bookRead = bookRead;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.bookRead}`
    }
}

let myLibrary = [];
function addBookToLibrary(title, author, pages, bookRead) {
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

    const newBook = new Book(id, title, author, pages, bookRead);
    myLibrary.push(newBook);
    console.log(myLibrary);
}

function displayLibrary() {
    myLibrary.forEach(book => {
        console.log(book.info());
    });
}