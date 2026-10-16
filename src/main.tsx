import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, RotateCcw, Crosshair, ArrowUpRight } from 'lucide-react';
import { productMetrics as data } from './data';
import '@fontsource-variable/dm-sans';
import '@fontsource/ibm-plex-mono/400.css';
import './styles.css';

const ease = [.22, 1, .36, 1] as const;
const percent = (value: number) => `${value.toLocaleString('pt-BR')}%`;
const taskTime = (value: number) => `${Math.floor(value / 60)}min${String(value % 60).padStart(2, '0')}s`;
const fragments = [
  { label: 'CONVERSÃO', value: percent(data.conversionChangePercent), x: 17, y: 22 },
  { label: 'ERROS ANDROID', value: `+${percent(data.androidErrorsChangePercent)}`, x: 70, y: 18 },
  { label: 'TEMPO MÉDIO DA TAREFA', value: taskTime(data.averageTaskTimeSeconds), x: 61, y: 68 },
  { label: 'iOS · ATIVAÇÃO', value: percent(data.platforms.ios.activationPercent), x: 13, y: 69 },
  { label: 'ANDROID · ATIVAÇÃO', value: percent(data.platforms.android.activationPercent), x: 75, y: 45 },
  { label: 'CONEXÃO iOS · ERROS', value: percent(data.platforms.ios.connectionErrorsPercent), x: 37, y: 12 },
  { label: 'CONEXÃO ANDROID · ERROS', value: percent(data.platforms.android.connectionErrorsPercent), x: 32, y: 79 },
];

function Count({ value, format }: { value: number; format: (v: number) => string }) {
  const count = useMotionValue(0);
  const display = useTransform(count, v => format(Math.round(v)));
  useEffect(() => {
    const controls = animate(count, value, { delay: 6.2, duration: 1.15, ease: 'easeOut' });
    return () => controls.stop();
  }, [count, value]);
  return <motion.span>{display}</motion.span>;
}

