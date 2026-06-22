"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.96)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Accueil</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const CLIENTS = [
  {id:"C001",nom:"Hôtel Terrou-Bi",     type:"B2B",  seg:"VIP",     points:4200,achats:12,ca:1850000,  tel:"+221 33 859 21 00",ville:"Plateau",   last:"22/06",note:5},
  {id:"C002",nom:"Restaurant Le Lagon", type:"B2B",  seg:"Régulier",points:2800,achats:8, ca:640000,   tel:"+221 33 820 15 00",ville:"Almadies",  last:"21/06",note:4},
  {id:"C003",nom:"Aminata Sow",         type:"B2C",  seg:"Fidèle",  points:850, achats:14,ca:218000,   tel:"+221 77 512 34 10",ville:"Fann",      last:"22/06",note:5},
  {id:"C004",nom:"Ousmane Faye",        type:"B2C",  seg:"Nouveau", points:120, achats:2, ca:25000,    tel:"+221 76 234 56 78",ville:"Médina",    last:"18/06",note:4},
  {id:"C005",nom:"Supermarché Casino",  type:"B2B",  seg:"VIP",     points:6100,achats:24,ca:3200000,  tel:"+221 33 860 44 00",ville:"Almadies",  last:"20/06",note:4},
  {id:"C006",nom:"Lycée C.A. Diop",     type:"B2B",  seg:"Régulier",points:1400,achats:5, ca:280000,   tel:"+221 33 824 00 00",ville:"Parcelles", last:"15/06",note:3},
  {id:"C007",nom:"Mariam Fall",         type:"B2C",  seg:"Fidèle",  points:560, achats:9, ca:112000,   tel:"+221 77 889 12 34",ville:"Yoff",      last:"22/06",note:5},
  {id:"C008",nom:"Ndèye Diallo",        type:"B2C",  seg:"Dormant", points:90,  achats:1, ca:8000,     tel:"+221 78 456 78 90",ville:"Pikine",    last:"02/05",note:0},
]

const RECLAMATIONS = [
  {id:"REC-028",client:"Aminata Sow",   sujet:"Poulet livré en retard",  statut:"Résolu",  date:"21/06"},
  {id:"REC-027",client:"Hôtel Terrou-Bi",sujet:"Commande incomplète",    statut:"En cours",date:"22/06"},
  {id:"REC-026",client:"Ousmane Faye",  sujet:"Mauvaise qualité tomates",statut:"En cours",date:"20/06"},
  {id:"REC-025",client:"Mariam Fall",   sujet:"Remboursement Wave",      statut:"Résolu",  date:"18/06"},
]

const SEG_COLOR: Record<string,string> = {VIP:"#fbbf24",Régulier:"#34d399",Fidèle:"#60a5fa",Nouveau:"#a78bfa",Dormant:"#6b7280"}

