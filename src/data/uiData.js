// Trimmed sample data for the UI mockup — representative across all 12 CNs + key muscles + mnemonics + quiz
export const CN_DATA = [
  { number: "I", roman: "I", name: "Olfactory", latin: "Nervus olfactorius", type: "Sensory",
    fibers: ["SVA"], foramen: "Cribriform plate", color: "#7c6af7",
    origin: "Bipolar olfactory receptor neurons in olfactory epithelium (upper one-third of nasal septum and superior concha).",
    termination: "Olfactory bulb → tract → piriform cortex, amygdala, entorhinal cortex. The only CN bypassing the thalamus.",
    function: ["Smell (olfaction)", "Direct cortical projection — no thalamic relay"],
    clinical: [
      { c: "Anosmia", d: "Loss of smell. Cribriform plate fracture, olfactory groove meningioma, early Parkinson's / Alzheimer's." },
      { c: "Kallmann syndrome", d: "Anosmia + hypogonadotropic hypogonadism. Failure of GnRH/olfactory neuron migration from olfactory placode." },
      { c: "Foster Kennedy syndrome", d: "Ipsilateral anosmia + optic atrophy, contralateral papilledema (olfactory groove meningioma)." }
    ],
    mnemonic: "Only nose, no thalamus — straight to cortex.",
    embryo: "Olfactory placode (surface ectoderm).",
    test: "Test each nostril with coffee / vanilla. Avoid ammonia (stimulates CN V)."
  },
  { number: "II", roman: "II", name: "Optic", latin: "Nervus opticus", type: "Sensory",
    fibers: ["SSA"], foramen: "Optic canal", color: "#5aa8ff",
    origin: "Retinal ganglion cells (3rd-order neurons of visual pathway).",
    termination: "Optic chiasm → optic tract → LGN of thalamus → optic radiation → V1 (calcarine cortex).",
    function: ["Vision", "Afferent limb of pupillary light reflex", "Afferent limb of accommodation reflex"],
    clinical: [
      { c: "Optic neuritis", d: "Painful vision loss, RAPD, colour desaturation. MS until proven otherwise. Tx: IV methylprednisolone." },
      { c: "RAPD (Marcus Gunn)", d: "Swinging flashlight test — pupil dilates on light swing to affected eye." },
      { c: "Bitemporal hemianopia", d: "Pituitary adenoma compressing crossing nasal fibres at chiasm." },
      { c: "Papilledema", d: "Raised ICP transmitted along CSF-filled subarachnoid sheath of CN II." }
    ],
    mnemonic: "Bi-TEMP-oral = pituitary from below.",
    embryo: "Outgrowth of diencephalon — true CNS tract, not peripheral nerve.",
    test: "Snellen, visual fields, fundoscopy, Ishihara, swinging flashlight (RAPD)."
  },
  { number: "III", roman: "III", name: "Oculomotor", latin: "Nervus oculomotorius", type: "Motor",
    fibers: ["GSE","GVE"], foramen: "Superior orbital fissure", color: "#00d4a8",
    origin: "Midbrain tegmentum (level of superior colliculus).",
    termination: "SR, IR, MR, IO, levator palpebrae; via ciliary ganglion → sphincter pupillae + ciliary muscle.",
    function: ["Most extraocular movement (except SO, LR)", "Eyelid elevation (levator palpebrae)", "Pupil constriction & accommodation"],
    clinical: [
      { c: "Complete CN III palsy", d: "Eye 'down and out', ptosis, fixed dilated pupil." },
      { c: "Surgical vs medical palsy", d: "Surgical (PCom aneurysm) → PUPIL INVOLVED first (peripheral parasymp fibres). Medical (DM/HTN) → PUPIL SPARED." },
      { c: "Uncal herniation", d: "Ipsilateral fixed dilated pupil is the earliest herniation sign." },
      { c: "Weber syndrome", d: "Ipsilateral CN III + contralateral hemiplegia (midbrain infarct)." }
    ],
    mnemonic: "Down & out + ptosis + dilated pupil. Surgical = pupil. Medical = spare.",
    embryo: "Basal plate of mesencephalon.",
    test: "H-pattern eye movements, ptosis, pupil light + accommodation."
  },
  { number: "IV", roman: "IV", name: "Trochlear", latin: "Nervus trochlearis", type: "Motor",
    fibers: ["GSE"], foramen: "Superior orbital fissure", color: "#b692ff",
    origin: "Caudal midbrain (level of inferior colliculus). Only CN to exit dorsally.",
    termination: "Superior oblique muscle.",
    function: ["Depression of adducted eye (reading down)", "Intorsion of eye"],
    clinical: [
      { c: "CN IV palsy", d: "Vertical diplopia worse on downgaze (going downstairs, reading). Compensatory head tilt AWAY from affected side." },
      { c: "Bielschowsky head tilt test", d: "Hypertropia worsens on tilt TOWARDS the affected side — confirms SO palsy." },
      { c: "Trauma vulnerability", d: "Longest intracranial course → most susceptible to head trauma." }
    ],
    mnemonic: "Trochlear = Trochlea pulley = Superior Oblique only.",
    embryo: "Basal plate of mesencephalon. Decussates in superior medullary velum.",
    test: "Look down + in. Bielschowsky head-tilt test."
  },
  { number: "V", roman: "V", name: "Trigeminal", latin: "Nervus trigeminus", type: "Mixed",
    fibers: ["GSA","SVE"], foramen: "V1 SOF · V2 Foramen rotundum · V3 Foramen ovale", color: "#ffb24a",
    origin: "Pons (motor) + trigeminal ganglion (sensory).",
    termination: "Three divisions: V1 ophthalmic, V2 maxillary, V3 mandibular.",
    function: ["Sensation of face, anterior 2/3 tongue (general)", "Muscles of mastication (V3)", "Tensor tympani, tensor veli palatini, mylohyoid, anterior digastric"],
    clinical: [
      { c: "Trigeminal neuralgia", d: "Tic douloureux — paroxysmal lancinating facial pain, V2/V3 most affected. Tx: carbamazepine." },
      { c: "Corneal reflex", d: "Afferent = V1 (nasociliary), efferent = VII. Absent → V1 or VII lesion." },
      { c: "Jaw jerk reflex", d: "Hyperactive in UMN lesion (pseudobulbar palsy)." },
      { c: "Herpes zoster ophthalmicus", d: "Reactivation in V1 — Hutchinson's sign (tip of nose) → high risk of ocular involvement." }
    ],
    mnemonic: "Standing Room Only — SOF, Rotundum, Ovale (V1, V2, V3).",
    embryo: "Pharyngeal arch 1.",
    test: "Light touch & pinprick V1/V2/V3. Corneal reflex. Clench jaw, jaw opening (deviates to weak side)."
  },
  { number: "VI", roman: "VI", name: "Abducens", latin: "Nervus abducens", type: "Motor",
    fibers: ["GSE"], foramen: "Superior orbital fissure", color: "#00d4a8",
    origin: "Pontomedullary junction; long intracranial course over petrous ridge.",
    termination: "Lateral rectus muscle.",
    function: ["Abduction of eye (LR)"],
    clinical: [
      { c: "CN VI palsy", d: "Inability to abduct eye → horizontal diplopia worse at distance. Convergent strabismus." },
      { c: "False localizing sign", d: "Raised ICP stretches CN VI over petrous ridge — palsy that does NOT localize the lesion." },
      { c: "Foville syndrome", d: "Pontine lesion: ipsilateral CN VI + VII + Horner + contralateral hemiplegia." }
    ],
    mnemonic: "LR6 — Lateral Rectus, CN 6.",
    embryo: "Pharyngeal arch–independent; basal plate of pons.",
    test: "Lateral gaze each side."
  },
  { number: "VII", roman: "VII", name: "Facial", latin: "Nervus facialis", type: "Mixed",
    fibers: ["SVE","GVE","SVA","GSA"], foramen: "Internal acoustic meatus → facial canal → stylomastoid foramen", color: "#ff7aa9",
    origin: "Pontomedullary junction (two roots: motor + nervus intermedius).",
    termination: "Muscles of facial expression; pterygopalatine & submandibular ganglia; chorda tympani.",
    function: ["Facial expression", "Taste anterior 2/3 tongue (chorda tympani)", "Lacrimation, salivation (submand + sublingual)", "Stapedius — dampens loud sound"],
    clinical: [
      { c: "Bell's palsy (LMN)", d: "Unilateral facial droop INCLUDING forehead. UMN lesion spares forehead (bilateral cortical innervation)." },
      { c: "Lesion localization", d: "Above geniculate: + dry eye, + hyperacusis, + loss of taste. Above chorda tympani: + hyperacusis + loss of taste. Below stylomastoid: pure motor." },
      { c: "Ramsay Hunt syndrome", d: "VZV reactivation in geniculate ganglion → facial palsy + vesicles in ear canal." },
      { c: "Crocodile tears (Bogorad)", d: "Aberrant reinnervation post-Bell's: eating triggers lacrimation." }
    ],
    mnemonic: "To Zanzibar By Motor Car — Temporal, Zygomatic, Buccal, Mandibular, Cervical.",
    embryo: "Pharyngeal arch 2.",
    test: "Wrinkle forehead, close eyes tight, smile, puff cheeks. Schirmer's. Taste anterior 2/3."
  },
  { number: "VIII", roman: "VIII", name: "Vestibulocochlear", latin: "Nervus vestibulocochlearis", type: "Sensory",
    fibers: ["SSA"], foramen: "Internal acoustic meatus", color: "#5aa8ff",
    origin: "Pontomedullary junction; spiral ganglion (cochlear) + Scarpa's ganglion (vestibular).",
    termination: "Cochlear & vestibular nuclei.",
    function: ["Hearing (cochlear)", "Balance, head position, angular acceleration (vestibular)"],
    clinical: [
      { c: "Vestibular schwannoma", d: "CPA tumour — hearing loss, tinnitus, imbalance. Bilateral = NF2." },
      { c: "Weber & Rinne", d: "Conductive: Weber lateralises TO affected, Rinne BC > AC affected. Sensorineural: Weber AWAY from affected, AC > BC bilaterally." },
      { c: "HINTS exam", d: "Differentiates central vs peripheral vertigo: Head Impulse, Nystagmus, Test of Skew." }
    ],
    mnemonic: "Eight = Hear & Equilibrium.",
    embryo: "Otic placode.",
    test: "Whisper test, Weber/Rinne, Romberg, Dix-Hallpike."
  },
  { number: "IX", roman: "IX", name: "Glossopharyngeal", latin: "Nervus glossopharyngeus", type: "Mixed",
    fibers: ["SVE","GVE","GVA","SVA","GSA"], foramen: "Jugular foramen", color: "#4ee084",
    origin: "Medulla.",
    termination: "Stylopharyngeus; parotid (via otic ganglion); posterior 1/3 tongue.",
    function: ["Taste & general sensation posterior 1/3 tongue", "Parotid salivation", "Carotid sinus & body afferents", "Stylopharyngeus motor", "Sensation middle ear, pharynx"],
    clinical: [
      { c: "Glossopharyngeal neuralgia", d: "Paroxysmal pain in throat/ear triggered by swallowing/coughing." },
      { c: "Carotid sinus syndrome", d: "Hyperactive baroreceptor reflex → syncope on neck pressure." },
      { c: "Gag reflex", d: "Afferent = IX, efferent = X." }
    ],
    mnemonic: "Tongue posterior 1/3 sensation + taste. Parotid. Carotid sinus.",
    embryo: "Pharyngeal arch 3.",
    test: "Gag reflex, taste posterior 1/3 tongue."
  },
  { number: "X", roman: "X", name: "Vagus", latin: "Nervus vagus", type: "Mixed",
    fibers: ["SVE","GVE","GVA","SVA","GSA"], foramen: "Jugular foramen", color: "#00d4a8",
    origin: "Medulla.",
    termination: "Pharyngeal & laryngeal muscles; parasympathetic to thoracic & abdominal viscera (to splenic flexure).",
    function: ["Pharyngeal & laryngeal motor", "Parasympathetic to thoraco-abdominal viscera", "Taste epiglottis", "Sensation external ear (Arnold's nerve)"],
    clinical: [
      { c: "RLN palsy", d: "Hoarseness. Left RLN loops under aortic arch — vulnerable in mediastinal pathology (Pancoast, AA aneurysm). Right loops under subclavian." },
      { c: "Uvula deviation rule", d: "Uvula deviates AWAY from the side of lesion. (Tongue, by contrast, deviates TOWARDS the lesion.)" },
      { c: "Vasovagal syncope", d: "Excessive parasympathetic outflow → bradycardia + vasodilation." }
    ],
    mnemonic: "Vagus = Wanderer. Left RLN under aortic arch. Uvula away from lesion.",
    embryo: "Pharyngeal arches 4 & 6.",
    test: "Uvula position, 'say Ah', gag reflex (efferent), voice quality."
  },
  { number: "XI", roman: "XI", name: "Accessory", latin: "Nervus accessorius", type: "Motor",
    fibers: ["SVE"], foramen: "Jugular foramen (exit); foramen magnum (entry)", color: "#ffb24a",
    origin: "Cranial root (medulla) + spinal root (C1–C5/6).",
    termination: "Sternocleidomastoid + trapezius.",
    function: ["Shrug shoulders (trapezius)", "Turn head to opposite side (SCM)"],
    clinical: [
      { c: "Posterior triangle injury", d: "Iatrogenic during lymph node biopsy → trapezius wasting, shoulder droop, winged scapula." },
      { c: "Radical neck dissection", d: "Major cause of CN XI palsy." }
    ],
    mnemonic: "Shrug + Turn — Trapezius + SCM.",
    embryo: "Branchiomeric/somitic mix.",
    test: "Shrug shoulders against resistance, turn head against resistance."
  },
  { number: "XII", roman: "XII", name: "Hypoglossal", latin: "Nervus hypoglossus", type: "Motor",
    fibers: ["GSE"], foramen: "Hypoglossal canal", color: "#00d4a8",
    origin: "Medulla.",
    termination: "All intrinsic + most extrinsic tongue muscles (except palatoglossus = X).",
    function: ["Tongue movement"],
    clinical: [
      { c: "LMN lesion", d: "Tongue deviates TOWARDS the lesion (paralysed genioglossus can't push out)." },
      { c: "UMN lesion", d: "Tongue deviates AWAY from the lesion (loss of contralateral upper motor input)." },
      { c: "Fasciculations + wasting", d: "Suggest LMN — classically ALS." }
    ],
    mnemonic: "LMN — points TO the lesion. UMN — points AWAY.",
    embryo: "Occipital somites.",
    test: "Protrude tongue (look for deviation, fasciculations, wasting)."
  }
];

