import { Test } from '@nestjs/testing';
import GetUserController from './getUser.controller';
import GetUserService from './getUser.service';
import type { TestingModule } from '@nestjs/testing';
import type express from 'express';

describe('GetUserController', () => {
  let getUserController: GetUserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GetUserController],
      providers: [GetUserService],
    }).compile();

    getUserController = app.get<GetUserController>(GetUserController);
  });

  describe('root', () => {
    it('Should return user', () => {
      const statusResponseMock = {
        send: jest.fn((x: unknown) => x),
      };

      const res = {
        status: jest.fn((_x: unknown) => statusResponseMock),
        send: jest.fn((x: unknown) => x),
      } as unknown as express.Response;

      expect(getUserController.getUser({ id: '2' }, res)).toBe('Test');
    });
  });
});
