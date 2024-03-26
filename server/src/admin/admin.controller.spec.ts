import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './entities/admin.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('AdminController', () => {
  let adminController: AdminController;
  let adminService: AdminService;
  let mongod: MongoMemoryServer;

  beforeEach(async () => {
    mongod = new MongoMemoryServer();
    const mongoUri = await mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
      imports: [
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
      ],
    }).compile();

    adminController = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
  });

  afterAll(async () => {
    await mongod.stop();
  });

  describe('createAdmin', () => {
    it('should return a success message and the new admin', async () => {
      const mockAdmin = {
        name: 'Test Admin',
        role: 'test',
        email: 'test@test.com',
        password: 'passwordD@123',
      } as Admin;
      const result = { newAdmin: mockAdmin };
      jest.spyOn(adminService, 'createAdmin').mockImplementation(() => Promise.resolve(result));

      expect(await adminController.createAdmin({}, mockAdmin)).toEqual(result);
    });
    it('should throw an error if the email already exists', async () => {
      const mockAdmin = {
        name: 'Test Admin',
        role: 'test',
        email: 'ponsjeffrey@gmail.com',
        password: 'passwordD@123',
      } as Admin;
      jest.spyOn(adminService, 'createAdmin').mockImplementation(() => {
        throw new Error('Email already exists');
      });

      await expect(adminController.createAdmin({}, mockAdmin)).rejects.toThrow(
        'Email already exists',
      );
    });

    it('should throw an error if the password does not meet the requirements', async () => {
      const mockAdmin = {
        name: 'Test Admin',
        role: 'test',
        email: 'test@tesrrt.com',
        password: 'pas',
      } as Admin;
      jest.spyOn(adminService, 'createAdmin').mockImplementation(() => {
        throw new Error(
          'Password must be at least 8 characters long and contain at least one uppercase letter and one special character',
        );
      });

      await expect(adminController.createAdmin({}, mockAdmin)).rejects.toThrow(
        'Password must be at least 8 characters long and contain at least one uppercase letter and one special character',
      );
    });
  });

  describe('login', () => {
    it('should return a success message and the token', async () => {
      const result = { message: 'Logged in successfully', token: 'token' };
      jest.spyOn(adminService, 'login');

      expect(
        await adminController.login({}, { email: 'test@test.com', password: 'password' }),
      ).toEqual(result);
    });
  });

  describe('updateAdmin', () => {
    it('should return a success message and the updated admin', async () => {
      const mockAdmin: Admin = {
        name: 'Test Admin',
        role: 'test',
        email: 'test@tests.com',
        password: 'password@123L',
      } as Admin;
      jest.spyOn(adminService, 'updateAdmin').mockImplementation(() => Promise.resolve(mockAdmin));

      expect(await adminController.updateAdmin({}, '1', mockAdmin)).toEqual(mockAdmin);
    });
  });

  describe('getAdmins', () => {
    it('should return a success message and all admins', async () => {
      const mockAdmins: Admin[] = [
        {
          name: 'Test Admin',
          role: 'test',
          email: 'test@testt.com',
          password: 'password123G@',
        },
      ] as Admin[];
      jest.spyOn(adminService, 'getAllAdmin').mockImplementation(() => Promise.resolve(mockAdmins));

      expect(await adminController.getAdmins({})).toEqual(mockAdmins);
    });
  });

  describe('getAdmin', () => {
    it('should return a success message and the admin', async () => {
      const mockAdmin: Admin = {
        name: 'Test Admin',
        role: 'test',
        email: 'test@testttt.com',
        password: 'password123G@',
      } as Admin;
      jest.spyOn(adminService, 'getAdmin').mockImplementation(() => Promise.resolve(mockAdmin));

      expect(await adminController.getAdmin({}, '1')).toEqual(mockAdmin);
    });
  });

  describe('deleteAdmin', () => {
    it('should return a success message and the deleted admin', async () => {
      const mockAdmin: Admin = {
        name: 'Test Admin',
        role: 'test',
        email: 'test@testttt.com',
        password: 'password123G@',
      } as Admin;
      jest.spyOn(adminService, 'deleteAdmin').mockImplementation(() => Promise.resolve(mockAdmin));

      expect(await adminController.deleteAdmin({}, '1')).toEqual(mockAdmin);
    });
  });
});
