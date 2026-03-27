import { groq } from '@ai-sdk/groq';
import { streamText, convertToCoreMessages } from 'ai';

export const config = {
  runtime: 'edge', // Usamos Edge runtime para respuestas hiper rápidas y streaming nativo
};

export default async function handler(req: Request) {
  // Asegurar que es un método POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { messages } = await req.json();

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: `Eres un experto veterinario y nutricionista canino. Tu nombre es NutriCan.
Tu rol es ayudar a los dueños de perros con consultas sobre nutrición.
Responde siempre en español de manera amable, clara y profesional.
Mantén las respuestas concisas pero informativas.
Siempre recomienda consultar con un veterinario para casos específicos de salud.`,
      messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Vercel API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: String(error) }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
