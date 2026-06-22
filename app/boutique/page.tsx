"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.96)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Accueil</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const BOUTIQUES = [
  {id:"B1",nom:"Épicerie Almadies",    zone:"Almadies",  statut:"active",stock_alert:2,ca_mois:485000},
  {id:"B2",nom:"Marché Sandaga",       zone:"Plateau",   statut:"active",stock_alert:0,ca_mois:720000},
  {id:"B3",nom:"Mini-Marché Parcelles",zone:"Parcelles", statut:"active",stock_alert:5,ca_mois:312000},
  {id:"B4",nom:"Boutique Yoff Village",zone:"Yoff",      statut:"inactive",stock_alert:0,ca_mois:0},
]

const STOCK = [
  {id:1,produit:"Poulet Fermier",    cat:"Volaille",  qte:24, seuil:10, unite:"unités",  ppu:7500},
  {id:2,produit:"Café Touba 500g",   cat:"Épicerie",  qte:4,  seuil:8,  unite:"sachets", ppu:2500},
  {id:3,produit:"Pâte d'arachide",   cat:"Épicerie",  qte:18, seuil:5,  unite:"pots",    ppu:1800},
  {id:4,produit:"Tomates fraîches",  cat:"Légumes",   qte:2,  seuil:10, unite:"kg",      ppu:1200},
  {id:5,produit:"Œufs fermiers",     cat:"Laitier",   qte:12, seuil:6,  unite:"plateaux",ppu:3600},
  {id:6,produit:"Jus Bissap",        cat:"Boissons",  qte:30, seuil:10, unite:"bouteilles",ppu:900},
]

const CMDS_FOURN = [
  {id:"CF-012",date:"22/06/2025",produits:"Poulet x50, Café Touba x20",montant:420000,statut:"En attente"},
  {id:"CF-011",date:"19/06/2025",produits:"Tomates 20kg, Oignons 10kg", montant:28000, statut:"Livré"},
  {id:"CF-010",date:"15/06/2025",produits:"Œufs x10 plateaux",          montant:36000, statut:"Livré"},
]

