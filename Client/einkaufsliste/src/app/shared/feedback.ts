import {User} from "./user";

export class Feedback {

  constructor(
    public id: number,
    public body: string,
    public user_id: number,
    public user: User[],
    public shoppinglist_id: number,
    public created_at: Date) {}

}
