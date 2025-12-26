import { Body, Controller, HttpStatus, Param, Post, Get, Res, Put, Delete, HttpException, HttpCode, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags, ApiHeader, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './loginUser.service';
import { UsersModel } from "models/users";
 
@Controller('login')  
@ApiTags('login')
export class AuthController {
  constructor(
    private readonly AuthService: UserService
  ) {}

  @Post('user')  
  @ApiBody({ type: UsersModel }) 
  @HttpCode(200)
  async redirectLogin(@Body() data:UsersModel) {
    return this.AuthService.validateUser(data)
  }

  @Post('user/create')
  @ApiBody({ type: UsersModel }) 
  async create(@Body() data:UsersModel) {
    return this.AuthService.createUser(data)
  }

}