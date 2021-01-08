import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Trip, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email: username },
    });
  }

  async create(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...user,
        password: await bcrypt.hash(user.password, 10),
      },
    });
  }
  async bookTrips({
    userId,
    launchIds,
  }: {
    userId: number;
    launchIds: number[];
  }) {
    const results: Trip[] = [];
    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId, userId });
      results.push(res);
    }
    return results;
  }

  private bookTrip({ launchId, userId }: { launchId: number; userId: number }) {
    return this.prisma.trip.upsert({
      where: { launchId: launchId },
      update: {},
      create: { launchId, user: { connect: { id: userId } } },
    });
  }
  async cancelTrip({ launchId, userId }: { launchId: number; userId: number }) {
    try {
      return !!(await this.prisma.trip.delete({
        where: { unique_trip: { launchId, userId } },
      }));
    } catch (e) {
      return false;
    }
  }
  async getLaunchIdsByUser({ userId }: { userId: number }) {
    const found = await this.prisma.trip.findMany({
      where: { userId: userId },
    });
    return found && found.length
      ? found.map((l) => l.launchId).filter((l) => !!l)
      : [];
  }
  async isBookedOnLaunch({
    launchId,
    userId,
  }: {
    launchId: number;
    userId: number;
  }) {
    const found = await this.prisma.trip.findFirst({
      where: { userId, launchId },
    });
    return !!found;
  }
}
