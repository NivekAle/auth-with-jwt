import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";


@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) { }

	async canActivate(context: ExecutionContext) {

		const request = context.switchToHttp().getRequest();
		const { authorization } = request.headers;

		try {
			const token_formated = (authorization ?? "").split(' ')[1];

			const data = await this.authService.checkToken(token_formated);

			request.payload = data;

			request.user = await this.userService.ReadOne(data.id);

			return true;

		} catch (error) {
			return false;
		}


	}

}