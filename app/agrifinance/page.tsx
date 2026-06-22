"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Portail Gade Gui</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const projets = [
  {id:1,titre:"Extension Serre Horticole — Phase 2",cat:"Infrastructure",objectif:45000000,collecte:32150000,investisseurs:48,duree:"18 mois",taux:"8.5%/an",risque:"Faible",esg:["SDG 2","SDG 8","SDG 13"],color:"#059669"},
  {id:2,titre:"Nouvelle unité de transformation Café Touba",cat:"Transformation",objectif:28000000,collecte:28000000,investisseurs:72,duree:"12 mois",taux:"9.2%/an",risque:"Très faible",esg:["SDG 1","SDG 2","SDG 9"],color:"#d97706"},
  {id:3,titre:"Acquisition 3 camions réfrigérés",cat:"Logistique",objectif:75000000,collecte:41200000,investisseurs:31,duree:"24 mois",taux:"7.8%/an",risque:"Faible",esg:["SDG 8","SDG 9","SDG 11"],color:"#0891b2"},
  {id:4,titre:"Programme AgroSchool — 5 000 agriculteurs",cat:"Formation",objectif:12000000,collecte:4800000,investisseurs:89,duree:"24 mois",taux:"6.5%/an",risque:"Très faible",esg:["SDG 1","SDG 2","SDG 4","SDG 10"],color:"#7c3aed"},
]

const esgMetrics = [
  {sdg:"ODD 2",label:"Faim Zéro",value:"8 400 personnes nourries/an",icon:"🌾",color:"#d97706"},
  {sdg:"ODD 8",label:"Travail décent",value:"210 emplois directs & indirects",icon:"💼",color:"#0891b2"},
  {sdg:"ODD 13",label:"Action climatique",value:"-38% émissions CO₂ vs baseline",icon:"🌍",color:"#059669"},
  {sdg:"ODD 9",label:"Industrie & Innovation",value:"10 applications numériques déployées",icon:"⚙️",color:"#7c3aed"},
  {sdg:"ODD 5",label:"Égalité des sexes",value:"54% femmes dans les coopératives",icon:"♀️",color:"#ec4899"},
  {sdg:"ODD 1",label:"Fin de la pauvreté",value:"+42% revenus familles partenaires",icon:"🤝",color:"#f59e0b"},
]

