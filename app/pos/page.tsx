"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.96)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Accueil</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const PRODUITS = [
  {id:1,nom:"Poulet Fermier",  cat:"🐔",prix:7500},
  {id:2,nom:"Café Touba 500g",cat:"☕",prix:2500},
  {id:3,nom:"Pâte d'arachide",cat:"🥜",prix:1800},
  {id:4,nom:"Tomates 1kg",    cat:"🍅",prix:1200},
  {id:5,nom:"Œufs x30",       cat:"🥚",prix:3600},
  {id:6,nom:"Jus Bissap",     cat:"🫐",prix:900},
  {id:7,nom:"Oignons 1kg",    cat:"🧅",prix:800},
  {id:8,nom:"Mangues 1kg",    cat:"🥭",prix:2000},
  {id:9,nom:"Lait frais 1L",  cat:"🥛",prix:1500},
  {id:10,nom:"Jus Ditax",     cat:"🍹",prix:1000},
  {id:11,nom:"Carottes 500g", cat:"🥕",prix:700},
  {id:12,nom:"Poulet découpé",cat:"🍗",prix:9800},
]

const VENTES_JOUR = [
  {h:"09:12",items:3,total:11200,mode:"Wave"},
  {h:"09:45",items:1,total:7500, mode:"Cash"},
  {h:"10:30",items:5,total:8900, mode:"Orange Money"},
  {h:"11:08",items:2,total:4300, mode:"Wave"},
]

type CartItem = {id:number;nom:string;prix:number;cat:string;qty:number}

