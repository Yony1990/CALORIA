// ===== ALIMENTOS BASE (por 100g) =====

export const foodDatabase = [
  // ── PROTEÍNAS ──────────────────────────────────────────
  { id:1,  name:'Pollo (pechuga)',       cat:'proteína',     cal:165, protein:31,  carbs:0,   fat:3.6, fiber:0,   icon:'🍗', vitC:0,   vitD:0.1, vitB12:0.3, iron:1.0, calcium:15,  magnesium:29, zinc:1.0, potassium:256, omega3:0.1 },
  { id:2,  name:'Huevo entero',          cat:'proteína',     cal:155, protein:13,  carbs:1.1, fat:11,  fiber:0,   icon:'🥚', vitC:0,   vitD:2.0, vitB12:0.9, iron:1.8, calcium:56,  magnesium:12, zinc:1.3, potassium:138, omega3:0.1 },
  { id:3,  name:'Atún en agua',          cat:'proteína',     cal:116, protein:26,  carbs:0,   fat:1,   fiber:0,   icon:'🐟', vitC:0,   vitD:5.4, vitB12:2.5, iron:1.3, calcium:11,  magnesium:35, zinc:0.9, potassium:444, omega3:0.2 },
  { id:4,  name:'Salmón',                cat:'proteína',     cal:208, protein:20,  carbs:0,   fat:13,  fiber:0,   icon:'🐠', vitC:0,   vitD:11.0,vitB12:3.2, iron:0.8, calcium:9,   magnesium:27, zinc:0.6, potassium:363, omega3:2.3 },
  { id:5,  name:'Carne de res',          cat:'proteína',     cal:250, protein:26,  carbs:0,   fat:15,  fiber:0,   icon:'🥩', vitC:0,   vitD:0.1, vitB12:2.0, iron:2.6, calcium:18,  magnesium:21, zinc:4.8, potassium:318, omega3:0.1 },
  { id:6,  name:'Cerdo (lomo)',          cat:'proteína',     cal:242, protein:27,  carbs:0,   fat:14,  fiber:0,   icon:'🥩', vitC:0,   vitD:0.5, vitB12:0.7, iron:1.1, calcium:19,  magnesium:25, zinc:2.4, potassium:370, omega3:0.1 },
  { id:7,  name:'Pollo (muslo)',         cat:'proteína',     cal:209, protein:26,  carbs:0,   fat:11,  fiber:0,   icon:'🍗', vitC:0,   vitD:0.1, vitB12:0.3, iron:1.3, calcium:12,  magnesium:23, zinc:2.4, potassium:240, omega3:0.1 },
  { id:8,  name:'Huevo frito',           cat:'proteína',     cal:196, protein:13,  carbs:0.4, fat:15,  fiber:0,   icon:'🍳', vitC:0,   vitD:1.8, vitB12:0.8, iron:1.6, calcium:50,  magnesium:11, zinc:1.2, potassium:130, omega3:0.1 },
  { id:9,  name:'Huevo revuelto',        cat:'proteína',     cal:149, protein:10,  carbs:1.6, fat:11,  fiber:0,   icon:'🍳', vitC:0,   vitD:1.5, vitB12:0.7, iron:1.4, calcium:60,  magnesium:10, zinc:1.1, potassium:132, omega3:0.1 },
  { id:10, name:'Sardinas en aceite',    cat:'proteína',     cal:208, protein:25,  carbs:0,   fat:11,  fiber:0,   icon:'🐟', vitC:0,   vitD:4.8, vitB12:8.9, iron:2.9, calcium:382, magnesium:39, zinc:1.3, potassium:397, omega3:1.5 },

  // ── LÁCTEOS Y DESAYUNO ─────────────────────────────────
  { id:11, name:'Leche entera',          cat:'lácteo',       cal:61,  protein:3.2, carbs:4.8, fat:3.3, fiber:0,   icon:'🥛', vitC:0,   vitD:0.4, vitB12:0.4, iron:0.1, calcium:113, magnesium:11, zinc:0.4, potassium:150, omega3:0.1 },
  { id:12, name:'Leche descremada',      cat:'lácteo',       cal:35,  protein:3.4, carbs:5,   fat:0.2, fiber:0,   icon:'🥛', vitC:0,   vitD:0.4, vitB12:0.4, iron:0.1, calcium:122, magnesium:11, zinc:0.4, potassium:156, omega3:0   },
  { id:13, name:'Café con leche',        cat:'lácteo',       cal:52,  protein:2.8, carbs:4.2, fat:2.8, fiber:0,   icon:'☕', vitC:0,   vitD:0.3, vitB12:0.3, iron:0.1, calcium:110, magnesium:10, zinc:0.4, potassium:150, omega3:0   },
  { id:14, name:'Café negro (cortado)',  cat:'lácteo',       cal:8,   protein:0.3, carbs:1.5, fat:0,   fiber:0,   icon:'☕', vitC:0,   vitD:0,   vitB12:0,   iron:0.1, calcium:5,   magnesium:7,  zinc:0.1, potassium:49,  omega3:0   },
  { id:15, name:'Yogur griego',          cat:'lácteo',       cal:59,  protein:10,  carbs:3.6, fat:0.4, fiber:0,   icon:'🫙', vitC:0,   vitD:0,   vitB12:0.7, iron:0.1, calcium:110, magnesium:11, zinc:0.5, potassium:141, omega3:0   },
  { id:16, name:'Yogur natural',         cat:'lácteo',       cal:61,  protein:3.5, carbs:4.7, fat:3.3, fiber:0,   icon:'🫙', vitC:0,   vitD:0,   vitB12:0.4, iron:0.1, calcium:121, magnesium:12, zinc:0.6, potassium:155, omega3:0   },
  { id:17, name:'Queso cottage',         cat:'lácteo',       cal:98,  protein:11,  carbs:3.4, fat:4.3, fiber:0,   icon:'🧀', vitC:0,   vitD:0,   vitB12:0.4, iron:0.1, calcium:83,  magnesium:8,  zinc:0.4, potassium:104, omega3:0   },
  { id:18, name:'Queso fresco',          cat:'lácteo',       cal:264, protein:18,  carbs:3.4, fat:21,  fiber:0,   icon:'🧀', vitC:0,   vitD:0.3, vitB12:0.8, iron:0.2, calcium:500, magnesium:20, zinc:2.9, potassium:95,  omega3:0.2 },
  { id:19, name:'Mantequilla',           cat:'lácteo',       cal:717, protein:0.9, carbs:0.1, fat:81,  fiber:0,   icon:'🧈', vitC:0,   vitD:0.6, vitB12:0.1, iron:0,   calcium:24,  magnesium:2,  zinc:0.1, potassium:24,  omega3:0.3 },

  // ── CARBOHIDRATOS ──────────────────────────────────────
  { id:20, name:'Arroz blanco cocido',   cat:'carbohidrato', cal:130, protein:2.7, carbs:28,  fat:0.3, fiber:0.4, icon:'🍚', vitC:0,   vitD:0,   vitB12:0,   iron:0.2, calcium:10,  magnesium:12, zinc:0.5, potassium:35,  omega3:0   },
  { id:21, name:'Arroz integral cocido', cat:'carbohidrato', cal:123, protein:2.7, carbs:25,  fat:1,   fiber:1.8, icon:'🍚', vitC:0,   vitD:0,   vitB12:0,   iron:0.5, calcium:10,  magnesium:44, zinc:0.6, potassium:79,  omega3:0   },
  { id:22, name:'Avena',                 cat:'carbohidrato', cal:389, protein:17,  carbs:66,  fat:7,   fiber:10,  icon:'🌾', vitC:0,   vitD:0,   vitB12:0,   iron:4.7, calcium:54,  magnesium:177,zinc:4.0, potassium:429, omega3:0.1 },
  { id:23, name:'Pan blanco (rebanada)', cat:'carbohidrato', cal:266, protein:9,   carbs:51,  fat:3.2, fiber:2.7, icon:'🍞', vitC:0,   vitD:0,   vitB12:0,   iron:2.4, calcium:151, magnesium:23, zinc:0.7, potassium:115, omega3:0   },
  { id:24, name:'Pan integral',          cat:'carbohidrato', cal:247, protein:9,   carbs:41,  fat:4,   fiber:7,   icon:'🍞', vitC:0,   vitD:0,   vitB12:0,   iron:2.9, calcium:73,  magnesium:76, zinc:1.8, potassium:248, omega3:0.1 },
  { id:25, name:'Pasta cocida',          cat:'carbohidrato', cal:131, protein:5,   carbs:25,  fat:1.1, fiber:1.8, icon:'🍝', vitC:0,   vitD:0,   vitB12:0,   iron:1.3, calcium:7,   magnesium:18, zinc:0.5, potassium:44,  omega3:0   },
  { id:26, name:'Espagueti cocido',      cat:'carbohidrato', cal:158, protein:6,   carbs:31,  fat:0.9, fiber:1.8, icon:'🍝', vitC:0,   vitD:0,   vitB12:0,   iron:1.3, calcium:7,   magnesium:18, zinc:0.5, potassium:44,  omega3:0   },
  { id:27, name:'Papa cocida',           cat:'carbohidrato', cal:77,  protein:2,   carbs:17,  fat:0.1, fiber:2.2, icon:'🥔', vitC:13,  vitD:0,   vitB12:0,   iron:0.3, calcium:5,   magnesium:22, zinc:0.3, potassium:379, omega3:0   },
  { id:28, name:'Papa frita (casera)',   cat:'carbohidrato', cal:312, protein:3.4, carbs:41,  fat:15,  fiber:3.5, icon:'🍟', vitC:9,   vitD:0,   vitB12:0,   iron:0.8, calcium:10,  magnesium:28, zinc:0.4, potassium:573, omega3:0   },
  { id:29, name:'Boniato cocido',        cat:'carbohidrato', cal:86,  protein:1.6, carbs:20,  fat:0.1, fiber:3,   icon:'🍠', vitC:19,  vitD:0,   vitB12:0,   iron:0.7, calcium:30,  magnesium:25, zinc:0.3, potassium:337, omega3:0   },
  { id:30, name:'Yuca cocida',           cat:'carbohidrato', cal:160, protein:1.4, carbs:38,  fat:0.3, fiber:1.8, icon:'🫚', vitC:20,  vitD:0,   vitB12:0,   iron:0.3, calcium:16,  magnesium:21, zinc:0.3, potassium:271, omega3:0   },
  { id:31, name:'Plátano maduro frito',  cat:'carbohidrato', cal:310, protein:1.3, carbs:48,  fat:14,  fiber:2.3, icon:'🍌', vitC:10,  vitD:0,   vitB12:0,   iron:0.5, calcium:9,   magnesium:30, zinc:0.2, potassium:400, omega3:0   },
  { id:32, name:'Tostada (pan blanco)',  cat:'carbohidrato', cal:313, protein:10,  carbs:59,  fat:4,   fiber:2.4, icon:'🍞', vitC:0,   vitD:0,   vitB12:0,   iron:2.8, calcium:144, magnesium:22, zinc:0.7, potassium:110, omega3:0   },
  { id:33, name:'Galletas de agua',      cat:'carbohidrato', cal:421, protein:9,   carbs:74,  fat:9,   fiber:2.2, icon:'🫓', vitC:0,   vitD:0,   vitB12:0,   iron:2.1, calcium:31,  magnesium:20, zinc:0.6, potassium:120, omega3:0   },

  // ── LEGUMBRES ──────────────────────────────────────────
  { id:34, name:'Frijoles negros cocidos', cat:'legumbre',   cal:132, protein:8.9, carbs:23,  fat:0.5, fiber:8.7, icon:'🫘', vitC:0,   vitD:0,   vitB12:0,   iron:2.1, calcium:27,  magnesium:60, zinc:1.0, potassium:355, omega3:0.1 },
  { id:35, name:'Frijoles colorados',      cat:'legumbre',   cal:127, protein:8.7, carbs:22,  fat:0.5, fiber:7.4, icon:'🫘', vitC:1.2, vitD:0,   vitB12:0,   iron:2.9, calcium:28,  magnesium:45, zinc:1.1, potassium:405, omega3:0.1 },
  { id:36, name:'Lentejas cocidas',        cat:'legumbre',   cal:116, protein:9,   carbs:20,  fat:0.4, fiber:7.9, icon:'🫘', vitC:1.5, vitD:0,   vitB12:0,   iron:3.3, calcium:19,  magnesium:36, zinc:1.3, potassium:369, omega3:0.1 },
  { id:37, name:'Porotos (alubias)',       cat:'legumbre',   cal:127, protein:8.7, carbs:22,  fat:0.5, fiber:6.4, icon:'🫘', vitC:0,   vitD:0,   vitB12:0,   iron:2.5, calcium:50,  magnesium:45, zinc:1.0, potassium:561, omega3:0.1 },
  { id:38, name:'Garbanzos cocidos',       cat:'legumbre',   cal:164, protein:8.9, carbs:27,  fat:2.6, fiber:7.6, icon:'🫘', vitC:1.3, vitD:0,   vitB12:0,   iron:2.9, calcium:49,  magnesium:48, zinc:1.5, potassium:291, omega3:0.1 },
  { id:39, name:'Potaje de frijoles',      cat:'legumbre',   cal:95,  protein:6,   carbs:16,  fat:1.2, fiber:5.5, icon:'🍲', vitC:1.0, vitD:0,   vitB12:0,   iron:1.8, calcium:30,  magnesium:40, zinc:0.8, potassium:300, omega3:0   },

  // ── COMIDAS TÍPICAS ────────────────────────────────────
  { id:40, name:'Ropa vieja (200g)',       cat:'plato',      cal:290, protein:28,  carbs:12,  fat:14,  fiber:2.5, icon:'🍲', vitC:5,   vitD:0.1, vitB12:1.5, iron:3.0, calcium:40,  magnesium:30, zinc:4.0, potassium:450, omega3:0.1 },
  { id:41, name:'Arroz con pollo (300g)',  cat:'plato',      cal:380, protein:29,  carbs:42,  fat:8,   fiber:2,   icon:'🍛', vitC:4,   vitD:0.1, vitB12:0.4, iron:1.5, calcium:30,  magnesium:35, zinc:2.0, potassium:380, omega3:0.1 },
  { id:42, name:'Milanesa de res',         cat:'plato',      cal:320, protein:28,  carbs:18,  fat:14,  fiber:0.8, icon:'🥩', vitC:0,   vitD:0.1, vitB12:1.8, iron:3.0, calcium:40,  magnesium:25, zinc:4.5, potassium:350, omega3:0.1 },
  { id:43, name:'Milanesa de pollo',       cat:'plato',      cal:280, protein:30,  carbs:16,  fat:10,  fiber:0.5, icon:'🍗', vitC:0,   vitD:0.1, vitB12:0.3, iron:1.2, calcium:30,  magnesium:28, zinc:1.5, potassium:300, omega3:0.1 },
  { id:44, name:'Churrasco (200g)',        cat:'plato',      cal:360, protein:38,  carbs:0,   fat:22,  fiber:0,   icon:'🥩', vitC:0,   vitD:0.2, vitB12:3.0, iron:3.8, calcium:20,  magnesium:30, zinc:6.0, potassium:500, omega3:0.2 },
  { id:45, name:'Asado de tira (200g)',    cat:'plato',      cal:420, protein:34,  carbs:0,   fat:31,  fiber:0,   icon:'🥩', vitC:0,   vitD:0.2, vitB12:2.8, iron:3.5, calcium:22,  magnesium:28, zinc:5.5, potassium:480, omega3:0.3 },
  { id:46, name:'Pasta con salsa roja',    cat:'plato',      cal:280, protein:10,  carbs:48,  fat:6,   fiber:3.5, icon:'🍝', vitC:8,   vitD:0,   vitB12:0,   iron:2.0, calcium:40,  magnesium:30, zinc:0.8, potassium:300, omega3:0   },
  { id:47, name:'Pasta con carne molida',  cat:'plato',      cal:380, protein:22,  carbs:45,  fat:12,  fiber:3,   icon:'🍝', vitC:5,   vitD:0.1, vitB12:1.2, iron:2.8, calcium:45,  magnesium:32, zinc:3.0, potassium:380, omega3:0.1 },
  { id:48, name:'Sopa de pollo (300ml)',   cat:'plato',      cal:85,  protein:8,   carbs:7,   fat:2.5, fiber:1,   icon:'🍜', vitC:2,   vitD:0,   vitB12:0.2, iron:0.8, calcium:20,  magnesium:12, zinc:0.8, potassium:200, omega3:0   },
  { id:49, name:'Caldo de res (300ml)',    cat:'plato',      cal:45,  protein:6,   carbs:2,   fat:1.5, fiber:0,   icon:'🍜', vitC:0,   vitD:0,   vitB12:0.5, iron:0.5, calcium:10,  magnesium:8,  zinc:0.5, potassium:150, omega3:0   },
  { id:50, name:'Tostadas con mantequilla',cat:'plato',      cal:210, protein:4,   carbs:26,  fat:10,  fiber:1.5, icon:'🍞', vitC:0,   vitD:0.2, vitB12:0.1, iron:1.5, calcium:80,  magnesium:10, zinc:0.4, potassium:80,  omega3:0.1 },
  { id:51, name:'Pan con queso',           cat:'plato',      cal:290, protein:12,  carbs:30,  fat:14,  fiber:1.5, icon:'🧀', vitC:0,   vitD:0.2, vitB12:0.5, iron:1.5, calcium:280, magnesium:18, zinc:1.5, potassium:120, omega3:0.1 },
  { id:52, name:'Sandwich de jamón',       cat:'plato',      cal:320, protein:18,  carbs:34,  fat:12,  fiber:2,   icon:'🥪', vitC:0,   vitD:0,   vitB12:0.4, iron:1.8, calcium:80,  magnesium:20, zinc:1.2, potassium:280, omega3:0   },
  { id:53, name:'Croquetas de jamón (3u)', cat:'plato',      cal:210, protein:9,   carbs:22,  fat:10,  fiber:0.5, icon:'🫓', vitC:0,   vitD:0,   vitB12:0.3, iron:1.0, calcium:40,  magnesium:12, zinc:0.8, potassium:180, omega3:0   },
  { id:54, name:'Tamales (1 unidad)',      cat:'plato',      cal:285, protein:10,  carbs:38,  fat:10,  fiber:3.5, icon:'🌽', vitC:2,   vitD:0,   vitB12:0.1, iron:1.5, calcium:30,  magnesium:28, zinc:0.8, potassium:220, omega3:0   },
  { id:55, name:'Tortilla española',       cat:'plato',      cal:218, protein:11,  carbs:14,  fat:13,  fiber:1.2, icon:'🍳', vitC:10,  vitD:1.2, vitB12:0.6, iron:1.5, calcium:60,  magnesium:18, zinc:1.0, potassium:320, omega3:0.1 },
  { id:56, name:'Chivito uruguayo',        cat:'plato',      cal:680, protein:42,  carbs:45,  fat:32,  fiber:3,   icon:'🥪', vitC:5,   vitD:0.3, vitB12:2.5, iron:4.5, calcium:150, magnesium:40, zinc:5.0, potassium:600, omega3:0.2 },
  { id:57, name:'Empanada de carne (1u)',  cat:'plato',      cal:290, protein:14,  carbs:28,  fat:13,  fiber:1.5, icon:'🥟', vitC:1,   vitD:0.1, vitB12:0.8, iron:2.0, calcium:30,  magnesium:18, zinc:1.8, potassium:200, omega3:0   },
  { id:58, name:'Empanada de queso (1u)',  cat:'plato',      cal:260, protein:10,  carbs:27,  fat:13,  fiber:1,   icon:'🥟', vitC:0,   vitD:0.2, vitB12:0.4, iron:1.0, calcium:180, magnesium:15, zinc:1.2, potassium:120, omega3:0   },
  { id:59, name:'Moros y Cristianos',      cat:'plato',      cal:185, protein:8,   carbs:35,  fat:2,   fiber:5,   icon:'🍚', vitC:0,   vitD:0,   vitB12:0,   iron:2.5, calcium:30,  magnesium:45, zinc:1.0, potassium:350, omega3:0   },
  { id:60, name:'Picadillo a la criolla',  cat:'plato',      cal:240, protein:22,  carbs:10,  fat:12,  fiber:2,   icon:'🍲', vitC:8,   vitD:0.1, vitB12:1.5, iron:3.0, calcium:30,  magnesium:25, zinc:3.5, potassium:400, omega3:0.1 },

  // ── VERDURAS ───────────────────────────────────────────
  { id:61, name:'Brócoli',                cat:'verdura',     cal:34,  protein:2.8, carbs:7,   fat:0.4, fiber:2.6, icon:'🥦', vitC:89,  vitD:0,   vitB12:0,   iron:0.7, calcium:47,  magnesium:21, zinc:0.4, potassium:316, omega3:0.1 },
  { id:62, name:'Espinaca',               cat:'verdura',     cal:23,  protein:2.9, carbs:3.6, fat:0.4, fiber:2.2, icon:'🥬', vitC:28,  vitD:0,   vitB12:0,   iron:2.7, calcium:99,  magnesium:79, zinc:0.5, potassium:558, omega3:0.1 },
  { id:63, name:'Tomate',                 cat:'verdura',     cal:18,  protein:0.9, carbs:3.9, fat:0.2, fiber:1.2, icon:'🍅', vitC:14,  vitD:0,   vitB12:0,   iron:0.3, calcium:10,  magnesium:11, zinc:0.2, potassium:237, omega3:0   },
  { id:64, name:'Zanahoria',              cat:'verdura',     cal:41,  protein:0.9, carbs:10,  fat:0.2, fiber:2.8, icon:'🥕', vitC:6,   vitD:0,   vitB12:0,   iron:0.3, calcium:33,  magnesium:12, zinc:0.2, potassium:320, omega3:0   },
  { id:65, name:'Lechuga',                cat:'verdura',     cal:15,  protein:1.4, carbs:2.9, fat:0.2, fiber:1.8, icon:'🥬', vitC:9,   vitD:0,   vitB12:0,   iron:0.9, calcium:36,  magnesium:13, zinc:0.2, potassium:194, omega3:0.1 },
  { id:66, name:'Cebolla',                cat:'verdura',     cal:40,  protein:1.1, carbs:9,   fat:0.1, fiber:1.7, icon:'🧅', vitC:7,   vitD:0,   vitB12:0,   iron:0.2, calcium:23,  magnesium:10, zinc:0.2, potassium:146, omega3:0   },
  { id:67, name:'Pepino',                 cat:'verdura',     cal:15,  protein:0.7, carbs:3.6, fat:0.1, fiber:0.5, icon:'🥒', vitC:3,   vitD:0,   vitB12:0,   iron:0.3, calcium:16,  magnesium:13, zinc:0.2, potassium:147, omega3:0   },
  { id:68, name:'Pimiento',               cat:'verdura',     cal:31,  protein:1,   carbs:6,   fat:0.3, fiber:2.1, icon:'🫑', vitC:128, vitD:0,   vitB12:0,   iron:0.4, calcium:10,  magnesium:10, zinc:0.3, potassium:211, omega3:0   },
  { id:69, name:'Calabaza',               cat:'verdura',     cal:26,  protein:1,   carbs:6.5, fat:0.1, fiber:0.5, icon:'🎃', vitC:9,   vitD:0,   vitB12:0,   iron:0.5, calcium:21,  magnesium:12, zinc:0.3, potassium:340, omega3:0   },

  // ── FRUTAS ─────────────────────────────────────────────
  { id:70, name:'Manzana',                cat:'fruta',       cal:52,  protein:0.3, carbs:14,  fat:0.2, fiber:2.4, icon:'🍎', vitC:5,   vitD:0,   vitB12:0,   iron:0.1, calcium:6,   magnesium:5,  zinc:0.0, potassium:107, omega3:0   },
  { id:71, name:'Banano/Plátano',         cat:'fruta',       cal:89,  protein:1.1, carbs:23,  fat:0.3, fiber:2.6, icon:'🍌', vitC:9,   vitD:0,   vitB12:0,   iron:0.3, calcium:5,   magnesium:27, zinc:0.2, potassium:358, omega3:0   },
  { id:72, name:'Naranja',                cat:'fruta',       cal:47,  protein:0.9, carbs:12,  fat:0.1, fiber:2.4, icon:'🍊', vitC:53,  vitD:0,   vitB12:0,   iron:0.1, calcium:40,  magnesium:10, zinc:0.1, potassium:181, omega3:0   },
  { id:73, name:'Mango',                  cat:'fruta',       cal:60,  protein:0.8, carbs:15,  fat:0.4, fiber:1.6, icon:'🥭', vitC:36,  vitD:0,   vitB12:0,   iron:0.2, calcium:11,  magnesium:10, zinc:0.1, potassium:168, omega3:0   },
  { id:74, name:'Papaya/Fruta bomba',     cat:'fruta',       cal:43,  protein:0.5, carbs:11,  fat:0.3, fiber:1.7, icon:'🍈', vitC:62,  vitD:0,   vitB12:0,   iron:0.3, calcium:20,  magnesium:21, zinc:0.1, potassium:182, omega3:0   },
  { id:75, name:'Guayaba',                cat:'fruta',       cal:68,  protein:2.6, carbs:14,  fat:1,   fiber:5.4, icon:'🍏', vitC:228, vitD:0,   vitB12:0,   iron:0.3, calcium:18,  magnesium:22, zinc:0.2, potassium:417, omega3:0.1 },
  { id:76, name:'Piña',                   cat:'fruta',       cal:50,  protein:0.5, carbs:13,  fat:0.1, fiber:1.4, icon:'🍍', vitC:48,  vitD:0,   vitB12:0,   iron:0.3, calcium:13,  magnesium:12, zinc:0.1, potassium:109, omega3:0   },
  { id:77, name:'Fresa',                  cat:'fruta',       cal:32,  protein:0.7, carbs:7.7, fat:0.3, fiber:2,   icon:'🍓', vitC:59,  vitD:0,   vitB12:0,   iron:0.4, calcium:16,  magnesium:13, zinc:0.1, potassium:153, omega3:0.1 },
  { id:78, name:'Sandía',                 cat:'fruta',       cal:30,  protein:0.6, carbs:7.6, fat:0.2, fiber:0.4, icon:'🍉', vitC:8,   vitD:0,   vitB12:0,   iron:0.2, calcium:7,   magnesium:10, zinc:0.1, potassium:112, omega3:0   },

  // ── GRASAS Y EXTRAS ────────────────────────────────────
  { id:79, name:'Aguacate',               cat:'grasa',       cal:160, protein:2,   carbs:9,   fat:15,  fiber:7,   icon:'🥑', vitC:10,  vitD:0,   vitB12:0,   iron:0.6, calcium:12,  magnesium:29, zinc:0.6, potassium:485, omega3:0.1 },
  { id:80, name:'Almendras',              cat:'grasa',       cal:579, protein:21,  carbs:22,  fat:50,  fiber:12,  icon:'🌰', vitC:0,   vitD:0,   vitB12:0,   iron:3.7, calcium:264, magnesium:270,zinc:3.1, potassium:733, omega3:0   },
  { id:81, name:'Aceite de oliva',        cat:'grasa',       cal:884, protein:0,   carbs:0,   fat:100, fiber:0,   icon:'🫒', vitC:0,   vitD:0,   vitB12:0,   iron:0.6, calcium:1,   magnesium:0,  zinc:0,   potassium:1,   omega3:0.8 },
  { id:82, name:'Aceite vegetal',         cat:'grasa',       cal:884, protein:0,   carbs:0,   fat:100, fiber:0,   icon:'🧴', vitC:0,   vitD:0,   vitB12:0,   iron:0,   calcium:0,   magnesium:0,  zinc:0,   potassium:0,   omega3:0.5 },
  { id:83, name:'Mayonesa',               cat:'grasa',       cal:680, protein:1,   carbs:0.6, fat:75,  fiber:0,   icon:'🥄', vitC:0,   vitD:0,   vitB12:0,   iron:0.4, calcium:13,  magnesium:3,  zinc:0.2, potassium:20,  omega3:0.5 },
  { id:84, name:'Azúcar blanca',          cat:'extra',       cal:387, protein:0,   carbs:100, fat:0,   fiber:0,   icon:'🍬', vitC:0,   vitD:0,   vitB12:0,   iron:0.1, calcium:1,   magnesium:0,  zinc:0,   potassium:2,   omega3:0   },
  { id:85, name:'Miel',                   cat:'extra',       cal:304, protein:0.3, carbs:82,  fat:0,   fiber:0.2, icon:'🍯', vitC:0.5, vitD:0,   vitB12:0,   iron:0.4, calcium:6,   magnesium:2,  zinc:0.2, potassium:52,  omega3:0   },
];

