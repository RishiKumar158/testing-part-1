import { AuthService } from "./auth.service";

describe('AuthService', () => {
  let service: AuthService | null;

  beforeEach(() => {
    service = new AuthService();
  }); 

  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  });

  it('should return true from isAuthenticated when there is a token', () => {
    localStorage.setItem('token', '1234');
    service.isAuthenticated().then((authenticated) => {
      expect(authenticated).toBeTruthy();
    });
  });

  it('should return false from isAuthenticated when there is no token', () => {
    service.isAuthenticated().then((authenticated) => {
      expect(authenticated).toBeFalsy();
    })
  });
});