export default function CRM() {
  const [tab, setTab] = useState<"clients"|"reclamations"|"fidelite">("clients")
  const [q, setQ] = useState("")
  const [seg, setSeg] = useState("Tous")
  const [type, setType] = useState("Tous")
  const [selClient, setSelClient] = useState<typeof CLIENTS[0]|null>(null)

  const liste = CLIENTS.filter(c=>
    (seg==="Tous"||c.seg===seg)&&
    (type==="Tous"||c.type===type)&&
    (q===""||c.nom.toLowerCase().includes(q.toLowerCase())||c.ville.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .3s ease both} input::placeholder{color:rgba(255,255,255,.25)}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#0a0a22,#1a0a2e 50%,#020d07)",borderBottom:"1px solid rgba(139,92,246,.2)",padding:"1.2rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#c4b5fd",marginBottom:3}}>RELATION CLIENT</div>
            <h1 style={{fontSize:22,fontWeight:800}}>💜 GadeGui CRM</h1>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:12}}>Fidélité · Réclamations · Segmentation B2B/B2C</p>
          </div>
          <div style={{display:"flex",gap:8}}>
            {[{v:CLIENTS.length,l:"Clients",c:"#a78bfa"},{v:CLIENTS.filter(c=>c.seg==="VIP").length,l:"VIP",c:"#fbbf24"},{v:RECLAMATIONS.filter(r=>r.statut==="En cours").length,l:"Réclamations",c:"#ef4444"}].map(k=>(
              <div key={k.l} style={{background:"rgba(139,92,246,.08)",border:"1px solid rgba(139,92,246,.15)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:15,fontWeight:800,color:k.c}}>{k.v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem 2rem 4rem"}}>
        {/* Tabs */}
        <div style={{display:"flex",gap:4,marginBottom:16,background:"rgba(255,255,255,.04)",borderRadius:10,padding:4,width:"fit-content"}}>
          {(["clients","reclamations","fidelite"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"7px 16px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:tab===t?"rgba(139,92,246,.2)":"transparent",color:tab===t?"#c4b5fd":"rgba(255,255,255,.4)"}}>
              {t==="clients"?"👥 Clients":t==="reclamations"?"⚠️ Réclamations":"⭐ Fidélité"}
            </button>
          ))}
        </div>

        {tab==="clients" && (
          <div className="fade" style={{display:"grid",gridTemplateColumns:selClient?"1fr 340px":"1fr",gap:16}}>
            <div>
              {/* Filtres */}
              <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍 Rechercher un client..." style={{flex:1,minWidth:200,background:"rgba(255,255,255,.05)",border:"1px solid rgba(139,92,246,.2)",borderRadius:8,padding:"9px 14px",color:"white",fontSize:13,outline:"none"}}/>
                <div style={{display:"flex",gap:6}}>
                  {["Tous","B2B","B2C"].map(t=>(
                    <button key={t} onClick={()=>setType(t)} style={{padding:"7px 14px",borderRadius:8,border:`1px solid ${type===t?"rgba(139,92,246,.5)":"rgba(255,255,255,.08)"}`,background:type===t?"rgba(139,92,246,.15)":"transparent",color:type===t?"#c4b5fd":"rgba(255,255,255,.4)",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t}</button>
                  ))}
                </div>
                <div style={{display:"flex",gap:6}}>
                  {["Tous","VIP","Fidèle","Régulier","Nouveau","Dormant"].map(s=>(
                    <button key={s} onClick={()=>setSeg(s)} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${seg===s?"rgba(251,191,36,.4)":"rgba(255,255,255,.06)"}`,background:seg===s?"rgba(251,191,36,.1)":"transparent",color:seg===s?SEG_COLOR[s]??"#fbbf24":"rgba(255,255,255,.35)",fontSize:11,fontWeight:600,cursor:"pointer"}}>{s}</button>
                  ))}
                </div>
              </div>

              <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,overflow:"hidden"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead>
                    <tr style={{borderBottom:"1px solid rgba(5,150,80,.1)"}}>
                      {["Client","Type","Segment","Dernière commande","CA Total","Points","Note"].map(h=>(
                        <th key={h} style={{padding:"11px 14px",textAlign:"left",fontSize:11,color:"rgba(255,255,255,.35)",fontWeight:600}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {liste.map((c,i)=>(
                      <tr key={c.id} onClick={()=>setSelClient(selClient?.id===c.id?null:c)} style={{borderBottom:"1px solid rgba(255,255,255,.04)",background:selClient?.id===c.id?"rgba(139,92,246,.1)":i%2===0?"transparent":"rgba(255,255,255,.01)",cursor:"pointer"}}>
                        <td style={{padding:"11px 14px"}}>
                          <div style={{fontWeight:600,fontSize:13}}>{c.nom}</div>
                          <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{c.ville}</div>
                        </td>
                        <td style={{padding:"11px 14px"}}><span style={{fontSize:11,fontWeight:700,color:c.type==="B2B"?"#60a5fa":"#34d399",background:c.type==="B2B"?"rgba(96,165,250,.1)":"rgba(52,211,153,.1)",padding:"2px 8px",borderRadius:5}}>{c.type}</span></td>
                        <td style={{padding:"11px 14px"}}><span style={{fontSize:11,fontWeight:700,color:SEG_COLOR[c.seg],background:`${SEG_COLOR[c.seg]}18`,padding:"2px 8px",borderRadius:5}}>{c.seg}</span></td>
                        <td style={{padding:"11px 14px",fontSize:12,color:"rgba(255,255,255,.45)"}}>{c.last}/2025</td>
                        <td style={{padding:"11px 14px",fontWeight:700,fontSize:13,color:"#fbbf24"}}>{c.ca.toLocaleString()} F</td>
                        <td style={{padding:"11px 14px",fontSize:13,color:"#a78bfa",fontWeight:700}}>★ {c.points}</td>
                        <td style={{padding:"11px 14px",fontSize:13}}>{c.note>0?"⭐".repeat(Math.min(c.note,5)):"-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {selClient && (
              <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(139,92,246,.25)",borderRadius:14,padding:"20px",height:"fit-content"}} className="fade">
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
                  <h3 style={{fontWeight:700,fontSize:14,color:"#c4b5fd"}}>{selClient.nom}</h3>
                  <button onClick={()=>setSelClient(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,.3)",cursor:"pointer",fontSize:16}}>✕</button>
                </div>
                {[
                  {l:"ID",v:selClient.id},
                  {l:"Type",v:selClient.type},
                  {l:"Segment",v:selClient.seg},
                  {l:"Ville",v:selClient.ville},
                  {l:"Téléphone",v:selClient.tel},
                  {l:"Commandes totales",v:selClient.achats},
                  {l:"CA Total",v:`${selClient.ca.toLocaleString()} F`},
                  {l:"Points fidélité",v:`★ ${selClient.points}`},
                  {l:"Dernière commande",v:`${selClient.last}/2025`},
                ].map(r=>(
                  <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{r.l}</span>
                    <span style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.8)"}}>{r.v}</span>
                  </div>
                ))}
                <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:8}}>
                  <button style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)",border:"none",borderRadius:8,padding:"9px",color:"white",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                    📱 Envoyer une offre
                  </button>
                  <button style={{background:"rgba(96,165,250,.1)",border:"1px solid rgba(96,165,250,.25)",borderRadius:8,padding:"9px",color:"#93c5fd",fontWeight:600,fontSize:12,cursor:"pointer"}}>
                    📋 Historique complet
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab==="reclamations" && (
          <div className="fade">
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {RECLAMATIONS.map(r=>(
                <div key={r.id} style={{background:"rgba(5,30,15,.8)",border:`1px solid ${r.statut==="En cours"?"rgba(239,68,68,.2)":"rgba(52,211,153,.15)"}`,borderRadius:12,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
                  <div>
                    <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:4}}>
                      <span style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.5)"}}>{r.id}</span>
                      <span style={{fontSize:11,fontWeight:700,color:r.statut==="En cours"?"#f87171":"#34d399",background:r.statut==="En cours"?"rgba(239,68,68,.1)":"rgba(52,211,153,.1)",padding:"2px 8px",borderRadius:5}}>{r.statut}</span>
                    </div>
                    <div style={{fontWeight:700,fontSize:14,marginBottom:2}}>{r.client}</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,.45)"}}>{r.sujet}</div>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.35)"}}>{r.date}/2025</span>
                    {r.statut==="En cours" && (
                      <button style={{background:"linear-gradient(135deg,#059669,#16a34a)",border:"none",borderRadius:8,padding:"7px 14px",color:"white",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                        ✅ Résoudre
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="fidelite" && (
          <div className="fade">
            <div style={{background:"rgba(139,92,246,.08)",border:"1px solid rgba(139,92,246,.2)",borderRadius:14,padding:"20px",marginBottom:16}}>
              <h3 style={{fontWeight:700,fontSize:14,marginBottom:12,color:"#c4b5fd"}}>⭐ Programme de Points Gade Gui</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
                {[{l:"Bronze",min:0,max:499,emoji:"🥉",avantage:"5% de réduction"},{l:"Silver",min:500,max:1999,emoji:"🥈",avantage:"10% + livraison gratuite"},{l:"Gold",min:2000,max:4999,emoji:"🥇",avantage:"15% + priorité livraison"},{l:"VIP",min:5000,max:null,emoji:"💎",avantage:"20% + gestionnaire dédié"}].map(n=>(
                  <div key={n.l} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:"14px",textAlign:"center"}}>
                    <div style={{fontSize:28,marginBottom:6}}>{n.emoji}</div>
                    <div style={{fontWeight:700,fontSize:14,marginBottom:2}}>{n.l}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginBottom:6}}>{n.max?`${n.min}–${n.max} pts`:`${n.min}+ pts`}</div>
                    <div style={{fontSize:12,color:"#c4b5fd",fontWeight:600}}>{n.avantage}</div>
                  </div>
                ))}
              </div>
            </div>
            <h3 style={{fontWeight:700,fontSize:14,marginBottom:10,color:"rgba(255,255,255,.5)"}}>Classement fidélité</h3>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[...CLIENTS].sort((a,b)=>b.points-a.points).slice(0,6).map((c,i)=>(
                <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"rgba(5,30,15,.7)",border:"1px solid rgba(5,150,80,.08)",borderRadius:10}}>
                  <div style={{display:"flex",gap:12,alignItems:"center"}}>
                    <span style={{fontSize:16,fontWeight:800,color:i<3?"#fbbf24":"rgba(255,255,255,.3)",minWidth:24}}>{i+1}</span>
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>{c.nom}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{c.type} · {c.ville}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:14,alignItems:"center"}}>
                    <span style={{fontWeight:800,color:"#a78bfa",fontSize:14}}>★ {c.points}</span>
                    <span style={{fontSize:11,color:SEG_COLOR[c.seg],background:`${SEG_COLOR[c.seg]}18`,padding:"2px 8px",borderRadius:5,fontWeight:700}}>{c.seg}</span>
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
