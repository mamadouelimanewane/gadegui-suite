"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/delivery" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Gade Gui Express</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

type St = "En cours"|"Livrée"|"Annulée"|"Échouée"

const CMDS: {id:string;client:string;adresse_pickup:string;adresse_dest:string;livreur:string|null;produits:string;montant:number;statut:St;type:string;heure:string;note?:number}[] = [
  {id:"GGX-089",client:"Hôtel Terrou-Bi",       adresse_pickup:"Almadies — Entrepôt Gade Gui", adresse_dest:"Almadies, Dakar",      livreur:"Moussa Diallo",  produits:"50 kg poulet, 10 kg tomates",         montant:185000,statut:"En cours",  type:"Livraison B2B",        heure:"10:14"},
  {id:"GGX-090",client:"Ndèye Diallo",           adresse_pickup:"Almadies — Entrepôt Gade Gui", adresse_dest:"Parcelles Assainies", livreur:"Cheikh Mbaye",   produits:"Panier famille (poulet + légumes)",   montant:25000, statut:"En cours",  type:"Panier Express",       heure:"10:32"},
  {id:"GGX-091",client:"Restaurant Le Lagon",    adresse_pickup:"Almadies — Entrepôt Gade Gui", adresse_dest:"Plateau, Dakar",       livreur:"Omar Gueye",     produits:"15 kg poulet, 5 pots pâte arachide", montant:67500, statut:"En cours",  type:"Livraison Restaurant", heure:"10:45"},
  {id:"GGX-092",client:"Supermarché Casino",     adresse_pickup:"Almadies — Entrepôt Gade Gui", adresse_dest:"Mermoz, Dakar",        livreur:null,             produits:"30 kg oignons, 20 kg tomates",        montant:42000, statut:"En cours",  type:"Livraison B2B",        heure:"11:00"},
  {id:"GGX-088",client:"Aminata Sow",            adresse_pickup:"Almadies — Entrepôt Gade Gui", adresse_dest:"Yoff, Dakar",          livreur:"Ibou Sarr",      produits:"2 kg Café Touba, 1 pot pâte",         montant:15000, statut:"Livrée",    type:"Express",              heure:"09:30",note:5},
  {id:"GGX-087",client:"Lycée Cheikh Anta Diop", adresse_pickup:"Almadies — Entrepôt Gade Gui", adresse_dest:"Fann, Dakar",          livreur:"Amadou Ndiaye",  produits:"100 kg poulet (commande cantine)",    montant:320000,statut:"Livrée",    type:"Livraison B2B",        heure:"08:15",note:5},
  {id:"GGX-086",client:"Ousmane Faye",           adresse_pickup:"Almadies — Entrepôt Gade Gui", adresse_dest:"Grand Dakar",          livreur:"Moussa Diallo",  produits:"5 kg tomates, 2 kg piments",          montant:10000, statut:"Annulée",   type:"Express",              heure:"07:50"},
  {id:"GGX-085",client:"Marché Kermel",          adresse_pickup:"Almadies — Entrepôt Gade Gui", adresse_dest:"Plateau, Dakar",       livreur:"Seydou Diop",    produits:"Commande horticulture — 80 kg",       montant:96000, statut:"Échouée",   type:"Livraison B2B",        heure:"07:00"},
]

const SC: Record<St,{color:string;bg:string}> = {
  "En cours":{color:"#34d399",bg:"rgba(52,211,153,.12)"},
  "Livrée":  {color:"#60a5fa",bg:"rgba(96,165,250,.12)"},
  "Annulée": {color:"#6b7280",bg:"rgba(107,114,128,.1)"},
  "Échouée": {color:"#f87171",bg:"rgba(248,113,113,.12)"},
}

const TABS: {key:St|"Toutes";label:string}[] = [
  {key:"Toutes",  label:"Toutes"},
  {key:"En cours",label:"En cours"},
  {key:"Livrée",  label:"Livrées"},
  {key:"Annulée", label:"Annulées"},
  {key:"Échouée", label:"Échouées"},
]

