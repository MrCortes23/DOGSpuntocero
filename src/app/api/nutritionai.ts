import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Actualmente, la lógica se ejecuta en el middleware de vite.config.ts para desarrollo local.

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    system: `Eres un experto veterinario y nutricionista canino. Tu nombre es NutriCan.
Tu rol es ayudar a los dueños de perros con consultas sobre nutrición.
Responde siempre en español de manera amable, clara y profesional.
Mantén las respuestas concisas pero informativas.
Siempre recomienda consultar con un veterinario para casos específicos de salud.`,
    messages,
  });

  return result.toDataStreamResponse();
}
