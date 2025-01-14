import type { IQuery } from '../../../../types';
import type express from 'express';

export interface IGetUserDto {
  id?: string;
  login?: string;
}

export type IGetUserReq = express.Request<unknown, unknown, unknown, IGetUserDto & IQuery>;
