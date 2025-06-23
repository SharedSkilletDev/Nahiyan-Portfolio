import { createEmbedding } from './embedding';
import { generateCompletion } from './completion';
import { chunkText } from './chunking';
import { findSimilarChunks } from './retrieval';

// Knowledge base from the provided information
const KNOWLEDGE_BASE = `
Nahiyan Bin Noor - Knowledge Base (Detailed)

About Me: A Detailed Summary
I am Nahiyan Bin Noor, a passionate and driven Data Scientist, Machine Learning Engineer, and US Permanent Resident, currently advancing my expertise as a Ph.D. candidate in Biomedical Informatics at the University of Arkansas for Medical Sciences (UAMS). With a strong foundation in Electrical & Electronic Engineering and a Master's degree in Information Science, my career is focused on the intersection of healthcare and artificial intelligence. I specialize in developing sophisticated, AI-powered applications designed to tackle complex challenges in the medical field. My core expertise lies in creating robust predictive models, building advanced Natural Language Processing (NLP) systems, and designing and deploying full-stack data solutions. I am particularly skilled in Retrieval-Augmented Generation (RAG) architectures and leveraging Large Language Models (LLMs) to innovate. My work is dedicated to improving patient outcomes and enhancing operational efficiency within clinical settings through actionable, data-driven insights.

Education and Academic Excellence
My academic journey is marked by a consistent record of high achievement and a commitment to continuous learning.

Ph.D. in Biomedical Informatics (Part-time, Expected Dec 2027)
University of Arkansas for Medical Sciences (UAMS), Little Rock, AR
My current research focuses on leveraging large-scale healthcare data (including Epic Cosmos) to build predictive models and clinical decision support tools.

Master of Science in Information Science (May 2023)
University of Arkansas at Little Rock (UALR), Little Rock, AR
Graduated with an outstanding CGPA of 3.90/4.00.
Recipient of the "Outstanding Graduate Student" (2022-2023) and "Outstanding Masters Student" (2021-2022) awards.

Graduate Certificate in Data Science (May 2023)
University of Arkansas at Little Rock (UALR), Little Rock, AR
Achieved a perfect CGPA of 4.00/4.00, demonstrating specialized expertise in database architecture, data privacy, and visualization.

B.Sc. in Electrical & Electronic Engineering (Oct 2019)
Chittagong University of Engineering & Technology (CUET), Bangladesh
Graduated with a CGPA of 3.54/4.00.
Received scholarships in every semester for academic excellence.

Professional and Research Experience
I have over four years of professional experience, applying my skills in diverse and challenging environments.

Intermediate Data Analyst | Institute for Digital Health and Innovation, UAMS (June 2023 - Present)
I design and deploy ML-powered clinical decision support tools, notably improving patient risk stratification (AUC-ROC: 0.76, F1-score: 0.88).
I engineer predictive models using Gradient Boosting on large Veterans Health Administration (VHA) datasets to identify patients at high risk of opioid misuse and treatment dropout. This work has contributed to a measurable reduction in opioid-related emergency visits.
I collaborate with clinical, operational, and HR teams to develop capacity forecasting models, optimizing workforce allocation.
My work on evaluating telehealth's impact on Opioid Use Disorder (OUD) outcomes using Epic Cosmos data from ~180k patients showed that telehealth modestly reduced ED visits and slightly increased medication receipt, supporting its continued use.

Data Scientist & Research Assistant | COSMOS Research Center, UALR (Aug 2021 - May 2023)
I developed an NLP-based toxicity classification model with 83% accuracy for real-time content moderation.
I mined and analyzed over 2 million Reddit posts using the Pushshift API to study online toxicity and community dynamics, presenting these findings at international conferences.

Electrical Data Analyst | Renata Limited (Nov 2019 - July 2021)
I led predictive maintenance projects that resulted in a 20% reduction in equipment downtime.
I supervised a team of over 30 engineers to optimize HVAC systems, which boosted energy efficiency and cut operational costs.

Key Projects & Technical Portfolio (From GitHub)
My GitHub profile showcases a variety of projects that highlight my technical skills and passion for building practical AI solutions.

PubMedSearch - Medical Research Assistant: An AI-powered research assistant built with Python and Streamlit that helps medical professionals efficiently search, analyze, and query PubMed literature using the OpenAI API.

USMLE Step 1 Assistant: A sophisticated medical education tool leveraging a RAG architecture with long-term memory to provide context-aware answers to complex medical questions.

Predicting Dropout from MOUD: A project focused on predicting patient dropout from Medication for Opioid Use Disorder, demonstrating my skills in healthcare predictive analytics.

Anemia Detection from Eye Images: This project involves using machine learning to detect anemia from conjunctiva images, showcasing my expertise in computer vision and medical image analysis.

Stock Market Analyzer & Reporter: A comprehensive Streamlit web app that integrates financial data APIs and LLMs to provide technical analysis, sentiment analysis, SWOT reports, and even voice-generated summaries.

ResearchBuddy AI: A versatile, multi-model AI chatbot that integrates with OpenAI, Gemini, and Llama APIs and supports analysis of various document formats (PDF, TXT, CSV).

Chest Disease Classification System: An end-to-end ML pipeline for classifying chest diseases from CT scans, utilizing TensorFlow, DVC for data versioning, MLflow for experiment tracking, and a Flask/Streamlit-based deployment.

Publications & Research Contributions
I am an active contributor to the scientific community with 152 citations on Google Scholar.

Best Paper Award at The Ninth International Conference on Human and Social Analytics (HUSO 2023) for the paper "Comparing Toxicity Across Social Media Platforms for COVID 19 Discourse".

Key Publications:
"Association between different modalities of opioid use disorder-related care delivery and opioid use disorder-related patient outcomes" in Addictive Behaviors Reports.
"Development and validation of machine-learning algorithms predicting retention, overdoses, and all-cause mortality among US military veterans..." in the Journal of Addictive Diseases.
"Toxicity in Reddit Discussion Threads: Impacts and Predictive Insights" at the 16th International Conference on Social Computing, Behavioral-Cultural Modeling Prediction...
"Comparative Study Between Decision Tree, SVM, and KNN to Predict Anaemic Condition" in IEEE Xplore. (Cited by 36)

Skills & Certifications
Programming & Databases: Python, SQL
AI/ML Frameworks: TensorFlow, PyTorch, ONNX
Web & Deployment: Streamlit, Flask, React
ML & AI Concepts: LLMs, RAG, Fine-tuning, NLP, Computer Vision, MLOps
Tools: MLflow, DVC, Git, Docker
Data Science: Predictive Analytics, Statistical Analysis, Data Visualization, Experimental Design

Certifications:
EPIC COSMOS Data Model
AWS Certified Cloud Practitioner
AWS AI Practitioner

Community Involvement & Leadership
Treasurer: Graduate Student Association & Bangladesh Student Organization at UALR (2022-2023)
Branch Chairperson: IEEE Student Branch CUET (2018-2019)
Volunteer: National High School Science Bowl, Little Rock (2023)
Member: Society of Women Engineers (2022-2023)

Contact Information:
Email: nahiyan.cuet@gmail.com
Phone: +1 501 539 3633
LinkedIn: https://www.linkedin.com/in/nahiyan-bin-noor-0a2170158/
GitHub: https://github.com/Nahiyan140212
`;

