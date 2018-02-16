export default class Api {
  private static baseEndpoint: string = 'https://animalates.innoveddemo.co.uk/eportfolio/';

  static Login(email: string, password: string): Promise<Object> {

    let dummylogin: string = 'innovedadmin';
    let dummypassw: string = 'innoved123';

    console.log('about to login (fetch)');
    return fetch(this.baseEndpoint + 'login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: dummylogin,
        password: dummypassw
      })
    });
  }
}