import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StoreModule } from '../src/store/store.module';
import { StoreService } from '../src/store/store.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from '../src/category/category.module';
import { MenuModule } from '../src/menu/menu.module';
import { MenuService } from '../src/menu/menu.service';
import { CategoryService } from '../src/category/category.service';

describe('MenuController (e2e)', () => {
    let app: INestApplication;
    let service: MenuService;
    let serviceCategory: CategoryService;
    let serviceStore: StoreService;
    let idCategory = '';
    
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
            providers: [MenuService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<MenuService>(MenuService);
        serviceCategory = module.get<CategoryService>(CategoryService);
        serviceStore = module.get<StoreService>(StoreService);

        const createStore = {
            name: 'new test',
            description: 'test',
            rating: 99,
        };
        await serviceStore.create(createStore)

        let idStore = ''
        await request(app.getHttpServer())
        .get('/store')
        .expect(200)
        .then((res)=>{
            idStore = res.body[0].id
        })
        
        const createCategoryInput = {
            name: 'new test',
            storeId: idStore,
        };
        await serviceCategory.create(createCategoryInput)

        await request(app.getHttpServer())
        .get('/category')
        .expect(200)
        .then((res)=>{
            idCategory = res.body[0].id
        })

    });

    afterEach(async () => {
        service = null
        serviceCategory = null
        serviceStore = null
        await app.close();
    })
    
    
    describe('Find all menu', () => {
        it(`get all menu, then response 200 (OK) with return []`, async() => {
            return request(app.getHttpServer())
            .get('/menu')
            .expect(200)
            .then((res)=>{
                expect(res.body).toEqual(
                    expect.objectContaining([])
                )
            })
        });

        it(`get all menu, then response 200 (OK) with return store' `, async() => {
            return request(app.getHttpServer())
            .get('/menu')
            .expect(200)
        });
    });
    
    describe('create menu', () => {
        it(`create menu, then response 200 (OK) with created menu' `, async() => {
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
                .then(async (resCategory) => {
                    const createMenu = {
                        name: 'new menu',
                        categoryId: resCategory.body.id,
                        price: 89
                    };
                    await request(app.getHttpServer())
                    .post('/menu')
                    .set('Content-type', 'application/json')
                    .send(createMenu)
                    .expect(201)
                })
            })
        });
        it(`create menu, then response 400 (BAD) with bad request' `, async() => {
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
                .then(async (resCategory) => {
                    const createMenu = {
                        name: '',
                        categoryId: resCategory.body.id,
                        price: 89
                    };
                    await request(app.getHttpServer())
                    .post('/menu')
                    .set('Content-type', 'application/json')
                    .send(createMenu)
                    .expect(400)
                })
            })
        });
    });

    describe('update store', () => {
        it(`update store, then response 200 (OK) with updated store' `, async() => {
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
                .then(async (resCategory) => {
                    const createMenu = {
                        name: 'new menu',
                        categoryId: resCategory.body.id,
                        price: 89
                    };
                    await request(app.getHttpServer())
                    .post('/menu')
                    .set('Content-type', 'application/json')
                    .send(createMenu)
                    .expect(201)
                    .then((resCreateMenu) => {})
                })
            })

        });
    });

    // describe('delete store', () => {
    //     it(`delete store, then response 200 (OK) with deleted store' `, async() => {
    //         const createStoreInput = {
    //             name: 'new test',
    //             description: 'test',
    //             rating: 99,
    //         };
    //         await service.create(createStoreInput)

    //         let id = ''
    //         await request(app.getHttpServer())
    //         .get('/store')
    //         .expect(200)
    //         .then((res)=>{
    //             id = res.body[0].id
    //         })
            
    //         await service.remove(id)

    //         return request(app.getHttpServer())
    //         .get('/store')
    //         .expect(200)
    //         .then((res)=>{
    //             expect(res.body).toEqual(
    //                 expect.objectContaining([])
    //             )
    //         })

    //     });

    //     it(`delete store, then response 200 (OK) with not delete store' `, async() => {
    //         const createStoreInput = {
    //             name: 'new test',
    //             description: 'test',
    //             rating: 99,
    //         };
    //         await service.create(createStoreInput)

    //         let id = 'id_not_found'
            
    //         await service.remove(id)

    //         return request(app.getHttpServer())
    //         .get('/store')
    //         .expect(200)
    //         .then((res)=>{
    //             expect(res.body[0]).toEqual(
    //                 expect.objectContaining(createStoreInput)
    //             )
    //         })

    //     });
    // });
});