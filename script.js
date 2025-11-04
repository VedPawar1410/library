function Book(title, author, pages, bookRead){
    this.title = 'Harry Potter and the Philosopher\'s Stone';
    this.author = 'J. K. Rowling';
    this.pages = 493;
    this.bookRead = false;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.bookRead}`
    }
}
const myBook = new Book();
console.log(myBook.info());



