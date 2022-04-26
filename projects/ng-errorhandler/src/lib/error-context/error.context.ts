export class ErrorContext {
  constructor(errorCode: number, errorMessage: string) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
  name: string | undefined;
  time: number | undefined;
  url: string | undefined;
  status: number | undefined;
  errorCode: number;
  errorMessage: string;
  targetId: number | undefined;
  targetName: string | undefined;
}
