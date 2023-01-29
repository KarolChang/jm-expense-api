module.exports = {
  type: 'mysql',
  url: process.env.TYPEORM_URL,
  synchronize: true,
  logging: false,
  entities: ['dist/graphql/entity/**/*.js', 'dist/graphql/services/**/*.js'],
  seeds: ['dist/graphql/seed/*.js'],
  subscribers: ['dist/graphql/entity/BasicListener.js', 'dist/graphql/entity/**/*.listener.js'],
  migrations: ['dist/graphql/migrations/*.js'],
  cli: {
    migrationsDir: 'src/graphql/migrations'
    // entitiesDir: '',
    // subscribersDir: ''
  }
}
