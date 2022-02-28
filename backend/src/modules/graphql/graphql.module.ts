import { GraphQLFederationModule } from '@nestjs/graphql';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

/**
 * Made-to-measure GraphQL module: relies on `ConfigModule`
 * to get its configuration.
 *
 * @see ConfigModule
 */
export const GraphQlModule = GraphQLFederationModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    autoSchemaFile: 'schema.gql',
    // allows adding values (e.g.: user ID) in the "req" prop of the Context
    context: ({ req }: any) => ({ req }),
    debug: configService.get('GRAPHQL_DEBUG') === 'true',
    introspection: true,
    playground: configService.get('GRAPHQL_PLAYGROUND') === 'true',
  }),
});
