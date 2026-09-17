import React, { Suspense, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Text, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ExternalLink, FileText, Mail, MapPin, ChevronDown, X, Trophy, Brain, Eye, Code2 } from "lucide-react";
import "./styles.css";

const DATA = {
  name: "Krishna Madaka",
  role: "AI / ML Engineer",
  tagline: "I build intelligent systems with Machine Learning, GenAI and Computer Vision.",
  github: "https://github.com/hkrish2266",
  linkedin: "https://www.linkedin.com/in/hari-krishna-madaka/",
  leetcode: "https://leetcode.com/u/hari_21072007/",
  kaggle: "https://www.kaggle.com/krishnamadaka",
  email: "mailto:your-email@example.com",
  resume: "/resume.pdf",
  projects: [
    { title: "Smart Traffic Violation Detection", tag: "Computer Vision", desc: "YOLO-based detection pipeline with tracking, OCR and database storage.", tech: "YOLOv8 • DeepSORT • EasyOCR • MySQL", link: "https://github.com/hkrish2266/Smart-Traffic-Violation-Detection" },
    { title: "Fake News Detection", tag: "NLP", desc: "Text classification experiments using TF-IDF, Logistic Regression, LSTM and BERT.", tech: "Python • NLP • Transformers", link: "https://github.com/hkrish2266" },
    { title: "Customer Churn Prediction", tag: "Deep Learning", desc: "Neural-network based classification workflow for customer churn prediction.", tech: "Python • TensorFlow • Pandas", link: "https://github.com/hkrish2266" },
    { title: "Production-Style RAG", tag: "Generative AI", desc: "Retrieval-augmented architecture for grounded question answering over documents.", tech: "LangChain • Embeddings • Vector DB • LLM", link: "https://github.com/hkrish2266" }
  ],
  skills: ["Python","Java","C/C++","SQL","Machine Learning","Deep Learning","NLP","LLMs","RAG","LangChain","Computer Vision","YOLO","OpenCV","TensorFlow","Scikit-learn","FastAPI","MySQL","Git"]
};

function Player() {
  const ref = useRef();
  const keys = useRef({});
  useEffect(() => {
    const down = e => keys.current[e.key.toLowerCase()] = true;
    const up = e => keys.current[e.key.toLowerCase()] = false;
    window.addEventListener("keydown", down); window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const speed = 4 * delta;
    if (keys.current.w || keys.current.arrowup) ref.current.position.z -= speed;
    if (keys.current.s || keys.current.arrowdown) ref.current.position.z += speed;
    if (keys.current.a || keys.current.arrowleft) ref.current.position.x -= speed;
    if (keys.current.d || keys.current.arrowright) ref.current.position.x += speed;
    ref.current.position.x = Math.max(-14, Math.min(14, ref.current.position.x));
    ref.current.position.z = Math.max(-12, Math.min(12, ref.current.position.z));
  });
  return <group ref={ref}>
    <mesh position={[0, .55, 0]} castShadow><boxGeometry args={[1.1,.45,1.8]}/><meshStandardMaterial color="#e8edf2" metalness={.65} roughness={.25}/></mesh>
    <mesh position={[0,.85,-.15]} castShadow><boxGeometry args={[.75,.35,.75]}/><meshStandardMaterial color="#91a4b7" metalness={.3}/></mesh>
    {[[-.5,.25,.62],[.5,.25,.62],[-.5,.25,-.62],[.5,.25,-.62]].map((p,i)=><mesh key={i} position={p}><cylinderGeometry args={[.18,.18,.12,16]}/><meshStandardMaterial color="#151515"/></mesh>)}
  </group>
}

function WorldLabel({position, title, icon}) {
  return <group position={position}>
    <Text fontSize={.5} color="white" anchorX="center" anchorY="middle">{icon} {title}</Text>
  </group>
}

function World() {
  return <>
    <color attach="background" args={["#070a0f"]}/>
    <ambientLight intensity={1.5}/>
    <directionalLight position={[5,10,5]} intensity={2} castShadow/>
    <Environment preset="city"/>
    <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
      <planeGeometry args={[34,30]}/><meshStandardMaterial color="#111820" roughness={.9}/>
    </mesh>
    <gridHelper args={[34,34,"#263341","#18212a"]} position={[0,.01,0]}/>
    <Float speed={1.2} rotationIntensity={.15} floatIntensity={.5}><WorldLabel position={[0,2,-8]} title="PROJECTS" icon="▣"/></Float>
    <Float speed={1.4} rotationIntensity={.15} floatIntensity={.5}><WorldLabel position={[-11,2,0]} title="SKILLS" icon="◆"/></Float>
    <Float speed={1.6} rotationIntensity={.15} floatIntensity={.5}><WorldLabel position={[11,2,0]} title="ABOUT" icon="●"/></Float>
    <Float speed={1.1} rotationIntensity={.15} floatIntensity={.5}><WorldLabel position={[0,2,8]} title="CONTACT" icon="✉"/></Float>
    <Player/>
    <ContactShadows position={[0,0,0]} opacity={.45} scale={28} blur={2.5} far={10}/>
  </>
}

