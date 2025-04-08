declare global {
  var _pgPool: import('pg').Pool | undefined;
}

export default defineNitroPlugin(() => {
  import('pg').then((pgModule) => {
    const { Pool } = pgModule.default || pgModule // fix: support both CJS and ESM

    const pool = new Pool({
      host: '62.72.47.173',
      port: 5432,
      user: 'postgres',
      password: 'Sorathasoun2k25',
      database: 'expo_db',
      ssl: false
    })

    globalThis._pgPool = pool

    useNitroApp().hooks.hook('request', (event) => {
      event.context.db = globalThis._pgPool
    })
  }).catch((err) => {
    console.error('[PostgreSQL Init Error]', err)
  })
})