function MechanicalFigure() {
  return <motion.div className="figure-camera" aria-hidden="true"
    initial={{ opacity: 0, scale: .91, x: 18 }}
    animate={{ opacity: [0, .9, 1, 0], scale: [.91, 1.02, 1.28, 2.7], x: [18, 0, -40, -190], filter: ['blur(5px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'] }}
    transition={{ duration: 4.1, times: [0, .35, .64, 1], ease: 'easeInOut' }}>
    <svg className="mechanical-figure" viewBox="0 0 800 900">
      <defs>
        <linearGradient id="shell" x1="0" x2="1"><stop stopColor="#030406"/><stop offset=".4" stopColor="#17191d"/><stop offset=".6" stopColor="#24272c"/><stop offset=".77" stopColor="#090b0e"/><stop offset="1" stopColor="#020304"/></linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7b4145"/><stop offset=".43" stopColor="#35393f"/><stop offset="1" stopColor="#0a0c0f"/></linearGradient>
        <linearGradient id="face" x1="0" x2="1"><stop stopColor="#0b0d10"/><stop offset=".48" stopColor="#292b30"/><stop offset=".55" stopColor="#121518"/><stop offset="1" stopColor="#030406"/></linearGradient>
        <radialGradient id="eyeHalo"><stop stopColor="#ff394e" stopOpacity=".7"/><stop offset="1" stopColor="#d31b33" stopOpacity="0"/></radialGradient>
        <filter id="eyeGlow"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>
      <path d="M58 900 L118 766 269 701 290 605 261 524 228 410 234 237 284 131 383 84 481 95 554 163 580 275 558 447 518 548 480 610 492 704 666 773 738 900Z" fill="url(#shell)" stroke="url(#edge)" strokeWidth="1.5"/>
      <path d="M234 237 L284 131 383 84 396 237 362 295 257 324Z" fill="#15181c" stroke="#3d3f44" strokeWidth=".8"/>
      <path d="M396 237 L383 84 481 95 554 163 580 275 537 318 445 288Z" fill="url(#shell)" stroke="#303238"/>
      <path d="M257 342 L357 317 395 349 430 317 539 336 519 446 465 507 447 579 394 622 334 582 321 511 272 454Z" fill="url(#face)" stroke="url(#edge)"/>
      <path d="M249 326 L354 297 391 328 361 352 266 374Z" fill="#030405" stroke="#444147"/>
      <path d="M410 329 L440 300 548 322 530 370 440 348Z" fill="#030405" stroke="#262a30"/>
      <ellipse cx="316" cy="345" rx="104" ry="52" fill="url(#eyeHalo)" opacity=".4"/>
      <path d="M270 346 L349 325 364 335 282 356" stroke="#f74558" strokeWidth="5" fill="none" filter="url(#eyeGlow)"/>
      <path d="M270 346 L349 325 364 335" stroke="#ff7984" strokeWidth="2" fill="none"/>
      <path d="M440 333 L511 346" stroke="#db3d4f" strokeWidth="1.6" opacity=".6"/>
      <path d="M390 355 L366 449 391 463 420 449 401 356 M366 449 L350 485 391 510 433 482 420 449" fill="none" stroke="#45464a" strokeWidth="1"/>
      <path d="M350 527 L390 536 433 524 418 562 392 576 368 562Z" fill="#08090c" stroke="#282c31"/>
      <path d="M283 403 L303 450 335 473 M511 400 L492 444 453 475 M326 515 L340 565 388 606 M459 512 L445 563 404 606" fill="none" stroke="#464047" strokeWidth="1.5"/>
      <path d="M250 260 L249 299 M265 225 L271 189 M529 196 L545 252 M481 118 L516 158" stroke="#a6575d" fill="none" opacity=".65"/>
      <path d="M291 609 L319 639 314 699 360 743 395 721 434 744 476 701 467 638 480 611" fill="url(#face)" stroke="#38383f"/>
      {[0,1,2,3,4].map(i=><path key={i} d={`M333 ${637+i*15} L388 ${651+i*15} L447 ${637+i*15}`} fill="none" stroke={i===2?'#6f343d':'#36363b'} strokeWidth="3"/>)}
      <path d="M122 773 L266 716 335 774 394 795 455 774 497 720 661 786 M193 756 L236 847 349 900 M569 752 L536 842 438 900" fill="none" stroke="#3a343b"/>
      <path d="M143 809 L240 772 M492 763 L593 807 M394 799 L394 889" stroke="#82363e" fill="none"/>
      <circle cx="393" cy="808" r="6" fill="#d64554" opacity=".6"/>
      <path d="M395 106 L398 213 M405 111 L409 203" stroke="#5b4249" opacity=".5"/>
      {[0,1,2,3,4,5,6].map(i=><circle key={i} cx={251+i*9} cy={239-i*5} r="1" fill="#a19b9a" opacity=".5"/>)}
    </svg>
  </motion.div>;
}

function NeuralCore() {
  return <motion.div className="core-camera" aria-hidden="true" initial={{ opacity: 0, scale: .24, rotate: -22 }}
    animate={{ opacity: [0, .9, 1, 0], scale: [.24, .7, 1.5, 7], rotate: [-22, 0, 16, 34] }}
    transition={{ delay: 2, duration: 2.6, times: [0, .35, .7, 1], ease: [.6, 0, .35, 1] }}>
    <div className="core-halo"/>
    <svg viewBox="0 0 600 600">
      <circle className="core-orbit" cx="300" cy="300" r="246"/><circle className="core-orbit dashed" cx="300" cy="300" r="216"/>
      {Array.from({length:12},(_,i)=><g key={i} transform={`rotate(${i*30} 300 300)`}><path d="M300 91 L314 173 Q319 200 342 216 L373 238" fill="none" stroke={i%3===0?'#ff9b93':'#c34f58'} strokeWidth={i%3===0?3:1.5}/><circle cx="300" cy="85" r="2" fill="#fa7b80"/></g>)}
      <path d="M300 234 L357 267 357 333 300 366 243 333 243 267Z" fill="#08090b" stroke="#fa7b80" strokeWidth="1.5"/>
      <path d="M300 252 L341 276 341 324 300 348 259 324 259 276Z" fill="none" stroke="#d54b5b" strokeOpacity=".5"/>
      <circle cx="300" cy="300" r="10" fill="#db5d68"/>
      <path d="M290 300 H310 M300 290 V310" stroke="#ffccc7"/>
    </svg>
  </motion.div>;
}

