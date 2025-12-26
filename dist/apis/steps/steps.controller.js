"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const default_decorators_1 = require("../../decorators/httpHeaders/default.decorators");
const steps_service_1 = require("./steps.service");
const steps_model_1 = require("../../models/steps.model");
const JwtAuthGuard_1 = require("../../guards/JwtAuthGuard");
let StepsController = class StepsController {
    constructor(stepController) {
        this.stepController = stepController;
    }
    async create(data, res, taskId) {
        let rows = await this.stepController.create(Number(taskId), data);
        return res.status(common_1.HttpStatus.CREATED).json(rows);
    }
    async delete(id, res, taskId) {
        let result = await this.stepController.deleteOne(Number(id), Number(taskId));
        if (result.affected > 0) {
            res.json({ message: 'Registro deletado com sucesso' });
        }
        else {
            throw new common_1.HttpException('Nenhum registro foi afetado. Verifique se o item existe e tente novamente.', common_1.HttpStatus.BAD_REQUEST);
        }
        return result;
    }
    async update(data, id, res, taskId) {
        let result = await this.stepController.update(Number(id), Number(taskId), data);
        if (result.affected)
            return res.status(common_1.HttpStatus.OK).json('Registration Updated Successfully!');
        return res.status(common_1.HttpStatus.OK).json({ message: 'Nenhum registro foi efetado' });
    }
};
exports.StepsController = StepsController;
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiHeader)({ name: 'taskId', required: true, example: 1 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, default_decorators_1.HeaderReq)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [steps_model_1.StepsModel, Object, Number]),
    __metadata("design:returntype", Promise)
], StepsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: Number }),
    (0, swagger_1.ApiHeader)({ name: 'taskId', required: true, example: 1 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, default_decorators_1.HeaderReq)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number]),
    __metadata("design:returntype", Promise)
], StepsController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, swagger_1.ApiParam)({ name: 'id', required: true }),
    (0, swagger_1.ApiHeader)({ name: 'taskId', required: true, example: 1 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, default_decorators_1.HeaderReq)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [steps_model_1.StepsModel, Object, Object, Number]),
    __metadata("design:returntype", Promise)
], StepsController.prototype, "update", null);
exports.StepsController = StepsController = __decorate([
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('steps'),
    (0, common_1.Controller)('/steps'),
    __metadata("design:paramtypes", [steps_service_1.StepsService])
], StepsController);
//# sourceMappingURL=steps.controller.js.map