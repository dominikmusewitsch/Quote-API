import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Adjust path if needed
import * as bcrypt from 'bcrypt'; // For password comparison
import { UserAuth, UserPayload } from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  login(user: UserAuth) {
    const payload: UserPayload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    }; // Customize payload with user data
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username); // Assuming you have this method in UserService
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Compare hashed password
      const { password, ...result } = user; // Exclude password from the returned object
      return result;
    }
    return new UnauthorizedException();
  }
}
