let book = [];

function add(add) {
    add.preventDefault();
    const bookTitle = document.querySelector("#inputBookTitle"),
        bookAuthor = document.querySelector("#inputBookAuthor"),
        bookYear = document.querySelector("#inputBookYear"),
        bookIsComplete = document.querySelector("#inputBookIsComplete"),
        storage = {
            id: +new Date(),
            title: bookTitle.value,
            author: bookAuthor.value,
            year: bookYear.value,
            isComplete: bookIsComplete.checked,
        };
    console.log(storage),
        book.push(storage),
        document.dispatchEvent(new Event("bookChanged"));
}

function bookTitle(add) {
    add.preventDefault();
    const bookTitle = document.querySelector("#searchBookTitle");
    (query = bookTitle.value),
    query
        ?
        storage(
            book.filter(function (book) {
                return book.title.toLowerCase().includes(query.toLowerCase());
            })
        ) :
        storage(book);
}

function bookAuthor(add) {
    const bookTitle = Number(add.target.id),
        bookAuthor = book.findIndex(function (book) {
            return book.id === bookTitle;
        }); -
    1 !== bookAuthor &&
        ((book[bookAuthor] = {
                ...book[bookAuthor],
                isComplete: !0
            }),
            document.dispatchEvent(new Event("bookChanged")));
}

function bookYear(add) {
    const bookTitle = Number(add.target.id),
        bookAuthor = book.findIndex(function (book) {
            return book.id === bookTitle;
        }); -
    1 !== bookAuthor &&
        ((book[bookAuthor] = {
                ...book[bookAuthor],
                isComplete: !1
            }),
            document.dispatchEvent(new Event("bookChanged")));
}

function bookIsComplete(add) {
    const bookTitle = Number(add.target.id),
        bookAuthor = book.findIndex(function (book) {
            return book.id === bookTitle;
        }); -
    1 !== bookAuthor &&
        (book.splice(bookAuthor, 1),
            document.dispatchEvent(new Event("bookChanged")));
}

function storage(book) {
    const add = document.querySelector("#incompleteBookshelfList"),
        bookTitle = document.querySelector("#completeBookshelfList");
    (add.innerHTML = ""), (bookTitle.innerHTML = "");
    for (const storage of book) {
        const book = document.createElement("article");
        book.classList.add("book_item");
        const search = document.createElement("h2");
        search.innerText = storage.title;
        const u = document.createElement("p");
        u.innerText = "Penulis: " + storage.author;
        const r = document.createElement("p");
        if (
            ((r.innerText = "Tahun: " + storage.year),
                book.appendChild(search),
                book.appendChild(u),
                book.appendChild(r),
                storage.isComplete)
        ) {
            const add = document.createElement("div");
            add.classList.add("action");
            const bookAuthor = document.createElement("button");
            (bookAuthor.id = storage.id),
            (bookAuthor.innerText = "Belum Selesai dibaca"),
            bookAuthor.classList.add("green"),
                bookAuthor.addEventListener("click", bookYear);
            const search = document.createElement("button");
            (search.id = storage.id),
            (search.innerText = "Hapus buku"),
            search.classList.add("red"),
                search.addEventListener("click", bookIsComplete),
                add.appendChild(bookAuthor),
                add.appendChild(search),
                book.appendChild(add),
                bookTitle.appendChild(book);
        } else {
            const bookTitle = document.createElement("div");
            bookTitle.classList.add("action");
            const bookYear = document.createElement("button");
            (bookYear.id = storage.id),
            (bookYear.innerText = "Selesai dibaca"),
            bookYear.classList.add("green"),
                bookYear.addEventListener("click", bookAuthor);
            const search = document.createElement("button");
            (search.id = storage.id),
            (search.innerText = "Hapus buku"),
            search.classList.add("red"),
                search.addEventListener("click", bookIsComplete),
                bookTitle.appendChild(bookYear),
                bookTitle.appendChild(search),
                book.appendChild(bookTitle),
                add.appendChild(book);
        }
    }
}

function search() {
    !(function (book) {
        localStorage.setItem("books", JSON.stringify(book));
    })(book),
    storage(book);
}
window.addEventListener("load", function () {
    (book = JSON.parse(localStorage.getItem("books")) || []), storage(book);
    const bookAuthor = document.querySelector("#inputBook"),
        bookYear = document.querySelector("#searchBook");
    bookAuthor.addEventListener("submit", add),
        bookYear.addEventListener("submit", bookTitle),
        document.addEventListener("bookChanged", search);
});