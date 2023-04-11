import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/Prisma.service";
import { CreateUserDTO } from "./DTO/create-user.dto";


@Injectable()
export class UserService {

	constructor(
		private readonly prisma: PrismaService
	) { }

	public async create(data: CreateUserDTO) {
		return this.prisma.users.create({ data });
	}

	public async getAll() {
		return this.prisma.users.findMany();
	}

}