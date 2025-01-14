import { Test } from '@nestjs/testing';
import mongoose from 'mongoose';
import request from 'supertest';
import GetUserController from '../../src/modules/user/subModules/get/getUser.controller';
import GetUserModule from '../../src/modules/user/subModules/get/getUser.module';
import GetUserService from '../../src/modules/user/subModules/get/getUser.service';
import type { IGetUserDto } from '../../src/modules/user/subModules/get/getUser.types';
import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import type { App } from 'supertest/types';

describe('Get user', () => {
  let app: INestApplication;
  const query: IGetUserDto = {
    id: new mongoose.Types.ObjectId().toString(),
    login: 'test',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GetUserModule],
      controllers: [GetUserController],
      providers: [GetUserService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Should fail', () => {
    describe('Missing params', () => {
      it('No data provided', async () => {
        const res = await request(app.getHttpServer() as App).get('/user');
        const body = res.body as Error & { statusCode: number };

        expect(res.status).toEqual(400);
        expect(body.message).toEqual('login must be shorter than or equal to 30 characters');
      });
    });

    describe('Incorrect params', () => {
      it('Id is not a string', async () => {
        const clone = structuredClone(query);
        clone.id = 123 as unknown as string;
        delete clone.login;

        const res = await request(app.getHttpServer() as App).get(
          `/user?${new URLSearchParams(clone as Record<string, string>).toString()}`,
        );
        const body = res.body as Error & { statusCode: number };

        expect(res.status).toEqual(400);
        expect(body.message).toEqual('id must be longer than or equal to 24 characters');
      });

      it('Id is too short', async () => {
        const clone = structuredClone(query);
        clone.id = '123';
        delete clone.login;

        const res = await request(app.getHttpServer() as App).get(
          `/user?${new URLSearchParams(clone as Record<string, string>).toString()}`,
        );
        const body = res.body as Error & { statusCode: number };

        expect(res.status).toEqual(400);
        expect(body.message).toEqual('id must be longer than or equal to 24 characters');
      });

      it('Id is too long', async () => {
        const clone = structuredClone(query);
        clone.id = '11231232132132131231232132131223';
        delete clone.login;

        const res = await request(app.getHttpServer() as App).get(
          `/user?${new URLSearchParams(clone as Record<string, string>).toString()}`,
        );
        const body = res.body as Error & { statusCode: number };

        expect(res.status).toEqual(400);
        expect(body.message).toEqual('id must be shorter than or equal to 24 characters');
      });

      it('Login is not a string', async () => {
        const clone = structuredClone(query);
        clone.login = 1 as unknown as string;
        delete clone.id;

        const res = await request(app.getHttpServer() as App).get(
          `/user?${new URLSearchParams(clone as Record<string, string>).toString()}`,
        );
        const body = res.body as Error & { statusCode: number };

        expect(res.status).toEqual(400);
        expect(body.message).toEqual('login must be longer than or equal to 3 characters');
      });

      it('Login is too short', async () => {
        const clone = structuredClone(query);
        clone.login = '1';
        delete clone.id;

        const res = await request(app.getHttpServer() as App).get(
          `/user?${new URLSearchParams(clone as Record<string, string>).toString()}`,
        );
        const body = res.body as Error & { statusCode: number };

        expect(res.status).toEqual(400);
        expect(body.message).toEqual('login must be longer than or equal to 3 characters');
      });

      it('Login is too long', async () => {
        const clone = structuredClone(query);
        clone.login = '112332131231232113211321231232132132131231232132131223';
        delete clone.id;

        const res = await request(app.getHttpServer() as App).get(
          `/user?${new URLSearchParams(clone as Record<string, string>).toString()}`,
        );
        const body = res.body as Error & { statusCode: number };

        expect(res.status).toEqual(400);
        expect(body.message).toEqual('login must be shorter than or equal to 30 characters');
      });
    });
  });

  describe('Should pass', () => {
    it('No data in database', async () => {
      const res = await request(app.getHttpServer() as App).get(
        `/user?${new URLSearchParams(query as Record<string, string>).toString()}`,
      );

      expect(res.status).toEqual(204);
    });
  });
});