function Atmosphere() {
  return <div className="atmosphere" aria-hidden="true">
    {Array.from({length:48},(_,i)=>{
      const angle=i*2.39996; const radius=12+(i%9)*5;
      const x=Math.cos(angle)*radius; const y=Math.sin(angle)*radius;
      return <motion.i key={i} className={`particle ${i%5===0?'soft':''}`} style={{left:`${50+x}%`,top:`${50+y}%`}}
        initial={{opacity:0,scale:.5}} animate={{opacity:[0,.4,.6,0],x:[0,x*.3,x*18],y:[0,y*.3,y*10],scale:[.5,1,i%3===0?8:2]}}
        transition={{delay:(i%8)*.09,duration:5.3,times:[0,.3,.58,1],ease:'easeIn'}}/>;
    })}
    <motion.div className="horizon-light" initial={{opacity:0,scaleX:.3}} animate={{opacity:[0,.25,.7,0],scaleX:[.3,1,1.2,2]}} transition={{duration:6,times:[0,.35,.7,1]}}/>
  </div>;
}

function DataTunnel() {
  return <motion.div className="data-tunnel" initial={{opacity:0}} animate={{opacity:[0,1,1,0]}} transition={{delay:3.7,duration:2.8,times:[0,.15,.78,1]}} aria-hidden="true">
    <div className="tunnel-space">
      {Array.from({length:6},(_,i)=><motion.div key={i} className="tunnel-gate" initial={{z:-1600,rotateZ:-8,opacity:0}} animate={{z:900,rotateZ:4,opacity:[0,.35,.2,0]}} transition={{delay:3.6+i*.19,duration:2.1,ease:'easeIn'}}/>)}
      <svg className="tunnel-rays" viewBox="0 0 1440 810" preserveAspectRatio="none">{Array.from({length:16},(_,i)=>{const a=i*Math.PI/8;return <path key={i} d={`M${720+Math.cos(a)*120} ${405+Math.sin(a)*68} L${720+Math.cos(a)*1100} ${405+Math.sin(a)*700}`}/>;})}</svg>
    </div>
    {fragments.map((f,i)=><motion.div className={`data-fragment fragment-${i}`} key={f.label} style={{left:`${f.x}%`,top:`${f.y}%`}}
      initial={{opacity:0,scale:.18,filter:'blur(6px)',x:(50-f.x)*4,y:(50-f.y)*3}}
      animate={{opacity:[0,.85,1,0],scale:[.18,.8,1,1.8],filter:['blur(6px)','blur(0px)','blur(0px)','blur(5px)'],x:[(50-f.x)*4,0,0,(f.x-50)*13],y:[(50-f.y)*3,0,0,(f.y-50)*8]}}
      transition={{delay:3.95+i*.12,duration:1.6,times:[0,.3,.67,1],ease:'easeIn'}}>
      <span>{f.label}</span><strong>{f.value}</strong>{i % 2 === 0 ? <svg className="fragment-trace" viewBox="0 0 180 35"><polyline points={data.conversionIndex.map((v,j)=>`${j * 11},${4 + (104-v) * 1.1}`).join(' ')} /></svg> : <i className="fragment-rule"/>}
    </motion.div>)}
  </motion.div>;
}