export default function AgriFinance() {
  const [tab, setTab] = useState<"projets"|"esg"|"proparco">("projets")
  const [invest, setInvest] = useState<Record<number,string>>({})

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .4s ease both}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#03151a,#062730 50%,#020d07)",borderBottom:"1px solid rgba(14,116,144,.2)",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#67e8f9",marginBottom:4}}>APPLICATION 4.2</div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>💰 AgriFinance</h1>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:13}}>Crowdfunding Agricole & ESG Dashboard — Investisseurs · Proparco · ODD</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[["160 M F","Financements levés"],["240","Investisseurs"],["6 ODD","Impactés"]].map(([v,l])=>(
              <div key={l} style={{background:"rgba(14,116,144,.1)",border:"1px solid rgba(14,116,144,.25)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:14,fontWeight:800,color:"#22d3ee"}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badge Proparco */}
      <div style={{background:"rgba(14,116,144,.08)",borderBottom:"1px solid rgba(14,116,144,.15)",padding:"10px 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:20}}>🏦</span>
          <span style={{fontSize:13,color:"rgba(255,255,255,.6)"}}>Soutenu par <strong style={{color:"#22d3ee"}}>Proparco</strong> (Groupe AFD) — Investissement en capital & dette mezzanine · Partenaire depuis 2022</span>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem 2rem 3rem"}}>
        <div style={{display:"flex",gap:4,marginBottom:20,background:"rgba(255,255,255,.04)",borderRadius:12,padding:4,width:"fit-content"}}>
          {(["projets","esg","proparco"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,background:tab===t?"rgba(14,116,144,.25)":"transparent",color:tab===t?"#22d3ee":"rgba(255,255,255,.45)",transition:"all .2s"}}>
              {t==="projets"?"💼 Projets":t==="esg"?"🌍 ESG / ODD":"🏦 Proparco"}
            </button>
          ))}
        </div>

        {tab==="projets" && (
          <div className="fade" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
            {projets.map(p=>{
              const pct = Math.round((p.collecte/p.objectif)*100)
              return (
                <div key={p.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"20px",borderTop:`3px solid ${p.color}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <span style={{fontSize:10,fontWeight:700,color:p.color,background:`${p.color}20`,padding:"2px 8px",borderRadius:8}}>{p.cat}</span>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{p.duree}</span>
                  </div>
                  <div style={{fontWeight:700,fontSize:14,lineHeight:1.3,marginBottom:10}}>{p.titre}</div>

                  <div style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>{p.collecte.toLocaleString()} F</span>
                      <span style={{fontSize:12,fontWeight:800,color:p.color}}>{pct}%</span>
                    </div>
                    <div style={{height:6,background:"rgba(255,255,255,.08)",borderRadius:3}}>
                      <div style={{height:6,background:p.color,borderRadius:3,width:`${Math.min(100,pct)}%`}}/>
                    </div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:4}}>
                      Objectif : {p.objectif.toLocaleString()} F · {p.investisseurs} investisseurs
                    </div>
                  </div>

                  <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap"}}>
                    <span style={{fontSize:11,color:"#22d3ee",background:"rgba(34,211,238,.1)",padding:"3px 8px",borderRadius:6}}>💰 {p.taux}</span>
                    <span style={{fontSize:11,color:"#34d399",background:"rgba(52,211,153,.1)",padding:"3px 8px",borderRadius:6}}>✅ {p.risque}</span>
                  </div>

                  <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
                    {p.esg.map(sdg=>(
                      <span key={sdg} style={{fontSize:10,color:"#a78bfa",background:"rgba(167,139,250,.1)",padding:"2px 6px",borderRadius:6}}>{sdg}</span>
                    ))}
                  </div>

                  {pct<100 ? (
                    <div style={{display:"flex",gap:8}}>
                      <input value={invest[p.id]||""} onChange={e=>setInvest(v=>({...v,[p.id]:e.target.value}))} placeholder="Montant (F CFA)"
                        style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(14,116,144,.3)",borderRadius:8,padding:"8px 10px",color:"white",fontSize:12,outline:"none"}}/>
                      <button onClick={()=>setInvest(v=>({...v,[p.id]:""}))} style={{background:`linear-gradient(135deg,${p.color},${p.color}aa)`,border:"none",borderRadius:8,padding:"8px 14px",color:"white",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                        Investir
                      </button>
                    </div>
                  ) : (
                    <div style={{background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.25)",borderRadius:8,padding:"10px",textAlign:"center",color:"#34d399",fontWeight:700,fontSize:13}}>
                      ✅ Financement bouclé
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {tab==="esg" && (
          <div className="fade">
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px",marginBottom:20}}>
              <h3 style={{fontWeight:700,marginBottom:4,color:"#22d3ee"}}>🌍 Rapport d&apos;Impact ESG — Juin 2025</h3>
              <p style={{fontSize:13,color:"rgba(255,255,255,.4)",marginBottom:4}}>Gade Gui Agro Industrial Park · Mesure des Objectifs de Développement Durable (ODD/SDG)</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
              {esgMetrics.map(m=>(
                <div key={m.sdg} style={{background:"rgba(5,30,15,.8)",border:`1px solid ${m.color}25`,borderRadius:14,padding:"20px",borderLeft:`4px solid ${m.color}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                    <span style={{fontSize:28}}>{m.icon}</span>
                    <div>
                      <span style={{fontSize:10,fontWeight:700,color:m.color,background:`${m.color}20`,padding:"2px 6px",borderRadius:6}}>{m.sdg}</span>
                      <div style={{fontWeight:700,fontSize:13,marginTop:2}}>{m.label}</div>
                    </div>
                  </div>
                  <div style={{fontSize:15,fontWeight:800,color:m.color,lineHeight:1.3}}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="proparco" && (
          <div className="fade">
            <div style={{background:"linear-gradient(135deg,rgba(14,116,144,.15),rgba(8,145,178,.08))",border:"1px solid rgba(14,116,144,.3)",borderRadius:16,padding:"24px",marginBottom:20}}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
                <span style={{fontSize:36}}>🏦</span>
                <div>
                  <h2 style={{fontSize:20,fontWeight:800,marginBottom:4,color:"#22d3ee"}}>Proparco — Groupe AFD</h2>
                  <p style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>Partenaire financier stratégique depuis 2022</p>
                </div>
              </div>
              <p style={{fontSize:14,color:"rgba(255,255,255,.7)",lineHeight:1.7,marginBottom:16}}>
                Proparco, filiale de l&apos;Agence Française de Développement dédiée au secteur privé, a identifié Gade Gui comme acteur-clé de l&apos;agro-industrie durable en Afrique de l&apos;Ouest. L&apos;investissement couvre une ligne de crédit et une prise de participation minoritaire.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
                {[
                  {label:"Type d'investissement",value:"Dette + Capital"},
                  {label:"Montant initial",value:"150 M F CFA"},
                  {label:"Durée",value:"10 ans"},
                  {label:"Critères ESG",value:"Validés"},
                ].map(k=>(
                  <div key={k.label} style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"14px",textAlign:"center"}}>
                    <div style={{fontSize:16,fontWeight:800,color:"#22d3ee",marginBottom:4}}>{k.value}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{k.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px"}}>
              <h3 style={{fontWeight:700,marginBottom:14,color:"#22d3ee"}}>📊 KPIs Rapportés à Proparco — T2 2025</h3>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {[
                  {label:"Chiffre d'affaires",value:"482 M F CFA",vs:"+18% vs T2 2024",color:"#34d399"},
                  {label:"Emplois créés",value:"23 nouveaux postes",vs:"+9 vs objectif",color:"#34d399"},
                  {label:"Réduction déchets",value:"-41%",vs:"Objectif -30% atteint",color:"#34d399"},
                  {label:"Bénéficiaires formation",value:"1 570 agriculteurs",vs:"+24% vs objectif T2",color:"#34d399"},
                ].map(k=>(
                  <div key={k.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"rgba(255,255,255,.03)",borderRadius:10}}>
                    <span style={{fontSize:13,color:"rgba(255,255,255,.7)"}}>{k.label}</span>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:15,fontWeight:800,color:k.color}}>{k.value}</div>
                      <div style={{fontSize:11,color:"rgba(52,211,153,.6)"}}>{k.vs}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
