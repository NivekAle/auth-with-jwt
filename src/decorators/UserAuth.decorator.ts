import { ExecutionContext, HttpException, HttpStatus, createParamDecorator } from "@nestjs/common";

export const UserAuth = createParamDecorator(
	(filter: string, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();

		if (request.user) {
			if (filter) {
				return request.user[filter]
			} else {
				return request.user;
			}
		} else {
			throw new HttpException("Usuário não encontrado!", HttpStatus.NOT_FOUND);
		}
	}
)