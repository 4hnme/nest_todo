import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './local/local.guard';
import { User } from '../users/entities/user.entity';
import { AuthResponseDto, LoginDto } from './auth.dto';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOkResponse
} from '@nestjs/swagger';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Log into the system' })
  @ApiBody({ type: LoginDto })
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ description: 'jwt access token', type: AuthResponseDto })
  @UseGuards(LocalGuard)
  @Post()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
