import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
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
} from "lucide-react";

// Image Imports
import darkBanner from "./assets/images/regenerated_image_1780961436854.png";
import lightBanner from "./assets/images/user_volcano_banner_1780960794028.png";
import backupLightBanner from "./assets/images/regenerated_image_1780961340822.jpg";
import profileAvatar from "./assets/images/user_avatar_1780960461329.png";
import headerPortrait from "./assets/images/header-portrait.png";
import animePortrait from "./assets/images/anime.jpeg";
import spideyPortrait from "./assets/images/third-crop.jpeg";
import cursorCloud from "./assets/images/cursor-cloud.png";

const PixelGlobe = lazy(() => import("./components/PixelGlobe"));

export default function App() {
  // Dark/Light mode state (default to dark)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  // Custom states
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
  // Safe Light Banner state with graceful fallback
  const [lightBannerSrc, setLightBannerSrc] = useState<string>(lightBanner);

  const headerFaces = [headerPortrait, animePortrait, spideyPortrait];
  const [headerFace, setHeaderFace] = useState(0);

  const cycleHeaderFace = () => {
    setHeaderFace((i) => (i + 1) % headerFaces.length);
  };
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
      window.open("https://portfolio-nenj.onrender.com/", "_blank");
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
      <header id="site-header" className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md ${isDarkMode ? "bg-black/80 border-b border-neutral-900" : "bg-white/80 border-b border-gray-200"}`}>
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
        <section id="hero-banner" className="relative w-full rounded-2xl overflow-visible aspect-[21/9] md:aspect-[16/6] bg-neutral-900 shadow-2xl">
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/header.mp4"
              poster={isDarkMode ? darkBanner : lightBannerSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          </div>
          <div className="absolute -bottom-16 left-2 md:left-4">
            <button
              type="button"
              onClick={cycleHeaderFace}
              className={`w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden p-1 shadow-xl transition-colors duration-300 cursor-pointer ${isDarkMode ? "bg-black" : "bg-gray-50"}`}
              title="click to swap the photo"
            >
              <img
                src={headerFaces[headerFace]}
                alt="Parthak Kumar"
                className="w-full h-full object-cover rounded-full"
              />
            </button>
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

        {/* STACK SECTION — jagritgumber-style marquees */}
        <section id="skills" className="mt-20 pt-10 border-t border-neutral-800/80">
          <h2 className="font-serif text-[28px] sm:text-[34px] tracking-tight font-medium">
            Technologies I've worked with
          </h2>
          <p className={`mt-2 mb-4 text-sm sm:text-[15px] ${isDarkMode ? "text-neutral-500" : "text-neutral-500"}`}>
            These've helped me through the highs and lows of my projects.
          </p>

          <div
            className="skill-marquee-group flex flex-col overflow-hidden py-2 max-w-full"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
            }}
          >
            <SkillMarquee
              reverse={false}
              isDarkMode={isDarkMode}
              items={[
                { name: "Python", icon: "python" },
                { name: "C", icon: "c" },
                { name: "C++", icon: "cpp" },
                { name: "HTML", icon: "html" },
                { name: "CSS", icon: "css" },
              ]}
            />
            <SkillMarquee
              reverse={true}
              isDarkMode={isDarkMode}
              items={[
                { name: "pandas", icon: "pandas" },
                { name: "NumPy", icon: "numpy" },
                { name: "matplotlib", icon: "viz" },
                { name: "seaborn", icon: "seaborn" },
                { name: "scikit-learn", icon: "sklearn" },
                { name: "EDA", icon: "eda" },
              ]}
            />
            <SkillMarquee
              reverse={false}
              isDarkMode={isDarkMode}
              items={[
                { name: "Git", icon: "git" },
                { name: "GitHub", icon: "github" },
                { name: "MySQL", icon: "mysql" },
                { name: "Linux", icon: "linux" },
                { name: "data viz", icon: "viz" },
              ]}
            />
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mt-24 pt-10 border-t border-neutral-800/80">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-[28px] sm:text-[34px] tracking-tight font-medium">
                Some Cool Projects
              </h2>
              <p className={`mt-2 text-sm sm:text-[15px] ${isDarkMode ? "text-neutral-500" : "text-neutral-500"}`}>
                I've more cool things in store these are just a few
              </p>
            </div>
            <a
              href="https://github.com/parthakk07"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm shrink-0 hover:opacity-80 ${isDarkMode ? "text-neutral-400" : "text-neutral-500"}`}
            >
              View more →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Employee Churn Prediction",
                description:
                  "Supervised ML model that flags employees likely to leave, using real HR features and a full train–test pipeline.",
                href: "https://github.com/parthakk07/employee-churn-prediction",
                image: "/projects/churn.png",
              },
              {
                title: "Student Health Risk",
                description:
                  "Predicts student health risk from lifestyle and academic signals with scikit-learn classifiers.",
                href: "https://github.com/parthakk07/Predicting-Student-Health-Risk",
                image: "/projects/health.png",
              },
              {
                title: "YouTube Summarizer",
                description:
                  "Pulls a video transcript and writes a Gemini summary from a pasted YouTube URL.",
                href: "https://github.com/parthakk07/YouTube-Video-Summarizer",
                image: "/projects/summarizer.png",
              },
            ].map((project) => (
              <article key={project.title} className="flex flex-col">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-md aspect-[16/10] bg-neutral-900"
                >
                  <img
                    src={project.image}
                    alt=""
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </a>
                <h3 className="font-serif text-xl mt-4 tracking-tight">{project.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed flex-1 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                  {project.description}
                </p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 self-end inline-flex items-center rounded-full bg-teal-500/90 hover:bg-teal-400 text-black text-sm px-4 py-1.5 transition-colors"
                >
                  View More
                </a>
              </article>
            ))}
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
          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-col gap-2 min-w-0">
              <h3 className="font-serif text-lg text-neutral-400">Let's connect & get in touch!</h3>
              <p className="font-serif text-xl tracking-wide dark:text-neutral-500 text-gray-500 font-medium">Find me on these platforms</p>
            </div>
            <div className="relative w-32 h-32 md:w-36 md:h-36 shrink-0">
              <Suspense
                fallback={
                  <img
                    src={profileAvatar}
                    alt="Parthak Kumar Portrait"
                    className="w-full h-full object-cover rounded-full"
                  />
                }
              >
                <PixelGlobe onTap={handleAvatarClick} className="w-full h-full" />
              </Suspense>
            </div>
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

