import { IsString, MaxLength, MinLength, Length, ValidateIf } from 'class-validator';
import type { IGetUserDto } from './getUser.types';

export default class GetUserDto implements IGetUserDto {
  @ValidateIf((o: IGetUserDto) => o.id === undefined)
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  login?: string;

  @ValidateIf((o: IGetUserDto) => o.login === undefined)
  @IsString()
  @Length(24, 24)
  id?: string;
}
