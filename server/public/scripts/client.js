$(document).ready(onReady);

function onReady() {
  console.log("hi. let's make a CRUD app.");
  getBooks();
  $('.submitButton').on('click', createBook);
  $('#catalog').on('click', '.deleteButton', deleteBook);
  $('#catalog').on('click', '.markAsUnavailableButton', markAsUnavailable);
  $('#catalog').on('click', '.markAsAvailableButton', markAsAvailable);
}

//function to take inputs and put them into an object
function createBook() {
  console.log('adding a book!');
  let newBook = $('#bookInput').val();
  let newAuthor = $('#authorInput').val();
  let newAvailability = $('#availabilityInput').val();

  let bookToSend = {
    book: newBook,
    author: newAuthor,
    availability: newAvailability
  };

  postBooks(bookToSend);
}

// function to display books
function getBooks() {
  console.log('in GET /books');
  $('#catalog').empty();
  $.ajax ({
    method: 'GET',
    url: `/books`
  }).then ((res) => {
    for (let book of res) {
      if (book.availability === 'Yes') {
        $('#catalog').append(`
          <tr class="bookAvailable">
            <td>${book.book}</td>
            <td>${book.author}</td>
            <td>${book.availability}</td>
            <td>
            <button data-id="${book.id}" type="button" class="btn btn-success markAsUnavailableButton">Unavailable</button>
            </td>
            <td>
            <button data-id="${book.id}" type="button" class="btn btn-danger deleteButton">Delete</button>
            </td>
          </tr>
        `)
      }
      else if (book.availability === 'No') {
        $('#catalog').append(`
        <tr class="bookUnavailable">
          <td>${book.book}</td>
          <td>${book.author}</td>
          <td>${book.availability}</td>
          <td>
          <button data-id="${book.id}" type="button" class="btn btn-success markAsAvailableButton">Available</button>
          </td>
          <td>
          <button data-id="${book.id}" type="button" class="btn btn-danger deleteButton">Delete</button>
          </td>
        </tr>
      `)
      }
    }
  }).catch((err) => {
    console.log('something broke in GET /books', err);
  })
}

//function to add books to DOM and database
function postBooks(newBook) {
  console.log('in POST /books', newBook);
  $.ajax({
    method: 'POST',
    url: `/books`, 
    data: newBook
  }).then ((res) => {
    console.log(res);
    getBooks();
    $('#bookInput').val('');
    $('#authorInput').val('');
    $('#availabilityInput').val('');
  }).catch((err) => {
    console.log('something broke in POST /books', err);
  })
}

//function to delete books from the DOM and database
function deleteBook() {
  console.log('deleting a book');
  let idToDelete = $(this).data().id;
  swal("Are you sure you want to delete this book?", {
    title: "Delete Book",
    icon: "warning",
    dangerMode: true,
    buttons: true,
  }).then((response) => {
    if (response === true){
        $.ajax ({
        method: 'DELETE',
        url: `/books/${idToDelete}`
        }).then ((res) => {
        getBooks();
        }).catch((err) => {
        console.log('error in DELETE /books/:id', err);
        })
    } 
  })
}

//function to update book status to unavailable
function markAsUnavailable() {
  console.log('book is not available');
  let idToUpdate = $(this).data().id;
  console.log(idToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/books/${idToUpdate}`,
    data: {
      availability: 'No',
    },
  }).then((res) => {
      getBooks();
    }).catch((err) => {
      console.log("Error in PUT /books/:id making unavailable", err);
    });
}

//function to update book status to available
function markAsAvailable() {
  console.log('book is available');
  let idToUpdate = $(this).data().id;
  console.log(idToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/books/${idToUpdate}`,
    data: {
      availability: 'Yes',
    },
  }).then((res) => {
      getBooks();
    }).catch((err) => {
      console.log("Error in PUT /books/:id making available", err);
    });
}
