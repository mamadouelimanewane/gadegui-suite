"use client"
import { useState, useEffect } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/delivery" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Gade Gui Express</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

type Rider = {id:string;nom:string;vehicule:string;statut:"En livraison"|"En ligne"|"Hors ligne";zone:string;note:number;x:number;y:number;dest?:string}

const RIDERS_INIT: Rider[] = [
  {id:"LIV-001",nom:"Moussa D.",  vehicule:"🛵",statut:"En livraison",zone:"Almadies",  note:4.8,x:130,y:170,dest:"Hôtel Terrou-Bi"},
  {id:"LIV-002",nom:"Ibou S.",    vehicule:"🚲",statut:"En ligne",     zone:"Plateau",  note:4.6,x:420,y:320,dest:undefined},
  {id:"LIV-003",nom:"Cheikh M.", vehicule:"🛵",statut:"En livraison",zone:"Parcelles", note:4.9,x:310,y:240,dest:"Restaurant Le Lagon"},
  {id:"LIV-005",nom:"Amadou N.", vehicule:"🛵",statut:"En ligne",     zone:"Almadies", note:4.7,x:100,y:200,dest:undefined},
  {id:"LIV-006",nom:"Seydou D.", vehicule:"🛵",statut:"En livraison",zone:"Yoff",      note:4.5,x:80, y:100,dest:"Supermarché Casino"},
  {id:"LIV-007",nom:"Aissatou F",vehicule:"🚲",statut:"En ligne",     zone:"Plateau",  note:4.4,x:450,y:280,dest:undefined},
  {id:"LIV-008",nom:"Omar G.",   vehicule:"🛵",statut:"En livraison",zone:"Parcelles", note:4.9,x:260,y:300,dest:"Lycée C.A. Diop"},
]

const SC = {"En livraison":"#34d399","En ligne":"#60a5fa","Hors ligne":"#6b7280"}

// Zones de Dakar avec positions approximatives sur la carte SVG (600x420)
const ZONES = [
  {nom:"Yoff",          x:80,  y:80},
  {nom:"Almadies",      x:40,  y:160},
  {nom:"Ngor",          x:60,  y:120},
  {nom:"Ouakam",        x:120, y:140},
  {nom:"Mermoz",        x:190, y:200},
  {nom:"Fann",          x:260, y:240},
  {nom:"Plateau",       x:340, y:310},
  {nom:"Médina",        x:290, y:270},
  {nom:"HLM",           x:330, y:240},
  {nom:"Parcelles",     x:290, y:170},
  {nom:"Pikine",        x:400, y:180},
  {nom:"Rufisque",      x:520, y:240},
  {nom:"Guédiawaye",    x:420, y:130},
]

