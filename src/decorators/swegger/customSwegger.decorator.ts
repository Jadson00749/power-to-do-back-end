import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiParam } from '@nestjs/swagger';

export function ApiPageParam(params:Boolean) {
  return applyDecorators(
    ApiParam({
      name: 'page',
      description: 'Page number for pagination',
      type: Number,
      required: params ? true : false,
      example: 1,
    }),
  );
}

export function ApiLengthParam(params:Boolean) {
  return applyDecorators(
    ApiParam({
      name: 'length',
      description: 'Number of items per page',
      type: Number,
      required: params ? true : false,
      example: 10,
    }),
  );
}