function ProjectModal({project, close}) {
  if (!project) return null;
  return <AnimatePresence><motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={close}>
    <motion.div className="modal" initial={{y:30,scale:.96}} animate={{y:0,scale:1}} onClick={e=>e.stopPropagation()}>
      <button className="close" onClick={close}><X size={20}/></button>
      <span className="eyebrow">{project.tag}</span><h2>{project.title}</h2><p>{project.desc}</p>
      <div className="tech">{project.tech}</div>
      <a className="button primary" href={project.link} target="_blank" rel="noreferrer">View project <ExternalLink size={16}/></a>
    </motion.div>
  </motion.div></AnimatePresence>
}

function App() {
  const [active, setActive] = useState(null);
  const [menu, setMenu] = useState(false);
  const [help, setHelp] = useState(true);
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return <div className="app">
    <header className="topbar">
      <button className="brand" onClick={()=>scrollTo("world")}>KM<span>.</span></button>
      <nav className={menu ? "open" : ""}>{["world","about","projects","skills","contact"].map(x=><button key={x} onClick={()=>{scrollTo(x);setMenu(false)}}>{x}</button>)}</nav>
      <button className="menu" onClick={()=>setMenu(!menu)}>MENU</button>
    </header>

    <section id="world" className="hero-world">
      <div className="hero-copy">
        <div className="pill">AVAILABLE FOR OPPORTUNITIES</div>
        <h1>{DATA.name}</h1>
        <h2>{DATA.role}</h2>
        <p>{DATA.tagline}</p>
        <div className="actions"><button className="button primary" onClick={()=>scrollTo("projects")}>Explore work <ChevronDown size={17}/></button><a className="button ghost" href={DATA.resume}>Resume <FileText size={17}/></a></div>
      </div>
      <div className="canvas-wrap"><Canvas shadows camera={{position:[0,12,18],fov:48}}><Suspense fallback={null}><World/><OrbitControls enablePan={false} maxPolarAngle={Math.PI/2.2} minDistance={8} maxDistance={24}/></Suspense></Canvas></div>
      {help && <button className="controls" onClick={()=>setHelp(false)}>WASD / ARROWS to drive • drag to look around ×</button>}
    </section>

    <main>
      <section id="about" className="section split">
        <div><span className="eyebrow">01 / ABOUT</span><h2>Building useful AI,<br/><em>not just demos.</em></h2></div>
        <div><p>I’m a Computer Science student focused on Artificial Intelligence and Machine Learning. I enjoy turning ideas into working systems across ML, NLP, Generative AI and Computer Vision.</p><p>I care about understanding the full path — data, models, retrieval, APIs, deployment and the user experience around them.</p><div className="stats"><div><b>300+</b><span>DSA problems</span></div><div><b>8.56</b><span>B.Tech CGPA</span></div><div><b>2028</b><span>Expected graduation</span></div></div></div>
      </section>

      <section id="projects" className="section">
        <div className="section-head"><div><span className="eyebrow">02 / SELECTED WORK</span><h2>Projects</h2></div><span className="muted">Click a card to inspect</span></div>
        <div className="project-grid">{DATA.projects.map((p,i)=><motion.button whileHover={{y:-8}} className="project-card" key={p.title} onClick={()=>setActive(p)}><span className="number">0{i+1}</span><div className="project-icon">{i===0?<Eye/>:i===1?<Brain/>:<Code2/>}</div><span className="eyebrow">{p.tag}</span><h3>{p.title}</h3><p>{p.desc}</p><div className="tech">{p.tech}</div><span className="read">OPEN →</span></motion.button>)}</div>
      </section>

      <section id="skills" className="section dark">
        <span className="eyebrow">03 / TOOLBOX</span><h2>Skills & technologies</h2>
        <div className="skill-cloud">{DATA.skills.map((s,i)=><motion.span key={s} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} transition={{delay:i*.025}}>{s}</motion.span>)}</div>
      </section>

      <section className="section links-section">
        <span className="eyebrow">04 / ELSEWHERE</span><h2>Find me online</h2>
        <div className="link-grid">
          <a href={DATA.github} target="_blank" rel="noreferrer"><Github/>GitHub<ExternalLink/></a>
          <a href={DATA.linkedin} target="_blank" rel="noreferrer"><Linkedin/>LinkedIn<ExternalLink/></a>
          <a href={DATA.leetcode} target="_blank" rel="noreferrer"><Code2/>LeetCode<ExternalLink/></a>
          <a href={DATA.kaggle} target="_blank" rel="noreferrer"><Trophy/>Kaggle<ExternalLink/></a>
        </div>
      </section>

      <section id="contact" className="contact section">
        <span className="eyebrow">05 / CONTACT</span><h2>Let’s build something<br/><em>interesting.</em></h2>
        <a className="button primary" href={DATA.email}>Get in touch <Mail size={17}/></a>
        <div className="contact-meta"><span><MapPin size={15}/> India</span><span>© {new Date().getFullYear()} {DATA.name}</span></div>
      </section>
    </main>
    <ProjectModal project={active} close={()=>setActive(null)}/>
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);