import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum PatchSize {
  SMALL,
  GRAND,
}

registerEnumType(PatchSize, {
  name: 'PatchSize',
  description: 'The supported colors.',
});

export const patchSize: Record<keyof typeof PatchSize, string> = {
  SMALL: 'small',
  GRAND: 'grand',
};

@ObjectType()
export class Mission {
  @Field((type) => String)
  name: string;

  missionPatchSmall: string;
  missionPatchLarge: string;
}
