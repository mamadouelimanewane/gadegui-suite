"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Portail Gade Gui</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const produits = [
  {id:1,nom:"Poulet de chair",cat:"Aviculture",prix:3200,unite:"kg",stock:840,img:"🍗",badge:"Best-seller",color:"#d97706"},
  {id:2,nom:"Œufs frais (plateau 30)",cat:"Aviculture",prix:4500,unite:"plateau",stock:320,img:"🥚",badge:"Populaire",color:"#f59e0b"},
  {id:3,nom:"Tomates cerise",cat:"Horticulture",prix:1800,unite:"kg",stock:210,img:"🍅",badge:"Saison",color:"#ef4444"},
  {id:4,nom:"Oignons",cat:"Horticulture",prix:800,unite:"kg",stock:950,img:"🧅",badge:null,color:"#a78bfa"},
  {id:5,nom:"Piments rouges",cat:"Horticulture",prix:2200,unite:"kg",stock:175,img:"🌶️",badge:"Export",color:"#dc2626"},
  {id:6,nom:"Café Touba (1kg)",cat:"Transformation",prix:6500,unite:"sachet",stock:430,img:"☕",badge:"Premium",color:"#92400e"},
  {id:7,nom:"Pâte d'arachide (500g)",cat:"Transformation",prix:2800,unite:"pot",stock:620,img:"🥜",badge:"Bio",color:"#b45309"},
  {id:8,nom:"Viande bovine",cat:"Élevage",prix:5500,unite:"kg",stock:95,img:"🥩",badge:null,color:"#dc2626"},
]

const commandes = [
  {id:"CMD-2025-089",client:"Hôtel Terrou-Bi",montant:285000,statut:"livré",date:"20/06/2025"},
  {id:"CMD-2025-090",client:"Supermarché Casino Dakar",montant:142000,statut:"en cours",date:"21/06/2025"},
  {id:"CMD-2025-091",client:"Restaurant Le Lagon",montant:67500,statut:"confirmé",date:"22/06/2025"},
  {id:"CMD-2025-092",client:"Abdoulaye Diallo (Panier)",montant:18500,statut:"livré",date:"22/06/2025"},
]

const sc: Record<string,string> = {livré:"#34d399","en cours":"#60a5fa",confirmé:"#fbbf24"}

