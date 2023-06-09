import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/Prisma.service";
import { CreateUserDTO } from "./DTO/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {

	constructor(
		private readonly prisma: PrismaService
	) { }

	public async create(data: CreateUserDTO) {
		try {
			const salt = await bcrypt.genSalt();

			data.password = await bcrypt.hash(data.password, salt);

			const user = await this.prisma.users.create({ data });
			return user;
		} catch (error) {
			throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error });
		}
	}

	public async getAll() {
		return this.prisma.users.findMany();
	}

	async ReadOne(id: number) {

		await this.UserExists(id);

		return this.prisma.users.findUnique({
			where: { id }
		});
	}

	async UserExists(id: number) {

		if (!(await this.prisma.users.count({ where: { id } }))) {
			throw new HttpException(`O Usuário com o id => ${id} não foi encontrado.`, HttpStatus.NOT_FOUND);
		}

	}

}