"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Building2,
  Target,
  Globe,
  Handshake,
  MapPin,
  Briefcase,
  HardHat,
  Boxes,
  Wrench,
  Landmark,
  Ship,
  Monitor,
  Home,
  ChevronRight,
} from "lucide-react";

const coreServices = [
  { icon: <HardHat size={22} />, label: "Construction Management" },
  { icon: <Monitor size={22} />, label: "Information Technology" },
  { icon: <Building2 size={22} />, label: "Construction" },
  { icon: <Briefcase size={22} />, label: "Consulting" },
  { icon: <Wrench size={22} />, label: "Engineering" },
  { icon: <Landmark size={22} />, label: "Real Estate" },
  { icon: <MapPin size={22} />, label: "Geo-Tech" },
  { icon: <Boxes size={22} />, label: "Building Materials" },
  { icon: <Ship size={22} />, label: "Maritime Logistics" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[var(--color-gold)] text-sm font-semibold tracking-wider uppercase">
            Who We Are
          </span>
          <h1 className="text-5xl font-bold text-white mt-3 mb-6">
            About Henafek Homes
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A Digital Construction and Investment Management Company driving Sustainable Education and the Green Economy across the globe.
          </p>
        </motion.div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[var(--color-neon-blue)] text-xs font-bold tracking-widest uppercase">
              Est. August 2023 — Lagos, Nigeria
            </span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-6">
              Our Story
            </h2>
            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>
                <span className="text-white font-semibold">Henafek Homes And Investment Limited</span> is a Digital Construction and Investment Management Company. Established in August 2023, we are geographically located between Lagos and Ogun state boundary town.
              </p>
              <p>
                This strategic location of our head office at <span className="text-white font-medium">22A Bola Oshikoya. Eaton Palace B/Stop, Alagbole-Yakoyo Road, Ogun state</span> has brought a strong alliance between our organisation and Building Materials Factories Representatives and Manufacturers Representatives in discounted products prices.
              </p>
              <p>
                However, in recent time, our organisation is an advocate in promoting <span className="text-[var(--color-neon-blue)] font-medium">Green Technology</span> and its sustainability in the built environment.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden border border-white/10 min-h-[320px] relative"
          >
            <Image
              src="/about-story.jpg"
              alt="Modern high-rise buildings representing Henafek Homes infrastructure"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)]/60 to-transparent" />
          </motion.div>
        </div>

        {/* Mission & Priority */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden border border-white/10 lg:order-1 min-h-[320px] relative"
          >
            <Image
              src="/about-home.jpg"
              alt="Beautiful modern home representing the Home at Ease vision"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)]/60 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:order-2"
          >
            <span className="text-[var(--color-gold)] text-xs font-bold tracking-widest uppercase">
              Our Primary Priority
            </span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-6">
              Green Economy & Technology
            </h2>
            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>
                Advocating by leveraging on the use of skills and Technology, Alliance with thinkers where information meets with knowledge to promote Green Economy is our Primary priority at <span className="text-white font-semibold">Henafek Homes And Investment Limited</span>.
              </p>
              <p>
                We have worked with reliable forward thinkers in planning and execution of Construction projects in cognisance using models like <span className="text-white font-medium">Digital Construction, Building Information Modelling, Emerging Technology and Software, Leadership Management</span> and Business Development skills. This is to facilitate the Green Economy and shape the Future of the Construction Industry.
              </p>
            </div>
            <div className="glass p-6 border-l-4 border-l-[var(--color-neon-blue)] bg-white/5 mt-8">
              <p className="text-xl text-white italic leading-relaxed font-medium">
                &ldquo;This remarkable approach has given our organisation an exceedingly exceptional performance of service delivery to the Public.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="text-[var(--color-neon-blue)] text-xs font-bold tracking-widest uppercase">
              What We Do
            </span>
            <h2 className="text-3xl font-bold text-white mt-3">
              Our Core Services
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {coreServices.map((s, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass p-5 flex items-center gap-4 hover:translate-y-[-3px] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-gold)] group-hover:text-[#020617] transition-all duration-300">
                  {s.icon}
                </div>
                <span className="text-white font-medium text-sm">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners & Global Presence */}
        <div id="partners">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Handshake size={28} className="text-[var(--color-gold)]" />
              <h2 className="text-3xl font-bold text-white">
                Partners & Global Presence
              </h2>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We work in alliance and collaborate with Consulting firms based in North/Latin America, Europe, and across Africa to profer solutions to clients requests on series of Construction projects and Sustainable Education on Green Technology in respects to Best standard Ethical Practises and Building Codes within Construction Industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 border-t-2 border-t-[var(--color-gold)] hover:translate-y-[-5px] transition-all duration-300"
            >
              <h3 className="text-white text-xl font-bold mb-2 tracking-wide">
                Offscore Support Group Service Ltd, Lekki
              </h3>
              <p className="text-gray-400 font-medium">Indigenous corresponding partner.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 border-t-2 border-t-[var(--color-neon-blue)] hover:translate-y-[-5px] transition-all duration-300"
            >
              <h3 className="text-white text-xl font-bold mb-2 tracking-wide">
                D&apos;Meros Property And Investment Ltd, Ikeja
              </h3>
              <p className="text-gray-400 font-medium">Indigenous corresponding partner.</p>
            </motion.div>
          </div>

          {/* Global Offices */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[var(--color-gold)] font-semibold tracking-widest uppercase text-xs mb-8">
              Corresponding Offices
            </p>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { region: "North/Latin America", icon: <Globe size={28} /> },
                { region: "Europe", icon: <Globe size={28} /> },
                { region: "Africa", icon: <Globe size={28} /> },
              ].map((office, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 text-center group hover:translate-y-[-4px] transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-[var(--color-neon-blue)] mx-auto mb-4 group-hover:bg-[var(--color-neon-blue)] group-hover:text-[#020617] transition-all duration-300">
                    {office.icon}
                  </div>
                  <span className="text-white font-bold text-sm tracking-wider uppercase">
                    {office.region}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Icons */}
          <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto pt-10 border-t border-white/5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-[#020617] transition-all duration-300">
                <Globe size={24} />
              </div>
              <span className="text-gray-400 font-bold tracking-widest uppercase text-sm">
                Global Reach
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-[var(--color-neon-blue)] group-hover:bg-[var(--color-neon-blue)] group-hover:text-[#020617] transition-all duration-300">
                <Building2 size={24} />
              </div>
              <span className="text-gray-400 font-bold tracking-widest uppercase text-sm">
                Strategic Offices
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
