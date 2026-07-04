import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoAsset from "@/assets/cabo-logo.webp";

export function WelcomeScreen({ show, onComplete }: { show: boolean; onComplete: () => void }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (show) {
      // Prevent scrolling while welcome screen is active
      document.body.style.overflow = "hidden";

      const t1 = setTimeout(() => setRevealed(true), 120);

      // The visual logo sweep ends around 5.8s and the camera push ends at 10s.
      // 5.5s is a good time to gracefully fade out into the landing page.
      const t2 = setTimeout(() => {
        onComplete();
      }, 5500);

      return () => {
        document.body.style.overflow = "";
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <style dangerouslySetInnerHTML={{ __html: WELCOME_CSS }} />
          <div
            className="welcome-stage"
            aria-label="Cabo Tours & Travels welcome screen"
            data-revealed={revealed ? "true" : "false"}
          >
            <div className="welcome-vignette" aria-hidden="true" />
            <div className="welcome-haze" aria-hidden="true" />
            <div className="welcome-ambient" aria-hidden="true" />
            <div className="welcome-corelight" aria-hidden="true" />

            <div className="welcome-camera">
              <div className="welcome-float">
                <div className="welcome-breath" aria-hidden="true" />
                <div className="welcome-logo-wrap">
                  <img
                    src={logoAsset}
                    alt="Cabo Tours & Travels"
                    className="welcome-logo"
                    draggable={false}
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="welcome-sweep" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const WELCOME_CSS = `
.welcome-stage{position:absolute;inset:0;background:#fff;overflow:hidden;display:flex;align-items:center;justify-content:center;isolation:isolate;width:100%;height:100%;}
.welcome-stage::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%, #ffffff 0%, #fafbfd 55%, #f3f6fb 100%);}
.welcome-vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(10,30,60,0.06) 100%);pointer-events:none;}
.welcome-haze{position:absolute;inset:-10%;background:radial-gradient(circle at 50% 55%, rgba(120,180,255,0.10), transparent 60%);filter:blur(40px);pointer-events:none;}
.welcome-ambient{position:absolute;left:50%;top:50%;width:120vmin;height:120vmin;transform:translate(-50%,-50%) scale(.6);background:radial-gradient(circle, rgba(125,200,255,0.35) 0%, rgba(125,200,255,0) 60%);opacity:0;filter:blur(30px);animation:ambientIn 2.4s cubic-bezier(.22,.61,.36,1) .2s forwards;pointer-events:none;}
.welcome-corelight{position:absolute;left:50%;top:50%;width:24vmin;height:24vmin;transform:translate(-50%,-50%) scale(.2);background:radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(180,220,255,.6) 40%, rgba(180,220,255,0) 70%);opacity:0;filter:blur(8px);animation:coreIn 1.6s cubic-bezier(.22,.61,.36,1) .6s forwards;pointer-events:none;}
.welcome-camera{position:relative;transform:scale(1);animation:cameraPush 9s cubic-bezier(.22,.61,.36,1) 1s forwards;will-change:transform;}
.welcome-float{animation:floaty 6s ease-in-out 2.4s infinite;will-change:transform;}
.welcome-breath{position:absolute;inset:-18%;border-radius:50%;background:radial-gradient(circle, rgba(80,170,255,.28), rgba(80,170,255,0) 65%);filter:blur(30px);opacity:0;animation:breathIn 1.6s ease-out 1.6s forwards, breathPulse 5s ease-in-out 3.2s infinite;pointer-events:none;}
.welcome-logo-wrap{position:relative;display:inline-block;opacity:0;transform:scale(.88);animation:logoReveal 1.8s cubic-bezier(.22,.61,.36,1) 1.4s forwards;will-change:transform,opacity;}
.welcome-logo{display:block;width:min(62vmin,560px);height:auto;user-select:none;-webkit-user-drag:none;}
.welcome-sweep{position:absolute;inset:0;border-radius:50%;overflow:hidden;pointer-events:none;mix-blend-mode:screen;}
.welcome-sweep::after{content:"";position:absolute;top:-20%;left:-60%;width:40%;height:140%;background:linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.0) 35%, rgba(255,255,255,.55) 50%, rgba(255,255,255,0) 65%, rgba(255,255,255,0) 100%);transform:translateX(-20%) rotate(8deg);filter:blur(2px);animation:sweep 3.2s cubic-bezier(.5,.05,.2,1) 2.6s forwards;}
@keyframes ambientIn{to{opacity:1;transform:translate(-50%,-50%) scale(1);}}
@keyframes coreIn{0%{opacity:0;transform:translate(-50%,-50%) scale(.2);}60%{opacity:1;}100%{opacity:.0;transform:translate(-50%,-50%) scale(1.3);}}
@keyframes logoReveal{to{opacity:1;transform:scale(1);}}
@keyframes floaty{0%,100%{transform:translateY(-3px);}50%{transform:translateY(3px);}}
@keyframes breathIn{to{opacity:.7;}}
@keyframes breathPulse{0%,100%{opacity:.45;transform:scale(1);}50%{opacity:.75;transform:scale(1.04);}}
@keyframes cameraPush{to{transform:scale(1.03);}}
@keyframes sweep{0%{transform:translateX(-20%) rotate(8deg);}100%{transform:translateX(420%) rotate(8deg);}}
@media (prefers-reduced-motion: reduce){
  .welcome-camera,.welcome-float,.welcome-breath,.welcome-logo-wrap,.welcome-sweep::after,.welcome-ambient,.welcome-corelight{animation:none!important;}
  .welcome-logo-wrap{opacity:1;transform:none;}
  .welcome-ambient{opacity:1;transform:translate(-50%,-50%) scale(1);}
}
`;
