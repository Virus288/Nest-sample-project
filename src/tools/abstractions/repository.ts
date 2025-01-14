import { Injectable } from '@nestjs/common';
import type { EControllers } from '../../enums/index';
import type * as types from '../../types/index';
import type { FilterQuery, Model } from 'mongoose';

@Injectable()
export default abstract class RepositoryFactory<U, Z extends EControllers> implements types.IAbstractRepository<Z> {
  protected abstract model: Model<U>;

  async add(data: types.IRepositoryAddData[Z]): Promise<string> {
    const newElement = new this.model(data);
    const callback = await newElement.save();
    return callback._id as string;
  }

  async count(filter: FilterQuery<Record<string, unknown>>): Promise<number> {
    return this.model.countDocuments(filter);
  }

  async update(id: string, data: types.IRepositoryUpdate[Z]): Promise<void> {
    await this.model.findOneAndUpdate({ _id: id } as FilterQuery<Record<string, unknown>>, data);
  }

  async get(_id: unknown): Promise<types.IRepositoryGetData[Z] | null> {
    return (await this.model.findOne({ _id } as FilterQuery<Record<string, unknown>>).lean()) as
      | types.IRepositoryGetData[Z]
      | null;
  }
}
