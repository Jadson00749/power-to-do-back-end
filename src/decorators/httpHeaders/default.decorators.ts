import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const HeaderReq = (name: string, required = true) => createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    const headerValue = request.headers[name.toLowerCase()];

    if (!headerValue) {
      if(required){
        throw new BadRequestException(`${name} is required in headers`);
      }
      return null
    }

    const headerId = Number(headerValue);

    if (isNaN(headerId)) throw new BadRequestException(`${name} must be a valid number`);

    return headerId;
  },
)();