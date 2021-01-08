import { Field, ObjectType } from '@nestjs/graphql';
import { Launch } from './launch.model';

@ObjectType()
export class TripUpdateResponse {
  @Field((type) => Boolean)
  success: boolean;
  @Field((type) => String)
  message: string;

  @Field((type) => [Launch])
  launches: Launch[];
}