export default function BoutiqueManager() {
  const [tab, setTab] = useState<"stock"|"commandes"|"factures">("stock")
  const [selBoutique, setSelBoutique] = useState("B1")
  const [showCmdForm, setShowCmdForm] = useState(false)

  const boutique = BOUTIQUES.find(b=>b.id===selBoutique)!
  const alertes = STOCK.filter(s=>s.qte<=s.seuil)

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .3s ease both}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#022c22,#014421 50%,#020d07)",borderBottom:"1px solid rgba(5,150,80,.2)",padding:"1.2rem 2rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#6ee7b7",marginBottom:3}}>BLOC COMMERCIAL</div>
            <h1 style={{fontSize:22,fontWeight:800}}>🏪 Boutique Manager</h1>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:12}}>Gestion des boutiques partenaires Gade Gui</p>
          </div>
          <div style={{display:"flex",gap:8}}>
            {[{v:BOUTIQUES.filter(b=>b.statut==="active").length,l:"Actives",c:"#34d399"},{v:alertes.length,l:"Alertes stock",c:"#ef4444"},{v:"1 537 000 F",l:"CA mensuel",c:"#fbbf24"}].map(k=>(
              <div key={k.l} style={{background:"rgba(5,150,80,.08)",border:"1px solid rgba(5,150,80,.15)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:15,fontWeight:800,color:k.c}}>{k.v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"1.5rem 2rem 4rem"}}>
        {/* Sélecteur boutique */}
        <div style={{display:"flex",gap:10,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
          {BOUTIQUES.map(b=>(
            <button key={b.id} onClick={()=>setSelBoutique(b.id)} style={{whiteSpace:"nowrap",padding:"10px 16px",borderRadius:10,border:`1px solid ${selBoutique===b.id?"rgba(5,150,80,.5)":"rgba(255,255,255,.08)"}`,background:selBoutique===b.id?"rgba(5,150,80,.15)":"rgba(255,255,255,.03)",color:"white",cursor:"pointer",fontWeight:selBoutique===b.id?700:400,display:"flex",flexDirection:"column",gap:3,minWidth:140,textAlign:"left"}}>
              <span style={{fontSize:13}}>{b.nom}</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{b.zone}</span>
              <span style={{fontSize:11,color:b.statut==="active"?"#34d399":"#6b7280"}}>{b.statut==="active"?"● Actif":"● Inactif"}</span>
            </button>
          ))}
        </div>

        {/* Résumé boutique sélectionnée */}
        <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}} className="fade">
          <div>
            <div style={{fontWeight:700,fontSize:15,marginBottom:2}}>{boutique.nom}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{boutique.zone} · {boutique.stock_alert} alertes stock</div>
          </div>
          <div style={{display:"flex",gap:12}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:16,fontWeight:800,color:"#fbbf24"}}>{boutique.ca_mois.toLocaleString()} F</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>CA ce mois</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,marginBottom:16,background:"rgba(255,255,255,.04)",borderRadius:10,padding:4,width:"fit-content"}}>
          {(["stock","commandes","factures"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"7px 16px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:tab===t?"rgba(5,150,80,.2)":"transparent",color:tab===t?"#34d399":"rgba(255,255,255,.4)"}}>
              {t==="stock"?"📦 Stock":t==="commandes"?"🛒 Commandes fournisseur":"🧾 Factures"}
            </button>
          ))}
        </div>

        {tab==="stock" && (
          <div className="fade">
            {alertes.length>0 && (
              <div style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",borderRadius:12,padding:"12px 16px",marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
                <span style={{fontSize:18}}>⚠️</span>
                <span style={{fontSize:13,color:"#f87171"}}>{alertes.length} produit(s) en dessous du seuil minimal : {alertes.map(a=>a.produit).join(", ")}</span>
              </div>
            )}
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid rgba(5,150,80,.1)"}}>
                    {["Produit","Catégorie","Stock","Seuil","Prix unit.","Statut"].map(h=>(
                      <th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:11,color:"rgba(255,255,255,.35)",fontWeight:600}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {STOCK.map((s,i)=>{
                    const alert = s.qte<=s.seuil
                    return (
                      <tr key={s.id} style={{borderBottom:"1px solid rgba(255,255,255,.04)",background:i%2===0?"transparent":"rgba(255,255,255,.01)"}}>
                        <td style={{padding:"12px 16px",fontWeight:600,fontSize:13}}>{s.produit}</td>
                        <td style={{padding:"12px 16px",fontSize:12,color:"rgba(255,255,255,.4)"}}>{s.cat}</td>
                        <td style={{padding:"12px 16px",fontWeight:700,color:alert?"#ef4444":"white",fontSize:13}}>{s.qte} {s.unite}</td>
                        <td style={{padding:"12px 16px",fontSize:12,color:"rgba(255,255,255,.35)"}}>{s.seuil}</td>
                        <td style={{padding:"12px 16px",fontSize:13,color:"#fbbf24",fontWeight:600}}>{s.ppu.toLocaleString()} F</td>
                        <td style={{padding:"12px 16px"}}>
                          <span style={{fontSize:11,fontWeight:700,color:alert?"#ef4444":"#34d399",background:alert?"rgba(239,68,68,.12)":"rgba(52,211,153,.12)",padding:"3px 10px",borderRadius:6}}>
                            {alert?"⚠️ Alerte":"✅ OK"}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="commandes" && (
          <div className="fade">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h3 style={{fontWeight:700,fontSize:14}}>Commandes fournisseur</h3>
              <button onClick={()=>setShowCmdForm(f=>!f)} style={{background:"linear-gradient(135deg,#059669,#16a34a)",border:"none",borderRadius:8,padding:"8px 16px",color:"white",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                + Nouvelle commande
              </button>
            </div>
            {showCmdForm && (
              <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(5,150,80,.2)",borderRadius:14,padding:"18px",marginBottom:14}} className="fade">
                <h4 style={{fontWeight:700,marginBottom:12,fontSize:13,color:"#6ee7b7"}}>Nouvelle commande fournisseur</h4>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  {["Produits commandés","Quantité / Unité","Montant estimé (F CFA)","Date livraison souhaitée"].map(f=>(
                    <div key={f}>
                      <label style={{fontSize:11,color:"rgba(255,255,255,.35)",display:"block",marginBottom:4}}>{f}</label>
                      <input placeholder={f} style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"9px 12px",color:"white",fontSize:12,outline:"none",boxSizing:"border-box"}}/>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:10,marginTop:14}}>
                  <button style={{flex:1,background:"linear-gradient(135deg,#059669,#16a34a)",border:"none",borderRadius:8,padding:"10px",color:"white",fontWeight:700,fontSize:13,cursor:"pointer"}}>Envoyer la commande</button>
                  <button onClick={()=>setShowCmdForm(false)} style={{background:"rgba(255,255,255,.06)",border:"none",borderRadius:8,padding:"10px 16px",color:"rgba(255,255,255,.4)",fontSize:13,cursor:"pointer"}}>Annuler</button>
                </div>
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {CMDS_FOURN.map(c=>(
                <div key={c.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.08)",borderRadius:12,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,marginBottom:2}}>{c.id} <span style={{color:"rgba(255,255,255,.35)",fontWeight:400,fontSize:11}}>· {c.date}</span></div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,.45)"}}>{c.produits}</div>
                  </div>
                  <div style={{display:"flex",gap:14,alignItems:"center"}}>
                    <span style={{fontWeight:800,color:"#fbbf24",fontSize:14}}>{c.montant.toLocaleString()} F</span>
                    <span style={{fontSize:11,fontWeight:700,color:c.statut==="Livré"?"#34d399":"#fbbf24",background:c.statut==="Livré"?"rgba(52,211,153,.1)":"rgba(251,191,36,.1)",padding:"3px 10px",borderRadius:6}}>{c.statut}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="factures" && (
          <div className="fade">
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid rgba(5,150,80,.1)"}}>
                    {["Facture","Date","Montant","Statut","Action"].map(h=>(
                      <th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:11,color:"rgba(255,255,255,.35)",fontWeight:600}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[{id:"FAC-088",date:"22/06",mt:420000,st:"Émise"},{id:"FAC-081",date:"15/06",mt:280000,st:"Payée"},{id:"FAC-075",date:"08/06",mt:195000,st:"Payée"}].map((f,i)=>(
                    <tr key={f.id} style={{borderBottom:"1px solid rgba(255,255,255,.04)",background:i%2===0?"transparent":"rgba(255,255,255,.01)"}}>
                      <td style={{padding:"12px 16px",fontWeight:600}}>{f.id}</td>
                      <td style={{padding:"12px 16px",fontSize:12,color:"rgba(255,255,255,.4)"}}>{f.date}/2025</td>
                      <td style={{padding:"12px 16px",fontWeight:700,color:"#fbbf24"}}>{f.mt.toLocaleString()} F</td>
                      <td style={{padding:"12px 16px"}}><span style={{fontSize:11,fontWeight:700,color:f.st==="Payée"?"#34d399":"#fb923c",background:f.st==="Payée"?"rgba(52,211,153,.1)":"rgba(249,115,22,.1)",padding:"3px 10px",borderRadius:6}}>{f.st}</span></td>
                      <td style={{padding:"12px 16px"}}><button style={{fontSize:11,color:"#60a5fa",background:"none",border:"none",cursor:"pointer",fontWeight:600}}>↓ PDF</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
