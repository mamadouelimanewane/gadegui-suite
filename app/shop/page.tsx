"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.96)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Accueil</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const CATEGORIES = ["Tous","Volaille","Légumes","Épicerie","Boissons","Œufs & Laitier"]

const PRODUITS = [
  {id:1,nom:"Poulet Fermier Entier",cat:"Volaille",   prix:7500, unite:"1 unité ~1.5kg", emoji:"🐔",vedette:true, stock:24},
  {id:2,nom:"Poulet découpé (x6)",  cat:"Volaille",   prix:9800, unite:"6 morceaux",     emoji:"🍗",vedette:false,stock:18},
  {id:3,nom:"Café Touba Premium",   cat:"Épicerie",   prix:2500, unite:"500 g",           emoji:"☕",vedette:true, stock:50},
  {id:4,nom:"Pâte d'arachide",      cat:"Épicerie",   prix:1800, unite:"250 g",           emoji:"🥜",vedette:true, stock:40},
  {id:5,nom:"Tomates fraîches",     cat:"Légumes",    prix:1200, unite:"1 kg",            emoji:"🍅",vedette:false,stock:30},
  {id:6,nom:"Oignons",              cat:"Légumes",    prix:800,  unite:"1 kg",            emoji:"🧅",vedette:false,stock:35},
  {id:7,nom:"Œufs fermiers",        cat:"Œufs & Laitier",prix:3600,unite:"Plateau 30",   emoji:"🥚",vedette:true, stock:20},
  {id:8,nom:"Lait frais",           cat:"Œufs & Laitier",prix:1500,unite:"1 litre",      emoji:"🥛",vedette:false,stock:15},
  {id:9,nom:"Jus Ditax naturel",    cat:"Boissons",   prix:1000, unite:"33 cl",           emoji:"🍹",vedette:false,stock:60},
  {id:10,nom:"Jus Bissap",          cat:"Boissons",   prix:900,  unite:"33 cl",           emoji:"🫐",vedette:false,stock:55},
  {id:11,nom:"Carottes",            cat:"Légumes",    prix:700,  unite:"500 g",           emoji:"🥕",vedette:false,stock:40},
  {id:12,nom:"Mangues Kent",        cat:"Légumes",    prix:2000, unite:"1 kg",            emoji:"🥭",vedette:true, stock:22},
]

type CartItem = {id:number;nom:string;prix:number;emoji:string;qty:number}

