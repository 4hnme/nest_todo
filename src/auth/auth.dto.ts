import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJI...' })
  access_token: string;
}

export class LoginDto {
  @ApiProperty({ example: 'alice' })
  username: string;

  @ApiProperty({ example: 'secret', format: 'password' })
  password: string;
}
