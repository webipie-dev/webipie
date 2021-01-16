class DatabaseConnectionError{
  statusCode;

  constructor(code,message) {
    this.code = code;
    this.message = message
  }

  static BadRequest(msg) {
    return new DatabaseConnectionError(500, msg)

  }

}

module.exports = DatabaseConnectionError
