import { Review } from './review.model';
import { GenericModel } from './generic.model';

export class Product extends GenericModel{
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
    super();
  }
}