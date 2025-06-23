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
    response: `I'm Nahiyan Bin Noor, a Data Scientist and Machine Learning Engineer with a Ph.D. in Biomedical Informatics and 4+ years of experience developing production ML systems. I'm a US Permanent Resident currently at the University of Arkansas for Medical Sciences (UAMS). 

My expertise includes AWS cloud services, healthcare AI, NLP, and large-scale distributed systems. I have a proven track record of deploying ML models that improve patient outcomes and operational efficiency, with 16 publications and 155+ citations to date.`,
    priority: 10
  },
  
  // Education
  {
    keywords: ['education', 'degree', 'study', 'university', 'school', 'phd', 'masters'],
    response: `My educational background includes:

**Ph.D. in Biomedical Informatics** (Expected Dec 2027) - University of Arkansas for Medical Sciences (UAMS)
• Research focuses on leveraging large-scale healthcare data to build predictive models and clinical decision support tools

**Master of Science in Information Science** (May 2023) - UALR, CGPA: 3.90/4.00
• Outstanding Graduate Student (2022-2023) and Outstanding Masters Student (2021-2022) awards

**Graduate Certificate in Data Science** (May 2023) - UALR, CGPA: 4.00/4.00
• Specialized expertise in database architecture, data privacy, and visualization

**B.Sc. in Electrical & Electronic Engineering** (Oct 2019) - CUET, Bangladesh, CGPA: 3.54/4.00
• Received scholarships in every semester for academic excellence`,
    priority: 9
  },
  
  // Experience/Work
  {
    keywords: ['experience', 'work', 'job', 'career', 'professional', 'employment'],
    response: `My professional experience includes:

**Current Role:** Intermediate Data Analyst at Institute for Digital Health and Innovation, UAMS (June 2023 - Present)
• Improved identification of high-risk veterans from 50% baseline to F1-score of 0.88 (AUC-ROC 0.76)
• Deployed clinical decision support dashboards in Power BI
• Analyzed ~180,000 patients for telehealth-based OUD care outcomes

**Previous Roles:**
• Data Scientist at COSMOS, UALR (Aug 2021 - May 2023) - Developed NLP toxicity model with 83% accuracy
• Electrical Data Analyst at Renata Limited (Nov 2019 - July 2021) - Led predictive maintenance reducing downtime by 20%`,
    priority: 9
  },
  
  // Skills/Technical
  {
    keywords: ['skills', 'technical', 'programming', 'languages', 'tools', 'technologies', 'aws'],
    response: `My technical skills include:

**Programming Languages:** Python, R, SQL, JavaScript
**Machine Learning:** TensorFlow, PyTorch, LLMs, RAG, Fine-tuning, NLP, Computer Vision, Deep Learning
**AWS Services:** Bedrock, Lambda, S3, Athena, EC2, KMS, CloudTrail, API Gateway
**Data & MLOps:** MLflow, DVC, Model Deployment, Distributed Systems, CI/CD, Docker
**Healthcare & Analytics:** Clinical Informatics, HIPAA Compliance, Statistical Analysis, Predictive Modeling

**Certifications:**
• AWS Cloud Practitioner
• AWS AI Practitioner  
• EPIC COSMOS Data Model`,
    priority: 8
  },
  
  // Projects
  {
    keywords: ['projects', 'github', 'portfolio', 'built', 'developed'],
    response: `Some of my key projects include:

• **Clinical Summarization System** - HIPAA-compliant, serverless NLP pipeline on AWS using RAG architecture with LLaMA-7B
• **Comparative Analysis of SOTA Vision Models** - Created BanglaFood-45 dataset and benchmarked ViT, CLIP, GPT-4o, LLaVA
• **PubMedSearch** - AI-powered medical research assistant using Python and Streamlit
• **USMLE Step 1 Assistant** - RAG architecture tool for medical education
• **Chest Disease Classification Pipeline** - End-to-end ML pipeline with TensorFlow, MLflow, DVC
• **Predicting Dropout from MOUD** - Healthcare predictive analytics for opioid treatment

You can find all my projects on GitHub: https://github.com/Nahiyan140212`,
    priority: 8
  },
  
  // Research/Publications
  {
    keywords: ['research', 'publications', 'papers', 'published', 'citations'],
    response: `I'm an active researcher with 16 publications and 155+ citations on Google Scholar. Some highlights:

**Awards:**
• Best Paper Award at HUSO 2023 for "Comparing Toxicity Across Social Media Platforms for COVID 19 Discourse"

**Key Publications:**
• "Association between different modalities of opioid use disorder-related care delivery..." - Addictive Behaviors Reports
• "Development and validation of machine-learning algorithms predicting retention, overdoses..." - Journal of Addictive Diseases
• "Comparative Study Between Decision Tree, SVM, and KNN to Predict Anaemic Condition" - IEEE Xplore (36 citations)

My research focuses on healthcare AI, clinical decision support, opioid use disorder, and social media toxicity analysis.

View my full publication list: https://scholar.google.com/citations?user=GwgCEz8AAAAJ&hl=en`,
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
🎓 **Google Scholar:** https://scholar.google.com/citations?user=GwgCEz8AAAAJ&hl=en

Feel free to reach out for collaboration opportunities, research discussions, or professional inquiries!`,
    priority: 10
  },
  
  // Current work/UAMS
  {
    keywords: ['current', 'uams', 'arkansas', 'medical', 'healthcare', 'clinical'],
    response: `Currently, I'm working as an Intermediate Data Analyst at the Institute for Digital Health and Innovation at UAMS while pursuing my Ph.D. in Biomedical Informatics.

My current work involves:
• Developing production ML systems for clinical decision support
• Building predictive models for patient risk stratification with F1-score of 0.88
• Working with Epic Cosmos data from ~180,000 patients
• Analyzing telehealth impact on Opioid Use Disorder outcomes
• Collaborating with clinical, operational, and HR teams

I'm also researching HIPAA-compliant, serverless NLP pipelines on AWS and clinical summarization systems using RAG architecture.`,
    priority: 8
  },

  // AWS/Cloud
  {
    keywords: ['aws', 'cloud', 'bedrock', 'lambda', 's3', 'serverless'],
    response: `I have extensive experience with AWS cloud services and am certified as both AWS Cloud Practitioner and AWS AI Practitioner.

**AWS Services I work with:**
• **AI/ML:** Bedrock, SageMaker, Lambda for serverless ML
• **Storage & Data:** S3, Athena for data analytics
• **Compute:** EC2 for scalable computing
• **Security:** KMS, CloudTrail for compliance and monitoring
• **Integration:** API Gateway for microservices

**Current AWS Projects:**
• HIPAA-compliant, serverless NLP pipeline using Bedrock, Lambda, and S3
• Clinical summarization system with RAG architecture
• Large-scale distributed systems for healthcare data processing

I specialize in building production ML systems on AWS that are scalable, secure, and compliant with healthcare regulations.`,
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

• His background and experience in healthcare AI
• Education and Ph.D. research at UAMS
• Technical skills including AWS cloud services and ML
• Production ML systems and projects
• Research publications and citations
• Current work in clinical decision support
• Contact information

What would you like to know specifically?`;
}