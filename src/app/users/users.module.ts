import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import User from "@src/app/users/entities/user.entity";
import { UsersController } from "./users.controller";
import { UserRepository } from "./users.repository";
import { UsersService } from "./users.service";

@Module({
  // imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
