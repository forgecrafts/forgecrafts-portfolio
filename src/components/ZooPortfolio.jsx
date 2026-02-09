"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

const PROFILE = {
  name: "Danylo Bilous",
  title: "Senior Full Stack Engineer",
  summary:
    "Full-stack engineer with 7+ years shipping high-traffic applications across fintech, e-commerce, and SaaS. Architected systems serving 1M+ users, led cross-functional teams of up to 7 engineers, and consistently delivered measurable gains — 30% faster load times, 25% fewer calculation errors, and 15% lower infrastructure costs. Deep expertise in React/Next.js, Node.js, Django, AWS, and React Native with a track record of turning legacy systems into modern, scalable platforms.",
  location: "Canada",
  email: "codegenerator1994@gmail.com",
  portfolio: "https://drive.google.com/file/d/1__3EW6hA_G8dKwP31-rYCyP9jM9l-h28/view",
};

const EXPERIENCES = [
  {
    id: 0, company: "Costo AI", role: "Full Stack Developer",
    period: "Apr 2024 – Nov 2025", duration: "1 yr 8 mos", location: "USA (Remote)",
    animal: "Lion", animalEmoji: "🦁", color: "#E8A838",
    highlights: [
      "Accelerated frontend performance by 30% by refactoring React component trees, implementing code-splitting, and optimizing Redux state selectors across 40+ views",
      "Engineered Django-based financial calculation modules with comprehensive unit test coverage, reducing computation errors by 25% and saving ~$120K/year in reconciliation costs",
      "Architected and deployed production infrastructure on AWS EC2 with auto-scaling groups and CloudWatch monitoring, cutting hosting costs by 15% (~$30K annually)",
      "Redesigned backend data models and database indexing strategy, improving query processing efficiency by 20% and reducing average API response time to under 200ms",
      "Streamlined team velocity by 18% by establishing GitHub branching conventions, PR review workflows, and Trello-based sprint planning for a 5-person team",
    ],
    tech: ["React", "Redux", "Django", "Python", "AWS EC2", "S3", "PostgreSQL", "CI/CD"],
    exhibit: "The Lion's Domain", desc: "Where bold architecture meets fearless innovation",
  },
  {
    id: 1, company: "DazzleLabs", role: "Principal Full Stack Engineer & Team Lead",
    period: "Sep 2022 – Dec 2023", duration: "1 yr 4 mos",
    animal: "Eagle", animalEmoji: "🦅", color: "#5B8DEF",
    highlights: [
      "Led and mentored a 7-member engineering team, achieving 100% on-time delivery across 12 consecutive sprints through structured code reviews and 1-on-1 coaching",
      "Implemented Redis caching layer reducing average page load time by 45% and cutting API response latency from 800ms to under 150ms for high-traffic endpoints",
      "Designed and deployed horizontally scalable cloud architecture on AWS and Heroku, supporting 3x traffic growth without downtime during peak product launches",
      "Architected RESTful API suite with MongoDB and Node.js, serving 50+ endpoints consumed by web, mobile, and third-party integration partners",
      "Developed mobile-responsive UI components adopted by 1M+ active users, reducing cross-device UI bugs by 60% and saving 50+ engineering hours per quarter",
    ],
    tech: ["Node.js", "MongoDB", "Redis", "AWS", "Heroku", "React", "Express.js", "Docker"],
    exhibit: "The Eagle's Perch", desc: "Visionary leadership soaring above the clouds",
  },
  {
    id: 2, company: "PXN Phantom Network", role: "Full Stack Engineer",
    period: "Mar 2019 – Jul 2022", duration: "3 yrs 5 mos",
    animal: "Wolf", animalEmoji: "🐺", color: "#7C6EE6",
    highlights: [
      "Shipped 30+ production features using Next.js, Tailwind CSS, Django, and AWS — maintaining 99.5% deployment success rate with zero critical rollbacks",
      "Built an interactive 3D marketing website using Three.js and WebGL for a global promotional campaign, generating 200K+ unique visits in the first month",
      "Drove 10% revenue increase by identifying and resolving performance bottlenecks, optimizing critical user flows, and shipping conversion-boosting features",
      "Contributed to 4 cross-team strategic initiatives, improving inter-team workflow efficiency by 23% through shared component libraries and API standardization",
      "Owned server-side architecture in Express.js, implementing health checks, graceful shutdowns, and structured logging for long-term production stability",
    ],
    tech: ["Next.js", "Three.js", "Tailwind CSS", "Django", "Express.js", "AWS", "TypeScript", "WebGL"],
    exhibit: "The Wolf's Trail", desc: "Pack mentality powering cross-team collaboration",
  },
  {
    id: 3, company: "Node Audio Ltd", role: "Full Stack Developer",
    period: "Jun 2018 – Dec 2018", duration: "7 mos",
    animal: "Dolphin", animalEmoji: "🐬", color: "#38C9B1",
    highlights: [
      "Reduced MongoDB query response time by 35% by designing compound indexes, rewriting aggregation pipelines, and implementing connection pooling in Node.js",
      "Built interactive React UI with A/B-tested component variants, driving a 28% improvement in user engagement and session duration metrics",
      "Engineered AWS CI/CD deployment pipeline achieving 99.9% uptime, with automated rollback triggers and Slack-integrated alert notifications",
      "Implemented JWT-based authentication system and role-based admin dashboards, passing third-party security audit with zero critical findings",
    ],
    tech: ["React", "Node.js", "MongoDB", "AWS CI/CD", "JWT", "Express.js"],
    exhibit: "The Dolphin Lagoon", desc: "Swift, intelligent, and always in sync",
  },
  {
    id: 4, company: "Fleamint", role: "Mid–Senior Full Stack Developer",
    period: "Feb 2015 – Apr 2017", duration: "2 yrs 3 mos",
    animal: "Fox", animalEmoji: "🦊", color: "#E86B4A",
    highlights: [
      "Architected scalable e-commerce modules with Stripe integration, increasing checkout throughput by 22% and reducing cart abandonment by 12%",
      "Led full-stack migration of legacy PHP monolith into a modular React + REST API architecture, improving codebase maintainability by 40% and deploy frequency by 3x",
      "Built fault-tolerant payment processing system with retry logic and idempotency keys, reducing transaction failures by 18% and preventing double-charges",
      "Partnered with product managers to define MVP scope and quarterly roadmap, delivering 3 consecutive on-time releases that unlocked Series A funding discussions",
    ],
    tech: ["React", "PHP", "Stripe", "E-commerce", "AWS", "MySQL", "Jira", "REST APIs"],
    exhibit: "The Fox's Den", desc: "Clever solutions for complex challenges",
  },
];

