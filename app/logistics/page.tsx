"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Portail Gade Gui</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const vehicules = [
  {id:"V-01",nom:"Camion frigorifique 1",chauffeur:"Cheikh F.",statut:"en livraison",temp:-2,dest:"Hôtel Terrou-Bi",pct:72,color:"#059669"},
  {id:"V-02",nom:"Camion frigorifique 2",chauffeur:"Modou T.",statut:"en livraison",temp:-1,dest:"Supermarché Casino",pct:45,color:"#059669"},
  {id:"V-03",nom:"Camionnette légère 1",chauffeur:"Fatou D.",statut:"en dépôt",temp:22,dest:"—",pct:0,color:"#6b7280"},
  {id:"V-04",nom:"Camion réfrigéré 3",chauffeur:"Ibou K.",statut:"en maintenance",temp:null,dest:"Atelier",pct:0,color:"#d97706"},
]

const livraisons = [
  {id:"LIV-2025-112",client:"Hôtel Terrou-Bi",produits:"50 kg poulet + 20 pots pâte arachide",heure:"10:30",statut:"en route",chauffeur:"Cheikh F.",vehicule:"V-01"},
  {id:"LIV-2025-113",client:"Supermarché Casino",produits:"30 kg tomates + 15 kg oignons",heure:"11:00",statut:"en route",chauffeur:"Modou T.",vehicule:"V-02"},
  {id:"LIV-2025-114",client:"Restaurant Le Lagon",produits:"10 kg poulet + 5 kg piments",heure:"14:00",statut:"planifié",chauffeur:"Fatou D.",vehicule:"V-03"},
  {id:"LIV-2025-110",client:"Maison Diallo",produits:"Panier famille hebdo",heure:"09:00",statut:"livré",chauffeur:"Ibou K.",vehicule:"V-01"},
]

const sc: Record<string,{color:string;bg:string}> = {
  "en route":{color:"#34d399",bg:"rgba(52,211,153,.12)"},
  "planifié":{color:"#60a5fa",bg:"rgba(96,165,250,.12)"},
  "livré":{color:"#6b7280",bg:"rgba(107,114,128,.12)"},
  "en livraison":{color:"#34d399",bg:"rgba(52,211,153,.12)"},
  "en dépôt":{color:"#6b7280",bg:"rgba(107,114,128,.12)"},
  "en maintenance":{color:"#f87171",bg:"rgba(248,113,113,.12)"},
}

