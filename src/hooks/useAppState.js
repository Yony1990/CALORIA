import { useState, useCallback } from 'react';
import { foodDatabase, recetas as recetasDB } from '../data/database';

const defaultProfile = {
  name: '',
  age: 25,
  sex: 'male',
  weight: 70,
  height: 170,
  activityLevel: 1.55,
  goal: 'lose',
  dietType: 'balanced',
  targetWeightLoss: 0.5,
};

const defaultTracking = {
  water: 0,
  waterGoal: 8,
  currentWeight: 70,
  bodyFat: null,
  waist: null,
  hip: null,
  chest: null,
  arms: null,
};

const defaultMeals = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snacks: [],
};

export function useAppState() {

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('caloria_profile');
    if (saved) return JSON.parse(saved);
    if (!localStorage.getItem('caloria_peso_inicial')) {
      localStorage.setItem('caloria_peso_inicial', String(defaultProfile.weight));
    }
    return defaultProfile;
  });

  const [tracking, setTracking] = useState(() => {
    const saved = localStorage.getItem('caloria_tracking');
    return saved ? JSON.parse(saved) : { ...defaultTracking, currentWeight: profile?.weight || 70 };
  });

  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem('caloria_meals');
    return saved ? JSON.parse(saved) : defaultMeals;
  });

  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem('caloria_exercises');
    return saved ? JSON.parse(saved) : [];
  });

  const [weightHistory, setWeightHistory] = useState(() => {
    const saved = localStorage.getItem('caloria_weight_history');
    return saved ? JSON.parse(saved) : [];
  });

  const saveProfile = useCallback((data) => {
    const updated = { ...profile, ...data };
    setProfile(updated);
    localStorage.setItem('caloria_profile', JSON.stringify(updated));
    if (!localStorage.getItem('caloria_peso_inicial') && data.weight) {
      localStorage.setItem('caloria_peso_inicial', String(data.weight));
    }
  }, [profile]);

  const saveTracking = useCallback((data) => {
    const updated = { ...tracking, ...data };
    setTracking(updated);
    localStorage.setItem('caloria_tracking', JSON.stringify(updated));
  }, [tracking]);

  const addMealItem = useCallback((mealType, item) => {
    setMeals(prev => {
      const updated = {
        ...prev,
        [mealType]: [...prev[mealType], {
          ...item,
          id: Date.now() + Math.random(),
          timestamp: new Date().toISOString()
        }]
      };
      localStorage.setItem('caloria_meals', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeMealItem = useCallback((mealType, itemId) => {
    setMeals(prev => {
      const updated = {
        ...prev,
        [mealType]: prev[mealType].filter(i => i.id !== itemId)
      };
      localStorage.setItem('caloria_meals', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addExercise = useCallback((exercise) => {
    setExercises(prev => {
      const updated = [...prev, { ...exercise, id: Date.now() + Math.random(), timestamp: new Date().toISOString() }];
      localStorage.setItem('caloria_exercises', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeExercise = useCallback((id) => {
    setExercises(prev => {
      const updated = prev.filter(e => e.id !== id);
      localStorage.setItem('caloria_exercises', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const logWeight = useCallback((weight) => {
    const entry = { weight, date: new Date().toISOString() };
    const updated = [...weightHistory, entry].slice(-90);
    setWeightHistory(updated);
    localStorage.setItem('caloria_weight_history', JSON.stringify(updated));
    saveTracking({ currentWeight: weight });
  }, [weightHistory, saveTracking]);

  const addWater = useCallback(() => {
    saveTracking({ water: Math.min(tracking.water + 1, 20) });
  }, [tracking, saveTracking]);

  const removeWater = useCallback(() => {
    saveTracking({ water: Math.max(tracking.water - 1, 0) });
  }, [tracking, saveTracking]);

  // ===== CALORIE CALCULATIONS =====
  const calculateBMR = useCallback(() => {
    const { sex, weight, height, age } = profile;
    if (sex === 'male') return 10 * weight + 6.25 * height - 5 * age + 5;
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }, [profile]);

  const calculateTDEE = useCallback(() => {
    return Math.round(calculateBMR() * profile.activityLevel);
  }, [calculateBMR, profile]);

  const calculateTargetCalories = useCallback(() => {
    const tdee = calculateTDEE();
    if (profile.goal === 'lose') return tdee - (profile.targetWeightLoss * 1100);
    if (profile.goal === 'gain') return tdee + 300;
    return tdee;
  }, [calculateTDEE, profile]);

  const calculateBMI = useCallback(() => {
    const heightM = profile.height / 100;
    return (profile.weight / (heightM * heightM)).toFixed(1);
  }, [profile]);

  const getBMICategory = useCallback(() => {
    const bmi = parseFloat(calculateBMI());
    if (bmi < 18.5) return { label: 'Bajo peso',  color: 'var(--accent-blue)'   };
    if (bmi < 25)   return { label: 'Normal',      color: 'var(--accent-green)'  };
    if (bmi < 30)   return { label: 'Sobrepeso',   color: 'var(--accent-yellow)' };
    return               { label: 'Obesidad',    color: 'var(--accent-orange)' };
  }, [calculateBMI]);

  // ===== TOTALS =====
  const getTotalConsumed = useCallback(() => {
    const allMeals = [...meals.breakfast, ...meals.lunch, ...meals.dinner, ...meals.snacks];

    const totals = allMeals.reduce((totals, item) => {
      if (item.esReceta) {
        const receta = recetasDB.find(r => r.id === item.id);
        if (receta?.ingredientes) {
          receta.ingredientes.forEach(ing => {
            const food = foodDatabase.find(f => f.id === ing.id);
            if (!food) return;
            const ratio = ing.grams / 100;
            totals.cal     += food.cal     * ratio;
            totals.protein += food.protein * ratio;
            totals.carbs   += food.carbs   * ratio;
            totals.fat     += food.fat     * ratio;
            totals.fiber   += (food.fiber  || 0) * ratio;
          });
        }
        return totals;
      }

      const ratio = item.grams / 100;
      totals.cal     += item.cal     * ratio;
      totals.protein += item.protein * ratio;
      totals.carbs   += item.carbs   * ratio;
      totals.fat     += item.fat     * ratio;
      totals.fiber   += (item.fiber  || 0) * ratio;
      return totals;
    }, { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

    return {
      cal:     Math.round(totals.cal),
      protein: Math.round(totals.protein),
      carbs:   Math.round(totals.carbs),
      fat:     Math.round(totals.fat),
      fiber:   Math.round(totals.fiber),
    };
  }, [meals]);

  const getTotalBurned = useCallback(() => {
    return Math.round(exercises.reduce((s, e) => s + e.calBurned, 0));
  }, [exercises]);

  const getMacroGoals = useCallback(() => {
    const targetCal = calculateTargetCalories();
    return {
      protein: Math.round((targetCal * 0.30) / 4),
      carbs:   Math.round((targetCal * 0.40) / 4),
      fat:     Math.round((targetCal * 0.30) / 9),
    };
  }, [calculateTargetCalories]);

  const getMicronutrients = useCallback(() => {
    const allMeals = [...meals.breakfast, ...meals.lunch, ...meals.dinner, ...meals.snacks];

    const totals = allMeals.reduce((acc, item) => {

      // Si es receta, sumar micros de cada ingrediente
      if (item.esReceta) {
        const receta = recetasDB.find(r => r.id === item.id);
        if (receta?.ingredientes) {
          receta.ingredientes.forEach(ing => {
            const food = foodDatabase.find(f => f.id === ing.id);
            if (!food) return;
            const ratio = ing.grams / 100;
            acc.vitC      += (food.vitC      || 0) * ratio;
            acc.vitD      += (food.vitD      || 0) * ratio;
            acc.vitB12    += (food.vitB12    || 0) * ratio;
            acc.iron      += (food.iron      || 0) * ratio;
            acc.calcium   += (food.calcium   || 0) * ratio;
            acc.magnesium += (food.magnesium || 0) * ratio;
            acc.zinc      += (food.zinc      || 0) * ratio;
            acc.potassium += (food.potassium || 0) * ratio;
            acc.omega3    += (food.omega3    || 0) * ratio;
            acc.fiber     += (food.fiber     || 0) * ratio;
          });
        }
        return acc;
      }

      // Alimento normal
      const ratio = item.grams / 100;
      acc.vitC      += (item.vitC      || 0) * ratio;
      acc.vitD      += (item.vitD      || 0) * ratio;
      acc.vitB12    += (item.vitB12    || 0) * ratio;
      acc.iron      += (item.iron      || 0) * ratio;
      acc.calcium   += (item.calcium   || 0) * ratio;
      acc.magnesium += (item.magnesium || 0) * ratio;
      acc.zinc      += (item.zinc      || 0) * ratio;
      acc.potassium += (item.potassium || 0) * ratio;
      acc.omega3    += (item.omega3    || 0) * ratio;
      acc.fiber     += (item.fiber     || 0) * ratio;
      return acc;

    }, { vitC:0, vitD:0, vitB12:0, iron:0, calcium:0, magnesium:0, zinc:0, potassium:0, omega3:0, fiber:0 });

    return {
      vitC:      { name:'Vitamina C',   unit:'mg',  goal:90,   icon:'bi-brightness-high',  cur: Math.round(totals.vitC)              },
      vitD:      { name:'Vitamina D',   unit:'UI',  goal:600,  icon:'bi-sun',              cur: Math.round(totals.vitD * 40)         },
      vitB12:    { name:'Vitamina B12', unit:'mcg', goal:2.4,  icon:'bi-capsule',          cur: parseFloat(totals.vitB12.toFixed(1)) },
      iron:      { name:'Hierro',       unit:'mg',  goal:18,   icon:'bi-droplet-fill',     cur: parseFloat(totals.iron.toFixed(1))   },
      calcium:   { name:'Calcio',       unit:'mg',  goal:1000, icon:'bi-gem',              cur: Math.round(totals.calcium)           },
      magnesium: { name:'Magnesio',     unit:'mg',  goal:400,  icon:'bi-lightning-charge', cur: Math.round(totals.magnesium)         },
      zinc:      { name:'Zinc',         unit:'mg',  goal:11,   icon:'bi-shield-check',     cur: parseFloat(totals.zinc.toFixed(1))   },
      potassium: { name:'Potasio',      unit:'mg',  goal:3500, icon:'bi-heart-pulse',      cur: Math.round(totals.potassium)         },
      omega3:    { name:'Omega-3',      unit:'g',   goal:1.6,  icon:'bi-water',            cur: parseFloat(totals.omega3.toFixed(2)) },
      fiber:     { name:'Fibra',        unit:'g',   goal:28,   icon:'bi-tree',             cur: Math.round(totals.fiber)             },
    };
  }, [meals]);

  return {
    profile, saveProfile,
    tracking, saveTracking,
    meals, addMealItem, removeMealItem,
    exercises, addExercise, removeExercise,
    weightHistory, logWeight,
    addWater, removeWater,
    calculateBMR, calculateTDEE, calculateTargetCalories,
    calculateBMI, getBMICategory,
    getTotalConsumed, getTotalBurned, getMacroGoals, getMicronutrients,
  };
}