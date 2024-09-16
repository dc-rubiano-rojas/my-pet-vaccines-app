/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/home` | `/(auth)/pet-register` | `/(auth)/user-profile` | `/_sitemap` | `/home` | `/pet-register` | `/register` | `/user-profile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
