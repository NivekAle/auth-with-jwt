import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDTO } from "./DTO/auth-login.dto";
import { UserAuth } from "src/decorators/UserAuth.decorator";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("auth")
export class AuthController {

	constructor(
		private readonly authService: AuthService
	) { }

	@Post("login")
	public async login(@Body() { email, password }: AuthLoginDTO) {
		return this.authService.login(email, password);
	}

	@UseGuards(AuthGuard)
	@Post("me")
	public async me(@UserAuth() user) {
		return {
			user: {
				name: user.name,
				email: user.email,
			},
			status: true,
		};
	}

}