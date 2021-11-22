import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthService } from "../services/auth.service";
import { LoginComponent } from "./login.component";

describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('needsLogin returns true when the user is not yet been authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    expect(component.needsLogin()).toBeTruthy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });

  it('needsLogin returns false when the user has been authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    expect(component.needsLogin()).toBeFalsy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });

  it('login button hidden when the user is authenticated', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a').textContent).toBe('');

    fixture.detectChanges();
    expect(compiled.querySelector('a').textContent).toBe('Login');

    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    expect(compiled.querySelector('a').textContent).toBe('Login');
    
    fixture.detectChanges();
    expect(compiled.querySelector('a').textContent).toBe('Logout');
  });
});