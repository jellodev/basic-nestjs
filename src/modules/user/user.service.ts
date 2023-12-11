import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  async findOne(id: number): Promise<User> {
    if (id === 1) {
      return { password: 'test123', username: 'user1', id: 1, name: 'John' };
    } else {
      return {
        password: 'test123',
        username: 'user2',
        id: 2,
        name: 'Doe',
        email: 'test@dev.to',
      };
    }
  }
}
