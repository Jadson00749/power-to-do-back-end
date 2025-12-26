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
exports.TaskDetailsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const default_decorators_1 = require("../../decorators/httpHeaders/default.decorators");
const tasksDetails_service_1 = require("./tasksDetails.service");
const taskDetails_model_1 = require("../../models/taskDetails.model");
const JwtAuthGuard_1 = require("../../guards/JwtAuthGuard");
let TaskDetailsController = class TaskDetailsController {
    constructor(TaskDetService) {
        this.TaskDetService = TaskDetService;
    }
    async uploadFiles(data, res, taskId) {
        try {
            let result = this.TaskDetService.uploadFiles(data, Number(taskId));
            return res.status(common_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: error?.message
                });
            }
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Erro ao cadastrar arquivo'
            });
        }
    }
    async deleteOneUpload(id, taskId, res) {
        let result = await this.TaskDetService.deleteOne(Number(id), Number(taskId));
        if (result.affected > 0) {
            res.json({ message: 'Registro deletado com sucesso' });
        }
        else {
            throw new common_1.HttpException('Nenhum registro foi afetado. Verifique se o item existe e tente novamente.', common_1.HttpStatus.BAD_REQUEST);
        }
        return result;
    }
};
exports.TaskDetailsController = TaskDetailsController;
__decorate([
    (0, common_1.Post)('/upload/files'),
    (0, swagger_1.ApiHeader)({ name: 'taskId', required: true, example: 1 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, default_decorators_1.HeaderReq)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [taskDetails_model_1.TaskDetailsModel, Object, Number]),
    __metadata("design:returntype", Promise)
], TaskDetailsController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Delete)('/upload/delete/:id'),
    (0, swagger_1.ApiHeader)({ name: 'taskId', required: true, example: 1 }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: Number }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, default_decorators_1.HeaderReq)('taskId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], TaskDetailsController.prototype, "deleteOneUpload", null);
exports.TaskDetailsController = TaskDetailsController = __decorate([
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('tasks'),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasksDetails_service_1.TaskDetailsService])
], TaskDetailsController);
//# sourceMappingURL=tasksDetails.controller.js.map