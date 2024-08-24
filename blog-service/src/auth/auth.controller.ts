import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      example: { username: "example", password: "password123" },
    },
  })
  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {}

  @Post('register')
  @ApiBody({
    schema: {
      example: { username: "example", password: "password123" },
    },
  })
  register(@Body() createAuthDto: CreateAuthDto) {
    // return this.authService.create(createAuthDto);
    return console.log(createAuthDto);
  }
}
