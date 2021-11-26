import { MockProxy } from 'jest-mock-extended';
import { IContext } from 'src/utils/context/interface/context.interface';
import AuthResolver from './auth.resolver';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let mockCtx: MockProxy<IContext>;

  const mockUser = {
    email: 'testmail@jest.com',
    password: 'testjest',
    firstName: 'Test',
    lastName: 'Jest',
  };

  beforeEach(() => {
    resolver = new AuthResolver();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('signup', () => {
    it('should return a new user', async () => {
      jest.spyOn(resolver, 'signup')
        .mockImplementation(() => Promise.resolve({
          ...mockUser,
          id: '10',
          createdAt: 1 as unknown as Date,
          updatedAt: 1 as unknown as Date,
        }));
      expect(
        await resolver.signup({
          ...mockUser,
        }, mockCtx),
      ).toEqual({
        ...mockUser,
        id: '10',
        createdAt: 1 as unknown as Date,
        updatedAt: 1 as unknown as Date,
      });
    });
  });

  describe('login', () => {
    it('should log my user in', () => {
      jest.spyOn(resolver, 'login')
        .mockImplementation(() => Promise.resolve({
          ...mockUser,
          id: '10',
          createdAt: 1 as unknown as Date,
          updatedAt: 1 as unknown as Date,
        }));
    });

    it('should throw an error', () => {

    });
  });
});
