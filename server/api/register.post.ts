export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = event.context.db

  const { name, phone } = body
  const ticketCode = Math.floor(1000 + Math.random() * 9000).toString()

  try {
    // Insert registration data into PostgreSQL
    const result = await db.query(
      'INSERT INTO registrations (name, phone, ticket_code) VALUES ($1, $2, $3) RETURNING *',
      [name, phone, ticketCode]
    )

    return {
      success: true,
      data: result.rows[0]
    }
  } catch (err) {
     // 👇 Check for duplicate phone number
     if ((err as any).code === '23505') {
      return { error: 'This phone number has already been registered.' }
    }
    console.error('[Register Error]', err)
    return {
      error: err instanceof Error ? err.message : 'An unknown error occurred'
    }
  }
})