// ===== EJERCICIOS CALISTENIA =====
export const calisteniaExercises = [
  {
    id: 1, name: 'Flexiones', nameEn: 'Push-ups',
    muscleGroup: 'pecho', level: 'principiante',
    calPerMinute: 7, sets: '3x10', restSec: 60,
    icon: 'bi-person-arms-up',
    description: 'Empuje del tren superior básico. Manos a la anchura de los hombros.',
    variations: ['Flexiones inclinadas', 'Flexiones en diamante', 'Flexiones explosivas'],
    tips: 'Mantén el core apretado y la espalda recta durante todo el movimiento.'
  },
  {
    id: 2, name: 'Sentadillas', nameEn: 'Squats',
    muscleGroup: 'piernas', level: 'principiante',
    calPerMinute: 8, sets: '3x15', restSec: 60,
    icon: 'bi-person',
    description: 'Ejercicio rey del tren inferior. Rodillas no sobrepasar puntas de pies.',
    variations: ['Sentadilla sumo', 'Pistol squat', 'Jump squat'],
    tips: 'Baja hasta que los muslos estén paralelos al suelo.'
  },
  {
    id: 3, name: 'Dominadas', nameEn: 'Pull-ups',
    muscleGroup: 'espalda', level: 'intermedio',
    calPerMinute: 10, sets: '3x6', restSec: 90,
    icon: 'bi-person-raised-hand',
    description: 'Empuje vertical del tren superior. Requiere barra.',
    variations: ['Dominadas con agarre neutro', 'Dominadas australianas', 'Muscle-up'],
    tips: 'Parte desde colgado muerto, sube el pecho hasta la barra.'
  },
  {
    id: 4, name: 'Burpees', nameEn: 'Burpees',
    muscleGroup: 'cuerpo completo', level: 'intermedio',
    calPerMinute: 12, sets: '3x10', restSec: 90,
    icon: 'bi-lightning',
    description: 'Ejercicio metabólico de cuerpo completo de alta intensidad.',
    variations: ['Burpee sin salto', 'Burpee con dominada', 'Half burpee'],
    tips: 'Controla la respiración. Exhala al saltar, inhala al bajar.'
  },
  {
    id: 5, name: 'Plancha', nameEn: 'Plank',
    muscleGroup: 'core', level: 'principiante',
    calPerMinute: 5, sets: '3x30s', restSec: 45,
    icon: 'bi-align-middle',
    description: 'Isométrico fundamental para estabilidad del core.',
    variations: ['Plancha lateral', 'Plancha con toque', 'Plancha dinámica'],
    tips: 'Contrae glúteos y abdomen. Caderas sin subir ni bajar.'
  },
  {
    id: 6, name: 'Fondos en paralelas', nameEn: 'Dips',
    muscleGroup: 'tríceps', level: 'intermedio',
    calPerMinute: 8, sets: '3x8', restSec: 75,
    icon: 'bi-arrow-down-circle',
    description: 'Ejercicio de empuje para tríceps y pecho inferior.',
    variations: ['Fondos en silla', 'Fondos con peso', 'Korean dips'],
    tips: 'Inclina ligeramente el torso hacia adelante para activar más pecho.'
  },
  {
    id: 7, name: 'Mountain Climbers', nameEn: 'Mountain Climbers',
    muscleGroup: 'core', level: 'principiante',
    calPerMinute: 11, sets: '3x20', restSec: 45,
    icon: 'bi-activity',
    description: 'Cardio + core. Posición de plancha con rodillas alternadas al pecho.',
    variations: ['Lento y controlado', 'Cross mountain climbers', 'Sliding'],
    tips: 'Mantén caderas bajas y ritmo constante.'
  },
  {
    id: 8, name: 'Zancadas', nameEn: 'Lunges',
    muscleGroup: 'piernas', level: 'principiante',
    calPerMinute: 7, sets: '3x12', restSec: 60,
    icon: 'bi-person-walking',
    description: 'Trabajo unilateral de piernas y equilibrio.',
    variations: ['Zancada inversa', 'Zancada lateral', 'Zancada con salto'],
    tips: 'Rodilla delantera a 90°, rodilla trasera casi toca el suelo.'
  },
  {
    id: 9, name: 'Pike Push-ups', nameEn: 'Pike Push-ups',
    muscleGroup: 'hombros', level: 'principiante',
    calPerMinute: 7, sets: '3x10', restSec: 60,
    icon: 'bi-triangle',
    description: 'Flexión en V invertida para trabajar los deltoides.',
    variations: ['Elevated pike', 'Handstand push-up', 'Decline push-up'],
    tips: 'Forma una V con el cuerpo, baja la cabeza entre las manos.'
  },
  {
    id: 10, name: 'Saltos de tijera', nameEn: 'Jumping Jacks',
    muscleGroup: 'cardio', level: 'principiante',
    calPerMinute: 9, sets: '3x30', restSec: 30,
    icon: 'bi-stars',
    description: 'Cardio de bajo impacto para calentamiento o circuito.',
    variations: ['Star jumps', 'Side-to-side', 'Cross jacks'],
    tips: 'Aterrizaje suave, rodillas ligeramente flexionadas.'
  },
  {
    id: 11, name: 'L-Sit', nameEn: 'L-Sit',
    muscleGroup: 'core', level: 'avanzado',
    calPerMinute: 6, sets: '3x15s', restSec: 90,
    icon: 'bi-layout-text-sidebar',
    description: 'Isométrico avanzado de core y compresión.',
    variations: ['Tucked L-sit', 'One-leg L-sit', 'Parallette L-sit'],
    tips: 'Empieza con tucked (rodillas dobladas). Progresa gradualmente.'
  },
  {
    id: 12, name: 'Pistol Squat', nameEn: 'Pistol Squat',
    muscleGroup: 'piernas', level: 'avanzado',
    calPerMinute: 9, sets: '3x5', restSec: 90,
    icon: 'bi-chevron-double-down',
    description: 'Sentadilla a una pierna. Máxima fuerza y equilibrio.',
    variations: ['Asistido con TRX', 'Box pistol', 'Shrimp squat'],
    tips: 'Trabaja primero la movilidad de tobillo y cadera.'
  },
];

