"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/delivery" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Gade Gui Express</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const LIVREURS_DISPO = [
  {id:"LIV-001",nom:"Moussa Diallo",  zone:"Almadies",  vehicule:"Moto",    note:4.8,courses_auj:3,dist_km:1.2},
  {id:"LIV-002",nom:"Ibou Sarr",      zone:"Plateau",   vehicule:"Vélo",    note:4.6,courses_auj:2,dist_km:4.1},
  {id:"LIV-005",nom:"Amadou Ndiaye",  zone:"Almadies",  vehicule:"Moto",    note:4.7,courses_auj:4,dist_km:0.8},
  {id:"LIV-006",nom:"Seydou Diop",    zone:"Yoff",      vehicule:"Moto",    note:4.5,courses_auj:1,dist_km:3.6},
  {id:"LIV-007",nom:"Aissatou Fall",  zone:"Plateau",   vehicule:"Vélo",    note:4.4,courses_auj:2,dist_km:4.8},
]

const TARIFS: Record<string,number> = {
  "Express (<5 km)":800,
  "Standard (5-15 km)":1200,
  "Grande distance (>15 km)":2000,
  "Livraison B2B (>10 kg)":2500,
}

export default function Dispatch() {
  const [client, setClient]     = useState("")
  const [pickup, setPickup]     = useState("Almadies — Entrepôt Gade Gui")
  const [dest, setDest]         = useState("")
  const [produits, setProduits] = useState("")
  const [montant, setMontant]   = useState("")
  const [typeTarif, setTypeTarif] = useState("Express (<5 km)")
  const [livreurSel, setLivreurSel] = useState<string|null>(null)
  const [confirme, setConfirme] = useState(false)

  const frais = TARIFS[typeTarif]
  const totalCalc = Number(montant) + frais

  function handleDispatch() {
    if(!client||!dest||!livreurSel) return
    setConfirme(true)
    setTimeout(()=>{ setConfirme(false); setClient(""); setDest(""); setProduits(""); setMontant(""); setLivreurSel(null) },3500)
  }

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .35s ease both} @keyframes pop{0%{transform:scale(.8);opacity:0}60%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}} .pop{animation:pop .4s ease} input::placeholder,textarea::placeholder{color:rgba(255,255,255,.2)} select option{background:#020d07}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#1e0a40,#2e1065 50%,#020d07)",borderBottom:"1px solid rgba(124,58,237,.2)",padding:"1.2rem 2rem"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#c4b5fd",marginBottom:3}}>LIVRAISON · MODULE 3</div>
          <h1 style={{fontSize:22,fontWeight:800}}>🎯 Dispatch Manuel</h1>
          <p style={{color:"rgba(255,255,255,.4)",fontSize:12,marginTop:4}}>Créer et affecter une livraison manuellement à un rider disponible</p>
        </div>
      </div>

      <div style={{maxWidth:1000,margin:"0 auto",padding:"1.5rem 2rem 3rem"}}>
        {confirme ? (
          <div className="pop" style={{background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.4)",borderRadius:16,padding:"48px",textAlign:"center"}}>
            <div style={{fontSize:64,marginBottom:16}}>✅</div>
            <div style={{fontSize:22,fontWeight:800,color:"#34d399",marginBottom:8}}>Commande dispatchée !</div>
            <div style={{fontSize:14,color:"rgba(255,255,255,.5)"}}>Le livreur {LIVREURS_DISPO.find(l=>l.id===livreurSel)?.nom} a été notifié.</div>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
            {/* Formulaire commande */}
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:16,padding:"22px"}} className="fade">
              <h3 style={{fontWeight:700,marginBottom:18,color:"#c4b5fd",fontSize:14}}>📋 Détails de la commande</h3>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {[
                  {label:"Client / Destinataire",val:client,   set:setClient,   ph:"Nom ou raison sociale"},
                  {label:"Adresse de départ",    val:pickup,   set:setPickup,   ph:"Entrepôt Gade Gui, Almadies"},
                  {label:"Adresse de livraison", val:dest,     set:setDest,     ph:"Ex: 5 Rue Vincens, Plateau"},
                ].map(f=>(
                  <div key={f.label}>
                    <label style={{fontSize:11,color:"rgba(255,255,255,.4)",display:"block",marginBottom:4}}>{f.label}</label>
                    <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                      style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"9px 12px",color:"white",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                  </div>
                ))}
                <div>
                  <label style={{fontSize:11,color:"rgba(255,255,255,.4)",display:"block",marginBottom:4}}>Produits / Description</label>
                  <textarea value={produits} onChange={e=>setProduits(e.target.value)} rows={2} placeholder="Ex: 10 kg poulet, 2 Café Touba..."
                    style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"9px 12px",color:"white",fontSize:13,outline:"none",resize:"none",boxSizing:"border-box"}}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div>
                    <label style={{fontSize:11,color:"rgba(255,255,255,.4)",display:"block",marginBottom:4}}>Valeur commande (F CFA)</label>
                    <input type="number" value={montant} onChange={e=>setMontant(e.target.value)} placeholder="Ex: 45000"
                      style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"9px 12px",color:"white",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                  </div>
                  <div>
                    <label style={{fontSize:11,color:"rgba(255,255,255,.4)",display:"block",marginBottom:4}}>Type de livraison</label>
                    <select value={typeTarif} onChange={e=>setTypeTarif(e.target.value)}
                      style={{width:"100%",background:"rgba(5,30,15,.95)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"9px 12px",color:"white",fontSize:12,outline:"none",cursor:"pointer"}}>
                      {Object.keys(TARIFS).map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Estimation */}
                <div style={{background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.2)",borderRadius:10,padding:"14px"}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:8}}>Estimation tarifaire</div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>Valeur commande</span>
                    <span style={{fontSize:13,fontWeight:700}}>{montant?Number(montant).toLocaleString():0} F</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>Frais livraison</span>
                    <span style={{fontSize:13,fontWeight:700,color:"#a78bfa"}}>{frais.toLocaleString()} F</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",paddingTop:8,borderTop:"1px solid rgba(255,255,255,.08)"}}>
                    <span style={{fontSize:13,fontWeight:700}}>Total client</span>
                    <span style={{fontSize:18,fontWeight:800,color:"#fbbf24"}}>{(montant?totalCalc:frais).toLocaleString()} F CFA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sélection livreur */}
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:16,padding:"22px"}} className="fade">
                <h3 style={{fontWeight:700,marginBottom:4,color:"#c4b5fd",fontSize:14}}>🛵 Livreurs disponibles</h3>
                <p style={{fontSize:11,color:"rgba(255,255,255,.35)",marginBottom:14}}>Sélectionnez le rider à affecter à cette commande</p>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {LIVREURS_DISPO.map(l=>(
                    <button key={l.id} onClick={()=>setLivreurSel(livreurSel===l.id?null:l.id)}
                      style={{background:livreurSel===l.id?"rgba(124,58,237,.2)":"rgba(255,255,255,.03)",border:`1px solid ${livreurSel===l.id?"rgba(124,58,237,.6)":"rgba(255,255,255,.06)"}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .2s",textAlign:"left"}}>
                      <div style={{display:"flex",gap:10,alignItems:"center"}}>
                        <div style={{width:32,height:32,borderRadius:"50%",background:livreurSel===l.id?"rgba(124,58,237,.4)":"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:livreurSel===l.id?"#c4b5fd":"rgba(255,255,255,.6)",flexShrink:0}}>
                          {l.nom.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <div>
                          <div style={{fontWeight:600,fontSize:13}}>{l.nom}</div>
                          <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{l.vehicule} · {l.zone}</div>
                        </div>
                      </div>
                      <div style={{textAlign:"right",flexShrink:0}}>
                        <div style={{fontSize:12,fontWeight:700,color:"#fbbf24"}}>⭐ {l.note}</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>{l.dist_km} km · {l.courses_auj} courses</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleDispatch} disabled={!client||!dest||!livreurSel}
                style={{background:client&&dest&&livreurSel?"linear-gradient(135deg,#7c3aed,#6d28d9)":"rgba(255,255,255,.06)",border:"none",borderRadius:12,padding:"16px",color:client&&dest&&livreurSel?"white":"rgba(255,255,255,.3)",fontWeight:800,fontSize:15,cursor:client&&dest&&livreurSel?"pointer":"not-allowed",transition:"all .2s"}}>
                🚀 Dispatcher la commande{livreurSel?" → "+LIVREURS_DISPO.find(l=>l.id===livreurSel)?.nom.split(" ")[0]:""}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
