import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export const CustomJwt = createParamDecorator(
  async (value: ClassConstructor<unknown>, ctx: ExecutionContext) => {
    // extract headers
    const headers = ctx.switchToHttp().getRequest().headers['authorization'];
    let jwt;
    try {
      jwt = headers.split(' ')[1];
    } catch (error) {
      throw new HttpException(
        {
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Cannot find JWT token',
        },
        401,
      );
    }

    // Convert headers to DTO object
    const dto = plainToInstance(value, jwt, {
      excludeExtraneousValues: true,
    });

    // Validate
    // await validateOrReject(dto);

    // return header dto object
    return dto;
  },
);
