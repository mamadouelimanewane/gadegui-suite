"use client"
import { useState, useEffect, useRef } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.96)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(249,115,22,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Accueil</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

type MissionStatut = "pending"|"accepted"|"pickup"|"transit"|"delivered"

const MISSION_INIT = {
  id:"GGE-247", client:"Aminata Sow", phone:"+221 77 512 34 10",
  pickup:"Entrepôt Gade Gui, Almadies", dest:"12 Rue Vincens, Plateau",
  produits:"Poulet fermier x2 · Café Touba 500g · Tomates 1kg",
  montant:17800, frais:1200, dist:"4.2 km", eta:28,
}

const STATUTS: Record<MissionStatut,{label:string;color:string;next:MissionStatut|null;action:string}> = {
  pending:   {label:"Nouvelle mission",  color:"#fbbf24", next:"accepted",  action:"✅ Accepter la mission"},
  accepted:  {label:"Mission acceptée",  color:"#34d399", next:"pickup",    action:"📦 Arrivé au pickup"},
  pickup:    {label:"Colis récupéré",    color:"#60a5fa", next:"transit",   action:"🛵 En route vers le client"},
  transit:   {label:"En livraison",      color:"#f97316", next:"delivered", action:"📸 Confirmer la livraison"},
  delivered: {label:"Livraison confirmée",color:"#34d399",next:null,        action:""},
}

export default function DeliveryApp() {
  const [statut, setStatut] = useState<MissionStatut>("pending")
  const [online, setOnline] = useState(false)
  const [tab, setTab] = useState<"mission"|"gains"|"nav">("mission")
  const [showPhoto, setShowPhoto] = useState(false)
  const [photoConfirmed, setPhotoConfirmed] = useState(false)
  const [tick, setTick] = useState(0)
  const gainJour = 4500

  useEffect(()=>{ const t=setInterval(()=>setTick(n=>n+1),2000); return()=>clearInterval(t) },[])

  const progress = {pending:0,accepted:25,pickup:50,transit:75,delivered:100}[statut]

  function next() {
    const s = STATUTS[statut]
    if(statut==="transit") { setShowPhoto(true); return }
    if(s.next) setStatut(s.next)
  }

  function confirmPhoto() {
    setPhotoConfirmed(true)
    setTimeout(()=>{ setShowPhoto(false); setStatut("delivered") },600)
  }

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .3s ease both} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}} .pulse{animation:pulse 1.5s infinite}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#1c0700,#3a1200 50%,#020d07)",borderBottom:"1px solid rgba(249,115,22,.2)",padding:"1.2rem 1.5rem"}}>
        <div style={{maxWidth:480,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:"#fed7aa",fontWeight:700,letterSpacing:".12em",marginBottom:4}}>DELIVERY APP · RIDER</div>
            <h1 style={{fontSize:22,fontWeight:800}}>🛵 Application Livreur</h1>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:12}}>Interface mobile de livraison Gade Gui Express</p>
          </div>
          <button onClick={()=>setOnline(o=>!o)} style={{background:online?"rgba(52,211,153,.15)":"rgba(107,114,128,.1)",border:`1px solid ${online?"rgba(52,211,153,.4)":"rgba(107,114,128,.3)"}`,borderRadius:20,padding:"8px 16px",cursor:"pointer",display:"flex",gap:8,alignItems:"center",color:online?"#34d399":"#6b7280",fontWeight:700,fontSize:13}}>
            <span className={online?"pulse":""} style={{width:8,height:8,borderRadius:"50%",background:online?"#34d399":"#6b7280",display:"inline-block"}}/>
            {online?"En ligne":"Hors ligne"}
          </button>
        </div>
      </div>

      <div style={{maxWidth:480,margin:"0 auto",padding:"1rem 1.5rem 5rem"}}>
        {/* KPIs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
          {[{v:`${gainJour.toLocaleString()} F`,l:"Gains aujourd'hui",c:"#34d399"},{v:"6",l:"Courses",c:"#fbbf24"},{v:"4.8⭐",l:"Note",c:"#60a5fa"}].map(k=>(
            <div key={k.l} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:10,padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:14,fontWeight:800,color:k.c}}>{k.v}</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,.35)",marginTop:2}}>{k.l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,.06)",marginBottom:16}}>
          {(["mission","gains","nav"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px 0",border:"none",background:"transparent",color:tab===t?"#f97316":"rgba(255,255,255,.3)",fontWeight:tab===t?700:400,fontSize:12,cursor:"pointer",borderBottom:tab===t?"2px solid #f97316":"2px solid transparent"}}>
              {t==="mission"?"📦 Mission":t==="gains"?"💰 Gains":"🗺️ Nav GPS"}
            </button>
          ))}
        </div>

        {tab==="mission" && (
          <div className="fade">
            {!online ? (
              <div style={{textAlign:"center",padding:"40px",background:"rgba(5,30,15,.6)",borderRadius:16,border:"1px solid rgba(255,255,255,.05)"}}>
                <div style={{fontSize:48,marginBottom:12}}>😴</div>
                <div style={{fontWeight:700,marginBottom:6}}>Passez en ligne pour recevoir des missions</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.35)"}}>Cliquez sur "Hors ligne" en haut à droite</div>
              </div>
            ) : (
              <>
                {/* Progress bar */}
                <div style={{background:"rgba(5,30,15,.8)",border:`1px solid ${STATUTS[statut].color}30`,borderRadius:14,padding:"16px",marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span style={{fontSize:12,color:STATUTS[statut].color,fontWeight:700}}>{STATUTS[statut].label}</span>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{MISSION_INIT.id}</span>
                  </div>
                  <div style={{height:6,background:"rgba(255,255,255,.06)",borderRadius:3,marginBottom:4}}>
                    <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,#f97316,#ea580c)`,borderRadius:3,transition:"width .5s ease"}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"rgba(255,255,255,.2)"}}>
                    <span>Mission</span><span>Pickup</span><span>Transit</span><span>Livré ✓</span>
                  </div>
                </div>

                {/* Détail mission */}
                {statut!=="delivered" && (
                  <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,padding:"16px",marginBottom:14}}>
                    <h3 style={{fontWeight:700,fontSize:14,marginBottom:12,color:"#fb923c"}}>{MISSION_INIT.client}</h3>
                    {[
                      {l:"📞 Téléphone",v:MISSION_INIT.phone},
                      {l:"📦 Pickup",   v:MISSION_INIT.pickup},
                      {l:"📍 Livraison",v:MISSION_INIT.dest},
                      {l:"🛍️ Produits", v:MISSION_INIT.produits},
                      {l:"💰 Montant",  v:`${MISSION_INIT.montant.toLocaleString()} F · Vos gains: ${MISSION_INIT.frais.toLocaleString()} F`},
                      {l:"📏 Distance", v:`${MISSION_INIT.dist} · ~${MISSION_INIT.eta} min`},
                    ].map(r=>(
                      <div key={r.l} style={{padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                        <div style={{fontSize:10,color:"rgba(255,255,255,.3)",marginBottom:2}}>{r.l}</div>
                        <div style={{fontSize:12,fontWeight:600}}>{r.v}</div>
                      </div>
                    ))}
                  </div>
                )}

                {statut==="delivered" && (
                  <div style={{textAlign:"center",padding:"32px",background:"rgba(52,211,153,.08)",border:"1px solid rgba(52,211,153,.25)",borderRadius:16,marginBottom:14}}>
                    <div style={{fontSize:56,marginBottom:10}}>✅</div>
                    <div style={{fontSize:18,fontWeight:800,color:"#34d399",marginBottom:4}}>Mission accomplie !</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>+{MISSION_INIT.frais.toLocaleString()} F ajoutés à votre portefeuille</div>
                  </div>
                )}

                {STATUTS[statut].next||statut==="transit" ? (
                  <button onClick={next} style={{width:"100%",background:`linear-gradient(135deg,${STATUTS[statut].color},${STATUTS[statut].color}aa)`,border:"none",borderRadius:12,padding:"14px",color:statut==="delivered"?"#020d07":"white",fontWeight:800,fontSize:15,cursor:"pointer"}}>
                    {STATUTS[statut].action}
                  </button>
                ) : statut==="delivered" && (
                  <button onClick={()=>setStatut("pending")} style={{width:"100%",background:"rgba(249,115,22,.15)",border:"1px solid rgba(249,115,22,.3)",borderRadius:12,padding:"12px",color:"#fb923c",fontWeight:700,fontSize:14,cursor:"pointer"}}>
                    Prêt pour une nouvelle mission
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {tab==="gains" && (
          <div className="fade">
            <div style={{background:"rgba(251,191,36,.08)",border:"1px solid rgba(251,191,36,.2)",borderRadius:14,padding:"20px",textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:4}}>Solde portefeuille</div>
              <div style={{fontSize:36,fontWeight:800,color:"#fbbf24"}}>{(gainJour+2800).toLocaleString()} F CFA</div>
              <button style={{marginTop:12,background:"linear-gradient(135deg,#d97706,#b45309)",border:"none",borderRadius:8,padding:"9px 20px",color:"white",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                💸 Retrait Wave
              </button>
            </div>
            {[{d:"Aujourd'hui",m:gainJour,c:6},{d:"Hier",m:3200,c:4},{d:"22/06",m:5500,c:7}].map(r=>(
              <div key={r.d} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                <div>
                  <div style={{fontWeight:600,fontSize:13}}>{r.d}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{r.c} courses</div>
                </div>
                <span style={{fontWeight:800,color:"#34d399"}}>+{r.m.toLocaleString()} F</span>
              </div>
            ))}
          </div>
        )}

        {tab==="nav" && (
          <div className="fade">
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,overflow:"hidden"}}>
              {/* Faux GPS SVG */}
              <svg viewBox="0 0 400 260" style={{width:"100%",display:"block"}}>
                <rect width="400" height="260" fill="#010f08"/>
                {Array.from({length:8},(_,i)=><line key={`v${i}`} x1={i*50} y1="0" x2={i*50} y2="260" stroke="#059669" strokeOpacity=".05" strokeWidth="1"/>)}
                {Array.from({length:6},(_,i)=><line key={`h${i}`} x1="0" y1={i*50} x2="400" y2={i*50} stroke="#059669" strokeOpacity=".05" strokeWidth="1"/>)}
                <path d="M 0 100 Q 100 20 200 50 Q 300 30 400 80 L 400 260 L 0 260 Z" fill="#011a0a" stroke="#059669" strokeWidth="1" strokeOpacity=".15"/>
                {/* Route */}
                <path d="M 60 180 L 200 140 L 340 80" stroke="#f97316" strokeWidth="3" strokeDasharray="8,4" fill="none" strokeOpacity=".7"/>
                {/* Pickup */}
                <circle cx="60" cy="180" r="8" fill="#fbbf24"/>
                <text x="60" y="200" fill="#fbbf24" fontSize="9" textAnchor="middle">Pickup</text>
                {/* Dest */}
                <circle cx="340" cy="80" r="8" fill="#34d399"/>
                <text x="340" y="100" fill="#34d399" fontSize="9" textAnchor="middle">Dest</text>
                {/* Rider */}
                <circle cx={140+(tick%20)*5} cy={170-(tick%20)*3} r="12" fill="#f97316" fillOpacity=".9"/>
                <text x={140+(tick%20)*5} y={170-(tick%20)*3+4} fill="white" fontSize="10" textAnchor="middle">🛵</text>
                {/* Info */}
                <rect x="10" y="10" width="130" height="36" rx="6" fill="rgba(2,13,7,.9)" stroke="rgba(249,115,22,.3)" strokeWidth="1"/>
                <text x="20" y="25" fill="#fb923c" fontSize="9" fontWeight="bold">Prochain virage :</text>
                <text x="20" y="38" fill="rgba(255,255,255,.6)" fontSize="8">Tourner à droite — 200m</text>
              </svg>
              <div style={{padding:"12px 14px",background:"rgba(249,115,22,.08)",borderTop:"1px solid rgba(249,115,22,.15)"}}>
                <div style={{fontSize:12,color:"#fb923c",fontWeight:700,marginBottom:2}}>📍 En route vers : {MISSION_INIT.dest}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Distance restante : {MISSION_INIT.dist} · ETA : ~{Math.max(5,MISSION_INIT.eta-tick*2)} min</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Photo confirmation modal */}
      {showPhoto && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:"2rem"}}>
          <div style={{background:"#020d07",border:"1px solid rgba(52,211,153,.3)",borderRadius:20,padding:"28px",maxWidth:360,width:"100%",textAlign:"center"}} className="fade">
            <div style={{fontSize:48,marginBottom:12}}>📸</div>
            <h3 style={{fontWeight:800,fontSize:18,marginBottom:8}}>Confirmer la livraison</h3>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:13,marginBottom:20}}>Prenez une photo du colis déposé pour valider la livraison</p>
            <div style={{background:"rgba(5,30,15,.9)",border:"2px dashed rgba(52,211,153,.3)",borderRadius:14,height:140,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,cursor:"pointer"}} onClick={confirmPhoto}>
              {photoConfirmed ? <span style={{fontSize:36}}>✅</span> : <div style={{color:"rgba(255,255,255,.3)",fontSize:13}}>Appuyez pour prendre la photo</div>}
            </div>
            <button onClick={confirmPhoto} style={{width:"100%",background:"linear-gradient(135deg,#059669,#16a34a)",border:"none",borderRadius:12,padding:"13px",color:"white",fontWeight:800,fontSize:14,cursor:"pointer"}}>
              ✅ Valider la livraison
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
