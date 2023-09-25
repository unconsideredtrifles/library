function Book(title, author, pages, readingStatusIdx) {
    let readingStatuses = [
        "To Read",
        "Reading",
        "Finished",
    ];
    this.bookIdx = this.nextBookIdx;
    Object.getPrototypeOf(this).nextBookIdx++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readingStatus = readingStatuses[readingStatusIdx - 1];
}
Book.prototype.nextBookIdx = 0;

const myLibrary = [
    new Book("Lord of the Mysteries", "爱潜水的乌贼", 1000, 1),
    new Book("Ryn of Avonside", "QuietValerie", 800, 2),
    new Book("Flowers in the Dungeon", "JAW (formerly JAK)", 120, 3),
];

function ifInvalidInput(...params) {

    return params.some((eachParam) => {
        let WhitespaceStr = (eachParam.length > 0 && eachParam.trim() === "");
        let EmptyStr = (eachParam === "");
        
        return (WhitespaceStr || EmptyStr);
    });
}

function addBookToLibrary(bookTitle, bookAuthor, pages, readingStatus) {
    // ask the book title and author (and maybe book-related questions in the future)
    // if the user presses cancel at any point, stop the prompting
    // if the user completes all question, put an alert that notifies a book has been added
    // if the user types in nothing and hits ok, ask them again.

    if(ifInvalidInput(bookTitle, bookAuthor, pages, readingStatus)) {
        return;
    }

    let bookToAdd = new Book(bookTitle, bookAuthor, pages, readingStatus);
    myLibrary.push(bookToAdd);
}

function displayBook(book) {
    let bookCardTemplate = document.getElementById("book-card");
    let bookCard = bookCardTemplate.content.cloneNode(true);

    let mainCard = bookCard.querySelector(".card");
    mainCard.setAttribute("data-book-index", `card-${book.bookIdx}`);
    let bookTitle = bookCard.querySelector(".book-title");
    bookTitle.textContent = book.title;
    let bookAuthor = bookCard.querySelector(".book-author");
    bookAuthor.textContent = book.author;

    let cards = document.getElementById("card-wrapper");
    cards.appendChild(bookCard);
}

function displayAllBooks() {
    myLibrary.forEach((eachBook) => {
        displayBook(eachBook);
    });
}

const addBookDialog = document.getElementById("add-book-dialog");
const submitBookBtn = document.getElementById("submit-book-btn");
submitBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputFields = document.getElementsByClassName("book-data-input");
    let bookTitle = inputFields[0].value;
    let bookAuthor = inputFields[1].value;
    let pages = document.getElementById("page-number-input").value;
    let readingStatus = document.getElementById("reading-status").value;

    inputFields[0].value = "";
    inputFields[1].value = "";

    addBookToLibrary(bookTitle, bookAuthor, pages, readingStatus);
    addBookDialog.close();
});


const dialogOpenBtn = document.getElementById("add-book-btn");
dialogOpenBtn.addEventListener("click", () => {
    addBookDialog.showModal();
});