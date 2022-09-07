let book = [];

function add(event) {
  event.preventDefault();
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

  book.push(storage), document.dispatchEvent(new Event("bookChanged"));

  (bookTitle.value = ""),
    (bookAuthor.value = ""),
    (bookYear.value = ""),
    (bookIsComplete.checked = false);
}

function bookEdit(bookInfo) {
  const bookFormInput = document.querySelector("#inputBook");

  const bookUpdate = document.getElementById("bookUpdate"),
    bookSubmit = document.getElementById("bookSubmit");
  (bookUpdate.style.display = "block"), (bookSubmit.style.display = "none");

  const bookTitle = document.querySelector("#inputBookTitle"),
    bookAuthor = document.querySelector("#inputBookAuthor"),
    bookYear = document.querySelector("#inputBookYear"),
    bookIsComplete = document.querySelector("#inputBookIsComplete");

  (bookTitle.value = bookInfo.title),
    (bookAuthor.value = bookInfo.author),
    (bookYear.value = bookInfo.year),
    bookInfo.isComplete == true
      ? (bookIsComplete.checked = true)
      : (bookIsComplete.checked = false);

  const storage = {
    id: bookInfo.id,
    title: bookTitle.value,
    author: bookAuthor.value,
    year: bookYear.value,
    isComplete: bookInfo.isComplete,
  };

  bookFormInput.removeEventListener("submit", add);

  bookFormInput.addEventListener("submit", function (e) {
    e.preventDefault();

    // let bookId = [];
    // book.forEach((item) => bookId.push(item.id));
    // console.log(bookId[0]);
    // console.log(bookInfo.id);
    // console.log(book);
    // console.log(storage);

    // if (bookId[0] == bookInfo.id) {
    //   return;
    // }

    // book.pop(storage), document.dispatchEvent(new Event("bookChanged"));
    // book.push(storage), document.dispatchEvent(new Event("bookChanged"));

    // form.setAttribute("id", "inputBook");
    (bookUpdate.style.display = "block"), (bookSubmit.style.display = "none");
  });
}

function searchBookTitle(event) {
  event.preventDefault();
  const searchTitle = document.querySelector("#searchBookTitle");
  (query = searchTitle.value),
    query
      ? storage(
          book.filter(function (book) {
            return book.title.toLowerCase().includes(query.toLowerCase());
          })
        )
      : storage(book);
}

function bookIsIncomplete(event) {
  const bookSelected = Number(event.target.id),
    books = book.findIndex(function (book) {
      return book.id === bookSelected;
    });
  -1 !== books &&
    ((book[books] = {
      ...book[books],
      isComplete: !0,
    }),
    document.dispatchEvent(new Event("bookChanged")));
}

function bookIsComplete(event) {
  const bookSelected = Number(event.target.id),
    books = book.findIndex(function (book) {
      return book.id === bookSelected;
    });
  -1 !== books &&
    ((book[books] = {
      ...book[books],
      isComplete: !1,
    }),
    document.dispatchEvent(new Event("bookChanged")));
}

function bookDelete(event) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const bookSelected = Number(event.target.id),
        books = book.findIndex(function (book) {
          return book.id === bookSelected;
        });
      -1 !== books &&
        (book.splice(books, 1),
        document.dispatchEvent(new Event("bookChanged")));
      Swal.fire("Deleted!", "Your book has been deleted.", "success");
    }
  });
}

function storage(book) {
  const incompleteList = document.querySelector("#incompleteBookshelfList"),
    completeList = document.querySelector("#completeBookshelfList");
  (incompleteList.innerHTML = ""), (completeList.innerHTML = "");
  for (const storage of book) {
    const book = document.createElement("article");
    book.classList.add("book_item");
    const title = document.createElement("h2");
    title.innerText = storage.title;
    const writer = document.createElement("p");
    writer.innerText = "Penulis: " + storage.author;
    const year = document.createElement("p");
    if (
      ((year.innerText = "Tahun: " + storage.year),
      book.appendChild(title),
      book.appendChild(writer),
      book.appendChild(year),
      storage.isComplete)
    ) {
      const beforeRead = document.createElement("div");
      beforeRead.classList.add("action");
      const beforeReadButton = document.createElement("button");
      (beforeReadButton.id = storage.id),
        (beforeReadButton.innerText = "Belum Selesai dibaca"),
        beforeReadButton.classList.add("green"),
        beforeReadButton.addEventListener("click", bookIsComplete);
      const deleteButton = document.createElement("button");
      (deleteButton.id = storage.id),
        (deleteButton.innerText = "Hapus buku"),
        deleteButton.classList.add("red"),
        deleteButton.addEventListener("click", bookDelete);
      // const edit = document.createElement("button");
      // (edit.id = storage.id),
      //   (edit.innerText = "Edit Buku"),
      //   edit.classList.add("yellow"),
      //   edit.addEventListener("click", function (e) {
      //     e.preventDefault();
      //     bookEdit(storage);
      //   }),
      beforeRead.appendChild(beforeReadButton),
        beforeRead.appendChild(deleteButton),
        book.appendChild(beforeRead),
        completeList.appendChild(book);
      // beforeRead.append(edit);
    } else {
      const afterRead = document.createElement("div");
      afterRead.classList.add("action");
      const afterReadButton = document.createElement("button");
      (afterReadButton.id = storage.id),
        (afterReadButton.innerText = "Selesai dibaca"),
        afterReadButton.classList.add("green"),
        afterReadButton.addEventListener("click", bookIsIncomplete);
      const deleteButton = document.createElement("button");
      (deleteButton.id = storage.id),
        (deleteButton.innerText = "Hapus buku"),
        deleteButton.classList.add("red"),
        deleteButton.addEventListener("click", bookDelete);
      // const edit = document.createElement("button");
      // (edit.id = storage.id),
      //   (edit.innerText = "Edit Buku"),
      //   edit.classList.add("yellow"),
      //   edit.addEventListener("click", function (e) {
      //     e.preventDefault();
      //     bookEdit(storage);
      //   }),
      afterRead.appendChild(afterReadButton),
        afterRead.appendChild(deleteButton),
        book.appendChild(afterRead),
        incompleteList.appendChild(book);
      // afterRead.append(edit);
    }
  }
}

function saveToLocalStorage() {
  !(function (book) {
    localStorage.setItem("books", JSON.stringify(book));
  })(book),
    storage(book);
}

window.addEventListener("load", function () {
  (book = JSON.parse(localStorage.getItem("books")) || []), storage(book);
  const bookFormInput = document.querySelector("#inputBook"),
    searchBook = document.querySelector("#searchBook");
  bookFormInput.addEventListener("submit", add),
    searchBook.addEventListener("submit", searchBookTitle),
    document.addEventListener("bookChanged", saveToLocalStorage);
});
