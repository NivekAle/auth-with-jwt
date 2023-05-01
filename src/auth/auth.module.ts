import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";


@Module({
	imports: [
		JwtModule.register(
			{
				secret: process.env.JWT_SECRET
			}
		),
		PrismaModule,
		UserModule
	],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule { }