import { Review } from './review.model';

export class Product {
  public name: string;
  public description: string;
  public price: string;
  public imgs: string[];
  public quantity: number;
  public store: string;
  public popular: boolean;
  public openReview: string;
  public reviews: Review[];

  constructor() {
  }
}