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

    if (dto.id) return this.repo.get(dto.id);
    return this.repo.getByLogin(dto.login!);
  }
}
