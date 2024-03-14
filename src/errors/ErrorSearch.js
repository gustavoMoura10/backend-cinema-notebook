class ErrorSearch extends Error {
  constructor(message = "Item not found", status = 404) {
    super();
    this.message = message;
    this.status = status;
  }
}
export default ErrorSearch;
