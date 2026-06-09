import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  FileText,
  Link2,
  Moon,
  Sun,
  ChevronUp,
  Cpu,
  Database,
  Terminal,
  Palette,
  Code2,
  GitBranch,
  BarChart3,
  Server,
} from "lucide-react";

// Image Imports
import darkBanner from "./assets/images/regenerated_image_1780961436854.png";
import lightBanner from "./assets/images/user_volcano_banner_1780960794028.png";
import backupLightBanner from "./assets/images/regenerated_image_1780961340822.jpg";
import profileAvatar from "./assets/images/user_avatar_1780960461329.png";
import cursorCloud from "./assets/images/cursor-cloud.png";

export default function App() {
  // Dark/Light mode state (default to dark)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  // Custom states
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
  // Safe Light Banner state with graceful fallback
  const [lightBannerSrc, setLightBannerSrc] = useState<string>(lightBanner);

  // Avatar click counter for secret music popup
  const [clickCount, setClickCount] = useState(0);
  const [showMusicPopup, setShowMusicPopup] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAvatarClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setShowMusicPopup(true);
      setClickCount(0);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Cloud cursor follower
  const cloudRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cloudPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
cloudPos.current.x += (mousePos.current.x - cloudPos.current.x) * 0.015;
cloudPos.current.y += (mousePos.current.y - cloudPos.current.y) * 0.015;

      if (cloudRef.current) {
        cloudRef.current.style.transform = `translate(${cloudPos.current.x - 30}px, ${cloudPos.current.y - 20}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Handle scroll top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update theme on classList
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.style.backgroundColor = "#000000";
    } else {
      root.classList.remove("dark");
      root.style.backgroundColor = "#f9fafb";
    }
  }, [isDarkMode]);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("parthak516@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // PARTHAK click counter for easter egg redirect
  const [parthakClicks, setParthakClicks] = useState(0);

  const handleParthakClick = () => {
    const next = parthakClicks + 1;
    setParthakClicks(next);
    if (next >= 3) {
      setParthakClicks(0);
      window.open("https://superlative-dango-baf2ea.netlify.app/", "_blank");
    }
  };

  // Smooth Scroll offset helper
  const handleScrollTo = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // offset to respect the sticky navigation bar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div id="home" className={`min-h-screen font-sans transition-colors duration-500 selection:bg-neutral-800 selection:text-white ${isDarkMode ? "bg-black text-white" : "bg-gray-50 text-black"}`}>
      
      {/* HEADER NAVIGATION */}
      <header className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md ${isDarkMode ? "bg-black/80 border-b border-neutral-900" : "bg-white/80 border-b border-gray-200"}`}>
        <div id="nav-container" className="max-w-4xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="relative flex items-center">
            <button 
              onClick={() => { handleScrollTo("home"); handleParthakClick(); }}
              className="font-serif text-base sm:text-xl font-bold tracking-widest hover:opacity-80 transition-opacity uppercase cursor-pointer flex items-center justify-center translate-y-[5px]"
            >
              PARTHAK
            </button>
            <div
              ref={cloudRef}
              className="pointer-events-none fixed z-50"
              style={{ left: 0, top: 0 }}
            >
              <img src={cursorCloud} alt="" className="w-20 sm:w-24" />
            </div>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6 md:gap-8 font-serif text-xs sm:text-sm tracking-wide lowercase translate-y-[5px]">
            <button 
              onClick={() => handleScrollTo("home")} 
              className="hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-center"
            >
              Home
            </button>
            <button 
              onClick={() => handleScrollTo("skills")} 
              className="hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-center"
            >
              skills
            </button>
            <button 
              onClick={() => handleScrollTo("projects")} 
              className="hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-center"
            >
              projects
            </button>
            <button 
              onClick={() => handleScrollTo("contact")}
              className="hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-center"
            >
              connect
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 sm:p-2 rounded-full cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center ${isDarkMode ? "bg-neutral-900 text-yellow-400" : "bg-gray-100 text-neutral-800"}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        
        {/* BANNER SECTION */}
        <section className="relative w-full rounded-2xl overflow-visible aspect-[21/9] md:aspect-[16/6] bg-neutral-900 shadow-2xl">
          {/* Light Banner (Base Layer) */}
          <motion.img 
            src={lightBannerSrc}
            alt="Volcano banner light mode" 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            initial={false}
            animate={{ opacity: isDarkMode ? 0 : 1 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            onError={() => {
              setLightBannerSrc(backupLightBanner);
            }}
          />
          
          {/* Dark Banner (Overlying Layer) */}
          <motion.img 
            src={darkBanner}
            alt="Volcano banner dark mode" 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            initial={false}
            animate={{ opacity: isDarkMode ? 1 : 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          />
          
          {/* Circular Overlapping Profile Avatar */}
          <div className="absolute -bottom-16 left-6 md:left-12">
            <motion.button 
              onClick={handleAvatarClick}
              className={`w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden p-1 shadow-xl transition-colors duration-300 cursor-pointer ${isDarkMode ? "bg-black" : "bg-gray-50"}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img 
                src={profileAvatar} 
                alt="Parthak Kumar Portrait" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.button>
          </div>
        </section>

        {/* PROFILE INTRO SECTION */}
        <section className="mt-20 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <motion.h1 
              className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-wide font-medium leading-none text-white dark:text-white"
              style={{ color: isDarkMode ? "#ffffff" : "#111827" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              PARTHAK KUMAR
            </motion.h1>
            
            {/* Social Icons in line with name */}
            <motion.div 
              className={`flex items-center gap-4 transition-all duration-300 ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <a href="https://github.com/parthakk07" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors" title="GitHub">
                <Github size={20} />
              </a>
              <a href="https://x.com/Parthak32315" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors" title="X (Twitter)">
                <Twitter size={18} />
              </a>
              <button onClick={copyEmailToClipboard} className="hover:text-emerald-500 transition-colors cursor-pointer relative" title="Copy Email (parthak516@gmail.com)">
                <Link2 size={20} />
                {isCopied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] py-1 px-2 rounded font-sans tracking-normal whitespace-nowrap">
                    email copied!
                  </span>
                )}
              </button>
              <a href="https://www.linkedin.com/in/parthak-kumar/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors" title="LinkedIn">
                <Linkedin size={20} />
              </a>
            </motion.div>
          </div>

          <motion.p 
            className={`mt-4 font-serif text-md md:text-lg leading-relaxed ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}
            style={{ fontStyle: "italic" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            I'm a first-year BTech student passionate about Machine Learning, Python, and full-stack development. 
            I enjoy turning ideas into products, experimenting with APIs, and building projects that automate boring tasks
          </motion.p>
        </section>

        {/* STACK SECTION */}
        <section id="skills" className="mt-20 pt-10 border-t border-dashed border-neutral-800 dark:border-neutral-900">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-2xl tracking-wide font-medium">Stack I use</h2>
            <p className={`text-md ${isDarkMode ? "text-neutral-400" : "text-gray-500"}`}>
              Technologies I work with
            </p>
          </div>

          {/* Infinite Moving Tech Marquee */}
          <div className="marquee-container relative w-full overflow-hidden mt-12 py-4 select-none">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 25s linear infinite;
              }
              .marquee-container:hover .animate-marquee {
                animation-play-state: paused;
              }
            `}</style>
            
            {/* Ambient side fade masks for nice editorial presentation */}
            <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r ${isDarkMode ? "from-black to-transparent" : "from-white to-transparent"}`} />
            <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l ${isDarkMode ? "from-black to-transparent" : "from-white to-transparent"}`} />
            
            <div className="flex w-max animate-marquee gap-6 md:gap-8">
              {/* First Set of tools */}
              <div className="flex gap-6 md:gap-8">
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="Python" isDarkMode={isDarkMode} icon={<Terminal size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="C" isDarkMode={isDarkMode} icon={<Cpu size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="HTML" isDarkMode={isDarkMode} icon={<Code2 size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="CSS" isDarkMode={isDarkMode} icon={<Palette size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="Git GitHub" isDarkMode={isDarkMode} icon={<GitBranch size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="MySQL" isDarkMode={isDarkMode} icon={<Database size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="data visualization" isDarkMode={isDarkMode} icon={<BarChart3 size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="Linux" isDarkMode={isDarkMode} icon={<Server size={32} strokeWidth={1.5} />} />
                </div>
              </div>

              {/* Second Set of tools for perfect loop wrapping */}
              <div className="flex gap-6 md:gap-8" aria-hidden="true">
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="Python" isDarkMode={isDarkMode} icon={<Terminal size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="C" isDarkMode={isDarkMode} icon={<Cpu size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="HTML" isDarkMode={isDarkMode} icon={<Code2 size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="CSS" isDarkMode={isDarkMode} icon={<Palette size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="Git GitHub" isDarkMode={isDarkMode} icon={<GitBranch size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="MySQL" isDarkMode={isDarkMode} icon={<Database size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="data visualization" isDarkMode={isDarkMode} icon={<BarChart3 size={32} strokeWidth={1.5} />} />
                </div>
                <div className="w-28 sm:w-32 flex-shrink-0">
                  <TechCard name="Linux" isDarkMode={isDarkMode} icon={<Server size={32} strokeWidth={1.5} />} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mt-24 pt-10 border-t border-dashed border-neutral-800 dark:border-neutral-900">
          <h2 className="font-serif text-2xl tracking-wide font-medium uppercase text-left">projects</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            
            {/* Box 1: Chat bot */}
            <ProjectCard 
              title="chat bot"
              isDarkMode={isDarkMode}
              description="An intelligent chatbot capable of answering questions, maintaining context, and assisting with everyday tasks using modern language models."
            />

            {/* Box 2: X bot */}
            <ProjectCard 
              title="x bot"
              isDarkMode={isDarkMode}
              description="An automated social media bot that schedules and posts content, reducing manual effort and maintaining consistent activity."
            />

            {/* Box 3: Weather app */}
            <ProjectCard 
              title="weather app"
              isDarkMode={isDarkMode}
              description="A responsive weather application that provides real-time weather information using public APIs."
            />

          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="mt-24 pt-10 border-t border-dashed border-neutral-800 dark:border-neutral-900">
          <h2 className="font-serif text-2xl tracking-wide font-medium uppercase">education</h2>

          <div className="flex flex-col gap-8 mt-12">
            
            <motion.div 
              className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-1">
                <h3 className={`font-serif text-lg font-medium transition-colors ${isDarkMode ? "text-white group-hover:text-emerald-400" : "text-black group-hover:text-emerald-600"}`}>
                  Maharaja Agrasen Institute Of Technology (MAIT)
                </h3>
                <p className={`font-serif mt-1 text-sm ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                  Bachelor of Technology in Computer Science and Engineering - AI
                </p>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <span className={`font-mono text-xs px-3 py-1 rounded-full border ${isDarkMode ? "bg-neutral-950 border-neutral-800 text-neutral-400" : "bg-neutral-50 border-neutral-200 text-neutral-600"}`}>
                  2025 — 2029
                </span>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex-1">
                <h3 className={`font-serif text-lg font-medium transition-colors ${isDarkMode ? "text-white group-hover:text-emerald-400" : "text-black group-hover:text-emerald-600"}`}>
                  Kendriya Vidyalaya
                </h3>
                <p className={`font-serif mt-1 text-sm ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                  Higher Secondary Education
                </p>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <span className={`font-mono text-xs px-3 py-1 rounded-full border ${isDarkMode ? "bg-neutral-950 border-neutral-800 text-neutral-400" : "bg-neutral-50 border-neutral-200 text-neutral-600"}`}>
                  2023 — 2025
                </span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="mt-24 pt-10 border-t border-dashed border-neutral-800 dark:border-neutral-900">
          <h2 className="font-serif text-2xl tracking-wide font-medium uppercase text-left">about me</h2>
          
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className={`font-serif text-base sm:text-lg leading-relaxed text-left ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}>
              I'm a first-year BTech student passionate about AI, Machine Learning, and software development. I enjoy building automation tools, experimenting with APIs, and creating projects that make everyday tasks simpler. Currently exploring LLMs, cloud technologies, and full-stack development while continuously learning and sharing my journey.
            </p>
          </motion.div>
        </section>

        {/* CONTACT / FOOTER SECTION */}
        <section id="contact" className="mt-28 py-12 border-t border-dashed border-neutral-800 dark:border-neutral-900">
          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-lg text-neutral-400">Let's connect & get in touch!</h3>
            <p className="font-serif text-xl tracking-wide dark:text-neutral-500 text-gray-500 font-medium">Find me on these platforms</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-8 font-serif text-xs tracking-wider lowercase">
            <a 
              href="https://github.com/parthakk07" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`flex items-center gap-2 hover:opacity-70 transition-opacity ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}
            >
              <Github size={14} /> github
            </a>
            
            <a 
              href="https://x.com/Parthak32315" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`flex items-center gap-2 hover:opacity-70 transition-opacity ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}
            >
              <Twitter size={14} /> twitter
            </a>

            <a 
              href="https://www.linkedin.com/in/parthak-kumar/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`flex items-center gap-2 hover:opacity-70 transition-opacity ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}
            >
              <Linkedin size={14} /> linkedin
            </a>

            <button 
              onClick={copyEmailToClipboard}
              className={`flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}
              title="Copy Email (parthak516@gmail.com)"
            >
              <Mail size={14} /> mail
            </button>

            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                alert("Opening Resume mockup! This links directly to your PDF copy.");
              }}
              className={`flex items-center gap-2 hover:opacity-70 transition-opacity ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}
            >
              <FileText size={14} /> resume
            </a>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-950 dark:border-neutral-950/20 pt-8 text-neutral-600 text-xs font-mono">
            <p>© 2026 Parthak.</p>
          </div>
        </section>

      </main>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-8 right-6 p-3 rounded-full shadow-lg cursor-pointer ${isDarkMode ? "bg-neutral-900 text-white border border-neutral-800 hover:bg-neutral-800" : "bg-white text-black border border-gray-200 hover:bg-gray-100"}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -3 }}
            title="Back to top"
          >
            <ChevronUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

    {/* MUSIC POPUP */}
    {showMusicPopup && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => setShowMusicPopup(false)}
      >
        <div
          className={`relative w-80 p-6 rounded-2xl shadow-2xl border transition-colors ${isDarkMode ? "bg-black border-neutral-800 text-white" : "bg-white border-gray-200 text-black"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => { audioRef.current?.pause(); setIsPlaying(false); setShowMusicPopup(false); }}
            className={`absolute top-3 right-3 text-sm cursor-pointer ${isDarkMode ? "text-neutral-500 hover:text-white" : "text-gray-400 hover:text-black"}`}
          >
            ✕
          </button>

          <h3 className="font-serif text-lg mb-4 tracking-wide">🎵 hidden track</h3>

          <audio ref={audioRef} src="/hidden-track.mp3" loop />

          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={togglePlay}
              className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${isDarkMode ? "bg-neutral-800 text-white hover:bg-neutral-700" : "bg-gray-100 text-black hover:bg-gray-200"}`}
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
            <span className="text-xs opacity-60">{isPlaying ? "playing..." : "paused"}</span>
          </div>

          <div className="border-t border-dashed mt-4 pt-4 space-y-3">
            <a
              href="https://music.youtube.com/playlist?list=PL2dARRFsLCBMdr9281IJbx7sH8kE8jMAP&si=4YnzQHX5QtbjGC56"
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-sm hover:opacity-70 transition-opacity ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}
            >
              🎧 english playlist
            </a>
            <a
              href="https://music.youtube.com/playlist?list=PLxlEmaYUUetvx7sW4CnTBQ7gg_CC4mJD_&si=ZDMUJa-mZpsnaFCV"
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-sm hover:opacity-70 transition-opacity ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}
            >
              🎧 hindi playlist 1
            </a>
            <a
              href="https://music.youtube.com/playlist?list=PLxlEmaYUUetunpiyrp4QXpqVIs4kWCbuu&si=uElVb5cikFSRC5LV"
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-sm hover:opacity-70 transition-opacity ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}
            >
              🎧 hindi playlist 2
            </a>
          </div>
        </div>
      </div>
    )}

    </div>
  );
}

/* TECH CARD SUBCOMPONENT */
interface TechCardProps {
  name: string;
  icon: React.ReactNode;
  isDarkMode: boolean;
}

function TechCard({ name, icon, isDarkMode }: TechCardProps) {
  return (
    <motion.div 
      className={`flex flex-col items-center justify-center p-4 rounded-xl text-center transition-all duration-300 h-24 ${
        isDarkMode 
          ? "bg-black text-zinc-500 hover:text-emerald-500" 
          : "bg-transparent text-zinc-500 hover:text-emerald-600"
      }`}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      <div className="mb-3">
        {icon}
      </div>
      <span className="font-serif text-[10px] uppercase tracking-wider font-medium">
        {name}
      </span>
    </motion.div>
  );
}

/* PROJECT CARD SUBCOMPONENT */
interface ProjectCardProps {
  title: string;
  description: string;
  isDarkMode: boolean;
}

function ProjectCard({ title, description, isDarkMode }: ProjectCardProps) {
  return (
    <motion.div 
      className={`flex flex-col p-6 sm:pt-8 sm:pb-6 sm:px-6 aspect-square justify-between border-2 border-dashed border-neutral-800 rounded-md select-none transition-all duration-300 dark:border-neutral-800 hover:scale-[1.02] ${
        isDarkMode 
          ? "hover:border-neutral-500 text-white" 
          : "hover:border-gray-500 text-black bg-white"
      }`}
      whileHover={{ y: -4 }}
    >
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <p className={`text-center font-serif text-xs sm:text-xs md:text-sm leading-relaxed max-w-xs line-clamp-6 ${isDarkMode ? "text-neutral-300" : "text-gray-700"}`}>
          {description}
        </p>
      </div>
      
      <div className="pt-4 sm:pt-6 border-t border-dashed border-neutral-200 dark:border-neutral-850 flex flex-col items-center gap-1">
        <span className="font-serif text-xs sm:text-sm md:text-base tracking-wider text-center uppercase font-medium">
          {title}
        </span>
      </div>
    </motion.div>
  );
}
