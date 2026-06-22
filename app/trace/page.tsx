"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Portail Gade Gui</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const PRODUITS: Record<string,{nom:string;lot:string;origine:string;date:string;cert:string[];etapes:{date:string;action:string;lieu:string;resp:string}[];impact:{co2:string;eau:string;emplois:string}}> = {
  "GG-2025-001": {
    nom:"Poulet de chair — Lot A",lot:"LOT-2025-001",origine:"Poulailler A, Almadies, Dakar",
    date:"15/06/2025",cert:["Halal","Sans OGM","HACCP"],
    etapes:[
      {date:"01/06/2025",action:"Mise en place des poussins",lieu:"Poulailler A",resp:"Mamadou D."},
      {date:"10/06/2025",action:"Vaccination Newcastle + Gumboro",lieu:"Poulailler A",resp:"Dr. Fatou N."},
      {date:"14/06/2025",action:"Abattage halal certifié",lieu:"Abattoir Gade Gui",resp:"Cheikh M."},
      {date:"15/06/2025",action:"Conditionnement & Étiquetage",lieu:"Unité transformation",resp:"Aminata K."},
      {date:"15/06/2025",action:"Expédition chaîne du froid",lieu:"Entrepôt logistique",resp:"V-01 / Cheikh F."},
    ],
    impact:{co2:"1.8 kg CO₂eq/kg",eau:"4 100 L/kg",emplois:"12 emplois directs"},
  },
  "GG-2025-002": {
    nom:"Tomates cerise BIO — Parcelle C",lot:"HORT-2025-003",origine:"Serre Horticole C, Almadies",
    date:"20/06/2025",cert:["Agriculture Biologique","Zéro pesticide","HACCP"],
    etapes:[
      {date:"10/05/2025",action:"Semis en serre contrôlée",lieu:"Serre Horticole C",resp:"Ibrahima S."},
      {date:"01/06/2025",action:"Irrigation goutte-à-goutte — déclenchement IA",lieu:"Serre C",resp:"Système IoT"},
      {date:"19/06/2025",action:"Récolte manuelle sélective",lieu:"Serre C",resp:"Équipe horticulture"},
      {date:"20/06/2025",action:"Tri, lavage, emballage éco",lieu:"Unité conditionnement",resp:"Fatou D."},
      {date:"20/06/2025",action:"Livraison express J+0",lieu:"Marché client",resp:"V-03"},
    ],
    impact:{co2:"0.4 kg CO₂eq/kg",eau:"280 L/kg",emplois:"8 emplois directs"},
  },
}

const QR_IDS = ["GG-2025-001","GG-2025-002"]

