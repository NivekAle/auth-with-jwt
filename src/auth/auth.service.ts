import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserModel } from "src/models/User.model";
import { PrismaService } from "src/prisma/Prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

	private readonly audience: string = "User";
	private readonly issuer: string = "Login";

	constructor(
		private readonly jwtService: JwtService,
		private readonly prismaService: PrismaService,
	) { }

	public createToken(user: UserModel): { token: string } {
		return {
			token: this.jwtService.sign({
				id: user.id,
				name: user.name
			}, {
				expiresIn: "3h",
				subject: String(user.id),
				audience: this.audience,
				issuer: this.issuer,
			})
		}
	}

	public checkToken(token: string) {
		try {
			const data = this.jwtService.verify(token, {
				audience: this.audience,
				issuer: this.issuer
			});

			return data;
		} catch (error) {
			throw new HttpException(
				error,
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
					description: "Houve um erro ao tentar verificar sua sessão"
				}
			);
		}
	}

	private isValidToken(token: string): boolean {
		try {
			this.checkToken(token);
			return true;
		} catch (error) {
			return false;
		}
	}

	public async login(email: string, password: string) {
		const user = await this.prismaService.users.findFirst({
			where: {
				email
			}
		});
		if (!user) {
			const error = new Error("Sua Senha ou Email estão incorretos!")
			throw new HttpException(
				"Email ou Senha incorretos!",
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
					description: "Insira suas credências corretamente ou clique em esquice minha senha"
				}
			);
		}
		if (!await bcrypt.compare(password, user.password)) {
			const error = new Error("Sua Senha ou Email estão incorretos!")
			throw new HttpException(
				"Email ou Senha incorretos!",
				HttpStatus.BAD_REQUEST,
				{
					cause: error,
					description: "Insira suas credências corretamente ou clique em esquice minha senha"
				}
			);
		}

		return this.createToken(user);
	}


	private async forgetPassword(email: string) {
		const user = await this.prismaService.users.findFirst({
			where: {
				email
			}
		});

	}

}