"use client"
import { useState, useEffect } from "react"

const NAV = (
  <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Portail Gade Gui</a>
    <span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span>
  </div>
)

const sensors = [
  {id:"p1",label:"Poulailler A",temp:28.4,hum:62,co2:850,air:"Bon",color:"#059669"},
  {id:"p2",label:"Poulailler B",temp:31.2,hum:71,co2:1240,air:"Moyen",color:"#d97706"},
  {id:"p3",label:"Poulailler C",temp:27.8,hum:58,co2:780,air:"Bon",color:"#059669"},
  {id:"serre",label:"Serre Horticole",temp:33.6,hum:80,co2:420,air:"Bon",color:"#059669"},
  {id:"etable",label:"Étable Bovine",temp:29.1,hum:65,co2:950,air:"Bon",color:"#059669"},
]

const alerts = [
  {type:"warning",msg:"Poulailler B — Température élevée (+31°C). Ventilation recommandée.",time:"Il y a 12 min"},
  {type:"warning",msg:"Poulailler B — CO₂ au-dessus du seuil (1240 ppm). Vérifier aération.",time:"Il y a 15 min"},
  {type:"info",msg:"Satellite Sentinel-2 — Nouvelles images NDVI disponibles pour parcelle A.",time:"Il y a 2h"},
  {type:"success",msg:"Irrigation automatique déclenchée — Parcelle horticole B (sol sec).",time:"Il y a 3h"},
]

const parcelles = [
  {id:"A",ndvi:0.72,surface:"2.4 ha",culture:"Tomates",statut:"Bon",color:"#16a34a"},
  {id:"B",ndvi:0.58,surface:"1.8 ha",culture:"Oignons",statut:"Stress hydrique",color:"#d97706"},
  {id:"C",ndvi:0.81,surface:"3.1 ha",culture:"Piments",statut:"Excellent",color:"#059669"},
  {id:"D",ndvi:0.44,surface:"1.2 ha",culture:"Aubergines",statut:"Attention",color:"#dc2626"},
]

