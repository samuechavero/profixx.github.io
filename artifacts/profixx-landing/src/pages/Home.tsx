import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Hammer,
  Paintbrush,
  Ruler,
  Wrench,
  Grid2X2,
  HardHat,
  DoorOpen,
  Maximize,
  Bath,
  Home as HomeIcon,
  Fence,
  SquareSquare,
  SquareTerminal,
  ChevronRight,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Reviews } from "@/components/Reviews";

// --- TRANSLATIONS ---
const t = {
  en: {
    navServices: "Services",
    navWhyUs: "Why Us",
    navPortfolio: "Portfolio",
    navContact: "Contact",
    heroH1: "We Transform Your Space. All Solutions in One Call.",
    heroSub: "Professional construction and remodeling. From demolition to finishing touches, we handle every detail with precision and pride.",
    btnHenrry: "Contact Henrry",
    btnKenner: "Contact Kenner",
    servicesTitle: "Our Expertise",
    servicesSub: "Comprehensive contracting solutions. One team, flawless execution.",
    service1Title: "Interior Demolition",
    service1Desc: "Safe, clean, and efficient removal of existing structures to prepare for your new vision.",
    service2Title: "Drywall / Sheetrock",
    service2Desc: "Expert installation and finishing for perfectly smooth, ready-to-paint walls.",
    service3Title: "Wall & Ceiling Texture",
    service3Desc: "Custom texturing services to add character and depth to any room.",
    service4Title: "Interior & Exterior Painting",
    service4Desc: "Flawless application of premium paints to revitalize your property inside and out.",
    service5Title: "Flooring Installation",
    service5Desc: "Precision installation of hardwood, laminate, vinyl, and tile flooring.",
    service6Title: "Baseboards & Trim",
    service6Desc: "Detailed woodwork that adds the perfect finishing touch to your spaces.",
    service7Title: "Door Installation",
    service7Desc: "Professional hanging of interior and exterior doors for security and style.",
    service8Title: "Cabinets & Backsplash",
    service8Desc: "Custom cabinetry installation and beautiful tile backsplashes for your kitchen.",
    service9Title: "Bathroom Remodeling",
    service9Desc: "Complete transformations including tile work, vanities, and fixtures.",
    service10Title: "Siding Installation",
    service10Desc: "Durable and attractive exterior siding repair and installation.",
    service11Title: "Fence Installation",
    service11Desc: "Secure, high-quality fencing solutions for privacy and curb appeal.",
    service12Title: "Deck & Porch",
    service12Desc: "Custom outdoor living spaces built for relaxation and entertainment.",
    service13Title: "Window & Exterior",
    service13Desc: "Energy-efficient window installations and exterior improvements.",
    whyUsTitle: "Why Choose PROFIXX",
    whyUsSub: "We build trust by building it right.",
    why1Title: "One-Stop Solution",
    why1Desc: "No need to juggle multiple contractors. We handle everything from start to finish.",
    why2Title: "Uncompromising Quality",
    why2Desc: "We use premium materials and proven techniques to ensure lasting results.",
    why3Title: "On-Time Execution",
    why3Desc: "We respect your time and property, delivering projects on schedule.",
    why4Title: "Experienced Craftsmen",
    why4Desc: "Decades of combined experience brought to every single detail of your project.",
    portfolioTitle: "Our Work",
    portfolioSub: "A glimpse into spaces we've transformed.",
    footerReady: "Ready to start your project?",
    footerContact: "Get in touch today for a free consultation and estimate.",
    copyright: "© 2025 PROFIXX. All Rights Reserved."
  },
  es: {
    navServices: "Servicios",
    navWhyUs: "Por Qué Nosotros",
    navPortfolio: "Portafolio",
    navContact: "Contacto",
    heroH1: "Transformamos Tu Espacio. Todas las Soluciones en Una Sola Llamada.",
    heroSub: "Construcción y remodelación profesional. Desde la demolición hasta los acabados, manejamos cada detalle con precisión y orgullo.",
    btnHenrry: "Contactar a Henrry",
    btnKenner: "Contactar a Kenner",
    servicesTitle: "Nuestra Experiencia",
    servicesSub: "Soluciones integrales de contratación. Un equipo, ejecución impecable.",
    service1Title: "Demolición Interior",
    service1Desc: "Remoción segura, limpia y eficiente de estructuras existentes para preparar su nueva visión.",
    service2Title: "Drywall / Sheetrock",
    service2Desc: "Instalación experta y acabado para paredes perfectamente lisas y listas para pintar.",
    service3Title: "Textura de Paredes y Techos",
    service3Desc: "Servicios de texturizado personalizados para agregar carácter y profundidad a cualquier habitación.",
    service4Title: "Pintura Interior y Exterior",
    service4Desc: "Aplicación impecable de pinturas premium para revitalizar su propiedad por dentro y por fuera.",
    service5Title: "Instalación de Pisos",
    service5Desc: "Instalación precisa de pisos de madera, laminados, vinilo y baldosas.",
    service6Title: "Zócalos y Molduras",
    service6Desc: "Trabajo en madera detallado que agrega el toque final perfecto a sus espacios.",
    service7Title: "Instalación de Puertas",
    service7Desc: "Colocación profesional de puertas interiores y exteriores para seguridad y estilo.",
    service8Title: "Gabinetes y Backsplash",
    service8Desc: "Instalación de gabinetes personalizados y hermosos salpicaderos de azulejos para su cocina.",
    service9Title: "Remodelación de Baños",
    service9Desc: "Transformaciones completas que incluyen trabajo de azulejos, tocadores y accesorios.",
    service10Title: "Instalación de Revestimiento (Siding)",
    service10Desc: "Reparación e instalación de revestimiento exterior duradero y atractivo.",
    service11Title: "Instalación de Cercas",
    service11Desc: "Soluciones de cercado seguras y de alta calidad para privacidad y atractivo visual.",
    service12Title: "Construcción de Decks y Porches",
    service12Desc: "Espacios de vida al aire libre personalizados construidos para la relajación y el entretenimiento.",
    service13Title: "Ventanas y Exteriores",
    service13Desc: "Instalaciones de ventanas de eficiencia energética y mejoras exteriores.",
    whyUsTitle: "Por Qué Elegir PROFIXX",
    whyUsSub: "Construimos confianza haciéndolo bien.",
    why1Title: "Solución Integral",
    why1Desc: "No es necesario lidiar con múltiples contratistas. Manejamos todo de principio a fin.",
    why2Title: "Calidad Intransigente",
    why2Desc: "Utilizamos materiales premium y técnicas probadas para garantizar resultados duraderos.",
    why3Title: "Ejecución a Tiempo",
    why3Desc: "Respetamos su tiempo y propiedad, entregando los proyectos a tiempo.",
    why4Title: "Artesanos Experimentados",
    why4Desc: "Décadas de experiencia combinada aplicadas a cada detalle de su proyecto.",
    portfolioTitle: "Nuestro Trabajo",
    portfolioSub: "Un vistazo a los espacios que hemos transformado.",
    footerReady: "¿Listo para comenzar su proyecto?",
    footerContact: "Póngase en contacto hoy para una consulta y presupuesto gratuito.",
    copyright: "© 2025 PROFIXX. Todos los derechos reservados."
  }
};

