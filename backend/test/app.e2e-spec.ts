import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';

describe('VehicleController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /vehicles - should return all vehicles with correct metadata', async () => {
    const response = await request(app.getHttpServer())
      .get('/vehicles?page=1&limit=10')
      .expect(200);

    expect(response.body).toMatchObject({
      data: expect.any(Array),
      total: expect.any(Number),
      page: '1',
      limit: '10',
      totalPages: expect.any(Number),
      hasNextPage: expect.any(Boolean),
      hasPreviousPage: expect.any(Boolean),
    });
  });

  it('GET /vehicles - should filter vehicles by manufacturer', async () => {
    const manufacturer = 'Tesla';
    const response = await request(app.getHttpServer())
      .get(`/vehicles?manufacturer=${manufacturer}`)
      .expect(200);

    response.body.data.forEach((vehicle: any) => {
      expect(vehicle.manufacturer).toBe(manufacturer);
    });
  });

  it('GET /vehicles - should filter vehicles by type', async () => {
    const type = 'ELECTRIC';
    const response = await request(app.getHttpServer())
      .get(`/vehicles?type=${type}`)
      .expect(200);

    response.body.data.forEach((vehicle: any) => {
      expect(vehicle.type).toBe(type);
    });
  });
  it('GET /vehicles - should filter vehicles by year', async () => {
    const year = 2022;
    const response = await request(app.getHttpServer())
      .get(`/vehicles?year=${year}`)
      .expect(200);

    response.body.data.forEach((vehicle: any) => {
      expect(vehicle.year).toBe(year);
    });
  });

  it('GET /vehicles - should filter vehicles by multiple criteria', async () => {
    const year = 2022;
    const type = 'ELECTRIC';

    const response = await request(app.getHttpServer())
      .get(`/vehicles?year=${year}&type=${type}`)
      .expect(200);

    response.body.data.forEach((response: any) => {
      expect(response.year).toBe(year);
      expect(response.type).toBe(type);
    });
  });
  it('GET /vehicles - should return all vehicles with correct metadata', async () => {
    const response = await request(app.getHttpServer())
      .get('/vehicles?page=1&limit=10')
      .expect(200);

    expect(response.body).toMatchObject({
      data: expect.any(Array),
      total: expect.any(Number),
      page: '1',
      limit: '10',
      totalPages: expect.any(Number),
      hasNextPage: expect.any(Boolean),
      hasPreviousPage: expect.any(Boolean),
    });
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('GET /vehicles - should filter vehicles by manufacturer', async () => {
    const manufacturer = 'Tesla';
    const response = await request(app.getHttpServer())
      .get(`/vehicles?manufacturer=${manufacturer}`)
      .expect(200);

    response.body.data.forEach((vehicle: any) => {
      expect(vehicle.manufacturer).toBe(manufacturer);
    });
  });

  it('GET /vehicles - should filter vehicles by type', async () => {
    const type = 'ELECTRIC';
    const response = await request(app.getHttpServer())
      .get(`/vehicles?type=${type}`)
      .expect(200);

    response.body.data.forEach((vehicle: any) => {
      expect(vehicle.type).toBe(type);
    });
  });

  it('GET /vehicles - should filter vehicles by year', async () => {
    const year = 2022;
    const response = await request(app.getHttpServer())
      .get(`/vehicles?year=${year}`)
      .expect(200);

    response.body.data.forEach((vehicle: any) => {
      expect(vehicle.year).toBe(year);
    });
  });

  it('GET /vehicles - should return paginated results', async () => {
    const response = await request(app.getHttpServer())
      .get('/vehicles?page=1&limit=2')
      .expect(200);

    expect(response.body.data.length).toBeLessThanOrEqual(2);
    expect(response.body.page).toBe('1');
    expect(response.body.limit).toBe('2');
  });

  it('GET /vehicles - should return 404 if no vehicles match the criteria', async () => {
    await request(app.getHttpServer())
      .get('/vehicles?manufacturer=NonExistent')
      .expect(404)
      .expect((response) => {
        expect(response.body.message).toBe(
          'No vehicles found matching the criteria.',
        );
      });
  });

  it('GET /vehicles/:id - should return a vehicle by ID', async () => {
    const vehicle = {
      id: '1',
      manufacturer: 'Tesla',
      model: 'Model 3',
      year: 2022,
      type: 'ELECTRIC',
      price: 55000,
      fuelType: 'ELECTRIC',
      transmission: 'Automatic',
      mileage: 15000,
      features: ['Autopilot', 'Long Range'],
      images: [
        'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Choose-Performance-Desktop-LHD.png',
      ],
      description: 'A premium electric sedan with cutting-edge technology.',
    };

    const response = await request(app.getHttpServer())
      .get(`/vehicles/${vehicle.id}`)
      .expect(200);

    expect(response.body).toMatchObject({
      ...vehicle,
    });
  });

  it('GET /vehicles/:id - should return 404 if vehicle not found', async () => {
    const invalidId = '999';

    await request(app.getHttpServer())
      .get(`/vehicles/${invalidId}`)
      .expect(404)
      .expect((response) => {
        expect(response.body.message).toBe(
          `Vehicle with id ${invalidId} not found`,
        );
      });
  });
});
