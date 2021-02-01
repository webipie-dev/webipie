import {GenericModel} from './generic.model';

export class Store extends GenericModel{
  public name: string;
  public logo: string;
  public description: string;
  public creationDate: Date;
  public contact: {
    phoneNumber: number,
    email: string,
    facebookPage: string,
    instagramPage: string,
    location: string,
    _id: string
  };
  public template: {
    _id: string,
    name: string,
    header: {
      img: string,
      title: string,
      description: string,
      mainButton: string
    },
    font: {
      name: string,
      size: number,
      weight: string,
      alignment: string,
      bold: boolean,
      italic: boolean,
      uppercase: boolean
    },
    colorChart: string[]
  };
  constructor(){
    super();
  }
}
