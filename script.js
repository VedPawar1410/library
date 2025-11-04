function Book(title, author, pages, bookRead){
    this.title = 'Harry Potter and the Philosopher\'s Stone';
    this.author = 'J. K. Rowling';
    this.pages = 493;
    this.bookRead = false;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.bookRead}`
    }
}


function addBookToLibrary(title, author, pages, bookRead) {
    // take params, create a book then store it in the array
    const newBook = new Book(title, author, pages, bookRead);
    myLibrary.push(newBook);
    console.log(myLibrary);

}


