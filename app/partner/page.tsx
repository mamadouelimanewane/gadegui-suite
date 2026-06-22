"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Portail Gade Gui</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const partenaires = [
  {id:1,nom:"Coopérative Marème Diallo",type:"Maraîchage",membres:24,zone:"Pikine",score:88,mission:"Livraison tomates 200kg",statut:"en cours",paiement:45000,color:"#0891b2"},
  {id:2,nom:"GIE Producteurs Avicoles Thiès",type:"Aviculture",membres:18,zone:"Thiès",score:94,mission:"Approvisionnement poussins 5000",statut:"complété",paiement:180000,color:"#059669"},
  {id:3,nom:"Coopérative Horticole Rufisque",type:"Horticulture",membres:31,zone:"Rufisque",score:76,mission:"Production oignons saison",statut:"planifié",paiement:0,color:"#0e7490"},
  {id:4,nom:"GIE Femmes Transformatrices",type:"Transformation",membres:12,zone:"Dakar",score:91,mission:"Production pâte arachide 100L",statut:"en cours",paiement:28000,color:"#7c3aed"},
]

const missions = [
  {id:"MIS-001",titre:"Récolte tomates Parcelle A",coop:"Coopérative Marème Diallo",date:"25/06/2025",quantite:"200 kg",statut:"assignée",paiement:45000},
  {id:"MIS-002",titre:"Livraison poussins lot 5000",coop:"GIE Producteurs Avicoles Thiès",date:"28/06/2025",quantite:"5 000 poussins",statut:"planifiée",paiement:180000},
  {id:"MIS-003",titre:"Production Café Touba 50 sachets",coop:"GIE Femmes Transformatrices",date:"30/06/2025",quantite:"50 kg",statut:"planifiée",paiement:32500},
]

const sc: Record<string,{color:string;bg:string}> = {
  "en cours":{color:"#34d399",bg:"rgba(52,211,153,.12)"},
  "complété":{color:"#60a5fa",bg:"rgba(96,165,250,.12)"},
  "planifié":{color:"#fbbf24",bg:"rgba(251,191,36,.12)"},
  "assignée":{color:"#34d399",bg:"rgba(52,211,153,.12)"},
  "planifiée":{color:"#fbbf24",bg:"rgba(251,191,36,.12)"},
}

