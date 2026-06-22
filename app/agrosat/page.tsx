"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Portail Gade Gui</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const parcelles = [
  {id:"A",nom:"Parcelle A — Tomates",ndvi:0.72,surface:"2.4 ha",culture:"Tomates cerises",irrigation:68,statut:"Bon",color:"#16a34a",rendement:"18.4 t/ha",alerte:null},
  {id:"B",nom:"Parcelle B — Oignons",ndvi:0.58,surface:"1.8 ha",culture:"Oignons",irrigation:42,statut:"Stress hydrique",color:"#d97706",rendement:"12.1 t/ha",alerte:"Sol sec — Irrigation recommandée"},
  {id:"C",nom:"Parcelle C — Piments",ndvi:0.81,surface:"3.1 ha",culture:"Piments rouges",irrigation:80,statut:"Excellent",color:"#059669",rendement:"22.7 t/ha",alerte:null},
  {id:"D",nom:"Parcelle D — Aubergines",ndvi:0.44,surface:"1.2 ha",culture:"Aubergines",irrigation:28,statut:"Attention",color:"#dc2626",rendement:"8.3 t/ha",alerte:"NDVI faible — Inspection terrain recommandée"},
]

const meteo = [
  {jour:"Lun",icon:"☀️",max:34,min:22,pluie:0},
  {jour:"Mar",icon:"⛅",max:31,min:21,pluie:0},
  {jour:"Mer",icon:"🌧️",max:27,min:20,pluie:12},
  {jour:"Jeu",icon:"⛅",max:29,min:21,pluie:3},
  {jour:"Ven",icon:"☀️",max:33,min:22,pluie:0},
  {jour:"Sam",icon:"☀️",max:35,min:23,pluie:0},
  {jour:"Dim",icon:"☀️",max:36,min:24,pluie:0},
]

function NdviBar({val, color}:{val:number,color:string}) {
  return (
    <div style={{position:"relative",height:12,background:"linear-gradient(90deg,#7f1d1d,#dc2626,#d97706,#16a34a,#059669)",borderRadius:6}}>
      <div style={{position:"absolute",top:-4,left:`${val*100}%`,transform:"translateX(-50%)",width:18,height:18,borderRadius:"50%",background:color,border:"3px solid white",boxShadow:`0 0 8px ${color}`}}/>
    </div>
  )
}

