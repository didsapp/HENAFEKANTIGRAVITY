"use client";

import Link from "next/link";
import Script from "next/script";

export default function WebinarPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-[var(--color-navy-900)]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-neon-blue)] opacity-[0.05] blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-gold)] opacity-[0.05] blur-[120px] rounded-full" />
      </div>

      <Link 
        href="/" 
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-semibold bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg"
      >
         &larr; Back to Home
      </Link>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto p-6 md:p-12">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Real Estate Webinar</h1>
            <p className="text-gray-400 text-lg">Register below for our upcoming exclusive insights and investment opportunities.</p>
        </div>

        {/* Visme Embed Container wrapper (styled with exact height/bg to prevent pop-in issues if possible) */}
        <div className="shadow-2xl rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md relative min-h-[600px] flex items-center justify-center">
            
            {/* Visme div */}
            <div 
                className="visme_d" 
                data-title="Webinar Registration Form" 
                data-url="x9m86gyq-webinar-registration-form?fullPage=true" 
                data-domain="forms" 
                data-full-page="true" 
                data-min-height="100vh" 
                data-form-id="161717"
            ></div>
            
        </div>
      </div>
      
      {/* Required Script injected securely via Next.js Script */}
      <Script src="https://static-bundles.visme.co/forms/vismeforms-embed.js" strategy="lazyOnload" />
    </div>
  );
}
