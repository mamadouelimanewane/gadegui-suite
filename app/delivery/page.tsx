"use client"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Portail Gade Gui</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const MODULES = [
  {href:"/delivery/commandes", icon:"📦", label:"Commandes", desc:"Livraisons en cours & historique", color:"#f97316", stat:"12 en cours"},
  {href:"/delivery/livreurs",  icon:"🛵", label:"Livreurs",  desc:"Gestion des riders actifs",       color:"#0891b2", stat:"8 actifs"},
  {href:"/delivery/dispatch",  icon:"🎯", label:"Dispatch",  desc:"Affecter une commande manuellement", color:"#7c3aed", stat:"3 en attente"},
  {href:"/delivery/map",       icon:"🗺️", label:"Carte GPS", desc:"Positions temps réel des riders",  color:"#059669", stat:"Dakar"},
  {href:"/delivery/cashout",   icon:"💳", label:"Paiements", desc:"Cashout & Wave / Orange Money",   color:"#d97706", stat:"45 000 F"},
  {href:"/delivery/rider",     icon:"📱", label:"App Rider", desc:"Interface mobile du livreur",      color:"#dc2626", stat:"Mobile"},
]

const KPI = [
  {label:"Livraisons aujourd'hui", val:"34",   icon:"📦", color:"#f97316"},
  {label:"Livreurs en ligne",       val:"8",    icon:"🛵", color:"#34d399"},
  {label:"Temps moyen",             val:"28 min",icon:"⏱️", color:"#60a5fa"},
  {label:"CA livraisons",           val:"284 k F",icon:"💰",color:"#fbbf24"},
]

export default function DeliveryHub() {
  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .4s ease both} .mcard{transition:all .25s ease;text-decoration:none;display:block} .mcard:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(249,115,22,.15)}`}</style>
      {NAV}

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#1c0500,#2d0f00 50%,#020d07)",borderBottom:"1px solid rgba(249,115,22,.2)",padding:"1.8rem 2rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".14em",color:"#fb923c",marginBottom:4}}>MODULE LIVRAISON — MIGRÉ DE LIVIGO</div>
            <h1 style={{fontSize:26,fontWeight:800,marginBottom:6}}>⚡ Gade Gui Express</h1>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:13,maxWidth:480}}>Back-office livraison : gestion des riders, dispatch des commandes, carte GPS temps réel et paiements Wave/Orange Money.</p>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {KPI.map(k=>(
              <div key={k.label} style={{background:"rgba(249,115,22,.08)",border:"1px solid rgba(249,115,22,.2)",borderRadius:12,padding:"10px 16px",textAlign:"center",minWidth:100}}>
                <div style={{fontSize:11,marginBottom:2}}>{k.icon}</div>
                <div style={{fontSize:18,fontWeight:800,color:k.color}}>{k.val}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.35)",marginTop:1}}>{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"2rem 1.5rem 4rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
          {MODULES.map((m,i)=>(
            <a key={m.href} href={m.href} className="mcard fade" style={{background:"rgba(5,30,15,.85)",border:"1px solid rgba(5,150,80,.1)",borderRadius:16,padding:"22px 20px",borderTop:`3px solid ${m.color}`,animationDelay:`${i*.07}s`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <span style={{fontSize:34}}>{m.icon}</span>
                <span style={{fontSize:11,color:m.color,background:`${m.color}18`,padding:"3px 10px",borderRadius:8,fontWeight:700}}>{m.stat}</span>
              </div>
              <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{m.label}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.4)",lineHeight:1.5,marginBottom:14}}>{m.desc}</div>
              <div style={{fontSize:12,color:m.color,fontWeight:600}}>Ouvrir →</div>
            </a>
          ))}
        </div>

        {/* Badge origine */}
        <div style={{marginTop:32,background:"rgba(249,115,22,.06)",border:"1px solid rgba(249,115,22,.15)",borderRadius:12,padding:"14px 18px",display:"flex",gap:12,alignItems:"center"}}>
          <span style={{fontSize:20}}>🔄</span>
          <div style={{fontSize:12,color:"rgba(255,255,255,.45)"}}>
            <strong style={{color:"#fb923c"}}>Migration LiviGo → Gade Gui Express</strong> · Modules extraits de <code style={{color:"rgba(255,255,255,.3)"}}>c:/gravity/livreur</code> · Stack : React/Vite → Next.js 16 TSX · Données : schémas Driver + Ride + Cashout adaptés avec produits Gade Gui
          </div>
        </div>
      </div>
    </div>
  )
}