export default function POS() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mode, setMode] = useState<"Wave"|"Orange Money"|"Cash">("Cash")
  const [numPad, setNumPad] = useState("")
  const [done, setDone] = useState(false)
  const [tab, setTab] = useState<"caisse"|"rapport">("caisse")

  const total = cart.reduce((s,i)=>s+i.prix*i.qty,0)
  const rendu = Number(numPad) - total

  function addProduct(p:typeof PRODUITS[0]) {
    setCart(c=>{
      const ex = c.find(i=>i.id===p.id)
      if(ex) return c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i)
      return [...c,{...p,qty:1}]
    })
  }
  function removeOne(id:number){ setCart(c=>c.map(i=>i.id===id?{...i,qty:i.qty-1}:i).filter(i=>i.qty>0)) }
  function clearCart(){ setCart([]); setNumPad(""); setDone(false) }
  function valider(){
    if(cart.length===0) return
    setDone(true)
    setTimeout(clearCart,3000)
  }

  const totalJour = VENTES_JOUR.reduce((s,v)=>s+v.total,0)+total

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .3s ease both} @keyframes pop{0%{transform:scale(.8);opacity:0}60%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}} .pop{animation:pop .35s ease}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#022c22,#014421 50%,#020d07)",borderBottom:"1px solid rgba(5,150,80,.2)",padding:"1rem 1.5rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:11,color:"#6ee7b7",fontWeight:700,letterSpacing:".12em",marginBottom:3}}>POINT DE VENTE</div>
            <h1 style={{fontSize:20,fontWeight:800}}>🖥️ GadeGui POS</h1>
          </div>
          <div style={{display:"flex",gap:8}}>
            {[{v:VENTES_JOUR.length,l:"Ventes",c:"#34d399"},{v:`${totalJour.toLocaleString()} F`,l:"CA jour",c:"#fbbf24"}].map(k=>(
              <div key={k.l} style={{background:"rgba(5,150,80,.08)",border:"1px solid rgba(5,150,80,.12)",borderRadius:9,padding:"7px 14px",textAlign:"center"}}>
                <div style={{fontSize:14,fontWeight:800,color:k.c}}>{k.v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{k.l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:4,background:"rgba(255,255,255,.04)",borderRadius:8,padding:3}}>
            {(["caisse","rapport"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{padding:"6px 14px",borderRadius:6,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:tab===t?"rgba(5,150,80,.2)":"transparent",color:tab===t?"#34d399":"rgba(255,255,255,.4)"}}>
                {t==="caisse"?"🖥️ Caisse":"📊 Rapport"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab==="caisse" && (
        <div style={{maxWidth:1200,margin:"0 auto",padding:"1rem 1.5rem 2rem",display:"grid",gridTemplateColumns:"1fr 340px",gap:16,height:"calc(100vh - 120px)"}}>
          {/* Produits */}
          <div style={{overflowY:"auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8}}>
              {PRODUITS.map((p,i)=>(
                <button key={p.id} onClick={()=>addProduct(p)} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:12,padding:"14px 10px",cursor:"pointer",color:"white",textAlign:"center",transition:"all .15s",animation:`fadeUp .25s ease ${i*.03}s both`}}>
                  <div style={{fontSize:28,marginBottom:6}}>{p.cat}</div>
                  <div style={{fontSize:12,fontWeight:600,lineHeight:1.3,marginBottom:4}}>{p.nom}</div>
                  <div style={{fontSize:14,fontWeight:800,color:"#34d399"}}>{p.prix.toLocaleString()} F</div>
                </button>
              ))}
            </div>
          </div>

          {/* Caisse */}
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(5,150,80,.15)",borderRadius:14,padding:"14px",flex:1,overflowY:"auto"}}>
              <h3 style={{fontWeight:700,fontSize:13,marginBottom:10,color:"rgba(255,255,255,.5)"}}>Ticket en cours</h3>
              {done ? (
                <div className="pop" style={{textAlign:"center",padding:"30px 0"}}>
                  <div style={{fontSize:48,marginBottom:8}}>✅</div>
                  <div style={{fontWeight:800,color:"#34d399",fontSize:16}}>Payé !</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:4}}>Reçu envoyé</div>
                </div>
              ) : cart.length===0 ? (
                <div style={{textAlign:"center",padding:"30px 0",color:"rgba(255,255,255,.2)",fontSize:13}}>Scannez ou sélectionnez un produit</div>
              ) : (
                cart.map(item=>(
                  <div key={item.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600}}>{item.nom}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{item.prix.toLocaleString()} F × {item.qty}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:12,fontWeight:700,color:"#fbbf24"}}>{(item.prix*item.qty).toLocaleString()} F</span>
                      <button onClick={()=>removeOne(item.id)} style={{background:"rgba(239,68,68,.15)",border:"none",borderRadius:4,width:20,height:20,color:"#f87171",cursor:"pointer",fontSize:12}}>−</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total */}
            <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(5,150,80,.15)",borderRadius:14,padding:"14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Total</span>
                <span style={{fontSize:22,fontWeight:800,color:"#34d399"}}>{total.toLocaleString()} F</span>
              </div>

              {/* Mode paiement */}
              <div style={{display:"flex",gap:6,marginBottom:10}}>
                {(["Cash","Wave","Orange Money"] as const).map(m=>(
                  <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"7px 4px",borderRadius:8,border:`1px solid ${mode===m?"rgba(251,191,36,.5)":"rgba(255,255,255,.08)"}`,background:mode===m?"rgba(251,191,36,.1)":"transparent",color:mode===m?"#fbbf24":"rgba(255,255,255,.4)",fontWeight:600,fontSize:10,cursor:"pointer"}}>
                    {m==="Wave"?"💙 Wave":m==="Orange Money"?"🟠 OM":"💵 Cash"}
                  </button>
                ))}
              </div>

              {/* Numpad cash */}
              {mode==="Cash" && (
                <div style={{marginBottom:10}}>
                  <div style={{background:"rgba(255,255,255,.05)",borderRadius:8,padding:"8px 12px",fontSize:16,fontWeight:700,textAlign:"right",marginBottom:6,minHeight:36}}>
                    {numPad?Number(numPad).toLocaleString()+" F":"Montant reçu..."}
                  </div>
                  {rendu>0&&numPad&&<div style={{fontSize:12,color:"#34d399",textAlign:"right",marginBottom:4}}>Rendu: {rendu.toLocaleString()} F</div>}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4}}>
                    {["1","2","3","4","5","6","7","8","9","000","0","⌫"].map(k=>(
                      <button key={k} onClick={()=>k==="⌫"?setNumPad(n=>n.slice(0,-1)):setNumPad(n=>n+k)} style={{padding:"10px",borderRadius:6,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.04)",color:"white",fontWeight:600,fontSize:13,cursor:"pointer"}}>
                        {k}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={valider} disabled={cart.length===0} style={{width:"100%",background:cart.length?"linear-gradient(135deg,#059669,#16a34a)":"rgba(255,255,255,.06)",border:"none",borderRadius:10,padding:"13px",color:cart.length?"white":"rgba(255,255,255,.3)",fontWeight:800,fontSize:15,cursor:cart.length?"pointer":"not-allowed"}}>
                ✅ Encaisser · {total.toLocaleString()} F
              </button>
            </div>
          </div>
        </div>
      )}

      {tab==="rapport" && (
        <div style={{maxWidth:700,margin:"0 auto",padding:"1.5rem 1.5rem 4rem"}} className="fade">
          <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:14,padding:"20px",marginBottom:16}}>
            <h3 style={{fontWeight:700,marginBottom:14,fontSize:14,color:"#6ee7b7"}}>📊 Rapport journalier — {new Date().toLocaleDateString("fr-FR")}</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
              {[{l:"Ventes",v:VENTES_JOUR.length+1},{l:"CA Total",v:`${totalJour.toLocaleString()} F`},{l:"Moy / vente",v:`${Math.round(totalJour/(VENTES_JOUR.length+1)).toLocaleString()} F`}].map(k=>(
                <div key={k.l} style={{textAlign:"center",padding:"14px",background:"rgba(255,255,255,.04)",borderRadius:10}}>
                  <div style={{fontSize:20,fontWeight:800,color:"#34d399"}}>{k.v}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:3}}>{k.l}</div>
                </div>
              ))}
            </div>
            <h4 style={{fontWeight:700,fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:10}}>Détail des transactions</h4>
            {VENTES_JOUR.map(v=>(
              <div key={v.h} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                <span style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>{v.h}</span>
                <span style={{fontSize:12}}>{v.items} article(s)</span>
                <span style={{fontSize:12,color:v.mode==="Wave"?"#60a5fa":v.mode==="Orange Money"?"#fb923c":"#34d399"}}>{v.mode}</span>
                <span style={{fontWeight:700,fontSize:13,color:"#fbbf24"}}>{v.total.toLocaleString()} F</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
