class ErrorUnauthorized extends Error {
  constructor(message = "Unauthorized Request", status = 401) {
    super();
    this.message = message;
    this.status = status;
  }
}
export default ErrorUnauthorized;
