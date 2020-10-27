export class Client {
  public orderDate: string;
  public orderStatus: string;
  public totalPrice: string;
  public paymentMethod: string;
  public products: [
    {
      _id: string,
      quantity: string
    }
  ];
  client: string;
  store: string;


  constructor(){
  }
}

