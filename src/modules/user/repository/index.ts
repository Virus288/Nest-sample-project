import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AbstractRepository from '../../../tools/abstractions/repository';
import { User } from '../schema';
import type { IUserRepository } from './types';
import type * as enums from '../../../enums/index';
import type { IUserEntity } from '../entity';

@Injectable()
export default class UserRepository
  extends AbstractRepository<User, enums.EControllers.Users>
  implements IUserRepository
{
  constructor(@InjectModel(User.name) protected model: Model<User>) {
    super();
  }

  async getByLogin(data: string): Promise<IUserEntity | null> {
    return this.model.findOne({ login: data }).lean();
  }

  async remove(id: string): Promise<void> {
    await this.model.findOneAndDelete({ _id: id });
  }
}
