/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/home` | `/(auth)/pet-edit` | `/(auth)/pet-register` | `/(auth)/user-profile` | `/(auth)/vaccines` | `/(auth)/vaccines/form` | `/_sitemap` | `/home` | `/pet-edit` | `/pet-register` | `/register` | `/user-profile` | `/vaccines` | `/vaccines/form`;
      DynamicRoutes: `/(auth)/pet-edit/${Router.SingleRoutePart<T>}` | `/(auth)/vaccines/${Router.SingleRoutePart<T>}` | `/(auth)/vaccines/form/${Router.SingleRoutePart<T>}` | `/pet-edit/${Router.SingleRoutePart<T>}` | `/vaccines/${Router.SingleRoutePart<T>}` | `/vaccines/form/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(auth)/pet-edit/[id]` | `/(auth)/vaccines/[id]` | `/(auth)/vaccines/form/[id]` | `/pet-edit/[id]` | `/vaccines/[id]` | `/vaccines/form/[id]`;
    }
  }
}
