/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/home` | `/(auth)/pet-register` | `/(auth)/user-profile` | `/(auth)/vaccines` | `/(auth)/vaccines/form` | `/_sitemap` | `/home` | `/pet-register` | `/register` | `/user-profile` | `/vaccines` | `/vaccines/form`;
      DynamicRoutes: `/(auth)/vaccines/${Router.SingleRoutePart<T>}` | `/(auth)/vaccines/form/${Router.SingleRoutePart<T>}` | `/vaccines/${Router.SingleRoutePart<T>}` | `/vaccines/form/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(auth)/vaccines/[id]` | `/(auth)/vaccines/form/[id]` | `/vaccines/[id]` | `/vaccines/form/[id]`;
    }
  }
}