const SKILLS = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "PHP", "Dart", "C#", "HTML5", "CSS3"],
  Frontend: ["React", "Next.js", "Redux", "Svelte", "Tailwind CSS", "MUI", "Three.js", "D3.js", "SASS/SCSS", "Webpack", "Vite"],
  Backend: ["Node.js", "Express.js", "Nest.js", ".NET", "Django", "Flask", "FastAPI", "REST APIs", "GraphQL", "WebSockets"],
  Mobile: ["React Native (iOS/Android)", "Flutter", "Dart", "Expo"],
  Cloud: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "CI/CD", "Heroku", "Vercel", "Nginx"],
  Database: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "DynamoDB"],
  Tools: ["Git/GitHub", "Jira", "Agile/Scrum", "DevOps", "System Architecture", "Figma"],
  Testing: ["Jest", "Pytest", "Cypress", "Mocha", "Unit & Integration Testing", "E2E Testing"],
};

const FEATURED_PROJECTS = [
  { title: "3D WebGL Marketing Platform", desc: "Interactive Three.js promotional website for a global campaign — 200K+ unique visitors in month one", tech: ["Three.js", "WebGL", "D3.js", "Next.js", "Node.js", "GSAP"], metric: "200K+ visits", icon: "🌐" },
  { title: "Fintech Calculation Engine", desc: "Django-based financial module suite with comprehensive test coverage, processing millions in transactions with 25% fewer errors", tech: ["Next.js", "Django", "Python", "PostgreSQL", "AWS"], metric: "~$120K saved/yr", icon: "💰" },
  { title: "Scalable E-Commerce Platform", desc: "Full PHP-to-React migration of legacy marketplace with Stripe-powered payments and 22% faster checkout", tech: ["React", "Stripe", "Node.js", "MySQL"], metric: "22% faster checkout", icon: "🛒" },
  { title: "Enterprise UI Component System", desc: "Mobile-responsive component library serving 1M+ active users across web and mobile platforms", tech: ["React", "TypeScript", "Storybook", "MUI"], metric: "1M+ users", icon: "🧩" },
  { title: "On-Demand Delivery App", desc: "Cross-platform mobile app for real-time food & package delivery with live GPS tracking, push notifications, and in-app payments serving 300K+ monthly active users", tech: ["React Native", "Expo", "Nest.js", "MongoDB", "Socket.io"], metric: "300K+ MAU", icon: "🚚" },
  { title: "Telehealth Patient Portal", desc: "HIPAA-compliant mobile app enabling video consultations, prescription management, and health record access with end-to-end encryption", tech: ["React Native", "Node.js", "Express.js", "PostgreSQL", "WebRTC"], metric: "50K+ patients", icon: "🏥" },
  { title: "AI-Powered Content Dashboard", desc: "Full-stack content management platform with AI-assisted writing, SEO analytics, and automated publishing workflows across 10+ channels", tech: ["Next.js", "React", "FastAPI", "Python", "Redis", "OpenAI"], metric: "40% faster publishing", icon: "✍️" },
  { title: "Real Estate Listing Platform", desc: "Server-rendered marketplace with interactive map search, virtual tours, mortgage calculator, and agent matching — handling 2M+ property listings", tech: ["Next.js", "React", "Django", "Python", "PostgreSQL", "Mapbox"], metric: "2M+ listings", icon: "🏠" },
  { title: "Fitness Tracking Companion", desc: "Cross-platform fitness app with workout builder, nutrition logging, progress analytics, and social challenges — integrated with wearable devices via BLE", tech: ["Flutter", "Dart", "Flask", "Python", "Firebase", "MongoDB"], metric: "120K+ downloads", icon: "💪" },
];

