module.exports = {
  type: 'mysql',
  url: process.env.CLEARDB_DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ['dist/graphql/entity/**/*.js'],
  seeds: ['dist/graphql/seed/*.js'],
  subscribers: ['dist/graphql/entity/BasicListener.js', 'dist/graphql/entity/**/*.listener.js']
}
