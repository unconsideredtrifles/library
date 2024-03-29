class Book {
    static readingStatuses = [
        "To Read",
        "Reading",
        "Finished",
    ];
    static nextBookIdx = 0;

    constructor(title, author, pages, readingStatusIdx) {
        this.bookIdx = Book.nextBookIdx;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readingStatusIdx = readingStatusIdx;
        this.readingStatus = Book.readingStatuses[readingStatusIdx - 1];
        Book.nextBookIdx++;
    }
}

let myLibrary = [
    new Book("Nexus Alpha", "Elamimax", 324, 2),
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
    if(ifInvalidInput(bookTitle, bookAuthor, pages, readingStatus)) {
        return;
    }

    let bookToAdd = new Book(bookTitle, bookAuthor, pages, readingStatus);
    myLibrary.push(bookToAdd);
    displayBook(bookToAdd);
}

function displayBook(book) {
    let cards = document.getElementById("card-wrapper");
    let bookCardTemplate = document.getElementById("book-card");
    let bookCard = bookCardTemplate.content.cloneNode(true);

    let deleteBtn = bookCard.querySelector(".delete-icon");
    deleteBtn.addEventListener("click", function(e) {
        let cardToDelete = this.parentElement;
        for(let i = 0; i < 3; i++) {
            cardToDelete = cardToDelete.parentElement;
        }
        cards.removeChild(cardToDelete);

        let dataBookIdx = cardToDelete.getAttribute("data-book-index");
        let bookIdxToDelete = Number(dataBookIdx.slice(5));
        myLibrary = myLibrary.filter(eachBook => (eachBook.bookIdx != bookIdxToDelete));
    })

    let readingStatusEditor = bookCard.querySelector(".reading-status-edit");
    readingStatusEditor.addEventListener("click", function() {
        let readingStatus = this.parentElement;
        let readingStatusIdx = +readingStatus.getAttribute("data-reading-status");
        readingStatusIdx = (readingStatusIdx === 3) ? 1 : (readingStatusIdx + 1);
        readingStatus.setAttribute("data-reading-status", readingStatusIdx);

        let currentBookCard = readingStatus.parentElement.parentElement.parentElement;
        let currentBookIdx = +currentBookCard.getAttribute("data-book-index").slice(5);
        let currentBook = myLibrary.find((eachBook) => {
            return eachBook.bookIdx === currentBookIdx;
        });

        currentBook.readingStatusIdx = readingStatusIdx;
        currentBook.readingStatus = Book.readingStatuses[readingStatusIdx - 1];

        let readingStatusText = readingStatus.getElementsByClassName("reading-status-text")[0];
        readingStatusText.textContent = currentBook.readingStatus;
    });

    let mainCard = bookCard.querySelector(".card");
    mainCard.setAttribute("data-book-index", `card-${book.bookIdx}`);
    let bookTitle = bookCard.querySelector(".book-title");
    bookTitle.textContent = book.title;
    let bookAuthor = bookCard.querySelector(".book-author");
    bookAuthor.textContent = book.author;
    let bookPages = bookCard.querySelector(".pages");
    bookPages.textContent = `${book.pages} pages`;
    let readingStatus = bookCard.querySelector(".status");
    readingStatus.setAttribute("data-reading-status", book.readingStatusIdx);
    let readingStatusText = readingStatus.getElementsByClassName("reading-status-text")[0];
    readingStatusText.textContent = book.readingStatus;

    cards.appendChild(bookCard);
}

function displayAllBooks() {
    myLibrary.forEach((eachBook) => {
        displayBook(eachBook);
    });
}

const addBookDialog = document.getElementById("add-book-dialog");
const bookAddForm = document.querySelector("#add-book-dialog > form");
const submitBookBtn = document.getElementById("submit-book-btn");
submitBookBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(!bookAddForm.checkValidity()) {
        bookAddForm.reportValidity();
        return;
    };

    let inputFields = document.getElementsByClassName("book-data-input");
    let bookTitle = inputFields[0].value;
    let bookAuthor = inputFields[1].value;
    let pages = document.getElementById("page-number-input");
    let readingStatus = document.getElementById("reading-status");
    let totalPages = pages.value;
    let readingStatusValue = readingStatus.value;

    inputFields[0].value = "";
    inputFields[1].value = "";
    pages.value = ""

    addBookToLibrary(bookTitle, bookAuthor, +totalPages, +readingStatusValue);
    addBookDialog.close();
});


const dialogOpenBtn = document.getElementById("add-book-btn");
dialogOpenBtn.addEventListener("click", () => {
    addBookDialog.showModal();
});

const dialogCloseBtn = document.getElementsByClassName("close-btn")[0];
dialogCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookDialog.close();
})

document.addEventListener("DOMContentLoaded", () => {
    displayAllBooks();
});