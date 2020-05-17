export class ErrorMessage {

  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {
  }
}

export const ShoppingListFormErrorMessages = [
  new ErrorMessage( 'title' , 'required' , 'Die Liste muss einen Titel haben!' ),
  new ErrorMessage( 'bought_until' , 'required' , 'Bitte geben Sie ein Fälligkeitsdatum an' ),
  new ErrorMessage( 'description' , 'required' , 'Bitte geben Sie eine Beschreibung an' ),
  new ErrorMessage( 'amount' , 'required' , 'Bitte geben Sie eine Menge an' ),
  new ErrorMessage( 'max_price' , 'required' , 'Bitte geben Sie einen maximalen Preis an' )
];
