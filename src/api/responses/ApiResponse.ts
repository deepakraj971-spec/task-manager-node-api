export class ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown;

  constructor(success: boolean, message?: string, data?: T, errors?: unknown) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }
}
