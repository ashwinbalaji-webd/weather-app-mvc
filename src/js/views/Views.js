export default class View {
  _data;

  render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML("afterBegin", markup);
  }

  update(data) {
    this._data = data;
  }

  renderSpinner() {
    const markup = 'loading...'
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage() {}

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
