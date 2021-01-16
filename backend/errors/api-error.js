class ApiError{
  statusCode;

  constructor(code,message) {
    this.code = code;
    this.message = message
  }

  static BadRequest(msg) {
    return new ApiError(400, msg)

  }

  static NotFound(msg) {
    return new ApiError(404, msg)

  }
}

module.exports = ApiError
