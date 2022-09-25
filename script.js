let myLibrary = [
    {
      title: "48 Laws of Power",
      author: "Robert Greene",
      pages: 480,
      read: "Yes"
    },
    {
      title: "The Prince",
      author: "Niccolò Machiavelli",
      pages: 126,
      read: "No"
    },
    { title: "Mastery", author: "Robert Greene", pages: 353, read: "Yes" },
    { title: "The Art of War", author: "Sun Tzu", pages: 256, read: "Yes" }
  ];
  
  let titleBox = document.getElementById("title");
  let authorBox = document.getElementById("author");
  let pageBox = document.getElementById("pages");
  let submit = document.getElementById("submit");
  let library = document.getElementById("library");
  let displayLibrary = document.getElementById("displayLibrary");
  
  const makeChangeStatusSet = function () {
    let statusSetClassesAndInnerHTML = [
      "readStatusChange",
      ["yes", "no", "n/a"],
      ["Yes", "No", "N/A"]
    ];
    let statusSetFragment = document.createDocumentFragment();
    for (let x = 0; x < statusSetClassesAndInnerHTML.length; x++) {
      let statusSet = document.createElement("button");
      statusSet.classList.add(
        statusSetClassesAndInnerHTML[0],
        statusSetClassesAndInnerHTML[1][x]
      );
      statusSet.innerHTML = statusSetClassesAndInnerHTML[2][x];
  
      let statusSetApplication = function (x) {
        x.addEventListener(
          "click",
          function (e) {
            let switchRow = e.currentTarget.parentNode.parentNode;
            let rowStatusCell = switchRow.getElementsByClassName("readStatus")[0];
            let book = myLibrary[switchRow.id];
            if (x.innerHTML === "Yes") {
              rowStatusCell.innerHTML = "Yes";
              book.read = "Yes";
              console.log(switchRow, rowStatusCell, book);
            }
            if (x.innerHTML === "No") {
              rowStatusCell.innerHTML = "No";
              book.read = "No";
              console.log(switchRow, rowStatusCell, book);
            }
            if (x.innerHTML === "N/A") {
              rowStatusCell.innerHTML = "N/A";
              book.read = "N/A";
              console.log(switchRow, rowStatusCell, book);
            }
          },
          false
        );
      };
      statusSetApplication(statusSet);
      statusSetFragment.appendChild(statusSet);
    }
    return statusSetFragment;
  };
  
  const makeDelete = function () {
    let newDelete = document.createElement("button");
    newDelete.setAttribute("type", "button");
    newDelete.classList.add("delete");
    newDelete.innerHTML = "Delete";
    newDelete.addEventListener(
      "click",
      function (e) {
        e.currentTarget.parentNode.parentNode.remove();
      },
      false
    );
    return newDelete;
  };
  
  const makeBookRow = function (book) {
    let newTableRow = document.createElement("tr");
  
    let newTitleCell = document.createElement("td");
    newTitleCell.setAttribute("class", "title");
    newTitleCell.innerHTML = book.title;
  
    let newAuthorCell = document.createElement("td");
    newAuthorCell.setAttribute("class", "author");
    newAuthorCell.innerHTML = book.author;
  
    let newPagesCell = document.createElement("td");
    newPagesCell.setAttribute("class", "pages");
    newPagesCell.innerHTML = book.pages;
  
    let newReadStatusCell = document.createElement("td");
    newReadStatusCell.setAttribute("class", "readStatus");
    newReadStatusCell.innerHTML = book.read;
  
    let newChangeStatusCell = document.createElement("td");
    newChangeStatusCell.setAttribute("class", "changeStatus");
    newChangeStatusCell.appendChild(makeChangeStatusSet());
  
    let newDeleteCell = document.createElement("td");
    newDeleteCell.setAttribute("class", "deleteCell");
    newDeleteCell.appendChild(makeDelete());
  
    newTableRow.append(
      newTitleCell,
      newAuthorCell,
      newPagesCell,
      newReadStatusCell,
      newChangeStatusCell,
      newDeleteCell
    );
  
    return newTableRow;
  };
  
  let libraryTable = function () {
    for (let i = 0; i < myLibrary.length; i++) {
      let currentBook = myLibrary[i];
      let currentLibraryRow = makeBookRow(currentBook);
      currentLibraryRow.setAttribute("id", i);
      library.append(currentLibraryRow);
    }
  };
  
  libraryTable();
  
  function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      let info = title + " by " + author + ", " + pages + " pages, ";
      if (this.read === "Yes") {
        return info + "read";
      } else if (this.read === "No") {
        return info + "not read yet";
      } else if (this.read === "N/A") {
        return info + "Read Status Unavailable";
      }
    };
  }
  
  let inputReset = function () {
    titleBox.value = "";
    authorBox.value = "";
    pageBox.value = "";
    document.getElementById("n/a").checked = true;
  };
  
  submit.onclick = function () {
    if (titleBox.value && authorBox.value && pageBox.value !== "") {
      let readStatus = document.getElementsByName("readStatus");
      let selectedStatus = Array.from(readStatus).find((radio) => radio.checked);
      myLibrary.push(
        new Book(
          titleBox.value,
          authorBox.value,
          pageBox.value,
          selectedStatus.value
        )
      );
      let newBookIndex = myLibrary.length - 1;
      let newLibraryBookRow = makeBookRow(myLibrary[newBookIndex]);
      newLibraryBookRow.setAttribute("id", newBookIndex);
      library.append(newLibraryBookRow);
      inputReset();
      console.log(myLibrary);
      console.log(document.getElementById(newBookIndex));
    } else {
      window.alert(
        "Please fill out Title, Author, and Total Number of Pages in order to submit a new book to the library."
      );
    }
  };
  
  displayLibrary.onclick = function () {
    if (library.style.display === "none") {
      library.style.display = "block";
    } else {
      library.style.display = "none";
    }
  };
  
  // 3/10/22 Think about how to apply readStatus changes using prototype on book
  