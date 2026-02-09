# AI Architecture & Strategy: Kumbo

## 1. Core AI Objective
To provide personalized, age-appropriate financial guidance to children and actionable insights to parents without compromising privacy.

## 2. AI Features (MVP vs Future)

### Phase 1: MVP (Rules-Based + Light GenAI)
*   **Challenge Generation:** Use LLM (Gemini Flash) to generate "Daily Missions" based on child's age (e.g., "Count the coins in your piggy bank").
*   **Insight Summaries:** Summarize weekly spending/saving for parents (e.g., "Can saved 20% more this week").

### Phase 2: The "Kumbo Guide" (Interactive)
*   **Financial Tutor:** A chat interface (RAG-based) where kids can ask "How long until I can buy my bike?" or "What is inflation?".
*   **Persona:** The AI character (Kumbo) adapts tone based on child's age (Simple for 6yo, more detailed for 12yo).

## 3. Technology Stack
*   **Model:** Google Gemini 1.5 Flash (Low latency, low cost).
*   **Orchestration:** Vercel AI SDK.
*   **Context:** Supabase Vector Store (for consistent memory of child's goals).

## 4. Safety & Privacy Guardrails
*   **System Prompt:** Strict instruction *never* to give financial advice (investment tips) or ask for PII.
*   **Topic Whitelisting:** AI only responds to money/savings/chore topics. Refuses generic chat.
*   **Parent Oversight:** Parents can view full chat logs if implemented.
