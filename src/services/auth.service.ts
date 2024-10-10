import { v4 as uuidv4 } from 'uuid';
import AuthRepository from '../repositories/AuthRepository';

interface Token {
  token: string;
  email: string;
  wordCount: number;
  createdAt: Date;
}

class AuthService {
  private tokens: Token[];

  constructor() {
    this.tokens = [];
  }
  public async login(email: string): Promise<string> {
    const token = uuidv4();
    await AuthRepository.saveToken(token, email);
    return token;
  }

  public generateToken(email: string): string {
    const token = uuidv4();
    this.tokens.push({ token, email, wordCount: 0, createdAt: new Date() });
    return token;
  }

  public getTokenDetails(token: string): Token | undefined {
    return this.tokens.find((t) => t.token === token);
  }

  public updateTokenWordCount(token: string, count: number): void {
    const tokenDetails = this.getTokenDetails(token);
    if (tokenDetails) {
      tokenDetails.wordCount += count;
    }
  }

  public resetTokenWordCount(): void {
    // Reset logic (e.g., once per day)
    const now = new Date();
    this.tokens.forEach(token => {
      const timeDifference = now.getTime() - token.createdAt.getTime();
      const oneDay = 24 * 60 * 60 * 1000;
      if (timeDifference > oneDay) {
        token.wordCount = 0;
        token.createdAt = now;
      }
    });
  }
}

export default new AuthService();
