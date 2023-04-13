import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";


@Module({
	imports: [
		JwtModule.register(
			{
				secret: process.env.JWT_SECRET
			}
		)
	],
	controllers: [],
	providers: [AuthService]
})
export class AuthModule { }