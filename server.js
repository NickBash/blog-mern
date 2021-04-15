const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function dbConnect() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (e) {
    console.log('DB not connect'.e.message)
    process.exit(1)
  }
}

dbConnect()

app.listen(PORT, () => console.log(`Server start on port ${PORT}...`))