function buildScene(canvas, onSelectExhibit, onHover) {
  const W = canvas.clientWidth, H = canvas.clientHeight;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.3;
  const scene = new THREE.Scene(); scene.background = new THREE.Color("#0a1628"); scene.fog = new THREE.FogExp2("#0a1628", 0.008);
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000); camera.position.set(0, 55, 70); camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight("#aabbdd", 0.65));
  const sun = new THREE.DirectionalLight("#fff5e0", 1.4); sun.position.set(30, 60, 40); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); sun.shadow.camera.near = 1; sun.shadow.camera.far = 200;
  sun.shadow.camera.left = -60; sun.shadow.camera.right = 60; sun.shadow.camera.top = 60; sun.shadow.camera.bottom = -60;
  scene.add(sun);
  const rim = new THREE.DirectionalLight("#aaccff", 0.4); rim.position.set(-20, 30, -30); scene.add(rim);
  const pt = new THREE.PointLight("#ffaa55", 0.6, 100); pt.position.set(0, 20, 0); scene.add(pt);

  const ocean = new THREE.Mesh(new THREE.PlaneGeometry(400, 400, 80, 80), new THREE.MeshPhongMaterial({ color: "#0e4a6e", transparent: true, opacity: 0.85, shininess: 120, specular: new THREE.Color("#66bbff"), flatShading: true }));
  ocean.rotation.x = -Math.PI / 2; ocean.position.y = -2; ocean.receiveShadow = true; scene.add(ocean);

  const ig = new THREE.Group(); scene.add(ig);
  const iGeo = new THREE.CylinderGeometry(32, 28, 8, 8, 3);
  const iP = iGeo.attributes.position;
  for (let i = 0; i < iP.count; i++) { const y = iP.getY(i), x = iP.getX(i), z = iP.getZ(i), d = Math.sqrt(x*x+z*z); if(y>0) iP.setY(i, y+Math.sin(x*0.3)*Math.cos(z*0.3)*1.5+Math.sin(d*0.2)*0.8); if(y<0){const n=Math.sin(x*0.5+z*0.7)*1.2; iP.setX(i,x+n*0.3); iP.setZ(i,z+n*0.3);} }
  iGeo.computeVertexNormals();
  const isl = new THREE.Mesh(iGeo, new THREE.MeshLambertMaterial({ color: "#3d8b37", flatShading: true })); isl.castShadow = true; isl.receiveShadow = true; ig.add(isl);
  const rGeo = new THREE.CylinderGeometry(26, 12, 14, 7, 4); const rPos = rGeo.attributes.position;
  for (let i = 0; i < rPos.count; i++) { const x=rPos.getX(i),z=rPos.getZ(i),n=Math.sin(x*0.8)*Math.cos(z*0.6)*2; rPos.setX(i,x+n*0.4); rPos.setZ(i,z+n*0.3); }
  rGeo.computeVertexNormals(); const rb = new THREE.Mesh(rGeo, new THREE.MeshLambertMaterial({ color: "#6b5b45", flatShading: true })); rb.position.y = -10; rb.castShadow = true; ig.add(rb);
  const bch = new THREE.Mesh(new THREE.TorusGeometry(31, 3, 6, 12), new THREE.MeshLambertMaterial({ color: "#d4b96a", flatShading: true })); bch.rotation.x = -Math.PI / 2; bch.position.y = 2.5; ig.add(bch);

  const pb = new THREE.Mesh(new THREE.CylinderGeometry(4, 4.5, 1.5, 8), new THREE.MeshLambertMaterial({ color: "#e8dcc8", flatShading: true })); pb.position.y = 5; pb.castShadow = true; ig.add(pb);
  const prf = new THREE.Mesh(new THREE.ConeGeometry(5.5, 4, 8), new THREE.MeshLambertMaterial({ color: "#c0392b", flatShading: true })); prf.position.y = 10; prf.castShadow = true; ig.add(prf);
  for (let i = 0; i < 6; i++) { const a=(i/6)*Math.PI*2; const p=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,4,6),new THREE.MeshLambertMaterial({color:"#f5f0e8",flatShading:true})); p.position.set(Math.cos(a)*3.5,7,Math.sin(a)*3.5); p.castShadow=true; ig.add(p); }

  const eClk = [], ePos = [], RADIUS = 21, aGroups = [];
  EXPERIENCES.forEach((exp, i) => {
    const angle = (i/EXPERIENCES.length)*Math.PI*2-Math.PI/2, x=Math.cos(angle)*RADIUS, z=Math.sin(angle)*RADIUS, y=4.5;
    ePos.push({x,y,z,angle}); const eg = new THREE.Group(); eg.position.set(x,y,z); ig.add(eg);
    eg.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(6,6.5,0.5,8),new THREE.MeshLambertMaterial({color:new THREE.Color(exp.color).multiplyScalar(0.4),flatShading:true})),{receiveShadow:true}));
    const ip2=new THREE.Mesh(new THREE.CylinderGeometry(4.5,4.5,0.6,8),new THREE.MeshLambertMaterial({color:new THREE.Color(exp.color).multiplyScalar(0.25),flatShading:true})); ip2.position.y=0.1; ip2.receiveShadow=true; eg.add(ip2);
    for(let f=0;f<10;f++){const fa=(f/10)*Math.PI*2; const post=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,2.5,5),new THREE.MeshLambertMaterial({color:"#8B7355",flatShading:true})); post.position.set(Math.cos(fa)*5.5,1.2,Math.sin(fa)*5.5); post.castShadow=true; eg.add(post);}
    const rg=new THREE.TorusGeometry(5.5,0.1,4,10),rm=new THREE.MeshLambertMaterial({color:"#a08060",flatShading:true});
    const r1=new THREE.Mesh(rg,rm); r1.rotation.x=-Math.PI/2; r1.position.y=2.2; eg.add(r1); const r2=r1.clone(); r2.position.y=1.2; eg.add(r2);
    const sp=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,4,5),new THREE.MeshLambertMaterial({color:"#5a4a3a",flatShading:true})); sp.position.set(5,2,0); eg.add(sp);
    const sb=new THREE.Mesh(new THREE.BoxGeometry(3.5,1.5,0.2),new THREE.MeshLambertMaterial({color:exp.color,flatShading:true})); sb.position.set(5,3.8,0); sb.castShadow=true; eg.add(sb);
    const orb=new THREE.Mesh(new THREE.SphereGeometry(0.6,8,8),new THREE.MeshBasicMaterial({color:exp.color,transparent:true,opacity:0.85})); orb.position.set(0,4.5,0); orb.userData={exhibitId:i}; eg.add(orb); eClk.push(orb);
    const gr=new THREE.Mesh(new THREE.TorusGeometry(1.0,0.08,8,24),new THREE.MeshBasicMaterial({color:exp.color,transparent:true,opacity:0.4})); gr.position.copy(orb.position); gr.rotation.x=Math.PI/2; eg.add(gr);

    const ag=new THREE.Group(); ag.position.y=0.3; eg.add(ag); aGroups.push(ag);
    if(i===0){
      const body=new THREE.Mesh(new THREE.BoxGeometry(2.2,1.4,1.2),new THREE.MeshPhongMaterial({color:"#FFB833",emissive:"#4a3000",shininess:60,flatShading:true})); body.position.set(0,1.2,0); body.castShadow=true; ag.add(body);
      const head=new THREE.Mesh(new THREE.SphereGeometry(0.75,6,6),new THREE.MeshPhongMaterial({color:"#FFAA00",emissive:"#4a3000",shininess:60,flatShading:true})); head.position.set(1.3,1.8,0); head.castShadow=true; ag.add(head);
      for(let m=0;m<8;m++){const ma=(m/8)*Math.PI*2; const mn=new THREE.Mesh(new THREE.SphereGeometry(0.35,5,5),new THREE.MeshPhongMaterial({color:"#CC7700",emissive:"#3a2200",shininess:40,flatShading:true})); mn.position.set(1.3+Math.cos(ma)*0.85,1.8+Math.sin(ma)*0.85*0.7,Math.sin(ma)*0.85*0.7); ag.add(mn);}
      for(const lx of[-0.6,0.6])for(const lz of[-0.4,0.4]){const lg=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.15,0.8,5),new THREE.MeshPhongMaterial({color:"#FFAA00",emissive:"#3a2800",shininess:40,flatShading:true})); lg.position.set(lx,0.4,lz); ag.add(lg);}
      const tl=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.1,1.8,5),new THREE.MeshPhongMaterial({color:"#CC7700",emissive:"#3a2200",shininess:40,flatShading:true})); tl.position.set(-1.5,1.5,0); tl.rotation.z=Math.PI/3; ag.add(tl);
    } else if(i===1){
      // Eagle - proper bird shape
      // Horizontal body
      const body=new THREE.Mesh(new THREE.SphereGeometry(0.9,7,6),new THREE.MeshPhongMaterial({color:"#6B3010",emissive:"#2a1005",shininess:70,flatShading:true})); body.scale.set(1.8,0.9,1.0); body.position.set(0,2.8,0); body.castShadow=true; ag.add(body);
      // Chest (lighter brown, front)
      const chest=new THREE.Mesh(new THREE.SphereGeometry(0.6,6,5),new THREE.MeshPhongMaterial({color:"#8B5A2B",emissive:"#3a2010",shininess:60,flatShading:true})); chest.scale.set(0.8,0.9,0.9); chest.position.set(0.9,2.7,0); chest.castShadow=true; ag.add(chest);
      // Head - white, at front
      const head=new THREE.Mesh(new THREE.SphereGeometry(0.55,6,6),new THREE.MeshPhongMaterial({color:"#FFFFFF",emissive:"#556677",shininess:100,flatShading:true})); head.position.set(1.5,3.4,0); head.castShadow=true; ag.add(head);
      // Beak - bright yellow, hooked
      const bk=new THREE.Mesh(new THREE.ConeGeometry(0.15,0.6,4),new THREE.MeshPhongMaterial({color:"#FFB800",emissive:"#6a4800",shininess:90,flatShading:true})); bk.position.set(2.1,3.3,0); bk.rotation.z=-Math.PI/2.3; ag.add(bk);
      // Eyes - golden
      for(const s of[-0.25,0.25]){const eye=new THREE.Mesh(new THREE.SphereGeometry(0.08,6,6),new THREE.MeshBasicMaterial({color:"#FFD700"})); eye.position.set(1.75,3.5,s); ag.add(eye);
        const pupil=new THREE.Mesh(new THREE.SphereGeometry(0.04,5,5),new THREE.MeshBasicMaterial({color:"#111111"})); pupil.position.set(1.78,3.5,s); ag.add(pupil);}
      // Left wing (spread)
      const lw1=new THREE.Mesh(new THREE.BoxGeometry(2.0,0.15,1.8),new THREE.MeshPhongMaterial({color:"#4A2008",emissive:"#1a0a02",shininess:50,flatShading:true})); lw1.position.set(-0.2,3.0,-1.5); lw1.rotation.x=0.15; lw1.rotation.z=0.1; lw1.castShadow=true; ag.add(lw1);
      const lw2=new THREE.Mesh(new THREE.BoxGeometry(1.4,0.12,1.2),new THREE.MeshPhongMaterial({color:"#3A1806",emissive:"#100600",shininess:40,flatShading:true})); lw2.position.set(-0.3,3.0,-3.0); lw2.rotation.x=0.25; lw2.castShadow=true; ag.add(lw2);
      // Right wing (spread)
      const rw1=new THREE.Mesh(new THREE.BoxGeometry(2.0,0.15,1.8),new THREE.MeshPhongMaterial({color:"#4A2008",emissive:"#1a0a02",shininess:50,flatShading:true})); rw1.position.set(-0.2,3.0,1.5); rw1.rotation.x=-0.15; rw1.rotation.z=0.1; rw1.castShadow=true; ag.add(rw1);
      const rw2=new THREE.Mesh(new THREE.BoxGeometry(1.4,0.12,1.2),new THREE.MeshPhongMaterial({color:"#3A1806",emissive:"#100600",shininess:40,flatShading:true})); rw2.position.set(-0.3,3.0,3.0); rw2.rotation.x=-0.25; rw2.castShadow=true; ag.add(rw2);
      // Tail feathers - white fan
      const tail=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.12,1.4),new THREE.MeshPhongMaterial({color:"#FFFFFF",emissive:"#445566",shininess:80,flatShading:true})); tail.position.set(-1.6,2.7,0); tail.rotation.z=0.15; ag.add(tail);
      // Talons
      for(const s of[-0.3,0.3]){const leg=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.06,1.2,4),new THREE.MeshPhongMaterial({color:"#FFB800",emissive:"#5a4000",shininess:60,flatShading:true})); leg.position.set(0.2,1.4,s); ag.add(leg);
        for(let c=0;c<3;c++){const claw=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.02,0.3,3),new THREE.MeshPhongMaterial({color:"#333",shininess:40,flatShading:true})); claw.position.set(0.2+(c-1)*0.1,0.75,s); claw.rotation.z=(c-1)*0.3; ag.add(claw);}}
      // Perch (tree branch)
      const pc=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.18,4.5,6),new THREE.MeshLambertMaterial({color:"#6B4A2A",flatShading:true})); pc.position.set(0,0.6,0); pc.rotation.z=0.05; ag.add(pc);
      const branch=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.08,2,5),new THREE.MeshLambertMaterial({color:"#5A3D20",flatShading:true})); branch.position.set(-0.5,1.5,0.8); branch.rotation.z=Math.PI/2.5; ag.add(branch);
    } else if(i===2){
      const body=new THREE.Mesh(new THREE.BoxGeometry(2.0,1.0,0.9),new THREE.MeshPhongMaterial({color:"#9BA8C2",emissive:"#1a2040",shininess:70,flatShading:true})); body.position.set(0,1.0,0); body.castShadow=true; ag.add(body);
      const head=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.6,0.6),new THREE.MeshPhongMaterial({color:"#B0BDD8",emissive:"#1a2040",shininess:70,flatShading:true})); head.position.set(1.2,1.4,0); ag.add(head);
      const sn=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.3,0.35),new THREE.MeshPhongMaterial({color:"#C8D0E8",emissive:"#1a2040",shininess:60,flatShading:true})); sn.position.set(1.6,1.3,0); ag.add(sn);
      for(const s of[-0.2,0.2]){const e=new THREE.Mesh(new THREE.ConeGeometry(0.15,0.4,4),new THREE.MeshPhongMaterial({color:"#7B8AAE",emissive:"#151a30",shininess:50,flatShading:true})); e.position.set(1.1,1.9,s); ag.add(e);}
      for(const lx of[-0.5,0.5])for(const lz of[-0.3,0.3]){const lg=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.1,0.7,5),new THREE.MeshPhongMaterial({color:"#9BA8C2",emissive:"#1a2040",shininess:50,flatShading:true})); lg.position.set(lx,0.35,lz); ag.add(lg);}
      const wt=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.14,1.2,5),new THREE.MeshPhongMaterial({color:"#B0BDD8",emissive:"#1a2040",shininess:50,flatShading:true})); wt.position.set(-1.3,1.3,0); wt.rotation.z=Math.PI/4; ag.add(wt);
      const b2=new THREE.Mesh(new THREE.BoxGeometry(1.4,0.7,0.65),new THREE.MeshPhongMaterial({color:"#C0CADF",emissive:"#1a2040",shininess:60,flatShading:true})); b2.position.set(-2.0,0.8,1.5); b2.rotation.y=0.5; b2.castShadow=true; ag.add(b2);
      const h2=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.45,0.45),new THREE.MeshPhongMaterial({color:"#D0D8EE",emissive:"#1a2040",shininess:60,flatShading:true})); h2.position.set(-1.4,1.1,1.8); ag.add(h2);
    } else if(i===3){
      const body=new THREE.Mesh(new THREE.SphereGeometry(0.8,8,6),new THREE.MeshPhongMaterial({color:"#00C8E0",emissive:"#004455",shininess:100,specular:new THREE.Color("#88ffff"),flatShading:true})); body.scale.set(2,0.7,0.7); body.position.set(0,1.5,0); body.castShadow=true; ag.add(body);
      const ns=new THREE.Mesh(new THREE.ConeGeometry(0.3,1.0,5),new THREE.MeshPhongMaterial({color:"#33DDEE",emissive:"#005566",shininess:100,flatShading:true})); ns.position.set(1.8,1.5,0); ns.rotation.z=-Math.PI/2; ag.add(ns);
      const fn=new THREE.Mesh(new THREE.ConeGeometry(0.3,0.8,4),new THREE.MeshPhongMaterial({color:"#0099BB",emissive:"#003344",shininess:80,flatShading:true})); fn.position.set(-0.2,2.3,0); ag.add(fn);
      for(const s of[-1,1]){const t=new THREE.Mesh(new THREE.BoxGeometry(0.6,0.08,0.4),new THREE.MeshPhongMaterial({color:"#0099BB",emissive:"#003344",shininess:80,flatShading:true})); t.position.set(-1.6,1.5+s*0.3,0); t.rotation.z=s*0.4; ag.add(t);}
      const pl=new THREE.Mesh(new THREE.CylinderGeometry(2.5,2.5,0.3,8),new THREE.MeshPhongMaterial({color:"#00AADD",transparent:true,opacity:0.65,emissive:"#003355",shininess:120,specular:new THREE.Color("#aaeeff"),flatShading:true})); pl.position.y=0.4; ag.add(pl);
    } else if(i===4){
      const body=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.9,0.8),new THREE.MeshPhongMaterial({color:"#FF6B1A",emissive:"#4a1a00",shininess:60,flatShading:true})); body.position.set(0,0.9,0); body.castShadow=true; ag.add(body);
      const head=new THREE.Mesh(new THREE.BoxGeometry(0.6,0.55,0.55),new THREE.MeshPhongMaterial({color:"#FF7722",emissive:"#4a1a00",shininess:60,flatShading:true})); head.position.set(1.0,1.2,0); ag.add(head);
      const sn=new THREE.Mesh(new THREE.ConeGeometry(0.18,0.5,4),new THREE.MeshPhongMaterial({color:"#FFFFFF",emissive:"#334455",shininess:80,flatShading:true})); sn.position.set(1.5,1.1,0); sn.rotation.z=-Math.PI/2; ag.add(sn);
      for(const s of[-0.2,0.2]){const e=new THREE.Mesh(new THREE.ConeGeometry(0.15,0.45,4),new THREE.MeshPhongMaterial({color:"#DD5500",emissive:"#3a1500",shininess:50,flatShading:true})); e.position.set(0.9,1.65,s); ag.add(e);}
      const ch=new THREE.Mesh(new THREE.BoxGeometry(0.4,0.5,0.6),new THREE.MeshPhongMaterial({color:"#FFFFFF",emissive:"#334455",shininess:80,flatShading:true})); ch.position.set(0.6,0.8,0); ag.add(ch);
      const tl=new THREE.Mesh(new THREE.SphereGeometry(0.4,6,5),new THREE.MeshPhongMaterial({color:"#FF6B1A",emissive:"#4a1a00",shininess:60,flatShading:true})); tl.scale.set(2,0.7,0.7); tl.position.set(-1.3,1.1,0); ag.add(tl);
      const tp=new THREE.Mesh(new THREE.SphereGeometry(0.25,5,5),new THREE.MeshPhongMaterial({color:"#FFFFFF",emissive:"#334455",shininess:80,flatShading:true})); tp.position.set(-1.8,1.2,0); ag.add(tp);
      for(const lx of[-0.4,0.4])for(const lz of[-0.25,0.25]){const lg=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.08,0.6,5),new THREE.MeshPhongMaterial({color:"#2a1a0a",emissive:"#0a0500",shininess:30,flatShading:true})); lg.position.set(lx,0.3,lz); ag.add(lg);}
    }
  });

  [[8,5.5,-12],[-10,5.5,-8],[12,5.5,8],[-8,5.5,14],[0,5.5,-16],[16,5.5,-4],[-14,5.5,4],[5,5.5,16],[-5,5.5,-20],[18,5.5,10],[-16,5.5,-10],[10,5.5,-18]].forEach(([tx,ty,tz])=>{
    const h=2+Math.random()*2; const tr=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.3,h,5),new THREE.MeshLambertMaterial({color:"#6b4a2a",flatShading:true})); tr.position.set(tx,ty+h/2,tz); tr.castShadow=true; ig.add(tr);
    const cs=["#2d7a2d","#34882a","#3a9930","#288825"]; for(let l=0;l<2+Math.floor(Math.random()*2);l++){const r=1.5-l*0.35+Math.random()*0.3; const f=new THREE.Mesh(new THREE.ConeGeometry(r,2.2,6),new THREE.MeshLambertMaterial({color:cs[l%cs.length],flatShading:true})); f.position.set(tx,ty+h+l*1.2+0.5,tz); f.castShadow=true; ig.add(f);}
  });
  [[20,4,15],[-22,4,12],[25,3.5,-8],[-18,4,-18],[15,4,-22],[-25,3.5,0],[0,4,24]].forEach(([rx,ry,rz])=>{
    const s=0.8+Math.random()*1.5; const r=new THREE.Mesh(new THREE.DodecahedronGeometry(s,0),new THREE.MeshLambertMaterial({color:new THREE.Color().setHSL(0.08,0.15,0.35+Math.random()*0.15),flatShading:true})); r.position.set(rx,ry,rz); r.rotation.set(Math.random(),Math.random(),Math.random()); r.castShadow=true; ig.add(r);
  });
  EXPERIENCES.forEach((_,i)=>{const a=(i/EXPERIENCES.length)*Math.PI*2-Math.PI/2; for(let s=2;s<8;s++){const t=s/8; const st=new THREE.Mesh(new THREE.CylinderGeometry(0.6,0.7,0.15,6),new THREE.MeshLambertMaterial({color:"#a09080",flatShading:true})); st.position.set(Math.cos(a)*RADIUS*t,4.3,Math.sin(a)*RADIUS*t); st.receiveShadow=true; ig.add(st);}});

  const pCnt=60,pGeo=new THREE.BufferGeometry(),pArr=new Float32Array(pCnt*3);
  for(let i=0;i<pCnt;i++){pArr[i*3]=(Math.random()-0.5)*80;pArr[i*3+1]=5+Math.random()*25;pArr[i*3+2]=(Math.random()-0.5)*80;}
  pGeo.setAttribute("position",new THREE.BufferAttribute(pArr,3));
  const pMat=new THREE.PointsMaterial({color:"#ffdd88",size:0.4,transparent:true,opacity:0.7});
  const particles=new THREE.Points(pGeo,pMat); scene.add(particles);
  const sCnt=300,sGeo=new THREE.BufferGeometry(),sArr=new Float32Array(sCnt*3);
  for(let i=0;i<sCnt;i++){const th=Math.random()*Math.PI*2,ph=Math.random()*Math.PI*0.4,r=150+Math.random()*50; sArr[i*3]=r*Math.sin(ph)*Math.cos(th); sArr[i*3+1]=r*Math.cos(ph)+30; sArr[i*3+2]=r*Math.sin(ph)*Math.sin(th);}
  sGeo.setAttribute("position",new THREE.BufferAttribute(sArr,3));
  scene.add(new THREE.Points(sGeo,new THREE.PointsMaterial({color:"#fff",size:0.5,transparent:true,opacity:0.8})));

  let cA=0,cH=55,cD=70,tA=0,tH=55,tD=70,tL=new THREE.Vector3(0,0,0),cL=new THREE.Vector3(0,0,0),drg=false,lm={x:0,y:0},fId=-1;
  const md=e=>{drg=true;lm={x:e.clientX,y:e.clientY}};
  const mm=e=>{if(drg&&fId===-1){tA-=(e.clientX-lm.x)*0.005;tH=Math.max(15,Math.min(80,tH+(e.clientY-lm.y)*0.15));lm={x:e.clientX,y:e.clientY};}};
  const mu=()=>{drg=false}; const wh=e=>{if(fId===-1)tD=Math.max(30,Math.min(120,tD+e.deltaY*0.05));};
  canvas.addEventListener("mousedown",md);canvas.addEventListener("mousemove",mm);canvas.addEventListener("mouseup",mu);canvas.addEventListener("wheel",wh);
  let lt=null;
  canvas.addEventListener("touchstart",e=>{if(e.touches.length===1)lt={x:e.touches[0].clientX,y:e.touches[0].clientY}});
  canvas.addEventListener("touchmove",e=>{if(e.touches.length===1&&lt&&fId===-1){tA-=(e.touches[0].clientX-lt.x)*0.005;tH=Math.max(15,Math.min(80,tH+(e.touches[0].clientY-lt.y)*0.15));lt={x:e.touches[0].clientX,y:e.touches[0].clientY};}});
  canvas.addEventListener("touchend",()=>{lt=null});
  const rc=new THREE.Raycaster(),mv=new THREE.Vector2();
  const oc=e=>{const r=canvas.getBoundingClientRect();mv.x=((e.clientX-r.left)/r.width)*2-1;mv.y=-((e.clientY-r.top)/r.height)*2+1;rc.setFromCamera(mv,camera);const its=rc.intersectObjects(eClk);
    if(its.length>0){const id=its[0].object.userData.exhibitId;if(fId===id){fId=-1;tH=55;tD=70;tL.set(0,0,0);onSelectExhibit(-1);}else{fId=id;const p=ePos[id];tA=Math.atan2(p.z,p.x);tH=20;tD=25;tL.set(p.x,p.y+2,p.z);onSelectExhibit(id);}}};
  canvas.addEventListener("click",oc);
  const omh=e=>{const r=canvas.getBoundingClientRect();mv.x=((e.clientX-r.left)/r.width)*2-1;mv.y=-((e.clientY-r.top)/r.height)*2+1;rc.setFromCamera(mv,camera);const its=rc.intersectObjects(eClk);canvas.style.cursor=its.length>0?"pointer":"grab";onHover(its.length>0?its[0].object.userData.exhibitId:-1);};
  canvas.addEventListener("mousemove",omh);
  const focusExhibit=id=>{if(id===-1){fId=-1;tH=55;tD=70;tL.set(0,0,0);}else{fId=id;const p=ePos[id];tA=Math.atan2(p.z,p.x);tH=20;tD=25;tL.set(p.x,p.y+2,p.z);}};

  const clock=new THREE.Clock();let aid;
  const animate=()=>{aid=requestAnimationFrame(animate);const t=clock.getElapsedTime();
    cA+=(tA-cA)*0.04;cH+=(tH-cH)*0.04;cD+=(tD-cD)*0.04;cL.lerp(tL,0.04);
    camera.position.set(Math.cos(cA)*cD+cL.x,cH,Math.sin(cA)*cD+cL.z);camera.lookAt(cL);
    const op=ocean.geometry.attributes.position;for(let i=0;i<op.count;i++){op.array[i*3+2]=Math.sin(op.getX(i)*0.08+t*0.8)*0.5+Math.cos(op.getY(i)*0.06+t*0.6)*0.4;}op.needsUpdate=true;ocean.geometry.computeVertexNormals();
    ig.position.y=Math.sin(t*0.3)*0.3;ig.rotation.y=Math.sin(t*0.1)*0.01;
    eClk.forEach((o,i)=>{o.position.y=4.5+Math.sin(t*2+i)*0.3;o.material.opacity=0.6+Math.sin(t*3+i*1.5)*0.25;const s=1+Math.sin(t*2+i)*0.15;o.scale.set(s,s,s);});
    aGroups.forEach((g,i)=>{if(i===0&&g.children[0])g.children[0].scale.y=1+Math.sin(t*1.5)*0.03;
      else if(i===1){const flap=Math.sin(t*2)*0.2; if(g.children[8]){g.children[8].rotation.x=0.15+flap;g.children[9].rotation.x=0.25+flap*1.2;} if(g.children[10]){g.children[10].rotation.x=-0.15-flap;g.children[11].rotation.x=-0.25-flap*1.2;}}
      else if(i===3){g.position.y=0.3+Math.abs(Math.sin(t*1.2))*1.5;g.rotation.z=Math.sin(t*1.2)*0.2;}
      else if(i===4)g.position.y=0.3+Math.sin(t*2)*0.05;});
    const pp=particles.geometry.attributes.position;for(let i=0;i<pCnt;i++){pp.array[i*3+1]+=Math.sin(t+i)*0.01;pp.array[i*3]+=Math.cos(t*0.5+i*0.3)*0.005;}pp.needsUpdate=true;pMat.opacity=0.5+Math.sin(t*0.8)*0.2;
    renderer.render(scene,camera);};
  animate();
  const onResize=()=>{const w=canvas.clientWidth,h=canvas.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);};
  window.addEventListener("resize",onResize);
  return{dispose:()=>{cancelAnimationFrame(aid);window.removeEventListener("resize",onResize);renderer.dispose();},focusExhibit};
}

