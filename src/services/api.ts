export default class Api {
  private static baseEndpoint: string = 'https://animalates.innoveddemo.co.uk/eportfolio/';

  static Login(email: string, password: string): Promise<Object> {

    console.log('about to login (fetch) ', email, password);
    return fetch(this.baseEndpoint + 'login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    });
  }
}