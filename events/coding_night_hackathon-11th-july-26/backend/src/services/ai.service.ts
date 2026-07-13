import { config } from '../config';
import { logger } from '../utils/logger';

export interface TriageResult {
  title: string;
  category: string;
  priority: string;
  possible_causes: string;
  initial_checks: string;
  warning?: string;
}

export interface AiAnalysisResult {
  title: string;
  summary: string;
  description: string;
  category: string;
  priority: string;
  keywords: string[];
  missing_information: string[];
  possible_solution?: string;
}

export class AiService {
  /**
   * Analyze a user issue report using OpenRouter.
   * Standardizes the format, corrects language, estimates priority/category, and recommends a solution.
   */
  async analyzeReportOpenRouter(originalTitle: string, originalDescription: string): Promise<AiAnalysisResult | null> {
    logger.info(`Starting OpenRouter AI analysis for report: "${originalTitle}"`);
    
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      logger.error('OPENROUTER_API_KEY is not defined in environment variables.');
      return null;
    }

    const systemPrompt = `You are an expert support analyst.
Your task is to improve user-submitted reports while preserving their original meaning.

Rules:
- If the user writes in another language (e.g., Urdu, Roman Urdu, Hindi, Spanish), TRANSLATE and rewrite it in professional English. Keep the exact situation and context described by the user.
- Do not invent facts. Do not remove important details.
- Correct grammar and spelling.
- Organize information professionally.
- Create a concise, descriptive title.
- Produce a clear summary.
- Assign the most appropriate category (e.g., HVAC, Electrical, Plumbing, Authentication, Network & IT, etc.).
- Estimate priority based only on the provided information (Low, Medium, High, Critical).
- List missing information instead of guessing. Explicitly mention "Not provided" if needed.
- Provide a "possible_solution" which is your recommendation on how a technician or user might resolve this issue. Format this field clearly using newlines (\n) and bullet points or numbered lists. Do not write it as a single paragraph.
- Return ONLY valid JSON with no markdown formatting (e.g. do not wrap in \`\`\`json).

The JSON output must strictly follow this exact schema:
{
  "title": "String",
  "summary": "String",
  "category": "String",
  "priority": "String",
  "description": "String",
  "possible_solution": "String",
  "missing_information": ["String"],
  "keywords": ["String"]
}`;

    const userMessage = `Title: ${originalTitle}\n\nDescription:\n${originalDescription}`;

    const models = [
      'nvidia/nemotron-3-ultra-550b-a55b:free',
      'nvidia/nemotron-3-super-120b-a12b:free',
      'openai/gpt-oss-120b:free',
      'qwen/qwen3-next-80b-a3b-instruct:free',
      'tencent/hy3:free',
      'google/gemma-4-31b-it:free',
      'poolside/laguna-m.1:free',
      'cohere/north-mini-code:free',
      'nvidia/llama-nemotron-rerank-vl-1b-v2:free'
    ];

