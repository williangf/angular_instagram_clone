import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService) { }

    canActivate(): boolean {
        return this.authService.autenticado();
    }

}