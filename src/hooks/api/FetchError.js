export class FetchError extends Error {
  constructor(status, message, data) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.data = data; // Optionnal
  }
}
