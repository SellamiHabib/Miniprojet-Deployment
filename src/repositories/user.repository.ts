import { User, userSchema } from '../schemas/userSchema';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('user', userSchema);
  }
}