export default function AgroSat() {
  const [sel, setSel] = useState("A")
  const p = parcelles.find(x=>x.id===sel)!

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .4s ease both}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#0c1a0c,#0a2a1a 50%,#020d07)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#6ee7b7",marginBottom:4}}>APPLICATION 1.3</div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>🛰️ AgroSat</h1>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:13}}>Surveillance Satellitaire — Données Sentinel-2 ESA · Mise à jour toutes les 5 jours</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[["4","Parcelles"],["8.5 ha","Surface totale"],["1 alerte","Active"]].map(([v,l])=>(
              <div key={l} style={{background:"rgba(5,150,80,.1)",border:"1px solid rgba(5,150,80,.25)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:800,color:"#34d399"}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem 2rem 3rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:20}}>
          {/* Sélecteur parcelles */}
          <div>
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px",marginBottom:16}}>
              <h3 style={{fontWeight:700,marginBottom:14,color:"#6ee7b7",fontSize:14}}>Parcelles Agricoles</h3>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {parcelles.map(pp=>(
                  <button key={pp.id} onClick={()=>setSel(pp.id)} style={{background:sel===pp.id?"rgba(5,150,80,.15)":"rgba(255,255,255,.03)",border:`1px solid ${sel===pp.id?"rgba(5,150,80,.4)":"rgba(255,255,255,.06)"}`,borderRadius:10,padding:"12px",cursor:"pointer",color:"white",textAlign:"left",transition:"all .2s"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontWeight:600,fontSize:13}}>{pp.culture}</span>
                      <span style={{fontSize:10,color:pp.color,background:`${pp.color}20`,padding:"2px 6px",borderRadius:6}}>{pp.statut}</span>
                    </div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{pp.surface} · NDVI {pp.ndvi}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Météo */}
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px"}}>
              <h3 style={{fontWeight:700,marginBottom:14,color:"#6ee7b7",fontSize:14}}>🌤️ Météo 7 jours</h3>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {meteo.map(m=>(
                  <div key={m.jour} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.5)",width:30}}>{m.jour}</span>
                    <span style={{fontSize:16}}>{m.icon}</span>
                    <span style={{fontSize:12,color:"#f87171"}}>{m.max}°</span>
                    <span style={{fontSize:12,color:"#60a5fa"}}>{m.min}°</span>
                    {m.pluie>0 ? <span style={{fontSize:11,color:"#60a5fa"}}>{m.pluie}mm</span> : <span style={{fontSize:11,color:"rgba(255,255,255,.2)"}}>—</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Détail parcelle sélectionnée */}
          <div style={{display:"flex",flexDirection:"column",gap:16}} className="fade">
            {p.alerte && (
              <div style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.25)",borderRadius:12,padding:"12px 16px",display:"flex",gap:10,alignItems:"center"}}>
                <span style={{fontSize:18}}>⚠️</span>
                <span style={{color:"#fca5a5",fontSize:13}}><strong>Alerte :</strong> {p.alerte}</span>
              </div>
            )}

            {/* Carte NDVI simulée */}
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div>
                  <h2 style={{fontSize:18,fontWeight:800,marginBottom:4}}>{p.nom}</h2>
                  <p style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{p.culture} · {p.surface} · Rendement estimé : {p.rendement}</p>
                </div>
                <span style={{fontSize:13,color:p.color,background:`${p.color}20`,padding:"4px 12px",borderRadius:8,fontWeight:700}}>{p.statut}</span>
              </div>

              {/* Carte SVG fausse NDVI */}
              <div style={{borderRadius:12,overflow:"hidden",marginBottom:16,border:"1px solid rgba(5,150,80,.15)"}}>
                <svg viewBox="0 0 600 260" style={{width:"100%",display:"block"}}>
                  <defs>
                    <radialGradient id="g1" cx="40%" cy="40%"><stop offset="0%" stopColor="#16a34a" stopOpacity="0.9"/><stop offset="100%" stopColor="#022c22" stopOpacity="0.5"/></radialGradient>
                    <radialGradient id="g2" cx="70%" cy="60%"><stop offset="0%" stopColor={p.color} stopOpacity="0.8"/><stop offset="100%" stopColor="#020d07" stopOpacity="0.3"/></radialGradient>
                  </defs>
                  <rect width="600" height="260" fill="#011a0a"/>
                  {/* Grille */}
                  {Array.from({length:10},(_,i)=><line key={`v${i}`} x1={i*60} y1="0" x2={i*60} y2="260" stroke="#059669" strokeOpacity="0.06"/>)}
                  {Array.from({length:6},(_,i)=><line key={`h${i}`} x1="0" y1={i*43} x2="600" y2={i*43} stroke="#059669" strokeOpacity="0.06"/>)}
                  <rect width="600" height="260" fill="url(#g1)" rx="0"/>
                  <rect width="600" height="260" fill="url(#g2)" rx="0"/>
                  {/* Zones de végétation */}
                  {([{x:120,y:60,w:80,h:80,c:"#16a34a",o:.7},{x:280,y:100,w:120,h:100,c:"#059669",o:.8},{x:400,y:80,w:90,h:70,c:"#d97706",o:.6},{x:160,y:160,w:100,h:60,c:"#dc2626",o:.5},{x:350,y:170,w:130,h:70,c:p.color,o:.75}]).map((z,i)=>(
                    <ellipse key={i} cx={z.x+z.w/2} cy={z.y+z.h/2} rx={z.w/2} ry={z.h/2} fill={z.c} fillOpacity={z.o}/>
                  ))}
                  {/* Label */}
                  <text x="12" y="24" fill="#6ee7b7" fontSize="12" fontWeight="bold">NDVI — {p.id} · Sentinel-2</text>
                  <text x="12" y="42" fill="rgba(255,255,255,0.4)" fontSize="10">Résolution 10m · 22 juin 2025</text>
                  {/* Légende */}
                  <rect x="440" y="220" width="150" height="28" fill="rgba(0,0,0,0.5)" rx="4"/>
                  <rect x="448" y="228" width="130" height="12" rx="3" fill="url(#legendGrad)"/>
                  <defs><linearGradient id="legendGrad"><stop offset="0%" stopColor="#7f1d1d"/><stop offset="50%" stopColor="#d97706"/><stop offset="100%" stopColor="#059669"/></linearGradient></defs>
                  <text x="448" y="245" fill="#6ee7b7" fontSize="8">0</text>
                  <text x="565" y="245" fill="#6ee7b7" fontSize="8">1.0</text>
                </svg>
              </div>

              {/* NDVI gauge */}
              <div style={{marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:13,color:"rgba(255,255,255,.6)"}}>Indice NDVI moyen</span>
                  <span style={{fontSize:20,fontWeight:800,color:p.color}}>{p.ndvi}</span>
                </div>
                <NdviBar val={p.ndvi} color={p.color}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                  <span style={{fontSize:10,color:"#dc2626"}}>0 — Sol nu</span>
                  <span style={{fontSize:10,color:"#059669"}}>1.0 — Dense</span>
                </div>
              </div>

              {/* Stats */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {[
                  {label:"Irrigation",value:`${p.irrigation}%`,color:"#60a5fa"},
                  {label:"Rendement estimé",value:p.rendement,color:"#34d399"},
                  {label:"Prochaine image",value:"5 jours",color:"#a78bfa"},
                ].map(s=>(
                  <div key={s.label} style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"12px",textAlign:"center"}}>
                    <div style={{fontSize:16,fontWeight:800,color:s.color,marginBottom:4}}>{s.value}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommandations IA */}
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px"}}>
              <h3 style={{fontWeight:700,marginBottom:14,color:"#6ee7b7"}}>🤖 Recommandations AgroSat IA</h3>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[
                  {icon:"💧",text:`Irrigation conseillée pour ${p.nom} dans 2 jours (prévisions sec jusqu'au mercredi)`,prio:"Haute"},
                  {icon:"📅",text:"Prochaine analyse satellite : 27 juin 2025 — Préparer rapport NDVI mensuel",prio:"Info"},
                  {icon:"🌱",text:`Rendement ${p.culture} en hausse de 8% vs mois précédent`,prio:"Positif"},
                ].map((r,i)=>(
                  <div key={i} style={{display:"flex",gap:12,padding:"12px",background:"rgba(255,255,255,.03)",borderRadius:10}}>
                    <span style={{fontSize:18}}>{r.icon}</span>
                    <div style={{flex:1}}>
                      <p style={{fontSize:13,color:"rgba(255,255,255,.8)",margin:0}}>{r.text}</p>
                    </div>
                    <span style={{fontSize:10,fontWeight:700,color:r.prio==="Haute"?"#f87171":r.prio==="Positif"?"#34d399":"#60a5fa",whiteSpace:"nowrap"}}>{r.prio}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
