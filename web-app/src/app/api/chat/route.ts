import { NextResponse } from "next/server";

// Curated knowledge base for Henafek Homes
const knowledgeBase: Record<string, string> = {
  construction: `Henafek Homes offers end-to-end construction services using modern BIM-driven design software. We focus on safety, compliance, and cost optimization. Our projects include high-rise residential buildings, industrial facilities (hotels, shortlets, gas stations), and mainland/island developments.`,
  "real estate": `Our Real Estate services include: Land Documentation (Permits, Approvals, Certificates), Sales of Land, Property Merchandising, BIM-based Remodeling, Shortlet Apartments, and Hotel Accommodation.`,
  engineering: `Our Engineering expertise covers Estate Road Design, Drainage & Sanitation Systems, Waste Management, Geotechnical Surveys, Integrity Testing, and Location Intelligence Analysis.`,
  "building materials": `We provide procurement of high-quality building materials at competitive prices with a digital supply management system.`,
  consulting: `Our Consulting services integrate expertise across Trade, Finance, Investment, and IT. This includes Feasibility Studies, Market Analysis, FDI Advisory, and Enterprise Growth Strategy.`,
  quote: `To get a quote, please provide your project type, location, and estimated scope. You can also reach us at info@henafek.com.`,
  track: `You can track your project by logging into your client portal at the "Dashboard" link in the navbar.`,
  hello: `Hello! Welcome to Henafek Homes. I'm your AI assistant. How can I help you today?`,
  hi: `Hi there! Welcome to Henafek Homes. I'm here to help you with any questions about our services.`,
  default: `Thank you for your interest in Henafek Homes! I can help with information about our services: Construction, Real Estate, Engineering, Building Materials, and Consulting. What would you like to know more about?`,
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (key !== "default" && lower.includes(key)) {
      return value;
    }
  }
  return knowledgeBase.default;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ message: "No message provided" }, { status: 400 });
    }

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Here we can integrate with a real LLM like OpenAI or Gemini if needed
    // const response = await callLLM(message); 
    const response = getResponse(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