const whatsappLinks = {
  henrry: "https://wa.me/13467372420?text=Hola%20quiero%20un%20presupuesto",
  kenner: "https://wa.me/19563387242?text=Hola%20quiero%20un%20presupuesto"
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const c = t[lang];
  const [emblaRef] = useEmblaCarousel({ loop: true });

  const services = [
    { icon: <Hammer className="h-6 w-6" />, title: c.service1Title, desc: c.service1Desc },
    { icon: <SquareSquare className="h-6 w-6" />, title: c.service2Title, desc: c.service2Desc },
    { icon: <Maximize className="h-6 w-6" />, title: c.service3Title, desc: c.service3Desc },
    { icon: <Paintbrush className="h-6 w-6" />, title: c.service4Title, desc: c.service4Desc },
    { icon: <Grid2X2 className="h-6 w-6" />, title: c.service5Title, desc: c.service5Desc },
    { icon: <Ruler className="h-6 w-6" />, title: c.service6Title, desc: c.service6Desc },
    { icon: <DoorOpen className="h-6 w-6" />, title: c.service7Title, desc: c.service7Desc },
    { icon: <SquareTerminal className="h-6 w-6" />, title: c.service8Title, desc: c.service8Desc },
    { icon: <Bath className="h-6 w-6" />, title: c.service9Title, desc: c.service9Desc },
    { icon: <HomeIcon className="h-6 w-6" />, title: c.service10Title, desc: c.service10Desc },
    { icon: <Fence className="h-6 w-6" />, title: c.service11Title, desc: c.service11Desc },
    { icon: <HardHat className="h-6 w-6" />, title: c.service12Title, desc: c.service12Desc },
    { icon: <Wrench className="h-6 w-6" />, title: c.service13Title, desc: c.service13Desc },
  ];

  const portfolioImages = [
    "WhatsApp Image 2026-04-16 at 21.52.05.jpeg",
    "WhatsApp Image 2026-04-16 at 21.53.32.jpeg",
    "WhatsApp Image 2026-04-16 at 21.52.08.jpeg",
    "WhatsApp Image 2026-04-16 at 21.52.03.jpeg",
    "WhatsApp Image 2026-04-16 at 21.53.35.jpeg",
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-primary">PROFIXX</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#services" className="hover:text-primary transition-colors">{c.navServices}</a>
            <a href="#why-us" className="hover:text-primary transition-colors">{c.navWhyUs}</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">{c.navPortfolio}</a>
            <a href="#contact" className="hover:text-primary transition-colors">{c.navContact}</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex bg-muted rounded-full p-1">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === "en" ? "bg-white text-primary shadow-sm" : "text-muted-foreground"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("es")}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === "es" ? "bg-white text-primary shadow-sm" : "text-muted-foreground"}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src="houston-skyline-custom.jpg" 
            alt="Houston Skyline background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/90 bg-gradient-to-t from-primary/95 to-primary/80"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
              {c.heroH1}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
              {c.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={whatsappLinks.henrry} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-[#25D366]/20"
              >
                <Phone className="w-5 h-5" />
                {c.btnHenrry}
              </a>
              <a 
                href={whatsappLinks.kenner} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-[#25D366]/20"
              >
                <Phone className="w-5 h-5" />
                {c.btnKenner}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <Reviews lang={lang} />

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{c.servicesTitle}</h2>
            <p className="text-muted-foreground text-lg">{c.servicesSub}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Card className="h-full border-border/50 hover:border-primary/20 transition-all hover:shadow-md bg-card">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                    <p className="text-muted-foreground flex-grow text-sm leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-us" className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.whyUsTitle}</h2>
            <p className="text-primary-foreground/80 text-lg">{c.whyUsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{c.why1Title}</h3>
              <p className="text-primary-foreground/70">{c.why1Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{c.why2Title}</h3>
              <p className="text-primary-foreground/70">{c.why2Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{c.why3Title}</h3>
              <p className="text-primary-foreground/70">{c.why3Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{c.why4Title}</h3>
              <p className="text-primary-foreground/70">{c.why4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{c.portfolioTitle}</h2>
            <p className="text-muted-foreground text-lg">{c.portfolioSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioImages.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group shadow-lg"
              >
                <img 
                  src={src} 
                  alt={`Portfolio item ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER & CONTACT */}
      <footer id="contact" className="bg-muted pt-20 pb-10 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{c.footerReady}</h2>
            <p className="text-lg text-muted-foreground mb-10">{c.footerContact}</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a 
                href={whatsappLinks.henrry} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:scale-105 shadow-md"
              >
                <Phone className="w-5 h-5" />
                {c.btnHenrry}
              </a>
              <a 
                href={whatsappLinks.kenner} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-md font-bold text-lg transition-all hover:scale-105 shadow-md"
              >
                <Phone className="w-5 h-5" />
                {c.btnKenner}
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <Mail className="w-5 h-5" />
              <a href="mailto:Profixxdesig@gmail.com" className="hover:underline">Profixxdesig@gmail.com</a>
            </div>
          </div>
          
          <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <div className="font-black text-xl text-primary tracking-tight mb-4 md:mb-0">PROFIXX</div>
            <p>{c.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
