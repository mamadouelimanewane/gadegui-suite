"use client"
import { useState } from "react"

const NAV = <div style={{position:"sticky",top:0,zIndex:200,background:"rgba(2,13,7,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(5,150,80,.15)",padding:"0 1.5rem",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:600}}>← Portail Gade Gui</a><span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em"}}>GADE GUI SUITE</span></div>

const cours = [
  {id:1,titre:"Aviculture moderne en Afrique de l'Ouest",cat:"Aviculture",duree:"6h",modules:8,niveau:"Débutant",inscrits:342,img:"🐔",color:"#7c3aed",auteur:"Équipe Gade Gui"},
  {id:2,titre:"Maraîchage sous serre & Horticulture intensive",cat:"Horticulture",duree:"8h",modules:12,niveau:"Intermédiaire",inscrits:218,img:"🌱",color:"#059669",auteur:"Gade Gui × ISRA"},
  {id:3,titre:"Biosécurité & Protocoles HACCP en élevage",cat:"Santé animale",duree:"4h",modules:6,niveau:"Avancé",inscrits:185,img:"🛡️",color:"#dc2626",auteur:"Dr. Fatou Ndiaye"},
  {id:4,titre:"Agriculture de précision & capteurs IoT",cat:"Technologie",duree:"5h",modules:9,niveau:"Intermédiaire",inscrits:134,img:"📡",color:"#0891b2",auteur:"Équipe SmartFarm"},
  {id:5,titre:"Transformation agroalimentaire & valeur ajoutée",cat:"Transformation",duree:"7h",modules:10,niveau:"Intermédiaire",inscrits:290,img:"🏭",color:"#d97706",auteur:"Gade Gui"},
  {id:6,titre:"Financement agricole & accès aux marchés",cat:"Business",duree:"3h",modules:5,niveau:"Tous niveaux",inscrits:401,img:"💰",color:"#6d28d9",auteur:"AgriFinance"},
]