function SignalReveal() {
  const [focused,setFocused]=useState(false);
  useEffect(()=>{const timer=setTimeout(()=>setFocused(true),7800);return()=>clearTimeout(timer);},[]);
  const line=data.conversionIndex.map((v,i)=>`${25+i*34},${30+(104-v)*5.5}`).join(' L ');
  return <motion.section className={`signal-reveal ${focused?'signals-focused':''}`} aria-label="Análise das métricas de produto" initial={{opacity:0,scale:.7,filter:'blur(12px)',rotateX:8}}
    animate={{opacity:1,scale:1,filter:'blur(0px)',rotateX:0}} transition={{delay:5.9,duration:1.8,ease}}>
    <div className="reveal-topline"><span><i/> INTELIGÊNCIA DE PRODUTO</span><span>LEITURA 001 <b>/</b> {data.period.toUpperCase()}</span></div>
    <motion.div className="reveal-heading" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:6.2,duration:1,ease}}>
      <div className="chapter-label">OS DADOS ESCONDEM UMA HISTÓRIA.</div>
      <h1>Como usar o <em>Claude</em><br/>para analisar métricas de produto<span>.</span></h1>
      <div className="heading-side"><Crosshair size={16}/><span>ANÁLISE LOCAL<br/>DADOS FICTÍCIOS</span></div>
    </motion.div>
    <div className="signal-trio">
      <motion.article className="signal signal-conversion" initial={{y:55,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:6.15,duration:1.3,ease}}>
        <span className="signal-label"><small>01 /</small> CONVERSÃO</span>
        <div className="signal-number"><Count value={data.conversionChangePercent} format={percent}/><ArrowUpRight className="down-arrow"/></div>
        <span className="signal-description">Queda no período</span>
      </motion.article>
      <motion.article className="signal signal-android" initial={{y:75,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:6.3,duration:1.3,ease}}>
        <span className="signal-label"><small>02 /</small> ERROS ANDROID <i/></span>
        <div className="signal-number"><Count value={data.androidErrorsChangePercent} format={value => `+${percent(value)}`}/><ArrowUpRight/></div>
        <span className="signal-description">Um sinal pede atenção.</span>
      </motion.article>
      <motion.article className="signal signal-time" initial={{y:95,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:6.45,duration:1.3,ease}}>
        <span className="signal-label"><small>03 /</small> TEMPO NA TAREFA</span>
        <div className="signal-number"><Count value={data.averageTaskTimeSeconds} format={taskTime}/></div>
        <span className="signal-description">Tempo médio de conclusão</span>
      </motion.article>
    </div>
    <div className="signal-details">
      <div className="conversion-trace"><div className="detail-label">TRAJETÓRIA DA CONVERSÃO <span>100 → 82</span></div><svg viewBox="0 0 600 195" role="img" aria-label="Índice de conversão cai de 100 para 82">
        {[52,101,150].map(y=><line key={y} x1="25" x2="570" y1={y} y2={y} className="trace-grid"/>)}
        <motion.path d={`M ${line}`} fill="none" stroke="#c7767d" strokeWidth="2" initial={{pathLength:0}} animate={{pathLength:1}} transition={{delay:6.4,duration:1.4,ease:'easeInOut'}}/>
        <circle cx="569" cy="151" r="3" fill="#ff7d88"/><text x="25" y="186">DIA 01</text><text x="524" y="186">DIA 07</text>
      </svg><div className="trace-caption">ÍNDICE NORMALIZADO · BASE 100 <span>{data.comparison}</span></div></div>
      <div className="platform-signals"><div className="detail-label">SINAIS POR PLATAFORMA <span>ATIVAÇÃO / ERROS DE CONEXÃO</span></div>
        <div className="platform-line ios-line"><span>iOS</span><strong>{percent(data.platforms.ios.activationPercent)}</strong><i/><span>{percent(data.platforms.ios.connectionErrorsPercent)}</span></div>
        <div className="platform-line android-line"><span><i/> Android</span><strong>{percent(data.platforms.android.activationPercent)}</strong><i/><span>{percent(data.platforms.android.connectionErrorsPercent)}</span></div>
        <div className="platform-caption"><span className="alert-pin"/> ANDROID · FOCO DA INVESTIGAÇÃO <ArrowUpRight size={13}/></div>
      </div>
    </div>
    <motion.svg className="signal-connections" viewBox="0 0 1440 810" preserveAspectRatio="none" initial={{opacity:0}} animate={{opacity:.5}} transition={{delay:7.6,duration:1.2}} aria-hidden="true"><path d="M730 400 L730 425 L1168 425 L1168 537"/><path d="M1168 400 V425"/><circle cx="1168" cy="537" r="3"/></motion.svg>
    <motion.div className="final-question" initial={{opacity:0,y:13}} animate={{opacity:1,y:0}} transition={{delay:8.5,duration:1.1,ease}}><span>AGORA, A PERGUNTA CERTA.</span><p>Por onde você investigaria primeiro? <ArrowRight/></p></motion.div>
    <div className="reveal-footer"><span><i/> PROCESSAMENTO CONCLUÍDO</span><span>OBSERVAR. CONECTAR. INVESTIGAR.</span><span>IA / 001</span></div>
  </motion.section>;
}

