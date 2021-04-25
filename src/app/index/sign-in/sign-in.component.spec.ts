import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StoreOwner } from 'src/app/_shared/models/store_owner.model';
import { SignInComponent } from './sign-in.component';
import { AuthService } from '../../_shared/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHandler } from '@angular/common/http';
describe('SignInComponent', () => {
    let fixture: SignInComponent;
    let authServiceMock;
    let authMock;
    let routerMock;
    let routeMock;
    let storeServiceMock;

    beforeEach(() => {
        routerMock = {
            navigate: jest.fn()
        };
        fixture = new SignInComponent(
            authServiceMock,
            authMock,
            routerMock,
            routeMock,
            storeServiceMock
        );

    });

    describe('Setup the app', () => {
        describe('ngOnInit', () => {
            afterEach(() => {
                localStorage.removeItem('token');
            });

            it('should navigate to dashborad in case of token', () => {
                localStorage.setItem('token', '1234');
                fixture.ngOnInit();
                expect(routerMock.navigate).toBeCalled();
            });
        });
    });

    describe('signIn', () => {
        beforeEach(() => {
            authMock = {
                signIn: jest.fn(),
            };
        });

        it('should navigate to the confirmation page', fakeAsync(() => {
            const signInSpy = jest.spyOn( authMock, 'signIn' ).mockReturnValue(Promise.resolve(true));
            const storeOwner: StoreOwner = {
                email: 'jawher@yahoo.com',
                password: 'jawherA1',
            } as StoreOwner ;

            fixture.signIn();
            tick();

            expect( signInSpy ).toBeCalledWith( storeOwner );
        }));
    });
});
