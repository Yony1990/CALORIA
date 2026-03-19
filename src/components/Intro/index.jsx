import { useState } from 'react';
import Step1Bienvenida from './steps/Step1Bienvenida';
import Step2Features   from './steps/Step2Features';
import Step3Objetivo   from './steps/Step3Objetivo';
import Step4Perfil     from './steps/Step4Perfil';
import Step5Actividad  from './steps/Step5Actividad';
import Step6Listo      from './steps/Step6Listo';
import './Intro.css';

const TOTAL_STEPS = 6;

export default function Intro({ onComplete }) {
  const [step, setStep] = useState(1);
  const [datos, setDatos] = useState({
    name:             '',
    age:              25,
    sex:              'male',
    weight:           70,
    height:           170,
    goal:             'lose',
    activityLevel:    1.55,
    targetWeightLoss: 0.5,
    dietType:         'balanced',
  });

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const updateDatos = (data) => setDatos(prev => ({ ...prev, ...data }));

  const handleComplete = () => onComplete(datos);

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Bienvenida onNext={next} />;
      case 2: return <Step2Features   onNext={next} onPrev={prev} />;
      case 3: return <Step3Objetivo   onNext={next} onPrev={prev} datos={datos} updateDatos={updateDatos} />;
      case 4: return <Step4Perfil     onNext={next} onPrev={prev} datos={datos} updateDatos={updateDatos} />;
      case 5: return <Step5Actividad  onNext={next} onPrev={prev} datos={datos} updateDatos={updateDatos} />;
      case 6: return <Step6Listo      onComplete={handleComplete} onPrev={prev} datos={datos} />;
      default: return null;
    }
  };

  return (
    <div className="intro-wrapper">
      {/* Progress dots */}
      {step > 1 && (
        <div className="intro-dots">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className={`intro-dot ${i + 1 === step ? 'active' : ''} ${i + 1 < step ? 'done' : ''}`} />
          ))}
        </div>
      )}

      {/* Step content */}
      <div className="intro-content" key={step}>
        {renderStep()}
      </div>
    </div>
  );
}