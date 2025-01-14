import type { IUserEntity } from '../entity';

export interface IUserRepository {
  getByLogin(login: string): Promise<IUserEntity | null>;
  remove(id: string): Promise<void>;
}
