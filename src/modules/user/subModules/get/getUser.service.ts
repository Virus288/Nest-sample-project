import { Injectable, Logger } from '@nestjs/common';
import GetUserDto from './getUser.dto';
import { IUserEntity } from '../../entity';
import UserRepository from '../../repository';

@Injectable()
export default class GetUserService {
  constructor(private repo: UserRepository) {
    //
  }

  async getUser(dto: GetUserDto): Promise<IUserEntity | null> {
    Logger.debug('User - get service', 'User query', dto);

    if (dto.login) return this.repo.getByLogin(dto.login);
    return this.repo.get(dto.id);
  }
}
