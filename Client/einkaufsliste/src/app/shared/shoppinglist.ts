import {User} from './user';
export {User} from './user';
import {Listentry} from './listentry';
import {Feedback} from "./feedback";
export {Listentry} from './listentry';

export class Shoppinglist {

  constructor(
    public id: number,
    public title: string,
    public bought_until: Date,
    public price: number,
    public creator_id: number,
    public creator: User[],
    public listentries: Listentry[],
    public helper_id?: number,
    public helper?: User[],
    public feedbacks?: Feedback[]

  ) {
  }

}
