
# File 4: MongoDB Models - User.js
user_model = '''const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    default: '' 
  },
  age: { 
    type: Number 
  },
  location: { 
    type: String 
  },
  subscription: {
    tier: { 
      type: String, 
      enum: ['free', 'basic', 'premium', 'vip'], 
      default: 'free' 
    },
    expiresAt: { 
      type: Date 
    }
  },
  preferences: {
    character: { 
      type: String, 
      default: 'mia' 
    },
    voiceEnabled: { 
      type: Boolean, 
      default: true 
    },
    videoEnabled: { 
      type: Boolean, 
      default: false 
    },
    intimacyLevel: { 
      type: Number, 
      min: 1, 
      max: 5, 
      default: 1 
    },
    contentBoundaries: [{
      type: String,
      enum: ['no_degradation', 'no_violence', 'no_ageplay', 'no_public']
    }]
  },
  emotionalProfile: {
    dominantMood: { 
      type: String, 
      default: 'neutral' 
    },
    stressLevel: { 
      type: Number, 
      min: 0, 
      max: 10, 
      default: 5 
    },
    lonelinessScore: { 
      type: Number, 
      min: 0, 
      max: 10, 
      default: 5 
    },
    attachmentStyle: { 
      type: String, 
      enum: ['anxious', 'avoidant', 'secure', 'fearful'], 
      default: 'secure' 
    }
  },
  sessionStats: {
    totalSessions: { 
      type: Number, 
      default: 0 
    },
    totalMessages: { 
      type: Number, 
      default: 0 
    },
    lastSessionAt: { 
      type: Date 
    },
    averageSessionLength: { 
      type: Number, 
      default: 0 
    },
    favoriteTopics: [{ 
      type: String 
    }],
    peakActivityHour: { 
      type: Number 
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
'''

with open(f"{output_dir}/src/models/User.js", "w") as f:
    f.write(user_model)

print("User.js model created")