export default function Logistics() {
  const [tab, setTab] = useState<"flotte"|"livraisons"|"froid">("flotte")

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .4s ease both}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#1c0f00,#382000 50%,#020d07)",borderBottom:"1px solid rgba(180,83,9,.2)",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#fcd34d",marginBottom:4}}>APPLICATION 2.2</div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>🚛 Agri-Logistics</h1>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:13}}>Gestion de Flotte GPS & Chaîne du Froid — Suivi temps réel des livraisons</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[["2","Véhicules actifs"],["4","Livraisons du jour"],["-2°C","Temp. min"]].map(([v,l])=>(
              <div key={l} style={{background:"rgba(180,83,9,.1)",border:"1px solid rgba(180,83,9,.25)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:800,color:"#fbbf24"}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem 2rem 3rem"}}>
        <div style={{display:"flex",gap:4,marginBottom:20,background:"rgba(255,255,255,.04)",borderRadius:12,padding:4,width:"fit-content"}}>
          {(["flotte","livraisons","froid"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,background:tab===t?"rgba(180,83,9,.25)":"transparent",color:tab===t?"#fbbf24":"rgba(255,255,255,.45)",transition:"all .2s"}}>
              {t==="flotte"?"🚚 Flotte GPS":t==="livraisons"?"📦 Livraisons":"🌡️ Chaîne du Froid"}
            </button>
          ))}
        </div>

        {tab==="flotte" && (
          <div className="fade">
            {/* Carte GPS SVG */}
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px",marginBottom:20}}>
              <h3 style={{fontWeight:700,marginBottom:14,color:"#fbbf24"}}>🗺️ Carte GPS — Dakar</h3>
              <div style={{borderRadius:12,overflow:"hidden",border:"1px solid rgba(5,150,80,.15)"}}>
                <svg viewBox="0 0 700 300" style={{width:"100%",display:"block"}}>
                  <rect width="700" height="300" fill="#011a0a"/>
                  {/* Routes */}
                  {[["M 50 150 Q 200 100 350 150 Q 500 200 650 150",1.5,"#059669",.3],
                    ["M 100 50 L 100 250",1,"#059669",.2],
                    ["M 200 50 L 200 250",1,"#059669",.2],
                    ["M 350 50 L 350 250",1,"#059669",.2],
                    ["M 500 50 L 500 250",1,"#059669",.2],
                    ["M 50 100 L 650 100",1,"#059669",.2],
                    ["M 50 200 L 650 200",1,"#059669",.2],
                  ].map(([d,sw,stroke,op],i)=>(
                    <path key={i} d={d as string} stroke={stroke as string} strokeWidth={sw as number} fill="none" strokeOpacity={op as number}/>
                  ))}
                  {/* Gade Gui base */}
                  <rect x="55" y="130" width="60" height="40" rx="4" fill="#022c22" stroke="#059669" strokeWidth="1.5" strokeOpacity=".6"/>
                  <text x="85" y="152" fill="#6ee7b7" fontSize="9" textAnchor="middle" fontWeight="bold">GADE GUI</text>
                  {/* Véhicule 1 */}
                  <circle cx="320" cy="148" r="10" fill="#059669"/>
                  <text x="320" y="152" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">V1</text>
                  <text x="320" y="170" fill="#34d399" fontSize="8" textAnchor="middle">Terrou-Bi</text>
                  {/* Véhicule 2 */}
                  <circle cx="480" cy="178" r="10" fill="#059669"/>
                  <text x="480" y="182" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">V2</text>
                  <text x="480" y="200" fill="#34d399" fontSize="8" textAnchor="middle">Casino</text>
                  {/* Destinations */}
                  <circle cx="620" cy="148" r="6" fill="#d97706" fillOpacity=".8"/>
                  <text x="620" y="170" fill="#fbbf24" fontSize="8" textAnchor="middle">Terrou-Bi</text>
                  <circle cx="580" cy="200" r="6" fill="#7c3aed" fillOpacity=".8"/>
                  <text x="580" y="218" fill="#a78bfa" fontSize="8" textAnchor="middle">Casino</text>
                  <text x="12" y="20" fill="rgba(255,255,255,.4)" fontSize="9">GPS Flotte — Temps réel · Dakar, Sénégal</text>
                </svg>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
              {vehicules.map(v=>{
                const s = sc[v.statut]
                return (
                  <div key={v.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"18px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:14,marginBottom:2}}>🚛 {v.nom}</div>
                        <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>👤 {v.chauffeur} · {v.id}</div>
                      </div>
                      <span style={{fontSize:11,fontWeight:700,color:s.color,background:s.bg,padding:"3px 8px",borderRadius:8,whiteSpace:"nowrap"}}>{v.statut}</span>
                    </div>
                    {v.dest!=="—" && v.dest!=="Atelier" && (
                      <div style={{marginBottom:10}}>
                        <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginBottom:4}}>Destination : <span style={{color:"#fbbf24"}}>{v.dest}</span></div>
                        <div style={{height:4,background:"rgba(255,255,255,.08)",borderRadius:2}}>
                          <div style={{height:4,background:"#059669",borderRadius:2,width:`${v.pct}%`}}/>
                        </div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,.3)",marginTop:3}}>{v.pct}% du trajet</div>
                      </div>
                    )}
                    {v.temp!==null && (
                      <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(96,165,250,.08)",border:"1px solid rgba(96,165,250,.15)",borderRadius:8,padding:"8px 12px"}}>
                        <span style={{fontSize:16}}>🌡️</span>
                        <span style={{fontSize:13,fontWeight:700,color:v.temp<0?"#60a5fa":"rgba(255,255,255,.6)"}}>{v.temp}°C</span>
                        <span style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Température caisson</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {tab==="livraisons" && (
          <div className="fade" style={{display:"flex",flexDirection:"column",gap:12}}>
            {livraisons.map(l=>{
              const s = sc[l.statut]
              return (
                <div key={l.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:12,padding:"16px 20px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:8}}>
                    <div>
                      <div style={{fontWeight:700,marginBottom:3}}>{l.id}</div>
                      <div style={{fontSize:14,color:"rgba(255,255,255,.8)"}}>{l.client}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:2}}>{l.produits}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <span style={{fontSize:11,fontWeight:700,color:s.color,background:s.bg,padding:"3px 10px",borderRadius:8,display:"block",marginBottom:4}}>{l.statut}</span>
                      <span style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>⏰ {l.heure}</span>
                    </div>
                  </div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.35)",paddingTop:8,borderTop:"1px solid rgba(255,255,255,.05)"}}>
                    👤 {l.chauffeur} · 🚛 {l.vehicule}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab==="froid" && (
          <div className="fade">
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:20}}>
              {[
                {label:"Camion V-01",temp:-2,seuil:-1,zone:"Zone 1",statut:"OK",color:"#34d399"},
                {label:"Camion V-02",temp:-1,seuil:-1,zone:"Zone 1",statut:"Limite",color:"#fbbf24"},
                {label:"Entrepôt froid A",temp:4,seuil:6,zone:"Légumes",statut:"OK",color:"#34d399"},
                {label:"Entrepôt froid B",temp:-18,seuil:-15,zone:"Congélation",statut:"OK",color:"#34d399"},
                {label:"Chambre froide 1",temp:2,seuil:4,zone:"Viandes",statut:"OK",color:"#34d399"},
              ].map(e=>(
                <div key={e.label} style={{background:"rgba(5,30,15,.8)",border:`1px solid ${e.color}30`,borderRadius:14,padding:"18px"}}>
                  <div style={{fontSize:28,fontWeight:800,color:e.color,marginBottom:4}}>{e.temp}°C</div>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:2}}>{e.label}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:8}}>{e.zone} · Seuil : {e.seuil}°C</div>
                  <span style={{fontSize:11,fontWeight:700,color:e.color,background:`${e.color}15`,padding:"2px 8px",borderRadius:6}}>{e.statut}</span>
                </div>
              ))}
            </div>
            <div style={{background:"rgba(96,165,250,.05)",border:"1px solid rgba(96,165,250,.15)",borderRadius:14,padding:"18px"}}>
              <h3 style={{fontWeight:700,marginBottom:10,color:"#60a5fa"}}>ℹ️ Protocole Chaîne du Froid</h3>
              <p style={{fontSize:13,color:"rgba(255,255,255,.6)",lineHeight:1.6}}>
                Toute rupture de chaîne du froid (temp. supérieure au seuil pendant plus de 20 minutes) déclenche automatiquement une alerte SMS aux responsables qualité et logistique. Les enregistrements sont archivés 5 ans conformément aux normes HACCP.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
