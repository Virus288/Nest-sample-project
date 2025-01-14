import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import GetUserController from './getUser.controller';
import GetUserService from './getUser.service';
import MongoModule from '../../../../connections/mongo';
import UserRepository from '../../repository';
import { User, UserSchema } from '../../schema';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [GetUserController],
  providers: [GetUserService, UserRepository],
  exports: [UserRepository],
})
export default class GetUserModule {}
