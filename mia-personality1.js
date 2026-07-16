Error:
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
Cell In[3], line 716
      1 # FILE 2: mia-personality.js - All Prompts, Templates & Personality Data
      2 mia_personality = r'''/**
      3  * ╔══════════════════════════════════════════════════════════════╗
      4  * ║           GLIMR MIA PERSONALITY & PROMPTS v1.0             ║
   (...)    713 };
    714 '''
--> 716 with open(f"{output_dir}/mia-personality.js", "w") as f:
    717     f.write(mia_personality)
    719 print(f"✅ mia-personality.js created ({len(mia_personality):,} characters)")

NameError: name 'output_dir' is not defined