// ===== METAS DE MICRONUTRIENTES DIARIOS (valores recomendados) =====
export const micronutrientGoals = {
  vitaminC: { name: 'Vitamina C', unit: 'mg', goal: 90, icon: 'bi-brightness-high' },
  vitaminD: { name: 'Vitamina D', unit: 'UI', goal: 600, icon: 'bi-sun' },
  vitaminB12: { name: 'Vitamina B12', unit: 'mcg', goal: 2.4, icon: 'bi-capsule' },
  iron: { name: 'Hierro', unit: 'mg', goal: 18, icon: 'bi-droplet-fill' },
  calcium: { name: 'Calcio', unit: 'mg', goal: 1000, icon: 'bi-gem' },
  magnesium: { name: 'Magnesio', unit: 'mg', goal: 400, icon: 'bi-lightning-charge' },
  zinc: { name: 'Zinc', unit: 'mg', goal: 11, icon: 'bi-shield-check' },
  potassium: { name: 'Potasio', unit: 'mg', goal: 3500, icon: 'bi-heart-pulse' },
  sodium: { name: 'Sodio', unit: 'mg', goal: 2300, icon: 'bi-moisture' },
  omega3: { name: 'Omega-3', unit: 'mg', goal: 1600, icon: 'bi-water' },
  fiber: { name: 'Fibra', unit: 'g', goal: 28, icon: 'bi-tree' },
};

