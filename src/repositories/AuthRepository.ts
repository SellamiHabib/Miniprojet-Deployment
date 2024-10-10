import redis from '../config/redisConfig';

class AuthRepository {
  private prefix = 'user:';

  // Save a new token in Redis
  public async saveToken(token: string, email: string): Promise<void> {
    const userKey = `${this.prefix}${token}`;

    await redis.hmset(userKey, {
      email,
      wordCount: 0,
      createdAt: new Date().toISOString(),
    });
  }

  // Retrieve token details from Redis
  public async getTokenDetails(token: string): Promise<Record<string, string> | null> {
    const userKey = `${this.prefix}${token}`;
    const tokenDetails = await redis.hgetall(userKey);

    if (Object.keys(tokenDetails).length === 0) {
      return null;  // Token not found
    }

    return tokenDetails;
  }

  // Update the word count for the token in Redis
  public async updateWordCount(token: string, newWordCount: number): Promise<void> {
    const userKey = `${this.prefix}${token}`;
    await redis.hset(userKey, 'wordCount', newWordCount);
  }

  // Fetch current word count for a token
  public async getCurrentWordCount(token: string): Promise<number> {
    const userKey = `${this.prefix}${token}`;
    const currentWordCount = await redis.hget(userKey, 'wordCount');
    return parseInt(currentWordCount || '0', 10);
  }

  // Reset the word count for all users
  public async resetWordCount(token: string): Promise<void> {
    const userKey = `${this.prefix}${token}`;
    await redis.hset(userKey, 'wordCount', 0);
  }

  // Get all tokens (used for resetting word counts)
  public async getAllTokens(): Promise<string[]> {
    return await redis.keys(`${this.prefix}*`);
  }
}

export default new AuthRepository();
