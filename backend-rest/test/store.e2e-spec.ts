import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StoreModule } from '../src/store/store.module';
import { StoreService } from '../src/store/store.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from '../src/category/category.module';
import { MenuModule } from '../src/menu/menu.module';

describe('StoreController (e2e)', () => {
    let app: INestApplication;
    let service: StoreService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    autoLoadModels: true,
                    synchronize: true,
                    logging: false,
                }),
                StoreModule,
                CategoryModule,
                MenuModule
            ],
            providers: [StoreService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<StoreService>(StoreService);
    });

    afterEach(async () => {
        service = null
        await app.close();
    })
    
    
    describe('Find all store', () => {
        it(`get all store, then response 200 (OK) with return []`, async() => {
            return request(app.getHttpServer())
            .get('/store')
            .expect(200)
            .then((res)=>{
                expect(res.body).toEqual(
                    expect.objectContaining([])
                )
            })
            
        });
        it(`get all store, then response 200 (OK) with return store' `, async() => {
            const createStoreInputA = {
                name: 'new test',
                description: 'test',
                rating: 99,
            };
            await service.create(createStoreInputA)

            return request(app.getHttpServer())
            .get('/store')
            .expect(200)
            .then((res)=>{
                expect(res.body.length).toEqual(1)
            })

        });
    });
    
    describe('create store', () => {
        it(`create store, then response 200 (OK) with created store' `, async() => {
            const createStoreInput = {
                name: 'new test',
                description: 'test',
                rating: 99,
            };
            return request(app.getHttpServer())
            .post('/store')
            .set('Content-type', 'application/json')
            .send(createStoreInput)
            .expect(201)
        });

        it(`create store, then response 400 (BAD) with bad request' `, async() => {
            const createStoreInput = {
                name: '',
                description: 'test',
                rating: 99,
            };
            return request(app.getHttpServer())
            .post('/store')
            .set('Content-type', 'application/json')
            .send(createStoreInput)
            .expect(400)
        });
    });

    describe('update store', () => {
        it(`update store, then response 200 (OK) with updated store' `, async() => {

            const createStoreInput = {
                name: 'new test',
                description: 'test',
                rating: 99,
            };
            return await request(app.getHttpServer())
            .post('/store')
            .set('Content-type', 'application/json')
            .send(createStoreInput)
            .expect(201)
            .then(async (res) => {
                const createStoreUpdate = {
                    name: 'new update',
                    description: 'test',
                    rating: 99,
                };
                await request(app.getHttpServer())
                .put(`/store/${res.body.id}`)
                .set('Content-type', 'application/json')
                .send(createStoreUpdate)
                .expect(200)
            })

        });

        it(`update store, then response 200 (OK) with updated store' `, async() => {

            const createStoreInput = {
                name: 'new test',
                description: 'test',
                rating: 99,
            };
            return await request(app.getHttpServer())
            .post('/store')
            .set('Content-type', 'application/json')
            .send(createStoreInput)
            .expect(201)
            .then(async (res) => {
                const createStoreUpdate = {
                    name: '',
                    description: 'test',
                    rating: 99,
                };
                await request(app.getHttpServer())
                .put(`/store/${res.body.id}`)
                .set('Content-type', 'application/json')
                .send(createStoreUpdate)
                .expect(400)
            })

        });
    });

    describe('delete store', () => {
        it(`delete store, then response 200 (OK) with deleted store' `, async() => {
            
            const createStoreInput = {
                name: 'new test',
                description: 'test',
                rating: 99,
            };

            return await request(app.getHttpServer())
            .post('/store')
            .set('Content-type', 'application/json')
            .send(createStoreInput)
            .expect(201)
            .then(async (res) => {
                await request(app.getHttpServer())
                .delete(`/store/${res.body.id}`)
                .set('Content-type', 'application/json')
                .expect(200)
            })
        });
    });
});