import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UsersService } from '../users/users.service';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/auth.decorators';
import { AuthService } from './auth.service';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => User)
  async login(
    @Args({ name: 'email', type: () => String })
    email: string,
    @Args({ name: 'password', type: () => String })
    password: string,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return new UnauthorizedException({
        email: 'Mot de passe',
      });
    }
    const token = await this.authService.login(user);
    return { ...user, token: token.access_token };
  }
}
