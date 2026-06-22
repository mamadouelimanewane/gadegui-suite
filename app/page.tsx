"use client"
import { useState } from "react"

const SECTIONS = [
  {
    id:"production", label:"Produire Mieux", icon:"🌱", color:"#059669", dark:"#022c22",
    desc:"Précision agricole, biosécurité et optimisation des rendements",
    apps:[
      {id:"smartfarm",   name:"SmartFarm",         href:"/smartfarm",   icon:"📡", desc:"IoT & Agriculture de Précision",   color:"#059669"},
      {id:"biosecure",   name:"BioSecure",          href:"/biosecure",   icon:"🛡️", desc:"Biosécurité & Santé Animale",     color:"#16a34a"},
      {id:"agrosat",     name:"AgroSat",             href:"/agrosat",     icon:"🛰️", desc:"Surveillance Satellitaire NDVI",  color:"#15803d"},
    ],
  },
  {
    id:"commerce", label:"Vendre Mieux", icon:"🛒", color:"#d97706", dark:"#451a03",
    desc:"E-commerce avancé, logistique intelligente et traçabilité",
    apps:[
      {id:"market",      name:"GadeGui Market",     href:"/market",      icon:"🏪", desc:"Marketplace B2B & B2C",           color:"#d97706"},
      {id:"logistics",   name:"Agri-Logistics",     href:"/logistics",   icon:"🚛", desc:"Chaîne du Froid & Flotte GPS",    color:"#b45309"},
      {id:"trace",       name:"GadeGui Trace",       href:"/trace",       icon:"🔍", desc:"Traçabilité Produit QR Code",     color:"#92400e"},
    ],
  },
  {
    id:"formation", label:"Former & Transmettre", icon:"🎓", color:"#7c3aed", dark:"#2e1065",
    desc:"Plateforme nationale de formation agricole numérique",
    apps:[
      {id:"agroschool",  name:"AgroSchool",          href:"/agroschool",  icon:"📱", desc:"Formation Agricole Nationale",    color:"#7c3aed"},
      {id:"academy",     name:"GadeGui Academy",     href:"/academy",     icon:"🏫", desc:"Formation Continue Interne",      color:"#6d28d9"},
    ],
  },
  {
    id:"reseau", label:"Réseau & Financement", icon:"🌍", color:"#0891b2", dark:"#082f49",
    desc:"Coopératives, crowdfunding agricole et reporting RSE",
    apps:[
      {id:"partner",     name:"Partner App",         href:"/partner",     icon:"🤝", desc:"Gestion des Coopératives",        color:"#0891b2"},
      {id:"agrifinance", name:"AgriFinance",         href:"/agrifinance", icon:"💰", desc:"Crowdfunding & ESG Dashboard",    color:"#0e7490"},
    ],
  },
]
const ALL = SECTIONS.flatMap(s=>s.apps)

export default function Home() {
  const [q, setQ] = useState("")
  const res = q.trim() ? ALL.filter(a=>a.name.toLowerCase().includes(q.toLowerCase())||a.desc.toLowerCase().includes(q.toLowerCase())) : null
  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .acard{transition:all .2s ease;text-decoration:none;display:block}
        .acard:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(5,150,80,.2)}
        input::placeholder{color:rgba(255,255,255,.3)}
      `}</style>

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#022c22,#014421 50%,#020d07)",borderBottom:"1px solid rgba(5,150,80,.2)",padding:"3.5rem 2rem 2.5rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 34px,#059669 34px,#059669 35px),repeating-linear-gradient(90deg,transparent,transparent 34px,#059669 34px,#059669 35px)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:52,marginBottom:10}}>🌾</div>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".18em",color:"#6ee7b7",marginBottom:8}}>GADE GUI AGRO INDUSTRIAL PARK — DAKAR, SÉNÉGAL</div>
          <h1 style={{fontSize:"clamp(2rem,5vw,3rem)",fontWeight:800,background:"linear-gradient(135deg,#fff,#6ee7b7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:12,lineHeight:1.2}}>Écosystème Digital</h1>
          <p style={{color:"rgba(255,255,255,.5)",fontSize:15,maxWidth:520,margin:"0 auto 24px"}}>10 applications pour transformer Gade Gui en référence continentale de l&apos;agro-industrie intelligente</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:28}}>
            {[["10","Applications"],["4","Blocs"],["2019","Fondé"],["Dakar","Sénégal"]].map(([v,l])=>(
              <div key={l} style={{background:"rgba(5,150,80,.1)",border:"1px solid rgba(5,150,80,.25)",borderRadius:12,padding:"10px 20px",textAlign:"center"}}>
                <div style={{fontSize:20,fontWeight:800,color:"#34d399"}}>{v}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{maxWidth:420,margin:"0 auto",position:"relative"}}>
            <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:15,color:"rgba(255,255,255,.3)"}}>🔍</span>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Rechercher une application..." style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(5,150,80,.25)",borderRadius:12,padding:"12px 16px 12px 40px",color:"white",fontSize:14,outline:"none"}}/>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"2.5rem 1.5rem 4rem"}}>
        {res ? (
          <>
            <p style={{marginBottom:14,color:"rgba(255,255,255,.4)",fontSize:13}}>{res.length} résultat(s) pour &quot;{q}&quot;</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
              {res.map(a=><Card key={a.id} app={a}/>)}
            </div>
          </>
        ) : SECTIONS.map((sec,i)=>(
          <div key={sec.id} style={{marginBottom:"3rem",animation:`fadeUp .5s ease ${i*.08}s both`}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18,padding:"14px 20px",background:`linear-gradient(135deg,${sec.dark},transparent)`,border:`1px solid ${sec.color}30`,borderRadius:14}}>
              <span style={{fontSize:28}}>{sec.icon}</span>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                  <span style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:sec.color}}>ÉTAPE {i+1}/4</span>
                  <span style={{width:3,height:3,borderRadius:"50%",background:sec.color,display:"inline-block"}}/>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{sec.apps.length} applications</span>
                </div>
                <div style={{fontSize:18,fontWeight:700}}>{sec.label}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{sec.desc}</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
              {sec.apps.map(a=><Card key={a.id} app={a}/>)}
            </div>
          </div>
        ))}
      </div>

      <div style={{borderTop:"1px solid rgba(5,150,80,.1)",padding:"1.5rem",textAlign:"center",color:"rgba(255,255,255,.2)",fontSize:12}}>
        Gade Gui Agro Industrial Park · Dakar, Sénégal · Processingenierie © 2025
      </div>
    </div>
  )
}

function Card({app}:{app:{name:string;href:string;icon:string;desc:string;color:string}}) {
  return (
    <a href={app.href} className="acard" style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px 18px",borderTop:`3px solid ${app.color}`}}>
      <div style={{fontSize:28,marginBottom:10}}>{app.icon}</div>
      <div style={{fontSize:14,fontWeight:700,color:"white",marginBottom:4}}>{app.name}</div>
      <div style={{fontSize:12,color:"rgba(255,255,255,.4)",lineHeight:1.5}}>{app.desc}</div>
      <div style={{marginTop:14,fontSize:12,color:app.color,fontWeight:600}}>Ouvrir →</div>
    </a>
  )
}
