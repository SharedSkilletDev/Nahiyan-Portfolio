// Fallback response system for when external APIs are unavailable
export interface ResponsePattern {
  keywords: string[];
  response: string;
  priority: number;
}

export const responsePatterns: ResponsePattern[] = [
  // About/Background
  {
    keywords: ['about', 'who', 'background', 'introduce', 'tell me'],
    response: `I'm Nahiyan Bin Noor, a Data Scientist and Machine Learning Engineer currently pursuing my Ph.D. in Biomedical Informatics at the University of Arkansas for Medical Sciences (UAMS). I'm a US Permanent Resident with expertise in healthcare AI, predictive modeling, and NLP systems. I specialize in developing AI-powered applications for clinical settings and have over 4 years of professional experience.`,
    priority: 10
  },
  
  // Education
  {
    keywords: ['education', 'degree', 'study', 'university', 'school', 'phd', 'masters'],
    response: `My educational background includes:
• Ph.D. in Biomedical Informatics (Expected Dec 2027) - University of Arkansas for Medical Sciences (UAMS)
• Master of Science in Information Science (May 2023) - UALR, CGPA: 3.90/4.00
• Graduate Certificate in Data Science (May 2023) - UALR, CGPA: 4.00/4.00
• B.Sc. in Electrical & Electronic Engineering (Oct 2019) - CUET, Bangladesh, CGPA: 3.54/4.00

I received "Outstanding Graduate Student" awards and scholarships throughout my academic journey.`,
    priority: 9
  },
  
  // Experience/Work
  {
    keywords: ['experience', 'work', 'job', 'career', 'professional', 'employment'],
    response: `My professional experience includes:

**Current Role:** Intermediate Data Analyst at Institute for Digital Health and Innovation, UAMS (June 2023 - Present)
• Design ML-powered clinical decision support tools
• Develop predictive models for patient risk stratification (AUC-ROC: 0.76, F1-score: 0.88)
• Work with large Veterans Health Administration datasets

**Previous Roles:**
• Data Scientist & Research Assistant at COSMOS Research Center, UALR (Aug 2021 - May 2023)
• Electrical Data Analyst at Renata Limited (Nov 2019 - July 2021)`,
    priority: 9
  },
  
  // Skills/Technical
  {
    keywords: ['skills', 'technical', 'programming', 'languages', 'tools', 'technologies'],
    response: `My technical skills include:

**Programming & Databases:** Python, SQL
**AI/ML Frameworks:** TensorFlow, PyTorch, ONNX
**Web & Deployment:** Streamlit, Flask, React
**ML & AI Concepts:** LLMs, RAG, Fine-tuning, NLP, Computer Vision, MLOps
**Tools:** MLflow, DVC, Git, Docker
**Data Science:** Predictive Analytics, Statistical Analysis, Data Visualization

**Certifications:**
• EPIC COSMOS Data Model
• AWS Certified Cloud Practitioner
• AWS AI Practitioner`,
    priority: 8
  },
  
  // Projects
  {
    keywords: ['projects', 'github', 'portfolio', 'built', 'developed'],
    response: `Some of my key projects include:

• **PubMedSearch** - AI-powered medical research assistant using Python and Streamlit
• **USMLE Step 1 Assistant** - RAG architecture tool for medical education
• **Predicting Dropout from MOUD** - Healthcare predictive analytics for opioid treatment
• **Anemia Detection from Eye Images** - Computer vision for medical diagnosis
• **Stock Market Analyzer & Reporter** - Financial analysis with LLMs
• **ResearchBuddy AI** - Multi-model AI chatbot with document analysis
• **Chest Disease Classification System** - End-to-end ML pipeline for CT scan analysis

You can find all my projects on GitHub: https://github.com/Nahiyan140212`,
    priority: 8
  },
  
  // Research/Publications
  {
    keywords: ['research', 'publications', 'papers', 'published', 'citations'],
    response: `I'm an active researcher with 152 citations on Google Scholar. Some highlights:

**Awards:**
• Best Paper Award at HUSO 2023 for "Comparing Toxicity Across Social Media Platforms for COVID 19 Discourse"

**Key Publications:**
• "Association between different modalities of opioid use disorder-related care delivery..." - Addictive Behaviors Reports
• "Development and validation of machine-learning algorithms predicting retention, overdoses..." - Journal of Addictive Diseases
• "Comparative Study Between Decision Tree, SVM, and KNN to Predict Anaemic Condition" - IEEE Xplore (36 citations)

My research focuses on healthcare AI, opioid use disorder, and social media toxicity analysis.`,
    priority: 7
  },
  
  // Contact
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'linkedin', 'connect'],
    response: `You can contact Nahiyan through:

📧 **Email:** nahiyan.cuet@gmail.com
📱 **Phone:** +1 501 539 3633
💼 **LinkedIn:** https://www.linkedin.com/in/nahiyan-bin-noor-0a2170158/
🐙 **GitHub:** https://github.com/Nahiyan140212

Feel free to reach out for collaboration opportunities, research discussions, or professional inquiries!`,
    priority: 10
  },
  
  // Current work/UAMS
  {
    keywords: ['current', 'uams', 'arkansas', 'medical', 'healthcare', 'clinical'],
    response: `Currently, I'm working as an Intermediate Data Analyst at the Institute for Digital Health and Innovation at UAMS while pursuing my Ph.D. in Biomedical Informatics.

My current work involves:
• Developing ML-powered clinical decision support tools
• Building predictive models for patient risk stratification
• Working with Epic Cosmos data from ~180k patients
• Analyzing telehealth impact on Opioid Use Disorder outcomes
• Collaborating with clinical, operational, and HR teams

I'm also researching large-scale healthcare data applications and clinical decision support systems.`,
    priority: 8
  }
];

export function findBestResponse(query: string): string {
  const queryLower = query.toLowerCase();
  let bestMatch: ResponsePattern | null = null;
  let maxScore = 0;

  for (const pattern of responsePatterns) {
    let score = 0;
    for (const keyword of pattern.keywords) {
      if (queryLower.includes(keyword.toLowerCase())) {
        score += pattern.priority;
      }
    }
    
    if (score > maxScore) {
      maxScore = score;
      bestMatch = pattern;
    }
  }

  if (bestMatch && maxScore > 0) {
    return bestMatch.response;
  }

  // Default response when no patterns match
  return `I'd be happy to help you learn more about Nahiyan! You can ask me about:

• His background and experience
• Education and qualifications  
• Technical skills and projects
• Research and publications
• Current work at UAMS
• Contact information

What would you like to know specifically?`;
}