export default function Trace() {
  const [scan, setScan] = useState<string|null>(null)
  const [input, setInput] = useState("")
  const produit = scan ? PRODUITS[scan] : null

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .4s ease both}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#1a0f00,#2d1900 50%,#020d07)",borderBottom:"1px solid rgba(146,64,14,.2)",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#fde68a",marginBottom:4}}>APPLICATION 2.3</div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>🔍 GadeGui Trace</h1>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:13}}>Traçabilité du Producteur au Consommateur — QR Code · Certifications · Impact</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[["100%","Produits tracés"],["3","Certifications"],["De la ferme","À votre assiette"]].map(([v,l])=>(
              <div key={l} style={{background:"rgba(146,64,14,.1)",border:"1px solid rgba(146,64,14,.25)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:14,fontWeight:800,color:"#fcd34d"}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"1.5rem 2rem 3rem"}}>
        {/* Scanner */}
        <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"24px",marginBottom:24,textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:12}}>📱</div>
          <h3 style={{fontWeight:700,marginBottom:8,color:"#fcd34d"}}>Scanner un QR Code Produit</h3>
          <p style={{fontSize:13,color:"rgba(255,255,255,.4)",marginBottom:20}}>Entrez l&apos;identifiant du produit ou sélectionnez un exemple ci-dessous</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ex: GG-2025-001"
              style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(146,64,14,.3)",borderRadius:8,padding:"10px 16px",color:"white",fontSize:13,outline:"none",minWidth:200}}/>
            <button onClick={()=>{if(PRODUITS[input])setScan(input)}} style={{background:"linear-gradient(135deg,#92400e,#b45309)",border:"none",borderRadius:8,padding:"10px 20px",color:"white",fontWeight:700,cursor:"pointer"}}>
              🔍 Rechercher
            </button>
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            {QR_IDS.map(id=>(
              <button key={id} onClick={()=>{setScan(id);setInput(id)}} style={{background:"rgba(146,64,14,.15)",border:"1px solid rgba(146,64,14,.3)",borderRadius:8,padding:"8px 16px",color:"#fcd34d",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                📦 {id}
              </button>
            ))}
          </div>
        </div>

        {produit && (
          <div className="fade">
            {/* Entête produit */}
            <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(146,64,14,.3)",borderRadius:16,padding:"20px",marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14,marginBottom:14}}>
                <div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:4}}>ID: {scan}</div>
                  <h2 style={{fontSize:20,fontWeight:800,marginBottom:4}}>{produit.nom}</h2>
                  <div style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>🏭 {produit.origine}</div>
                  <div style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>📅 {produit.date} · Lot: {produit.lot}</div>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {produit.cert.map(c=>(
                    <span key={c} style={{background:"rgba(5,150,80,.15)",border:"1px solid rgba(5,150,80,.4)",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:700,color:"#34d399"}}>✅ {c}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
              {/* Timeline traçabilité */}
              <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px"}}>
                <h3 style={{fontWeight:700,marginBottom:16,color:"#fcd34d"}}>🗺️ Parcours du Produit</h3>
                <div style={{position:"relative"}}>
                  <div style={{position:"absolute",left:14,top:0,bottom:0,width:2,background:"rgba(5,150,80,.2)"}}/>
                  <div style={{display:"flex",flexDirection:"column",gap:0}}>
                    {produit.etapes.map((e,i)=>(
                      <div key={i} style={{display:"flex",gap:14,paddingBottom:20,paddingLeft:4}}>
                        <div style={{flexShrink:0,width:24,height:24,borderRadius:"50%",background:"#059669",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,zIndex:1}}>
                          {i+1}
                        </div>
                        <div>
                          <div style={{fontWeight:600,fontSize:13}}>{e.action}</div>
                          <div style={{fontSize:11,color:"rgba(255,255,255,.45)",marginTop:2}}>📅 {e.date} · 📍 {e.lieu}</div>
                          <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>👤 {e.resp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Impact RSE */}
              <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px"}}>
                <h3 style={{fontWeight:700,marginBottom:16,color:"#fcd34d"}}>🌍 Impact Environnemental & Social</h3>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  {[
                    {icon:"💨",label:"Empreinte carbone",value:produit.impact.co2,color:"#60a5fa"},
                    {icon:"💧",label:"Consommation eau",value:produit.impact.eau,color:"#38bdf8"},
                    {icon:"👥",label:"Emplois générés",value:produit.impact.emplois,color:"#34d399"},
                  ].map(k=>(
                    <div key={k.label} style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"14px",display:"flex",gap:12,alignItems:"center"}}>
                      <span style={{fontSize:24}}>{k.icon}</span>
                      <div>
                        <div style={{fontSize:15,fontWeight:800,color:k.color}}>{k.value}</div>
                        <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{k.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{marginTop:16,background:"rgba(5,150,80,.08)",border:"1px solid rgba(5,150,80,.2)",borderRadius:10,padding:"14px"}}>
                  <div style={{fontSize:13,color:"#6ee7b7",fontWeight:700,marginBottom:6}}>🏷️ Certifications vérifiables</div>
                  <p style={{fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.6}}>
                    Chaque certificat est ancré sur une blockchain permissionnée et vérifiable via QR Code en temps réel. La transparence est totale de la ferme à votre assiette.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
