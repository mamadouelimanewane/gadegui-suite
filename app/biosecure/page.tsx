"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Portail Gade Gui</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const lots = [
  {id:"LOT-2025-001",lieu:"Poulailler A",espece:"Poulets de chair",effectif:2400,age:28,statut:"sain",mortalite:0.8,prochain:"Marek J+2"},
  {id:"LOT-2025-002",lieu:"Poulailler B",espece:"Poulets de chair",effectif:2150,age:35,statut:"alerte",mortalite:2.4,prochain:"Newcastle J+1"},
  {id:"LOT-2025-003",lieu:"Poulailler C",espece:"Poules pondeuses",effectif:3200,age:14,statut:"sain",mortalite:0.3,prochain:"Gumboro J+5"},
  {id:"LOT-2025-004",lieu:"Étable",espece:"Bovins",effectif:48,age:720,statut:"sain",mortalite:0,prochain:"Fièvre aphteuse J+10"},
]

const protocoles = [
  {id:1,action:"Désinfection Poulailler A",operateur:"Mamadou D.",date:"22/06/2025 07:30",statut:"fait",note:"Glutaraldéhyde 2% — OK"},
  {id:2,action:"Vaccination Newcastle — LOT-002",operateur:"Dr. Fatou N.",date:"22/06/2025 09:00",statut:"fait",note:"Vaccin HB1 voie oculaire — 2150 sujets"},
  {id:3,action:"Désinfection Poulailler B",operateur:"Ibrahima S.",date:"22/06/2025 14:00",statut:"planifié",note:"—"},
  {id:4,action:"Pesée LOT-001",operateur:"Aminata K.",date:"23/06/2025 08:00",statut:"planifié",note:"—"},
  {id:5,action:"Visite vétérinaire LOT-002",operateur:"Dr. Oumar B.",date:"23/06/2025 10:00",statut:"planifié",note:"Suivi mortalité élevée"},
]

const sc: Record<string,{label:string;color:string;bg:string}> = {
  sain:    {label:"Sain",    color:"#34d399", bg:"rgba(52,211,153,.15)"},
  alerte:  {label:"Alerte",  color:"#f87171", bg:"rgba(248,113,113,.15)"},
  planifié:{label:"Planifié",color:"#60a5fa", bg:"rgba(96,165,250,.15)"},
  fait:    {label:"Fait",    color:"#34d399", bg:"rgba(52,211,153,.15)"},
}

