import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlAuthGuard } from './gql-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return getCurrentUser(ctx.getContext().req);
  },
);

export const getCurrentUser = (request: any) => {
  return request.user;
};
export const AuthUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx: any = GqlExecutionContext.create(context);
    const auth = new GqlAuthGuard();
    try {
      await auth.canActivate(context);
      const user = getCurrentUser(ctx.getContext().req);
      return user;
    } catch (e) {
      return;
    }
  },
);
