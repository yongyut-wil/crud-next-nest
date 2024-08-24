import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mssql',
          host: configService.get('DATABASE_HOST'),
          port: Number(configService.get('DATABASE_PORT')),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          schema: configService.get('DATABASE_SCHEMA'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
          options: {
            trustServerCertificate: true,
          },
        };
      },
    }),

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       type: 'postgres',
    //       host: configService.get('POSTGRES_HOST'),
    //       port: configService.get('POSTGRES_PORT'),
    //       username: configService.get('POSTGRES_USER'),
    //       password: configService.get('POSTGRES_PASSWORD'),
    //       database: configService.get('POSTGRES_DATABASE'),
    //       autoLoadEntities: true,
    //       synchronize: true,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
