# Kumbo - Regulatory Landscape

## Primary Jurisdiction: Turkey

### KVKK (Personal Data Protection Law)

| Aspect | Requirement | Kumbo Implication |
|--------|-------------|-------------------|
| **Child Definition** | Under 18 years old | All Kumbo child users require parental consent |
| **Consent** | Explicit parental consent required for minors | Must implement verifiable parental consent flow |
| **Legal Capacity** | Minors lack full legal capacity | Parent account is the "legal" account holder |
| **Data Minimization** | Collect only necessary data | No PII beyond essential (name, age for personalization) |
| **Best Interest** | Child's best interest must be primary consideration | Privacy-by-design; no dark patterns |
| **Authority** | KVKK (Turkish Data Protection Authority) | Register and comply with standard KVKK obligations |

### Key KVKK Compliance Actions

1. **Age Verification**: Verify parent/child relationship during onboarding
2. **Parental Consent Flow**: Clear, documented consent before child data processing
3. **Privacy Policy**: Child-friendly version + detailed parent version
4. **Data Minimization**: No collection of sensitive data; no tracking pixels in child UI
5. **Right to Deletion**: Easy mechanism for parents to delete child data
6. **Security Measures**: Encryption, access controls, breach notification procedures

---

## Secondary Consideration: EU GDPR

If/when expanding to EU markets:

| Aspect | GDPR Requirement | Notes |
|--------|------------------|-------|
| **Child Consent Age** | 16 years (can be lowered to 13 by member states) | More restrictive than Turkey in some cases |
| **Article 8** | Special provisions for information society services to children | Full compliance required for EU expansion |
| **Parental Verification** | "Reasonable efforts" to verify parental consent | May require more robust verification than Turkey |

---

## Child Online Safety Considerations

### Turkey Regulatory Developments

| Development | Status | Impact |
|-------------|--------|--------|
| Age verification discussions | Under parliamentary review | May require stronger ID verification |
| Social media restrictions for minors | Proposed (under 16 ban discussed) | General trend toward stricter child digital protection |
| Content filtering requirements | Under discussion | Kumbo should proactively implement content controls |

### Best Practices (Beyond Compliance)

1. **No External Links**: Child UI contains no links to external websites
2. **No Third-Party Ads**: Zero advertising in child-facing interface
3. **No Dark Patterns**: No manipulation to extend screen time or spend money
4. **Transparent Data Use**: Clear explanation to parents of what data is collected and why
5. **Parental Dashboard**: Real-time visibility into child activity
6. **Session Limits**: Optional screen time controls for parents

---

## Financial Services Considerations

### No Banking License Required (V1)

Kumbo V1 is a **tracking and education app**, not a financial services provider:

| Feature | Classification | Regulatory Implication |
|---------|----------------|------------------------|
| Virtual allowance tracking | Software/app | No financial license required |
| Chore-to-reward connection | Internal ledger | No financial license required |
| Goal visualization | Educational feature | No financial license required |
| No real money transfers | Virtual only | Outside financial services regulation |

### Future Phases (If Adding Banking Features)

| Feature | Regulatory Requirement |
|---------|------------------------|
| Real debit cards | Partnership with licensed bank; BRSA oversight |
| Money transfers | Payment services license (6493 Law) |
| Savings interest | Banking license required |

> ⚠️ **Recommendation**: Maintain software-only approach in V1-V2 to avoid banking regulation complexity. Consider bank partnership model only after product-market fit is proven.

---

## Compliance Checklist for MVP

- [ ] Draft Privacy Policy (Turkish + English)
- [ ] Implement parental consent flow with verification
- [ ] Conduct KVKK compliance assessment
- [ ] Establish data retention and deletion policies
- [ ] Document data processing activities
- [ ] Implement security measures (encryption, access control)
- [ ] Design child-safe UI (no ads, no external links, no dark patterns)
- [ ] Create parent notification system for child activity
