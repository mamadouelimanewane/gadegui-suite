"use client"
import { useState, useEffect } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.96)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Accueil</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const MONTHS = ["Jan","Fév","Mar","Avr","Mai","Jun"]
const CA_DATA = [1820000,2100000,1950000,2380000,2600000,2840000]
const MAX_CA = Math.max(...CA_DATA)

const ALERTES = [
  {type:"warning",msg:"Stock tomates sous le seuil — Boutique Almadies",time:"Il y a 8 min"},
  {type:"info",   msg:"8 livreurs actifs — 34 livraisons en cours",     time:"En temps réel"},
  {type:"success",msg:"CA journalier dépasse l'objectif de 15%",        time:"Il y a 22 min"},
  {type:"warning",msg:"Coopérative Parcelles — retard livraison CF-012", time:"Il y a 1h"},
]

const KPIS_MODULES = [
  {label:"SmartFarm",    emoji:"📡",val:"94%",sub:"Capteurs actifs",    color:"#059669"},
  {label:"GadeGui Shop", emoji:"🛍️",val:"127",sub:"Commandes/jour",     color:"#d97706"},
  {label:"GGExpress",    emoji:"⚡",val:"34",  sub:"Livraisons actives", color:"#f97316"},
  {label:"AgroSchool",   emoji:"📚",val:"213", sub:"Apprenants actifs",  color:"#7c3aed"},
  {label:"AgriFinance",  emoji:"💰",val:"98%", sub:"Taux remboursement", color:"#0891b2"},
  {label:"Partner",      emoji:"🤝",val:"12",  sub:"Coopératives sync",  color:"#16a34a"},
]

export default function CEODashboard() {
  const [tick, setTick] = useState(0)
  const [caLive, setCaLive] = useState(284000)

  useEffect(()=>{
    const t = setInterval(()=>{
      setTick(n=>n+1)
      setCaLive(n=>n+Math.floor(Math.random()*2000+500))
    },3000)
    return()=>clearInterval(t)
  },[])

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .3s ease both} @keyframes countUp{from{opacity:0}to{opacity:1}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}} .pulse{animation:pulse 2s infinite}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#0a1a10,#02200e 50%,#020d07)",borderBottom:"1px solid rgba(5,150,80,.2)",padding:"1.2rem 2rem"}}>
        <div style={{maxWidth:1300,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".14em",color:"#6ee7b7",marginBottom:3}}>DIRECTION GÉNÉRALE · GADE GUI</div>
            <h1 style={{fontSize:24,fontWeight:800}}>👑 CEO Dashboard</h1>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:12}}>Vue 360° de l'écosystème · {new Date().toLocaleDateString("fr-FR",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span className="pulse" style={{width:8,height:8,borderRadius:"50%",background:"#34d399",display:"inline-block"}}/>
            <span style={{fontSize:12,color:"#34d399",fontWeight:600}}>Données en temps réel</span>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1300,margin:"0 auto",padding:"1.5rem 2rem 4rem"}}>

        {/* KPIs principaux */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:20}} className="fade">
          {[
            {l:"CA Aujourd'hui",v:`${caLive.toLocaleString()} F`,sub:`+${tick*2+18}% vs hier`,c:"#34d399",bg:"rgba(52,211,153,.08)",border:"rgba(52,211,153,.15)"},
            {l:"CA Ce Mois",v:"2 840 000 F",sub:"+12.5% vs mai",c:"#fbbf24",bg:"rgba(251,191,36,.08)",border:"rgba(251,191,36,.15)"},
            {l:"Livraisons actives",v:"34",sub:"8 livreurs en ligne",c:"#f97316",bg:"rgba(249,115,22,.08)",border:"rgba(249,115,22,.15)"},
            {l:"Stock critique",v:"3 alertes",sub:"Voir boutiques",c:"#ef4444",bg:"rgba(239,68,68,.08)",border:"rgba(239,68,68,.15)"},
            {l:"Clients actifs",v:"1 284",sub:"+45 cette semaine",c:"#60a5fa",bg:"rgba(96,165,250,.08)",border:"rgba(96,165,250,.15)"},
            {l:"Score ESG",v:"87 / 100",sub:"Certifié Proparco",c:"#a78bfa",bg:"rgba(167,139,250,.08)",border:"rgba(167,139,250,.15)"},
          ].map(k=>(
            <div key={k.l} style={{background:k.bg,border:`1px solid ${k.border}`,borderRadius:14,padding:"16px"}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginBottom:6,fontWeight:600,letterSpacing:".08em"}}>{k.l.toUpperCase()}</div>
              <div style={{fontSize:22,fontWeight:800,color:k.c,marginBottom:4}}>{k.v}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{k.sub}</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:16}}>
          {/* Graphe CA */}
          <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,padding:"20px"}} className="fade">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <h3 style={{fontWeight:700,fontSize:14}}>Chiffre d'affaires — 6 derniers mois</h3>
              <span style={{fontSize:12,color:"#34d399",fontWeight:600}}>▲ +13.3%</span>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",gap:12,height:160}}>
              {CA_DATA.map((v,i)=>(
                <div key={MONTHS[i]} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.4)",fontWeight:600}}>{(v/1000).toFixed(0)}k</div>
                  <div style={{width:"100%",background:`linear-gradient(180deg,${i===5?"#059669":"rgba(5,150,80,.4)"},${i===5?"#16a34a":"rgba(5,150,80,.1)"})`,borderRadius:"4px 4px 0 0",height:`${(v/MAX_CA)*130}px`,transition:"height .5s ease",border:i===5?"1px solid rgba(5,150,80,.5)":""}}/>
                  <div style={{fontSize:11,color:i===5?"#34d399":"rgba(255,255,255,.35)",fontWeight:i===5?700:400}}>{MONTHS[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Alertes */}
          <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,padding:"16px"}} className="fade">
            <h3 style={{fontWeight:700,fontSize:14,marginBottom:14}}>🔔 Alertes critiques</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {ALERTES.map((a,i)=>(
                <div key={i} style={{padding:"10px 12px",borderRadius:10,background:a.type==="warning"?"rgba(251,191,36,.06)":a.type==="success"?"rgba(52,211,153,.06)":"rgba(96,165,250,.06)",border:`1px solid ${a.type==="warning"?"rgba(251,191,36,.2)":a.type==="success"?"rgba(52,211,153,.2)":"rgba(96,165,250,.2)"}`}}>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:2}}>{a.msg}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPIs modules */}
        <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,padding:"20px"}} className="fade">
          <h3 style={{fontWeight:700,fontSize:14,marginBottom:14}}>📊 Performance par module</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>
            {KPIS_MODULES.map(m=>(
              <div key={m.label} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,padding:"14px",display:"flex",gap:10,alignItems:"center"}}>
                <span style={{fontSize:24}}>{m.emoji}</span>
                <div>
                  <div style={{fontSize:14,fontWeight:800,color:m.color}}>{m.val}</div>
                  <div style={{fontSize:11,fontWeight:600}}>{m.label}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{m.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