export const MUSCLES_DATA = [
  { id: "m1", name: "Supraspinatus", region: "Upper Limb", group: "Rotator Cuff (SITS)",
    origin: "Supraspinous fossa of scapula", insertion: "Superior facet of greater tubercle",
    action: "Initiates abduction (0–15°); GH stabiliser", nerve: "Suprascapular n. (C5, C6)",
    blood: "Suprascapular a.",
    clinical: ["Most commonly torn rotator cuff tendon (~95%)","Painful arc 60–120°","+ve drop arm test","Empty can / Jobe test"],
    tests: ["Drop arm","Empty can (Jobe)","Neer","Hawkins-Kennedy"]
  },
  { id: "m2", name: "Infraspinatus", region: "Upper Limb", group: "Rotator Cuff (SITS)",
    origin: "Infraspinous fossa", insertion: "Middle facet of greater tubercle",
    action: "External rotation (60% of total); GH stabiliser", nerve: "Suprascapular n. (C5, C6)",
    blood: "Suprascapular & circumflex scapular a.",
    clinical: ["2nd most commonly torn RC","Spinoglenoid notch entrapment (cyst from SLAP tear) → isolated infraspinatus wasting"],
    tests: ["External rotation lag sign"]
  },
  { id: "m3", name: "Subscapularis", region: "Upper Limb", group: "Rotator Cuff (SITS)",
    origin: "Subscapular fossa", insertion: "Lesser tubercle of humerus",
    action: "Medial rotation of arm; GH stabiliser", nerve: "Upper + lower subscapular n. (C5–C7)",
    blood: "Subscapular a.",
    clinical: ["Tear → loss of internal rotation strength"],
    tests: ["Lift-off (Gerber)","Belly-press","Bear hug"]
  },
  { id: "m4", name: "Deltoid", region: "Upper Limb", group: "Shoulder",
    origin: "Lateral clavicle, acromion, spine of scapula", insertion: "Deltoid tuberosity of humerus",
    action: "Anterior: flexion + IR. Middle: abduction (15–90°). Posterior: extension + ER.", nerve: "Axillary n. (C5, C6)",
    blood: "Posterior circumflex humeral a.",
    clinical: ["Axillary n. injury (surgical neck fracture, anterior dislocation) → loss of abduction beyond 15°, regimental badge anaesthesia"],
    tests: ["Regimental badge sensation"]
  },
  { id: "m5", name: "Biceps brachii", region: "Upper Limb", group: "Arm — Anterior",
    origin: "Long head: supraglenoid tubercle. Short head: coracoid process.", insertion: "Radial tuberosity + bicipital aponeurosis",
    action: "Supination of forearm (primary); flexion of elbow", nerve: "Musculocutaneous n. (C5, C6)",
    blood: "Brachial a.",
    clinical: ["Long head rupture → 'Popeye sign' (distal bulge)","Bicipital tendinitis in overhead athletes"],
    tests: ["Speed's test","Yergason's test"]
  },
  { id: "m6", name: "Gluteus medius", region: "Lower Limb", group: "Gluteal",
    origin: "External ilium between anterior and posterior gluteal lines", insertion: "Lateral facet of greater trochanter",
    action: "Hip abduction; pelvic stabilisation in single-leg stance", nerve: "Superior gluteal n. (L4, L5, S1)",
    blood: "Superior gluteal a.",
    clinical: ["Weakness → Trendelenburg sign: pelvis drops to OPPOSITE side on single-leg stance","Common in post-hip surgery, superior gluteal n. injury"],
    tests: ["Trendelenburg test"]
  },
  { id: "m7", name: "Quadriceps femoris", region: "Lower Limb", group: "Thigh — Anterior",
    origin: "RF: AIIS. Vasti: femur.", insertion: "Tibial tuberosity (via patellar ligament)",
    action: "Knee extension; RF also flexes hip", nerve: "Femoral n. (L2, L3, L4)",
    blood: "Femoral a. (profunda femoris)",
    clinical: ["VMO weakness → patellar maltracking","Quadriceps tendon rupture: high patella, palpable defect"],
    tests: ["Straight leg raise","Patellar reflex (L3, L4)"]
  },
  { id: "m8", name: "Gastrocnemius", region: "Lower Limb", group: "Leg — Posterior superficial",
    origin: "Medial & lateral femoral condyles", insertion: "Calcaneus via Achilles tendon",
    action: "Plantarflexion of ankle; knee flexion", nerve: "Tibial n. (S1, S2)",
    blood: "Sural a.",
    clinical: ["Achilles rupture: audible 'pop', + Thompson test (squeezing calf → no plantarflexion)","'Tennis leg' — medial head tear"],
    tests: ["Thompson (Simmonds) test"]
  }
];

