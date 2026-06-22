"use client"
import { useState, useEffect } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.96)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(249,115,22,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Accueil</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const ZONES = ["Almadies","Plateau","Médina","Fann","Mermoz","Ouakam","Yoff","Parcelles"]
const RESTAURANTS = [
  {id:"R1",nom:"Gade Gui Fresh",    cat:"Produits frais",  delai:25,note:4.9,emoji:"🌾",livraison:800},
  {id:"R2",nom:"Le Ndogou Dakar",   cat:"Thiéboudienne",   delai:35,note:4.7,emoji:"🍚",livraison:1000},
  {id:"R3",nom:"Café Touba Express",cat:"Boissons & Snacks",delai:20,note:4.8,emoji:"☕",livraison:600},
  {id:"R4",nom:"Yassa & Co",        cat:"Cuisine sénégalaise",delai:40,note:4.6,emoji:"🍗",livraison:1000},
  {id:"R5",nom:"Fresh Box",         cat:"Salades & Bowls",  delai:30,note:4.5,emoji:"🥗",livraison:800},
  {id:"R6",nom:"Pâtisserie Dakar",  cat:"Pains & Gâteaux",  delai:30,note:4.8,emoji:"🥐",livraison:700},
]

const COMMANDES_LIVE = [
  {id:"GGE-241",client:"Moussa D.",  zone:"Almadies",  statut:"En préparation",eta:8,  color:"#fbbf24"},
  {id:"GGE-240",client:"Fatou S.",   zone:"Plateau",   statut:"En route",       eta:12, color:"#34d399"},
  {id:"GGE-239",client:"Hôtel Ngor", zone:"Ngor",      statut:"Livré",          eta:0,  color:"#60a5fa"},
]

export default function Express() {
  const [zone, setZone] = useState("")
  const [step, setStep] = useState<"home"|"restaurant"|"suivi">("home")
  const [selResto, setSelResto] = useState<typeof RESTAURANTS[0]|null>(null)
  const [tick, setTick] = useState(0)
  const [eta, setEta] = useState(34)
  const [trackId] = useState(`GGE-${Math.floor(Math.random()*900+200)}`)

  useEffect(()=>{ const t=setInterval(()=>setTick(n=>n+1),3000); return()=>clearInterval(t) },[])

  const STEPS_LIVRAISON = [
    {label:"Commande reçue",  done:true},
    {label:"En préparation",  done:step==="suivi"&&tick>1},
    {label:"Livreur assigné", done:step==="suivi"&&tick>2},
    {label:"En route",        done:step==="suivi"&&tick>4},
    {label:"Livré !",         done:step==="suivi"&&tick>8},
  ]

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .3s ease both} @keyframes spin{to{transform:rotate(360deg)}} .spin{animation:spin 2s linear infinite} input::placeholder,select option{color:rgba(255,255,255,.25);background:#020d07}`}</style>
      {NAV}

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#1c0700,#431200 50%,#020d07)",borderBottom:"1px solid rgba(249,115,22,.2)",padding:"1.4rem 1.5rem 1rem"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".14em",color:"#fed7aa",marginBottom:4}}>GADE GUI EXPRESS · DAKAR</div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>⚡ GadeGui Express</h1>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:12}}>Livraison rapide · 45 min garanties dans Dakar</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[{v:COMMANDES_LIVE.filter(c=>c.statut==="En route").length,l:"En route",c:"#34d399"},{v:COMMANDES_LIVE.length,l:"Actives",c:"#f97316"},{v:eta+" min",l:"Délai moy.",c:"#fbbf24"}].map(k=>(
              <div key={k.l} style={{background:"rgba(249,115,22,.08)",border:"1px solid rgba(249,115,22,.15)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:800,color:k.c}}>{k.v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"1.5rem 1.5rem 4rem"}}>

        {step==="home" && (
          <div className="fade">
            {/* Zone selector */}
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(249,115,22,.15)",borderRadius:14,padding:"20px",marginBottom:20}}>
              <h3 style={{fontWeight:700,marginBottom:12,fontSize:14,color:"#fb923c"}}>📍 Votre zone de livraison</h3>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {ZONES.map(z=>(
                  <button key={z} onClick={()=>setZone(z)} style={{padding:"8px 16px",borderRadius:20,border:`1px solid ${zone===z?"rgba(249,115,22,.6)":"rgba(255,255,255,.1)"}`,background:zone===z?"rgba(249,115,22,.15)":"transparent",color:zone===z?"#fb923c":"rgba(255,255,255,.5)",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                    {z}
                  </button>
                ))}
              </div>
              {zone && <p style={{marginTop:10,fontSize:12,color:"#34d399"}}>✅ Zone couverte — délai estimé 30-45 min</p>}
            </div>

            {/* Restaurants */}
            <h3 style={{fontWeight:700,marginBottom:12,fontSize:13,color:"rgba(255,255,255,.5)"}}>Disponible maintenant</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12,marginBottom:28}}>
              {RESTAURANTS.map((r,i)=>(
                <button key={r.id} onClick={()=>{setSelResto(r);setStep("restaurant")}}
                  style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(249,115,22,.1)",borderRadius:14,padding:"16px",cursor:"pointer",color:"white",textAlign:"left",transition:"all .2s",animation:`fadeUp .3s ease ${i*.06}s both`}}>
                  <div style={{fontSize:36,marginBottom:8}}>{r.emoji}</div>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:2}}>{r.nom}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:8}}>{r.cat}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:12,color:"#fbbf24"}}>⭐ {r.note}</span>
                    <span style={{fontSize:12,color:"#34d399"}}>⏱ {r.delai} min</span>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>🛵 {r.livraison} F</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Commandes live */}
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,padding:"18px"}}>
              <h3 style={{fontWeight:700,marginBottom:14,fontSize:13,color:"rgba(255,255,255,.5)"}}>🔴 Commandes en cours (live)</h3>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {COMMANDES_LIVE.map(c=>(
                  <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"rgba(255,255,255,.03)",borderRadius:10}}>
                    <div>
                      <span style={{fontSize:12,fontWeight:600}}>{c.id}</span>
                      <span style={{fontSize:12,color:"rgba(255,255,255,.4)",marginLeft:8}}>{c.client} · {c.zone}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      {c.eta>0 && <span style={{fontSize:12,color:"rgba(255,255,255,.35)"}}>~{c.eta} min</span>}
                      <span style={{fontSize:11,fontWeight:700,color:c.color,background:`${c.color}18`,padding:"3px 10px",borderRadius:6}}>{c.statut}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step==="restaurant" && selResto && (
          <div className="fade">
            <button onClick={()=>setStep("home")} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",cursor:"pointer",fontSize:13,marginBottom:16}}>← Retour</button>
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(249,115,22,.2)",borderRadius:16,padding:"24px",marginBottom:16,textAlign:"center"}}>
              <div style={{fontSize:52,marginBottom:8}}>{selResto.emoji}</div>
              <h2 style={{fontSize:20,fontWeight:800,marginBottom:4}}>{selResto.nom}</h2>
              <p style={{color:"rgba(255,255,255,.4)",fontSize:13,marginBottom:12}}>{selResto.cat}</p>
              <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:16}}>
                <span style={{color:"#fbbf24",fontWeight:700}}>⭐ {selResto.note}</span>
                <span style={{color:"#34d399"}}>⏱ {selResto.delai} min</span>
                <span style={{color:"rgba(255,255,255,.4)"}}>🛵 {selResto.livraison} F</span>
              </div>
              <button onClick={()=>{setStep("suivi");setEta(selResto.delai)}} style={{background:"linear-gradient(135deg,#f97316,#ea580c)",border:"none",borderRadius:12,padding:"14px 32px",color:"white",fontWeight:800,fontSize:15,cursor:"pointer"}}>
                ⚡ Commander maintenant
              </button>
            </div>
          </div>
        )}

        {step==="suivi" && (
          <div className="fade" style={{maxWidth:480,margin:"0 auto"}}>
            <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(249,115,22,.25)",borderRadius:16,padding:"24px"}}>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:11,color:"#fb923c",fontWeight:700,letterSpacing:".1em",marginBottom:6}}>COMMANDE EN COURS</div>
                <div style={{fontSize:20,fontWeight:800}}>{trackId}</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,.4)",marginTop:4}}>{selResto?.nom}</div>
              </div>
              {/* ETA circle */}
              <div style={{width:100,height:100,borderRadius:"50%",background:"rgba(249,115,22,.1)",border:"3px solid #f97316",margin:"0 auto 24px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <div style={{fontSize:28,fontWeight:800,color:"#fb923c"}}>{Math.max(0,eta-tick*3)}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>min</div>
              </div>
              {/* Steps */}
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {STEPS_LIVRAISON.map((s,i)=>(
                  <div key={s.label} style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:24,height:24,borderRadius:"50%",background:s.done?"#34d399":"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>
                      {s.done?"✓":i+1}
                    </div>
                    <span style={{fontSize:13,color:s.done?"white":"rgba(255,255,255,.35)",fontWeight:s.done?600:400}}>{s.label}</span>
                    {!s.done&&i===STEPS_LIVRAISON.filter(x=>x.done).length&&<div className="spin" style={{width:14,height:14,border:"2px solid rgba(249,115,22,.3)",borderTopColor:"#f97316",borderRadius:"50%",marginLeft:"auto"}}/>}
                  </div>
                ))}
              </div>
              <button onClick={()=>setStep("home")} style={{marginTop:20,width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"10px",color:"rgba(255,255,255,.5)",fontWeight:600,fontSize:13,cursor:"pointer"}}>
                Retour à l'accueil
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
