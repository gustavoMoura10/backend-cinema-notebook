class HttpError extends Error {
  constructor(message = "Internal Server Error", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }
  response(resp) {
    return resp.status(this.status).json({ message: this.message });
  }
}
export default HttpError;
