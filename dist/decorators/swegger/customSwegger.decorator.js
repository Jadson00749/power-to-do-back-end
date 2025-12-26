"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPageParam = ApiPageParam;
exports.ApiLengthParam = ApiLengthParam;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function ApiPageParam(params) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiParam)({
        name: 'page',
        description: 'Page number for pagination',
        type: Number,
        required: params ? true : false,
        example: 1,
    }));
}
function ApiLengthParam(params) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiParam)({
        name: 'length',
        description: 'Number of items per page',
        type: Number,
        required: params ? true : false,
        example: 10,
    }));
}
//# sourceMappingURL=customSwegger.decorator.js.map