export const MNEMONICS_DATA = [
  { cat: "Cranial Nerves", title: "Names of CN I–XII in order",
    phrase: "Oh Oh Oh, To Touch And Feel Very Good Velvet, Such Heaven",
    expand: "Olfactory · Optic · Oculomotor · Trochlear · Trigeminal · Abducens · Facial · Vestibulocochlear · Glossopharyngeal · Vagus · Spinal Accessory · Hypoglossal",
    note: "First letter of each word = first letter of the cranial nerve, in numerical order I–XII."
  },
  { cat: "Cranial Nerves", title: "CN modality (sensory / motor / mixed)",
    phrase: "Some Say Marry Money But My Brother Says Big Brains Matter More",
    expand: "S · S · M · M · B · M · B · S · B · B · M · M (B = Both/Mixed)",
    note: "Tracks I–XII in order. CN VIII can also be tested as 'S' since classical teaching is sensory only."
  },
  { cat: "Shoulder", title: "Rotator cuff muscles",
    phrase: "SITS",
    expand: "Supraspinatus · Infraspinatus · Teres minor · Subscapularis",
    note: "All insert on the greater tubercle EXCEPT subscapularis (lesser tubercle)."
  },
  { cat: "Brachial Plexus", title: "Brachial plexus organisation",
    phrase: "Robbers Take Dollars, Cash Becomes Theirs",
    expand: "Roots · Trunks · Divisions · Cords · Branches (Terminal)",
    note: "C5–T1 → 3 trunks → ant/post divisions → 3 cords → 5 terminal branches."
  },
  { cat: "Brachial Plexus", title: "Terminal branches",
    phrase: "My Aunt Raped My Uncle",
    expand: "Musculocutaneous · Axillary · Radial · Median · Ulnar",
    note: "Five terminal branches of the brachial plexus from lateral to medial."
  },
  { cat: "Hand", title: "Carpal bones (proximal → distal, lateral → medial)",
    phrase: "Some Lovers Try Positions That They Can't Handle",
    expand: "Scaphoid · Lunate · Triquetrum · Pisiform · Trapezium · Trapezoid · Capitate · Hamate",
    note: "Scaphoid is most commonly fractured (FOOSH) → snuffbox tenderness. Lunate most commonly dislocated."
  },
  { cat: "Wrist", title: "Anatomical snuffbox borders",
    phrase: "EPB & APL laterally, EPL medially",
    expand: "Lateral: Extensor Pollicis Brevis + Abductor Pollicis Longus. Medial: Extensor Pollicis Longus.",
    note: "Floor = scaphoid + trapezium. Contents: radial artery, superficial branch of radial n."
  },
  { cat: "Head & Neck", title: "Branches of facial nerve (CN VII)",
    phrase: "To Zanzibar By Motor Car",
    expand: "Temporal · Zygomatic · Buccal · Mandibular · Cervical",
    note: "Five terminal branches of CN VII after exiting parotid gland."
  },
  { cat: "Spinal Cord", title: "Spinothalamic tract — what it carries",
    phrase: "Pain & Temp on Crossing",
    expand: "Pain · Temperature · Crude touch — fibres DECUSSATE 1–2 levels above entry (anterior white commissure).",
    note: "Contrast with DCML — proprioception/vibration/fine touch, decussates in MEDULLA."
  }
];

