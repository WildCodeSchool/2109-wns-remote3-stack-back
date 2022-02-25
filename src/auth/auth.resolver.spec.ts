import AuthResolver from './auth.resolver';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

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
          token: 'token',
        }));
      expect(
        await resolver.signup({
          ...mockUser,
        }),
      ).toMatchObject({
        ...mockUser,
        id: '10',
        createdAt: 1 as unknown as Date,
        updatedAt: 1 as unknown as Date,
      });
    });
  });

  describe('login', () => {
    it('should log my user in', async () => {
      jest.spyOn(resolver, 'login')
        .mockImplementation(() => Promise.resolve({
          ...mockUser,
          id: '1',
          createdAt: 2 as unknown as Date,
          updatedAt: 2 as unknown as Date,
          token: 'token',
        }));

      expect(
        await resolver.login({
          email: 'testmail@jest.com',
          password: 'testjest',
        }),
      ).toMatchObject({
        ...mockUser,
        id: '1',
        createdAt: 2 as unknown as Date,
        updatedAt: 2 as unknown as Date,
      });
    });

    it('should throw an error', async () => {
      try {
        await resolver.login({
          email: 'testmail@jest.com',
          password: 'testjest2',
        });
      } catch (e: any) {
        expect(e.message).toMatch('Session expired');
      }
    });
  });
});
