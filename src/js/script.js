const books = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const booksList = document.querySelector('.books-list');
const favoriteBooks = [];
const filtersArray = [];

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

  const filters = document.querySelector('.filters');
  filters.addEventListener('click', event => {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
      if (event.target.checked) {
        filtersArray.push(event.target.value);
      } else {
        const index = filtersArray.indexOf(event.target.value);
        filtersArray.splice(index, 1);
      }
      console.log(filtersArray);
      filterBooks();
    }
  });

  const filterBooks = () => {
    for (const book of dataSource.books) {
      let shloudBeHidden = false;

      for (const filter of filtersArray) {
        if (book.details[filter]) {
          shloudBeHidden = true;
          break;
        }
      }
      if (shloudBeHidden) {
        const madafaka = document.querySelector(`.book__image[data-id="${book.id}"`);
        madafaka.classList.add('hidden');
      } else {
        const madafaka = document.querySelector(`.book__image[data-id="${book.id}"`);
        madafaka.classList.remove('hidden');
      }

    }
  };
};

initActions();