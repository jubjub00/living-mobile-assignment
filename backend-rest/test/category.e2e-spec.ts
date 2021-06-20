import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StoreModule } from '../src/store/store.module';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from '../src/category/category.module';
import { MenuModule } from '../src/menu/menu.module';
import { CategoryService } from '../src/category/category.service';
import { StoreService } from '../src/store/store.service';

describe('CategoryController (e2e)', () => {
    let app: INestApplication;
    let service: CategoryService;
    let serviceStore: StoreService;
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
            providers: [CategoryService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<CategoryService>(CategoryService);
        serviceStore = module.get<StoreService>(StoreService);
    });

    afterEach(async () => {
        service = null
        serviceStore = null;
        await app.close();
    })
    
    
    describe('Find all category', () => {

        it(`get all category, then response 200 (OK) with return []`, async() => {
            return request(app.getHttpServer())
            .get('/category')
            .expect(200)
            .then((res)=>{
                expect(res.body).toEqual(
                    expect.objectContaining([])
                )
            })
            
        });

        it(`get all category, then response 200 (OK) with return category' `, async() => {
            const createStore = {
                name: 'new test',
                description: 'test',
                rating: 99,
            };
            return request(app.getHttpServer())
            .post('/store')
            .set('Content-type', 'application/json')
            .send(createStore)
            .expect(201)
            .then(async (res) => {
                const createCategoryA = {
                    name: 'new test',
                    storeId: res.body.id,
                };
                await request(app.getHttpServer())
                .get('/category')
                .expect(200)
            })
        });

        
    });
    
    describe('create category', () => {
        it(`create category, then response 200 (OK) with created category' `, async() => {
            const createStore = {
                name: 'new store',
                description: 'test',
                rating: 99,
            };
            return await request(app.getHttpServer())
            .post('/store')
            .set('Content-type', 'application/json')
            .send(createStore)
            .expect(201)
            .then(async (res)=>{
                const createCategory = {
                    name: 'new category',
                    storeId: res.body.id,
                };
                await request(app.getHttpServer())
                .post('/category')
                .set('Content-type', 'application/json')
                .send(createCategory)
                .expect(201)
            })
        });

        it(`create category, then response 200 (OK) with not create category' `, async() => {
            const createStore = {
                name: 'new test',
                description: 'test',
                rating: 99,
            };
            return await request(app.getHttpServer())
            .post('/store')
            .set('Content-type', 'application/json')
            .send(createStore)
            .expect(201)
            .then(async (res)=>{
                const createCategory = {
                    name: '',
                    storeId: res.body.id,
                };
                await request(app.getHttpServer())
                .post('/category')
                .set('Content-type', 'application/json')
                .send(createCategory)
                .expect(400)
            })
        });
    });

    describe('update category', () => {
        it(`update category, then response 200 (OK) with updated category' `, async() => {
            
            const createStore = {
                name: 'new test',
                description: 'test',
                rating: 99,
            };
            return request(app.getHttpServer())
            .post('/store')
            .set('Content-type', 'application/json')
            .send(createStore)
            .expect(201)
            .then(async (res) => {
                const createCategory = {
                    name: 'new test',
                    storeId: res.body.id,
                };
                await request(app.getHttpServer())
                .put(`/category/${res.body.id}`)
                .set('Content-type', 'application/json')
                .send(createCategory)
                .expect(200)
            })

        });

        it(`update category, then response 400 (BAD) with bad request' `, async() => {
            
            const createStore = {
                name: 'new test',
                description: 'test',
                rating: 99,
            };
            return request(app.getHttpServer())
            .post('/store')
            .set('Content-type', 'application/json')
            .send(createStore)
            .expect(201)
            .then(async (res) => {
                const createCategory = {
                    name: '',
                    storeId: res.body.id,
                };
                await request(app.getHttpServer())
                .put(`/category/${res.body.id}`)
                .set('Content-type', 'application/json')
                .send(createCategory)
                .expect(400)
            })

        });
    });

    describe('delete category', () => {

        it(`delete category, then response 200 (OK) with deleted category' `, async() => {
            const createStore = {
                name: 'new test',
                description: 'test',
                rating: 99,
            };

            return await request(app.getHttpServer())
            .post('/store')
            .set('Content-type', 'application/json')
            .send(createStore)
            .expect(201)
            .then(async (res) => {
                await request(app.getHttpServer())
                .delete(`/category/${res.body.id}`)
                .set('Content-type', 'application/json')
                .expect(200)
            })

        });
    });
});