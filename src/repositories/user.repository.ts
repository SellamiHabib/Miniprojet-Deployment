import { User, userSchema } from '../schemas/userSchema';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('user');
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userData = await this.redisClient.get(email);
    if (!userData) return null;

    try {
      const user = JSON.parse(userData);
      return userSchema.parse(user); // Validate user data using Zod
    } catch (error) {
      console.error('Failed to parse user data', error);
      return null;
    }
  }
}