export default function ZooPortfolio() {
  const canvasRef = useRef(null), sceneRef = useRef(null);
  const [selectedExhibit, setSelectedExhibit] = useState(-1);
  const [hoveredExhibit, setHoveredExhibit] = useState(-1);
  const [activePanel, setActivePanel] = useState(null);
  const [introVisible, setIntroVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const s = buildScene(canvasRef.current, id => setSelectedExhibit(id), id => setHoveredExhibit(id));
    sceneRef.current = s; setTimeout(() => setLoaded(true), 500);
    return () => s.dispose();
  }, []);

  const handleExhibitNav = useCallback(id => { if (sceneRef.current) { sceneRef.current.focusExhibit(id); setSelectedExhibit(id); } }, []);
  const handleClose = useCallback(() => { if (sceneRef.current) { sceneRef.current.focusExhibit(-1); setSelectedExhibit(-1); } }, []);
  const togglePanel = p => setActivePanel(prev => prev === p ? null : p);
  const exp = selectedExhibit >= 0 ? EXPERIENCES[selectedExhibit] : null;

  const panelStyle = { position: "absolute", top: "80px", right: "28px", width: "min(420px, calc(100vw - 56px))", background: "rgba(8,18,38,0.97)", backdropFilter: "blur(24px)", borderRadius: "20px", border: "1px solid rgba(91,141,239,0.15)", padding: 0, zIndex: 20, boxShadow: "0 24px 80px rgba(0,0,0,0.6)", maxHeight: "calc(100vh - 120px)", overflowY: "auto" };
  const labelStyle = { color: "#4a6090", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, marginBottom: "10px" };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative", fontFamily: "'Outfit', sans-serif", background: "#0a1628" }}>
      <style>{`
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(91,141,239,0.3);border-radius:10px}
        .nb{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:#8899bb;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-weight:500;font-family:'Outfit',sans-serif;backdrop-filter:blur(10px);transition:all .25s ease}
        .nb:hover{background:rgba(91,141,239,0.2);color:#fff;border-color:rgba(91,141,239,0.3)}
        .nb.ac{background:rgba(91,141,239,0.25);color:#fff;border-color:rgba(91,141,239,0.4)}
        .eb{border-radius:12px;padding:10px 16px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all .3s ease;min-width:80px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.06)}
        .eb:hover{transform:translateY(-4px)}
        .tag{padding:5px 12px;border-radius:6px;font-size:11px;background:rgba(255,255,255,0.06);color:#7a90b8;border:1px solid rgba(255,255,255,0.05);font-family:'Outfit',sans-serif}
        .pc{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:18px;transition:all .25s ease;cursor:default}
        .pc:hover{background:rgba(255,255,255,0.06);border-color:rgba(91,141,239,0.2)}
        .rv{display:inline-flex;align-items:center;gap:5px;background:rgba(56,201,177,0.15);color:#38C9B1;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 10px;border-radius:6px}
        .rn{margin-top:14px;padding:14px 16px;background:rgba(56,201,177,0.08);border-radius:10px;border:1px solid rgba(56,201,177,0.15)}
      `}</style>

      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

      {introVisible && (
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #0f2847 0%, #0a1628 70%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 100, transition: "opacity 1s ease", opacity: loaded ? 1 : 0 }}>
          <div style={{ fontSize: "13px", letterSpacing: "6px", textTransform: "uppercase", color: "#5B8DEF", marginBottom: "16px", fontWeight: 500 }}>Welcome to</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 7vw, 72px)", color: "#fff", margin: "0 0 8px", textAlign: "center", lineHeight: 1.1 }}>Danylo's Zoo Island</h1>
          <p style={{ color: "#8899bb", fontSize: "clamp(13px, 2vw, 17px)", maxWidth: "520px", textAlign: "center", margin: "12px 20px 16px", lineHeight: 1.7 }}>A 3D portfolio experience — each exhibit tells the story of a career milestone. Explore the island to discover 7+ years of full-stack engineering.</p>

          <button onClick={() => setIntroVisible(false)} style={{ background: "linear-gradient(135deg, #5B8DEF, #7C6EE6)", border: "none", color: "#fff", padding: "16px 48px", borderRadius: "60px", fontSize: "16px", fontWeight: 600, cursor: "pointer", letterSpacing: "1px", boxShadow: "0 4px 30px rgba(91,141,239,0.4)", transition: "transform 0.2s, box-shadow 0.2s", fontFamily: "'Outfit', sans-serif" }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 6px 40px rgba(91,141,239,0.6)"; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 30px rgba(91,141,239,0.4)"; }}>Enter the Zoo 🏝️</button>
        </div>
      )}

      {!introVisible && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(180deg, rgba(10,22,40,0.92) 0%, transparent 100%)", zIndex: 10, flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, #5B8DEF, #7C6EE6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 800, color: "#fff" }}>D</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "16px", lineHeight: 1.2 }}>Danylo Bilous</div>
              <div style={{ color: "#5a6d8a", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" }}>Senior Full Stack Engineer · 7+ yrs</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {["About", "Skills", "Projects"].map(l => <button key={l} className={`nb ${activePanel === l.toLowerCase() ? "ac" : ""}`} onClick={() => togglePanel(l.toLowerCase())}>{l}</button>)}
            <button className="nb" onClick={() => window.open("mailto:codegenerator1994@gmail.com")}>✉ Contact</button>
          </div>
        </div>
      )}

      {activePanel === "about" && (
        <div style={{ ...panelStyle, animation: "slideUp 0.3s ease-out" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "22px", margin: 0, padding: "24px 28px 0" }}>About Me</h3>
          <div style={{ padding: "16px 28px 28px" }}>
            <div style={labelStyle}>Professional Summary</div>
            <p style={{ color: "#a0b4d0", fontSize: "13.5px", lineHeight: 1.75, margin: "0 0 20px" }}>{PROFILE.summary}</p>
            <div style={labelStyle}>Details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[["📍","Location",PROFILE.location],["✉️","Email",PROFILE.email],["🔗","Portfolio","View Portfolio →"]].map(([icon,label,value],i)=>(
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "16px", width: "24px", textAlign: "center" }}>{icon}</span>
                  <div>
                    <div style={{ color: "#4a6090", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>{label}</div>
                    {i===2?<a href={PROFILE.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: "#5B8DEF", fontSize: "13px", textDecoration: "none" }}>{value}</a>:<div style={{ color: "#b0c0dd", fontSize: "13px" }}>{value}</div>}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {activePanel === "skills" && (
        <div style={{ ...panelStyle, animation: "slideUp 0.3s ease-out" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "22px", margin: 0, padding: "24px 28px 0" }}>Core Skills</h3>
          <div style={{ padding: "16px 28px 28px" }}>
            {Object.entries(SKILLS).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: "16px" }}>
                <div style={{ ...labelStyle, marginBottom: "8px" }}>{cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {skills.map((sk, i) => {
                    return <span key={i} style={{ padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 500, background: "rgba(91,141,239,0.1)", color: "#8aafe8", border: "1px solid rgba(91,141,239,0.12)" }}>{sk}</span>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activePanel === "projects" && (
        <div style={{ ...panelStyle, animation: "slideUp 0.3s ease-out" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 28px 0" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "22px", margin: 0 }}>Featured Projects</h3>
          </div>
          <div style={{ padding: "16px 28px 28px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {FEATURED_PROJECTS.map((proj, i) => (
                <div key={i} className="pc">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "22px" }}>{proj.icon}</span>
                      <div><div style={{ color: "#e0e8f4", fontSize: "14px", fontWeight: 600, lineHeight: 1.3 }}>{proj.title}</div></div>
                    </div>
                    <span style={{ padding: "3px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 600, background: "rgba(91,141,239,0.15)", color: "#5B8DEF", whiteSpace: "nowrap" }}>{proj.metric}</span>
                  </div>
                  <p style={{ color: "#7a90b8", fontSize: "12.5px", lineHeight: 1.6, margin: "0 0 10px" }}>{proj.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>{proj.tech.map((t, j) => <span key={j} className="tag">{t}</span>)}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}




      {!introVisible && selectedExhibit === -1 && (<>
        <div style={{ position: "absolute", bottom: "110px", left: "50%", transform: "translateX(-50%)", color: "#3d5070", fontSize: "12px", textAlign: "center", zIndex: 10, letterSpacing: "1px", animation: "pulse 3s ease-in-out infinite" }}>🖱️ DRAG TO ORBIT · SCROLL TO ZOOM · CLICK ORBS TO EXPLORE</div>
        <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10, padding: "12px 16px", background: "rgba(8,18,38,0.9)", backdropFilter: "blur(16px)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
          {EXPERIENCES.map((e, i) => (
            <button key={i} className="eb" onClick={() => handleExhibitNav(i)}
              style={{ background: hoveredExhibit === i ? e.color : undefined, borderColor: hoveredExhibit === i ? e.color : undefined }}
              onMouseEnter={ev => { ev.currentTarget.style.background = e.color; ev.currentTarget.style.borderColor = e.color; }}
              onMouseLeave={ev => { ev.currentTarget.style.background = hoveredExhibit === i ? e.color : "rgba(255,255,255,0.06)"; ev.currentTarget.style.borderColor = hoveredExhibit === i ? e.color : "rgba(255,255,255,0.1)"; }}>
              <span style={{ fontSize: "20px" }}>{e.animalEmoji}</span>
              <span style={{ color: "#fff", fontSize: "10px", fontWeight: 600, letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{e.company}</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px" }}>{e.duration}</span>
            </button>
          ))}
        </div>
      </>)}

      {exp && (
        <div style={{ position: "absolute", bottom: "24px", left: "24px", width: "min(440px, calc(100vw - 48px))", background: "rgba(8,18,38,0.97)", backdropFilter: "blur(24px)", borderRadius: "20px", border: `1px solid ${exp.color}25`, zIndex: 20, boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 50px ${exp.color}10`, overflow: "hidden", animation: "slideUp 0.4s ease-out" }}>
          <div style={{ background: `linear-gradient(135deg, ${exp.color}20, ${exp.color}08)`, padding: "22px 24px 16px", borderBottom: `1px solid ${exp.color}15` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `${exp.color}20`, padding: "4px 12px 4px 8px", borderRadius: "20px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "16px" }}>{exp.animalEmoji}</span><span style={{ color: exp.color, fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px" }}>{exp.exhibit}</span>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "20px", margin: "0 0 4px", lineHeight: 1.2 }}>{exp.company}</h2>
                <div style={{ color: "#a0b4d0", fontSize: "13px", fontWeight: 500 }}>{exp.role}</div>
                <div style={{ color: "#4a6090", fontSize: "12px", marginTop: "3px" }}>{exp.period} · {exp.duration}{exp.location && ` · ${exp.location}`}</div>
              </div>
              <button onClick={handleClose} className="nb" style={{ width: "30px", height: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>✕</button>
            </div>
          </div>
          <div style={{ padding: "16px 24px 16px", maxHeight: "300px", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}><div style={labelStyle}>Key Achievements</div></div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {exp.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ minWidth: "6px", height: "6px", borderRadius: "50%", background: exp.color, marginTop: "7px", flexShrink: 0 }} />
                  <span style={{ color: "#a0b4d0", fontSize: "12.5px", lineHeight: 1.6 }}>{h}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "16px" }}>{exp.tech.map((t, i) => <span key={i} className="tag">{t}</span>)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 24px 14px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <button className="nb" style={{ padding: "6px 14px", fontSize: "12px" }} onClick={() => handleExhibitNav(selectedExhibit > 0 ? selectedExhibit - 1 : EXPERIENCES.length - 1)}>← Prev</button>
            <span style={{ color: "#3d5070", fontSize: "11px", fontWeight: 600 }}>{selectedExhibit + 1} / {EXPERIENCES.length}</span>
            <button className="nb" style={{ padding: "6px 14px", fontSize: "12px" }} onClick={() => handleExhibitNav(selectedExhibit < EXPERIENCES.length - 1 ? selectedExhibit + 1 : 0)}>Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}
