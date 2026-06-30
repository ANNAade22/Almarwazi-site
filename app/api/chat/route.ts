import { NextRequest, NextResponse } from 'next/server';
import { getFaqAnswer } from '@/lib/chatFaq';

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        const lastUserMessage = [...messages]
            .reverse()
            .find((m: { role: string }) => m.role === 'user');

        if (!lastUserMessage?.content) {
            return NextResponse.json(
                { error: 'No user message found' },
                { status: 400 }
            );
        }

        const answer = getFaqAnswer(lastUserMessage.content);
        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {
                const words = answer.split(/(\s+)/);
                for (const word of words) {
                    if (word) {
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({ content: word })}\n\n`)
                        );
                        await new Promise((r) => setTimeout(r, 12));
                    }
                }
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                controller.close();
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
