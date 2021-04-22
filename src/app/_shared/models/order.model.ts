export class Order {
  public orderDate: string;
  public orderStatus: string;
  public totalPrice: string;
  public paymentMethod: string;
  public products: [
    {
      id: string,
      quantity: string
    }
  ];
  client: {
    id: string,
    name: string
  };
  store: string;


  constructor(){
  }
}

