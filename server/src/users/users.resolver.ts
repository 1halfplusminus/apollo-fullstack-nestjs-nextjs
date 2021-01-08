import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/auth.decorators';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}
  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return await this.usersService.findOne(user.email);
  }

  @Mutation((returns) => User)
  async create(
    @Args({ name: 'email', type: () => String })
    email: string,
    @Args({ name: 'password', type: () => String })
    passord: string,
  ) {
    return this.usersService.create({ email: email, password: passord });
  }
}
