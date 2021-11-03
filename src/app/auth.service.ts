export class AuthService {

  loggedIn = false;

  isAuthenticated() { // take some time to finish, so:
    const promiseP = new Promise(
      (resolve, reject) => {
        setTimeout(() => { //faking that it takes time to authenticate
          resolve(this.loggedIn);
        }, 1000);
      }
    );
    return promiseP;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