    for (const model of models) {
      try {
        logger.info(`Attempting AI analysis with model: ${model}`);
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5000',
            'X-Title': 'ServiceWala',
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage }
            ],
            temperature: 0.1,
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          logger.warn(`Model ${model} failed with status ${response.status}: ${errText}. Trying next model...`);
          continue;
        }

        const data = await response.json();
        let aiText = data.choices?.[0]?.message?.content || '';
        
        // Clean up markdown code blocks if the model ignored the instructions
        aiText = aiText.trim();
        if (aiText.startsWith('```json')) aiText = aiText.replace(/^```json/, '');
        if (aiText.startsWith('```')) aiText = aiText.replace(/^```/, '');
        if (aiText.endsWith('```')) aiText = aiText.replace(/```$/, '');
        aiText = aiText.trim();

        const parsed: AiAnalysisResult = JSON.parse(aiText);
        logger.info(`OpenRouter AI analysis completed successfully using model: ${model}`);
        return parsed;
      } catch (error: any) {
        logger.warn(`Model ${model} encountered an error or returned invalid JSON. Trying next model...`);
      }
    }

    logger.error('All OpenRouter fallback models failed.');
    return null;
  }

  /**
   * Legacy Rule-Based intelligent NLP Classifier
   */
  async triageComplaint(complaint: string, assetContext?: any): Promise<TriageResult> {
    logger.info(`Triage request received: "${complaint}"`);

    const text = complaint.toLowerCase();

    // ─── Rule-Based Intelligent NLP Classifier ───────
    if (text.includes('projector') || text.includes('display') || text.includes('hdmi') || text.includes('flicker')) {
      return {
        title: 'Projector display flickering / HDMI connection fault',
        category: 'AV / IT Hardware',
        priority: 'Medium',
        possible_causes: 'Damaged HDMI cable shielding, worn port contact pins, loose connector, lamp module overheating',
        initial_checks: 'Disconnect and firmly reconnect the HDMI cable; verify projector input source setting; test with an alternate laptop/device.',
        warning: 'Avoid looking directly into the projector lens assembly while turned on.'
      };
    }

    if (text.includes('ac') || text.includes('leak') || text.includes('cooling') || text.includes('air conditioner') || text.includes('compressor')) {
      const isCritical = text.includes('smoke') || text.includes('fire') || text.includes('spark');
      return {
        title: isCritical ? 'CRITICAL: AC electrical short / smoking unit' : 'Air Conditioner leakage & cooling inefficiency',
        category: 'HVAC / Electrical',
        priority: isCritical ? 'Critical' : 'High',
        possible_causes: isCritical 
          ? 'Compressor capacitor failure, electrical harness short-circuit' 
          : 'Blocked condensate drain line, iced evaporator coils, clogged air filter, refrigerant depletion',
        initial_checks: isCritical
          ? 'IMMEDIATELY turn off the circuit breaker powering the unit. Keep clear of the area.'
          : 'Power down the AC unit to prevent water damage from leaks; inspect air filters for dust accumulation.',
        warning: isCritical ? 'Danger of electrical shock or combustion. Do not attempt manual inspection.' : undefined
      };
    }

    if (text.includes('elevator') || text.includes('lift') || text.includes('stuck') || text.includes('door')) {
      return {
        title: 'Elevator mechanical fault / door sensor failure',
        category: 'Mechanical / Transport',
        priority: 'Critical',
        possible_causes: 'Obstruction in door tracks, safety interlock mismatch, motor governor trip, controller module lag',
        initial_checks: 'Do not attempt to pry doors open. Press the internal cabin emergency alarm button; verify cabin ventilation is active.',
        warning: 'Ensure a certified technician resolves this. In cabin entrapments, contact rescue services.'
      };
    }

    if (text.includes('pipe') || text.includes('leak') || text.includes('water') || text.includes('plumbing') || text.includes('tap') || text.includes('sink')) {
      return {
        title: 'Water pipe leakage / pressure drop',
        category: 'Plumbing / Facilities',
        priority: 'Medium',
        possible_causes: 'Degraded rubber washers, pipe wall corrosion, joint adhesive failure, pressure surge',
        initial_checks: 'Locate and turn off the nearest water isolation valve; place a bucket to contain pooling water; clear nearby valuables.',
      };
    }

    if (text.includes('wire') || text.includes('spark') || text.includes('plug') || text.includes('socket') || text.includes('power') || text.includes('switch')) {
      return {
        title: 'Electrical circuit breaker trip / socket arcing',
        category: 'Electrical',
        priority: 'High',
        possible_causes: 'Overloaded circuit branch, loose terminal screw connections, faulty appliance short',
        initial_checks: 'Unplug all connected devices on the circuit; do not touch any damp surfaces near the outlet.',
        warning: 'High voltage risk. Do not insert tools or fingers into wall receptacles.'
      };
    }

    // Default Fallback
    return {
      title: 'Reported equipment / facility fault',
      category: 'General Maintenance',
      priority: 'Medium',
      possible_causes: 'General mechanical wear, aging contacts, environmental stress factors',
      initial_checks: 'Safely disconnect power if applicable; post a temporary "Out of Service" sign; keep area clear.',
    };
  }
}

export const aiService = new AiService();
