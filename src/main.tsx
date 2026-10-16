import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { Activity, ArrowDownRight, ArrowUpRight, ArrowRight, RotateCcw, ScanLine, Smartphone, Timer, Crosshair } from 'lucide-react';
import { productMetrics as data } from './data';
import '@fontsource-variable/dm-sans';
import '@fontsource/ibm-plex-mono/400.css';
import './styles.css';

function Count({ value, format = (v: number) => `${Math.round(v)}` }: { value: number; format?: (v: number) => string }) {
  const count = useMotionValue(0);
  const display = useTransform(count, format);
  useEffect(() => { const controls = animate(count, value, { duration: 1.75, delay: .15, ease: 'easeOut' }); return controls.stop; }, [count, value]);
  return <motion.span>{display}</motion.span>;
}
const enter = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };
function Dashboard() {
  const [focus, setFocus] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFocus(true), 4000); return () => clearTimeout(t); }, []);
  const points = data.conversionIndex.map((v, i) => `${64 + i * 56},${65 + (104 - v) * 9}`).join(' ');
  const path = `M ${points.replaceAll(' ', ' L ')}`;
  return <motion.main className={`frame ${focus ? 'focused' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7 }}>
    <motion.div className="grid" initial={{ opacity: 0 }} animate={{ opacity: .45 }} transition={{ duration: 1.8 }} />
    <div className="ambient" />
    <div className="corner tl"/><div className="corner tr"/><div className="corner bl"/><div className="corner br"/>
    <motion.div className="composition" animate={{ scale: focus ? 1.022 : 1, x: focus ? -4 : 0 }} transition={{ duration: 2.5, ease: [.22, 1, .36, 1] }}>
      <header>
        <div className="brand"><span className="brand-icon"><ScanLine size={21}/></span> PRODUCT<span className="brand-light">SIGNALS</span><span className="version">/ 01</span></div>
        <div className="header-right"><span className="status-dot"/> SISTEMA ONLINE <span className="divider"/> DADOS SIMULADOS</div>
      </header>
      <section className="heading">
        <motion.div className="eyebrow" {...enter} transition={{ delay: 1.9, duration: .65 }}><span className="red-line"/> INTELIGÊNCIA DE PRODUTO <span className="muted">/ DIAGNÓSTICO 001</span></motion.div>
        <motion.h1 {...enter} transition={{ delay: 2.1, duration: .8 }}>Como usar o <span>Claude</span> para analisar<br/>métricas de produto<span className="title-dot">.</span></motion.h1>
        <motion.div className="period" {...enter} transition={{ delay: 2.4, duration: .7 }}><span className="tiny-square"/>{data.period}<span className="period-slash">/</span> {data.comparison}</motion.div>
      </section>
      <section className="metrics">
        <motion.article className="metric conversion" {...enter} transition={{ delay: .35, duration: 1.9, ease: 'easeOut' }}>
          <div className="card-top"><span>CONVERSÃO</span><ArrowDownRight size={19}/></div>
          <div className="metric-value"><Count value={data.conversionChangePercent}/><span className="unit">%</span><span className="mini-line"><svg viewBox="0 0 100 40"><path d="M0 7 L15 10 L28 7 L40 20 L52 17 L65 29 L77 25 L100 38"/></svg></span></div>
          <div className="card-bottom"><span className="negative-dot"/> Queda no período <span className="card-index">01</span></div>
        </motion.article>
        <motion.article className="metric android" {...enter} transition={{ delay: .5, duration: 1.9, ease: 'easeOut' }}>
          <div className="card-top"><span>ERROS ANDROID</span><Activity size={18}/></div>
          <div className="metric-value">+<Count value={data.androidErrorsChangePercent}/><span className="unit">%</span><ArrowUpRight className="value-arrow" size={28}/></div>
          <div className="card-bottom"><span className="negative-dot"/> Aumento de erros <span className="card-index">02</span></div>
          <span className="focus-edge"/>
        </motion.article>
        <motion.article className="metric task" {...enter} transition={{ delay: .65, duration: 1.9, ease: 'easeOut' }}>
          <div className="card-top"><span>TEMPO NA TAREFA</span><Timer size={18}/></div>
          <div className="metric-value time"><Count value={data.averageTaskTimeSeconds} format={v => `${Math.floor(Math.round(v) / 60)}min${String(Math.round(v) % 60).padStart(2, '0')}s`}/></div>
          <div className="card-bottom">Tempo médio de conclusão <span className="card-index">03</span></div>
          <span className="focus-edge"/>
        </motion.article>
      </section>
      <section className="analysis">
        <div className="chart-panel">
          <div className="panel-heading"><div><span className="panel-kicker">VISÃO GERAL</span><h2>Evolução da conversão</h2></div><span className="chart-legend"><i/> Índice de conversão</span></div>
          <div className="chart">
            <svg viewBox="0 0 1020 320" role="img" aria-label="Índice de conversão cai de 100 para 82 no período">
              <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f34d58" stopOpacity=".19"/><stop offset="100%" stopColor="#f34d58" stopOpacity="0"/></linearGradient></defs>
              {[100, 90, 80].map(v => <g key={v}><line x1="64" x2="960" y1={65 + (104-v)*9} y2={65 + (104-v)*9} stroke="#ffffff" strokeOpacity=".07" strokeDasharray="3 6"/><text x="4" y={70 + (104-v)*9}>{v}</text></g>)}
              <motion.path d={`${path} L960,285 L64,285 Z`} fill="url(#area)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}/>
              <motion.path d={path} fill="none" stroke="#ed5962" strokeWidth="3" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: .2, duration: 1.8, ease: 'easeInOut' }}/>
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}><circle cx="960" cy="263" r="12" fill="#f44d59" opacity=".13"/><circle cx="960" cy="263" r="4" fill="#ff6972"/><text x="912" y="232" className="end-label">−18%</text></motion.g>
              {['DIA 01', 'DIA 02', 'DIA 03', 'DIA 04', 'DIA 05', 'DIA 06', 'DIA 07'].map((v,i)=><text key={v} x={64+i*149.3} y="316" textAnchor={i===6?'end':'start'}>{v}</text>)}
            </svg>
          </div>
          <div className="chart-note"><Crosshair size={12}/> BASE NORMALIZADA · INÍCIO DO PERÍODO = 100 <span>7 DIAS</span></div>
        </div>
        <motion.aside className="platform-panel" {...enter} transition={{ delay: 1, duration: 1 }}>
          <div className="panel-heading"><div><span className="panel-kicker">POR PLATAFORMA</span><h2>Onde está o sinal?</h2></div><Smartphone size={18}/></div>
          <div className="table-head"><span>PLATAFORMA</span><span>ATIVAÇÃO</span></div>
          <div className="platform ios"><div className="platform-row"><span><span className="os-icon">i</span> iOS</span><strong>{data.platforms.ios.activationPercent}<small>%</small></strong></div><div className="bar"><i style={{ width: '85%' }}/></div><div className="error-row">Erros de conexão <span>{data.platforms.ios.connectionErrorsPercent.toLocaleString('pt-BR')}%</span></div></div>
          <div className="platform android-platform"><div className="platform-row"><span><span className="os-icon"><Smartphone size={13}/></span> Android <span className="signal-dot"/></span><strong>{data.platforms.android.activationPercent}<small>%</small></strong></div><div className="bar"><i style={{ width: '52.5%' }}/></div><div className="error-row">Erros de conexão <span>{data.platforms.android.connectionErrorsPercent.toLocaleString('pt-BR')}%</span></div></div>
          <motion.div className="signal-note" initial={{ opacity: 0 }} animate={{ opacity: focus ? 1 : 0 }} transition={{ duration: .9 }}><span className="signal-dot"/> SINAL PARA INVESTIGAÇÃO <ArrowUpRight size={13}/></motion.div>
        </motion.aside>
      </section>
      <motion.svg className="connections" viewBox="0 0 1440 810" initial={{ opacity: 0 }} animate={{ opacity: focus ? .5 : 0 }} transition={{ duration: 1.6 }}><path d="M720 405 L720 420 L1190 420 L1190 650"/><path d="M1190 405 L1190 420"/><circle cx="1190" cy="650" r="3"/></motion.svg>
      <footer><div className="footer-code"><span className="status-dot"/> PRODUCT ANALYTICS <span>/</span> OBSERVAR. CONECTAR. INVESTIGAR.</div><motion.div className="question" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 6.15, duration: .85 }}>Por onde você investigaria primeiro? <ArrowRight size={17}/></motion.div><span className="footer-number">PS — 001</span></footer>
    </motion.div>
    <motion.div className="scan" initial={{ top: '-10%', opacity: 0 }} animate={{ top: '110%', opacity: [0, .12, 0] }} transition={{ delay: .1, duration: 2.2 }}/>
  </motion.main>;
}
function App() {
 const [take, setTake] = useState(0);
 return <div className="studio"><div className="canvas-wrap"><Dashboard key={take}/></div><div className="studio-toolbar"><span><i/> COMPOSIÇÃO 16:9 <b>/</b> SEQUÊNCIA AUTOMÁTICA · 07s</span><button onClick={()=>setTake(t=>t+1)}><RotateCcw size={13}/> Replay</button></div></div>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
