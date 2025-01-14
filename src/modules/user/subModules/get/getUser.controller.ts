import { Controller, Get, UsePipes, Logger, Res, Query, HttpCode } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import express from 'express';
import GetUserDto from './getUser.dto';
import GetUserValidationPipe from './getUser.pipe';
import GetUserService from './getUser.service';
import { ETime } from '../../../../enums/time';
import getConfig from '../../../../tools/configLoader';

@Controller()
export default class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @Get('user')
  @Throttle({ default: { limit: getConfig().rateLimit, ttl: ETime.ThrottleTTL } })
  @HttpCode(200)
  @UsePipes(new GetUserValidationPipe())
  async getUser(@Query() query: GetUserDto, @Res() res: express.Response): Promise<void> {
    Logger.debug('User - get', 'Getting user');

    const user = await this.getUserService.getUser(query);

    if (!user) {
      res.status(204).send();
    } else {
      res.send({ data: user });
    }
  }
}
