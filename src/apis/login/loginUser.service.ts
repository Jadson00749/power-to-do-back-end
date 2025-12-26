import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException  } from "@nestjs/common"; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder  } from 'typeorm';
import { UsersEntity } from "entity/user/USERS";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersModel } from "models/users";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userService: Repository<UsersEntity>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(data:UsersModel) {
    let query:SelectQueryBuilder<UsersEntity> = this.userService.createQueryBuilder('r')
    .where('r.email = :email', { email: data?.email })

    let user = await query.getOne();
  
    if(!user) {
      throw new HttpException('Credenciais inválidas!', HttpStatus.BAD_REQUEST)
    }

    const validpassword = await bcrypt.compare(data.password, user.password)
    if (!validpassword) {
      throw new UnauthorizedException('Usuario ou senha inválida.');
    }

    const playload = {
        userId: user?.id,
        email: user?.email,
        name: user?.name,
        creationDate: user?.creationDate
    }

    return {
      authUser: {
        userId: user?.id,
        email: user?.email,
        name: user?.name,
        creationDate: user?.creationDate
      },
      token: this.jwtService.sign(playload),
      expiresIn: this.jwtService.decode(this.jwtService.sign(playload))['exp'],
      auth: true
    }
  }

  async createUser(data:UsersModel) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data?.password, saltRounds)

    const newUser = this.userService.create({
      ...data,
      password: hashedPassword
    })

    return this.userService.save(newUser)

  }

}