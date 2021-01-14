import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { LaunchsModule } from './launchs/launchs.module';

const Users = UsersModule.forRoot({ imports: [PrismaModule] });

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
    }),
    AuthModule.forRoot({ imports: [Users] }),
    Users,
    LaunchsModule.forRoot({ imports: [Users] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
