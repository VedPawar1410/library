function Book(title, author, pages, bookRead){
    this.title = 'Harry Potter and the Philosopher\'s Stone';
    this.author = 'J. K. Rowling';
    this.pages = 493;
    this.bookRead = 'Not read yet';

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.bookRead}`
    }
}
const myBook = new Book();
console.log(myBook.info());

//every object contains a prototype
if(Object.getPrototypeOf(myBook) === Book.prototype){
    console.log("Yes");
} // returns true