export const QUIZ_DATA = [
  { cat: "Cranial Nerves", diff: "Hard",
    q: "A 58-year-old presents with sudden ptosis, a 'down and out' eye, and a fixed dilated pupil. CT angiogram is most likely to reveal which lesion?",
    opts: [
      "Diabetic microvascular ischaemia of CN III",
      "Posterior communicating artery aneurysm",
      "Cavernous sinus thrombosis",
      "Pituitary apoplexy"
    ],
    answer: 1,
    explain: "Pupillary involvement in CN III palsy points to a SURGICAL cause. Parasympathetic fibres run on the outside of the nerve and are compressed first by space-occupying lesions. PCom aneurysm is the classic cause — it is a surgical emergency due to risk of subarachnoid haemorrhage."
  },
  { cat: "Brachial Plexus", diff: "Medium",
    q: "A newborn delivered by shoulder dystocia has the right arm adducted, internally rotated, and pronated — the classic 'waiter's tip' posture. Which roots are most likely involved?",
    opts: ["C5–C6 (upper trunk)", "C7 alone", "C8–T1 (lower trunk)", "C5–T1 (entire plexus)"],
    answer: 0,
    explain: "Erb's palsy results from injury to the UPPER trunk (C5–C6) — typically obstetric shoulder dystocia or motorcycle injury. Loss of axillary (deltoid, teres minor), suprascapular (supraspinatus, infraspinatus), and musculocutaneous (biceps) function produces the waiter's tip."
  },
  { cat: "Muscles", diff: "Easy",
    q: "Which muscle's weakness causes a positive Trendelenburg sign?",
    opts: ["Gluteus maximus","Gluteus medius","Iliopsoas","Tensor fasciae latae"],
    answer: 1,
    explain: "Gluteus medius (superior gluteal n., L4–L5) is the key abductor stabilising the pelvis in single-leg stance. Its weakness causes the contralateral pelvis to drop — Trendelenburg sign."
  }
];
