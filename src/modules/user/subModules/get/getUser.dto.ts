import { IsString, MaxLength, MinLength, ValidateIf } from 'class-validator';
import type { IGetUserDto } from './types';

export default class GetUserDto implements IGetUserDto {
  @ValidateIf((o: IGetUserDto) => o.id === undefined)
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  login?: string;

  @ValidateIf((o: IGetUserDto) => o.login === undefined)
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  id?: string;
}
