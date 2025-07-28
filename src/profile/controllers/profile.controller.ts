import { Controller, Get } from '@nestjs/common';

import { ProfileService } from '../services/profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfiles() {
    return this.profileService.getProfiles();
  }
}