// ===== NIVELES DE ACTIVIDAD =====
export const activityLevels = [
  { value: 1.2, label: 'Sedentario', desc: 'Poco o nada de ejercicio', icon: 'bi-laptop' },
  { value: 1.375, label: 'Ligero', desc: '1-3 días/semana', icon: 'bi-bicycle' },
  { value: 1.55, label: 'Moderado', desc: '3-5 días/semana', icon: 'bi-person-running' },
  { value: 1.725, label: 'Activo', desc: '6-7 días/semana', icon: 'bi-fire' },
  { value: 1.9, label: 'Muy activo', desc: 'Atleta / trabajo físico', icon: 'bi-trophy' },
];

// ===== TIPOS DE DIETA =====
export const dietTypes = [
  { value: 'balanced', label: 'Balanceada', protein: 30, carbs: 40, fat: 30 },
  { value: 'keto', label: 'Keto', protein: 25, carbs: 5, fat: 70 },
  { value: 'lowcarb', label: 'Low Carb', protein: 35, carbs: 20, fat: 45 },
  { value: 'highprotein', label: 'Alta Proteína', protein: 45, carbs: 35, fat: 20 },
  { value: 'vegan', label: 'Vegana', protein: 20, carbs: 55, fat: 25 },
  { value: 'mediterranean', label: 'Mediterránea', protein: 20, carbs: 50, fat: 30 },
];









