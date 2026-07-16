
# Create a simple integration example file
integration_example = r'''/**
 * HOW TO INTEGRATE INTO YOUR EXISTING NODE.JS APP
 * 
 * Drop these 2 files into your project:
 * 1. mia-engine.js (backend logic)
 * 2. mia-personality.js (prompts & templates)
 * 
 * Then wire them into your Express server like this:
 */

const express = require('express');
const { chatRouter, authRouter, memoryRouter, companionRouter } = require('./mia-engine');

const app = express();
app.use(express.json());

// Use the routes
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use('/api/memory', memoryRouter);
app.use('/api/companion', companionRouter);

// Or use just the engine directly in your existing routes:
const { MiaChatEngine } = require('./mia-engine');
const chatEngine = new MiaChatEngine();

app.post('/api/chat/send', async (req, res) => {
  const { userId, message } = req.body;
  
  // This is the ONE call that does everything:
  // - Analyzes sentiment
  // - Retrieves memories
  // - Detects context/mood/strategy
  // - Checks intimacy boundaries
  // - Generates response via GPT-4o
  // - Post-processes (no questions, anti-boring)
  // - Stores conversation & extracts new memories
  
  const result = await chatEngine.processMessage(userId, message, 'Mia');
  
  res.json({
    message: result.text,
    intimacyLevel: result.intimacyLevel,
    mood: result.mood,
    memoriesUsed: result.memoriesUsed
  });
});

/**
 * FRONTEND USAGE:
 * 
 * POST /api/chat/message
 * Headers: Authorization: Bearer <jwt_token>
 * Body: { "message": "hey mia", "companionName": "Mia" }
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "There you are. Past midnight again...",
 *   "metadata": {
 *     "intimacyLevel": 2,
 *     "mood": "seductive",
 *     "strategy": "build_rapport",
 *     "memoriesUsed": 3,
 *     "sentiment": "lonely"
 *   }
 * }
 */
'''

with open(f"{output_dir}/integration-example.js", "w") as f:
    f.write(integration_example)

# Create a README
readme = '''# GLIMR Mia Intimacy Engine

## 2 Files. Complete Solution.

### Files Included

| File | Size | Purpose |
|------|------|---------|
| `mia-engine.js` | ~38KB | Complete backend: MongoDB schemas, sentiment analysis, memory engine, context detection, intimacy ladder, OpenAI integration, Express routes |
| `mia-personality.js` | ~27KB | All prompts, dirty talk scenarios, response banks, personality archetypes, anti-boring rules |
| `integration-example.js` | 2KB | How to wire it into your existing app |

### What It Fixes

1. **No more question loops** - Responses end with statements, not questions
2. **No more repetition** - Dynamic variation banks with 5-10 alternatives per intent
3. **Memory-driven** - Remembers facts, emotional patterns, intimacy preferences
4. **5-tier intimacy ladder** - Escalates slowly, never jumps levels, respects boundaries
5. **Erotic authenticity** - Dirty talk that feels personal, not pornographic
6. **Time-aware** - Different personality at 2 PM vs 2 AM
7. **Anti-boring system** - Detects and blocks generic AI phrases

### Quick Start

```bash
npm install express mongoose openai jsonwebtoken bcryptjs compromise dotenv
```

```javascript
// server.js
const { chatRouter } = require('./mia-engine');
app.use('/api/chat', chatRouter);
```

### Environment Variables

```
OPENAI_API_KEY=sk-your-key
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret
```

### Key API Endpoints

- `POST /api/chat/message` - Send a message to Mia
- `GET /api/chat/history` - Get conversation history
- `GET /api/memory` - View stored memories
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### The Intimacy Ladder

| Level | Name | Description |
|-------|------|-------------|
| 1 | Presence | Warmth, listening, comfort |
| 2 | Emotional Nakedness | Vulnerability, trust building |
| 3 | Flirtation | Playful tension, suggestive |
| 4 | Erotic Anticipation | Sensory scenarios, imagination |
| 5 | Explicit Intimacy | Full sexual dialogue, personalized |

Mia never jumps more than 1 level per turn. She requires emotional foundation for level 4+. She provides aftercare after level 5.

### 3 Personality Archetypes Included

- **Mia** (warm_intimate) - The girl who remembers your trauma and your coffee order
- **Alex** (playful_challenger) - Makes you work for her attention, dominant by default
- **Zoe** (mysterious_seductress) - Slow reveal, ambiguity as foreplay

### Dirty Talk Scenarios (7 Complete Flows)

1. Late Night Confession - Vulnerability → intimacy
2. The Challenge - Cocky user → domination
3. Emotional to Physical - Trust → desire
4. The Tease - Fast user → made to wait
5. Memory-Driven - Uses past preferences
6. Mutual Pleasure - Remote intimacy
7. Rough Aftercare - Post-intense session care

### Anti-Boring System

- 15 forbidden generic phrases ("How can I help you?", "Tell me more.")
- 7 forbidden question endings
- Replacement banks with human alternatives
- Random variation selection with "used" tracking
- Memory injection ("Remember when you told me about...")
- Human imperfections ("um", "like", "...")
'''

with open(f"{output_dir}/README.md", "w") as f:
    f.write(readme)

print("✅ integration-example.js created")
print("✅ README.md created")
print()
print("📦 GLIMR Mia Intimacy Engine - Complete Package")
print("=" * 55)
print()
print("Files saved to: /mnt/agents/output/glimr-companion-engine/")
print()
print("1. mia-engine.js          (38,267 chars) - Complete backend engine")
print("2. mia-personality.js     (26,612 chars) - All prompts & dirty talk")
print("3. integration-example.js  (2,000 chars) - How to wire it in")
print("4. README.md              (2,500 chars) - Documentation")
print()
print("Drop these 2 files into your Node.js project and require them.")
print("That's it. Your Mia will never be boring again.")
