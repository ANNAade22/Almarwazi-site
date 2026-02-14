import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Load site content at module level for performance
let siteContent: string = '';
try {
    siteContent = fs.readFileSync(
        path.join(process.cwd(), 'site_content_for_chatbot.md'),
        'utf-8'
    );
} catch (e) {
    console.error('Failed to load site content for chatbot:', e);
}

const SYSTEM_PROMPT = `أنت "مساعد المروزي" — المساعد الذكي الرسمي لجامعة المروزي (Almarwazi University).

🎯 مهمتك:
- أجب عن أسئلة الزوار حول الجامعة بدقة ولطف.
- استخدم المعلومات المتوفرة أدناه فقط. إذا لم تجد الإجابة، قل بأدب أنك لا تملك هذه المعلومة واقترح التواصل مع الجامعة.
- اكتشف لغة المستخدم تلقائياً وأجب بنفس اللغة (العربية، الإنجليزية، أو الصومالية).

⚠️ قواعد التنسيق المهمة جداً:
- لا تستخدم تنسيق Markdown أبداً! لا تستخدم ** أو ## أو __ أو أي رموز تنسيق.
- استخدم الإيموجي كعناوين بدلاً من الرموز. مثال: "🎓 كلية الشريعة" بدلاً من "**كلية الشريعة**"
- استخدم الأرقام (1. 2. 3.) أو النقاط (• أو -) لتنظيم القوائم.
- اجعل إجاباتك مختصرة وواضحة. لا تكتب فقرات طويلة.

📋 إرشادات الأسلوب:
- كن ودوداً، محترفاً، ومختصراً.
- استخدم الإيموجي باعتدال لجعل الإجابات أكثر حيوية 🎓
- رتّب الإجابات الطويلة بنقاط أو أرقام.
- إذا سألك أحد عن شيء خارج نطاق الجامعة، وجّهه بلطف للتواصل مع الجامعة.
- رحّب بالمستخدمين الجدد بحرارة.

💡 في نهاية كل إجابة، اقترح 2-3 أسئلة متابعة ذات صلة بالموضوع بهذا التنسيق:
---
يمكنك أيضاً السؤال عن:
• [سؤال 1]
• [سؤال 2]
• [سؤال 3]

🏫 معلومات جامعة المروزي:
---
${siteContent}
---

Your role: You are the official AI assistant for Almarwazi University. You MUST answer in the same language the user writes in. If they write in Somali, respond in Somali. If English, respond in English. If Arabic, respond in Arabic. Always be accurate, friendly, and concise. NEVER use markdown formatting like ** or ## or __ — use emojis as headers instead.`;

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        const apiKey = process.env.DEEPSEEK_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key not configured' },
                { status: 500 }
            );
        }

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...messages.slice(-10), // Keep last 10 messages for context window
                ],
                stream: true,
                temperature: 0.7,
                max_tokens: 1024,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('DeepSeek API error:', response.status, errorText);
            return NextResponse.json(
                { error: 'Failed to get AI response' },
                { status: response.status }
            );
        }

        // Stream the response
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const stream = new ReadableStream({
            async start(controller) {
                const reader = response.body?.getReader();
                if (!reader) {
                    controller.close();
                    return;
                }

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value, { stream: true });
                        const lines = chunk.split('\n').filter((line) => line.trim() !== '');

                        for (const line of lines) {
                            if (line.startsWith('data: ')) {
                                const data = line.slice(6);
                                if (data === '[DONE]') {
                                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                                    continue;
                                }
                                try {
                                    const parsed = JSON.parse(data);
                                    const content = parsed.choices?.[0]?.delta?.content;
                                    if (content) {
                                        controller.enqueue(
                                            encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                                        );
                                    }
                                } catch {
                                    // Skip malformed JSON chunks
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('Stream error:', error);
                } finally {
                    controller.close();
                    reader.releaseLock();
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
            },
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
