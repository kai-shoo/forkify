import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _errorMessage = 'No recipes found for your query! Please try again :3';
  _message = '';

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultesPerPage
    );

    if (curPage === 1 && numPage > 1) {
      return this._generateNextBtnMarkup();
    }

    if (curPage === numPage && numPage > 1) {
      return this._generatePrevBtnMarkup();
    }

    if (curPage < numPage) {
      return this._generatePrevBtnMarkup() + this._generateNextBtnMarkup();
    }

    return '';
  }

  _generateNextBtnMarkup() {
    return `
    <button data-goto="${
      this._data.page + 1
    }"  class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
  }

  _generatePrevBtnMarkup() {
    return `
    <button data-goto="${
      this._data.page - 1
    }"  class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>`;
  }
}

export default new PaginationView();
