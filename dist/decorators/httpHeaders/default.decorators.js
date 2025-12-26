"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderReq = void 0;
const common_1 = require("@nestjs/common");
const HeaderReq = (name, required = true) => (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const headerValue = request.headers[name.toLowerCase()];
    if (!headerValue) {
        if (required) {
            throw new common_1.BadRequestException(`${name} is required in headers`);
        }
        return null;
    }
    const headerId = Number(headerValue);
    if (isNaN(headerId))
        throw new common_1.BadRequestException(`${name} must be a valid number`);
    return headerId;
})();
exports.HeaderReq = HeaderReq;
//# sourceMappingURL=default.decorators.js.map