import { defineConfig } from '@prisma/adapter-base'

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})