export default function BioSecure() {
  const [tab, setTab] = useState<"lots"|"protocoles"|"rapport">("lots")
  const [form, setForm] = useState({action:"",operateur:"",note:""})

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .4s ease both} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}} .pulse{animation:pulse 2s infinite}`}</style>
      {NAV}

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#1a0000,#3b0000 50%,#020d07)",borderBottom:"1px solid rgba(239,68,68,.2)",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#fca5a5",marginBottom:4}}>APPLICATION 1.2</div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>🛡️ BioSecure</h1>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:13}}>Biosécurité & Santé Animale — Surveillance des lots avicoles et bovins</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            <div style={{background:"rgba(248,113,113,.1)",border:"1px solid rgba(248,113,113,.3)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:"#f87171"}}>1</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>Alerte active</div>
            </div>
            <div style={{background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.3)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:"#34d399"}}>7 800</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>Animaux suivis</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem 2rem 3rem"}}>
        {/* Bannière alerte */}
        <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:12,padding:"12px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
          <span className="pulse" style={{fontSize:20}}>🚨</span>
          <div>
            <span style={{fontWeight:700,color:"#f87171"}}>ALERTE — LOT-2025-002</span>
            <span style={{color:"rgba(255,255,255,.6)",fontSize:13,marginLeft:8}}>Mortalité à 2.4% (seuil : 1.5%). Visite vétérinaire planifiée demain 10h.</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,marginBottom:20,background:"rgba(255,255,255,.04)",borderRadius:12,padding:4,width:"fit-content"}}>
          {(["lots","protocoles","rapport"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,background:tab===t?"rgba(5,150,80,.25)":"transparent",color:tab===t?"#34d399":"rgba(255,255,255,.45)",transition:"all .2s"}}>
              {t==="lots"?"🐔 Lots":t==="protocoles"?"📋 Protocoles":"📊 Rapport HACCP"}
            </button>
          ))}
        </div>

        {tab==="lots" && (
          <div style={{display:"flex",flexDirection:"column",gap:12}} className="fade">
            {lots.map(l=>{
              const s = sc[l.statut]
              return (
                <div key={l.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"18px 20px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                        <span style={{fontWeight:700,fontSize:15}}>{l.id}</span>
                        <span style={{fontSize:11,color:s.color,background:s.bg,padding:"2px 8px",borderRadius:8}}>{s.label}</span>
                      </div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,.45)"}}>{l.espece} · {l.lieu} · Âge : {l.age} jours</div>
                    </div>
                    <div style={{display:"flex",gap:16}}>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:20,fontWeight:800,color:"#34d399"}}>{l.effectif.toLocaleString()}</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>Effectif</div>
                      </div>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:20,fontWeight:800,color:l.mortalite>1.5?"#f87171":"#34d399"}}>{l.mortalite}%</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>Mortalité</div>
                      </div>
                    </div>
                  </div>
                  <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Prochain acte : <strong style={{color:"#60a5fa"}}>{l.prochain}</strong></span>
                    <button style={{background:"rgba(5,150,80,.15)",border:"1px solid rgba(5,150,80,.3)",borderRadius:8,padding:"6px 14px",color:"#34d399",fontSize:12,fontWeight:600,cursor:"pointer"}}>Voir historique →</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab==="protocoles" && (
          <div className="fade">
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
              {protocoles.map(p=>{
                const s = sc[p.statut]
                return (
                  <div key={p.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:12,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:13,marginBottom:3}}>{p.action}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>👤 {p.operateur} · 🕐 {p.date}</div>
                      {p.note!=="—" && <div style={{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:4}}>{p.note}</div>}
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:s.color,background:s.bg,padding:"4px 12px",borderRadius:8,whiteSpace:"nowrap"}}>{s.label}</span>
                  </div>
                )
              })}
            </div>
            {/* Formulaire ajout protocole */}
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.15)",borderRadius:14,padding:"20px"}}>
              <h3 style={{fontWeight:700,marginBottom:14,color:"#6ee7b7"}}>➕ Enregistrer un acte de biosécurité</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                {([["action","Action / Intervention"],["operateur","Opérateur responsable"]] as const).map(([k,pl])=>(
                  <input key={k} value={form[k as keyof typeof form]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={pl}
                    style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(5,150,80,.2)",borderRadius:8,padding:"10px 12px",color:"white",fontSize:13,outline:"none"}}/>
                ))}
              </div>
              <textarea value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="Notes & observations..." rows={3}
                style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(5,150,80,.2)",borderRadius:8,padding:"10px 12px",color:"white",fontSize:13,outline:"none",resize:"none",marginBottom:12}}/>
              <button onClick={()=>setForm({action:"",operateur:"",note:""})}
                style={{background:"linear-gradient(135deg,#059669,#16a34a)",border:"none",borderRadius:8,padding:"10px 24px",color:"white",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                ✅ Enregistrer & Signer numériquement
              </button>
            </div>
          </div>
        )}

        {tab==="rapport" && (
          <div className="fade" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {[
              {title:"Score Biosécurité Global",value:"87 / 100",color:"#34d399",desc:"Niveau : Bon — 3 points d'amélioration identifiés"},
              {title:"Conformité HACCP",value:"92%",color:"#60a5fa",desc:"8 points de contrôle sur 87 validés ce mois"},
              {title:"Mortalité Globale",value:"0.9%",color:"#34d399",desc:"Sous le seuil critique de 1.5% (hors LOT-002)"},
              {title:"Désinfections effectuées",value:"34",color:"#a78bfa",desc:"Ce mois — 100% signées numériquement"},
              {title:"Vaccinations réalisées",value:"8 550",color:"#fbbf24",desc:"Sujets vaccinés ce mois sur 3 lots"},
              {title:"Alertes résolues",value:"6 / 7",color:"#34d399",desc:"1 alerte en cours (LOT-002)"},
            ].map(k=>(
              <div key={k.title} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"20px"}}>
                <div style={{fontSize:28,fontWeight:800,color:k.color,marginBottom:4}}>{k.value}</div>
                <div style={{fontWeight:700,marginBottom:4}}>{k.title}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{k.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
