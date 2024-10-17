import { DynamicModule, Global, Module } from '@nestjs/common';

interface RouteModuleConfig {
  imports?: any[];
  providers?: any[];
  controllers?: any[];
  exports?: any[];
}

@Global()
@Module({})
export default class RouteModule {
  static register(config: RouteModuleConfig): DynamicModule {
    return {
      module: RouteModule,
      imports: config.imports || [],
      providers: config.providers || [],
      controllers: config.controllers || [],
      exports: config.exports || [],
    };
  }
}
