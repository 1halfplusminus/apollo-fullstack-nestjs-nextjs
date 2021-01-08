import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Launch } from './launch.model';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  token?: string;

  @Field((type) => [Launch])
  launchs: Launch[];
}
