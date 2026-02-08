// Update your existing Cloudflare Worker to handle AI tool submissions
// This should be added to your telegram-contact-api worker

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    };

    // Handle preflight OPTIONS request
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      const data = await request.json();
      
      // Helper function to escape Markdown special characters
      const escapeMarkdown = (text) => {
        if (!text) return '';
        return text.toString().replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
      };
      
      // Handle different message types
      let message;
      
      if (data.type === 'ai_tool_submission') {
        // AI Tool Submission
        const tool = data.tool;
        message = `🤖 *New AI Tool Submission*\n\n` +
                 `*Name:* ${escapeMarkdown(tool.name)}\n` +
                 `*URL:* ${tool.url}\n` +
                 `*Category:* ${escapeMarkdown(tool.category)}\n` +
                 `*Pricing:* ${escapeMarkdown(tool.pricing)}\n` +
                 `*Description:* ${escapeMarkdown(tool.description)}\n\n` +
                 `*Submitted by:* ${escapeMarkdown(tool.submitted_by)}\n` +
                 `*Email:* ${escapeMarkdown(tool.submitted_by_email)}\n\n` +
                 `*Tool ID:* \`${tool.id}\`\n\n` +
                 `To approve/reject, go to:\n` +
                 `https://supabase.com/dashboard/project/olcabtjsennqhogmozue/editor\n\n` +
                 `Table: user_curated_ai_tools\n` +
                 `Set is_approved to true to approve`;
      } else {
        // Contact Form (existing)
        message = `📧 *New Contact Form Submission*\n\n` +
                 `*Name:* ${escapeMarkdown(data.name)}\n` +
                 `*Email:* ${escapeMarkdown(data.email)}\n` +
                 `*Message:*\n${escapeMarkdown(data.message)}`;
      }

      // Send to Telegram
      const telegramResponse = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (!telegramResponse.ok) {
        throw new Error(`Telegram API error: ${await telegramResponse.text()}`);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: corsHeaders,
      });
    } catch (error) {
      console.error("Worker error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
