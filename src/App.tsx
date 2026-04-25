
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trees, 
  Hammer, 
  Utensils, 
  GraduationCap, 
  ChevronRight, 
  Menu, 
  X,
  Mail,
  Instagram,
  Facebook,
  Phone,
  CheckCircle2,
  ChevronLeft,
  Settings,
  ShieldCheck,
  Cpu
} from "lucide-react";

// --- Types ---
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  details?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Servicios", href: "#servicios" },
    { name: "Productos", href: "#productos" },
    { name: "Restauración", href: "#restauracion" },
    { name: "Cursos", href: "#cursos" },
    { name: "Equipo", href: "#equipo" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-stone-950/90 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-sm text-white font-serif italic text-2xl shadow-lg">P</div>
          <span className="text-white font-serif text-2xl tracking-[0.2em] uppercase font-light">Puerto Maderero</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-stone-400 hover:text-accent text-[10px] font-bold uppercase tracking-[0.2em] transition-all">
              {link.name}
            </a>
          ))}
          <button className="bg-accent hover:bg-accent/80 text-white px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all shadow-xl shadow-accent/20">
            Contacto
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 bg-stone-950 z-40 p-10 flex flex-col justify-center items-center gap-8"
          >
            <button className="absolute top-8 right-10 text-white" onClick={() => setIsOpen(false)}><X size={32} /></button>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-stone-300 hover:text-accent text-3xl font-serif tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const RestorationSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const relativeX = x - rect.left;
    const percentage = (relativeX / rect.width) * 100;
    setSliderPos(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-10 gap-6">
        <div className="space-y-2">
          <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold">Rescate de Herencia</span>
          <h2 className="text-5xl font-serif text-white">Restauración Integral</h2>
        </div>
        <p className="max-w-md text-stone-500 italic text-sm text-right">
          "Devolvemos la vida a muebles olvidados con técnicas de lijado profundo, ebanistería tradicional y acabados de autor."
        </p>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full max-w-5xl mx-auto aspect-video rounded border border-white/10 overflow-hidden cursor-ew-resize shadow-[0_0_50px_rgba(0,0,0,0.5)] select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* After Image (Below) */}
        <img 
          src="https://picsum.photos/seed/wood_restored_2/1200/800" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Restored piece"
          referrerPolicy="no-referrer"
        />
        
        {/* Before Image (Above/Clipped) */}
        <div 
          className="absolute inset-0 w-full h-full object-cover overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img 
            src="https://picsum.photos/seed/wood_worn_2/1200/800" 
            className="w-full h-full object-cover grayscale contrast-125 brightness-75"
            alt="Worn piece"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Labels */}
        <div className="absolute bottom-6 left-6 text-[10px] uppercase font-bold text-white/50 tracking-widest bg-black/40 px-3 py-1 backdrop-blur-md border border-white/10">Antes</div>
        <div className="absolute bottom-6 right-6 text-[10px] uppercase font-bold text-white tracking-widest bg-accent/60 px-3 py-1 backdrop-blur-md border border-accent/20">Después</div>

        {/* Divider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-[1px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-2xl text-black font-bold text-xs ring-4 ring-black/40">
            ||
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }: { course: Course; key?: string | number }) => {
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setShowForm(false); setSubmitted(false); }, 3000);
  };

  return (
    <motion.div 
      className="bg-[#141414] border border-white/5 overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden border-b border-white/5">
        <img 
          src={course.image} 
          className="w-full h-full object-cover opacity-60" 
          alt={course.title}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-stone-950 to-transparent">
          <div className="flex gap-2 mb-3">
             {course.tags.map(tag => (
               <span key={tag} className="text-[8px] uppercase tracking-widest border border-white/20 px-2 py-1 text-stone-400">{tag}</span>
             ))}
          </div>
          <h3 className="text-white font-serif text-3xl">{course.title}</h3>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <p className="text-stone-500 mb-8 text-xs leading-relaxed uppercase tracking-wide">{course.description}</p>
        
        <div className="mt-auto">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.button 
                key="btn"
                onClick={() => setShowForm(true)}
                className="w-full bg-accent text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent/80 transition-all"
              >
                Solicitar Información
              </motion.button>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-3"
              >
                {submitted ? (
                  <div className="text-center py-4 text-accent font-bold text-[10px] uppercase tracking-widest">
                    ¡Registrado! Te contactaremos.
                  </div>
                ) : (
                  <>
                    <input type="text" placeholder="Nombre Completo" className="w-full bg-transparent border border-white/20 p-3 text-[10px] text-white focus:outline-none focus:border-accent" required />
                    <input type="email" placeholder="Correo Electrónico" className="w-full bg-transparent border border-white/20 p-3 text-[10px] text-white focus:outline-none focus:border-accent" required />
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 bg-accent text-white text-[10px] p-3 font-bold uppercase tracking-widest">Enviar</button>
                      <button type="button" onClick={() => setShowForm(false)} className="px-4 border border-white/20 text-stone-400 hover:text-white"><X size={14} /></button>
                    </div>
                  </>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const TeamMemberCard = ({ member }: { member: TeamMember; key?: string | number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-[3/4] overflow-hidden border border-white/10 group">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent" />
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="text-xl font-serif text-white tracking-widest">{member.name}</h4>
          <p className="text-accent uppercase tracking-[0.2em] text-[10px] font-bold mt-1">{member.role}</p>
        </div>
        <p className="text-stone-500 text-[11px] leading-relaxed italic">{member.bio}</p>
        {member.details && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[9px] uppercase tracking-widest border-b border-accent text-accent font-bold hover:text-white hover:border-white transition-all pb-1"
          >
            {isExpanded ? "Ver Menos" : "Trayectoria Completa"}
          </button>
        )}
        <AnimatePresence>
          {isExpanded && member.details && (
            <motion.div 
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: "auto", opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               className="overflow-hidden"
            >
              <p className="text-[10px] text-stone-400 leading-relaxed font-light bg-white/5 p-4 border-l border-accent whitespace-pre-wrap">
                {member.details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  const courses: Course[] = [
    {
      id: "1",
      title: "Hacé tu primer mueble",
      description: "Aprendé las bases de la carpintería: cortes, ensambles y acabados mientras construís tu propio mueble desde cero.",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
      tags: ["Principiante", "Ebanistería"]
    },
    {
      id: "2",
      title: "Madera y Resina",
      description: "Explora la fusión de la naturaleza y la química. Diseñá piezas con resina epoxi y maderas nobles.",
      image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=800",
      tags: ["Técnica Avanzada", "Fusión"]
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Matías Racedo",
      role: "Carpintería Maestranza",
      bio: "Un ebanista con la chispa del Chómpiras pero la precisión de un relojero.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      details: "Matías es el alma creativa del taller. Su enfoque en la carpintería maciza combina años de oficio con una gran energía de trabajo. Se especializa en dar forma a lo que parece imposible, siempre con una sonrisa y una herramienta especializada en mano."
    },
    {
      name: "Gustavo Dell´Era",
      role: "Música & Educación Agraria",
      bio: "Saxofonista, profesor de matemáticas y docente en centros de transformación social.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
      details: `Nacido el 16 de diciembre de 1988 en Hurlingham. Formado en magia, circo y teatro en centros municipales. Estudió en la escuela de El Bar Mágico y el Circo Criollo.

Saxofonista de La William C (cumbia colombiana) y Profesor de Matemáticas (UTN). Actualmente enseña música en el Centro de Dia San Ignacio y saxo en la Escuela Leopoldo Marechal. Aporta la armonía y la métrica exacta a nuestros proyectos de diseño.`
    },
    {
      name: "Santiago Deguiz",
      role: "Ing. Agrónomo • Poda Consciente",
      bio: "Ingeniero agrónomo por la UBA, apasionado por la poda consciente y la seguridad forestal.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
      details: `Santiago lidera el proyecto de poda consciente con un enfoque en la salud forestal urbana. Utiliza equipamiento de alpinismo y drones para relevamientos minuciosos.

Graduado de la UBA con experiencia en viveros municipales y docencia. Su objetivo es derribar mitos sobre la poda severa, priorizando la seguridad y el beneficio mutuo entre personas y árboles.`
    },
    {
      name: "Pablo Brusco",
      role: "Arquitectura de Software",
      bio: "Programador y estratega digital. El motor tecnológico detrás del Puerto.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
      details: "Pablo es el responsable de la integración tecnológica del equipo. Desde la gestión de sistemas hasta el soporte para el monitoreo forestal, asegura que Puerto Maderero opere con la eficiencia de una empresa del siglo XXI sin perder el corazón artesanal."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] selection:bg-accent selection:text-white font-sans text-stone-200 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558231010-09689e4c8651?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-30 invert brightness-150 grayscale" 
            alt="Workshop background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl space-y-10"
          >
            <div className="flex items-center gap-4 text-accent text-[10px] font-bold uppercase tracking-[0.5em]">
              <span className="w-12 h-[1px] bg-accent" />
              Saber de Origen • Hurlingham & Puerto Madero
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif text-white leading-[1.1]">
              Artesanía, <br /> 
              <span className="font-serif italic font-light text-accent">Agronomía & Técnica</span>
            </h1>
            
            <p className="text-lg text-stone-400 max-w-xl font-light leading-relaxed uppercase tracking-wider">
              Cuatro especialistas dedicados a la madera, la poda consciente y la tecnología aplicada a la naturaleza.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-6">
              <button className="bg-accent hover:bg-accent/80 text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-all border border-accent">
                Explorar Servicios
              </button>
              <button className="bg-transparent border border-white/20 hover:border-white text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-all backdrop-blur-sm">
                Trayectoria
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Services Section */}
      <section id="servicios" className="py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">Capacidades</span>
                <h2 className="text-5xl font-serif text-white leading-tight">Servicios de precisión con base científica.</h2>
                <p className="text-stone-500 font-light leading-relaxed">
                  No cortamos por cortar. Aplicamos diagnósticos agronómicos, relevamientos con drones y técnicas de alpinismo seguro para cada intervención forestal en altura.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Poda en Altura Controlada", cat: "Alpinismo Industrial" },
                  { title: "Carpintería a Medida", cat: "Madera de Autor" },
                  { title: "Agronomía & Sanidad", cat: "Relevamiento Científico" },
                  { title: "Consultoría de Riesgo", cat: "Evaluación Técnica" }
                ].map((s, idx) => (
                  <div key={idx} className="flex justify-between items-end border-b border-white/5 pb-4 group cursor-pointer hover:border-accent transition-colors">
                    <span className="text-sm uppercase tracking-widest font-medium text-stone-300 group-hover:text-white">{s.title}</span>
                    <span className="text-accent text-[9px] font-bold uppercase tracking-wider">{s.cat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-fit">
              <div className="aspect-[3/4] bg-stone-900 border border-white/10 overflow-hidden rounded">
                <img src="https://images.unsplash.com/photo-1590234193570-fd62002cd430?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-50" alt="Specialized gear" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-[3/4] bg-stone-900 border border-white/10 overflow-hidden relative top-12 rounded">
                <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-50" alt="Monitoring" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="productos" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-5xl font-serif flex flex-col">
              <span className="text-stone-600 text-sm uppercase tracking-[0.5em] mb-4 font-sans font-bold">Taller</span>
              Muebles & Utensilios
            </h2>
            <div className="bg-white/5 px-6 py-4 rounded border border-white/5 flex gap-10">
               <div>
                 <p className="text-accent font-bold text-[10px] uppercase tracking-widest">Herramental</p>
                 <p className="text-stone-400 text-xs mt-1">Precisión Extrema</p>
               </div>
               <div className="w-[1px] bg-white/10 self-stretch" />
               <div>
                 <p className="text-accent font-bold text-[10px] uppercase tracking-widest">Estilo</p>
                 <p className="text-stone-400 text-xs mt-1">Industrial & Orgánico</p>
               </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { title: "Cocina", desc: "Tablas y cucharas artesanales.", img: "https://picsum.photos/seed/kitchen_tools/800/800" },
               { title: "Hogar", desc: "Muebles de diseño minimalista.", img: "https://picsum.photos/seed/home_furniture_2/800/800" },
               { title: "Personalizados", desc: "Proyectos en resina y metal.", img: "https://picsum.photos/seed/workshop_custom/800/800" }
             ].map((item, idx) => (
               <div key={idx} className="group relative aspect-square overflow-hidden border border-white/5 bg-stone-900">
                  <img src={item.img} className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-all duration-700 scale-110 group-hover:scale-100" alt={item.title} referrerPolicy="no-referrer" />
                  <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                     <p className="text-accent text-[8px] font-bold uppercase tracking-[0.4em] mb-2">{item.title}</p>
                     <h3 className="text-2xl font-serif text-white">{item.desc}</h3>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Restoration Section */}
      <section id="restauracion" className="py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10">
          <RestorationSlider />
        </div>
      </section>

      {/* Courses Section */}
      <section id="cursos" className="py-32 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-10">
          <div className="max-w-2xl mb-20 space-y-6">
             <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Formación</span>
             <h2 className="text-5xl font-serif">Escuela de Oficios</h2>
             <p className="text-stone-500 font-light leading-relaxed">
               Transmisión de saberes tradicionales con herramientas modernas. Cupos limitados para asegurar el aprendizaje personalizado.
             </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4 opacity-50 justify-center">
            <div className="text-[9px] uppercase tracking-widest border border-white/20 px-3 py-1 flex items-center gap-2"><Cpu size={12}/> Cupos Reducidos</div>
            <div className="text-[9px] uppercase tracking-widest border border-white/20 px-3 py-1 flex items-center gap-2"><ShieldCheck size={12}/> Herramental Profesional</div>
            <div className="text-[9px] uppercase tracking-widest border border-white/20 px-3 py-1 flex items-center gap-2"><Settings size={12}/> Experiencia Directa</div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipo" className="py-32 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col items-center text-center mb-20 gap-6">
             <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Identidad</span>
             <h2 className="text-5xl font-serif">Profesionales del Puerto</h2>
             <div className="w-20 h-[1px] bg-accent" />
             <p className="text-stone-500 max-w-2xl text-sm font-light italic leading-relaxed uppercase tracking-widest">
               Un grupo de colegas con herramientas especializadas, drones y una gran energía para trabajar.
             </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {teamMembers.map((member, idx) => (
              <TeamMemberCard key={idx} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-[#0a0a0a] text-stone-600 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-10 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-b border-white/5 pb-16">
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-sm text-white font-serif italic text-xl">P</div>
                  <span className="text-white font-serif text-lg tracking-[0.2em] font-light uppercase">PUERTO MADERERO</span>
                </div>
                <p className="max-w-md text-[10px] leading-relaxed uppercase tracking-[0.1em] font-medium text-stone-500">
                  Oficio tradicional integrado con tecnología forestal. <br /> 
                  Hurlingham & Puerto Madero • Buenos Aires, Argentina.
                </p>
             </div>

             <div className="flex flex-wrap gap-10">
                <div className="flex flex-col gap-3">
                   <p className="text-[9px] uppercase tracking-widest font-black text-accent mb-2">Canales</p>
                   {["Instagram", "WhatsApp", "Behance", "Email"].map(link => (
                     <a key={link} href="#" className="text-[10px] uppercase font-bold text-stone-400 hover:text-white transition-all tracking-wider">{link}</a>
                   ))}
                </div>
             </div>
          </div>
          
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.3em] font-bold">
             <p>© 2026 Puerto Maderero. Todos los derechos reservados.</p>
             <div className="flex gap-10">
                <span className="flex items-center gap-2"><Phone size={12} className="text-accent" /> +54 9 11 3591 4588</span>
                <span className="flex items-center gap-2"><Mail size={12} className="text-accent" /> aguaribaypodas@gmail.com</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
