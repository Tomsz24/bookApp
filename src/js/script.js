class BooksList {
  constructor() {
    this.getElements();
    this.initData();
    this.initActions();
    this.determineRatingBgc();
  }

  initData() {
    for (let book of this.data) {
      const generateHTML = this.booksTemplate(book);
      this.book = utils.createDOMFromHTML(generateHTML);
      this.booksList.appendChild(this.book);
    }
  }

  getElements() {
    this.data = dataSource.books;
    this.favoriteBooks = [];
    this.filtersArray = [];
    this.booksList = document.querySelector('.books-list');
    this.booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  }

  initActions() {
    this.booksList.addEventListener('dblclick', event => {
      event.preventDefault();
      const id = event.target.getAttribute('data-id');
      const index = this.favoriteBooks.indexOf(id);

      if (event.target.classList.contains('favorite')) {
        event.target.classList.remove('favorite');
        this.favoriteBooks.splice(index, 1);
      } else {
        event.target.classList.add('favorite');
        this.favoriteBooks.push(id);
      }
      console.log(this.favoriteBooks);
    });

    const filters = document.querySelector('.filters');
    filters.addEventListener('click', event => {
      if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
        if (event.target.checked) {
          this.filtersArray.push(event.target.value);
        } else {
          const index = this.filtersArray.indexOf(event.target.value);
          this.filtersArray.splice(index, 1);
        }
        this.filterBooks();
      }
    });
  }

  filterBooks() {
    for (const book of this.data) {
      let shloudBeHidden = false;

      for (const filter of this.filtersArray) {
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
  }

  determineRatingBgc() {
    for (const book of this.data) {
      const htmlBook = document.querySelector(`.book__rating__fill[data-id="${book.id}"`);
      htmlBook.style.width = `${book.rating * 10}%`;
      if (book.rating < 6) {
        htmlBook.style.background = `linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)`;
      } else if (book.rating > 6 && book.rating <= 8) {
        htmlBook.style.background = `linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)`;
      } else if (book.rating > 8 && book.rating <= 9) {
        htmlBook.style.background = `linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)`;
      } else {
        htmlBook.style.background = `linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)`;
      }
    }
  }
}

const app = new BooksList();
console.log(app);