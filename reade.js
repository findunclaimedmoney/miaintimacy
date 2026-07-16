
# Create a README for the complete package
readme = '''# GLIMR Complete Marketing Package

## What's Included

### Main Landing Page
| File | Purpose |
|------|---------|
| `index.html` | Complete landing page with Mia & Jess chat, live avatar, pricing |
| `images/mia.png` | Mia's photo |
| `images/jess.png` | Jess's photo |
| `images/jess-video.mp4` | Jess's video avatar |

### Promo Assets
| File | Purpose |
|------|---------|
| `promo/social-media-promo.txt` | Instagram, TikTok, Twitter, Facebook copy + hashtags |
| `promo/email-popup.html` | Email capture popup (copy-paste into index.html) |

### A/B Test Pages
| File | Purpose |
|------|---------|
| `ab-test/version-a-intimacy.html` | Adult-focused landing page (intimacy angle) |
| `ab-test/version-b-loneliness.html` | Mental health-focused landing page (loneliness angle) |

---

## How to Use

### 1. Deploy Main Landing Page
Upload `index.html` + `images/` folder to:
- **Vercel** (vercel.com) — drag & drop
- **Netlify** (netlify.com) — drag & drop
- **Cloudflare Pages** — upload folder

### 2. Add Email Capture Popup
Open `promo/email-popup.html`, copy everything, paste just before `</body>` in `index.html`.

Features:
- Shows after 15 seconds OR when user scrolls 50% down
- Exit-intent popup (when mouse leaves window)
- Stores emails in localStorage + sends to your backend
- Success state with CTA to start chatting

### 3. Run A/B Tests

**Version A (Intimacy)** — Use for:
- Adult traffic sources
- Late-night ads (10 PM - 4 AM)
- Keywords: "dirty talk", "AI girlfriend", "intimacy"
- Platforms: Reddit adult subs, Twitter adult, adult ad networks

**Version B (Loneliness)** — Use for:
- Mental health / self-improvement traffic
- General social media (daytime)
- Keywords: "lonely", "someone to talk to", "2 AM"
- Platforms: TikTok, Instagram, Facebook, Google Ads

**How to split traffic:**
```javascript
// Add this to your main page router
const version = Math.random() > 0.5 ? 'a' : 'b';
window.location.href = version === 'a' 
  ? '/ab-test/version-a-intimacy.html' 
  : '/ab-test/version-b-loneliness.html';
```

### 4. Social Media Campaign

Copy-paste from `social-media-promo.txt`:
- **5 Instagram posts** (loneliness, comparison, memory, intimacy, Jess)
- **4 TikTok scripts** (POV, birthday, escalation, Jess reacts)
- **2 Twitter threads** (why men are lonely, intimacy ladder)
- **3 Facebook ads** (loneliness, intimacy, live video)
- **Hashtag bank** (primary, secondary, tertiary, niche)
- **Influencer outreach template**

### 5. Track Conversions

Add this to each page's `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>

<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

---

## Recommended Ad Strategy

| Platform | Version | Audience | Budget/Day |
|----------|---------|----------|------------|
| TikTok | B | Men 25-45, interested in self-improvement | $50-100 |
| Instagram | A/B split | Men 25-40, single, late-night active | $75-150 |
| Twitter/X | A | Men 25-45, follow dating/relationship accounts | $50-100 |
| Reddit | A | r/lonely, r/relationship_advice, r/DeadBedrooms | $30-50 |
| Google | B | Keywords: "lonely at night", "someone to talk to" | $100-200 |

---

## Next Steps

1. **Deploy landing page** → Vercel/Netlify
2. **Add email popup** → Copy from promo folder
3. **Set up A/B test** → 50/50 traffic split
4. **Launch social campaign** → Post 1x/day for 2 weeks
5. **Track & optimize** → Watch conversion rates, double down on winning version

---

© 2026 GLIMR. Built for the lonely hours.
'''

with open(f"{output_dir}/README.md", "w") as f:
    f.write(readme)

# Create a zip of everything
import zipfile
zip_path = "/mnt/agents/output/glimr-landing-page.zip"
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(output_dir):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, output_dir)
            zipf.write(file_path, arcname)

print("=" * 60)
print("📦 GLIMR COMPLETE MARKETING PACKAGE")
print("=" * 60)
print()
print("✅ index.html — Main landing page (Mia + Jess + chat + pricing)")
print("✅ images/mia.png — Mia's photo")
print("✅ images/jess.png — Jess's photo")
print("✅ images/jess-video.mp4 — Jess video avatar")
print()
print("📁 promo/")
print("  ✅ social-media-promo.txt — 5 IG posts, 4 TikToks, 2 Twitter threads, 3 FB ads")
print("  ✅ email-popup.html — Email capture with exit intent + success state")
print()
print("📁 ab-test/")
print("  ✅ version-a-intimacy.html — Adult-focused (intimacy angle)")
print("  ✅ version-b-loneliness.html — Mental health-focused (loneliness angle)")
print()
print("✅ README.md — Full deployment + strategy guide")
print()
print("📥 DOWNLOAD:")
print("   [glimr-landing-page.zip](sandbox:///mnt/agents/output/glimr-landing-page.zip)")
print()
print("🚀 DEPLOY TO:")
print("   1. vercel.com — drag & drop folder")
print("   2. netlify.com — drag & drop folder")
print("   3. Cloudflare Pages — upload folder")
print()
print("🔗 CONNECT DOMAIN:")
print("   Add CNAME record: @ → your-site.vercel.app")
print("   Or replace files on your current host")
