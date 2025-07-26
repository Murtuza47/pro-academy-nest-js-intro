import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  isAuthenticated: boolean = false;
  login(body: { email: string; password: string }) {
    const user = this.userService.users.find(
      (user) => user.email === body.email && user.password === body.password,
    );

    if (user) {
      this.isAuthenticated = true;
      return 'Login successful';
    }

    return 'Invalid email or password';
  }
}
