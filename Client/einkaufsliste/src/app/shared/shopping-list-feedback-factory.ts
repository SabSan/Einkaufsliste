import { Feedback } from "./feedback";

export class ShoppingListFeedbackFactory {

  static empty(): Feedback{
    return new Feedback(null,  '', 0, [], 0, new Date());
  }

  static fromObject(rawList: any) : Feedback {
    return new Feedback(
      rawList.id,
      rawList.body,
      rawList.user_id,
      rawList.user,
      rawList.shoppinglist_id,
      rawList.created_at
    )
  }

}
