export class Client {
  public firstname: string;
  public lastname: string;
  public email: string;
  public phoneNumber: string;
  public gender: string;
  public fullAddress: {
    street: string,
    houseNumber: string,
    city: string,
    state: string,
    zipCode: string
  };

  constructor() {
  }
}
