function Book(title, author, pages, bookRead){
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
    const newBook = new Book(title, author, pages, bookRead);
    myLibrary.push(newBook);
    console.log(myLibrary);


}

addBookToLibrary('AI 2041','Chen Qiufan', 400, true);

