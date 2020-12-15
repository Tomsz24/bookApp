const books = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const booksList = document.querySelector('.books-list');

const renderFunction = () => {
  for (let book of dataSource.books) {
    const generateHTML = books(book);
    const oneBook = utils.createDOMFromHTML(generateHTML);
    booksList.appendChild(oneBook);
  }
};

renderFunction();

const favoriteBooks = [];

const initActions = () => {
  const booksImages = booksList.querySelectorAll('.book__image');
  booksImages.forEach(item => {
    item.addEventListener('dblclick', event => {
      event.preventDefault();
      const id = item.getAttribute('data-id');
      const index = favoriteBooks.indexOf(id);

      if (item.classList.contains('favorite')) {
        item.classList.remove('favorite');
        favoriteBooks.splice(index, 1);
      } else {
        item.classList.add('favorite');
        favoriteBooks.push(id);
      }
    });

  });

};

initActions();