import { HttpService, Injectable } from '@nestjs/common';
import { Launch } from 'src/models/launch.model';
import { Launch as LaunchDTO } from './launch.dto';

@Injectable()
export class LaunchsService {
  constructor(private httpService: HttpService) {}
  async getAllLaunches() {
    const response = (
      await this.httpService.get<LaunchDTO[]>('launches').toPromise()
    ).data;
    return Array.isArray(response)
      ? response.map((l) => this.launchReducer(l))
      : [];
  }
  async getLaunchById({ launchId }: { launchId: number }) {
    const response = (
      await this.httpService
        .get<LaunchDTO[]>('launches', { params: { flight_number: launchId } })
        .toPromise()
    ).data;
    return this.launchReducer(response[0]);
  }
  async getLaunchesByIds({ launchIds }: { launchIds: number[] }) {
    return Promise.all(
      launchIds.map((launchId) => this.getLaunchById({ launchId })),
    );
  }
  private launchReducer(launch: LaunchDTO): Launch {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small ?? '',
        missionPatchLarge: launch.links.mission_patch ?? '',
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
      isBooked: false,
    };
  }
}
