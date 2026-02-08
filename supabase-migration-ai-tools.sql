-- Create AI Tools table
CREATE TABLE IF NOT EXISTS public.ai_tools (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    model_type TEXT[] DEFAULT '{}',
    url TEXT NOT NULL,
    logo TEXT,
    pricing TEXT NOT NULL CHECK (pricing IN ('Free', 'Freemium', 'Paid')),
    tags TEXT[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS ai_tools_category_idx ON public.ai_tools(category);
CREATE INDEX IF NOT EXISTS ai_tools_pricing_idx ON public.ai_tools(pricing);
CREATE INDEX IF NOT EXISTS ai_tools_is_active_idx ON public.ai_tools(is_active);
CREATE INDEX IF NOT EXISTS ai_tools_display_order_idx ON public.ai_tools(display_order);

-- Enable Row Level Security
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running the migration)
DROP POLICY IF EXISTS "Allow public read access on ai_tools" ON public.ai_tools;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on ai_tools"
    ON public.ai_tools
    FOR SELECT
    USING (true);

-- Insert initial AI tools data (only if table is empty)
INSERT INTO public.ai_tools (name, description, category, model_type, url, pricing, tags, display_order)
SELECT * FROM (VALUES
('ChatGPT', 'Advanced conversational AI by OpenAI for natural language understanding and generation', 'Productivity', ARRAY['Text Generation', 'Chatbot'], 'https://chat.openai.com', 'Freemium', ARRAY['GPT-5.2', 'Conversational AI', 'Writing'], 1),
('Claude', 'Anthropic''s AI assistant focused on helpful, harmless, and honest conversations', 'Productivity', ARRAY['Text Generation', 'Chatbot'], 'https://claude.ai', 'Freemium', ARRAY['Anthropic', 'Writing', 'Research'], 2),
('Midjourney', 'AI art generator that creates stunning images from text descriptions', 'Creative', ARRAY['Image Generation'], 'https://www.midjourney.com', 'Paid', ARRAY['Art', 'Design', 'Discord'], 3),
('DALL-E 3', 'OpenAI''s advanced image generation model integrated with ChatGPT', 'Creative', ARRAY['Image Generation'], 'https://openai.com/dall-e-3', 'Paid', ARRAY['OpenAI', 'Art', 'Design'], 4),
('GitHub Copilot', 'AI pair programmer that helps you write code faster with intelligent suggestions', 'Development', ARRAY['Code Assistant'], 'https://github.com/features/copilot', 'Freemium', ARRAY['Coding', 'GitHub', 'VS Code'], 5),
('Cursor', 'AI-first code editor built for productivity with GPT-4 integration', 'Development', ARRAY['Code Assistant', 'Text Generation'], 'https://cursor.sh', 'Freemium', ARRAY['IDE', 'Coding', 'GPT-4'], 6),
('Perplexity AI', 'AI-powered search engine that provides accurate answers with citations', 'Research', ARRAY['Research', 'Chatbot'], 'https://www.perplexity.ai', 'Freemium', ARRAY['Search', 'Research', 'Citations'], 7),
('Runway ML', 'Creative toolkit with AI models for video generation and editing', 'Creative', ARRAY['Video Generation', 'Image Generation'], 'https://runwayml.com', 'Freemium', ARRAY['Video', 'Editing', 'Creative'], 8),
('ElevenLabs', 'AI voice generator for realistic text-to-speech and voice cloning', 'Creative', ARRAY['Audio/Music'], 'https://elevenlabs.io', 'Freemium', ARRAY['Voice', 'TTS', 'Audio'], 9),
('Notion AI', 'AI writing assistant integrated into Notion workspace', 'Productivity', ARRAY['Text Generation', 'Summarization'], 'https://www.notion.so/product/ai', 'Paid', ARRAY['Productivity', 'Writing', 'Notes'], 10),
('Google Gemini', 'Google''s most capable AI model with multimodal reasoning capabilities', 'Productivity', ARRAY['Text Generation', 'Multi-modal', 'Chatbot'], 'https://gemini.google.com', 'Freemium', ARRAY['Google', 'Multimodal', 'Research'], 11),
('Stable Diffusion', 'Open-source image generation model with community-driven development', 'Creative', ARRAY['Image Generation'], 'https://stability.ai', 'Free', ARRAY['Open Source', 'Image', 'Art'], 12),
('Jasper AI', 'AI writing assistant for marketing and business content creation', 'Business', ARRAY['Text Generation'], 'https://www.jasper.ai', 'Paid', ARRAY['Marketing', 'Copywriting', 'Business'], 13),
('Copy.ai', 'AI-powered copywriting tool for marketing content and social media', 'Business', ARRAY['Text Generation'], 'https://www.copy.ai', 'Freemium', ARRAY['Copywriting', 'Marketing', 'Social Media'], 14),
('DeepL', 'Advanced AI translation service with superior accuracy', 'Productivity', ARRAY['Translation'], 'https://www.deepl.com', 'Freemium', ARRAY['Translation', 'Languages', 'Accuracy'], 15),
('Synthesia', 'AI video platform to create professional videos with AI avatars', 'Business', ARRAY['Video Generation'], 'https://www.synthesia.io', 'Paid', ARRAY['Video', 'Avatars', 'Business'], 16),
('Suno AI', 'AI music generation tool that creates songs from text descriptions', 'Creative', ARRAY['Audio/Music'], 'https://suno.com', 'Freemium', ARRAY['Music', 'Audio', 'Creative'], 17),
('QuillBot', 'AI-powered paraphrasing and writing enhancement tool', 'Education', ARRAY['Text Generation', 'Summarization'], 'https://quillbot.com', 'Freemium', ARRAY['Paraphrasing', 'Writing', 'Education'], 18),
('Poe', 'Platform to access multiple AI models (GPT-5.2, Claude, Gemini, etc.) in one place', 'Productivity', ARRAY['Text Generation', 'Chatbot', 'Multi-modal'], 'https://poe.com', 'Freemium', ARRAY['Multi-model', 'Chatbot', 'Platform'], 19),
('Character.AI', 'Create and chat with AI characters for entertainment and roleplay', 'Entertainment', ARRAY['Chatbot'], 'https://character.ai', 'Freemium', ARRAY['Chatbot', 'Entertainment', 'Roleplay'], 20)
) AS v(name, description, category, model_type, url, pricing, tags, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.ai_tools LIMIT 1);

-- Grant necessary permissions
GRANT SELECT ON public.ai_tools TO anon;
GRANT SELECT ON public.ai_tools TO authenticated;

-- Create User Curated AI Tools table (for self-submitted tools)
CREATE TABLE IF NOT EXISTS public.user_curated_ai_tools (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    model_type TEXT[] DEFAULT '{}',
    url TEXT NOT NULL,
    logo TEXT,
    pricing TEXT NOT NULL CHECK (pricing IN ('Free', 'Freemium', 'Paid')),
    tags TEXT[] DEFAULT '{}',
    submitted_by TEXT,
    submitted_by_email TEXT,
    ip_address TEXT,
    is_approved BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for user curated tools
CREATE INDEX IF NOT EXISTS user_curated_ai_tools_category_idx ON public.user_curated_ai_tools(category);
CREATE INDEX IF NOT EXISTS user_curated_ai_tools_pricing_idx ON public.user_curated_ai_tools(pricing);
CREATE INDEX IF NOT EXISTS user_curated_ai_tools_is_approved_idx ON public.user_curated_ai_tools(is_approved);
CREATE INDEX IF NOT EXISTS user_curated_ai_tools_is_active_idx ON public.user_curated_ai_tools(is_active);

-- Disable Row Level Security for user submissions (allow anyone to insert)
-- Security is handled by is_approved field - only approved tools show publicly
ALTER TABLE public.user_curated_ai_tools DISABLE ROW LEVEL SECURITY;

-- Grant necessary permissions for both tables
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT ON public.user_curated_ai_tools TO anon, authenticated;
GRANT SELECT ON public.ai_tools TO anon, authenticated;
