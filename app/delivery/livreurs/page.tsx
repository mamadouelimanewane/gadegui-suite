"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/delivery" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Gade Gui Express</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

type Statut = "En ligne"|"Hors ligne"|"En livraison"|"En attente"

const LIVREURS: {id:string;nom:string;phone:string;zone:string;vehicule:string;statut:Statut;note:number;courses:number;gains:number;lat:number;lng:number}[] = [
  {id:"LIV-001",nom:"Moussa Diallo",   phone:"+221 77 412 33 10",zone:"Almadies",   vehicule:"Moto",   statut:"En livraison",note:4.8,courses:312,gains:284000,lat:14.74,lng:-17.51},
  {id:"LIV-002",nom:"Ibou Sarr",       phone:"+221 78 234 51 20",zone:"Plateau",    vehicule:"Vélo",   statut:"En ligne",     note:4.6,courses:198,gains:167000,lat:14.69,lng:-17.44},
  {id:"LIV-003",nom:"Cheikh Mbaye",    phone:"+221 76 890 12 34",zone:"Parcelles",  vehicule:"Moto",   statut:"En livraison", note:4.9,courses:445,gains:392000,lat:14.72,lng:-17.47},
  {id:"LIV-004",nom:"Fatou Ba",        phone:"+221 77 345 67 89",zone:"Rufisque",   vehicule:"Scooter",statut:"Hors ligne",   note:4.3,courses:87, gains:72000, lat:14.71,lng:-17.27},
  {id:"LIV-005",nom:"Amadou Ndiaye",   phone:"+221 78 567 23 45",zone:"Almadies",   vehicule:"Moto",   statut:"En ligne",     note:4.7,courses:267,gains:231000,lat:14.75,lng:-17.52},
  {id:"LIV-006",nom:"Seydou Diop",     phone:"+221 76 123 45 67",zone:"Yoff",       vehicule:"Moto",   statut:"En attente",  note:4.5,courses:134,gains:115000,lat:14.76,lng:-17.49},
  {id:"LIV-007",nom:"Aissatou Fall",   phone:"+221 77 678 90 12",zone:"Plateau",    vehicule:"Vélo",   statut:"En ligne",     note:4.4,courses:56, gains:47000, lat:14.70,lng:-17.43},
  {id:"LIV-008",nom:"Omar Gueye",      phone:"+221 78 901 23 45",zone:"Parcelles",  vehicule:"Scooter",statut:"En livraison", note:4.9,courses:389,gains:341000,lat:14.73,lng:-17.46},
]

const SC: Record<Statut,{color:string;bg:string;dot:string}> = {
  "En livraison":{color:"#34d399",bg:"rgba(52,211,153,.12)",dot:"#34d399"},
  "En ligne":    {color:"#60a5fa",bg:"rgba(96,165,250,.12)", dot:"#60a5fa"},
  "En attente":  {color:"#fbbf24",bg:"rgba(251,191,36,.12)", dot:"#fbbf24"},
  "Hors ligne":  {color:"#6b7280",bg:"rgba(107,114,128,.1)", dot:"#6b7280"},
}

