import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import GetUserDto from './getUser.dto';
import { IGetUserReq } from './types';

@Injectable()
export default class GetUserValidationPipe implements PipeTransform {
  async transform(value: IGetUserReq): Promise<GetUserDto> {
    const object = plainToInstance(GetUserDto, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0]!.constraints!)[0]);
    }

    if (!object.id && !object.login) {
      throw new BadRequestException('No params provided');
    }

    return object;
  }
}