export default function Market() {
  const [tab, setTab] = useState<"catalogue"|"commandes"|"abonnements">("catalogue")
  const [cart, setCart] = useState<Record<number,number>>({})
  const [cat, setCat] = useState("Tous")

  const cats = ["Tous","Aviculture","Horticulture","Transformation","Élevage"]
  const filtered = cat==="Tous" ? produits : produits.filter(p=>p.cat===cat)
  const total = Object.entries(cart).reduce((s,[id,q])=>s+(produits.find(p=>p.id===+id)?.prix||0)*q,0)

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .4s ease both} .pbtn:hover{opacity:.85} .pbtn{transition:opacity .2s}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#1c0a00,#3a1500 50%,#020d07)",borderBottom:"1px solid rgba(217,119,6,.2)",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#fde68a",marginBottom:4}}>APPLICATION 2.1</div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>🏪 GadeGui Market</h1>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:13}}>Marketplace B2B & B2C — Vente directe aux restaurants, hôtels, supermarchés et particuliers</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[["8","Produits"],["4","Commandes actives"],[`${Object.values(cart).reduce((a,b)=>a+b,0)}`,"Dans le panier"]].map(([v,l])=>(
              <div key={l} style={{background:"rgba(217,119,6,.1)",border:"1px solid rgba(217,119,6,.25)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:800,color:"#fbbf24"}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem 2rem 3rem"}}>
        <div style={{display:"flex",gap:4,marginBottom:20,background:"rgba(255,255,255,.04)",borderRadius:12,padding:4,width:"fit-content"}}>
          {(["catalogue","commandes","abonnements"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,background:tab===t?"rgba(217,119,6,.25)":"transparent",color:tab===t?"#fbbf24":"rgba(255,255,255,.45)",transition:"all .2s"}}>
              {t==="catalogue"?"🛍️ Catalogue":t==="commandes"?"📦 Commandes":"📅 Abonnements"}
            </button>
          ))}
        </div>

        {tab==="catalogue" && (
          <div className="fade">
            <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
              {cats.map(c=>(
                <button key={c} onClick={()=>setCat(c)} style={{padding:"6px 16px",borderRadius:20,border:`1px solid ${cat===c?"rgba(217,119,6,.6)":"rgba(255,255,255,.1)"}`,background:cat===c?"rgba(217,119,6,.15)":"transparent",color:cat===c?"#fbbf24":"rgba(255,255,255,.5)",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16,marginBottom:24}}>
              {filtered.map(p=>(
                <div key={p.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"18px",borderTop:`3px solid ${p.color}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <span style={{fontSize:36}}>{p.img}</span>
                    {p.badge && <span style={{fontSize:10,fontWeight:700,color:p.color,background:`${p.color}20`,padding:"2px 8px",borderRadius:8}}>{p.badge}</span>}
                  </div>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:2}}>{p.nom}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:10}}>{p.cat} · Stock : {p.stock} {p.unite}</div>
                  <div style={{fontSize:20,fontWeight:800,color:"#fbbf24",marginBottom:12}}>{p.prix.toLocaleString()} F / {p.unite}</div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>setCart(c=>({...c,[p.id]:(c[p.id]||0)+1}))} className="pbtn" style={{flex:1,background:`linear-gradient(135deg,${p.color},#b45309)`,border:"none",borderRadius:8,padding:"8px",color:"white",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                      + Ajouter au panier
                    </button>
                    {cart[p.id] && <span style={{background:"rgba(217,119,6,.2)",border:"1px solid rgba(217,119,6,.4)",borderRadius:8,padding:"8px 12px",fontSize:13,fontWeight:800,color:"#fbbf24"}}>{cart[p.id]}</span>}
                  </div>
                </div>
              ))}
            </div>
            {total>0 && (
              <div style={{background:"rgba(217,119,6,.1)",border:"1px solid rgba(217,119,6,.3)",borderRadius:14,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:700,fontSize:15}}>🛒 Mon Panier</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>{Object.values(cart).reduce((a,b)=>a+b,0)} article(s)</div>
                </div>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <span style={{fontSize:20,fontWeight:800,color:"#fbbf24"}}>{total.toLocaleString()} F CFA</span>
                  <button onClick={()=>setCart({})} style={{background:"linear-gradient(135deg,#d97706,#b45309)",border:"none",borderRadius:8,padding:"10px 20px",color:"white",fontWeight:700,cursor:"pointer"}}>Commander →</button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab==="commandes" && (
          <div className="fade" style={{display:"flex",flexDirection:"column",gap:12}}>
            {commandes.map(c=>(
              <div key={c.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:12,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                <div>
                  <div style={{fontWeight:700,marginBottom:3}}>{c.id}</div>
                  <div style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>{c.client} · {c.date}</div>
                </div>
                <div style={{display:"flex",gap:14,alignItems:"center"}}>
                  <span style={{fontSize:18,fontWeight:800,color:"#fbbf24"}}>{c.montant.toLocaleString()} F</span>
                  <span style={{fontSize:11,fontWeight:700,color:sc[c.statut],background:`${sc[c.statut]}20`,padding:"3px 10px",borderRadius:8}}>{c.statut}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab==="abonnements" && (
          <div className="fade" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
            {[
              {nom:"Panier Famille",freq:"Hebdomadaire",prix:25000,items:["2 kg poulet","2 plateaux œufs","5 kg légumes","1 Café Touba"],color:"#059669"},
              {nom:"Panier Restaurant",freq:"Bi-hebdomadaire",prix:85000,items:["15 kg poulet","10 plateaux œufs","20 kg légumes","5 kg tomates"],color:"#d97706"},
              {nom:"Pack Hôtel Premium",freq:"Hebdomadaire",prix:220000,items:["50 kg poulet","30 plateaux œufs","Légumes assortis","Viande bovine 10kg"],color:"#7c3aed"},
            ].map(a=>(
              <div key={a.nom} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"20px",borderTop:`3px solid ${a.color}`}}>
                <div style={{fontSize:24,fontWeight:800,color:a.color,marginBottom:4}}>{a.prix.toLocaleString()} F CFA</div>
                <div style={{fontWeight:700,fontSize:15,marginBottom:2}}>{a.nom}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:14}}>Livraison {a.freq}</div>
                <ul style={{listStyle:"none",padding:0,marginBottom:16}}>
                  {a.items.map(it=><li key={it} style={{fontSize:12,color:"rgba(255,255,255,.6)",padding:"3px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>✓ {it}</li>)}
                </ul>
                <button style={{width:"100%",background:`linear-gradient(135deg,${a.color},${a.color}bb)`,border:"none",borderRadius:8,padding:"10px",color:"white",fontWeight:700,cursor:"pointer"}}>S&apos;abonner</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
