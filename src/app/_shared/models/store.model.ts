import {GenericModel} from './generic.model';

export class Store extends GenericModel{
  public id: string;
  public url: string;
  public name: string;
  public logo: string;
  public about: string;
  public creationDate: Date;
  public contact: {
    phoneNumber: number,
    email: string,
    facebookPage: string,
    instagramPage: string,
    location: string,
    id: string
  };
  public template: {
    id: string,
    name: string,
    header: {
      img: string,
      title: string,
      description: string,
      mainButton: string
    },
    font: string,
    colorChart: {},
    fontOptions: string[],
    colorChartOptions: {}[]
  };
  constructor(){
    super();
  }
}