export default function Commandes() {
  const [tab, setTab] = useState<St|"Toutes">("Toutes")
  const [search, setSearch] = useState("")
  const [sel, setSel] = useState<string|null>(null)

  const liste = CMDS.filter(c=>{
    if(tab!=="Toutes" && c.statut!==tab) return false
    if(search && !c.client.toLowerCase().includes(search.toLowerCase()) && !c.id.includes(search)) return false
    return true
  })
  const detail = sel ? CMDS.find(c=>c.id===sel) : null

  const total = (st:St) => CMDS.filter(c=>c.statut===st).length

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .35s ease both} input::placeholder,select{color:rgba(255,255,255,.25)}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#1c0500,#2d0f00 50%,#020d07)",borderBottom:"1px solid rgba(249,115,22,.2)",padding:"1.2rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#fb923c",marginBottom:3}}>LIVRAISON · MODULE 2</div>
            <h1 style={{fontSize:22,fontWeight:800}}>📦 Commandes & Livraisons</h1>
          </div>
          <div style={{display:"flex",gap:10}}>
            {([["En cours","#34d399"],["Livrée","#60a5fa"],["Annulée","#6b7280"],["Échouée","#f87171"]] as [St,string][]).map(([s,c])=>(
              <div key={s} style={{background:"rgba(249,115,22,.08)",border:"1px solid rgba(249,115,22,.15)",borderRadius:10,padding:"7px 12px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:800,color:c}}>{total(s)}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.3)"}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.2rem 2rem 3rem",display:"grid",gridTemplateColumns:detail?"1fr 360px":"1fr",gap:20}}>
        <div>
          {/* Tabs */}
          <div style={{display:"flex",gap:4,marginBottom:14,background:"rgba(255,255,255,.04)",borderRadius:10,padding:4,width:"fit-content"}}>
            {TABS.map(t=>(
              <button key={t.key} onClick={()=>setTab(t.key)} style={{padding:"7px 16px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:tab===t.key?"rgba(249,115,22,.25)":"transparent",color:tab===t.key?"#fb923c":"rgba(255,255,255,.4)",transition:"all .2s"}}>
                {t.label}
              </button>
            ))}
          </div>

          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Rechercher commande ou client..."
            style={{width:"100%",marginBottom:14,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"8px 14px",color:"white",fontSize:13,outline:"none",boxSizing:"border-box"}}/>

          <div style={{display:"flex",flexDirection:"column",gap:10}} className="fade">
            {liste.map(c=>{
              const s = SC[c.statut]
              return (
                <div key={c.id} onClick={()=>setSel(sel===c.id?null:c.id)}
                  style={{background:sel===c.id?"rgba(249,115,22,.08)":"rgba(5,30,15,.8)",border:`1px solid ${sel===c.id?"rgba(249,115,22,.3)":"rgba(5,150,80,.1)"}`,borderRadius:12,padding:"14px 18px",cursor:"pointer",transition:"all .2s"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                        <span style={{fontWeight:700,fontSize:14,color:"#fb923c"}}>{c.id}</span>
                        <span style={{fontSize:11,color:s.color,background:s.bg,padding:"2px 8px",borderRadius:6,fontWeight:600}}>{c.statut}</span>
                        <span style={{fontSize:10,color:"rgba(255,255,255,.3)",background:"rgba(255,255,255,.05)",padding:"2px 7px",borderRadius:6}}>{c.type}</span>
                      </div>
                      <div style={{fontWeight:600,fontSize:13,marginBottom:2}}>{c.client}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:4}}>{c.produits}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>
                        📍 {c.adresse_dest} · 🛵 {c.livreur??<span style={{color:"#f87171"}}>Non assigné</span>} · ⏰ {c.heure}
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:18,fontWeight:800,color:"#fbbf24"}}>{c.montant.toLocaleString()} F</div>
                      {c.note && <div style={{fontSize:11,color:"#fbbf24"}}>⭐ {c.note}/5</div>}
                    </div>
                  </div>
                </div>
              )
            })}
            {liste.length===0 && <div style={{padding:"32px",textAlign:"center",color:"rgba(255,255,255,.25)",fontSize:13}}>Aucune commande</div>}
          </div>
        </div>

        {/* Détail */}
        {detail && (
          <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(249,115,22,.2)",borderRadius:16,padding:"20px",height:"fit-content"}} className="fade">
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
              <h3 style={{fontWeight:700,color:"#fb923c",fontSize:14}}>Détail Commande</h3>
              <button onClick={()=>setSel(null)} style={{background:"transparent",border:"none",color:"rgba(255,255,255,.3)",cursor:"pointer",fontSize:18}}>×</button>
            </div>
            <div style={{fontWeight:800,fontSize:20,color:"#fb923c",marginBottom:4}}>{detail.id}</div>
            <div style={{marginBottom:14}}>
              <span style={{fontSize:12,color:SC[detail.statut].color,background:SC[detail.statut].bg,padding:"3px 10px",borderRadius:8,fontWeight:700}}>{detail.statut}</span>
            </div>
            {[
              {l:"Client",      v:detail.client},
              {l:"Type",        v:detail.type},
              {l:"Produits",    v:detail.produits},
              {l:"Départ",      v:detail.adresse_pickup},
              {l:"Destination", v:detail.adresse_dest},
              {l:"Livreur",     v:detail.livreur??"Non assigné"},
              {l:"Heure",       v:detail.heure},
              {l:"Montant",     v:`${detail.montant.toLocaleString()} F CFA`},
            ].map(r=>(
              <div key={r.l} style={{display:"flex",flexDirection:"column",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                <span style={{fontSize:10,color:"rgba(255,255,255,.3)",marginBottom:2}}>{r.l}</span>
                <span style={{fontSize:13,color:"rgba(255,255,255,.8)",fontWeight:r.l==="Montant"?700:400}}>{r.v}</span>
              </div>
            ))}
            {detail.statut==="En cours" && !detail.livreur && (
              <button style={{marginTop:14,width:"100%",background:"linear-gradient(135deg,#f97316,#ea580c)",border:"none",borderRadius:8,padding:"10px",color:"white",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                🎯 Assigner un livreur
              </button>
            )}
            {detail.statut==="En cours" && (
              <button style={{marginTop:8,width:"100%",background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.3)",borderRadius:8,padding:"10px",color:"#34d399",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                ✅ Marquer comme livrée
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
