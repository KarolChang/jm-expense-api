module.exports = {
  type: 'mysql',
  url: process.env.CLEARDB_DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ['dist/graphql/entity/**/*.js'],
  seeds: ['dist/graphql/seed/*.js']
}