function SkillMarquee({
  items,
  reverse,
  isDarkMode,
}: {
  items: { name: string; icon: string }[];
  reverse: boolean;
  isDarkMode: boolean;
}): React.ReactElement {
  const half: { name: string; icon: string }[] = [];
  while (half.length < 16) half.push(...items);
  const loop = half.concat(half);
  return (
    <div className={`flex w-max ${reverse ? "skill-marquee-rev" : "skill-marquee"}`}>
      {loop.map((skill, i) => (
        <span
          key={`${skill.name}-${i}`}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm whitespace-nowrap border ${
            isDarkMode
              ? "border-white/10 text-neutral-200 bg-black"
              : "border-neutral-300 text-neutral-800 bg-white"
          }`}
        >
          <SkillIcon name={skill.icon} />
          {skill.name}
        </span>
      ))}
    </div>
  );
}

function SkillIcon({ name }: { name: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "python":
      return (
        <svg {...common}>
          <path d="M12 2c-3.3 0-3 1.4-3 3.2V7h6.1c.6 0 1 .4 1 1v5.2c0 .8-.7 1.5-1.5 1.5H8.6C6.3 14.7 5 16 5 18.4V20c0 2.4 2 2.2 4.4 2.2h1.1V20c0-1.6 1.4-3 3-3h5.2c1.7 0 3.3-1.4 3.3-3.1V8.6C22 5.6 20.4 2 12 2zm-1.3 2.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          <path d="M12 22c3.3 0 3-1.4 3-3.2V17H8.9c-.6 0-1-.4-1-1V10.8c0-.8.7-1.5 1.5-1.5h5.9C17.7 9.3 19 8 19 5.6V4c0-2.4-2-2.2-4.4-2.2H13.5V4c0 1.6-1.4 3-3 3H5.3C3.6 7 2 8.4 2 10.1v5.3C2 18.4 3.6 22 12 22zm1.3-2.2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" opacity=".85" />
        </svg>
      );
    case "c":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2zm1.7 13.8c-.5.8-1.4 1.3-2.5 1.3-1.8 0-3.1-1.5-3.1-3.6s1.3-3.6 3.1-3.6c1.1 0 2 .5 2.5 1.3l1.7-1.1C14.6 8.8 13.2 8 11.3 8 8.2 8 6 10.3 6 13.5S8.2 19 11.3 19c1.9 0 3.3-.8 4.1-2.1l-1.7-1.1z" />
        </svg>
      );
    case "html":
      return (
        <svg {...common}>
          <path d="M3.5 2h17l-1.5 17.2L12 22l-7-2.8L3.5 2zm4 5.2-.2 2.4h7.6l-.3 2.8H7.5l-.2 2.3 4.7 1.4 4.6-1.4.3-3.5H9.2l.1-1.2h7.8l.4-4.3H7.5z" />
        </svg>
      );
    case "css":
      return (
        <svg {...common}>
          <path d="M3.5 2h17l-1.5 17.2L12 22l-7-2.8L3.5 2zm4.1 5.2h8.7l-.3 2.6H9.6l.2 1.8h5.8l-.5 4.8L12 17.2l-3.2-1-.2-2.3h2.1l.1 1.1 1.2.4 1.3-.4.2-2H8.6L7.6 7.2z" />
        </svg>
      );
    case "git":
      return (
        <svg {...common}>
          <path d="M21.6 11.1 12.9 2.4a1.4 1.4 0 0 0-2 0L9.2 4.1l2.5 2.5a1.7 1.7 0 0 1 2.1 2.1l2.4 2.4a1.7 1.7 0 1 1-1 1L13.1 10v6.1a1.7 1.7 0 1 1-1.4.1V9.8a1.7 1.7 0 0 1-.9-2.2L8.3 5.2 2.4 11a1.4 1.4 0 0 0 0 2l8.7 8.7a1.4 1.4 0 0 0 2 0l8.5-8.5a1.4 1.4 0 0 0 0-2z" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10.2 10.2 0 0 0 22 12.2C22 6.6 17.5 2 12 2z" />
        </svg>
      );
    case "mysql":
      return (
        <svg {...common}>
          <path d="M16.8 4.2c-.7 0-1.3.1-1.7.3-.2-1.3-1.4-2-1.4-2l-.4.5C12 4 11.4 5.2 11.3 6.2 10 7.1 8.2 8.6 7.5 10c-2.3 4.4.4 7.4 1.6 8.3-.3.8-.6 1.5-.6 1.5l.9.4s.4-.8.8-1.6c.6.2 1.4.4 2.4.4 3.7 0 6.3-2.3 6.3-6.2 0-2.6-1.3-4.6-3.1-6.2.2-.6.4-1.3.4-1.8 0-.3 0-.5-.1-.6zm-3.3 2.1c.2.6.3 1.2.3 1.6 0 .3 0 .5-.1.6-.4-.3-.8-.5-1.2-.8.2-.6.6-1.1 1-1.4z" />
        </svg>
      );
    case "linux":
      return (
        <svg {...common}>
          <path d="M12.1 2.2c-.8 0-2.3 2.1-2.5 5.1-.1.8-.3 1.6-.6 2.2-.6-1-1-2.3-1-3.3 0-1.3.3-2.2.3-2.2S6.5 5.6 6.5 8.9c0 1.7.6 3.2 1.4 4.5-.6.9-1 2-1 3.2 0 3.2 2.3 5.2 5.2 5.2s5.2-2 5.2-5.2c0-1.2-.4-2.3-1-3.2.8-1.3 1.4-2.8 1.4-4.5 0-3.3-1.8-4.9-1.8-4.9s.3.9.3 2.2c0 1-.4 2.3-1 3.3-.3-.6-.5-1.4-.6-2.2-.2-3-1.7-5.1-2.5-5.1z" />
        </svg>
      );
    case "cpp":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2zm.2 13.7c-.5.8-1.3 1.2-2.4 1.2-1.8 0-3-1.5-3-3.6s1.2-3.6 3-3.6c1 0 1.8.4 2.3 1.2l1.6-1.1C13 8.7 11.7 8 10 8 7 8 5 10.3 5 13.3S7 18.6 10 18.6c1.8 0 3.1-.8 3.8-2.1l-1.6-1z" />
          <path d="M16.2 11.2h1.2v1.2H19v1.2h-1.6v1.2h-1.2v-1.2h-1.6v-1.2h1.6zm3.6 0H21v1.2h1.6v1.2H21v1.2h-1.2v-1.2h-1.6v-1.2h1.6z" />
        </svg>
      );
    case "pandas":
      return (
        <svg {...common}>
          <path d="M8 3h2v18H8V3zm6 4h2v14h-2V7z" />
        </svg>
      );
    case "numpy":
      return (
        <svg {...common}>
          <path d="M4 4h4l8 12h4v4h-4L8 8H4V4zm12 0h4v8h-4V4zM4 12h4v8H4v-8z" />
        </svg>
      );
    case "seaborn":
      return (
        <svg {...common}>
          <path d="M4 18c2-6 4-8 6-8s3 3 5 3 3-5 5-7v12H4z" />
        </svg>
      );
    case "sklearn":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="2.2" />
          <circle cx="16" cy="8" r="2.2" />
          <circle cx="8" cy="16" r="2.2" />
          <circle cx="16" cy="16" r="2.2" />
        </svg>
      );
    case "eda":
      return (
        <svg {...common}>
          <path d="M4 18V8l4 3 4-6 4 6 4-3v10H4zm0 2h16v2H4v-2z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 18V8l4 3 4-6 4 6 4-3v10H4zm0 2h16v2H4v-2z" />
        </svg>
      );
  }
}
