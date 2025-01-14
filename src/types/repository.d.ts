import type * as enums from '../enums/index.js';
import type { IUserEntity } from '../modules/user/entity';

export interface IRepositoryAddData {
  [enums.EControllers.Users]: Record<string, unknown>;
}

export interface IRepositoryAddDefaultData {
  [enums.EControllers.Users]: Partial<IUserEntity>;
}

export interface IRepositoryGetData {
  [enums.EControllers.Users]: IUserEntity | null;
}

export interface IRepositoryUpdate {
  [enums.EControllers.Users]: Partial<IUserEntity>;
}

export interface IAbstractRepository<Z extends enums.EControllers> {
  add(data: IRepositoryAddData[Z]): Promise<string>;

  get(data: unknown): Promise<IRepositoryGetData[Z]>;
}
