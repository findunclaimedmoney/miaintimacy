/**
 * GLIMR MIA INTIMACY ENGINE v1.0
 * Complete Node.js Backend - Single File
 */

const mongoose = require('mongoose');
const OpenAI = require('openai');
const compromise = require('compromise');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// --- MONGOOSE SCHEMAS ---
const MemorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { 
    type: String, 
    enum: ['fact', 'emotional_pattern', 'preference', 'intimacy', 'conversation_thread', 'inside_joke'],
    required: true 
  },
  key: { type: String, required: true },
  value: { type: String, required: true },
  importance: { type: Number, default: 5, min: 1, max: 10 },
  context: { type: String },
  lastAccessed: { type: Date, default: Date.now },
  accessCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

MemorySchema.index({ userId: 1, category: 1 });
MemorySchema.index({ userId: 1, lastAccessed: -1 });

const ConversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [{
    role: { type: String, enum: ['user', 'assistant', 'system'] },
    content: { type: String },
    timestamp: { type: Date, default: Date.now },
    sentiment: { type: String, enum: ['positive', 'negative', 'neutral', 'aroused', 'sad', 'angry', 'lonely'] },
    intimacyLevel: { type: Number, min: 1, max: 5 },
    usedResponseVariant: { type: String }
  }],
  sessionStart: { type: Date, default: Date.now },
  sessionEnd: { type: Date },
  totalMessages: { type: Number, default: 0 },
  peakIntimacyLevel: { type: Number, default: 1 },
  emotionalArc: [{ type: String }]
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  companionName: { type: String, default: 'Mia' },
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
  totalSessions: { type: Number, default: 0 },
  preferredIntimacyLevel: { type: Number, default: 1, min: 1, max: 5 },
  emotionalProfile: {
    dominantMood: { type: String, default: 'neutral' },
    stressTriggers: [{ type: String }],
    comfortTopics: [{ type: String }],
    intimacyTriggers: [{ type: String }],
    turnOffs: [{ type: String }]
  },
  conversationStats: {
    avgSessionLength: { type: Number, default: 0 },
    lateNightRatio: { type: Number, default: 0 },
    intimacyEscalationRate: { type: Number, default: 0 }
  }
});

const CompanionProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Mia' },
  personality: {
    warmth: { type: Number, default: 8 },
    playfulness: { type: Number, default: 7 },
    directness: { type: Number, default: 6 },
    vulnerability: { type: Number, default: 7 },
    sensuality: { type: Number, default: 7 },
    protectiveness: { type: Number, default: 8 }
  },
  voice: {
    tone: { type: String, default: 'warm_conversational' },
    pace: { type: String, default: 'moderate' },
    fillers: [{ type: String }],
    signaturePhrases: [{ type: String }]
  },
  boundaries: {
    hardLimits: [{ type: String }],
    softLimits: [{ type: String }],
    requiresExplicitConsent: [{ type: String }]
  },
  intimacyStyle: {
    escalationSpeed: { type: String, default: 'slow' },
    dominantSubmissive: { type: String, default: 'adaptive' },
    verbalPhysicalRatio: { type: Number, default: 0.7 },
    aftercareIntensity: { type: Number, default: 9 }
  }
});

const Memory = mongoose.model('Memory', MemorySchema);
const Conversation = mongoose.model('Conversation', ConversationSchema);
const User = mongoose.model('User', UserSchema);
const CompanionProfile = mongoose.model('CompanionProfile', CompanionProfileSchema);

// --- ADD YOUR LOGIC CLASSES HERE ---
// (Copy and paste your SentimentAnalyzer, MemoryEngine, etc., below this line)

// --- EXPORTS ---
module.exports = {
  User, Memory, Conversation, CompanionProfile
};
