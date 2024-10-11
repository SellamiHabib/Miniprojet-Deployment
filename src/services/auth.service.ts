import { signToken } from '../utils/jwtUtils';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../schemas/userSchema';
import { v4 as uuidv4 } from 'uuid';

class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async generateToken(email: string): Promise<string> {
    // Check if user exists in Redis, otherwise create it
    let user = await this.userRepository.get(email);
    if (!user) {
      user = await this.createUser(email);
    } else {
      // Update token if it has expired
      user.jwtToken = signToken(email);
      await this.userRepository.set(email, user);
    }

    return user.jwtToken;
  }

  private async createUser(email: string): Promise<User> {
    const token = signToken(email);
    const id = uuidv4();
    const newUser: User = { id, email, jwtToken: token, wordCount: 0, createdAt: new Date(), updatedAt: new Date() };
    return this.userRepository.set(email, newUser);
  }

  public async getUserDetails(email: string): Promise<User> {
    const user = await this.userRepository.get(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async updateWordCount(email: string, wordCount: number): Promise<User> {
    const user = await this.userRepository.get(email);
    if (!user) {
      throw new Error('User not found');
    }
    user.wordCount += wordCount;
    return this.userRepository.set(email, user);
  }
}

export default new AuthService();
