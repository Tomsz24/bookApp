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