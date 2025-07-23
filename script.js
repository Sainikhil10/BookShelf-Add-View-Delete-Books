const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

let books = JSON.parse(localStorage.getItem('bookshelf')) || [];

function renderBooks() {
  bookList.innerHTML = '';
  books.forEach((book, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td><button class="delete-btn" onclick="deleteBook(${index})">Delete</button></td>
    `;

    bookList.appendChild(row);
  });
}

function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem('bookshelf', JSON.stringify(books));
  renderBooks();
}

bookForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  if (!title || !author) return alert('Please fill in all fields.');

  books.push({ title, author });
  localStorage.setItem('bookshelf', JSON.stringify(books));

  bookForm.reset();
  renderBooks();
});

window.onload = renderBooks;
