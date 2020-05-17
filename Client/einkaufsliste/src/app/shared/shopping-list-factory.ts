import { Shoppinglist } from "./shoppinglist";

export class ShoppingListFactory {

  static empty(): Shoppinglist{
    return new Shoppinglist(null, '', new Date(), null, 0,
      [], [], 0, [], []);
  }

  static fromObject(rawList: any) : Shoppinglist {
    return new Shoppinglist(
      rawList.id,
      rawList.title,
      rawList.bought_until,
      //typeof(rawList.bought_until) === 'string' ? new Date(rawList.bought_until) : rawList.bought_until,
      rawList.price,
      rawList.creator_id,
      rawList.creator,
      rawList.listentries,
      rawList.helper_id,
      rawList.helper,
      rawList.feedbacks
    )
  }

}
