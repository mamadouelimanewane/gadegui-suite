"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Portail Gade Gui</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const employes = [
  {id:1,nom:"Mamadou Diallo",role:"Chef aviculteur",dept:"Aviculture",formations:5,score:94,certifs:["HACCP","Biosécurité Avancée","SmartFarm Niveau 2"],progression:92},
  {id:2,nom:"Fatou Ndiaye",role:"Vétérinaire",dept:"Santé animale",formations:8,score:98,certifs:["BioSecure Expert","HACCP","ISO 22000"],progression:100},
  {id:3,nom:"Ibrahima Sow",role:"Horticulteur",dept:"Horticulture",formations:4,score:87,certifs:["NDVI & Irrigation","Maraîchage bio"],progression:78},
  {id:4,nom:"Cheikh Mbaye",role:"Responsable abattoir",dept:"Transformation",formations:6,score:91,certifs:["Halal Certifié","HACCP","Hygiène alimentaire"],progression:88},
  {id:5,nom:"Aminata Kane",role:"Responsable qualité",dept:"Qualité",formations:7,score:96,certifs:["ISO 22000","HACCP Expert","Traçabilité QR"],progression:95},
]

const formations_internes = [
  {titre:"Maîtriser SmartFarm — Niveau 1",dept:"Tous",duree:"2h",obligatoire:true,completes:32,total:38},
  {titre:"Protocoles BioSecure — Mise à jour 2025",dept:"Aviculture",duree:"1h30",obligatoire:true,completes:18,total:22},
  {titre:"Utilisation AgroSat & lecture NDVI",dept:"Horticulture",duree:"3h",obligatoire:false,completes:8,total:15},
  {titre:"Gestion du Marché B2B — Formation commerciale",dept:"Commercial",duree:"2h30",obligatoire:false,completes:4,total:8},
  {titre:"Sécurité & Hygiène en entrepôt réfrigéré",dept:"Logistique",duree:"1h",obligatoire:true,completes:6,total:7},
]

