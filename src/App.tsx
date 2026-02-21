/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  MousePointer2, 
  Rocket,
  Github,
  Twitter,
  RotateCcw
} from 'lucide-react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = useCallback(() => {
    if (isFinished) {
      setTimeLeft(300);
      setIsFinished(false);
      setIsActive(true);
    } else {
      setIsActive(!isActive);
    }
  }, [isActive, isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          <a className="flex items-center gap-3 group" href="#">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground font-display">
              Procrastination<span className="text-primary">Timer</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#science" className="hover:text-primary transition-colors">The Science</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-12 pb-24 px-6 md:px-8 overflow-hidden">
          {/* Background Blurs */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-8"
              >
                Beat Procrastination
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tighter mb-8 font-display"
              >
                <span className="gradient-text">5 min</span><br/>
                Procrastination<br/>
                Timer
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-lg mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground font-medium leading-relaxed mb-10"
              >
                The best way to beat procrastination is to move, take action or in the words of Dory — <span className="font-bold text-foreground italic">"Just Keep Swimming"</span>
              </motion.p>
              
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleTimer}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-foreground rounded-2xl hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-xl shadow-primary/10"
              >
                <span className="flex items-center gap-3 text-lg">
                  {isFinished ? 'Done! Go Again?' : isActive ? 'Running...' : 'Start Now'}
                  {isActive ? (
                    <RotateCcw className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </span>
              </motion.button>
            </div>
            
            <div className="lg:col-span-5 relative mt-12 lg:mt-0 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
                className="relative"
              >
                {/* Main Timer Circle */}
                <div className={`w-72 h-72 md:w-96 md:h-96 rounded-full border-[12px] transition-colors duration-500 ${isFinished ? 'border-secondary/20 shadow-secondary/20' : 'border-primary/5 shadow-primary/20'} shadow-[0_0_60px_rgba(0,0,0,0.05)] bg-white flex flex-col items-center justify-center relative z-10`}>
                  <div className={`text-7xl md:text-8xl font-bold tabular-nums transition-colors duration-500 font-display ${isFinished ? 'text-secondary' : 'text-foreground'}`}>
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-4 font-bold">
                    {isFinished ? 'Momentum Gained' : 'Focus Time'}
                  </div>
                </div>

                {/* Floating Elements */}
                <AnimatePresence>
                  {!isActive && !isFinished && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute -top-6 -right-12 z-20 hidden md:block"
                      >
                        <div className="bg-white/90 backdrop-blur-md border border-border px-6 py-4 rounded-2xl shadow-2xl floating" style={{ animationDelay: '0s' }}>
                          <div className="text-2xl font-bold text-primary font-display">5</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Minutes</div>
                        </div>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute top-1/2 -left-20 z-20 hidden md:block"
                      >
                        <div className="bg-white/90 backdrop-blur-md border border-border px-6 py-4 rounded-2xl shadow-2xl floating" style={{ animationDelay: '1s' }}>
                          <div className="text-2xl font-bold text-primary font-display">10</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Minutes</div>
                        </div>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute -bottom-6 right-12 z-20 hidden md:block"
                      >
                        <div className="bg-white/90 backdrop-blur-md border border-border px-6 py-4 rounded-2xl shadow-2xl floating" style={{ animationDelay: '2s' }}>
                          <div className="text-2xl font-bold text-primary font-display">15</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Minutes</div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Science Section */}
        <section id="science" className="py-24 px-6 md:px-8 bg-muted/50 border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4 block">The Science</span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6 font-display">Why 5 Minutes Works</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Based on the Zeigarnik Effect and momentum psychology, small starts lead to big finishes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-primary" />,
                  title: "Breaks the Barrier",
                  desc: "Starting is the hardest part. 5 minutes is small enough to feel manageable, removing the mental resistance to begin."
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-primary" />,
                  title: "Creates Momentum",
                  desc: "Once you start, the Zeigarnik Effect kicks in — your brain wants to finish what it started. 80% of people continue beyond 5 minutes."
                },
                {
                  icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
                  title: "Builds Confidence",
                  desc: "Every completed 5-minute session is a win. Small wins compound into bigger achievements and lasting habit change."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 font-display">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-24 px-6 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4 block">Simple Process</span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6 font-display">How It Works</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">Three steps to reclaim your productivity</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                {
                  step: "1",
                  icon: <MousePointer2 className="w-10 h-10 text-primary" />,
                  title: "Click Start",
                  desc: "Hit the Start button and commit to just 5 minutes of action on your task."
                },
                {
                  step: "2",
                  icon: <Clock className="w-10 h-10 text-primary" />,
                  title: "Timer Counts Down",
                  desc: "Watch the timer count down. Focus solely on your task for these 5 minutes."
                },
                {
                  step: "3",
                  icon: <Rocket className="w-10 h-10 text-primary" />,
                  title: "Take Action",
                  desc: "Once you start, momentum carries you forward. Most people keep going!"
                }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="relative mb-10 inline-block">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/5 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-foreground text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 font-display">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground font-display">
                Procrastination<span className="text-primary">Timer</span>
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground font-medium">
              © {new Date().getFullYear()} ProcrastinationTimer. Just keep swimming.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
