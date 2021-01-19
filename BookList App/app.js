 // Book Class : Represents a Book
 class Book{
     constructor(title, author, isbn){
         this.title= title;
         this.author = author;
         this.isbn = isbn;
     }
 }

 // UI class: handles UI tasks

 class UI {
     static displayBooks(){
         const books = store.getBooks();


         books.forEach((book)=>UI.addBookToList(book));
     }
     static addBookToList(book){
        var list = document.getElementById('book-list');

        var row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class="btn btn-danger btn-sm 
            delete">X</a></td>
        `;
        list.appendChild(row);
     }
     static deleteBook(el){
        if (el.classList.contains('delete'))
        {
            el.parentElement.parentElement.remove();
        }
     }

     static showAlert(msg, className)
     {
        var div = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(msg));

        var container = document.querySelector('.container');
        var form = document.getElementById('book-form');

        container.insertBefore(div, form);

        // vanish in 3 seconds 
        setTimeout(()=>document.querySelector('.alert').remove(), 1000);
     }
     
     static bookAdded(msg, className)
     {
        var div = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(msg));

        var container = document.querySelector('.container');
        var form = document.getElementById('book-form');

        container.insertBefore(div, form);

        // vanish in 3 seconds 
        setTimeout(()=>document.querySelector('.alert').remove(), 1000);
     }
     static clearFields(){
         document.getElementById('title').value='';
         document.getElementById('author').value='';
         document.getElementById('isbn').value='';
     }
 }


// Store Class: handles Storage
class store {
    static getBooks(){
        var books;
        if (localStorage.getItem('books')===null)
        {
            books=[];
        }
        else
        {
            books= JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        var books = store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        var books = store.getBooks();

        books.forEach((book, index)=>{
            if(book.isbn===isbn)
            {
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.getElementById('book-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    var title =document.getElementById('title').value;
    var author =document.getElementById('author').value;
    var isbn =document.getElementById('isbn').value;


    if (title==='' || author==='' || isbn==='')
    {
        UI.showAlert("Please Fill in all fields", 'danger');
    }
    else
    {
        var book = new Book(title, author, isbn);

        UI.addBookToList(book);

        //Add book to store
        store.addBook(book);

        UI.bookAdded("Book added To the list", 'success');
        
        UI.clearFields();
    }
    

});


// Event: Remove a Book
document.getElementById('book-list').addEventListener('click', (e)=>{
    UI.deleteBook(e.target);

    // remove from Store
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.bookAdded("Book Removed", 'success');
})