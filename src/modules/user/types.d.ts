import type { IUserEntity } from './entity';
import type mongoose from 'mongoose';

export interface IUser extends IUserEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