function CinematicSequence() {
  return <main className="cinema-frame" aria-label="Abertura cinematográfica de métricas de produto">
    <div className="cinema-grain"/><div className="cinema-vignette"/>
    <motion.div className="red-nebula" initial={{opacity:0}} animate={{opacity:[0,.65,.9,.3]}} transition={{duration:8,times:[0,.25,.6,1]}}/>
    <Atmosphere/>
    <motion.section className="opening-scene" initial={{opacity:1}} animate={{opacity:[1,1,0]}} transition={{duration:4.1,times:[0,.72,1]}} aria-label="Entrando no sistema de inteligência artificial">
      <div className="opening-topline"><span className="aperture-mark">◈</span><span>IA / MÉTRICAS DE PRODUTO</span><span className="opening-edition">SEQUÊNCIA 001</span></div>
      <MechanicalFigure/>
      <motion.div className="opening-copy" initial={{opacity:0,x:-12}} animate={{opacity:[0,1,1,0],x:[-12,0,0,-60],filter:['blur(4px)','blur(0px)','blur(0px)','blur(5px)']}} transition={{duration:3.6,times:[0,.3,.65,1]}}>
        <div className="opening-eyebrow"><i/> ALÉM DA SUPERFÍCIE</div><h2>Todo dado<br/>deixa um<br/><em>vestígio.</em></h2><p>Entre no sistema.<br/>Encontre o que os números escondem.</p>
        <div className="opening-index">01 <span>━━━━</span> 03 <span className="index-caption">INICIALIZANDO CONSCIÊNCIA ANALÍTICA</span></div>
      </motion.div>
      {fragments.slice(0,3).map((f,i)=><motion.div className={`hologram holo-${i}`} key={f.label} initial={{opacity:0,y:20}} animate={{opacity:[0,.6,.6,0],y:[20,0,-8,-40]}} transition={{delay:.65+i*.18,duration:2.6,times:[0,.3,.6,1]}}><span>{f.label}</span><strong>{f.value}</strong><div className="holo-ticks">┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊</div></motion.div>)}
      <div className="opening-bottom"><span>CAMADA 01 / PERCEPÇÃO</span><span>AGUARDANDO O SINAL <i/></span></div>
    </motion.section>
    <NeuralCore/>
    <motion.div className="core-caption" initial={{opacity:0}} animate={{opacity:[0,1,0],letterSpacing:['.3em','.45em','.8em']}} transition={{delay:2.25,duration:1.9,times:[0,.35,1]}}>ACESSANDO A CAMADA OCULTA</motion.div>
    <DataTunnel/>
    <SignalReveal/>
    <motion.div className="passage-flash" initial={{opacity:0}} animate={{opacity:[0,.17,0]}} transition={{delay:3.7,duration:.65,times:[0,.3,1]}}/>
    <div className="frame-notch notch-tl"/><div className="frame-notch notch-br"/>
  </main>;
}

function App() {
  const [take,setTake]=useState(0);
  return <div className="studio"><div className="canvas-wrap"><CinematicSequence key={take}/></div><div className="studio-toolbar"><span><i/> COMPOSIÇÃO 16:9 <b>/</b> SEQUÊNCIA CINEMATOGRÁFICA · 10s</span><button onClick={()=>setTake(t=>t+1)}><RotateCcw size={13}/> Replay</button></div></div>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
