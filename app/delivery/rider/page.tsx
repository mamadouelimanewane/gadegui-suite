"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/delivery" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Gade Gui Express</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const MISSIONS = [
  {id:"GGX-089",client:"Hôtel Terrou-Bi",  adresse:"Almadies, Dakar",dist:"1.8 km",montant:185000,frais:800, statut:"active" as const},
  {id:"GGX-090",client:"Ndèye Diallo",      adresse:"Parcelles Ass.",  dist:"4.2 km",montant:25000, frais:1200,statut:"pending" as const},
]

const HISTORIQUE = [
  {id:"GGX-088",client:"Aminata Sow",    adresse:"Yoff",      montant:15000,gain:800, date:"Aujourd'hui 09:30",note:5},
  {id:"GGX-082",client:"Ousmane Faye",   adresse:"Médina",    montant:8000, gain:1200,date:"Hier 14:15",       note:4},
  {id:"GGX-077",client:"Mariam Fall",    adresse:"Plateau",   montant:45000,gain:2500,date:"Hier 10:00",       note:5},
]

export default function RiderApp() {
  const [online, setOnline] = useState(true)
  const [tab, setTab] = useState<"missions"|"gains"|"profil">("missions")
  const [missionActive, setMissionActive] = useState<string|null>("GGX-089")

  const gainJour = HISTORIQUE.filter(h=>h.date.includes("Aujourd")).reduce((s,h)=>s+h.gain,0) + 800
  const gainSemaine = HISTORIQUE.reduce((s,h)=>s+h.gain,0) + 800

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .35s ease both} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}} .pulse{animation:pulse 2s infinite}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#1a0000,#3b0000 50%,#020d07)",borderBottom:"1px solid rgba(239,68,68,.2)",padding:"1.2rem 2rem"}}>
        <div style={{maxWidth:440,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#fca5a5",marginBottom:3}}>LIVRAISON · MODULE 6</div>
            <h1 style={{fontSize:22,fontWeight:800}}>📱 App Rider</h1>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:12}}>Interface mobile du livreur Gade Gui Express</p>
          </div>
        </div>
      </div>

      {/* Phone mockup */}
      <div style={{maxWidth:440,margin:"0 auto",padding:"1.5rem 1rem 4rem"}}>
        <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(5,150,80,.15)",borderRadius:32,overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,.6)"}}>
          {/* Status bar */}
          <div style={{background:"rgba(2,13,7,.9)",padding:"12px 20px 8px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,color:"rgba(255,255,255,.6)",fontWeight:600}}>09:42</span>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>📶 🔋</span>
            </div>
          </div>

          {/* Header rider */}
          <div style={{padding:"12px 20px 16px",borderBottom:"1px solid rgba(5,150,80,.1)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:"rgba(239,68,68,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:"#f87171"}}>MD</div>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>Moussa Diallo</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>⭐ 4.8 · LIV-001 · Moto</div>
                </div>
              </div>
              {/* Toggle online */}
              <button onClick={()=>setOnline(o=>!o)} style={{background:online?"rgba(52,211,153,.2)":"rgba(107,114,128,.15)",border:`1px solid ${online?"rgba(52,211,153,.5)":"rgba(107,114,128,.3)"}`,borderRadius:20,padding:"6px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,transition:"all .3s"}}>
                <span className={online?"pulse":""} style={{width:8,height:8,borderRadius:"50%",background:online?"#34d399":"#6b7280",display:"inline-block",flexShrink:0}}/>
                <span style={{fontSize:12,fontWeight:700,color:online?"#34d399":"#6b7280"}}>{online?"En ligne":"Hors ligne"}</span>
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0,borderBottom:"1px solid rgba(5,150,80,.08)"}}>
            {[
              {label:"Aujourd'hui",val:`${gainJour.toLocaleString()} F`,color:"#34d399"},
              {label:"Cette semaine",val:`${gainSemaine.toLocaleString()} F`,color:"#fbbf24"},
              {label:"Courses",val:"4",color:"#60a5fa"},
            ].map((k,i)=>(
              <div key={k.label} style={{padding:"14px 12px",textAlign:"center",borderRight:i<2?"1px solid rgba(5,150,80,.08)":"none"}}>
                <div style={{fontSize:14,fontWeight:800,color:k.color}}>{k.val}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.35)",marginTop:2}}>{k.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{display:"flex",borderBottom:"1px solid rgba(5,150,80,.08)"}}>
            {(["missions","gains","profil"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"12px 0",border:"none",background:"transparent",color:tab===t?"#34d399":"rgba(255,255,255,.3)",fontWeight:tab===t?700:400,fontSize:12,cursor:"pointer",borderBottom:tab===t?"2px solid #34d399":"2px solid transparent",transition:"all .2s"}}>
                {t==="missions"?"📦 Missions":t==="gains"?"💰 Gains":"👤 Profil"}
              </button>
            ))}
          </div>

          {/* Contenu */}
          <div style={{minHeight:340,padding:"16px"}}>
            {tab==="missions" && (
              <div className="fade">
                {!online && (
                  <div style={{background:"rgba(107,114,128,.1)",border:"1px solid rgba(107,114,128,.2)",borderRadius:12,padding:"20px",textAlign:"center",marginBottom:14}}>
                    <div style={{fontSize:32,marginBottom:8}}>😴</div>
                    <div style={{fontWeight:700,marginBottom:4}}>Vous êtes hors ligne</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Passez en ligne pour recevoir des missions</div>
                  </div>
                )}
                {online && MISSIONS.map(m=>(
                  <div key={m.id} style={{background:missionActive===m.id?"rgba(249,115,22,.1)":"rgba(255,255,255,.04)",border:`1px solid ${missionActive===m.id?"rgba(249,115,22,.4)":"rgba(255,255,255,.06)"}`,borderRadius:14,padding:"14px",marginBottom:10}}>
                    {m.statut==="active" && (
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                        <span className="pulse" style={{width:7,height:7,borderRadius:"50%",background:"#f97316",display:"inline-block"}}/>
                        <span style={{fontSize:11,fontWeight:700,color:"#fb923c"}}>EN COURS</span>
                      </div>
                    )}
                    <div style={{fontWeight:700,fontSize:14,marginBottom:2}}>{m.client}</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginBottom:8}}>📍 {m.adresse} · {m.dist}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <span style={{fontSize:13,fontWeight:800,color:"#fbbf24"}}>{m.frais.toLocaleString()} F</span>
                        <span style={{fontSize:10,color:"rgba(255,255,255,.35)",marginLeft:4}}>vos gains</span>
                      </div>
                      {m.statut==="active" ? (
                        <button onClick={()=>setMissionActive(null)} style={{background:"linear-gradient(135deg,#059669,#16a34a)",border:"none",borderRadius:8,padding:"7px 14px",color:"white",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                          ✅ Livré !
                        </button>
                      ) : (
                        <div style={{display:"flex",gap:6}}>
                          <button style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:8,padding:"6px 10px",color:"#f87171",fontSize:11,cursor:"pointer"}}>✕</button>
                          <button onClick={()=>setMissionActive(m.id)} style={{background:"linear-gradient(135deg,#f97316,#ea580c)",border:"none",borderRadius:8,padding:"6px 12px",color:"white",fontWeight:700,fontSize:11,cursor:"pointer"}}>Accepter</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {online && !missionActive && MISSIONS.length>0 && (
                  <div style={{textAlign:"center",padding:"20px",color:"rgba(255,255,255,.3)",fontSize:13}}>
                    <div style={{fontSize:32,marginBottom:8}}>🛵</div>
                    En attente de nouvelles missions...
                  </div>
                )}
              </div>
            )}

            {tab==="gains" && (
              <div className="fade">
                <div style={{background:"rgba(251,191,36,.08)",border:"1px solid rgba(251,191,36,.2)",borderRadius:12,padding:"16px",textAlign:"center",marginBottom:14}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:4}}>Solde portefeuille</div>
                  <div style={{fontSize:32,fontWeight:800,color:"#fbbf24"}}>{gainSemaine.toLocaleString()} F CFA</div>
                  <button style={{marginTop:10,background:"linear-gradient(135deg,#d97706,#b45309)",border:"none",borderRadius:8,padding:"8px 20px",color:"white",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                    💸 Demander un retrait Wave
                  </button>
                </div>
                <h4 style={{fontWeight:700,marginBottom:10,fontSize:13,color:"rgba(255,255,255,.5)"}}>Historique</h4>
                {HISTORIQUE.map(h=>(
                  <div key={h.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>{h.client}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{h.date} · {"⭐".repeat(h.note)}</div>
                    </div>
                    <span style={{fontWeight:800,fontSize:14,color:"#34d399"}}>+{h.gain.toLocaleString()} F</span>
                  </div>
                ))}
              </div>
            )}

            {tab==="profil" && (
              <div className="fade">
                {[
                  {l:"ID Livreur",v:"LIV-001"},
                  {l:"Zone",v:"Almadies, Dakar"},
                  {l:"Véhicule",v:"Moto · DK-1234-AB"},
                  {l:"Note globale",v:"⭐ 4.8 / 5"},
                  {l:"Courses totales",v:"312"},
                  {l:"Membre depuis",v:"Mars 2024"},
                  {l:"Téléphone",v:"+221 77 412 33 10"},
                ].map(r=>(
                  <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{r.l}</span>
                    <span style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.8)"}}>{r.v}</span>
                  </div>
                ))}
                <button style={{marginTop:16,width:"100%",background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.25)",borderRadius:8,padding:"10px",color:"#f87171",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
