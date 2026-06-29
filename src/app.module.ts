import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { PaginationModule } from './common/pagination/pagination.module';
import environmentValidation from './config/environment.validation';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development'], // for testing purpose
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // entities: [User], // No need to specify entities when autoLoadEntities is true
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        port: Number(configService.get('database.port')),
        host: configService.get('database.host'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
      }),
    }),
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
