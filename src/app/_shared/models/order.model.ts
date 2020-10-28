export class Order {
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
  client: {
    _id: string,
    name: string
  };
  store: string;


  constructor(){
  }
}