export default function SmartFarm() {
  const [sel, setSel] = useState("p1")
  const [tick, setTick] = useState(0)
  const active = sensors.find(s=>s.id===sel)!

  useEffect(()=>{
    const t = setInterval(()=>setTick(n=>n+1),4000)
    return ()=>clearInterval(t)
  },[])

  const liveTemp = (active.temp + Math.sin(tick*0.7)*0.3).toFixed(1)
  const liveHum  = Math.round(active.hum + Math.sin(tick*0.5)*1)

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .pulse{animation:pulse 2s infinite}
        .fade{animation:fadeUp .4s ease both}
      `}</style>
      {NAV}

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#022c22,#014421 50%,#020d07)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#6ee7b7",marginBottom:4}}>APPLICATION 1.1</div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>📡 SmartFarm GadeGui</h1>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:13}}>IoT & Agriculture de Précision — Tableau de bord temps réel</p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(5,150,80,.1)",border:"1px solid rgba(5,150,80,.3)",borderRadius:20,padding:"8px 16px"}}>
            <span className="pulse" style={{width:8,height:8,borderRadius:"50%",background:"#34d399",display:"inline-block"}}/>
            <span style={{fontSize:12,color:"#34d399",fontWeight:600}}>Capteurs actifs</span>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem 2rem 3rem"}}>
        {/* KPIs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:14,marginBottom:24}} className="fade">
          {[
            {label:"Capteurs actifs",value:"5",icon:"📡",color:"#059669"},
            {label:"Alertes actives",value:"2",icon:"⚠️",color:"#d97706"},
            {label:"Temp. moy.",value:`${liveTemp}°C`,icon:"🌡️",color:"#0891b2"},
            {label:"Humidité moy.",value:`${liveHum}%`,icon:"💧",color:"#7c3aed"},
            {label:"Parcelles",value:"4",icon:"🛰️",color:"#059669"},
          ].map(k=>(
            <div key={k.label} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"16px",textAlign:"center"}}>
              <div style={{fontSize:24,marginBottom:6}}>{k.icon}</div>
              <div style={{fontSize:22,fontWeight:800,color:k.color}}>{k.value}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{k.label}</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
          {/* Sélecteur capteurs */}
          <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px"}}>
            <h3 style={{fontWeight:700,marginBottom:14,color:"#6ee7b7"}}>Capteurs IoT — Sites de Production</h3>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {sensors.map(s=>(
                <button key={s.id} onClick={()=>setSel(s.id)} style={{background:sel===s.id?"rgba(5,150,80,.18)":"rgba(255,255,255,.03)",border:`1px solid ${sel===s.id?"rgba(5,150,80,.5)":"rgba(255,255,255,.06)"}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .2s"}}>
                  <span style={{fontSize:13,fontWeight:sel===s.id?700:400}}>{s.label}</span>
                  <span style={{fontSize:11,color:s.color,fontWeight:600,background:`${s.color}20`,padding:"2px 8px",borderRadius:8}}>{s.air}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Données capteur sélectionné */}
          <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px"}}>
            <h3 style={{fontWeight:700,marginBottom:4,color:"#6ee7b7"}}>{active.label}</h3>
            <p style={{fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:18}}>Données en temps réel — mise à jour toutes les 4s</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {label:"Température",value:`${liveTemp} °C`,icon:"🌡️",color:"#ef4444",max:45,val:parseFloat(liveTemp)},
                {label:"Humidité",value:`${liveHum} %`,icon:"💧",color:"#0891b2",max:100,val:liveHum},
                {label:"CO₂",value:`${active.co2} ppm`,icon:"🌫️",color:"#d97706",max:2000,val:active.co2},
                {label:"Qualité air",value:active.air,icon:"🍃",color:active.color,max:100,val:80},
              ].map(m=>(
                <div key={m.label} style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"14px"}}>
                  <div style={{fontSize:18,marginBottom:6}}>{m.icon}</div>
                  <div style={{fontSize:18,fontWeight:800,color:m.color,marginBottom:2}}>{m.value}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:8}}>{m.label}</div>
                  <div style={{height:4,background:"rgba(255,255,255,.08)",borderRadius:2}}>
                    <div style={{height:4,background:m.color,borderRadius:2,width:`${Math.min(100,(m.val/(m.max||100))*100)}%`,transition:"width .8s ease"}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carte NDVI des parcelles */}
        <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px",marginBottom:20}}>
          <h3 style={{fontWeight:700,marginBottom:4,color:"#6ee7b7"}}>🛰️ Carte NDVI — Parcelles Horticoles (Sentinel-2)</h3>
          <p style={{fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:16}}>Indice de végétation — dernière mise à jour il y a 3 jours</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
            {parcelles.map(p=>(
              <div key={p.id} style={{background:"rgba(255,255,255,.04)",borderRadius:12,padding:"16px",border:`1px solid ${p.color}30`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <span style={{fontWeight:700,fontSize:15}}>Parcelle {p.id}</span>
                  <span style={{fontSize:11,color:p.color,background:`${p.color}20`,padding:"2px 8px",borderRadius:8}}>{p.statut}</span>
                </div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:8}}>{p.culture} · {p.surface}</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>NDVI</span>
                  <div style={{flex:1,height:6,background:"rgba(255,255,255,.08)",borderRadius:3}}>
                    <div style={{height:6,borderRadius:3,background:`linear-gradient(90deg,#dc2626,#d97706,#059669)`,width:"100%",position:"relative"}}>
                      <div style={{position:"absolute",top:-5,left:`${p.ndvi*100}%`,width:14,height:14,borderRadius:"50%",background:"white",border:`2px solid ${p.color}`,transform:"translateX(-50%)"}}/>
                    </div>
                  </div>
                  <span style={{fontSize:13,fontWeight:700,color:p.color}}>{p.ndvi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertes */}
        <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:16,padding:"20px"}}>
          <h3 style={{fontWeight:700,marginBottom:14,color:"#6ee7b7"}}>🔔 Alertes & Notifications</h3>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {alerts.map((a,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 14px",background:"rgba(255,255,255,.03)",borderRadius:10,borderLeft:`3px solid ${a.type==="warning"?"#d97706":a.type==="success"?"#059669":"#0891b2"}`}}>
                <span style={{fontSize:16}}>{a.type==="warning"?"⚠️":a.type==="success"?"✅":"ℹ️"}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,color:"rgba(255,255,255,.85)"}}>{a.msg}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:3}}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