export default function Livreurs() {
  const [search, setSearch] = useState("")
  const [filtreSt, setFiltreSt] = useState<string>("Tous")
  const [filtreVeh, setFiltreVeh] = useState<string>("Tous")
  const [sel, setSel] = useState<string|null>(null)

  const statuts: string[] = ["Tous","En livraison","En ligne","En attente","Hors ligne"]
  const vehicules: string[] = ["Tous","Moto","Vélo","Scooter"]

  const liste = LIVREURS.filter(l=>{
    if(filtreSt!=="Tous" && l.statut!==filtreSt) return false
    if(filtreVeh!=="Tous" && l.vehicule!==filtreVeh) return false
    if(search && !l.nom.toLowerCase().includes(search.toLowerCase()) && !l.zone.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const detail = sel ? LIVREURS.find(l=>l.id===sel) : null

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .35s ease both} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}} .pulse{animation:pulse 2s infinite} input::placeholder{color:rgba(255,255,255,.25)}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#071d2e,#082f49 50%,#020d07)",borderBottom:"1px solid rgba(8,145,178,.2)",padding:"1.2rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#7dd3fc",marginBottom:3}}>LIVRAISON · MODULE 1</div>
            <h1 style={{fontSize:22,fontWeight:800}}>🛵 Gestion des Livreurs</h1>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[
              {v:LIVREURS.filter(l=>l.statut==="En livraison").length,l:"En livraison",c:"#34d399"},
              {v:LIVREURS.filter(l=>l.statut==="En ligne").length,     l:"En ligne",    c:"#60a5fa"},
              {v:LIVREURS.length,                                        l:"Total",       c:"#fbbf24"},
            ].map(k=>(
              <div key={k.l} style={{background:"rgba(8,145,178,.1)",border:"1px solid rgba(8,145,178,.2)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:800,color:k.c}}>{k.v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.2rem 2rem 3rem",display:"grid",gridTemplateColumns:detail?"1fr 340px":"1fr",gap:20}}>
        <div>
          {/* Filtres */}
          <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Rechercher livreur ou zone..."
              style={{flex:1,minWidth:200,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"8px 12px",color:"white",fontSize:13,outline:"none"}}/>
            <select value={filtreSt} onChange={e=>setFiltreSt(e.target.value)}
              style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"8px 12px",color:"white",fontSize:12,cursor:"pointer"}}>
              {statuts.map(s=><option key={s} value={s} style={{background:"#020d07"}}>{s}</option>)}
            </select>
            <select value={filtreVeh} onChange={e=>setFiltreVeh(e.target.value)}
              style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"8px 12px",color:"white",fontSize:12,cursor:"pointer"}}>
              {vehicules.map(v=><option key={v} value={v} style={{background:"#020d07"}}>{v}</option>)}
            </select>
          </div>

          {/* Table */}
          <div style={{background:"rgba(5,30,15,.7)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,overflow:"hidden"}} className="fade">
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                  {["Livreur","Zone","Véhicule","Statut","Note","Courses","Gains total","Actions"].map(h=>(
                    <th key={h} style={{padding:"12px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.35)",letterSpacing:".08em"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {liste.map((l,i)=>{
                  const s = SC[l.statut]
                  return (
                    <tr key={l.id} style={{borderBottom:"1px solid rgba(255,255,255,.04)",background:sel===l.id?"rgba(8,145,178,.08)":"transparent",transition:"background .15s"}}>
                      <td style={{padding:"12px 14px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(8,145,178,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#38bdf8",flexShrink:0}}>
                            {l.nom.split(" ").map(n=>n[0]).join("")}
                          </div>
                          <div>
                            <div style={{fontWeight:600,fontSize:13}}>{l.nom}</div>
                            <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{l.id} · {l.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{padding:"12px 14px",fontSize:12,color:"rgba(255,255,255,.6)"}}>{l.zone}</td>
                      <td style={{padding:"12px 14px",fontSize:12,color:"rgba(255,255,255,.6)"}}>{l.vehicule}</td>
                      <td style={{padding:"12px 14px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <span className={l.statut!=="Hors ligne"?"pulse":""} style={{width:7,height:7,borderRadius:"50%",background:s.dot,display:"inline-block",flexShrink:0}}/>
                          <span style={{fontSize:11,color:s.color,background:s.bg,padding:"2px 8px",borderRadius:6,fontWeight:600}}>{l.statut}</span>
                        </div>
                      </td>
                      <td style={{padding:"12px 14px",fontSize:13,fontWeight:700,color:"#fbbf24"}}>⭐ {l.note}</td>
                      <td style={{padding:"12px 14px",fontSize:13,color:"rgba(255,255,255,.7)"}}>{l.courses}</td>
                      <td style={{padding:"12px 14px",fontSize:13,fontWeight:700,color:"#34d399"}}>{l.gains.toLocaleString()} F</td>
                      <td style={{padding:"12px 14px"}}>
                        <button onClick={()=>setSel(sel===l.id?null:l.id)}
                          style={{background:"rgba(8,145,178,.15)",border:"1px solid rgba(8,145,178,.3)",borderRadius:7,padding:"5px 12px",color:"#38bdf8",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                          Détail
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {liste.length===0 && <div style={{padding:"32px",textAlign:"center",color:"rgba(255,255,255,.25)",fontSize:13}}>Aucun livreur trouvé</div>}
          </div>
          <div style={{marginTop:10,fontSize:12,color:"rgba(255,255,255,.25)"}}>{liste.length} livreur(s) affiché(s)</div>
        </div>

        {/* Panneau détail */}
        {detail && (
          <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(8,145,178,.25)",borderRadius:16,padding:"20px",height:"fit-content"}} className="fade">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <h3 style={{fontWeight:700,color:"#38bdf8",fontSize:14}}>Fiche Livreur</h3>
              <button onClick={()=>setSel(null)} style={{background:"transparent",border:"none",color:"rgba(255,255,255,.3)",cursor:"pointer",fontSize:18,lineHeight:1}}>×</button>
            </div>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(8,145,178,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:800,color:"#38bdf8",margin:"0 auto 8px"}}>
                {detail.nom.split(" ").map(n=>n[0]).join("")}
              </div>
              <div style={{fontWeight:800,fontSize:16}}>{detail.nom}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{detail.id} · {detail.zone}</div>
              <div style={{marginTop:6}}><span style={{fontSize:11,color:SC[detail.statut].color,background:SC[detail.statut].bg,padding:"3px 10px",borderRadius:8,fontWeight:700}}>{detail.statut}</span></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              {[
                {l:"Note",v:`⭐ ${detail.note}`,c:"#fbbf24"},
                {l:"Véhicule",v:detail.vehicule,c:"#38bdf8"},
                {l:"Courses",v:detail.courses,c:"#34d399"},
                {l:"Gains",v:`${detail.gains.toLocaleString()} F`,c:"#34d399"},
              ].map(k=>(
                <div key={k.l} style={{background:"rgba(255,255,255,.04)",borderRadius:8,padding:"10px",textAlign:"center"}}>
                  <div style={{fontSize:15,fontWeight:800,color:k.c}}>{k.v}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{k.l}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:14,padding:"10px",background:"rgba(255,255,255,.03)",borderRadius:8}}>
              📞 {detail.phone}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <button style={{background:"linear-gradient(135deg,#0891b2,#0e7490)",border:"none",borderRadius:8,padding:"9px",color:"white",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                📋 Assigner une commande
              </button>
              <button style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:8,padding:"9px",color:"#f87171",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                🚫 Suspendre temporairement
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
