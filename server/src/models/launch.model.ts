import { ArgsType, Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { Mission } from './mission.model';
import { Rocket } from './rocket.model';

@ArgsType()
export class LaunchArgs {
  @Field((type) => Int)
  pageSize: number = 0;

  @Field((type) => String)
  after: string = '';
}

@ObjectType()
export class LaunchConnect {
  @Field((type) => String)
  cursor: string;

  @Field((type) => Boolean)
  hasMore: boolean;

  @Field((type) => [Launch])
  launches: Launch[];
}

@ObjectType()
export class Launch {
  @Field((type) => ID)
  id: string | number;

  @Field((type) => String)
  site: string;

  @Field((type) => String)
  isBooked: boolean;

  @Field((type) => Rocket)
  rocket: Rocket;

  @Field((type) => Mission)
  mission: Mission;

  cursor: string;
}
