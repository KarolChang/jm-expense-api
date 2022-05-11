module.exports = {
  type: 'mysql',
  url: process.env.CLEARDB_DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: ['dist/graphql/entity/**/*.js'],
  seeds: ['dist/seed/*.js']
}
