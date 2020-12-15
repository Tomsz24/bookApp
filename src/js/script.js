const books = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const booksList = document.querySelector('.books-list');
const favoriteBooks = [];

const renderFunction = () => {
  for (let book of dataSource.books) {
    const generateHTML = books(book);
    const oneBook = utils.createDOMFromHTML(generateHTML);
    booksList.appendChild(oneBook);
  }
};

renderFunction();

const initActions = () => {

  booksList.addEventListener('dblclick', event => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    const index = favoriteBooks.indexOf(id);

    if (event.target.classList.contains('favorite')) {
      event.target.classList.remove('favorite');
      favoriteBooks.splice(index, 1);
    } else {
      event.target.classList.add('favorite');
      favoriteBooks.push(id);
    }
  });
};

initActions();