"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/delivery" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Gade Gui Express</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

type StCash = "En attente"|"Approuvé"|"Payé"|"Rejeté"

const CASHOUTS: {id:string;livreur:string;montant:number;methode:string;statut:StCash;date:string;note?:string}[] = [
  {id:"CO-001",livreur:"Moussa Diallo",  montant:45000, methode:"Wave",          statut:"En attente",date:"22/06/2025"},
  {id:"CO-002",livreur:"Cheikh Mbaye",   montant:80000, methode:"Orange Money",  statut:"En attente",date:"22/06/2025"},
  {id:"CO-003",livreur:"Omar Gueye",     montant:62000, methode:"Wave",          statut:"Approuvé",  date:"21/06/2025"},
  {id:"CO-004",livreur:"Amadou Ndiaye",  montant:35000, methode:"Wave",          statut:"Payé",      date:"20/06/2025",note:"Virement effectué 10h32"},
  {id:"CO-005",livreur:"Ibou Sarr",      montant:22000, methode:"Orange Money",  statut:"Payé",      date:"20/06/2025",note:"Virement effectué 11h15"},
  {id:"CO-006",livreur:"Seydou Diop",    montant:15000, methode:"Wave",          statut:"Rejeté",    date:"19/06/2025",note:"Solde insuffisant — re-demande le 23/06"},
  {id:"CO-007",livreur:"Fatou Ba",       montant:12000, methode:"Orange Money",  statut:"Payé",      date:"18/06/2025"},
  {id:"CO-008",livreur:"Aissatou Fall",  montant:8500,  methode:"Wave",          statut:"En attente",date:"22/06/2025"},
]

const SC: Record<StCash,{color:string;bg:string}> = {
  "En attente":{color:"#fbbf24",bg:"rgba(251,191,36,.12)"},
  "Approuvé":  {color:"#34d399",bg:"rgba(52,211,153,.12)"},
  "Payé":      {color:"#60a5fa",bg:"rgba(96,165,250,.12)"},
  "Rejeté":    {color:"#f87171",bg:"rgba(248,113,113,.12)"},
}

const SOLDES: Record<string,number> = {
  "Moussa Diallo":45000,"Cheikh Mbaye":80000,"Omar Gueye":62000,
  "Amadou Ndiaye":35000,"Ibou Sarr":22000,"Seydou Diop":15000,
  "Fatou Ba":12000,"Aissatou Fall":8500,
}

