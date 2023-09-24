const myLibrary = [
    new Book("Lord of the Mysteries", "爱潜水的乌贼"),
    new Book("Ryn of Avonside", "QuietValerie"),
    new Book("Flowers in the Dungeon", "JAW (formerly JAK)"),
];

function Book(title, author) {
    this.title = title;
    this.author = author;
}


function ifInvalidInput(str) {
    let WhitespaceStr = (str.length > 0 && str.trim() === "");
    let EmptyStr = (str === "");
    
    return (WhitespaceStr || EmptyStr);
}

function addBookToLibrary(bookTitle, bookAuthor) {
    // ask the book title and author (and maybe book-related questions in the future)
    // if the user presses cancel at any point, stop the prompting
    // if the user completes all question, put an alert that notifies a book has been added
    // if the user types in nothing and hits ok, ask them again.

    if(ifInvalidInput(bookTitle) || ifInvalidInput(bookAuthor)) {
        return;
    }

    let bookToAdd = new Book(bookTitle, bookAuthor);
    myLibrary.push(bookToAdd);
}

function displayBook(book) {
    let bookCardTemplate = document.getElementById("book-card");
    let bookCard = bookCardTemplate.content.cloneNode(true);

    let bookTitle = bookCard.querySelector(".book-title");
    bookTitle.textContent = book.title;
    let bookAuthor = bookCard.querySelector(".book-author");
    bookAuthor.textContent = book.author;

    let cards = document.getElementById("card-wrapper");
    cards.appendChild(bookCard);
}

function displayAllBooks() {
    for(eachBook of myLibrary) {
        displayBook(eachBook);
    }
}

const addBookDialog = document.getElementById("add-book-dialog");
const submitBookBtn = document.getElementById("submit-book-btn");
submitBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputFields = document.getElementsByClassName("book-data-input");
    let bookTitle = inputFields[0].value;
    let bookAuthor = inputFields[1].value;

    inputFields[0].value = "";
    inputFields[1].value = "";

    addBookToLibrary(bookTitle, bookAuthor);
    addBookDialog.close();
});


const dialogOpenBtn = document.getElementById("add-book-btn");
dialogOpenBtn.addEventListener("click", () => {
    addBookDialog.showModal();
});