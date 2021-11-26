import { ONE_WEEK } from '../../constants';
import { isTokenExpired } from './authUtils';

// Setup Date.now() with a fixed value to test token expiration
beforeEach(() => {
  global.Date.now = jest.fn(() => 1600000000000);
});

test('Token should be expired', () => {
  const expiresIn = ONE_WEEK;
  const emittedAt = 1599395199000; // One week before Date.now() - 1 sec
  const result = isTokenExpired(expiresIn, emittedAt);
  expect(result).toBeDefined();
  expect(result).toBe(true);
});

test('Token should NOT be expired', () => {
  const expiresIn = ONE_WEEK;
  const emittedAt = 1599395201000; // One week before Date.now() + 1 sec
  const result = isTokenExpired(expiresIn, emittedAt);
  expect(result).toBeDefined();
  expect(result).toBe(false);
});