// Initialize the knowledge base chunks and embeddings
let knowledgeChunks: Array<{ text: string; embedding?: number[] }> = [];
let isInitialized = false;

async function initializeKnowledgeBase() {
  if (isInitialized) return;
  
  try {
    // Chunk the knowledge base
    const chunks = chunkText(KNOWLEDGE_BASE, 500, 50);
    
    // Create embeddings for each chunk
    knowledgeChunks = await Promise.all(
      chunks.map(async (chunk) => {
        try {
          const embedding = await createEmbedding(chunk);
          return { text: chunk, embedding };
        } catch (error) {
          console.warn('Failed to create embedding for chunk:', error);
          return { text: chunk };
        }
      })
    );
    
    isInitialized = true;
    console.log(`Knowledge base initialized with ${knowledgeChunks.length} chunks`);
  } catch (error) {
    console.error('Failed to initialize knowledge base:', error);
    // Fallback: use chunks without embeddings
    knowledgeChunks = chunkText(KNOWLEDGE_BASE, 500, 50).map(text => ({ text }));
    isInitialized = true;
  }
}

export async function ragQuery(query: string): Promise<string> {
  try {
    // Initialize knowledge base if not already done
    await initializeKnowledgeBase();
    
    // Create embedding for the query
    let queryEmbedding: number[] | undefined;
    try {
      queryEmbedding = await createEmbedding(query);
    } catch (error) {
      console.warn('Failed to create query embedding:', error);
    }
    
    // Find relevant chunks
    const relevantChunks = findSimilarChunks(
      query,
      knowledgeChunks,
      queryEmbedding,
      5 // Top 5 most relevant chunks
    );
    
    // Create context from relevant chunks
    const context = relevantChunks.map(chunk => chunk.text).join('\n\n');
    
    // Generate response using the context
    const prompt = `You are Nahiyan Bin Noor's AI assistant. Use the following information about Nahiyan to answer the user's question accurately and helpfully. If the information isn't available in the context, politely say so and suggest contacting Nahiyan directly.

Context about Nahiyan:
${context}

User Question: ${query}

Please provide a helpful and accurate response based on the information provided:`;

    const response = await generateCompletion(prompt);
    return response;
    
  } catch (error) {
    console.error('RAG query failed:', error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again later or contact Nahiyan directly at nahiyan.cuet@gmail.com.";
  }
}