

## Plan: Add WhisprChat to AI Projects

### What
Add "WhisprChat - Best Omegle Alternative" as a new project entry in the fallback data at `src/data/projects.ts` under `aiProjects.projects`, and also insert it into the Supabase `ai_projects` table for the database-driven flow.

### Also Fix: Build Errors
Fix the two TypeScript errors in `src/pages/WatchRead.tsx` where `created_at` doesn't exist on blog types. The `created_at` field comes from the bookmark, not the blog — need to adjust the `BookmarkedBlog` type in `useBookmarkedBlogs.ts` to include `bookmarked_at` and reference it correctly.

---

### Changes

#### 1. Fix `src/hooks/useBookmarkedBlogs.ts`
- Ensure the `BookmarkedBlog` interface includes a `bookmarked_at` (or `created_at`) field from the bookmark record
- Map the bookmark's `created_at` into the returned object

#### 2. Fix `src/pages/WatchRead.tsx`
- Replace references to `blog.created_at` with the correct field from the `BookmarkedBlog` type (e.g., `blog.bookmarked_at`)

#### 3. Update `src/data/projects.ts`
Add to `aiProjects.projects` array:
```typescript
{
  id: "whisprchat",
  name: { en: "WhisprChat - Best Omegle Alternative", hi: "WhisprChat - सर्वश्रेष्ठ Omegle विकल्प" },
  description: {
    en: "A modern, anonymous video and text chat platform connecting strangers worldwide. Features real-time matching, interest-based pairing, and a clean, safe user experience — the best Omegle alternative built for today's web.",
    hi: "दुनिया भर में अजनबियों को जोड़ने वाला एक आधुनिक, गुमनाम वीडियो और टेक्स्ट चैट प्लेटफॉर्म। रियल-टाइम मैचिंग और सुरक्षित अनुभव के साथ।"
  },
  status: "Active",
  tech: ["React", "WebRTC", "Node.js", "Socket.IO"],
  github_Url: "https://github.com/arb-avikroy/whisprchat",
  live_Url: "https://whisprchat.adventurousinvestorhub.com"
}
```

#### 4. Insert into Supabase `ai_projects` table
Run an insert to add the project to the database so the DB-driven flow also picks it up:
- `category`: `'projects'`
- `name_en`: `'WhisprChat - Best Omegle Alternative'`
- `name_hi`: `'WhisprChat - सर्वश्रेष्ठ Omegle विकल्प'`
- `description_en`: Same as above
- `description_hi`: Same as above
- `status`: `'Active'`
- `tech`: `['React', 'WebRTC', 'Node.js', 'Socket.IO']`
- `github_url`: `'https://github.com/arb-avikroy/whisprchat'`
- `live_url`: `'https://whisprchat.adventurousinvestorhub.com'`
- `display_order`: next available (e.g., 3)

---

### Files to Modify

| File | Action | Description |
|------|--------|-------------|
| `src/data/projects.ts` | **Modify** | Add WhisprChat to `aiProjects.projects` fallback |
| `src/hooks/useBookmarkedBlogs.ts` | **Fix** | Ensure `bookmarked_at` field exists on returned type |
| `src/pages/WatchRead.tsx` | **Fix** | Use correct field name for bookmark date |

