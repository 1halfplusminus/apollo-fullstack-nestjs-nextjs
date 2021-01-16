import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Launch } from './launch.model';

@ObjectType()
export class User {
  @Field((type) => ID!)
  id: number;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  token?: string;
}