export default function Cashout() {
  const [tab, setTab] = useState<StCash|"Tous">("Tous")
  const [statuts, setStatuts] = useState<Record<string,StCash>>(Object.fromEntries(CASHOUTS.map(c=>[c.id,c.statut])))

  const total_attente = CASHOUTS.filter(c=>statuts[c.id]==="En attente").reduce((s,c)=>s+c.montant,0)
  const liste = tab==="Tous" ? CASHOUTS : CASHOUTS.filter(c=>statuts[c.id]===tab)

  function approve(id:string){ setStatuts(s=>({...s,[id]:"Approuvé"})) }
  function reject(id:string) { setStatuts(s=>({...s,[id]:"Rejeté"})) }
  function pay(id:string)    { setStatuts(s=>({...s,[id]:"Payé"})) }

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .35s ease both}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#1c0a00,#3a1500 50%,#020d07)",borderBottom:"1px solid rgba(217,119,6,.2)",padding:"1.2rem 2rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#fde68a",marginBottom:3}}>LIVRAISON · MODULE 5</div>
            <h1 style={{fontSize:22,fontWeight:800}}>💳 Cashout & Paiements Livreurs</h1>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[
              {v:CASHOUTS.filter(c=>statuts[c.id]==="En attente").length,l:"En attente",c:"#fbbf24"},
              {v:`${total_attente.toLocaleString()} F`,l:"À payer",c:"#f87171"},
              {v:CASHOUTS.filter(c=>statuts[c.id]==="Payé").length,l:"Payés",c:"#60a5fa"},
            ].map(k=>(
              <div key={k.l} style={{background:"rgba(217,119,6,.1)",border:"1px solid rgba(217,119,6,.2)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:800,color:k.c}}>{k.v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"1.2rem 2rem 3rem"}}>
        {/* Soldes livreurs */}
        <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,padding:"18px",marginBottom:20}} className="fade">
          <h3 style={{fontWeight:700,marginBottom:14,color:"#fbbf24",fontSize:13}}>💼 Soldes portefeuilles livreurs</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
            {Object.entries(SOLDES).map(([nom,solde])=>(
              <div key={nom} style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"12px",textAlign:"center"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(251,191,36,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fbbf24",margin:"0 auto 6px"}}>
                  {nom.split(" ").map(n=>n[0]).join("")}
                </div>
                <div style={{fontSize:14,fontWeight:800,color:"#34d399"}}>{solde.toLocaleString()} F</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.35)",marginTop:2}}>{nom.split(" ")[0]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,marginBottom:16,background:"rgba(255,255,255,.04)",borderRadius:10,padding:4,width:"fit-content"}}>
          {(["Tous","En attente","Approuvé","Payé","Rejeté"] as (StCash|"Tous")[]).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"7px 14px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:tab===t?"rgba(217,119,6,.25)":"transparent",color:tab===t?"#fbbf24":"rgba(255,255,255,.4)",transition:"all .2s"}}>
              {t}
            </button>
          ))}
        </div>

        {/* Liste cashouts */}
        <div style={{display:"flex",flexDirection:"column",gap:10}} className="fade">
          {liste.map(c=>{
            const st = statuts[c.id]
            const s = SC[st]
            return (
              <div key={c.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:12,padding:"16px 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:13,color:"rgba(255,255,255,.7)"}}>{c.id}</span>
                      <span style={{fontSize:11,fontWeight:700,color:s.color,background:s.bg,padding:"2px 8px",borderRadius:6}}>{st}</span>
                    </div>
                    <div style={{fontWeight:700,fontSize:15,marginBottom:2}}>{c.livreur}</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{c.methode} · {c.date}{c.note&&` · ${c.note}`}</div>
                  </div>
                  <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                    <span style={{fontSize:22,fontWeight:800,color:"#fbbf24"}}>{c.montant.toLocaleString()} F</span>
                    <div style={{display:"flex",gap:8}}>
                      {st==="En attente" && (
                        <>
                          <button onClick={()=>approve(c.id)} style={{background:"rgba(52,211,153,.15)",border:"1px solid rgba(52,211,153,.35)",borderRadius:8,padding:"6px 14px",color:"#34d399",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                            ✅ Approuver
                          </button>
                          <button onClick={()=>reject(c.id)} style={{background:"rgba(248,113,113,.1)",border:"1px solid rgba(248,113,113,.3)",borderRadius:8,padding:"6px 14px",color:"#f87171",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                            ✕ Rejeter
                          </button>
                        </>
                      )}
                      {st==="Approuvé" && (
                        <button onClick={()=>pay(c.id)} style={{background:"linear-gradient(135deg,#d97706,#b45309)",border:"none",borderRadius:8,padding:"7px 16px",color:"white",fontSize:12,fontWeight:700,cursor:"pointer"}}>
                          💸 Virer via {c.methode}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info paiement */}
        <div style={{marginTop:20,background:"rgba(217,119,6,.06)",border:"1px solid rgba(217,119,6,.15)",borderRadius:12,padding:"14px 18px",display:"flex",gap:12,alignItems:"center"}}>
          <span style={{fontSize:20}}>ℹ️</span>
          <p style={{fontSize:12,color:"rgba(255,255,255,.45)",margin:0}}>
            Les paiements Wave et Orange Money sont déclenchés manuellement. Intégration API Wave Business et Orange Money Business disponible pour automatisation complète.
          </p>
        </div>
      </div>
    </div>
  )
}
