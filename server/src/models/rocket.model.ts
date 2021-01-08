import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Rocket {
  @Field((type) => ID)
  id: string | number;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  type: string;
}
