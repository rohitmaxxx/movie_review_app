import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockJwtToken'),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data without password if validation is successful', async () => {
      const user = {
        username: 'testuser',
        password: bcrypt.hashSync('testpassword', 10),
        _id: 'someid',
        email: 'test@example.com'
      };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user as any);

      const result = await service.validateUser('testuser', 'testpassword');
      expect(result).toEqual({
        username: 'testuser',
        _id: 'someid',
        email: 'test@example.com'
      });
    });

    it('should return null if validation fails', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      const result = await service.validateUser('testuser', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should login a user and return a JWT token', async () => {
      const user = {
        username: 'testuser',
        _id: 'mockedUserId',
        email: 'test@example.com'
      };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user as any);

      const result = await service.login({ username: 'testuser', userId: 'mockedUserId' });
      expect(result).toEqual({
        access_token: 'mockJwtToken',
        username: 'testuser',
        user_id: 'mockedUserId',
        email: 'test@example.com'
      });
    });
  });
});
