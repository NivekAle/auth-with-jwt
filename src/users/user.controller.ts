import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/create-user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {

	constructor(
		private readonly userService: UserService
	) {

	}

	@Post()
	public async insertUser(@Body() data: CreateUserDTO) {
		return this.userService.create(data);
	}

	@Get("/list")
	public async listUsers() {
		return this.userService.getAll();
	}
}