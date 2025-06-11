import { ApiProperty } from '@nestjs/swagger';
import { Matches, MaxLength, MinLength } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'admin name',
    example: 'admin',
    required: true,
    type: String,
  })
  @MinLength(3)
  @MaxLength(250)
  name: string;

  @ApiProperty({
    description: 'admin password',
    example: 'password@0001',
    required: true,
    type: String,
  })
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export class LoginAdminDto {
  @ApiProperty({
    description: 'admin name',
    example: 'admin',
    required: true,
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'admin password',
    example: 'password@0001',
    required: true,
    type: String,
  })
  password: string;
}
