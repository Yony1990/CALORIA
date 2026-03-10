import { useRef, useState } from 'react';
import './Calculadora.css';

// ── Utilidades ─────────────────────────────────────────
const round1 = v => Math.round(v * 10) / 10;
const round0 = v => Math.round(v);

// ── Card expandible ─────────────────────────────────────
// function CalcCard({ id, icon, title, color, desc, children, openId, setOpenId }) {
//   const isOpen = openId === id;
//   return (
//     <div className={`calc-card ${isOpen ? 'open' : ''}`} style={{ '--card-color': color }}>
//       <button className="calc-card-header" onClick={() => setOpenId(isOpen ? null : id)}>
//         <span className="calc-card-icon">{icon}</span>
//         <div className="calc-card-titles">
//           <span className="calc-card-title">{title}</span>
//           <span className="calc-card-desc">{desc}</span>
//         </div>
//         <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} calc-card-chevron`}></i>
//       </button>
//       {isOpen && <div className="calc-card-body">{children}</div>}
//     </div>
//   );
// }
function CalcCard({ id, icon, title, color, desc, children, openId, setOpenId }) {
  const isOpen = openId === id;
  const cardRef = useRef(null);

  const handleToggle = () => {
    const opening = !isOpen;
    setOpenId(opening ? id : null);
    if (opening) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <div ref={cardRef} className={`calc-card ${isOpen ? 'open' : ''}`} style={{ '--card-color': color }}>
      <button className="calc-card-header" onClick={handleToggle}>
        <span className="calc-card-icon">{icon}</span>
        <div className="calc-card-titles">
          <span className="calc-card-title">{title}</span>
          <span className="calc-card-desc">{desc}</span>
        </div>
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} calc-card-chevron`}></i>
      </button>
      {isOpen && <div className="calc-card-body">{children}</div>}
    </div>
  );
}

// ── Componente de resultado ─────────────────────────────
function Result({ label, value, unit, color, highlight }) {
  return (
    <div className={`calc-result ${highlight ? 'highlight' : ''}`} style={{ borderColor: color }}>
      <span className="calc-result-label">{label}</span>
      <span className="calc-result-value" style={{ color }}>{value} <span className="calc-result-unit">{unit}</span></span>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'number', min, max, step = 1, unit }) {
  return (
    <div className="calc-field">
      <label className="calc-label">{label}</label>
      <div className="calc-input-wrap">
        <input
          type={type} value={value}
          onChange={e => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          min={min} max={max} step={step}
          className="calc-input"
        />
        {unit && <span className="calc-input-unit">{unit}</span>}
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="calc-field">
      <label className="calc-label">{label}</label>
      <select className="calc-input" value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// 1. PESO IDEAL Y TIEMPO
// ══════════════════════════════════════════════════════
function CalcPesoIdeal({ profile }) {
  const [peso,   setPeso]   = useState(profile.weight  || 70);
  const [altura, setAltura] = useState(profile.height  || 170);
  const [sexo,   setSexo]   = useState(profile.sex     || 'male');
  const [ritmo,  setRitmo]  = useState(0.5);

  const pesoIdealDevine   = sexo === 'male' ? 50  + 2.3 * ((altura / 2.54) - 60) : 45.5 + 2.3 * ((altura / 2.54) - 60);
  const pesoIdealRobinson = sexo === 'male' ? 52  + 1.9 * ((altura / 2.54) - 60) : 49   + 1.7 * ((altura / 2.54) - 60);
  const pesoIdealMiller   = sexo === 'male' ? 56.2 + 1.41 * ((altura / 2.54) - 60) : 53.1 + 1.36 * ((altura / 2.54) - 60);
  const pesoIdealPromedio = round1((pesoIdealDevine + pesoIdealRobinson + pesoIdealMiller) / 3);

  const diff     = round1(Math.abs(peso - pesoIdealPromedio));
  const semanas  = round0(diff / ritmo * 7);
  const meses    = round1(semanas / 4.33);
  const accion   = peso > pesoIdealPromedio ? 'bajar' : 'ganar';

  const alturaM  = altura / 100;
  const bmiMin   = round1(18.5 * alturaM * alturaM);
  const bmiMax   = round1(24.9 * alturaM * alturaM);

  return (
    <div className="calc-content">
      <div className="calc-inputs">
        <SelectField label="Sexo" value={sexo} onChange={setSexo} options={[{value:'male',label:'Masculino'},{value:'female',label:'Femenino'}]} />
        <InputField  label="Altura" value={altura} onChange={setAltura} min={140} max={220} unit="cm" />
        <InputField  label="Peso actual" value={peso} onChange={setPeso} min={30} max={250} unit="kg" />
        <SelectField label="Ritmo de cambio" value={ritmo} onChange={v => setRitmo(Number(v))} options={[
          {value:0.25,label:'Suave (0.25 kg/sem)'},
          {value:0.5, label:'Moderado (0.5 kg/sem)'},
          {value:0.75,label:'Intenso (0.75 kg/sem)'},
          {value:1,   label:'Agresivo (1 kg/sem)'},
        ]} />
      </div>
      <div className="calc-results">
        <Result label="Peso ideal promedio"  value={pesoIdealPromedio} unit="kg"    color="var(--accent-green)"  highlight />
        <Result label="Rango saludable IMC"  value={`${bmiMin} – ${bmiMax}`} unit="kg" color="var(--accent-blue)" />
        <Result label={`Necesitás ${accion}`} value={diff}             unit="kg"    color="var(--accent-orange)" />
        <Result label="Tiempo estimado"      value={`${semanas} sem (${meses} meses)`} unit="" color="var(--accent-yellow)" highlight />
      </div>
      <div className="calc-note">
        <i className="bi bi-info-circle"></i>
        Promedio de las fórmulas de Devine, Robinson y Miller. El tiempo es aproximado basado en un déficit/superávit de {ritmo} kg/semana.
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// 2. CALORÍAS META
// ══════════════════════════════════════════════════════
function CalcCalorias({ profile }) {
  const [peso,      setPeso]      = useState(profile.weight       || 70);
  const [altura,    setAltura]    = useState(profile.height       || 170);
  const [edad,      setEdad]      = useState(profile.age          || 25);
  const [sexo,      setSexo]      = useState(profile.sex          || 'male');
  const [actividad, setActividad] = useState(profile.activityLevel|| 1.55);

  const bmr  = sexo === 'male'
    ? 10 * peso + 6.25 * altura - 5 * edad + 5
    : 10 * peso + 6.25 * altura - 5 * edad - 161;
  const tdee = round0(bmr * actividad);

  const metas = [
    { label: 'Bajar 1 kg/sem (agresivo)',   cal: round0(tdee - 1100), color: 'var(--accent-orange)' },
    { label: 'Bajar 0.5 kg/sem',            cal: round0(tdee - 550),  color: 'var(--accent-yellow)' },
    { label: 'Mantener peso',               cal: tdee,                color: 'var(--accent-blue)',  highlight: true },
    { label: 'Ganar 0.25 kg/sem (limpio)',  cal: round0(tdee + 275),  color: 'var(--accent-green)'  },
    { label: 'Ganar 0.5 kg/sem',            cal: round0(tdee + 550),  color: 'var(--accent-green)'  },
  ];

  return (
    <div className="calc-content">
      <div className="calc-inputs">
        <SelectField label="Sexo" value={sexo} onChange={setSexo} options={[{value:'male',label:'Masculino'},{value:'female',label:'Femenino'}]} />
        <InputField  label="Edad"   value={edad}   onChange={setEdad}   min={10} max={100} unit="años" />
        <InputField  label="Peso"   value={peso}   onChange={setPeso}   min={30} max={250} unit="kg"   />
        <InputField  label="Altura" value={altura} onChange={setAltura} min={140} max={220} unit="cm"  />
        <SelectField label="Actividad" value={actividad} onChange={v => setActividad(Number(v))} options={[
          {value:1.2,  label:'Sedentario (sin ejercicio)'},
          {value:1.375,label:'Ligero (1-3 días/sem)'},
          {value:1.55, label:'Moderado (3-5 días/sem)'},
          {value:1.725,label:'Activo (6-7 días/sem)'},
          {value:1.9,  label:'Muy activo (2x/día)'},
        ]} />
      </div>
      <div className="calc-results">
        <Result label="TMB (metabolismo basal)" value={round0(bmr)} unit="kcal/día" color="var(--accent-blue)" />
        <Result label="TDEE (gasto total)"      value={tdee}        unit="kcal/día" color="var(--accent-green)" highlight />
        {metas.map((m, i) => <Result key={i} label={m.label} value={m.cal} unit="kcal" color={m.color} highlight={m.highlight} />)}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// 3. MASA MUSCULAR MÁXIMA (Casey Butt)
// ══════════════════════════════════════════════════════
function CalcMasaMuscular({ profile }) {
  const [altura,  setAltura]  = useState(profile.height || 170);
  const [muneca,  setMuneca]  = useState(17);
  const [tobillo, setTobillo] = useState(23);
  const [grasa,   setGrasa]   = useState(10);

  const hIn    = altura / 2.54;
  const wIn    = muneca / 2.54;
  const aIn    = tobillo / 2.54;
  const bf     = grasa / 100;

  // Fórmula Casey Butt
  const lbm = (altura / 2.54) * 2.204 * (
    (wIn * 0.1132 + aIn * 0.0904 + hIn * 0.0083) /
    (1 - bf)
  ) / 2.204;

  const pesoMaxkg = round1(lbm / (1 - bf));
  const muscMax   = round1(lbm);

  const pesoActual   = profile.weight || 70;
  const musculoExtra = round1(Math.max(muscMax - (pesoActual * (1 - bf)), 0));

  return (
    <div className="calc-content">
      <div className="calc-inputs">
        <InputField label="Altura"          value={altura}  onChange={setAltura}  min={140} max={220} unit="cm" />
        <InputField label="Perímetro muñeca" value={muneca}  onChange={setMuneca}  min={12}  max={25}  unit="cm" step={0.5} />
        <InputField label="Perímetro tobillo" value={tobillo} onChange={setTobillo} min={18}  max={32}  unit="cm" step={0.5} />
        <InputField label="% grasa corporal actual" value={grasa} onChange={setGrasa} min={3} max={40} unit="%" />
      </div>
      <div className="calc-results">
        <Result label="Masa muscular máxima natural" value={muscMax}    unit="kg"  color="var(--accent-green)"  highlight />
        <Result label="Peso corporal máximo (10% grasa)" value={pesoMaxkg} unit="kg" color="var(--accent-blue)" />
        <Result label="Músculo que podés ganar aún"  value={musculoExtra} unit="kg" color="var(--accent-orange)" />
      </div>
      <div className="calc-note">
        <i className="bi bi-info-circle"></i>
        Basado en la fórmula de Casey Butt. Representa el límite superior natural sin sustancias. Varía según genética.
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// 4. RATIO CINTURA/CADERA
// ══════════════════════════════════════════════════════
function CalcCinturaCadera({ profile }) {
  const [sexo,    setSexo]    = useState(profile.sex || 'male');
  const [cintura, setCintura] = useState(90);
  const [cadera,  setCadera]  = useState(100);
  const [altura,  setAltura]  = useState(profile.height || 170);

  const rcc   = round1(cintura / cadera * 10) / 10;
  const whtr  = round1(cintura / altura * 100) / 100;

  const getRccRiesgo = () => {
    if (sexo === 'male') {
      if (rcc < 0.9)  return { label: 'Riesgo bajo',    color: 'var(--accent-green)'  };
      if (rcc < 1.0)  return { label: 'Riesgo moderado',color: 'var(--accent-yellow)' };
      return              { label: 'Riesgo alto',     color: 'var(--accent-orange)' };
    } else {
      if (rcc < 0.8)  return { label: 'Riesgo bajo',    color: 'var(--accent-green)'  };
      if (rcc < 0.85) return { label: 'Riesgo moderado',color: 'var(--accent-yellow)' };
      return              { label: 'Riesgo alto',     color: 'var(--accent-orange)' };
    }
  };

  const getWhtrRiesgo = () => {
    if (whtr < 0.4)  return { label: 'Bajo peso',     color: 'var(--accent-blue)'   };
    if (whtr < 0.5)  return { label: 'Saludable',     color: 'var(--accent-green)'  };
    if (whtr < 0.6)  return { label: 'Sobrepeso',     color: 'var(--accent-yellow)' };
    return               { label: 'Obesidad',       color: 'var(--accent-orange)' };
  };

  const rccR  = getRccRiesgo();
  const whtrR = getWhtrRiesgo();

  return (
    <div className="calc-content">
      <div className="calc-inputs">
        <SelectField label="Sexo"    value={sexo}    onChange={setSexo}    options={[{value:'male',label:'Masculino'},{value:'female',label:'Femenino'}]} />
        <InputField  label="Cintura" value={cintura} onChange={setCintura} min={50} max={180} unit="cm" />
        <InputField  label="Cadera"  value={cadera}  onChange={setCadera}  min={60} max={180} unit="cm" />
        <InputField  label="Altura"  value={altura}  onChange={setAltura}  min={140} max={220} unit="cm" />
      </div>
      <div className="calc-results">
        <Result label="Ratio cintura/cadera (RCC)" value={round1(rcc)} unit="" color={rccR.color} highlight />
        <Result label="Riesgo cardiovascular RCC"  value={rccR.label}  unit="" color={rccR.color} />
        <Result label="Ratio cintura/altura (RCE)" value={whtr}        unit="" color={whtrR.color} highlight />
        <Result label="Clasificación RCE"          value={whtrR.label} unit="" color={whtrR.color} />
      </div>
      <div className="calc-note">
        <i className="bi bi-info-circle"></i>
        OMS: RCC ideal {'<'}0.9 (hombres) y {'<'}0.8 (mujeres). RCE saludable: entre 0.4 y 0.5.
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// 5. % GRASA CORPORAL (Navy Method)
// ══════════════════════════════════════════════════════
function CalcGrasaCorporal({ profile }) {
  const [sexo,    setSexo]    = useState(profile.sex || 'male');
  const [altura,  setAltura]  = useState(profile.height || 170);
  const [cuello,  setCuello]  = useState(38);
  const [cintura, setCintura] = useState(90);
  const [cadera,  setCadera]  = useState(100);

  let bf;
  if (sexo === 'male') {
    bf = 495 / (1.0324 - 0.19077 * Math.log10(cintura - cuello) + 0.15456 * Math.log10(altura)) - 450;
  } else {
    bf = 495 / (1.29579 - 0.35004 * Math.log10(cintura + cadera - cuello) + 0.22100 * Math.log10(altura)) - 450;
  }
  bf = Math.max(3, round1(bf));

  const peso       = profile.weight || 70;
  const masaGrasa  = round1(peso * bf / 100);
  const masaMagra  = round1(peso - masaGrasa);

  const getCategoria = () => {
    if (sexo === 'male') {
      if (bf < 6)   return { label: 'Atlético esencial', color: 'var(--accent-blue)'   };
      if (bf < 14)  return { label: 'Atlético',          color: 'var(--accent-green)'  };
      if (bf < 18)  return { label: 'Fitness',           color: 'var(--accent-green)'  };
      if (bf < 25)  return { label: 'Aceptable',         color: 'var(--accent-yellow)' };
      return             { label: 'Obesidad',           color: 'var(--accent-orange)' };
    } else {
      if (bf < 14)  return { label: 'Esencial',          color: 'var(--accent-blue)'   };
      if (bf < 21)  return { label: 'Atlético',          color: 'var(--accent-green)'  };
      if (bf < 25)  return { label: 'Fitness',           color: 'var(--accent-green)'  };
      if (bf < 32)  return { label: 'Aceptable',         color: 'var(--accent-yellow)' };
      return             { label: 'Obesidad',           color: 'var(--accent-orange)' };
    }
  };

  const cat = getCategoria();

  return (
    <div className="calc-content">
      <div className="calc-inputs">
        <SelectField label="Sexo"    value={sexo}    onChange={setSexo}    options={[{value:'male',label:'Masculino'},{value:'female',label:'Femenino'}]} />
        <InputField  label="Altura"  value={altura}  onChange={setAltura}  min={140} max={220} unit="cm" />
        <InputField  label="Cuello"  value={cuello}  onChange={setCuello}  min={25}  max={60}  unit="cm" step={0.5} />
        <InputField  label="Cintura (a nivel ombligo)" value={cintura} onChange={setCintura} min={50} max={180} unit="cm" />
        {sexo === 'female' && <InputField label="Cadera (parte más ancha)" value={cadera} onChange={setCadera} min={60} max={180} unit="cm" />}
      </div>
      <div className="calc-results">
        <Result label="% Grasa corporal"  value={`${bf}%`}  unit=""   color={cat.color} highlight />
        <Result label="Categoría"         value={cat.label} unit=""   color={cat.color} />
        <Result label="Masa grasa"        value={masaGrasa} unit="kg" color="var(--accent-orange)" />
        <Result label="Masa magra (músculo + hueso)" value={masaMagra} unit="kg" color="var(--accent-green)" />
      </div>
      <div className="calc-note">
        <i className="bi bi-info-circle"></i>
        Método de la Marina de EE.UU. Precisión ±3-4%. Para mayor exactitud usá DEXA o plicometría.
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// 6. HIDRATACIÓN DIARIA
// ══════════════════════════════════════════════════════
function CalcHidratacion({ profile }) {
  const [peso,      setPeso]      = useState(profile.weight        || 70);
  const [actividad, setActividad] = useState('moderado');
  const [clima,     setClima]     = useState('templado');
  const [edad,      setEdad]      = useState(profile.age           || 25);

  const base = peso * 35; // ml base
  const actExtra = { sedentario: 0, ligero: 350, moderado: 500, intenso: 700, atletico: 1000 };
  const climaExtra = { frio: -200, templado: 0, calido: 300, muyCalido: 500 };
  const edadFactor = edad > 55 ? 1.1 : 1;

  const totalMl  = round0((base + actExtra[actividad] + climaExtra[clima]) * edadFactor);
  const totalL   = round1(totalMl / 1000);
  const vasos    = round0(totalMl / 250);
  const botellas = round1(totalMl / 500);

  return (
    <div className="calc-content">
      <div className="calc-inputs">
        <InputField  label="Peso"    value={peso} onChange={setPeso} min={30} max={250} unit="kg" />
        <InputField  label="Edad"    value={edad} onChange={setEdad} min={10} max={100} unit="años" />
        <SelectField label="Nivel de actividad" value={actividad} onChange={setActividad} options={[
          {value:'sedentario', label:'Sedentario'},
          {value:'ligero',     label:'Ligero (caminar)'},
          {value:'moderado',   label:'Moderado (ejercicio 3-5x)'},
          {value:'intenso',    label:'Intenso (6-7x/sem)'},
          {value:'atletico',   label:'Atlético (2x/día)'},
        ]} />
        <SelectField label="Clima/temperatura" value={clima} onChange={setClima} options={[
          {value:'frio',      label:'Frío (<15°C)'},
          {value:'templado',  label:'Templado (15-25°C)'},
          {value:'calido',    label:'Cálido (25-35°C)'},
          {value:'muyCalido', label:'Muy cálido (>35°C)'},
        ]} />
      </div>
      <div className="calc-results">
        <Result label="Agua diaria recomendada" value={totalL}   unit="litros" color="var(--accent-blue)"  highlight />
        <Result label="En mililitros"           value={totalMl}  unit="ml"     color="var(--accent-blue)"  />
        <Result label="Vasos de 250ml"          value={vasos}    unit="vasos"  color="var(--accent-green)" highlight />
        <Result label="Botellas de 500ml"       value={botellas} unit="bot."   color="var(--accent-green)" />
      </div>
      <div className="calc-note">
        <i className="bi bi-info-circle"></i>
        Incluye agua de todas las fuentes (bebidas y alimentos). En días de mucho calor o ejercicio intenso, aumentá un 20%.
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// 7. RECUPERACIÓN MUSCULAR
// ══════════════════════════════════════════════════════
function CalcRecuperacion({ profile }) {
  const [nivel,     setNivel]     = useState('intermedio');
  const [grupoMus,  setGrupoMus]  = useState('grande');
  const [intensidad,setIntensidad]= useState('moderada');
  const [edad,      setEdad]      = useState(profile.age || 25);
  const [sueño,     setSueno]     = useState(7);
  const [estres,    setEstres]    = useState('bajo');

  const baseRec = {
    pequeño: { baja: 24, moderada: 36, alta: 48 },
    mediano: { baja: 36, moderada: 48, alta: 60 },
    grande:  { baja: 48, moderada: 60, alta: 72 },
  };

  let horas = baseRec[grupoMus][intensidad];
  if (nivel === 'principiante') horas *= 1.3;
  if (nivel === 'avanzado')     horas *= 0.85;
  if (edad > 40)  horas *= 1.2;
  if (edad > 50)  horas *= 1.35;
  if (sueño < 6)  horas *= 1.25;
  if (sueño >= 8) horas *= 0.9;
  if (estres === 'alto')   horas *= 1.2;
  if (estres === 'muy alto') horas *= 1.35;

  horas = round0(horas);
  const dias = round1(horas / 24);

  const frecSemanal = grupoMus === 'grande'
    ? (horas <= 48 ? '2-3x por semana' : horas <= 60 ? '2x por semana' : '1-2x por semana')
    : (horas <= 36 ? '3x por semana'   : '2-3x por semana');

  const suenoIdeal = edad < 26 ? '8-10h' : edad < 65 ? '7-9h' : '7-8h';

  return (
    <div className="calc-content">
      <div className="calc-inputs">
        <SelectField label="Nivel de entrenamiento" value={nivel} onChange={setNivel} options={[
          {value:'principiante', label:'Principiante (<1 año)'},
          {value:'intermedio',   label:'Intermedio (1-3 años)'},
          {value:'avanzado',     label:'Avanzado (>3 años)'},
        ]} />
        <SelectField label="Grupo muscular" value={grupoMus} onChange={setGrupoMus} options={[
          {value:'pequeño', label:'Pequeño (bíceps, tríceps, hombro)'},
          {value:'mediano', label:'Mediano (espalda alta, pecho)'},
          {value:'grande',  label:'Grande (espalda, piernas, glúteos)'},
        ]} />
        <SelectField label="Intensidad del entreno" value={intensidad} onChange={setIntensidad} options={[
          {value:'baja',     label:'Baja (cardio suave, movilidad)'},
          {value:'moderada', label:'Moderada (pesas normales)'},
          {value:'alta',     label:'Alta (al fallo, HIIT)'},
        ]} />
        <InputField  label="Edad"          value={edad}  onChange={setEdad}  min={10} max={80} unit="años" />
        <InputField  label="Horas de sueño (promedio)" value={sueño} onChange={setSueno} min={3} max={12} unit="h" step={0.5} />
        <SelectField label="Nivel de estrés" value={estres} onChange={setEstres} options={[
          {value:'bajo',     label:'Bajo'},
          {value:'moderado', label:'Moderado'},
          {value:'alto',     label:'Alto'},
          {value:'muy alto', label:'Muy alto'},
        ]} />
      </div>
      <div className="calc-results">
        <Result label="Tiempo de recuperación"     value={horas}        unit="horas"      color="var(--accent-green)"  highlight />
        <Result label="En días"                    value={dias}         unit="días"       color="var(--accent-green)"  />
        <Result label="Frecuencia recomendada"     value={frecSemanal}  unit=""           color="var(--accent-blue)"   highlight />
        <Result label="Sueño ideal para tu edad"   value={suenoIdeal}   unit="por noche"  color="var(--accent-yellow)" />
      </div>
      <div className="calc-note">
        <i className="bi bi-info-circle"></i>
        La recuperación depende también de la nutrición post-entreno. Consumí proteínas dentro de las 2h posteriores al ejercicio.
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════
export default function Calculadora({ appState }) {
  const { profile } = appState;
  const [openId, setOpenId] = useState('peso');

  const CARDS = [
    { id:'peso',       icon:'🎯', color:'var(--accent-green)',  title:'Peso Ideal',              desc:'Calculá tu peso ideal y tiempo estimado para llegar',       component: <CalcPesoIdeal    profile={profile} /> },
    { id:'calorias',   icon:'🔥', color:'var(--accent-orange)', title:'Calorías Meta',           desc:'TMB, TDEE y calorías para cada objetivo',                   component: <CalcCalorias     profile={profile} /> },
    { id:'muscular',   icon:'💪', color:'var(--accent-blue)',   title:'Masa Muscular Máxima',    desc:'Límite natural de masa muscular (fórmula Casey Butt)',        component: <CalcMasaMuscular profile={profile} /> },
    { id:'cintura',    icon:'❤️', color:'var(--accent-yellow)', title:'Cintura/Cadera',          desc:'Ratio cintura-cadera y riesgo cardiovascular',               component: <CalcCinturaCadera profile={profile} /> },
    { id:'grasa',      icon:'🫁', color:'var(--accent-orange)', title:'% Grasa Corporal',        desc:'Porcentaje de grasa con el método Navy de precisión',        component: <CalcGrasaCorporal profile={profile} /> },
    { id:'hidratacion',icon:'💧', color:'var(--accent-blue)',   title:'Hidratación Diaria',      desc:'Agua recomendada según peso, actividad y clima',             component: <CalcHidratacion  profile={profile} /> },
    { id:'recuperacion',icon:'😴',color:'var(--accent-green)',  title:'Recuperación Muscular',   desc:'Tiempo óptimo de descanso entre entrenamientos',             component: <CalcRecuperacion profile={profile} /> },
  ];

  return (
    <div className="calculadora-page">
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Herramientas</p>
          <h2 className="page-title">Calculadora de Objetivos</h2>
        </div>
        <span className="badge badge-green">
          <i className="bi bi-calculator"></i> 7 calculadoras
        </span>
      </div>

      <p className="calc-intro animate-fade-up-2">
        Todos los datos se pre-cargan desde tu perfil. Podés ajustarlos para simular diferentes escenarios.
      </p>

      <div className="calc-cards animate-fade-up-3">
        {CARDS.map(c => (
          <CalcCard key={c.id} id={c.id} icon={c.icon} color={c.color}
            title={c.title} desc={c.desc} openId={openId} setOpenId={setOpenId}>
            {c.component}
          </CalcCard>
        ))}
      </div>
    </div>
  );
}