export default function MapGPS() {
  const [riders, setRiders] = useState(RIDERS_INIT)
  const [sel, setSel] = useState<string|null>(null)
  const [tick, setTick] = useState(0)

  useEffect(()=>{
    const t = setInterval(()=>{
      setTick(n=>n+1)
      setRiders(prev=>prev.map(r=>
        r.statut==="En livraison"
          ? {...r, x: Math.max(20, Math.min(560, r.x+(Math.random()-.5)*12)), y: Math.max(20, Math.min(400, r.y+(Math.random()-.5)*8))}
          : r
      ))
    },2500)
    return ()=>clearInterval(t)
  },[])

  const selRider = riders.find(r=>r.id===sel)

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}} .dot{animation:pulse 2s infinite} @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .35s ease both}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#022c22,#014421 50%,#020d07)",borderBottom:"1px solid rgba(5,150,80,.2)",padding:"1.2rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#6ee7b7",marginBottom:3}}>LIVRAISON · MODULE 4</div>
            <h1 style={{fontSize:22,fontWeight:800}}>🗺️ Carte GPS — Livreurs en temps réel</h1>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:12,marginTop:3}}>Zone de couverture : Dakar &amp; Environs · Mise à jour toutes les 2.5 secondes</p>
          </div>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            {(Object.entries(SC) as [string,string][]).map(([st,c])=>(
              <div key={st} style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:8,height:8,borderRadius:"50%",background:c,display:"inline-block"}}/>
                <span style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>{st} ({riders.filter(r=>r.statut===st).length})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.2rem 2rem 3rem",display:"grid",gridTemplateColumns:"1fr 280px",gap:20}}>
        {/* Carte SVG */}
        <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,overflow:"hidden",position:"relative"}} className="fade">
          <svg viewBox="0 0 600 420" style={{width:"100%",display:"block"}}>
            {/* Fond mer */}
            <rect width="600" height="420" fill="#010f08"/>
            {/* Grille */}
            {Array.from({length:12},(_,i)=><line key={`v${i}`} x1={i*50} y1="0" x2={i*50} y2="420" stroke="#059669" strokeOpacity=".05" strokeWidth="1"/>)}
            {Array.from({length:9}, (_,i)=><line key={`h${i}`} x1="0" y1={i*50} x2="600" y2={i*50} stroke="#059669" strokeOpacity=".05" strokeWidth="1"/>)}

            {/* Contour péninsule de Dakar simplifié */}
            <path d="M 0 180 Q 40 60 130 30 Q 220 0 300 80 Q 400 60 500 120 Q 580 160 600 220 L 600 420 L 0 420 Z"
              fill="#011a0a" stroke="#059669" strokeWidth="1" strokeOpacity=".2"/>

            {/* Zone mer (autour) */}
            <path d="M 0 0 L 600 0 L 600 420 L 0 420 Z M 0 180 Q 40 60 130 30 Q 220 0 300 80 Q 400 60 500 120 Q 580 160 600 220 L 600 420 L 0 420 Z"
              fill="#020d14" fillRule="evenodd"/>

            {/* Routes principales */}
            <path d="M 40 160 L 340 310" stroke="#059669" strokeWidth="2" strokeOpacity=".2" strokeDasharray="4,4"/>
            <path d="M 130 30 L 340 310" stroke="#059669" strokeWidth="1.5" strokeOpacity=".15" strokeDasharray="3,3"/>
            <path d="M 300 80 L 420 130 L 520 240" stroke="#059669" strokeWidth="1.5" strokeOpacity=".15" strokeDasharray="3,3"/>

            {/* Zones */}
            {ZONES.map(z=>(
              <g key={z.nom}>
                <circle cx={z.x} cy={z.y} r="18" fill="#059669" fillOpacity=".06" stroke="#059669" strokeWidth=".5" strokeOpacity=".15"/>
                <text x={z.x} y={z.y+4} fill="rgba(255,255,255,.2)" fontSize="7" textAnchor="middle">{z.nom}</text>
              </g>
            ))}

            {/* Base Gade Gui */}
            <rect x="25" y="150" width="50" height="26" rx="4" fill="#022c22" stroke="#34d399" strokeWidth="1.5"/>
            <text x="50" y="162" fill="#6ee7b7" fontSize="7" textAnchor="middle" fontWeight="bold">GADE GUI</text>
            <text x="50" y="170" fill="rgba(255,255,255,.3)" fontSize="6" textAnchor="middle">Almadies</text>

            {/* Riders */}
            {riders.map(r=>{
              const c = SC[r.statut] as string
              const isSelected = sel===r.id
              return (
                <g key={r.id} onClick={()=>setSel(sel===r.id?null:r.id)} style={{cursor:"pointer"}}>
                  {r.statut==="En livraison" && (
                    <circle cx={r.x} cy={r.y} r="16" fill={c} fillOpacity=".12" className="dot"/>
                  )}
                  <circle cx={r.x} cy={r.y} r={isSelected?14:10} fill={isSelected?"white":c} fillOpacity={isSelected?.9:.8}
                    stroke={isSelected?c:"rgba(0,0,0,.4)"} strokeWidth={isSelected?2:1}/>
                  <text x={r.x} y={r.y+4} fill={isSelected?c:"rgba(0,0,0,.8)"} fontSize="9" textAnchor="middle" fontWeight="bold">
                    {r.vehicule}
                  </text>
                  {isSelected && (
                    <g>
                      <rect x={r.x-28} y={r.y-34} width="56" height="16" rx="4" fill="#020d07" stroke={c} strokeWidth="1"/>
                      <text x={r.x} y={r.y-23} fill={c} fontSize="8" textAnchor="middle" fontWeight="bold">{r.nom}</text>
                    </g>
                  )}
                </g>
              )
            })}

            {/* Légende */}
            <rect x="450" y="10" width="140" height="50" rx="6" fill="rgba(2,13,7,.9)" stroke="rgba(5,150,80,.2)" strokeWidth="1"/>
            <text x="460" y="24" fill="rgba(255,255,255,.5)" fontSize="8" fontWeight="bold">DAKAR · GADE GUI EXPRESS</text>
            <text x="460" y="37" fill="rgba(255,255,255,.3)" fontSize="7">{riders.filter(r=>r.statut==="En livraison").length} livraisons en cours</text>
            <text x="460" y="50" fill="rgba(255,255,255,.25)" fontSize="7">Maj: {new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}</text>
          </svg>
        </div>

        {/* Panel latéral */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"16px"}} className="fade">
            <h3 style={{fontWeight:700,marginBottom:12,color:"#6ee7b7",fontSize:13}}>Livreurs actifs</h3>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {riders.filter(r=>r.statut!=="Hors ligne").map(r=>{
                const c = SC[r.statut] as string
                return (
                  <button key={r.id} onClick={()=>setSel(sel===r.id?null:r.id)}
                    style={{background:sel===r.id?"rgba(52,211,153,.1)":"rgba(255,255,255,.03)",border:`1px solid ${sel===r.id?"rgba(52,211,153,.3)":"rgba(255,255,255,.06)"}`,borderRadius:9,padding:"10px 12px",cursor:"pointer",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .2s",textAlign:"left"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0}}/>
                      <div>
                        <div style={{fontWeight:600,fontSize:12}}>{r.nom}</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{r.vehicule} {r.zone}</div>
                      </div>
                    </div>
                    <span style={{fontSize:10,color:c,fontWeight:700}}>{r.statut==="En livraison"?"🚀":"✅"}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {selRider && (
            <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(52,211,153,.25)",borderRadius:14,padding:"16px"}} className="fade">
              <h3 style={{fontWeight:700,marginBottom:10,color:"#34d399",fontSize:13}}>{selRider.nom}</h3>
              {[
                {l:"ID",v:selRider.id},
                {l:"Véhicule",v:selRider.vehicule},
                {l:"Zone",v:selRider.zone},
                {l:"Statut",v:selRider.statut},
                {l:"Note",v:`⭐ ${selRider.note}`},
                ...(selRider.dest?[{l:"Destination",v:selRider.dest}]:[]),
              ].map(r=>(
                <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{r.l}</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.75)",fontWeight:600}}>{r.v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