export default function Academy() {
  const [tab, setTab] = useState<"salaries"|"formations"|"certifs">("salaries")
  const [sel, setSel] = useState<number|null>(null)
  const emp = sel!==null ? employes.find(e=>e.id===sel) : null

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .4s ease both}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#12073a,#1e0e5e 50%,#020d07)",borderBottom:"1px solid rgba(109,40,217,.2)",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#c4b5fd",marginBottom:4}}>APPLICATION 3.2</div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>🏫 GadeGui Academy</h1>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:13}}>Formation Continue Interne — Certifications · Suivi progression · Tableau de bord RH</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[["38","Employés","#a78bfa"],["5","Formations actives","#34d399"],["94%","Score moyen","#fbbf24"]].map(([v,l,c])=>(
              <div key={l} style={{background:"rgba(109,40,217,.1)",border:"1px solid rgba(109,40,217,.25)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:800,color:c}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem 2rem 3rem"}}>
        <div style={{display:"flex",gap:4,marginBottom:20,background:"rgba(255,255,255,.04)",borderRadius:12,padding:4,width:"fit-content"}}>
          {(["salaries","formations","certifs"] as const).map(t=>(
            <button key={t} onClick={()=>{setTab(t);setSel(null)}} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,background:tab===t?"rgba(109,40,217,.25)":"transparent",color:tab===t?"#a78bfa":"rgba(255,255,255,.45)",transition:"all .2s"}}>
              {t==="salaries"?"👥 Employés":t==="formations"?"📚 Formations":"🏆 Certifications"}
            </button>
          ))}
        </div>

        {tab==="salaries" && (
          <div className="fade" style={{display:"grid",gridTemplateColumns:sel!==null?"1fr 360px":"1fr",gap:20}}>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {employes.map(e=>(
                <button key={e.id} onClick={()=>setSel(sel===e.id?null:e.id)} style={{background:sel===e.id?"rgba(109,40,217,.15)":"rgba(5,30,15,.8)",border:`1px solid ${sel===e.id?"rgba(109,40,217,.4)":"rgba(5,150,80,.12)"}`,borderRadius:12,padding:"16px 20px",cursor:"pointer",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,textAlign:"left",transition:"all .2s"}}>
                  <div style={{display:"flex",gap:12,alignItems:"center"}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:"rgba(109,40,217,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:"#a78bfa",flexShrink:0}}>
                      {e.nom.split(" ").map(n=>n[0]).join("")}
                    </div>
                    <div>
                      <div style={{fontWeight:700,fontSize:14}}>{e.nom}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{e.role} · {e.dept}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:16,alignItems:"center"}}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:20,fontWeight:800,color:"#a78bfa"}}>{e.score}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>Score</div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:20,fontWeight:800,color:"#34d399"}}>{e.certifs.length}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>Certifs</div>
                    </div>
                    <div>
                      <div style={{height:4,background:"rgba(255,255,255,.08)",borderRadius:2,width:80}}>
                        <div style={{height:4,background:"#6d28d9",borderRadius:2,width:`${e.progression}%`}}/>
                      </div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.35)",marginTop:2}}>{e.progression}%</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {emp && (
              <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(109,40,217,.25)",borderRadius:16,padding:"20px",height:"fit-content"}}>
                <div style={{textAlign:"center",marginBottom:16}}>
                  <div style={{width:60,height:60,borderRadius:"50%",background:"rgba(109,40,217,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:800,color:"#a78bfa",margin:"0 auto 8px"}}>
                    {emp.nom.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div style={{fontWeight:800,fontSize:16}}>{emp.nom}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{emp.role} · {emp.dept}</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                  {[["Score",`${emp.score}/100`,"#fbbf24"],["Formations",emp.formations,"#34d399"],["Certifications",emp.certifs.length,"#a78bfa"],["Progression",`${emp.progression}%`,"#60a5fa"]].map(([l,v,c])=>(
                    <div key={l as string} style={{background:"rgba(255,255,255,.04)",borderRadius:8,padding:"10px",textAlign:"center"}}>
                      <div style={{fontSize:18,fontWeight:800,color:c as string}}>{v}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{l}</div>
                    </div>
                  ))}
                </div>
                <h4 style={{fontWeight:700,marginBottom:10,color:"#a78bfa",fontSize:13}}>Certifications obtenues</h4>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {emp.certifs.map(c=>(
                    <div key={c} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"rgba(109,40,217,.1)",borderRadius:8}}>
                      <span style={{color:"#34d399",fontSize:14}}>✅</span>
                      <span style={{fontSize:12,color:"rgba(255,255,255,.8)"}}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab==="formations" && (
          <div className="fade" style={{display:"flex",flexDirection:"column",gap:12}}>
            {formations_internes.map((f,i)=>(
              <div key={i} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:12,padding:"18px 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:10}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:14}}>{f.titre}</span>
                      {f.obligatoire && <span style={{fontSize:10,fontWeight:700,color:"#f87171",background:"rgba(248,113,113,.12)",padding:"2px 6px",borderRadius:6}}>Obligatoire</span>}
                    </div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,.45)"}}>Dept: {f.dept} · Durée: {f.duree}</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:20,fontWeight:800,color:"#a78bfa"}}>{f.completes}/{f.total}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>Complétés</div>
                  </div>
                </div>
                <div style={{height:6,background:"rgba(255,255,255,.08)",borderRadius:3}}>
                  <div style={{height:6,background:`linear-gradient(90deg,#6d28d9,#a78bfa)`,borderRadius:3,width:`${(f.completes/f.total)*100}%`}}/>
                </div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:4}}>{Math.round((f.completes/f.total)*100)}% de l&apos;équipe a complété cette formation</div>
              </div>
            ))}
          </div>
        )}

        {tab==="certifs" && (
          <div className="fade" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14}}>
            {[
              {nom:"HACCP Niveau 1",nb:32,color:"#059669",icon:"🛡️"},
              {nom:"Biosécurité Avancée",nb:18,color:"#dc2626",icon:"🔬"},
              {nom:"SmartFarm Opérateur",nb:24,color:"#0891b2",icon:"📡"},
              {nom:"Halal Certifié",nb:8,color:"#d97706",icon:"☪️"},
              {nom:"ISO 22000",nb:5,color:"#7c3aed",icon:"📋"},
              {nom:"Traçabilité QR Code",nb:12,color:"#92400e",icon:"🔍"},
            ].map(c=>(
              <div key={c.nom} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"20px",textAlign:"center",borderTop:`3px solid ${c.color}`}}>
                <div style={{fontSize:36,marginBottom:10}}>{c.icon}</div>
                <div style={{fontSize:24,fontWeight:800,color:c.color,marginBottom:4}}>{c.nb}</div>
                <div style={{fontWeight:700,fontSize:14,marginBottom:2}}>{c.nom}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>employés certifiés</div>
                <button style={{marginTop:12,width:"100%",background:`${c.color}20`,border:`1px solid ${c.color}40`,borderRadius:8,padding:"7px",color:c.color,fontSize:12,fontWeight:600,cursor:"pointer"}}>
                  Voir les titulaires
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
