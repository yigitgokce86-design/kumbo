# Kumbo - Decision Guardrails

## Non-Negotiables

### 1. Privacy First
- **Rule**: No PII exposure; anonymized analytics only
- **Implication**: No child photos, real names in analytics, or identifiable data sharing
- **Test**: "Would this pass a KVKK/GDPR-K audit?"

### 2. Child Safety Absolute
- **Rule**: No external links, no ads targeting children, no dark patterns
- **Implication**: All external navigation blocked; no third-party tracking pixels in child UI
- **Test**: "Would a child protection advocate approve this?"

### 3. Simplicity Over Features
- **Rule**: Low reading complexity, playful UI, maximum 3-step interactions
- **Implication**: No feature ships if it requires reading instructions
- **Test**: "Can a 6-year-old use this without help?"

### 4. Parent Control Always
- **Rule**: Parents must approve any monetary/goal changes
- **Implication**: Children cannot bypass parent approvals; all actions logged
- **Test**: "Does the parent have full visibility and veto power?"

### 5. Education Before Gamification
- **Rule**: Every feature must have a learning outcome
- **Implication**: No pure entertainment; growth/learning must be measurable
- **Test**: "What financial concept does this teach?"

## Decision Framework
When evaluating any feature or design decision, ask:
1. Does it violate any guardrail? → **STOP**
2. Does it support the habit loop (Earn → Save → Achieve)? → **PROCEED**
3. Is it essential for MVP? → **PRIORITIZE** or **DEFER**
