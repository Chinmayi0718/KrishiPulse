export interface PredefinedQA {
  keywords: string[];
  question: string;
  category: 'pest' | 'irrigation' | 'soil' | 'scheme' | 'general';
  answer: string;
  quickReplies?: string[];
}

export const PREDEFINED_QUESTIONS: PredefinedQA[] = [
  {
    keywords: ['blast', 'paddy', 'leaf blast', 'rice fungus', 'spots on paddy'],
    question: 'How do I manage leaf blast in my paddy crop?',
    category: 'pest',
    answer: `🌾 **Paddy Leaf Blast Management Strategy (Demonstration Protocol):**

1. **Immediate Cultural Action:**
   - Temporarily suspend top-dressing of urea / chemical nitrogen, as excessive nitrogen aggravates blast spore proliferation.
   - Drain stagnant water from the field for 24-48 hours if soil moisture permits, then re-irrigate with fresh running water.

2. **Organic Bio-Control:**
   - Spray *Pseudomonas fluorescens* liquid culture @ 5 ml/L of water during evening hours.
   - Apply Neem Seed Kernel Extract (NSKE 5%) or fermented Panchagavya (30 ml/L).

3. **Standard Chemical Advisory (Threshold Basis):**
   - Foliar spray of Tricyclazole 75% WP @ 0.6 g/L or Kasugamycin 3% SL @ 2 ml/L.
   - Ensure uniform coverage on lower canopy foliage where humidity lingers.

*(Simulated response based on ICAR & UAS Bangalore agronomic advisories)*`,
    quickReplies: [
      'What is the best irrigation schedule for paddy?',
      'Tell me about organic bio-fertilizers',
      'What government subsidy is available for farmers?'
    ]
  },
  {
    keywords: ['irrigation', 'sugarcane', 'water schedule', 'drip', 'watering'],
    question: 'What is the optimal irrigation schedule for sugarcane during tillering stage?',
    category: 'irrigation',
    answer: `💧 **Sugarcane Irrigation Advisory (Tillering Stage):**

- **Soil Moisture Target:** Maintain root-zone moisture between **55% - 65%**.
- **Drip Operating Duration:** Run drip lateral lines for **45 to 60 minutes every 2-3 days** in red sandy loam soils (Mandya region).
- **Water Saving Tip:**
  - Apply sugarcane trash mulching (10 cm thick layer in inter-rows) to conserve up to 30% soil moisture and prevent weed flushes.
  - Irrigate during early morning (6 AM – 9 AM) or late evening to minimize evaporative loss.
- **Fertigation Sync:** Co-apply soluble 19:19:19 NPK through venturi injector on alternate watering cycles.

*(Simulated sensor-aligned irrigation guideline)*`,
    quickReplies: [
      'Check PulseWater sensor readings',
      'How to treat red rot in sugarcane?',
      'Government subsidy for drip lines'
    ]
  },
  {
    keywords: ['ragi', 'millet', 'finger millet', 'harvest', 'earhead'],
    question: 'When should I harvest my Ragi (Finger Millet) crop?',
    category: 'pest',
    answer: `🥣 **Ragi (GPU-28) Harvesting & Ripening Guide:**

1. **Visual Indicators of Maturity:**
   - 80% to 85% of earheads turn from light brown to distinct yellowish-brown / brick color.
   - Grains on main earheads feel hard when pressed between fingernails.
   - Lower leaves turn pale yellow and dry up naturally.

2. **Harvesting Procedure:**
   - Cut only matured earheads with sickle first; bundle and cure in clean threshing yards for 2–3 days under direct sun.
   - Thresh when grain moisture is below 12% to prevent mold during warehouse storage.
   - Retain healthy stubbles for cattle fodder.

*(Simulated advisory calibrated for Southern Dry Zone of Karnataka)*`,
    quickReplies: [
      'What crops can I plant after ragi?',
      'Soil test recommendations for Mandya',
      'Check weather forecast'
    ]
  },
  {
    keywords: ['soil', 'fertility', 'red soil', 'ph', 'organic matter', 'manure'],
    question: 'How can I improve fertility and water retention in red sandy loam soil?',
    category: 'soil',
    answer: `🌱 **Soil Health Improvement for Red Sandy Loam (Kavalu Mannu):**

- **Organic Carbon Enrichment:**
  - Apply 8-10 tonnes of well-rotted Farm Yard Manure (FYM) or 3 tonnes of Vermicompost per acre before pre-monsoon plowing.
  - Grow green manure crops like Sunhemp (*Crotalaria juncea*) or Dhaincha and incorporate into soil at 45-50 days (flowering stage).
- **Moisture Retention Enhancement:**
  - Incorporate Coir Pith compost or hydrogel crystals in furrow lines.
  - Practice mulching to improve soil microbial activity and earthworm population.
- **pH Correction:** Red soils often lean slightly acidic (pH 5.8 - 6.5); apply agricultural lime @ 150-200 kg/acre based on soil testing report.

*(Simulated soil nutrient management protocol)*`,
    quickReplies: [
      'How to prepare Jeevamrutha?',
      'What are the government soil testing schemes?',
      'Best crops for red sandy loam'
    ]
  },
  {
    keywords: ['scheme', 'subsidy', 'drip', 'pmksy', 'government', 'kisan', 'raitha'],
    question: 'What government subsidies are available for micro-irrigation and drip setups?',
    category: 'scheme',
    answer: `🏛️ **Government Subsidies for Micro-Irrigation (Karnataka & Central):**

1. **PMKSY (Pradhan Mantri Krishi Sinchayee Yojana) - Per Drop More Crop:**
   - **Small & Marginal Farmers:** Up to **90% subsidy** on drip and micro-sprinkler installations (up to 5 acres).
   - **Other / General Farmers:** Up to **45% - 50% subsidy**.
   
2. **Karnataka Raitha Siri & Krishi Bhagya:**
   - Subsidies for farm ponds (Krishi Honda) with polythene lining and diesel/solar pumpsets.
   - Financial assistance of ₹10,000/hectare for millet growers.

3. **Required Documents:**
   - Land RTC / Pahani copy.
   - Aadhaar Card & Kisan Credit Card (KCC) / Bank Passbook.
   - Soil & Water Testing Certificate.
   - Application can be filed through **Karnataka Seva Sindhu** or local Raitha Samparka Kendra (RSK).

*(Simulated informational guide. Check with your local Taluk Agricultural Office for official guidelines.)*`,
    quickReplies: [
      'Where is the nearest Raitha Samparka Kendra?',
      'How to manage leaf blast in paddy?',
      'What is the optimal irrigation schedule?'
    ]
  },
  {
    keywords: ['jeevamrutha', 'organic', 'recipe', 'neemastra', 'panchagavya'],
    question: 'How do I prepare Jeevamrutha at home for organic nourishment?',
    category: 'soil',
    answer: `🧪 **Traditional Jeevamrutha Preparation (For 1 Acre):**

**Ingredients:**
- 200 Liters Water (non-chlorinated)
- 10 kg Fresh Cow Dung (desi cow preferred)
- 5 to 10 Liters Cow Urine (Gomutra)
- 2 kg Jaggery (organic / black)
- 2 kg Pulse Flour (Besan / Gram flour)
- 1 handful of Virgin Live Field Soil (from bund/tree shade)

**Procedure:**
1. Mix cow dung and urine thoroughly in plastic barrel with water.
2. Dissolve jaggery and flour in a separate bucket and add into barrel.
3. Add the handful of soil and stir clockwise with a wooden stick for 2 minutes.
4. Cover with gunny bag and keep in shaded area for 48–72 hours. Stir twice daily.
5. Apply through irrigation water or filter and spray @ 10% dilution.

*(Simulated organic farming preparation guide)*`,
    quickReplies: [
      'How to control aphids organically?',
      'Soil improvement tips',
      'What is optimal soil moisture?'
    ]
  }
];