export default function AgroSchool() {
  const [tab, setTab] = useState<"cours"|"forum"|"signal">("cours")
  const [cat, setCat] = useState("Tous")
  const [forum, setForum] = useState("")

  const cats = ["Tous","Aviculture","Horticulture","Santé animale","Technologie","Transformation","Business"]
  const filtered = cat==="Tous" ? cours : cours.filter(c=>c.cat===cat)

  return (
    <div style={{background:"#020d07",minHeight:"100vh",color:"white"}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fadeUp .4s ease both}`}</style>
      {NAV}

      <div style={{background:"linear-gradient(135deg,#1e1040,#2e1065 50%,#020d07)",borderBottom:"1px solid rgba(124,58,237,.2)",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".12em",color:"#c4b5fd",marginBottom:4}}>APPLICATION 3.1</div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>📱 GadeGui AgroSchool</h1>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:13}}>Plateforme de Formation Agricole Nationale — Cours vidéo · Forum · Certification</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[["6","Formations"],["1 570","Apprenants"],["Gratuit","Accès de base"]].map(([v,l])=>(
              <div key={l} style={{background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.25)",borderRadius:10,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:800,color:"#a78bfa"}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signal Mabouba */}
      <div style={{background:"linear-gradient(135deg,rgba(109,40,217,.15),rgba(124,58,237,.08))",borderBottom:"1px solid rgba(124,58,237,.2)",padding:"14px 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:14}}>
          <span style={{fontSize:28}}>🎓</span>
          <div>
            <span style={{fontWeight:700,color:"#c4b5fd",fontSize:13}}>Signal fort — Partenariat Institutionnel</span>
            <span style={{color:"rgba(255,255,255,.5)",fontSize:12,marginLeft:8}}>
              Dr. Mabouba Diagne (Ministre de l&apos;Agriculture, Souveraineté Alimentaire & Élevage · Gouvernement Sonko I & II · Université Gaston-Berger) a exprimé publiquement l&apos;urgence de la formation agricole numérique. AgroSchool répond directement à ce signal.
            </span>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem 2rem 3rem"}}>
        <div style={{display:"flex",gap:4,marginBottom:20,background:"rgba(255,255,255,.04)",borderRadius:12,padding:4,width:"fit-content"}}>
          {(["cours","forum","signal"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,background:tab===t?"rgba(124,58,237,.25)":"transparent",color:tab===t?"#a78bfa":"rgba(255,255,255,.45)",transition:"all .2s"}}>
              {t==="cours"?"📚 Cours":t==="forum"?"💬 Forum":"🤝 Partenariats"}
            </button>
          ))}
        </div>

        {tab==="cours" && (
          <div className="fade">
            <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
              {cats.map(c=>(
                <button key={c} onClick={()=>setCat(c)} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${cat===c?"rgba(124,58,237,.6)":"rgba(255,255,255,.1)"}`,background:cat===c?"rgba(124,58,237,.15)":"transparent",color:cat===c?"#a78bfa":"rgba(255,255,255,.5)",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
              {filtered.map(c=>(
                <div key={c.id} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:14,padding:"20px",borderTop:`3px solid ${c.color}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <span style={{fontSize:36}}>{c.img}</span>
                    <span style={{fontSize:10,fontWeight:700,color:c.color,background:`${c.color}20`,padding:"2px 8px",borderRadius:8}}>{c.niveau}</span>
                  </div>
                  <div style={{fontWeight:700,fontSize:14,lineHeight:1.3,marginBottom:6}}>{c.titre}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:12}}>✍️ {c.auteur} · {c.cat}</div>
                  <div style={{display:"flex",gap:12,marginBottom:14}}>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>⏱️ {c.duree}</span>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>📹 {c.modules} modules</span>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>👥 {c.inscrits}</span>
                  </div>
                  <button style={{width:"100%",background:`linear-gradient(135deg,${c.color},${c.color}aa)`,border:"none",borderRadius:8,padding:"9px",color:"white",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                    Commencer la formation →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="forum" && (
          <div className="fade">
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
              {[
                {user:"Ibrahima S.",temps:"Il y a 2h",msg:"Quelle est la densité optimale pour les poulets de chair en saison des pluies ?",rep:8,like:12,tag:"Aviculture"},
                {user:"Fatou D.",temps:"Il y a 5h",msg:"Résultats NDVI semaine 24 — mes tomates montrent un léger stress hydrique sur la parcelle B. Solutions ?",rep:4,like:7,tag:"Horticulture"},
                {user:"Cheikh M.",temps:"Hier",msg:"Partage d'expérience : réduction mortalité de 3.1% à 0.8% en 2 mois avec le protocole BioSecure.",rep:15,like:34,tag:"Biosécurité"},
                {user:"Modou T.",temps:"Il y a 2j",msg:"Question sur le financement Proparco — comment préparer son dossier de candidature ?",rep:6,like:9,tag:"Financement"},
              ].map((p,i)=>(
                <div key={i} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:12,padding:"16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(124,58,237,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#a78bfa"}}>
                        {p.user[0]}
                      </div>
                      <div>
                        <div style={{fontWeight:600,fontSize:13}}>{p.user}</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{p.temps}</div>
                      </div>
                    </div>
                    <span style={{fontSize:10,fontWeight:700,color:"#a78bfa",background:"rgba(124,58,237,.15)",padding:"2px 8px",borderRadius:8}}>{p.tag}</span>
                  </div>
                  <p style={{fontSize:13,color:"rgba(255,255,255,.75)",marginBottom:10,lineHeight:1.5}}>{p.msg}</p>
                  <div style={{display:"flex",gap:14,fontSize:12,color:"rgba(255,255,255,.35)"}}>
                    <span>💬 {p.rep} réponses</span>
                    <span>❤️ {p.like} likes</span>
                    <button style={{marginLeft:"auto",background:"transparent",border:"1px solid rgba(124,58,237,.3)",borderRadius:6,padding:"3px 10px",color:"#a78bfa",fontSize:11,cursor:"pointer"}}>Répondre</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(124,58,237,.15)",borderRadius:12,padding:"16px"}}>
              <textarea value={forum} onChange={e=>setForum(e.target.value)} placeholder="Posez votre question à la communauté..." rows={3}
                style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(124,58,237,.2)",borderRadius:8,padding:"10px",color:"white",fontSize:13,outline:"none",resize:"none",marginBottom:10}}/>
              <button onClick={()=>setForum("")} style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)",border:"none",borderRadius:8,padding:"9px 20px",color:"white",fontWeight:700,cursor:"pointer"}}>
                Publier dans le forum
              </button>
            </div>
          </div>
        )}

        {tab==="signal" && (
          <div className="fade">
            <div style={{background:"linear-gradient(135deg,rgba(124,58,237,.15),rgba(109,40,217,.08))",border:"1px solid rgba(124,58,237,.3)",borderRadius:16,padding:"24px",marginBottom:20}}>
              <div style={{fontSize:36,marginBottom:12}}>🤝</div>
              <h2 style={{fontSize:20,fontWeight:800,marginBottom:8,color:"#c4b5fd"}}>Proposition de Partenariat Institutionnel</h2>
              <p style={{fontSize:14,color:"rgba(255,255,255,.7)",lineHeight:1.7,marginBottom:16}}>
                Dr. Mabouba Diagne, ancien Ministre de l&apos;Agriculture, de la Souveraineté Alimentaire et de l&apos;Élevage (Gouvernements Sonko I & II, 2024-2026), enseignant-chercheur à l&apos;Université Gaston-Berger de Saint-Louis, a clairement identifié la formation agricole numérique comme priorité nationale.
              </p>
              <p style={{fontSize:14,color:"rgba(255,255,255,.7)",lineHeight:1.7}}>
                <strong style={{color:"#c4b5fd"}}>AgroSchool</strong> est positionnée comme partenaire naturel du Ministère pour la formation des agriculteurs sénégalais via le numérique — objectif 50 000 agriculteurs formés d&apos;ici 2027.
              </p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14}}>
              {[
                {icon:"🏛️",titre:"ISRA — Institut Sénégalais de Recherches Agricoles",statut:"En discussion",color:"#7c3aed"},
                {icon:"🎓",titre:"Université Gaston-Berger (Saint-Louis)",statut:"À engager",color:"#6d28d9"},
                {icon:"🌍",titre:"FAO Sénégal — Formation agriculteurs",statut:"À engager",color:"#059669"},
                {icon:"🏦",titre:"ANIDA — Agence Nationale pour l&apos;Insertion",statut:"À engager",color:"#d97706"},
              ].map(p=>(
                <div key={p.titre} style={{background:"rgba(5,30,15,.8)",border:"1px solid rgba(5,150,80,.12)",borderRadius:12,padding:"16px"}}>
                  <div style={{fontSize:28,marginBottom:8}}>{p.icon}</div>
                  <div style={{fontSize:13,fontWeight:700,lineHeight:1.4,marginBottom:8}}>{p.titre}</div>
                  <span style={{fontSize:11,color:p.color,background:`${p.color}20`,padding:"2px 8px",borderRadius:8,fontWeight:700}}>{p.statut}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
