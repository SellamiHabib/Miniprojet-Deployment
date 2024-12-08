import Redis from 'ioredis';
import { z } from 'zod';
import { BaseRepository } from '../../src/repositories/base.repository';
import { baseSchema } from '../../src/schemas/base.schema';
import { CustomError } from '../../src/utils/CustomError';

jest.mock('ioredis'); // Mock the Redis module

describe('BaseRepository', () => {
  let mockRedisClient: Redis;
  let repository: BaseRepository<any>;
  const schema = baseSchema.extend({
    name: z.string(),
  });
  const value: z.infer<typeof schema> = {
    id: '123',
    name: 'Test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockRedisClient = new Redis() as jest.Mocked<Redis>; // Type as Mocked Redis
    repository = new BaseRepository('testPrefix', schema, mockRedisClient);
  });

  it('should return parsed data from Redis on get', async () => {
    const key = '123';

    (mockRedisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(value)); // Mock the get method

    const result = await repository.get(key);

    expect(mockRedisClient.get).toHaveBeenCalledWith('testPrefix:123');
    expect(result.name).toEqual('Test');
  });
  it('should return null if data is not found in Redis', async () => {
    (mockRedisClient.get as jest.Mock).mockResolvedValue(null); // No data found

    const result = await repository.get('non-existent-key');

    expect(result).toBeNull();
  });

  it('should throw a CustomError if data parsing fails', async () => {
    (mockRedisClient.get as jest.Mock).mockResolvedValue('invalid json'); // Malformed data

    await expect(repository.get('key')).rejects.toThrowError(CustomError);
  });
  it('should set data in Redis correctly', async () => {
    const key = '456';
    const value = { id: '456', name: 'New Test' };
    (mockRedisClient.set as jest.Mock).mockResolvedValue('OK'); // Mock Redis set

    const result = await repository.set(key, value);

    expect(mockRedisClient.set).toHaveBeenCalledWith('testPrefix:456', JSON.stringify(value));
    expect(result).toEqual(value);
  });

  it('should throw a CustomError on Redis set failure', async () => {
    (mockRedisClient.set as jest.Mock).mockRejectedValue(new Error('Set failed'));

    await expect(repository.set('key', { id: '789', name: 'Fail' })).rejects.toThrowError(CustomError);
  });
  it('should delete data from Redis', async () => {
    (mockRedisClient.del as jest.Mock).mockResolvedValue(1); // Mock delete success

    await repository.delete('key-to-delete');

    expect(mockRedisClient.del).toHaveBeenCalledWith('testPrefix:key-to-delete');
  });

  it('should throw a CustomError on Redis delete failure', async () => {
    (mockRedisClient.del as jest.Mock).mockRejectedValue(new Error('Delete failed'));

    await expect(repository.delete('key')).rejects.toThrowError(CustomError);
  });
});
