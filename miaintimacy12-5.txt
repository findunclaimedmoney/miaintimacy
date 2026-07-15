
# File: config/database.js
database_js = '''const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/glimr', {
      // Mongoose 6+ handles these automatically, but explicit for clarity
    });
    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
'''

with open(f"{output_dir}/config/database.js", "w") as f:
    f.write(database_js)

# File: .env.example
env_example = '''# GLIMR Companion Engine Environment Variables

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/glimr?retryWrites=true&w=majority

# OpenAI
OPENAI_API_KEY=sk-your-openai-key-here
OPENAI_MODEL=gpt-4o

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_your-stripe-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Email (Resend)
RESEND_API_KEY=re_your-resend-key

# Companion Config
COMPANION_NAME=Mia
MAX_CONVERSATION_HISTORY=50
MEMORY_DECAY_DAYS=30
'''

with open(f"{output_dir}/.env.example", "w") as f:
    f.write(env_example)

print("✅ config/database.js created")
print("✅ .env.example created")
