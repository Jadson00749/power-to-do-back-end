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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const default_decorators_1 = require("../../decorators/httpHeaders/default.decorators");
const tasks_service_1 = require("./tasks.service");
const customSwegger_decorator_1 = require("../../decorators/swegger/customSwegger.decorator");
const tasks_model_1 = require("../../models/tasks.model");
const JwtAuthGuard_1 = require("../../guards/JwtAuthGuard");
const jwt_1 = require("../../common/jwt");
let TasksController = class TasksController {
    constructor(TaskService) {
        this.TaskService = TaskService;
    }
    async findAllOrfilters(params, res, req, categoryId) {
        const idUser = (0, jwt_1.jwtDecode)(req)['userId'];
        let { rows, count } = await this.TaskService.findByFilters(Number(params.page), Number(params.length), Number(idUser), Number(categoryId));
        if (!count)
            rows = [];
        res.setHeader('length', count.toString());
        res.setHeader('Access-Control-Expose-Headers', 'length');
        return res.status(common_1.HttpStatus.OK).json(rows);
    }
    async create(data, res, req, categoryId) {
        const idUser = (0, jwt_1.jwtDecode)(req)['userId'];
        let rows = await this.TaskService.createTask(data, Number(idUser), Number(categoryId));
        return res.status(common_1.HttpStatus.CREATED).json(rows);
    }
    async delete(id, res, req, categoryId) {
        const idUser = (0, jwt_1.jwtDecode)(req)['userId'];
        let result = await this.TaskService.deleteOne(Number(id), Number(idUser), Number(categoryId));
        if (result.affected > 0) {
            res.json({ message: 'Registro deletado com sucesso' });
        }
        else {
            throw new common_1.HttpException('Nenhum registro foi afetado. Verifique se o item existe e tente novamente.', common_1.HttpStatus.BAD_REQUEST);
        }
        return result;
    }
    async update(data, params, res, req, categoryId) {
        const userId = (0, jwt_1.jwtDecode)(req)['userId'];
        let result = await this.TaskService.update(data, Number(params?.id), Number(userId), Number(categoryId));
        if (result.affected)
            return res.status(common_1.HttpStatus.OK).json('Registration Updated Successfully!');
        return res.status(common_1.HttpStatus.OK).json({ message: 'Nenhum registro foi efetado' });
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)('findAllOrFilters/:page/:length'),
    (0, swagger_1.ApiHeader)({ name: 'categoryId', required: false, example: 1 }),
    (0, swagger_1.ApiBody)({ type: tasks_model_1.TaskModel }),
    (0, customSwegger_decorator_1.ApiLengthParam)(false),
    (0, customSwegger_decorator_1.ApiPageParam)(false),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, default_decorators_1.HeaderReq)('categoryId', false)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Request, Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findAllOrfilters", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiHeader)({ name: 'categoryId', required: true, example: 1 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, default_decorators_1.HeaderReq)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tasks_model_1.TaskModel, Object, Request, Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: Number }),
    (0, swagger_1.ApiHeader)({ name: 'categoryId', required: true, example: 1 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, default_decorators_1.HeaderReq)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Request, Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, swagger_1.ApiParam)({ name: 'id', required: true }),
    (0, swagger_1.ApiHeader)({ name: 'categoryId', required: true, example: 1 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __param(4, (0, default_decorators_1.HeaderReq)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tasks_model_1.TaskModel, Object, Object, Request, Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('tasks'),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map