export const INITIAL_CHAT_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'assistant' as const,
    text: `Namaskara Ramesh! 🙏 I am your **KrishiPulse Demo Assistant**. 

I can answer questions regarding:
- 🌿 **Crop Disease Management** (Paddy blast, sugarcane red rot, tomato blight)
- 💧 **Irrigation & Water Scheduling** (Drip durations, soil moisture targets)
- 🌱 **Soil Health & Organic Recipes** (Jeevamrutha, composting, red loam care)
- 🏛️ **Government Subsidies & Schemes** (PMKSY drip subsidy, Krishi Bhagya)

*Note: I am running in local demonstration mode using verified Indian agricultural knowledge bases.* How can I assist your farm today?`,
    timestamp: 'Just now',
    category: 'general' as const,
    quickReplies: [
      'How do I manage leaf blast in my paddy crop?',
      'What is the optimal irrigation schedule for sugarcane?',
      'What government subsidies are available for micro-irrigation?',
      'How can I improve fertility in red sandy loam soil?'
    ]
  }
];

export function getDemoAssistantReply(query: string): { reply: string; category: 'pest' | 'irrigation' | 'soil' | 'scheme' | 'general'; quickReplies: string[] } {
  const normalized = query.toLowerCase().trim();

  // Check matching predefined answers
  for (const qa of PREDEFINED_QUESTIONS) {
    if (qa.keywords.some(k => normalized.includes(k))) {
      return {
        reply: qa.answer,
        category: qa.category,
        quickReplies: qa.quickReplies || [
          'What is the best irrigation schedule?',
          'Government subsidies for farmers',
          'Tell me about organic fertilizers'
        ]
      };
    }
  }

  // Smart contextual fallback based on detected topic keywords
  if (normalized.includes('weather') || normalized.includes('rain') || normalized.includes('temp') || normalized.includes('spray')) {
    return {
      reply: `🌦️ **Simulated Weather Guidance for Mandya:**
Current temperature is 29°C with 64% humidity. A 35% probability of brief afternoon showers is expected.
**Farming Action:** Morning foliar spraying or fertilization is favorable before 11:30 AM. Hold off heavy flood irrigation until monitoring afternoon cloud cover.`,
      category: 'irrigation',
      quickReplies: ['Check 7-day weather forecast', 'Optimal irrigation schedule', 'Crop health status']
    };
  }

  if (normalized.includes('fertilizer') || normalized.includes('urea') || normalized.includes('npk')) {
    return {
      reply: `🌾 **Fertilizer Advisory (Demonstration Guideline):**
For active vegetative growth in Sugarcane & Paddy, split application is crucial:
- Apply nitrogen in 3 equal splits (basal, tillering, and panicle initiation) to avoid leaching in red sandy loam.
- Supplement with 50 kg Neem Cake per acre to inhibit nitrification loss and discourage nematode pests.
- Check soil test records before deciding high-potash doses.`,
      category: 'soil',
      quickReplies: ['How to prepare Jeevamrutha?', 'What subsidies exist for soil tests?', 'Paddy blast control']
    };
  }

  // Friendly default answer
  return {
    reply: `🌱 **KrishiPulse Demo Assistant Advice:**

Thank you for your question regarding *"**${query}**"*.

In this offline hackathon demonstration, here are general agricultural best practices:
1. **Field Observation:** Regularly scout crop leaf undersides and soil dampness at 15 cm depth.
2. **Moisture Balance:** Avoid both waterlogging and severe dry stress—check our **PulseWater** tab for real-time simulated moisture metrics.
3. **Local Extension:** For localized field inspection in Mandya, visit your nearest **Raitha Samparka Kendra (RSK)** or contact KAU/UAS Bengaluru Krishi Vigyan Kendra.

*Tip: Try clicking any of the suggested question chips below for in-depth agronomic protocols!*`,
    category: 'general',
    quickReplies: [
      'How do I manage leaf blast in my paddy crop?',
      'What is the optimal irrigation schedule for sugarcane?',
      'What government subsidies are available for micro-irrigation?',
      'How do I prepare Jeevamrutha at home?'
    ]
  };
}