export default function Shop() {
  const [cat, setCat] = useState("Tous")
  const [q, setQ] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState<"shop"|"cart"|"checkout"|"confirm">("shop")
  const [livMode, setLivMode] = useState<"livraison"|"retrait">("livraison")
  const [phone, setPhone] = useState("")
  const [adresse, setAdresse] = useState("")
  const [paiement, setPaiement] = useState<"Wave"|"Orange Money"|"Cash">("Wave")

  const liste = PRODUITS.filter(p=>(cat==="Tous"||p.cat===cat)&&(q===""||p.nom.toLowerCase().includes(q.toLowerCase())))
  const total = cart.reduce((s,i)=>s+i.prix*i.qty,0)
  const totalItems = cart.reduce((s,i)=>s+i.qty,0)

  function addToCart(p:typeof PRODUITS[0]) {
    setCart(c=>{
      const ex = c.find(i=>i.id===p.id)
      if(ex) return c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i)
      return [...c,{id:p.id,nom:p.nom,prix:p.prix,emoji:p.emoji,qty:1}]
    })
  }
  function removeOne(id:number) {
    setCart(c=>c.map(i=>i.id===id?{...i,qty:i.qty-1}:i).filter(i=>i.qty>0))
  }
  function qtyOf(id:number) { return cart.find(i=>i.id===id)?.qty??0 }

  if(step==="confirm") return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,textAlign:"center",padding:"2rem"}}>
      <div style={{fontSize:72}}>✅</div>
      <h2 style={{fontSize:24,fontWeight:800,color:"#34d399"}}>Commande confirmée !</h2>
      <p style={{color:"rgba(255,255,255,.5)",fontSize:14}}>Numéro : <strong style={{color:"#fbbf24"}}>GGS-{Math.floor(Math.random()*9000+1000)}</strong></p>
      <p style={{color:"rgba(255,255,255,.4)",fontSize:13}}>{livMode==="livraison"?"Livraison estimée : 30-45 min":"Retrait disponible dans 20 min"}</p>
      <button onClick={()=>{setStep("shop");setCart([])}} style={{marginTop:12,background:"linear-gradient(135deg,#059669,#16a34a)",border:"none",borderRadius:12,padding:"12px 28px",color:"white",fontWeight:700,fontSize:14,cursor:"pointer"}}>
        Continuer mes achats
      </button>
    </div>
  )

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .3s ease both} input::placeholder{color:rgba(255,255,255,.25)}`}</style>
      {NAV}

      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#022c22,#014421 60%,#020d07)",padding:"1.5rem 1.5rem 1rem",borderBottom:"1px solid rgba(5,150,80,.2)"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".14em",color:"#6ee7b7",marginBottom:4}}>GADE GUI SHOP · DAKAR</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <div>
              <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>🛍️ GadeGui Shop</h1>
              <p style={{color:"rgba(255,255,255,.4)",fontSize:12}}>Produits frais de l'Agro-Industrial Park · Livraison 45 min</p>
            </div>
            <button onClick={()=>setStep("cart")} style={{position:"relative",background:"rgba(5,150,80,.2)",border:"1px solid rgba(5,150,80,.4)",borderRadius:12,padding:"10px 20px",color:"white",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
              🛒 Panier
              {totalItems>0 && <span style={{background:"#ef4444",color:"white",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800}}>{totalItems}</span>}
            </button>
          </div>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍  Rechercher un produit..." style={{marginTop:12,width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(5,150,80,.2)",borderRadius:10,padding:"10px 14px",color:"white",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
        </div>
      </div>

      {step==="shop" && (
        <div style={{maxWidth:900,margin:"0 auto",padding:"1.2rem 1.5rem 4rem"}}>
          {/* Catégories */}
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,marginBottom:16}}>
            {CATEGORIES.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{whiteSpace:"nowrap",padding:"7px 14px",borderRadius:20,border:`1px solid ${cat===c?"rgba(5,150,80,.6)":"rgba(255,255,255,.1)"}`,background:cat===c?"rgba(5,150,80,.2)":"transparent",color:cat===c?"#34d399":"rgba(255,255,255,.5)",fontSize:12,fontWeight:600,cursor:"pointer",flexShrink:0}}>
                {c}
              </button>
            ))}
          </div>

          {/* Vedettes */}
          {cat==="Tous" && !q && (
            <div style={{marginBottom:20}}>
              <h3 style={{fontWeight:700,color:"#fbbf24",fontSize:13,marginBottom:10}}>⭐ Produits Vedettes</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
                {PRODUITS.filter(p=>p.vedette).map((p,i)=><ProductCard key={p.id} p={p} qty={qtyOf(p.id)} onAdd={()=>addToCart(p)} onRemove={()=>removeOne(p.id)} i={i}/>)}
              </div>
            </div>
          )}

          <h3 style={{fontWeight:700,color:"rgba(255,255,255,.5)",fontSize:13,marginBottom:10}}>{cat==="Tous"&&!q?"Tous les produits":cat||`Résultats "${q}"`} ({liste.length})</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
            {liste.map((p,i)=><ProductCard key={p.id} p={p} qty={qtyOf(p.id)} onAdd={()=>addToCart(p)} onRemove={()=>removeOne(p.id)} i={i}/>)}
          </div>

          {totalItems>0 && (
            <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",zIndex:100}}>
              <button onClick={()=>setStep("cart")} style={{background:"linear-gradient(135deg,#059669,#16a34a)",border:"none",borderRadius:16,padding:"14px 32px",color:"white",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 8px 32px rgba(5,150,80,.5)"}}>
                🛒 Voir mon panier · {total.toLocaleString()} F
              </button>
            </div>
          )}
        </div>
      )}

      {step==="cart" && (
        <div style={{maxWidth:560,margin:"0 auto",padding:"1.5rem 1.5rem 5rem"}} className="fade">
          <button onClick={()=>setStep("shop")} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",cursor:"pointer",fontSize:13,marginBottom:16}}>← Continuer mes achats</button>
          <h2 style={{fontWeight:800,fontSize:18,marginBottom:16}}>Mon panier ({totalItems} articles)</h2>
          {cart.length===0 ? (
            <div style={{textAlign:"center",padding:"40px",color:"rgba(255,255,255,.3)"}}>Votre panier est vide</div>
          ) : (
            <>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
                {cart.map(item=>(
                  <div key={item.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.1)",borderRadius:12,padding:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <span style={{fontSize:28}}>{item.emoji}</span>
                      <div>
                        <div style={{fontWeight:600,fontSize:13}}>{item.nom}</div>
                        <div style={{color:"#34d399",fontWeight:700,fontSize:13}}>{item.prix.toLocaleString()} F</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <button onClick={()=>removeOne(item.id)} style={{width:28,height:28,borderRadius:"50%",border:"1px solid rgba(255,255,255,.2)",background:"transparent",color:"white",cursor:"pointer",fontSize:14}}>−</button>
                      <span style={{fontWeight:700,minWidth:20,textAlign:"center"}}>{item.qty}</span>
                      <button onClick={()=>addToCart(PRODUITS.find(p=>p.id===item.id)!)} style={{width:28,height:28,borderRadius:"50%",border:"none",background:"rgba(5,150,80,.3)",color:"white",cursor:"pointer",fontSize:14}}>+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background:"rgba(5,30,15,.9)",border:"1px solid rgba(5,150,80,.2)",borderRadius:14,padding:"16px",marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{color:"rgba(255,255,255,.5)",fontSize:13}}>Sous-total</span>
                  <span style={{fontWeight:700}}>{total.toLocaleString()} F</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{color:"rgba(255,255,255,.5)",fontSize:13}}>Livraison</span>
                  <span style={{fontWeight:700,color:"#34d399"}}>{livMode==="retrait"?"Gratuit":"800 F"}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",paddingTop:8,borderTop:"1px solid rgba(255,255,255,.08)"}}>
                  <span style={{fontWeight:700}}>Total</span>
                  <span style={{fontWeight:800,fontSize:18,color:"#fbbf24"}}>{(total+(livMode==="retrait"?0:800)).toLocaleString()} F CFA</span>
                </div>
              </div>
              <button onClick={()=>setStep("checkout")} style={{width:"100%",background:"linear-gradient(135deg,#059669,#16a34a)",border:"none",borderRadius:12,padding:"14px",color:"white",fontWeight:800,fontSize:15,cursor:"pointer"}}>
                Commander →
              </button>
            </>
          )}
        </div>
      )}

      {step==="checkout" && (
        <div style={{maxWidth:560,margin:"0 auto",padding:"1.5rem 1.5rem 4rem"}} className="fade">
          <button onClick={()=>setStep("cart")} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",cursor:"pointer",fontSize:13,marginBottom:16}}>← Retour panier</button>
          <h2 style={{fontWeight:800,fontSize:18,marginBottom:16}}>Finaliser la commande</h2>

          {/* Mode livraison */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {(["livraison","retrait"] as const).map(m=>(
              <button key={m} onClick={()=>setLivMode(m)} style={{padding:"14px",borderRadius:12,border:`1px solid ${livMode===m?"rgba(5,150,80,.6)":"rgba(255,255,255,.08)"}`,background:livMode===m?"rgba(5,150,80,.15)":"rgba(255,255,255,.03)",color:"white",cursor:"pointer",fontWeight:600,fontSize:13}}>
                {m==="livraison"?"🛵 Livraison à domicile":"🏪 Retrait en boutique"}
              </button>
            ))}
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
            <div>
              <label style={{fontSize:11,color:"rgba(255,255,255,.4)",display:"block",marginBottom:4}}>Téléphone (+221)</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="77 000 00 00" style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"10px 12px",color:"white",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
            </div>
            {livMode==="livraison" && (
              <div>
                <label style={{fontSize:11,color:"rgba(255,255,255,.4)",display:"block",marginBottom:4}}>Adresse de livraison</label>
                <input value={adresse} onChange={e=>setAdresse(e.target.value)} placeholder="Ex: 12 Rue Moussé Diop, Plateau" style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"10px 12px",color:"white",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
              </div>
            )}
          </div>

          {/* Paiement */}
          <h3 style={{fontWeight:700,fontSize:13,marginBottom:10,color:"rgba(255,255,255,.5)"}}>Mode de paiement</h3>
          <div style={{display:"flex",gap:8,marginBottom:20}}>
            {(["Wave","Orange Money","Cash"] as const).map(p=>(
              <button key={p} onClick={()=>setPaiement(p)} style={{flex:1,padding:"12px 8px",borderRadius:10,border:`1px solid ${paiement===p?"rgba(251,191,36,.5)":"rgba(255,255,255,.08)"}`,background:paiement===p?"rgba(251,191,36,.1)":"rgba(255,255,255,.03)",color:paiement===p?"#fbbf24":"rgba(255,255,255,.5)",fontWeight:600,fontSize:12,cursor:"pointer"}}>
                {p==="Wave"?"💙 Wave":p==="Orange Money"?"🟠 Orange":"💵 Cash"}
              </button>
            ))}
          </div>

          <button onClick={()=>setStep("confirm")} disabled={!phone||(livMode==="livraison"&&!adresse)} style={{width:"100%",background:phone?"linear-gradient(135deg,#059669,#16a34a)":"rgba(255,255,255,.06)",border:"none",borderRadius:12,padding:"14px",color:phone?"white":"rgba(255,255,255,.3)",fontWeight:800,fontSize:15,cursor:phone?"pointer":"not-allowed"}}>
            ✅ Confirmer ma commande · {(total+(livMode==="retrait"?0:800)).toLocaleString()} F
          </button>
        </div>
      )}
    </div>
  )
}

function ProductCard({p,qty,onAdd,onRemove,i}:{p:typeof PRODUITS[0];qty:number;onAdd:()=>void;onRemove:()=>void;i:number}) {
  return (
    <div style={{background:"rgba(5,30,15,.8)",border:`1px solid ${qty>0?"rgba(5,150,80,.4)":"rgba(5,150,80,.1)"}`,borderRadius:14,padding:"14px",animation:`fadeUp .3s ease ${i*.04}s both`,display:"flex",flexDirection:"column",gap:8}}>
      <div style={{fontSize:36,textAlign:"center"}}>{p.emoji}</div>
      <div style={{fontWeight:700,fontSize:13,lineHeight:1.3}}>{p.nom}</div>
      <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{p.unite}</div>
      <div style={{fontWeight:800,color:"#34d399",fontSize:15}}>{p.prix.toLocaleString()} F</div>
      {qty===0 ? (
        <button onClick={onAdd} style={{background:"linear-gradient(135deg,#059669,#16a34a)",border:"none",borderRadius:8,padding:"8px",color:"white",fontWeight:700,fontSize:12,cursor:"pointer"}}>
          + Ajouter
        </button>
      ) : (
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(5,150,80,.15)",borderRadius:8,padding:"4px 8px"}}>
          <button onClick={onRemove} style={{background:"none",border:"none",color:"white",cursor:"pointer",fontSize:18,fontWeight:700}}>−</button>
          <span style={{fontWeight:800,color:"#34d399"}}>{qty}</span>
          <button onClick={onAdd} style={{background:"none",border:"none",color:"white",cursor:"pointer",fontSize:18,fontWeight:700}}>+</button>
        </div>
      )}
    </div>
  )
}
