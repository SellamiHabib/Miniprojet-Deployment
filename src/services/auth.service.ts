import { signToken } from '../utils/jwtUtils';
import { UserRepository } from '../repositories/user.repository';
import { UserDTO } from '../models/user.model';

class AuthService {

  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  public async generateToken(email: string): Promise<string> {

    // Check if user exists in Redis, otherwise create it
    let user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      const token = signToken(email);
      user = await this.userRepo.saveUser({ email, jwtToken: token, wordCount: 0 });
    } else {
      // Update token if it has expired
      user.jwtToken = signToken(email);
      await this.userRepo.saveUser(user);
    }

    return user.jwtToken;
  };

  public async getUserDetails(email: string): Promise<UserDTO> {
    let user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async updateWordCount(email: string, wordCount: number): Promise<UserDTO> {
    let user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    user.wordCount += wordCount;
    return this.userRepo.saveUser(user);
  }

}

export default new AuthService();
