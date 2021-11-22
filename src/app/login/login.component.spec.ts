import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
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

  it('Button label via jasmine.done', (done) => {
    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('a').textContent).toBe('Login');
    let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('a').textContent).toBe('Logout');
      done();
    });
  });

  it('Button label via waitForAsync() and whenStable()', waitForAsync(() => {
    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('a').textContent).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('a').textContent).toBe('Logout');
    });
    component.ngOnInit();
  }));


  it('button label via fakeAsync() and tick()', fakeAsync(() => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a').textContent).toBe('');
    fixture.detectChanges();
    expect(compiled.querySelector('a').textContent).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    tick();

    fixture.detectChanges();
    expect(compiled.querySelector('a').textContent).toBe('Logout');
  }));
});