export default function Partner() {
  const [tab, setTab] = useState<"coops"|"missions"|"scoring">("coops")

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .4s ease both}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#071d2e,#082f49 50%,#020d07)",borderBottom:"1px solid rgba(8,145,178,.2)",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#7dd3fc",marginBottom:4}}>APPLICATION 4.1</div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>🤝 Partner App</h1>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:13}}>Gestion des Coopératives & Partenaires — Missions · Paiements · Scoring de fiabilité</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[["4","Coopératives"],["85","Membres actifs"],["253 000 F","Paiements en cours"]].map(([v,l])=>(
              <div key={l} style={{background:"rgba(8,145,178,.1)",border:"1px solid rgba(8,145,178,.25)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:14,fontWeight:800,color:"#38bdf8"}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem 2rem 3rem"}}>
        <div style={{display:"flex",gap:4,marginBottom:20,background:"rgba(255,255,255,.04)",borderRadius:12,padding:4,width:"fit-content"}}>
          {(["coops","missions","scoring"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,background:tab===t?"rgba(8,145,178,.25)":"transparent",color:tab===t?"#38bdf8":"rgba(255,255,255,.45)",transition:"all .2s"}}>
              {t==="coops"?"🏘️ Coopératives":t==="missions"?"📋 Missions":"⭐ Scoring"}
            </button>
          ))}
        </div>

        {tab==="coops" && (
          <div className="fade" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
            {partenaires.map(p=>{
              const s = sc[p.statut]
              return (
                <div key={p.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"20px",borderTop:`3px solid ${p.color}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:14,lineHeight:1.3,marginBottom:4}}>{p.nom}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{p.type} · {p.zone}</div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:20,fontWeight:800,color:p.score>=90?"#34d399":p.score>=75?"#fbbf24":"#f87171"}}>{p.score}</div>
                      <div style={{fontSize:9,color:"rgba(255,255,255,.35)"}}>Score</div>
                    </div>
                  </div>
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:4}}>👥 {p.membres} membres · Mission active :</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,.7)",fontWeight:600}}>{p.mission}</div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:"1px solid rgba(255,255,255,.05)"}}>
                    <span style={{fontSize:11,fontWeight:700,color:s.color,background:s.bg,padding:"2px 8px",borderRadius:6}}>{p.statut}</span>
                    {p.paiement>0 && <span style={{fontSize:13,fontWeight:800,color:"#38bdf8"}}>{p.paiement.toLocaleString()} F CFA</span>}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab==="missions" && (
          <div className="fade" style={{display:"flex",flexDirection:"column",gap:12}}>
            {missions.map(m=>{
              const s = sc[m.statut]
              return (
                <div key={m.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:12,padding:"18px 20px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:10}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{m.titre}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{m.id} · {m.coop}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{m.date} · Quantité : {m.quantite}</div>
                    </div>
                    <div style={{display:"flex",gap:12,alignItems:"center"}}>
                      <span style={{fontSize:18,fontWeight:800,color:"#38bdf8"}}>{m.paiement.toLocaleString()} F</span>
                      <span style={{fontSize:11,fontWeight:700,color:s.color,background:s.bg,padding:"3px 10px",borderRadius:8}}>{m.statut}</span>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:10}}>
                    <button style={{background:"rgba(8,145,178,.15)",border:"1px solid rgba(8,145,178,.3)",borderRadius:8,padding:"6px 14px",color:"#38bdf8",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                      📝 Déclaration récolte
                    </button>
                    <button style={{background:"rgba(5,150,80,.1)",border:"1px solid rgba(5,150,80,.2)",borderRadius:8,padding:"6px 14px",color:"#34d399",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                      💳 Déclencher paiement
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab==="scoring" && (
          <div className="fade">
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px",marginBottom:20}}>
              <h3 style={{fontWeight:700,marginBottom:4,color:"#38bdf8"}}>⭐ Système de Scoring des Coopératives</h3>
              <p style={{fontSize:13,color:"rgba(255,255,255,.5)",marginBottom:16}}>Le score (0-100) est calculé automatiquement sur 5 critères. Il conditionne l&apos;accès aux missions prioritaires et aux financements AgriFinance.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
                {[
                  {label:"Ponctualité livraisons",poids:"25%",icon:"⏱️"},
                  {label:"Qualité produits",poids:"25%",icon:"✅"},
                  {label:"Volume produit",poids:"20%",icon:"📦"},
                  {label:"Respect HACCP",poids:"20%",icon:"🛡️"},
                  {label:"Réactivité communication",poids:"10%",icon:"📱"},
                ].map(c=>(
                  <div key={c.label} style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"14px",textAlign:"center"}}>
                    <div style={{fontSize:24,marginBottom:6}}>{c.icon}</div>
                    <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{c.label}</div>
                    <div style={{fontSize:14,fontWeight:800,color:"#38bdf8"}}>{c.poids}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {partenaires.sort((a,b)=>b.score-a.score).map((p,i)=>(
                <div key={p.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:12,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <span style={{fontSize:18,fontWeight:800,color:i===0?"#fbbf24":i===1?"#94a3b8":"#b45309"}}>#{i+1}</span>
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>{p.nom}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{p.type} · {p.membres} membres</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:16,alignItems:"center"}}>
                    <div style={{width:120}}>
                      <div style={{height:6,background:"rgba(255,255,255,.08)",borderRadius:3}}>
                        <div style={{height:6,background:p.score>=90?"#34d399":p.score>=75?"#fbbf24":"#f87171",borderRadius:3,width:`${p.score}%`}}/>
                      </div>
                    </div>
                    <span style={{fontSize:22,fontWeight:800,color:p.score>=90?"#34d399":p.score>=75?"#fbbf24":"#f87171"}}>{p.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
