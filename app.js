const STORAGE_KEY = "fuelup-nutrition-v1";
const DEEPSEEK_SETTINGS_KEY = "fuelup-deepseek-v1";
const CLOUD_SYNC_KEY = "fuelup-cloud-sync-v1";
const CLOUD_SYNC_CONFIG = {
  url: "https://pxsbymkfqgexygktaokh.supabase.co",
  publishableKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4c2J5bWtmcWdleHlna3Rhb2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwMTc5NjYsImV4cCI6MjEwODU5Mzk2Nn0.JsujQANAdEXqDVeyGQxN6puH155PNt2SyhXzn0vg_Ls",
};
const DATA_VERSION = 8;

const GOAL_PRESETS = {
  cut: {
    label: "减脂",
    calories: 1800,
    protein: 130,
    carbs: 170,
    fat: 55,
    fiber: 25,
  },
  bulk: {
    label: "增肌",
    calories: 2500,
    protein: 160,
    carbs: 320,
    fat: 75,
    fiber: 30,
  },
  maintain: {
    label: "维持",
    calories: 2200,
    protein: 140,
    carbs: 250,
    fat: 65,
    fiber: 28,
  },
};

const CATEGORY_STYLES = {
  蛋白: { short: "鸡", accent: "#ffd8c7" },
  主食: { short: "谷", accent: "#e8ff73" },
  蛋类: { short: "蛋", accent: "#ffd967" },
  蔬果: { short: "蔬", accent: "#c9f2be" },
  乳品: { short: "乳", accent: "#d8e9ff" },
  我的: { short: "我", accent: "#dacdff" },
  其他: { short: "食", accent: "#dfdcf0" },
};

const EXERCISE_METS = {
  none: { label: "无训练", met: 0 },
  incline_walk: { label: "爬坡", met: 6 },
  strength: { label: "力量训练", met: 5 },
};

const INTENSITY_FACTORS = {
  light: 0.85,
  moderate: 1,
  hard: 1.15,
};

const STRENGTH_FOCUS = {
  upper: "上肢",
  lower: "下肢",
  full: "全身",
};

const STARTER_PRODUCTS = [
  {
    id: "starter-oats",
    name: "100% 有机燕麦片",
    brand: "好麦多",
    category: "主食",
    baseGrams: 100,
    servingGrams: 35,
    basis: "per100",
    energyKj: 1543,
    protein: 14,
    fat: 6.8,
    carbs: 56.2,
    fiber: 12.2,
    sugar: 1.1,
    sodium: 0,
  },
  {
    id: "starter-chicken-leg",
    name: "去皮水煮鸡腿（原味）",
    brand: "鲨鱼菲特",
    category: "蛋白",
    baseGrams: 100,
    servingGrams: 85,
    basis: "per100",
    energyKj: 645,
    protein: 28.2,
    fat: 4.2,
    carbs: 0.6,
    fiber: 0,
    sugar: 0,
    sodium: 276,
  },
  {
    id: "starter-chicken-breast",
    name: "即食鸡胸肉",
    brand: "动之美",
    category: "蛋白",
    baseGrams: 100,
    servingGrams: 100,
    basis: "per100",
    energyKj: 520,
    protein: 28,
    fat: 1.2,
    carbs: 0,
    fiber: 0,
    sugar: 0,
    sodium: 604,
  },
  {
    id: "starter-pistol-leg",
    name: "去皮手枪鸡腿",
    brand: "动之美",
    category: "蛋白",
    baseGrams: 100,
    servingGrams: 100,
    basis: "per100",
    boneIn: true,
    energyKj: 632,
    protein: 23.7,
    fat: 6.2,
    carbs: 0,
    fiber: 0,
    sugar: 0,
    sodium: 577,
  },
  {
    id: "starter-toast",
    name: "酵母蛋白全麦吐司（青柠味）",
    brand: "燃铁猩球",
    category: "主食",
    baseGrams: 100,
    servingGrams: 50,
    basis: "per100",
    energyKj: 1089,
    protein: 15.2,
    fat: 2.7,
    carbs: 39.3,
    fiber: 7.8,
    sugar: 4,
    sodium: 260,
  },
  {
    id: "starter-egg",
    name: "清水煮蛋",
    brand: "杨生记",
    category: "蛋类",
    baseGrams: 100,
    servingGrams: 35,
    basis: "per100",
    energyKj: 648,
    protein: 13.8,
    fat: 10.8,
    carbs: 0.8,
    fiber: 0,
    sugar: 0,
    sodium: 274,
  },
];

const elements = {
  dateLabel: document.querySelector("#dateLabel"),
  goalButtons: [...document.querySelectorAll(".goal-button")],
  targetSettingsButton: document.querySelector("#targetSettingsButton"),
  dashboardGoal: document.querySelector("#dashboardGoal"),
  remainingCalories: document.querySelector("#remainingCalories"),
  targetCaloriesLabel: document.querySelector("#targetCaloriesLabel"),
  calorieTrack: document.querySelector("#calorieTrack"),
  consumedCalories: document.querySelector("#consumedCalories"),
  energyVisual: document.querySelector("#energyVisual"),
  proteinDashboard: document.querySelector("#proteinDashboard"),
  proteinTrack: document.querySelector("#proteinTrack"),
  remainingProtein: document.querySelector("#remainingProtein"),
  coachMessage: document.querySelector("#coachMessage"),
  proteinPercent: document.querySelector("#proteinPercent"),
  proteinTotal: document.querySelector("#proteinTotal"),
  proteinTarget: document.querySelector("#proteinTarget"),
  proteinBar: document.querySelector("#proteinBar"),
  carbPercent: document.querySelector("#carbPercent"),
  carbTotal: document.querySelector("#carbTotal"),
  carbTarget: document.querySelector("#carbTarget"),
  carbBar: document.querySelector("#carbBar"),
  fatPercent: document.querySelector("#fatPercent"),
  fatTotal: document.querySelector("#fatTotal"),
  fatTarget: document.querySelector("#fatTarget"),
  fatBar: document.querySelector("#fatBar"),
  fiberPercent: document.querySelector("#fiberPercent"),
  fiberTotal: document.querySelector("#fiberTotal"),
  fiberTarget: document.querySelector("#fiberTarget"),
  fiberBar: document.querySelector("#fiberBar"),
  mealCount: document.querySelector("#mealCount"),
  clearMealsButton: document.querySelector("#clearMealsButton"),
  plateCalories: document.querySelector("#plateCalories"),
  sodiumTotal: document.querySelector("#sodiumTotal"),
  mealList: document.querySelector("#mealList"),
  emptyMeals: document.querySelector("#emptyMeals"),
  productSearch: document.querySelector("#productSearch"),
  filterChips: [...document.querySelectorAll(".filter-chip")],
  productGrid: document.querySelector("#productGrid"),
  noResults: document.querySelector("#noResults"),
  openProductDialogButton: document.querySelector("#openProductDialogButton"),
  openQuickAddButton: document.querySelector("#openQuickAddButton"),
  quickAddDialog: document.querySelector("#quickAddDialog"),
  quickFoodSearch: document.querySelector("#quickFoodSearch"),
  quickAddFilters: [...document.querySelectorAll("[data-quick-category]")],
  quickFoodList: document.querySelector("#quickFoodList"),
  quickAddNewProductButton: document.querySelector("#quickAddNewProductButton"),
  syncButton: document.querySelector("#syncButton"),
  syncDialog: document.querySelector("#syncDialog"),
  syncSetupView: document.querySelector("#syncSetupView"),
  syncActiveView: document.querySelector("#syncActiveView"),
  createSyncButton: document.querySelector("#createSyncButton"),
  connectSyncForm: document.querySelector("#connectSyncForm"),
  syncCodeDisplay: document.querySelector("#syncCodeDisplay"),
  copySyncCodeButton: document.querySelector("#copySyncCodeButton"),
  syncUploadButton: document.querySelector("#syncUploadButton"),
  syncPullButton: document.querySelector("#syncPullButton"),
  syncConflictPanel: document.querySelector("#syncConflictPanel"),
  forceSyncButton: document.querySelector("#forceSyncButton"),
  disconnectSyncButton: document.querySelector("#disconnectSyncButton"),
  syncError: document.querySelector("#syncError"),
  syncActiveTitle: document.querySelector("#syncActiveTitle"),
  syncActiveStatus: document.querySelector("#syncActiveStatus"),
  syncActiveDot: document.querySelector("#syncActiveDot"),
  recordContent: document.querySelector("#recordContent"),
  recordTabs: [...document.querySelectorAll(".record-tab")],
  recordExportButton: document.querySelector("#recordExportButton"),
  mobileBottomNav: document.querySelector("#mobileBottomNav"),
  mobileTabs: [...document.querySelectorAll("[data-mobile-tab]")],
  mobileProfileAvatar: document.querySelector("#mobileProfileAvatar"),
  mobileProfileName: document.querySelector("#mobileProfileName"),
  mobileProfileDetail: document.querySelector("#mobileProfileDetail"),
  mobileProfileButton: document.querySelector("#mobileProfileButton"),
  mobileTrainingSettingsButton: document.querySelector("#mobileTrainingSettingsButton"),
  mobileTargetSettingsButton: document.querySelector("#mobileTargetSettingsButton"),
  mobileAiSettingsButton: document.querySelector("#mobileAiSettingsButton"),
  mobileExportButton: document.querySelector("#mobileExportButton"),
  mobileImportButton: document.querySelector("#mobileImportButton"),
  mobileImportInput: document.querySelector("#mobileImportInput"),
  mobileTrainingSummary: document.querySelector("#mobileTrainingSummary"),
  mobileTargetSummary: document.querySelector("#mobileTargetSummary"),
  mobileAiSummary: document.querySelector("#mobileAiSummary"),
  portionDialog: document.querySelector("#portionDialog"),
  portionProductIcon: document.querySelector("#portionProductIcon"),
  portionBrand: document.querySelector("#portionBrand"),
  portionName: document.querySelector("#portionName"),
  portionBasis: document.querySelector("#portionBasis"),
  boneWeightPanel: document.querySelector("#boneWeightPanel"),
  grossPortionGrams: document.querySelector("#grossPortionGrams"),
  boneWeightSummary: document.querySelector("#boneWeightSummary"),
  portionQuantityLabel: document.querySelector("#portionQuantityLabel"),
  portionGrams: document.querySelector("#portionGrams"),
  portionRange: document.querySelector("#portionRange"),
  quickAmounts: document.querySelector("#quickAmounts"),
  previewCalories: document.querySelector("#previewCalories"),
  previewProtein: document.querySelector("#previewProtein"),
  previewCarbs: document.querySelector("#previewCarbs"),
  previewFat: document.querySelector("#previewFat"),
  removePortionButton: document.querySelector("#removePortionButton"),
  confirmPortionButton: document.querySelector("#confirmPortionButton"),
  confirmPortionLabel: document.querySelector("#confirmPortionLabel"),
  productDialog: document.querySelector("#productDialog"),
  productForm: document.querySelector("#productForm"),
  productSheetKicker: document.querySelector("#productSheetKicker"),
  productSheetTitle: document.querySelector("#productSheetTitle"),
  productSheetDescription: document.querySelector("#productSheetDescription"),
  productSubmitLabel: document.querySelector("#productSubmitLabel"),
  productFormError: document.querySelector("#productFormError"),
  nutritionBasisHint: document.querySelector("#nutritionBasisHint"),
  targetDialog: document.querySelector("#targetDialog"),
  targetForm: document.querySelector("#targetForm"),
  aiCoach: document.querySelector("#aiCoach"),
  aiCoachTitle: document.querySelector("#aiCoachTitle"),
  aiVerdictSummary: document.querySelector("#aiVerdictSummary"),
  editCoachSettingsButton: document.querySelector("#editCoachSettingsButton"),
  exerciseBurnValue: document.querySelector("#exerciseBurnValue"),
  metabolismSummary: document.querySelector("#metabolismSummary"),
  trainingSummary: document.querySelector("#trainingSummary"),
  trainingBurnSummary: document.querySelector("#trainingBurnSummary"),
  profileAvatar: document.querySelector("#profileAvatar"),
  todayTrainingHeading: document.querySelector("#todayTrainingHeading"),
  todayTrainingDetail: document.querySelector("#todayTrainingDetail"),
  todayTrainingBurn: document.querySelector("#todayTrainingBurn"),
  openWorkoutDialogButton: document.querySelector("#openWorkoutDialogButton"),
  aiFuelOrbit: document.querySelector("#aiFuelOrbit"),
  aiDailyFuelPercent: document.querySelector("#aiDailyFuelPercent"),
  aiDailyFuelValue: document.querySelector("#aiDailyFuelValue"),
  profileSummary: document.querySelector("#profileSummary"),
  apiStatus: document.querySelector("#apiStatus"),
  workoutType: document.querySelector("#workoutType"),
  workoutFocusField: document.querySelector("#workoutFocusField"),
  workoutFocus: document.querySelector("#workoutFocus"),
  workoutMinutes: document.querySelector("#workoutMinutes"),
  workoutHeartRate: document.querySelector("#workoutHeartRate"),
  workoutActiveCalories: document.querySelector("#workoutActiveCalories"),
  workoutRpe: document.querySelector("#workoutRpe"),
  workoutRpeValue: document.querySelector("#workoutRpeValue"),
  workoutNote: document.querySelector("#workoutNote"),
  workoutDialog: document.querySelector("#workoutDialog"),
  workoutForm: document.querySelector("#workoutForm"),
  workoutEstimateRange: document.querySelector("#workoutEstimateRange"),
  workoutEstimateNote: document.querySelector("#workoutEstimateNote"),
  aiSettingsButton: document.querySelector("#aiSettingsButton"),
  aiCaloriePercent: document.querySelector("#aiCaloriePercent"),
  aiCaloriesRemaining: document.querySelector("#aiCaloriesRemaining"),
  aiCalorieBar: document.querySelector("#aiCalorieBar"),
  aiCalorieNote: document.querySelector("#aiCalorieNote"),
  aiProteinPercent: document.querySelector("#aiProteinPercent"),
  aiProteinRemaining: document.querySelector("#aiProteinRemaining"),
  aiProteinBar: document.querySelector("#aiProteinBar"),
  aiProteinNote: document.querySelector("#aiProteinNote"),
  aiTrainingBadge: document.querySelector("#aiTrainingBadge"),
  aiTrainingNote: document.querySelector("#aiTrainingNote"),
  aiActionCount: document.querySelector("#aiActionCount"),
  aiActionList: document.querySelector("#aiActionList"),
  aiFocusTitle: document.querySelector("#aiFocusTitle"),
  aiFocusPercent: document.querySelector("#aiFocusPercent"),
  aiFocusRing: document.querySelector("#aiFocusRing"),
  aiFocusTags: document.querySelector("#aiFocusTags"),
  aiFocusNote: document.querySelector("#aiFocusNote"),
  aiStaleNotice: document.querySelector("#aiStaleNotice"),
  generateAdviceButton: document.querySelector("#generateAdviceButton"),
  profileDialog: document.querySelector("#profileDialog"),
  profileForm: document.querySelector("#profileForm"),
  profileFormError: document.querySelector("#profileFormError"),
  aiSettingsDialog: document.querySelector("#aiSettingsDialog"),
  aiSettingsForm: document.querySelector("#aiSettingsForm"),
  aiSettingsError: document.querySelector("#aiSettingsError"),
  saveAiSettingsButton: document.querySelector("#saveAiSettingsButton"),
  toast: document.querySelector("#toast"),
};

let state = loadState();
let aiSettings = loadAiSettings();
let activeCategory = "all";
let quickAddCategory = "all";
let returnToQuickAddAfterProduct = false;
let selectedProductId = null;
let editingEntryId = null;
let editingProductId = null;
let recordView = "day";
let recordCursorKey = formatDateKey(new Date());
let cloudSyncMeta = loadCloudSyncMeta();
let syncPushTimer = null;
let syncBusy = false;
let syncApplyingRemote = false;
const isNativeRuntime =
  Boolean(window.Capacitor?.isNativePlatform?.()) ||
  new URLSearchParams(window.location.search).get("native") === "1";
let mobileActiveView = window.localStorage.getItem("fuelup-mobile-tab") || "today";
let toastTimer = null;

function cloneStarterProducts() {
  return STARTER_PRODUCTS.map((product) => ({ ...product }));
}

function createInitialState() {
  return {
    dataVersion: DATA_VERSION,
    products: cloneStarterProducts(),
    entries: [],
    goal: "cut",
    targets: { ...GOAL_PRESETS.cut },
    profile: null,
    workout: {
      type: "none",
      minutes: 0,
      intensity: "moderate",
      note: "",
      rpe: 0,
      avgHeartRate: null,
      activeCalories: null,
      focus: "full",
    },
    workoutDate: formatDateKey(new Date()),
    records: {},
    aiAdvice: null,
    aiAdviceSnapshot: "",
  };
}

function loadState() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return createInitialState();

    const parsed = JSON.parse(stored);
    if (!parsed || !Array.isArray(parsed.products) || !Array.isArray(parsed.entries)) {
      return createInitialState();
    }

    const goal = GOAL_PRESETS[parsed.goal] ? parsed.goal : "cut";
    const today = formatDateKey(new Date());
    const workoutDate = parsed.workoutDate || today;
    const targets = { ...GOAL_PRESETS[goal], ...(parsed.targets || {}) };

    const products = parsed.products.map(normalizeProduct).filter(Boolean);
    const version = positiveNumber(parsed.dataVersion, 1);
    const profile = parsed.profile ? normalizeProfile(parsed.profile) : null;
    if (version < DATA_VERSION) {
      for (const product of products) {
        if (product.id === "starter-oats") product.servingGrams = 35;
        if (product.id === "starter-chicken-breast") product.brand = "动之美";
        if (product.id === "starter-pistol-leg") product.boneIn = true;
      }
      if (profile && !profile.manualBmr) profile.manualBmr = 1600;
    }

    return {
      dataVersion: DATA_VERSION,
      products,
      entries: parsed.entries
        .map((entry) => ({
          id: String(entry.id || makeId("entry")),
          productId: String(entry.productId || ""),
          grams: positiveNumber(entry.grams, 0),
          grossGrams:
            positiveNumber(entry.grossGrams, 0) > 0
              ? positiveNumber(entry.grossGrams, 0)
              : null,
        }))
        .filter((entry) => entry.productId && entry.grams > 0),
      goal,
      targets: normalizeTargets(targets),
      profile,
      workout:
        workoutDate === today
          ? normalizeWorkout(parsed.workout)
          : normalizeWorkout({ type: "none", minutes: 0, intensity: "moderate", note: "" }),
      workoutDate: today,
      records: normalizeRecords(parsed.records),
      aiAdvice: normalizeAiAdvice(parsed.aiAdvice),
      aiAdviceSnapshot:
        typeof parsed.aiAdviceSnapshot === "string" ? parsed.aiAdviceSnapshot : "",
    };
  } catch (error) {
    console.warn("无法读取本地数据，已载入默认商品库。", error);
    return createInitialState();
  }
}

function normalizeProduct(product) {
  if (!product || !product.name) return null;
  const baseGrams = Math.max(1, positiveNumber(product.baseGrams, 100));
  return {
    id: String(product.id || makeId("product")),
    name: String(product.name).slice(0, 40),
    brand: String(product.brand || "自定义商品").slice(0, 30),
    category: CATEGORY_STYLES[product.category] ? product.category : "其他",
    baseGrams,
    servingGrams: Math.max(1, positiveNumber(product.servingGrams, 100)),
    basis:
      product.basis === "perServing" || (!product.basis && baseGrams !== 100)
        ? "perServing"
        : "per100",
    energyKj: Math.max(0, positiveNumber(product.energyKj, 0)),
    protein: Math.max(0, positiveNumber(product.protein, 0)),
    fat: Math.max(0, positiveNumber(product.fat, 0)),
    carbs: Math.max(0, positiveNumber(product.carbs, 0)),
    fiber: Math.max(0, positiveNumber(product.fiber, 0)),
    sugar: Math.max(0, positiveNumber(product.sugar, 0)),
    sodium: Math.max(0, positiveNumber(product.sodium, 0)),
    boneIn: Boolean(product.boneIn),
    isCustom: Boolean(product.isCustom),
  };
}

function normalizeTargets(targets) {
  return {
    label: String(targets.label || "自定义"),
    calories: Math.max(1, positiveNumber(targets.calories, 1800)),
    protein: Math.max(0, positiveNumber(targets.protein, 130)),
    carbs: Math.max(0, positiveNumber(targets.carbs, 170)),
    fat: Math.max(0, positiveNumber(targets.fat, 55)),
    fiber: Math.max(0, positiveNumber(targets.fiber, 25)),
  };
}

function normalizeProfile(profile) {
  if (!profile) return null;
  const manualBmr = positiveNumber(profile.manualBmr, 0);
  return {
    sex: profile.sex === "female" ? "female" : "male",
    age: Math.min(100, Math.max(14, positiveNumber(profile.age, 25))),
    height: Math.min(230, Math.max(120, positiveNumber(profile.height, 175))),
    weight: Math.min(300, Math.max(30, positiveNumber(profile.weight, 70))),
    activity: Math.min(1.55, Math.max(1.2, positiveNumber(profile.activity, 1.3))),
    autoTargets: profile.autoTargets !== false,
    manualBmr: manualBmr > 0 ? Math.min(5000, manualBmr) : null,
  };
}

function normalizeWorkout(workout) {
  const type = EXERCISE_METS[workout?.type]
    ? workout.type
    : workout?.type === "walking"
      ? "incline_walk"
      : "none";
  const legacyIntensity = INTENSITY_FACTORS[workout?.intensity] ? workout.intensity : "moderate";
  const fallbackRpe = legacyIntensity === "light" ? 4 : legacyIntensity === "hard" ? 8 : 6;
  const rpe =
    type === "none"
      ? 0
      : Math.min(10, Math.max(1, positiveNumber(workout?.rpe, fallbackRpe)));
  const intensity = rpe <= 4 ? "light" : rpe >= 8 ? "hard" : "moderate";
  const heartRate = positiveNumber(workout?.avgHeartRate, 0);
  const activeCalories = positiveNumber(workout?.activeCalories, 0);
  const focus = STRENGTH_FOCUS[workout?.focus] ? workout.focus : "full";
  return {
    type,
    minutes:
      type === "none"
        ? 0
        : Math.min(600, Math.max(0, positiveNumber(workout?.minutes, 0))),
    intensity,
    note: type === "none" ? "" : String(workout?.note || "").slice(0, 80),
    rpe,
    avgHeartRate:
      type === "none" || heartRate <= 0 ? null : Math.min(240, Math.round(heartRate)),
    activeCalories:
      type === "none" || activeCalories <= 0 ? null : Math.min(5000, Math.round(activeCalories)),
    focus: type === "strength" ? focus : "full",
  };
}

function normalizeRecords(records) {
  if (!records || typeof records !== "object" || Array.isArray(records)) return {};
  const normalized = {};

  for (const [dateKey, record] of Object.entries(records)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey) || !record || typeof record !== "object") {
      continue;
    }
    const weight = positiveNumber(record.weightKg, 0);
    normalized[dateKey] = {
      weightKg: weight > 0 ? round(weight, 1) : null,
      calories: round(positiveNumber(record.calories, 0), 1),
      protein: round(positiveNumber(record.protein, 0), 1),
      carbs: round(positiveNumber(record.carbs, 0), 1),
      fat: round(positiveNumber(record.fat, 0), 1),
      fiber: round(positiveNumber(record.fiber, 0), 1),
      dailyFuel: Math.round(positiveNumber(record.dailyFuel, 0)),
      estimatedBurn: Math.round(positiveNumber(record.estimatedBurn, 0)),
      deficit:
        record.deficit === null || record.deficit === undefined
          ? null
          : Math.round(Number(record.deficit)),
      trainingType: EXERCISE_METS[record.trainingType] ? record.trainingType : "none",
      trainingMinutes: Math.round(positiveNumber(record.trainingMinutes, 0)),
      trainingIntensity: INTENSITY_FACTORS[record.trainingIntensity]
        ? record.trainingIntensity
        : "moderate",
      trainingRpe: Math.min(10, Math.max(0, positiveNumber(record.trainingRpe, 0))),
      trainingHeartRate:
        positiveNumber(record.trainingHeartRate, 0) > 0
          ? Math.round(positiveNumber(record.trainingHeartRate, 0))
          : null,
      trainingActiveCalories:
        positiveNumber(record.trainingActiveCalories, 0) > 0
          ? Math.round(positiveNumber(record.trainingActiveCalories, 0))
          : null,
      trainingFocus: STRENGTH_FOCUS[record.trainingFocus] ? record.trainingFocus : "full",
      exerciseBurn: Math.round(positiveNumber(record.exerciseBurn, 0)),
      hasNutrition: Boolean(record.hasNutrition),
      updatedAt: String(record.updatedAt || ""),
    };
  }
  return normalized;
}

function normalizeAiAdvice(advice) {
  if (!advice || typeof advice !== "object" || Array.isArray(advice)) return null;
  const actions = Array.isArray(advice.actions)
    ? advice.actions.slice(0, 3).map((action) => ({
        priority: String(action?.priority || "建议").slice(0, 8),
        title: String(action?.title || "").slice(0, 24),
        detail: String(action?.detail || "").slice(0, 100),
      })).filter((action) => action.title)
    : [];
  if (!advice.headline || actions.length === 0) return null;
  return {
    headline: String(advice.headline).slice(0, 80),
    summary: String(advice.summary || "").slice(0, 240),
    actions,
    closingNote: String(advice.closingNote || "").slice(0, 140),
  };
}

function loadAiSettings() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(DEEPSEEK_SETTINGS_KEY) || "{}");
    return {
      apiKey: String(stored.apiKey || ""),
      model: stored.model === "deepseek-reasoner" ? "deepseek-reasoner" : "deepseek-chat",
    };
  } catch {
    return { apiKey: "", model: "deepseek-chat" };
  }
}

function saveAiSettings(settings) {
  aiSettings = {
    apiKey: String(settings.apiKey || "").trim(),
    model: settings.model === "deepseek-reasoner" ? "deepseek-reasoner" : "deepseek-chat",
  };
  window.localStorage.setItem(DEEPSEEK_SETTINGS_KEY, JSON.stringify(aiSettings));
}

function loadCloudSyncMeta() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(CLOUD_SYNC_KEY) || "null");
    const code = normalizeSyncCode(stored?.code || "");
    if (!stored || code.length !== 32) return null;
    return {
      code,
      syncId: String(stored.syncId || ""),
      version: Math.max(0, positiveNumber(stored.version, 0)),
      lastSyncedAt: String(stored.lastSyncedAt || ""),
      dirty: Boolean(stored.dirty),
      conflict: Boolean(stored.conflict),
    };
  } catch {
    return null;
  }
}

function saveCloudSyncMeta() {
  if (!cloudSyncMeta) {
    window.localStorage.removeItem(CLOUD_SYNC_KEY);
    return;
  }
  window.localStorage.setItem(CLOUD_SYNC_KEY, JSON.stringify(cloudSyncMeta));
}

function normalizeSyncCode(value) {
  return String(value || "").toLowerCase().replace(/[^a-f0-9]/g, "");
}

function displaySyncCode(code) {
  return normalizeSyncCode(code).toUpperCase().match(/.{1,4}/g)?.join("-") || "";
}

function generateSyncCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function bytesToBase64(bytes) {
  let binary = "";
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function digestBytes(value) {
  return new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
  );
}

async function deriveSyncIdentity(code) {
  const normalized = normalizeSyncCode(code);
  const syncId = [...(await digestBytes(`fuelup-sync-id:${normalized}`))]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  const keyBytes = await digestBytes(`fuelup-sync-key:${normalized}`);
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
  return { normalized, syncId, key };
}

async function encryptCloudState(code) {
  const { normalized, syncId, key } = await deriveSyncIdentity(code);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(state));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
  return {
    normalized,
    syncId,
    iv: bytesToBase64(iv),
    ciphertext: bytesToBase64(new Uint8Array(encrypted)),
  };
}

async function decryptCloudState(payload, code) {
  const { key } = await deriveSyncIdentity(code);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToBytes(payload.iv) },
    key,
    base64ToBytes(payload.ciphertext)
  );
  return JSON.parse(new TextDecoder().decode(decrypted));
}

async function cloudRpc(functionName, payload) {
  const response = await fetch(
    `${CLOUD_SYNC_CONFIG.url}/rest/v1/rpc/${functionName}`,
    {
      method: "POST",
      headers: {
        apikey: CLOUD_SYNC_CONFIG.publishableKey,
        Authorization: `Bearer ${CLOUD_SYNC_CONFIG.publishableKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const text = await response.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = null;
  }
  if (!response.ok) {
    throw new Error(body?.message || text.slice(0, 180) || "云端同步请求失败");
  }
  return body;
}

async function pullCloudPayload(codeInput) {
  const { normalized, syncId } = await deriveSyncIdentity(codeInput);
  const payload = await cloudRpc("sync_pull_vault", { p_sync_id: syncId });
  return {
    normalized,
    syncId,
    payload: payload && !Array.isArray(payload) ? payload : null,
  };
}

async function pushCloudState({ expectedVersion, codeInput = cloudSyncMeta?.code } = {}) {
  if (!codeInput || syncBusy || syncApplyingRemote) return;
  syncBusy = true;
  setSyncVisual("busy", "正在上传到云端");
  try {
    const encrypted = await encryptCloudState(codeInput);
    const result = await cloudRpc("sync_push_vault", {
      p_sync_id: encrypted.syncId,
      p_ciphertext: encrypted.ciphertext,
      p_iv: encrypted.iv,
      p_expected_version:
        expectedVersion ?? cloudSyncMeta?.version ?? 0,
    });
    if (result?.conflict) {
      cloudSyncMeta = {
        ...cloudSyncMeta,
        code: encrypted.normalized,
        syncId: encrypted.syncId,
        dirty: true,
        conflict: true,
      };
      saveCloudSyncMeta();
      setSyncVisual("error", "另有设备更新了云端，需要选择同步方向");
      elements.syncConflictPanel.hidden = false;
      renderSyncDialog();
      return false;
    }

    cloudSyncMeta = {
      code: encrypted.normalized,
      syncId: encrypted.syncId,
      version: Number(result?.version || (cloudSyncMeta?.version || 0) + 1),
      lastSyncedAt: new Date().toISOString(),
      dirty: false,
      conflict: false,
    };
    saveCloudSyncMeta();
    setSyncVisual("ready", "本机数据已同步");
    elements.syncConflictPanel.hidden = true;
    renderSyncDialog();
    return true;
  } catch (error) {
    setSyncVisual("error", `同步失败：${error.message}`);
    return false;
  } finally {
    syncBusy = false;
  }
}

async function applyCloudState(payload, code, version, { ask = true } = {}) {
  if (ask) {
    const confirmed = window.confirm(
      "从云端恢复会用云端记录覆盖当前浏览器的数据。当前数据会保留一份本地备份，是否继续？"
    );
    if (!confirmed) return false;
  }

  const restored = await decryptCloudState(payload, code);
  if (!restored || !Array.isArray(restored.products) || !Array.isArray(restored.entries)) {
    throw new Error("云端数据格式不正确。");
  }
  window.localStorage.setItem("fuelup-sync-backup", JSON.stringify(state));
  syncApplyingRemote = true;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(restored));
  const { syncId } = await deriveSyncIdentity(code);
  cloudSyncMeta = {
    code: normalizeSyncCode(code),
    syncId,
    version,
    lastSyncedAt: new Date().toISOString(),
    dirty: false,
    conflict: false,
  };
  saveCloudSyncMeta();
  window.location.reload();
  return true;
}

function scheduleCloudPush() {
  if (
    isNativeRuntime ||
    !cloudSyncMeta ||
    cloudSyncMeta.conflict ||
    syncApplyingRemote ||
    !window.FUELUP_CLOUD_INITIALIZED
  ) {
    return;
  }
  cloudSyncMeta.dirty = true;
  saveCloudSyncMeta();
  setSyncVisual("busy", "等待同步本机修改");
  window.clearTimeout(syncPushTimer);
  syncPushTimer = window.setTimeout(() => {
    pushCloudState().catch(() => {});
  }, 1400);
}

function setSyncVisual(mode, message) {
  if (!elements.syncButton) return;
  elements.syncButton.classList.toggle("is-ready", mode === "ready");
  elements.syncButton.classList.toggle("is-busy", mode === "busy");
  elements.syncButton.classList.toggle("is-error", mode === "error");
  elements.syncButton.title = message;
  elements.syncActiveStatus.textContent = message;
  elements.syncActiveTitle.textContent =
    mode === "ready" ? "云端同步已启用" : mode === "busy" ? "正在同步" : mode === "error" ? "同步需要处理" : "设备同步";
  elements.syncActiveDot.className = "";
  elements.syncActiveStatus.parentElement.classList.toggle("is-ready", mode === "ready");
  elements.syncActiveStatus.parentElement.classList.toggle("is-error", mode === "error");
}

function renderSyncDialog() {
  const active = Boolean(cloudSyncMeta);
  elements.syncSetupView.hidden = active;
  elements.syncActiveView.hidden = !active;
  elements.syncError.classList.remove("is-visible");
  if (!active) {
    elements.syncButton.classList.remove("is-ready", "is-busy", "is-error");
    elements.syncButton.title = "设备同步未启用";
    return;
  }

  elements.syncCodeDisplay.value = displaySyncCode(cloudSyncMeta.code);
  elements.syncConflictPanel.hidden = !cloudSyncMeta.conflict;
  const lastSync = cloudSyncMeta.lastSyncedAt
    ? new Date(cloudSyncMeta.lastSyncedAt).toLocaleString("zh-CN")
    : "尚未完成";
  setSyncVisual(
    cloudSyncMeta.dirty ? "busy" : "ready",
    cloudSyncMeta.dirty ? "本机有尚未同步的修改" : `最近同步：${lastSync}`
  );
}

async function createCloudSync() {
  if (cloudSyncMeta) return;
  const code = generateSyncCode();
  const { syncId } = await deriveSyncIdentity(code);
  cloudSyncMeta = {
    code,
    syncId,
    version: 0,
    lastSyncedAt: "",
    dirty: true,
    conflict: false,
  };
  saveCloudSyncMeta();
  renderSyncDialog();
  const ok = await pushCloudState({ expectedVersion: 0, codeInput: code });
  if (ok) showToast("同步码已创建，云端数据已上传");
}

async function connectCloudSync(form) {
  const code = normalizeSyncCode(form.elements.syncCode.value);
  const useLocalData = Boolean(form.elements.useLocalData.checked);
  if (code.length !== 32) {
    elements.syncError.textContent = "同步码无效，请粘贴完整的 32 位同步码。";
    elements.syncError.classList.add("is-visible");
    return;
  }

  elements.syncError.classList.remove("is-visible");
  setSyncVisual("busy", "正在查找云端记录");
  try {
    const remote = await pullCloudPayload(code);
    if (remote.payload) {
      if (useLocalData) {
        const confirmed = window.confirm(
          "将使用当前这个页面里的数据覆盖云端记录。请先确认这里已经包含今晚的最新数据，是否继续？"
        );
        if (!confirmed) {
          setSyncVisual("idle", "");
          return;
        }
        cloudSyncMeta = {
          code,
          syncId: remote.syncId,
          version: remote.payload.version,
          lastSyncedAt: "",
          dirty: true,
          conflict: false,
        };
        saveCloudSyncMeta();
        renderSyncDialog();
        const ok = await pushCloudState({
          expectedVersion: remote.payload.version,
          codeInput: code,
        });
        if (ok) showToast("当前页面数据已上传并覆盖云端");
        return;
      }
      await applyCloudState(remote.payload, code, remote.payload.version, { ask: true });
      return;
    }

    if (!window.confirm("没有找到这个同步码的云端记录。要用当前设备的资料创建同步吗？")) {
      setSyncVisual("idle", "");
      return;
    }
    cloudSyncMeta = {
      code,
      syncId: remote.syncId,
      version: 0,
      lastSyncedAt: "",
      dirty: true,
      conflict: false,
    };
    saveCloudSyncMeta();
    renderSyncDialog();
    const ok = await pushCloudState({ expectedVersion: 0, codeInput: code });
    if (ok) showToast("已使用该同步码连接云端");
  } catch (error) {
    elements.syncError.textContent = `连接失败：${error.message}`;
    elements.syncError.classList.add("is-visible");
    setSyncVisual("error", "无法连接云端同步");
  }
}

async function pullCloudNow({ ask = true } = {}) {
  if (!cloudSyncMeta || syncBusy || syncApplyingRemote) return false;
  syncBusy = true;
  setSyncVisual("busy", "正在检查云端更新");
  try {
    const remote = await pullCloudPayload(cloudSyncMeta.code);
    if (!remote.payload) {
      cloudSyncMeta.dirty = true;
      saveCloudSyncMeta();
      setSyncVisual("error", "云端还没有记录，请先上传本机数据");
      return false;
    }
    if (remote.payload.version <= cloudSyncMeta.version) {
      cloudSyncMeta.dirty = false;
      cloudSyncMeta.conflict = false;
      cloudSyncMeta.lastSyncedAt = new Date().toISOString();
      saveCloudSyncMeta();
      setSyncVisual("ready", "已经是最新数据");
      renderSyncDialog();
      if (ask) showToast("云端没有更新的数据");
      return false;
    }
    return await applyCloudState(
      remote.payload,
      cloudSyncMeta.code,
      remote.payload.version,
      { ask }
    );
  } catch (error) {
    elements.syncError.textContent = `读取云端失败：${error.message}`;
    elements.syncError.classList.add("is-visible");
    setSyncVisual("error", "读取云端失败");
    return false;
  } finally {
    syncBusy = false;
  }
}

async function forceCloudOverwrite() {
  if (!cloudSyncMeta) return;
  const confirmed = window.confirm(
    "这会使用当前设备的记录覆盖云端版本，其他设备尚未上传的修改可能丢失。是否继续？"
  );
  if (!confirmed) return;
  try {
    const remote = await pullCloudPayload(cloudSyncMeta.code);
    const version = remote.payload?.version || 0;
    const ok = await pushCloudState({ expectedVersion: version });
    if (ok) {
      cloudSyncMeta.conflict = false;
      saveCloudSyncMeta();
      renderSyncDialog();
      showToast("已使用本机数据覆盖云端");
    }
  } catch (error) {
    elements.syncError.textContent = `覆盖失败：${error.message}`;
    elements.syncError.classList.add("is-visible");
  }
}

async function copySyncCode() {
  if (!cloudSyncMeta) return;
  const code = displaySyncCode(cloudSyncMeta.code);
  try {
    await navigator.clipboard.writeText(code);
  } catch {
    elements.syncCodeDisplay.focus();
    elements.syncCodeDisplay.select();
    document.execCommand("copy");
  }
  showToast("同步码已复制");
}

function openSyncDialog() {
  renderSyncDialog();
  openDialog(elements.syncDialog);
}

async function initializeCloudSync() {
  window.FUELUP_CLOUD_INITIALIZED = true;
  if (isNativeRuntime) {
    elements.syncButton.hidden = true;
    elements.syncDialog.remove();
    return;
  }
  if (!cloudSyncMeta) {
    elements.syncButton.title = "设备同步未启用";
    return;
  }
  elements.syncButton.title = cloudSyncMeta.dirty ? "正在同步本机修改" : "云端同步已启用";
  if (cloudSyncMeta.dirty) {
    await pushCloudState();
  } else {
    await pullCloudNow({ ask: false });
  }
}

async function checkCloudForUpdates() {
  if (!cloudSyncMeta || cloudSyncMeta.dirty || syncBusy || syncApplyingRemote) return;
  await pullCloudNow({ ask: false });
}

function ensureTodayWorkout() {
  const today = formatDateKey(new Date());
  if (state.workoutDate === today) return false;
  state.workoutDate = today;
  state.workout = {
    type: "none",
    minutes: 0,
    intensity: "moderate",
    note: "",
    rpe: 0,
    avgHeartRate: null,
    activeCalories: null,
    focus: "full",
  };
  return true;
}

function persistState() {
  try {
    ensureTodayWorkout();
    syncTodayRecord();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    scheduleCloudPush();
  } catch (error) {
    console.warn("本地数据保存失败。", error);
    showToast("浏览器未能保存数据，请检查隐私设置");
  }
}

function positiveNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function makeId(prefix) {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return `${prefix}-${window.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getProduct(productId) {
  return state.products.find((product) => product.id === productId);
}

function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

function formattedMacro(value) {
  return formatNumber(value, 1);
}

function round(value, digits = 1) {
  const multiplier = 10 ** digits;
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function startOfWeek(date) {
  const day = date.getDay();
  const distance = day === 0 ? -6 : 1 - day;
  return addDays(date, distance);
}

function syncTodayRecord() {
  const today = formatDateKey(new Date());
  const previous = state.records?.[today];
  const totals = calculateTotals();
  const plan = calculateEnergyPlan();
  const hasNutrition = state.entries.length > 0;
  const hasTraining = state.workout.type !== "none" && state.workout.minutes > 0;

  if (!hasNutrition && !hasTraining && !previous?.weightKg) return;
  state.records ||= {};
  state.records[today] = {
    weightKg: previous?.weightKg || null,
    calories: round(totals.calories, 1),
    protein: round(totals.protein, 1),
    carbs: round(totals.carbs, 1),
    fat: round(totals.fat, 1),
    fiber: round(totals.fiber, 1),
    dailyFuel: Math.round(state.targets.calories),
    estimatedBurn: plan ? Math.round(plan.baseBurn + plan.exerciseBurn) : 0,
    deficit:
      plan && hasNutrition
        ? Math.round(plan.baseBurn + plan.exerciseBurn - totals.calories)
        : null,
    trainingType: state.workout.type,
    trainingMinutes: state.workout.minutes,
    trainingIntensity: state.workout.intensity,
    trainingRpe: state.workout.rpe,
    trainingHeartRate: state.workout.avgHeartRate,
    trainingActiveCalories: state.workout.activeCalories,
    trainingFocus: state.workout.focus,
    exerciseBurn: plan ? Math.round(plan.exerciseBurn) : 0,
    hasNutrition,
    updatedAt: new Date().toISOString(),
  };
}

function calculateTotals() {
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
  };

  for (const entry of state.entries) {
    const product = getProduct(entry.productId);
    if (!product) continue;
    const factor = entry.grams / product.baseGrams;
    totals.calories += (product.energyKj * factor) / 4.184;
    totals.protein += product.protein * factor;
    totals.carbs += product.carbs * factor;
    totals.fat += product.fat * factor;
    totals.fiber += product.fiber * factor;
    totals.sugar += product.sugar * factor;
    totals.sodium += product.sodium * factor;
  }

  return totals;
}

function estimateExerciseBurn(workout = state.workout, profile = state.profile) {
  if (!profile || !workout || workout.type === "none" || workout.minutes <= 0) {
    return {
      burn: 0,
      low: 0,
      high: 0,
      formula: 0,
      wearable: 0,
      source: "none",
    };
  }

  const hrMax = Math.max(120, 208 - 0.7 * profile.age);
  const heartRateRatio = workout.avgHeartRate ? workout.avgHeartRate / hrMax : null;
  const rpe = Math.max(1, workout.rpe || 6);
  let activeMet;

  if (workout.type === "incline_walk") {
    activeMet = heartRateRatio
      ? 5.5 + (heartRateRatio - 0.63) * 18
      : 3.8 + (rpe - 3) * 0.38;
    activeMet = Math.min(9, Math.max(3, activeMet));
  } else {
    const focusBase = { upper: 5.8, lower: 6.8, full: 7.2 };
    activeMet = (focusBase[workout.focus] || focusBase.full) + (rpe - 6) * 0.3;
    if (heartRateRatio) {
      const heartRateFactor = Math.min(1.08, Math.max(0.92, 1 + (heartRateRatio - 0.62) * 0.25));
      activeMet *= heartRateFactor;
    }
    activeMet = Math.min(10, Math.max(3, activeMet));
  }

  const formulaBurn =
    (Math.max(0, activeMet - 1) * 3.5 * profile.weight * workout.minutes) / 200;
  const wearableBurn = workout.activeCalories || 0;
  const wearableWeight = workout.type === "incline_walk" ? 0.65 : 0.55;
  const burn = wearableBurn
    ? formulaBurn * (1 - wearableWeight) + wearableBurn * wearableWeight
    : formulaBurn;
  const uncertainty = wearableBurn
    ? workout.type === "incline_walk"
      ? 0.12
      : 0.2
    : 0.2;

  return {
    burn,
    low: Math.max(0, Math.round(burn * (1 - uncertainty))),
    high: Math.round(burn * (1 + uncertainty)),
    formula: Math.round(formulaBurn),
    wearable: Math.round(wearableBurn),
    source: wearableBurn ? "blend" : "formula",
  };
}

function calculateEnergyPlan() {
  const profile = state.profile;
  if (!profile) return null;

  const calculatedBmr =
    10 * profile.weight +
    6.25 * profile.height -
    5 * profile.age +
    (profile.sex === "female" ? -161 : 5);
  const bmr = profile.manualBmr || calculatedBmr;
  const baseBurn = bmr * profile.activity;
  const exerciseEstimate = estimateExerciseBurn(state.workout, profile);
  const exerciseBurn = exerciseEstimate.burn;
  const goalAdjustment = state.goal === "cut" ? -350 : state.goal === "bulk" ? 250 : 0;
  const exerciseReplenish = state.goal === "cut" ? 0.5 : state.goal === "bulk" ? 0.8 : 0.9;
  const rawCalories = baseBurn + exerciseBurn * exerciseReplenish + goalAdjustment;
  const calorieFloor = Math.max(1200, bmr * 0.85);
  const calories = Math.round(Math.max(calorieFloor, rawCalories) / 10) * 10;
  const proteinFactor = state.goal === "bulk" ? 2 : state.goal === "cut" ? 1.8 : 1.6;
  const fatFactor = state.goal === "bulk" ? 1 : state.goal === "cut" ? 0.8 : 0.9;
  const protein = Math.round(profile.weight * proteinFactor);
  const fat = Math.round(profile.weight * fatFactor);
  const carbs = Math.max(0, Math.round((calories - protein * 4 - fat * 9) / 4));
  const fiber = Math.min(40, Math.max(25, Math.round(calories * 0.014)));

  return {
    bmr,
    calculatedBmr,
    baseBurn,
    exerciseBurn,
    exerciseLow: exerciseEstimate.low,
    exerciseHigh: exerciseEstimate.high,
    exerciseFormula: exerciseEstimate.formula,
    exerciseWearable: exerciseEstimate.wearable,
    exerciseSource: exerciseEstimate.source,
    calories,
    protein,
    fat,
    carbs,
    fiber,
  };
}

function applyCalculatedTargets(plan = calculateEnergyPlan()) {
  if (!plan || !state.profile?.autoTargets) return false;
  state.targets = {
    label: GOAL_PRESETS[state.goal].label,
    calories: plan.calories,
    protein: plan.protein,
    carbs: plan.carbs,
    fat: plan.fat,
    fiber: plan.fiber,
  };
  return true;
}

function getAdviceSnapshot() {
  const totals = calculateTotals();
  return JSON.stringify({
    goal: state.goal,
    targets: state.targets,
    profile: state.profile,
    workout: state.workout,
    calories: round(totals.calories, 2),
    protein: round(totals.protein, 2),
    carbs: round(totals.carbs, 2),
    fat: round(totals.fat, 2),
    fiber: round(totals.fiber, 2),
    meals: state.entries.map((entry) => ({
      productId: entry.productId,
      grams: entry.grams,
      grossGrams: entry.grossGrams,
    })),
  });
}

function createAdviceEmptyState() {
  elements.aiActionList.innerHTML = `
    <div class="coach-action-empty">
      <span class="coach-action-empty-icon"><svg><use href="#icon-spark"></use></svg></span>
      <div>
        <strong>生成今日建议</strong>
        <p>AI 判断和行动建议会显示在这里。</p>
      </div>
    </div>
  `;
}

function renderAiAdvice() {
  const totals = calculateTotals();
  const plan = calculateEnergyPlan();
  const calorieProgress = state.targets.calories
    ? Math.min(100, Math.round((totals.calories / state.targets.calories) * 100))
    : 0;
  const proteinProgress = state.targets.protein
    ? Math.min(100, Math.round((totals.protein / state.targets.protein) * 100))
    : 0;
  const calorieRemaining = Math.max(0, state.targets.calories - totals.calories);
  const proteinRemaining = Math.max(0, state.targets.protein - totals.protein);

  elements.aiCoachTitle.textContent = state.aiAdvice
    ? state.aiAdvice.headline
    : "先填写身体数据，让建议跟着你今天的状态走。";
  elements.aiVerdictSummary.textContent = state.aiAdvice
    ? state.aiAdvice.summary
    : "DeepSeek 会结合当前摄入、身体档案和训练记录，生成更有针对性的营养建议。";

  elements.aiDailyFuelPercent.innerHTML = `${calorieProgress}<small>%</small>`;
  elements.aiDailyFuelValue.textContent = `${formatNumber(state.targets.calories)} kcal`;
  elements.aiFuelOrbit.style.setProperty("--fuel-progress", calorieProgress);

  elements.aiCaloriesRemaining.textContent = formatNumber(calorieRemaining);
  elements.aiCaloriePercent.textContent = `${calorieProgress}%`;
  elements.aiCalorieBar.style.width = `${calorieProgress}%`;
  elements.aiCalorieNote.textContent =
    `已摄入 ${formatNumber(totals.calories)} / Daily Fuel ${formatNumber(state.targets.calories)}`;

  elements.aiProteinRemaining.textContent = formattedMacro(proteinRemaining);
  elements.aiProteinPercent.textContent = `${proteinProgress}%`;
  elements.aiProteinBar.style.width = `${proteinProgress}%`;
  elements.aiProteinNote.textContent =
    proteinRemaining > 0 ? `距离目标还差 ${formattedMacro(proteinRemaining)} g` : "今日蛋白质目标已达成";

  const workout = EXERCISE_METS[state.workout.type];
  elements.exerciseBurnValue.textContent = formatNumber(plan?.exerciseBurn || 0);
  elements.aiTrainingBadge.textContent =
    state.workout.type === "strength"
      ? "STRENGTH"
      : state.workout.type === "incline_walk"
        ? "INCLINE"
        : "REST";
  elements.aiTrainingNote.textContent =
    `${workout.label} · ${formatNumber(state.workout.minutes)} 分钟`;
  elements.aiCoach.dataset.training = state.workout.type;

  const focusTitle = state.aiAdvice
    ? proteinRemaining > 8 && proteinProgress < calorieProgress
      ? "下一餐，蛋白质更值得优先。"
      : calorieProgress > 100
        ? "接下来以清淡高蛋白为主。"
        : "今天的关键不是少吃，而是补得更完整。"
    : state.entries.length
      ? "下一步，补全今天的营养判断。"
      : "先记录今天吃过的食物。";
  elements.aiFocusTitle.textContent = focusTitle;
  elements.aiFocusPercent.textContent = `${calorieProgress}%`;
  elements.aiFocusRing.style.setProperty("--focus-progress", calorieProgress);
  elements.aiFocusTags.innerHTML = `
    <span>热量 ${formatNumber(calorieRemaining)}</span>
    <span>蛋白 ${formattedMacro(proteinRemaining)}g</span>
    <span>训练 ${formatNumber(plan?.exerciseBurn || 0)}</span>
  `;
  elements.aiFocusNote.textContent = state.aiAdvice
    ? state.aiAdvice.closingNote || "继续记录下一餐，建议会随摄入变化更新。"
    : "生成建议后，这里会展示今天最值得坚持的一件事。";

  if (state.aiAdvice) {
    const actionCards = state.aiAdvice.actions
      .map((action, index) => {
        const priorityClass = /优先/.test(action.priority)
          ? "is-priority"
          : /注意/.test(action.priority)
            ? "is-alert"
            : "";
        return `
          <article class="coach-action-card ${priorityClass}">
            <span class="coach-action-number">${String(index + 1).padStart(2, "0")}</span>
            <div class="coach-action-copy">
              <div>
                <strong>${escapeHTML(action.title)}</strong>
                <span>${escapeHTML(action.priority)}</span>
              </div>
              <p>${escapeHTML(action.detail)}</p>
            </div>
          </article>
        `;
      })
      .join("");
    elements.aiActionList.innerHTML = actionCards;
    elements.aiActionCount.textContent = "3 个优先动作";
  } else {
    createAdviceEmptyState();
    elements.aiActionCount.textContent = "等待生成";
  }

  const stale = Boolean(state.aiAdvice) && state.aiAdviceSnapshot !== getAdviceSnapshot();
  elements.aiStaleNotice.hidden = !stale;
}

function updateAiUi() {
  const plan = calculateEnergyPlan();
  if (state.profile) {
    const goalLabel = GOAL_PRESETS[state.goal].label;
    elements.profileSummary.textContent =
      `${state.profile.sex === "female" ? "女性" : "男性"} · ${formatNumber(state.profile.age)} 岁 · ` +
      `${formatNumber(state.profile.height, 1)} cm · ${formatNumber(state.profile.weight, 1)} kg · ${goalLabel}` +
      `${state.profile.autoTargets ? " · 自动目标" : " · 手动目标"}`;
    elements.profileAvatar.textContent = state.profile.sex === "female" ? "F" : "M";
    elements.metabolismSummary.textContent = plan
      ? `基础代谢 ${formatNumber(plan.bmr)} kcal${state.profile.manualBmr ? "（手动校准）" : "（公式估算）"} · 基础活动 ${formatNumber(plan.baseBurn)} kcal`
      : "填写完整资料后可计算基础代谢";
  } else {
    elements.profileSummary.textContent = "尚未填写身体数据";
    elements.profileAvatar.textContent = "?";
    elements.metabolismSummary.textContent = "填写后可估算基础代谢和每日目标";
  }

  const workout = EXERCISE_METS[state.workout.type];
  elements.trainingSummary.textContent =
    `${workout.label}${state.workout.type === "none" ? "" : ` · ${formatNumber(state.workout.minutes)} 分钟`}`;
  elements.trainingBurnSummary.textContent =
    state.workout.type === "none"
      ? "今日训练额外消耗 0 kcal"
      : `额外消耗 ${formatNumber(plan?.exerciseLow || 0)}–${formatNumber(plan?.exerciseHigh || 0)} kcal · RPE ${state.workout.rpe || 6}`;
  elements.todayTrainingHeading.textContent =
    state.workout.type === "none" ? "今天还没有记录训练" : workout.label;
  elements.todayTrainingDetail.textContent =
    state.workout.type === "none"
      ? "训练只影响当天，明天会自动创建新的训练记录"
      : [
          state.workout.type === "strength"
            ? STRENGTH_FOCUS[state.workout.focus] || "全身"
            : null,
          `${formatNumber(state.workout.minutes)} 分钟`,
          state.workout.avgHeartRate ? `平均心率 ${formatNumber(state.workout.avgHeartRate)}` : null,
          `RPE ${state.workout.rpe || 6}`,
          state.workout.activeCalories
            ? `手表活动 ${formatNumber(state.workout.activeCalories)} kcal`
            : null,
          plan ? `估算 ${formatNumber(plan.exerciseLow)}–${formatNumber(plan.exerciseHigh)} kcal` : null,
        ]
          .filter(Boolean)
          .join(" · ");
  elements.todayTrainingBurn.textContent = formatNumber(plan?.exerciseBurn || 0);

  const hasApiKey = Boolean(aiSettings.apiKey);
  elements.apiStatus.classList.toggle("is-configured", hasApiKey);
  elements.apiStatus.innerHTML = `<i></i> ${hasApiKey ? "DeepSeek 已配置" : "API 未配置"}`;
  renderAiAdvice();
}

function syncWorkoutInputs() {
  elements.workoutType.value = state.workout.type;
  elements.workoutFocus.value = state.workout.focus || "full";
  elements.workoutMinutes.value = state.workout.minutes;
  elements.workoutHeartRate.value = state.workout.avgHeartRate || "";
  elements.workoutActiveCalories.value = state.workout.activeCalories || "";
  elements.workoutRpe.value = state.workout.rpe || 6;
  elements.workoutNote.value = state.workout.note;
  updateWorkoutTypeFields();
  refreshWorkoutEstimate();
}

function rpeDescription(value) {
  const rpe = Number(value) || 0;
  if (rpe <= 2) return "很轻松";
  if (rpe <= 4) return "轻松";
  if (rpe <= 6) return "费力";
  if (rpe <= 8) return "很费力";
  return "接近极限";
}

function updateWorkoutTypeFields() {
  const type = elements.workoutType.value;
  elements.workoutFocusField.hidden = type !== "strength";
  const disabled = type === "none";
  [elements.workoutMinutes, elements.workoutHeartRate, elements.workoutActiveCalories, elements.workoutRpe]
    .forEach((input) => {
      input.disabled = disabled;
    });
  elements.workoutRpeValue.textContent = `${elements.workoutRpe.value} · ${rpeDescription(elements.workoutRpe.value)}`;
}

function readWorkoutForm() {
  const activeCalories = positiveNumber(elements.workoutActiveCalories.value, 0);
  const avgHeartRate = positiveNumber(elements.workoutHeartRate.value, 0);
  return normalizeWorkout({
    type: elements.workoutType.value,
    minutes: elements.workoutMinutes.value,
    focus: elements.workoutFocus.value,
    rpe: elements.workoutRpe.value,
    avgHeartRate,
    activeCalories,
    note: elements.workoutNote.value,
  });
}

function refreshWorkoutEstimate() {
  const workout = readWorkoutForm();
  const estimate = estimateExerciseBurn(workout, state.profile);
  elements.workoutRpeValue.textContent = `${workout.rpe || elements.workoutRpe.value} · ${rpeDescription(workout.rpe || elements.workoutRpe.value)}`;
  if (workout.type === "none" || !state.profile) {
    elements.workoutEstimateRange.textContent = "-- kcal";
    elements.workoutEstimateNote.textContent = state.profile
      ? "选择训练类型后可估算"
      : "请先填写身体资料";
    return;
  }
  elements.workoutEstimateRange.textContent =
    `${formatNumber(estimate.low)}–${formatNumber(estimate.high)} kcal`;
  elements.workoutEstimateNote.textContent = estimate.wearable
    ? `手表 ${formatNumber(estimate.wearable)} kcal · 本地公式 ${formatNumber(estimate.formula)} kcal · 加权估算`
    : `根据时长、RPE${workout.avgHeartRate ? "、平均心率" : ""}和训练部位估算`;
}

function setBar(element, value, target) {
  const percent = target > 0 ? (value / target) * 100 : 0;
  element.style.width = `${Math.min(100, Math.max(0, percent))}%`;
}

function setMacro(prefix, consumed, target) {
  const percent = target > 0 ? Math.round((consumed / target) * 100) : 0;
  elements[`${prefix}Percent`].textContent = `${percent}%`;
  elements[`${prefix}Total`].textContent = formattedMacro(consumed);
  elements[`${prefix}Target`].textContent = formatNumber(target);
  setBar(elements[`${prefix}Bar`], consumed, target);
}

function updateSummary() {
  const totals = calculateTotals();
  const { targets } = state;
  const calorieProgress = targets.calories > 0 ? (totals.calories / targets.calories) * 100 : 0;
  const proteinProgress = targets.protein > 0 ? (totals.protein / targets.protein) * 100 : 0;
  const remainingCalories = Math.max(0, targets.calories - totals.calories);
  const remainingProtein = Math.max(0, targets.protein - totals.protein);

  elements.remainingCalories.textContent = formatNumber(remainingCalories);
  elements.targetCaloriesLabel.textContent = formatNumber(targets.calories);
  elements.consumedCalories.textContent = formatNumber(totals.calories);
  elements.energyVisual.style.setProperty("--progress", Math.min(100, Math.max(1.5, calorieProgress)));
  setBar(elements.calorieTrack, totals.calories, targets.calories);

  elements.proteinDashboard.textContent = formattedMacro(totals.protein);
  elements.remainingProtein.textContent = formattedMacro(remainingProtein);
  setBar(elements.proteinTrack, totals.protein, targets.protein);

  setMacro("protein", totals.protein, targets.protein);
  setMacro("carb", totals.carbs, targets.carbs);
  setMacro("fat", totals.fat, targets.fat);
  setMacro("fiber", totals.fiber, targets.fiber);

  elements.plateCalories.textContent = formatNumber(totals.calories);
  elements.sodiumTotal.textContent = formatNumber(totals.sodium);
  elements.mealCount.textContent = `${state.entries.length} 项`;
  elements.clearMealsButton.disabled = state.entries.length === 0;
  elements.dashboardGoal.textContent = `${state.targets.label || GOAL_PRESETS[state.goal].label}模式 · READY`;

  if (state.entries.length === 0) {
    elements.coachMessage.textContent = "从补给站选择第一份食物，开始今天的营养记录。";
  } else if (calorieProgress >= 100) {
    elements.coachMessage.textContent = `已超过今日热量目标 ${formatNumber(totals.calories - targets.calories)} kcal，接下来优先选择清淡、高蛋白的食物。`;
  } else if (proteinProgress >= 100) {
    elements.coachMessage.textContent = "蛋白质目标已经达成，今天的补给很扎实。";
  } else {
    elements.coachMessage.textContent = `蛋白质还差 ${formattedMacro(remainingProtein)} g，下一餐可以优先安排高蛋白食物。`;
  }

  elements.goalButtons.forEach((button) => {
    const isActive = button.dataset.goal === state.goal;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateAiUi();
  updateMobileSettings();
}

function renderMeals() {
  if (state.entries.length === 0) {
    elements.mealList.innerHTML = "";
    elements.emptyMeals.hidden = false;
    return;
  }

  elements.emptyMeals.hidden = true;
  elements.mealList.innerHTML = state.entries
    .map((entry) => {
      const product = getProduct(entry.productId);
      if (!product) return "";
      const factor = entry.grams / product.baseGrams;
      const calories = (product.energyKj * factor) / 4.184;
      const weightLabel =
        product.boneIn && entry.grossGrams
          ? `可食 ${formatNumber(entry.grams, 1)} g · 带骨 ${formatNumber(entry.grossGrams, 1)} g`
          : product.boneIn
            ? `去骨后可食 ${formatNumber(entry.grams, 1)} g`
            : `${formatNumber(entry.grams, 1)} g`;
      return `
        <article class="meal-item" data-entry-id="${escapeHTML(entry.id)}">
          <div class="meal-copy">
            <strong>${escapeHTML(product.name)}</strong>
            <span>${escapeHTML(product.brand)} · ${weightLabel}</span>
          </div>
          <div class="meal-calories">
            <strong>${formatNumber(calories)}</strong>
            <span>kcal</span>
          </div>
          <div class="meal-actions">
            <button class="meal-step-button" type="button" data-meal-action="decrease" aria-label="减少 ${escapeHTML(product.name)} 10 克">
              <svg><use href="#icon-minus"></use></svg>
            </button>
            <button class="meal-step-button" type="button" data-meal-action="increase" aria-label="增加 ${escapeHTML(product.name)} 10 克">
              <svg><use href="#icon-plus"></use></svg>
            </button>
            <button class="meal-step-button meal-step-button--edit" type="button" data-meal-action="edit" aria-label="编辑 ${escapeHTML(product.name)} 的分量">
              <svg><use href="#icon-edit"></use></svg>
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function filteredProducts() {
  const query = elements.productSearch.value.trim().toLowerCase();
  return state.products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "我的" ? product.isCustom : product.category === activeCategory);
    const haystack = `${product.name} ${product.brand} ${product.category}`.toLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });
}

function renderProducts() {
  const products = filteredProducts();
  elements.noResults.hidden = products.length > 0;

  elements.productGrid.innerHTML = products
    .map((product, index) => {
      const category = CATEGORY_STYLES[product.category] || CATEGORY_STYLES.其他;
      const factor = product.servingGrams / product.baseGrams;
      const calories = (product.energyKj * factor) / 4.184;
      const basisLabel =
        product.baseGrams === 100 ? "标签按每 100 g" : `标签按每 ${formatNumber(product.baseGrams)} g`;

      return `
        <article
          class="product-card${product.isCustom ? " is-custom" : ""}"
          data-product-id="${escapeHTML(product.id)}"
          style="--product-accent:${category.accent}; --card-index:${index}"
        >
          <div class="product-top">
            <div class="product-badges">
              <span class="product-badge">${escapeHTML(product.category)}</span>
              ${product.boneIn ? '<span class="product-badge product-badge--bone">带骨换算</span>' : ""}
            </div>
            <div class="product-card-actions">
              <button class="product-edit" type="button" data-product-action="edit" aria-label="编辑 ${escapeHTML(product.name)}">
                <svg><use href="#icon-edit"></use></svg>
              </button>
              ${
                product.isCustom
                  ? `<button class="product-delete" type="button" data-product-action="delete" aria-label="删除 ${escapeHTML(product.name)}">
                      <svg><use href="#icon-trash"></use></svg>
                    </button>`
                  : ""
              }
            </div>
          </div>
          <div class="product-copy">
            <p class="product-brand">${escapeHTML(product.brand.toUpperCase())}</p>
            <h3 class="product-name">${escapeHTML(product.name)}</h3>
          </div>
          <div class="product-metrics">
            <div class="product-metric">
              <strong>${formatNumber(calories)}</strong>
              <span>热量 kcal</span>
            </div>
            <div class="product-metric">
              <strong>${formattedMacro(product.protein * factor)}</strong>
              <span>蛋白 g</span>
            </div>
            <div class="product-metric">
              <strong>${formattedMacro(product.carbs * factor)}</strong>
              <span>碳水 g</span>
            </div>
            <div class="product-metric">
              <strong>${formattedMacro(product.fat * factor)}</strong>
              <span>脂肪 g</span>
            </div>
          </div>
          <div class="product-footer">
            <span class="product-serving">默认${product.boneIn ? "可食重" : ""} ${formatNumber(product.servingGrams)} g<br>${product.boneIn ? "营养按可食部换算" : basisLabel}</span>
            <button class="product-add-button" type="button" data-product-action="edit">
              <svg><use href="#icon-edit"></use></svg>
              编辑详情
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderQuickAdd() {
  const query = elements.quickFoodSearch.value.trim().toLowerCase();
  const recentIds = state.entries.map((entry) => entry.productId).reverse();
  const products = state.products
    .filter((product) => {
      const categoryMatch =
        quickAddCategory === "all" || product.category === quickAddCategory;
      const haystack = `${product.name} ${product.brand} ${product.category}`.toLowerCase();
      return categoryMatch && (!query || haystack.includes(query));
    })
    .sort((a, b) => {
      if (!query) {
        const aRecent = recentIds.indexOf(a.id);
        const bRecent = recentIds.indexOf(b.id);
        if (aRecent !== -1 || bRecent !== -1) {
          if (aRecent === -1) return 1;
          if (bRecent === -1) return -1;
          return aRecent - bRecent;
        }
      }
      return a.name.localeCompare(b.name, "zh-CN");
    });

  elements.quickAddFilters.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.quickCategory === quickAddCategory);
  });

  if (products.length === 0) {
    elements.quickFoodList.innerHTML = `
      <div class="quick-food-empty">
        <strong>没有找到食物</strong>
        <span>换个关键词，或先把商品添加到补给站。</span>
      </div>
    `;
    return;
  }

  elements.quickFoodList.innerHTML = products
    .map((product) => {
      const factor = product.servingGrams / product.baseGrams;
      const category = CATEGORY_STYLES[product.category] || CATEGORY_STYLES.其他;
      return `
        <button class="quick-food-row" type="button" data-quick-food-id="${escapeHTML(product.id)}">
          <span class="quick-food-tag" style="--quick-accent:${category.accent}">${escapeHTML(product.category)}</span>
          <span class="quick-food-copy">
            <strong>${escapeHTML(product.name)}</strong>
            <small>${escapeHTML(product.brand)} · 默认 ${formatNumber(product.servingGrams)} g</small>
          </span>
          <span class="quick-food-values">
            <strong>${formatNumber((product.energyKj * factor) / 4.184)} kcal</strong>
            <small>蛋白 ${formattedMacro(product.protein * factor)} g</small>
          </span>
          <span class="quick-food-add"><svg><use href="#icon-plus"></use></svg></span>
        </button>
      `;
    })
    .join("");
}

function openQuickAddDialog() {
  elements.quickFoodSearch.value = "";
  quickAddCategory = "all";
  renderQuickAdd();
  openDialog(elements.quickAddDialog);
}

function getRecordPeriod() {
  const cursor = dateFromKey(recordCursorKey);
  const today = dateFromKey(formatDateKey(new Date()));

  if (recordView === "week") {
    const start = startOfWeek(cursor);
    const end = addDays(start, 6);
    return {
      start,
      end,
      dates: Array.from({ length: 7 }, (_, index) => addDays(start, index)),
      label: `${start.getMonth() + 1}月${start.getDate()}日 – ${end.getMonth() + 1}月${end.getDate()}日`,
      nextDisabled: startOfWeek(cursor) >= startOfWeek(today),
    };
  }

  if (recordView === "month") {
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1, 12);
    const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0, 12);
    const dates = [];
    for (let date = start; date <= end; date = addDays(date, 1)) dates.push(date);
    return {
      start,
      end,
      dates,
      label: `${start.getFullYear()}年${start.getMonth() + 1}月`,
      nextDisabled:
        start.getFullYear() > today.getFullYear() ||
        (start.getFullYear() === today.getFullYear() &&
          start.getMonth() >= today.getMonth()),
    };
  }

  return {
    start: cursor,
    end: cursor,
    dates: [cursor],
    label: new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    }).format(cursor),
    nextDisabled: recordCursorKey >= formatDateKey(today),
  };
}

function averageOrNull(values) {
  const valid = values.filter((value) => Number.isFinite(value));
  return valid.length ? valid.reduce((sum, value) => sum + value, 0) / valid.length : null;
}

function displayRecordValue(value, unit = "", digits = 0) {
  return value === null || value === undefined
    ? "—"
    : `${formatNumber(value, digits)}${unit}`;
}

function displaySigned(value, unit = "", digits = 0) {
  if (value === null || value === undefined) return "—";
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${formatNumber(value, digits)}${unit}`;
}

function getWeightMovingAverage(date) {
  const weights = [];
  for (let offset = -6; offset <= 0; offset += 1) {
    const record = state.records[formatDateKey(addDays(date, offset))];
    if (record?.weightKg) weights.push(record.weightKg);
  }
  return weights.length ? averageOrNull(weights) : null;
}

function createWeightTrendChart(dates, title = "体重趋势") {
  const rawPoints = [];
  const averagePoints = [];
  dates.forEach((date, index) => {
    const record = state.records[formatDateKey(date)];
    if (record?.weightKg) {
      rawPoints.push({ index, value: record.weightKg, date });
    }
    const average = getWeightMovingAverage(date);
    if (average) averagePoints.push({ index, value: average, date });
  });

  if (rawPoints.length === 0) {
    return `
      <article class="record-chart-card">
        <div class="record-chart-head"><strong>${title}</strong><span>暂无晨重</span></div>
        <div class="record-chart-empty">在日视图中记录晨起体重后，这里会生成趋势。</div>
      </article>
    `;
  }

  const width = 680;
  const height = 190;
  const padding = { left: 38, right: 14, top: 14, bottom: 28 };
  const values = [...rawPoints, ...averagePoints].map((point) => point.value);
  let min = Math.min(...values) - 0.4;
  let max = Math.max(...values) + 0.4;
  if (max - min < 1) {
    const middle = (max + min) / 2;
    min = middle - 0.5;
    max = middle + 0.5;
  }

  const xFor = (index) =>
    padding.left +
    (dates.length <= 1 ? 0 : (index / (dates.length - 1)) * (width - padding.left - padding.right));
  const yFor = (value) =>
    padding.top + ((max - value) / (max - min)) * (height - padding.top - padding.bottom);
  const pathFor = (points) =>
    points.map((point, index) => `${index === 0 ? "M" : "L"}${xFor(point.index).toFixed(1)},${yFor(point.value).toFixed(1)}`).join(" ");
  const rawPath = pathFor(rawPoints);
  const averagePath = pathFor(averagePoints);
  const areaPath =
    rawPoints.length > 1
      ? `${rawPath} L${xFor(rawPoints.at(-1).index).toFixed(1)},${(height - padding.bottom).toFixed(1)} L${xFor(rawPoints[0].index).toFixed(1)},${(height - padding.bottom).toFixed(1)} Z`
      : "";
  const labelEvery = Math.max(1, Math.ceil(dates.length / 6));
  const labels = dates
    .map((date, index) =>
      index % labelEvery === 0 || index === dates.length - 1
        ? `<text x="${xFor(index).toFixed(1)}" y="${height - 7}" text-anchor="middle">${date.getMonth() + 1}/${date.getDate()}</text>`
        : ""
    )
    .join("");
  const grid = [0, 0.5, 1]
    .map((ratio) => {
      const value = max - (max - min) * ratio;
      const y = yFor(value);
      return `<line x1="${padding.left}" y1="${y.toFixed(1)}" x2="${width - padding.right}" y2="${y.toFixed(1)}" class="record-chart-gridline" />
        <text x="2" y="${(y + 3).toFixed(1)}">${value.toFixed(1)}</text>`;
    })
    .join("");
  const dots = rawPoints
    .map(
      (point) =>
        `<circle cx="${xFor(point.index).toFixed(1)}" cy="${yFor(point.value).toFixed(1)}" r="3.4" class="record-chart-dot" />`
    )
    .join("");

  return `
    <article class="record-chart-card">
      <div class="record-chart-head">
        <strong>${title}</strong>
        <div class="record-chart-legend">
          <span><i class="is-raw"></i>晨重</span>
          <span><i class="is-average"></i>7 日均线</span>
        </div>
      </div>
      <svg class="record-weight-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}">
        ${grid}
        ${areaPath ? `<path d="${areaPath}" class="record-chart-area" />` : ""}
        ${averagePath ? `<path d="${averagePath}" class="record-chart-average" />` : ""}
        ${rawPath ? `<path d="${rawPath}" class="record-chart-raw" />` : ""}
        ${dots}
        ${labels}
      </svg>
    </article>
  `;
}

function createCalorieBarChart(dates) {
  const values = dates.map((date) => {
    const record = state.records[formatDateKey(date)];
    return record?.hasNutrition ? record.calories : null;
  });
  const validValues = values.filter((value) => Number.isFinite(value));
  const targets = dates
    .map((date) => state.records[formatDateKey(date)]?.dailyFuel || 0)
    .filter((value) => value > 0);
  const max = Math.max(1, ...validValues, ...targets);
  const labelEvery = Math.max(1, Math.ceil(dates.length / 7));

  return `
    <article class="record-chart-card">
      <div class="record-chart-head">
        <strong>每日热量</strong>
        <span>${validValues.length ? `${validValues.length} 天有饮食记录` : "暂无饮食记录"}</span>
      </div>
      <div class="record-bar-chart">
        ${dates
          .map((date, index) => {
            const value = values[index];
            const record = state.records[formatDateKey(date)];
            const height = Number.isFinite(value) ? Math.max(4, (value / max) * 100) : 0;
            const overTarget = Number.isFinite(value) && record?.dailyFuel && value > record.dailyFuel;
            return `
              <div class="record-bar-column" title="${date.getMonth() + 1}月${date.getDate()}日 · ${Number.isFinite(value) ? `${formatNumber(value)} kcal` : "无记录"}">
                <div class="record-bar-track">
                  <i class="${overTarget ? "is-over" : ""}" style="height:${height}%"></i>
                </div>
                <span>${index % labelEvery === 0 || index === dates.length - 1 ? `${date.getMonth() + 1}/${date.getDate()}` : ""}</span>
              </div>
            `;
          })
          .join("")}
      </div>
    </article>
  `;
}

function recordMetricCard(label, value, unit, tone, note = "") {
  return `
    <article class="record-metric-card record-metric-card--${tone}">
      <span>${label}</span>
      <p><strong>${value}</strong><small>${unit}</small></p>
      <em>${note}</em>
    </article>
  `;
}

function renderRecordToolbar(period) {
  return `
    <div class="record-toolbar">
      <button class="record-nav-button" type="button" data-record-nav="prev" aria-label="上一时间段">←</button>
      <div>
        <strong>${period.label}</strong>
        <span>${recordView === "day" ? (recordCursorKey === formatDateKey(new Date()) ? "今天 · 记录进行中" : "历史记录") : `${period.dates.length} 天`}</span>
      </div>
      <button class="record-nav-button" type="button" data-record-nav="next" aria-label="下一时间段" ${period.nextDisabled ? "disabled" : ""}>→</button>
    </div>
  `;
}

function renderDayRecord(period) {
  const key = recordCursorKey;
  const record = state.records[key] || null;
  const hasNutrition = Boolean(record?.hasNutrition);
  const weight = record?.weightKg;
  const targetGap =
    record && hasNutrition ? Math.round(record.dailyFuel - record.calories) : null;
  const trendStart = addDays(period.start, -6);
  const trendDates = Array.from({ length: 7 }, (_, index) => addDays(trendStart, index));
  const deficitTone = record?.deficit > 0 ? "gain" : record?.deficit < 0 ? "warn" : "neutral";

  return `
    ${renderRecordToolbar(period)}
    <div class="record-day-grid">
      <div class="record-main">
        <div class="record-metric-grid">
          ${recordMetricCard("热量摄入", displayRecordValue(hasNutrition ? record.calories : null), "kcal", "lime", hasNutrition ? `Daily Fuel ${formatNumber(record.dailyFuel)}` : "当天尚未记录饮食")}
          ${recordMetricCard("蛋白质", displayRecordValue(hasNutrition ? record.protein : null, "", 1), "g", "purple", "当日累计")}
          ${recordMetricCard("碳水", displayRecordValue(hasNutrition ? record.carbs : null, "", 1), "g", "purple", "当日累计")}
          ${recordMetricCard("脂肪", displayRecordValue(hasNutrition ? record.fat : null, "", 1), "g", "orange", "当日累计")}
          ${recordMetricCard("实际热量缺口", displaySigned(record?.deficit), "kcal", deficitTone, record?.deficit !== null && record?.deficit !== undefined ? `估算消耗 ${formatNumber(record.estimatedBurn)} kcal − 摄入` : "需要身体数据与饮食记录")}
          ${recordMetricCard("晨起体重", displayRecordValue(weight, "", 1), "kg", "cloud", weight ? `7 日均值 ${displayRecordValue(getWeightMovingAverage(period.start), "", 1)} kg` : "尚未记录")}
        </div>
        <div class="record-chart-grid">
          ${createWeightTrendChart(trendDates, "近 7 日体重趋势")}
          ${createCalorieBarChart(trendDates)}
        </div>
      </div>
      <aside class="record-side">
        <form class="record-weight-form" data-record-weight-form data-date="${key}">
          <span>MORNING WEIGHT</span>
          <h3>记录晨起体重</h3>
          <p>起床、如厕后，进食饮水前称重。</p>
          <label>
            <input id="recordWeightInput" name="weight" type="number" min="30" max="300" step="0.1" value="${weight || ""}" placeholder="例如 77.0" />
            <em>kg</em>
          </label>
          <button type="submit">保存体重</button>
        </form>
        <div class="record-balance-card">
          <div><span>Daily Fuel 目标</span><strong>${record ? formatNumber(record.dailyFuel) : formatNumber(state.targets.calories)}<small> kcal</small></strong></div>
          <div><span>距目标余额</span><strong>${targetGap === null ? "—" : formatNumber(targetGap)}<small> kcal</small></strong></div>
          <div><span>实际热量缺口</span><strong class="${deficitTone === "gain" ? "is-positive" : deficitTone === "warn" ? "is-negative" : ""}">${displaySigned(record?.deficit)}<small> kcal</small></strong></div>
          <p>实际缺口 = 估算总消耗 − 当日摄入，与 Daily Fuel 余额不是同一个概念。</p>
        </div>
        <div class="record-training-card">
          <span>TRAINING</span>
          <strong>${record ? EXERCISE_METS[record.trainingType].label : EXERCISE_METS[state.workout.type].label}</strong>
          <p>${
            record
              ? [
                  record.trainingType === "strength"
                    ? STRENGTH_FOCUS[record.trainingFocus] || "全身"
                    : null,
                  `${formatNumber(record.trainingMinutes)} 分钟`,
                  record.trainingHeartRate ? `心率 ${formatNumber(record.trainingHeartRate)}` : null,
                  record.trainingRpe ? `RPE ${formatNumber(record.trainingRpe)}` : null,
                ]
                  .filter(Boolean)
                  .join(" · ")
              : "今日尚未记录训练"
          }</p>
        </div>
      </aside>
    </div>
  `;
}

function renderPeriodRecord(period) {
  const records = period.dates
    .map((date) => {
      const key = formatDateKey(date);
      return { date, key, record: state.records[key] };
    })
    .filter((item) => item.record);
  const nutritionRecords = records.filter((item) => item.record.hasNutrition);
  const weightRecords = records.filter((item) => item.record.weightKg);
  const average = (field) =>
    averageOrNull(nutritionRecords.map((item) => item.record[field]));
  const averageDeficit = averageOrNull(
    records
      .map((item) => item.record.deficit)
      .filter((value) => value !== null && value !== undefined)
  );
  const firstWeight = weightRecords[0]?.record.weightKg ?? null;
  const lastWeight = weightRecords.at(-1)?.record.weightKg ?? null;
  const weightChange =
    firstWeight !== null && lastWeight !== null && weightRecords.length > 1
      ? round(lastWeight - firstWeight, 1)
      : null;

  const rowItems = records.length
    ? records
        .map(({ date, key, record }) => `
          <button class="record-table-row" type="button" data-record-day="${key}">
            <span><strong>${date.getMonth() + 1}/${date.getDate()}</strong><em>${new Intl.DateTimeFormat("zh-CN", { weekday: "short" }).format(date)}</em></span>
            <span>${record.weightKg ? `${formatNumber(record.weightKg, 1)} kg` : "—"}</span>
            <span>${record.hasNutrition ? `${formatNumber(record.calories)} kcal` : "—"}</span>
            <span>${record.hasNutrition ? `${formatNumber(record.protein, 1)} g` : "—"}</span>
            <span>${displaySigned(record.deficit)}</span>
            <b>查看日记录 →</b>
          </button>
        `)
        .join("")
    : '<div class="record-table-empty">这个时间段还没有记录。</div>';

  return `
    ${renderRecordToolbar(period)}
    <div class="record-metric-grid record-metric-grid--period">
      ${recordMetricCard("平均热量", displayRecordValue(average("calories")), "kcal", "lime", `${nutritionRecords.length} 个有效饮食日`)}
      ${recordMetricCard("平均蛋白质", displayRecordValue(average("protein"), "", 1), "g", "purple", "按有效记录日计算")}
      ${recordMetricCard("平均碳水", displayRecordValue(average("carbs"), "", 1), "g", "purple", "按有效记录日计算")}
      ${recordMetricCard("平均脂肪", displayRecordValue(average("fat"), "", 1), "g", "orange", "按有效记录日计算")}
      ${recordMetricCard("平均热量缺口", displaySigned(averageDeficit), "kcal", averageDeficit > 0 ? "gain" : averageDeficit < 0 ? "warn" : "neutral", "估算消耗 − 摄入")}
      ${recordMetricCard("体重变化", displaySigned(weightChange, "", 1), "kg", "cloud", weightRecords.length > 1 ? `${formatNumber(firstWeight, 1)} → ${formatNumber(lastWeight, 1)} kg` : "至少需要两次晨重")}
    </div>
    <div class="record-period-grid">
      <div class="record-period-charts">
        ${createWeightTrendChart(period.dates, recordView === "week" ? "本周体重趋势" : "本月体重趋势")}
        ${createCalorieBarChart(period.dates)}
      </div>
      <aside class="record-period-summary">
        <span>PERIOD SUMMARY</span>
        <h3>${recordView === "week" ? "本周概览" : "本月概览"}</h3>
        <div><span>有效记录</span><strong>${nutritionRecords.length} 天</strong></div>
        <div><span>晨重记录</span><strong>${weightRecords.length} 次</strong></div>
        <div><span>训练记录</span><strong>${records.filter((item) => item.record.trainingType !== "none" && item.record.trainingMinutes > 0).length} 次</strong></div>
        <div><span>平均 Daily Fuel</span><strong>${displayRecordValue(average("dailyFuel"))} kcal</strong></div>
        <p>未填写的日期不会按 0 计入平均值，今天仍标记为进行中。</p>
      </aside>
    </div>
    <div class="record-table">
      <div class="record-table-head">
        <span>日期</span><span>晨重</span><span>热量</span><span>蛋白质</span><span>热量缺口</span><span></span>
      </div>
      ${rowItems}
    </div>
  `;
}

function renderRecords() {
  if (!elements.recordContent) return;
  const period = getRecordPeriod();
  elements.recordTabs.forEach((tab) => {
    const active = tab.dataset.recordView === recordView;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-pressed", String(active));
  });
  elements.recordExportButton.disabled = Object.keys(state.records).length === 0;
  elements.recordContent.innerHTML =
    recordView === "day" ? renderDayRecord(period) : renderPeriodRecord(period);
}

function shiftRecordPeriod(direction) {
  const cursor = dateFromKey(recordCursorKey);
  if (recordView === "day") {
    const next = addDays(cursor, direction);
    if (next > new Date()) return;
    recordCursorKey = formatDateKey(next);
  } else if (recordView === "week") {
    recordCursorKey = formatDateKey(addDays(cursor, direction * 7));
  } else {
    recordCursorKey = formatDateKey(
      new Date(cursor.getFullYear(), cursor.getMonth() + direction, 1, 12)
    );
  }
  renderRecords();
}

function saveRecordWeight(dateKey, rawWeight) {
  const numericWeight = Number(rawWeight);
  if (rawWeight !== "" && (!Number.isFinite(numericWeight) || numericWeight < 30 || numericWeight > 300)) {
    showToast("请输入 30–300 kg 之间的有效体重");
    return;
  }

  const existing = state.records[dateKey] || {
    weightKg: null,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    dailyFuel: Math.round(state.targets.calories),
    estimatedBurn: 0,
    deficit: null,
    trainingType: "none",
    trainingMinutes: 0,
    trainingIntensity: "moderate",
    trainingRpe: 0,
    trainingHeartRate: null,
    trainingActiveCalories: null,
    trainingFocus: "full",
    exerciseBurn: 0,
    hasNutrition: false,
    updatedAt: "",
  };
  existing.weightKg = rawWeight === "" ? null : round(numericWeight, 1);
  existing.updatedAt = new Date().toISOString();

  const isMeaningful =
    existing.weightKg ||
    existing.hasNutrition ||
    (existing.trainingType !== "none" && existing.trainingMinutes > 0);
  if (isMeaningful) state.records[dateKey] = existing;
  else delete state.records[dateKey];

  persistState();
  renderRecords();
  showToast(existing.weightKg ? "晨起体重已保存" : "晨起体重已清除");
}

function exportRecords() {
  syncTodayRecord();
  const rows = Object.entries(state.records).sort(([a], [b]) => a.localeCompare(b));
  if (rows.length === 0) {
    showToast("还没有可以导出的记录");
    return;
  }

  const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const headers = [
    "日期",
    "晨起体重kg",
    "热量kcal",
    "蛋白质g",
    "碳水g",
    "脂肪g",
    "膳食纤维g",
    "Daily Fuel kcal",
    "估算总消耗kcal",
    "热量缺口kcal",
    "训练",
    "训练分钟",
    "训练部位",
    "RPE",
    "平均心率bpm",
    "手表活动消耗kcal",
    "训练额外消耗kcal",
  ];
  const lines = rows.map(([date, record]) => {
    const training = EXERCISE_METS[record.trainingType]?.label || "无训练";
    return [
      date,
      record.weightKg ?? "",
      record.calories,
      record.protein,
      record.carbs,
      record.fat,
      record.fiber,
      record.dailyFuel,
      record.estimatedBurn,
      record.deficit ?? "",
      training,
      record.trainingMinutes,
      record.trainingType === "strength" ? STRENGTH_FOCUS[record.trainingFocus] || "全身" : "",
      record.trainingRpe || "",
      record.trainingHeartRate ?? "",
      record.trainingActiveCalories ?? "",
      record.exerciseBurn ?? "",
    ]
      .map(csvCell)
      .join(",");
  });
  const blob = new Blob([`\uFEFF${headers.map(csvCell).join(",")}\n${lines.join("\n")}`], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `fuelup-饮食记录-${formatDateKey(new Date())}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("记录已导出为 CSV");
}

function setMobileView(view, { scrollToTop = true } = {}) {
  if (!["today", "ai", "records", "supply", "settings"].includes(view)) return;
  mobileActiveView = view;
  window.localStorage.setItem("fuelup-mobile-tab", view);
  document.querySelectorAll("[data-mobile-view]").forEach((section) => {
    section.hidden = document.body.classList.contains("mobile-app-mode") && section.dataset.mobileView !== view;
  });
  elements.mobileTabs.forEach((tab) => {
    const active = tab.dataset.mobileTab === view;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-current", active ? "page" : "false");
  });
  if (scrollToTop) window.scrollTo({ top: 0, behavior: "auto" });
}

function syncMobileExperience() {
  const enabled = isNativeRuntime || window.matchMedia("(max-width: 760px)").matches;
  document.body.classList.toggle("mobile-app-mode", enabled);
  elements.mobileBottomNav.hidden = !enabled;
  if (enabled) {
    setMobileView(mobileActiveView, { scrollToTop: false });
  } else {
    document.querySelectorAll("[data-mobile-view]").forEach((section) => {
      section.hidden = false;
    });
  }
}

function updateMobileSettings() {
  if (!elements.mobileProfileName) return;
  const profile = state.profile;
  elements.mobileProfileAvatar.textContent = profile
    ? profile.sex === "female"
      ? "F"
      : "M"
    : "?";
  elements.mobileProfileName.textContent = profile
    ? `${profile.sex === "female" ? "女性" : "男性"} · ${formatNumber(profile.age)} 岁`
    : "身体档案";
  elements.mobileProfileDetail.textContent = profile
    ? `${formatNumber(profile.height, 1)} cm · ${formatNumber(profile.weight, 1)} kg · ${GOAL_PRESETS[state.goal].label}`
    : "填写身体数据后开始计算";
  const activityLabels = {
    1.2: "久坐办公",
    1.3: "轻度活动",
    1.4: "中度活动",
    1.55: "高体力活动",
  };
  elements.mobileTrainingSummary.textContent = profile
    ? `${activityLabels[profile.activity] || "日常活动"} · ${
        profile.manualBmr ? `BMR ${formatNumber(profile.manualBmr)} kcal` : "公式估算 BMR"
      }`
    : "身体资料与日常活动水平";
  elements.mobileTargetSummary.textContent =
    `Daily Fuel ${formatNumber(state.targets.calories)} kcal · 蛋白质 ${formatNumber(state.targets.protein)} g`;
  elements.mobileAiSummary.textContent = aiSettings.apiKey
    ? `已配置 · ${aiSettings.model}`
    : "API 尚未配置";
}

function exportLocalBackup() {
  const backup = {
    app: "FUEL UP",
    formatVersion: 1,
    dataVersion: DATA_VERSION,
    exportedAt: new Date().toISOString(),
    data: state,
  };
  const serialized = JSON.stringify(backup, null, 2);
  const fileName = `fuelup-backup-${formatDateKey(new Date())}.json`;
  if (isNativeRuntime && navigator.share && typeof File !== "undefined") {
    const shareFile = new File([serialized], fileName, { type: "application/json" });
    if (!navigator.canShare || navigator.canShare({ files: [shareFile] })) {
      navigator
        .share({
          title: "FUEL UP 本地备份",
          text: "请保存到文件管理器，以便以后恢复数据。",
          files: [shareFile],
        })
        .then(() => showToast("备份文件已保存或分享"))
        .catch(() => {});
      return;
    }
  }
  const blob = new Blob([serialized], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("本地备份已导出");
}

async function importLocalBackup(file) {
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    const imported = payload?.data || payload;
    if (!imported || !Array.isArray(imported.products) || !Array.isArray(imported.entries)) {
      throw new Error("文件中没有可识别的 FUEL UP 数据");
    }
    if (!window.confirm("导入会覆盖这台手机当前的记录。当前数据会先保留一份备份，是否继续？")) {
      return;
    }
    window.localStorage.setItem("fuelup-before-import", JSON.stringify(state));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
    showToast("备份导入成功，正在重新载入");
    window.setTimeout(() => window.location.reload(), 400);
  } catch (error) {
    showToast(`导入失败：${error.message}`);
  } finally {
    elements.mobileImportInput.value = "";
  }
}

function setupNativeBackButton() {
  if (!isNativeRuntime) return;
  const appPlugin = window.Capacitor?.Plugins?.App;
  if (!appPlugin?.addListener) return;
  appPlugin.addListener("backButton", () => {
    const openDialogs = [...document.querySelectorAll("dialog[open]")];
    if (openDialogs.length) {
      closeDialog(openDialogs.at(-1));
      return;
    }
    if (mobileActiveView !== "today") {
      setMobileView("today");
      return;
    }
    appPlugin.exitApp?.();
  });
}

function renderAll() {
  renderProducts();
  renderMeals();
  updateSummary();
  renderRecords();
}

function openDialog(dialog) {
  if (dialog.open) return;
  dialog.showModal();
  document.body.classList.add("is-dialog-open");
}

function closeDialog(dialog) {
  if (dialog.open) dialog.close();
}

function openPortionDialog(productId, entryId = null) {
  const product = getProduct(productId);
  if (!product) return;

  selectedProductId = product.id;
  editingEntryId = entryId;
  const entry = entryId ? state.entries.find((item) => item.id === entryId) : null;
  const category = CATEGORY_STYLES[product.category] || CATEGORY_STYLES.其他;
  elements.portionProductIcon.textContent = product.category;
  elements.portionProductIcon.style.setProperty("--portion-accent", category.accent);
  elements.portionBrand.textContent = entry ? `正在编辑 · ${product.brand}` : product.brand;
  elements.portionName.textContent = product.name;
  elements.portionBasis.textContent =
    product.boneIn
      ? product.baseGrams === 100
        ? "营养按去骨后可食部每 100 g 换算"
        : `营养按可食部每 ${formatNumber(product.baseGrams)} g 换算`
      : product.baseGrams === 100
        ? "每 100 g 营养数据"
        : `营养数据基准：每 ${formatNumber(product.baseGrams)} g`;
  elements.boneWeightPanel.hidden = !product.boneIn;
  elements.portionQuantityLabel.textContent = product.boneIn ? "去骨后可食重量" : "实际食用量";
  elements.quickAmounts.hidden = product.boneIn;
  elements.grossPortionGrams.value =
    product.boneIn && entry?.grossGrams ? round(entry.grossGrams, 1) : "";
  elements.portionGrams.value = round(entry ? entry.grams : product.servingGrams, 1);
  elements.portionRange.max = Math.max(
    500,
    product.servingGrams * 6,
    entry ? Math.ceil(entry.grams) : 0
  );
  elements.portionRange.value = Math.min(
    Number(elements.portionRange.max),
    Math.max(1, entry ? entry.grams : product.servingGrams)
  );
  elements.confirmPortionLabel.textContent = entry ? "保存分量修改" : "加入今日餐盘";
  elements.removePortionButton.hidden = !entry;
  markQuickAmount(entry && entry.grams === product.servingGrams ? 1 : null);
  updateBoneWeightSummary();
  refreshPortionPreview();
  openDialog(elements.portionDialog);
}

function getPortionGrams() {
  const value = Number(elements.portionGrams.value);
  return Number.isFinite(value) && value > 0 ? value : 1;
}

function getGrossPortionGrams() {
  const value = Number(elements.grossPortionGrams.value);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function updateBoneWeightSummary() {
  const product = getProduct(selectedProductId);
  if (!product?.boneIn) {
    elements.boneWeightSummary.textContent = "请输入去骨后可食重量";
    return;
  }

  const edibleGrams = getPortionGrams();
  const grossGrams = getGrossPortionGrams();
  if (!grossGrams) {
    elements.boneWeightSummary.textContent = `可食重 ${formatNumber(edibleGrams, 1)} g`;
    return;
  }

  if (grossGrams < edibleGrams) {
    elements.boneWeightSummary.textContent = "带骨总重应不小于可食重量";
    return;
  }

  const boneGrams = Math.max(0, grossGrams - edibleGrams);
  const ediblePercent = grossGrams > 0 ? (edibleGrams / grossGrams) * 100 : 0;
  elements.boneWeightSummary.textContent =
    `骨头约 ${formatNumber(boneGrams, 1)} g · 可食率 ${formatNumber(ediblePercent, 1)}%`;
}

function refreshPortionPreview() {
  const product = getProduct(selectedProductId);
  if (!product) return;
  const factor = getPortionGrams() / product.baseGrams;
  elements.previewCalories.textContent = formatNumber((product.energyKj * factor) / 4.184);
  elements.previewProtein.textContent = `${formattedMacro(product.protein * factor)} g`;
  elements.previewCarbs.textContent = `${formattedMacro(product.carbs * factor)} g`;
  elements.previewFat.textContent = `${formattedMacro(product.fat * factor)} g`;
  updateBoneWeightSummary();
}

function markQuickAmount(multiplier) {
  elements.quickAmounts.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.multiplier) === multiplier);
  });
}

function addMeal(productId, grams, grossGrams = null) {
  const product = getProduct(productId);
  if (!product || !(grams > 0)) return;

  const existing = state.entries.find(
    (entry) =>
      entry.productId === productId &&
      (!product.boneIn || entry.grossGrams !== null)
  );
  if (existing) {
    existing.grams = round(existing.grams + grams, 1);
    if (product.boneIn && grossGrams && existing.grossGrams) {
      existing.grossGrams = round(existing.grossGrams + grossGrams, 1);
    }
  } else {
    state.entries.push({
      id: makeId("entry"),
      productId,
      grams: round(grams, 1),
      grossGrams: product.boneIn && grossGrams ? round(grossGrams, 1) : null,
    });
  }

  persistState();
  closeDialog(elements.portionDialog);
  renderAll();
  if (elements.quickAddDialog.open) renderQuickAdd();
  showToast(`${product.name} 已加入今日餐盘`);
}

function changeMealAmount(entryId, delta) {
  const entry = state.entries.find((item) => item.id === entryId);
  if (!entry) return;
  const product = getProduct(entry.productId);
  entry.grams = round(entry.grams + delta, 1);
  if (product?.boneIn && entry.grossGrams) {
    entry.grossGrams = round(Math.max(entry.grams, entry.grossGrams + delta), 1);
  }
  if (entry.grams <= 0) {
    state.entries = state.entries.filter((item) => item.id !== entryId);
  }
  persistState();
  renderMeals();
  updateSummary();
}

function saveEditedMeal(grams, grossGrams = null) {
  const entry = state.entries.find((item) => item.id === editingEntryId);
  if (!entry || !(grams > 0)) return;
  const product = getProduct(entry.productId);
  entry.grams = round(grams, 1);
  entry.grossGrams =
    product?.boneIn && grossGrams ? round(Math.max(grams, grossGrams), 1) : null;
  persistState();
  closeDialog(elements.portionDialog);
  renderAll();
  showToast("餐盘分量已更新");
}

function removeEditedMeal() {
  const entry = state.entries.find((item) => item.id === editingEntryId);
  if (!entry) return;
  const product = getProduct(entry.productId);
  state.entries = state.entries.filter((item) => item.id !== entry.id);
  persistState();
  closeDialog(elements.portionDialog);
  renderAll();
  showToast(product ? `${product.name} 已从餐盘移除` : "餐盘记录已移除");
}

function applyGoal(goalKey) {
  const preset = GOAL_PRESETS[goalKey];
  if (!preset) return;
  state.goal = goalKey;
  if (!applyCalculatedTargets()) state.targets = { ...preset };
  persistState();
  renderAll();
  showToast(`已切换为${preset.label}目标`);
}

function openTargetDialog() {
  const form = elements.targetForm;
  form.elements.calories.value = state.targets.calories;
  form.elements.protein.value = state.targets.protein;
  form.elements.carbs.value = state.targets.carbs;
  form.elements.fat.value = state.targets.fat;
  form.elements.fiber.value = state.targets.fiber;
  openDialog(elements.targetDialog);
}

function openProfileDialog() {
  const form = elements.profileForm;
  form.reset();
  elements.profileFormError.classList.remove("is-visible");

  if (state.profile) {
    form.elements.sex.value = state.profile.sex;
    form.elements.age.value = state.profile.age;
    form.elements.height.value = state.profile.height;
    form.elements.weight.value = state.profile.weight;
    form.elements.activity.value = String(state.profile.activity);
    form.elements.manualBmr.value = state.profile.manualBmr || "";
    form.elements.autoTargets.checked = state.profile.autoTargets;
  }
  openDialog(elements.profileDialog);
}

function handleProfileSubmit(event) {
  event.preventDefault();
  const data = new FormData(elements.profileForm);
  state.profile = normalizeProfile({
    sex: data.get("sex"),
    age: data.get("age"),
    height: data.get("height"),
    weight: data.get("weight"),
    activity: data.get("activity"),
    manualBmr: data.get("manualBmr"),
    autoTargets: data.get("autoTargets") === "on",
  });
  applyCalculatedTargets();
  persistState();
  closeDialog(elements.profileDialog);
  renderAll();
  showToast(state.profile.autoTargets ? "身体资料已保存，Daily Fuel 已更新" : "身体资料已保存");
}

function openWorkoutDialog() {
  syncWorkoutInputs();
  openDialog(elements.workoutDialog);
}

function handleWorkoutSubmit(event) {
  event.preventDefault();
  state.workout = readWorkoutForm();
  state.workoutDate = formatDateKey(new Date());
  applyCalculatedTargets();
  persistState();
  closeDialog(elements.workoutDialog);
  renderAll();
  showToast(
    state.workout.type === "none"
      ? "已记录为无训练，Daily Fuel 已更新"
      : "今日训练已保存，Daily Fuel 已更新"
  );
}

function openAiSettingsDialog() {
  const form = elements.aiSettingsForm;
  form.elements.apiKey.value = aiSettings.apiKey;
  form.elements.model.value = aiSettings.model;
  elements.aiSettingsError.classList.remove("is-visible");
  openDialog(elements.aiSettingsDialog);
}

async function requestDeepSeek(messages, options = {}) {
  if (!aiSettings.apiKey) throw new Error("请先配置 DeepSeek API Key。");
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 60000);

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${aiSettings.apiKey}`,
      },
      body: JSON.stringify({
        model: aiSettings.model,
        messages,
        temperature: options.temperature ?? 0.45,
        max_tokens: options.maxTokens ?? 900,
        stream: false,
        ...(options.jsonMode && aiSettings.model === "deepseek-chat"
          ? { response_format: { type: "json_object" } }
          : {}),
      }),
      signal: controller.signal,
    });

    const rawBody = await response.text();
    let body = null;
    try {
      body = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      body = null;
    }

    if (!response.ok) {
      const detail = body?.error?.message || rawBody.slice(0, 180);
      if (response.status === 401) throw new Error("API Key 无效或已失效。");
      if (response.status === 429) throw new Error("请求过于频繁或额度不足，请稍后再试。");
      throw new Error(detail || `DeepSeek 请求失败（${response.status}）。`);
    }

    const content = body?.choices?.[0]?.message?.content;
    if (!content) throw new Error("DeepSeek 没有返回可用内容。");
    return String(content).trim();
  } catch (error) {
    if (error.name === "AbortError") throw new Error("DeepSeek 响应超时，请稍后重试。");
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function handleAiSettingsSubmit(event) {
  event.preventDefault();
  const data = new FormData(elements.aiSettingsForm);
  const apiKey = String(data.get("apiKey") || "").trim();
  const model = String(data.get("model") || "deepseek-chat");
  if (!apiKey) {
    elements.aiSettingsError.textContent = "请填写 DeepSeek API Key。";
    elements.aiSettingsError.classList.add("is-visible");
    return;
  }

  saveAiSettings({ apiKey, model });
  elements.aiSettingsError.classList.remove("is-visible");
  elements.saveAiSettingsButton.disabled = true;
  elements.saveAiSettingsButton.textContent = "正在测试连接…";

  try {
    await requestDeepSeek(
      [{ role: "user", content: "这是连接测试，请只回复 OK。" }],
      { temperature: 0, maxTokens: 8 }
    );
    closeDialog(elements.aiSettingsDialog);
    updateAiUi();
    showToast("DeepSeek 连接成功");
  } catch (error) {
    elements.aiSettingsError.textContent = `已保存密钥，但连接失败：${error.message}`;
    elements.aiSettingsError.classList.add("is-visible");
    updateAiUi();
  } finally {
    elements.saveAiSettingsButton.disabled = false;
    elements.saveAiSettingsButton.innerHTML =
      '<svg><use href="#icon-check"></use></svg>保存并测试连接';
  }
}

function buildAiCoachPrompt() {
  const totals = calculateTotals();
  const plan = calculateEnergyPlan();
  const remaining = {
    calories: state.targets.calories - totals.calories,
    protein: state.targets.protein - totals.protein,
    carbs: state.targets.carbs - totals.carbs,
    fat: state.targets.fat - totals.fat,
    fiber: state.targets.fiber - totals.fiber,
  };
  const meals = state.entries.map((entry) => {
    const product = getProduct(entry.productId);
    return product
      ? {
          name: product.name,
          brand: product.brand,
          edibleGrams: round(entry.grams, 1),
          weighedWithBoneGrams: entry.grossGrams,
        }
      : null;
  }).filter(Boolean);
  const products = state.products.slice(0, 50).map((product) => ({
    name: product.name,
    brand: product.brand,
    category: product.category,
    nutritionBaseGrams: product.baseGrams,
    energyKj: product.energyKj,
    proteinGrams: product.protein,
    carbsGrams: product.carbs,
    fatGrams: product.fat,
    fiberGrams: product.fiber,
    sodiumMg: product.sodium,
    defaultServingGrams: product.servingGrams,
    boneIn: product.boneIn,
  }));

  return `
你是一名谨慎、务实的运动营养教练。请根据以下真实记录，分析今日营养状态。

用户资料：${JSON.stringify(state.profile)}
目标模式：${GOAL_PRESETS[state.goal].label}
今日训练：${JSON.stringify({
    type: EXERCISE_METS[state.workout.type].label,
    focus: state.workout.type === "strength" ? STRENGTH_FOCUS[state.workout.focus] : undefined,
    minutes: state.workout.minutes,
    rpe: state.workout.rpe,
    averageHeartRateBpm: state.workout.avgHeartRate,
    wearableActiveCalories: state.workout.activeCalories,
    estimatedActiveCaloriesRange: plan
      ? [plan.exerciseLow, plan.exerciseHigh]
      : null,
    note: state.workout.note,
  })}
能量估算：${JSON.stringify(plan)}
当前目标：${JSON.stringify(state.targets)}
今日已摄入：${JSON.stringify({
    calories: round(totals.calories),
    protein: round(totals.protein, 1),
    carbs: round(totals.carbs, 1),
    fat: round(totals.fat, 1),
    fiber: round(totals.fiber, 1),
    sodium: round(totals.sodium),
  })}
较目标剩余：${JSON.stringify({
    calories: round(remaining.calories),
    protein: round(remaining.protein, 1),
    carbs: round(remaining.carbs, 1),
    fat: round(remaining.fat, 1),
    fiber: round(remaining.fiber, 1),
  })}
今日餐盘：${JSON.stringify(meals)}
补给站商品：${JSON.stringify(products)}

只输出一个合法 JSON 对象，不要输出 Markdown、代码围栏或额外解释。结构必须严格为：
{
  "headline": "一句 16 至 28 字的今日核心判断",
  "summary": "70 至 120 字的简短说明，点出热量、蛋白质或训练中最值得关注的 1 至 2 点",
  "actions": [
    {
      "priority": "优先",
      "title": "4 至 10 字的行动",
      "detail": "25 至 55 字，给出可执行且不过量的建议"
    },
    {
      "priority": "建议",
      "title": "4 至 10 字的行动",
      "detail": "25 至 55 字"
    },
    {
      "priority": "注意",
      "title": "4 至 10 字的行动",
      "detail": "25 至 55 字"
    }
  ],
  "closingNote": "25 至 50 字，用一句话总结接下来最值得坚持的事"
}

要求：
- 使用上面给出的数字，不要编造精确消耗或医学诊断。
- 如果已经超过目标，不要建议继续硬吃到目标。
- 如果摄入明显偏低，可以提醒不要长期极端节食。
- actions 必须正好 3 项，不要输出下一餐组合、食谱表格或一键配餐。
- 不要输出表格，不要使用夸张语气。
`;
}

async function generateAiAdvice() {
  if (!state.profile) {
    openProfileDialog();
    showToast("先填写身体数据，才能估算 Daily Fuel");
    return;
  }
  if (!aiSettings.apiKey) {
    openAiSettingsDialog();
    showToast("先配置 DeepSeek API Key");
    return;
  }

  const snapshotAtRequest = getAdviceSnapshot();
  elements.generateAdviceButton.disabled = true;
  elements.generateAdviceButton.classList.add("is-loading");
  elements.generateAdviceButton.querySelector("span").textContent = "正在分析今日数据…";
  elements.aiActionCount.textContent = "分析中";
  elements.aiActionList.innerHTML = `
    <span class="ai-thinking"><i></i><i></i><i></i> DeepSeek 正在整理今日摄入与训练数据</span>
  `;

  try {
    const advice = await requestDeepSeek(
      [
        {
          role: "system",
          content: "你是运动营养记录工具中的助手。只依据用户提供的数据给建议，不进行疾病诊断。",
        },
        { role: "user", content: buildAiCoachPrompt() },
      ],
      { temperature: 0.35, maxTokens: 700, jsonMode: true }
    );
    const cleanedAdvice = advice
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();
    let parsedAdvice;
    try {
      parsedAdvice = JSON.parse(cleanedAdvice);
    } catch {
      throw new Error("AI 返回的建议格式不完整，请重新生成。");
    }
    state.aiAdvice = normalizeAiAdvice(parsedAdvice);
    if (!state.aiAdvice) throw new Error("AI 返回的建议缺少必要内容，请重新生成。");
    state.aiAdviceSnapshot = snapshotAtRequest;
    persistState();
    renderAiAdvice();
    showToast("今日建议已生成");
  } catch (error) {
    elements.aiActionCount.textContent = "生成失败";
    elements.aiActionList.innerHTML = `
      <div class="ai-advice-error">
        <strong>暂时无法生成建议</strong>
        <span>${escapeHTML(error.message)}</span>
      </div>
    `;
    showToast("DeepSeek 请求失败");
  } finally {
    elements.generateAdviceButton.disabled = false;
    elements.generateAdviceButton.classList.remove("is-loading");
    elements.generateAdviceButton.querySelector("span").textContent = "重新生成今日建议";
  }
}

function updateBasisHint() {
  const basis = elements.productForm.elements.basis.value;
  elements.nutritionBasisHint.textContent =
    basis === "per100"
      ? "请填写包装上“每 100 g”的数值。"
      : "请按“每 1 份”填写，系统会用默认份量进行换算。";
}

function openProductEditor(productId = null) {
  editingProductId = productId;
  elements.productForm.reset();
  elements.productFormError.classList.remove("is-visible");

  const product = productId ? getProduct(productId) : null;
  if (product) {
    const form = elements.productForm;
    form.elements.name.value = product.name;
    form.elements.brand.value = product.brand;
    form.elements.category.value = product.category;
    form.elements.servingGrams.value = product.servingGrams;
    form.querySelector(`[name="basis"][value="${product.basis}"]`).checked = true;
    form.elements.energy.value = round(product.energyKj, 1);
    form.elements.energyUnit.value = "kj";
    form.elements.protein.value = product.protein;
    form.elements.carbs.value = product.carbs;
    form.elements.fat.value = product.fat;
    form.elements.fiber.value = product.fiber;
    form.elements.sugar.value = product.sugar;
    form.elements.sodium.value = product.sodium;
    form.elements.boneIn.checked = product.boneIn;
    elements.productSheetKicker.textContent = "EDIT PRODUCT";
    elements.productSheetTitle.textContent = "编辑商品";
    elements.productSheetDescription.textContent = "修改后的营养数据会立即应用到补给站与今日餐盘。";
    elements.productSubmitLabel.textContent = "保存商品修改";
  } else {
    elements.productSheetKicker.textContent = "NEW PRODUCT";
    elements.productSheetTitle.textContent = "添加一件商品";
    elements.productSheetDescription.textContent = "照着营养标签填写，之后添加分量时会自动换算。";
    elements.productSubmitLabel.textContent = "保存到补给站";
  }

  updateBasisHint();
  openDialog(elements.productDialog);
}

function handleProductSubmit(event) {
  event.preventDefault();
  elements.productFormError.classList.remove("is-visible");

  const data = new FormData(elements.productForm);
  const name = String(data.get("name") || "").trim();
  const servingGrams = positiveNumber(data.get("servingGrams"), 100);
  const energy = positiveNumber(data.get("energy"), NaN);
  const protein = positiveNumber(data.get("protein"), NaN);
  const carbs = positiveNumber(data.get("carbs"), NaN);
  const fat = positiveNumber(data.get("fat"), NaN);

  if (!name || !(servingGrams > 0) || !Number.isFinite(energy) || !Number.isFinite(protein)) {
    elements.productFormError.textContent = "请完整填写商品名称、份量、能量、蛋白质、碳水和脂肪。";
    elements.productFormError.classList.add("is-visible");
    return;
  }

  if (!Number.isFinite(carbs) || !Number.isFinite(fat)) {
    elements.productFormError.textContent = "请填写有效的碳水与脂肪数值。";
    elements.productFormError.classList.add("is-visible");
    return;
  }

  const basis = data.get("basis") === "perServing" ? "perServing" : "per100";
  const energyUnit = data.get("energyUnit") === "kcal" ? "kcal" : "kj";
  const baseGrams = basis === "per100" ? 100 : servingGrams;
  const energyKj = energyUnit === "kcal" ? energy * 4.184 : energy;
  const categoryValue = String(data.get("category") || "其他");

  const existingProduct = editingProductId ? getProduct(editingProductId) : null;
  const product = normalizeProduct({
    id: existingProduct?.id || makeId("custom-food"),
    name,
    brand: String(data.get("brand") || "").trim() || "自定义商品",
    category: CATEGORY_STYLES[categoryValue] ? categoryValue : "其他",
    baseGrams,
    servingGrams,
    basis,
    energyKj,
    protein,
    fat,
    carbs,
    fiber: positiveNumber(data.get("fiber"), 0),
    sugar: positiveNumber(data.get("sugar"), 0),
    sodium: positiveNumber(data.get("sodium"), 0),
    boneIn: data.get("boneIn") === "on",
    isCustom: existingProduct ? existingProduct.isCustom : true,
  });

  if (existingProduct) {
    Object.assign(existingProduct, product);
  } else {
    state.products.unshift(product);
  }
  persistState();
  closeDialog(elements.productDialog);
  activeCategory = "all";
  elements.productSearch.value = "";
  syncCategoryChips();
  renderAll();
  showToast(existingProduct ? `${product.name} 已更新` : `${product.name} 已存入补给站`);
  if (returnToQuickAddAfterProduct) {
    returnToQuickAddAfterProduct = false;
    openQuickAddDialog();
  }
}

function deleteCustomProduct(productId) {
  const product = getProduct(productId);
  if (!product || !product.isCustom) return;
  const used = state.entries.some((entry) => entry.productId === productId);
  const message = used
    ? `删除“${product.name}”后，今日餐盘中的这项记录也会一并移除。继续吗？`
    : `确定从补给站删除“${product.name}”吗？`;

  if (!window.confirm(message)) return;
  state.products = state.products.filter((item) => item.id !== productId);
  state.entries = state.entries.filter((entry) => entry.productId !== productId);
  persistState();
  renderAll();
  showToast("商品已删除");
}

function syncCategoryChips() {
  elements.filterChips.forEach((chip) => {
    const active = chip.dataset.category === activeCategory;
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2300);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function setDateLabel() {
  const date = new Date();
  elements.dateLabel.textContent = new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

// Goal controls
elements.goalButtons.forEach((button) => {
  button.addEventListener("click", () => applyGoal(button.dataset.goal));
});

elements.targetSettingsButton.addEventListener("click", openTargetDialog);

elements.targetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(elements.targetForm);
  state.targets = normalizeTargets({
    label: "自定义",
    calories: data.get("calories"),
    protein: data.get("protein"),
    carbs: data.get("carbs"),
    fat: data.get("fat"),
    fiber: data.get("fiber"),
  });
  if (state.profile) state.profile.autoTargets = false;
  persistState();
  closeDialog(elements.targetDialog);
  renderAll();
  showToast("营养目标已更新");
});

elements.editCoachSettingsButton.addEventListener("click", openProfileDialog);
elements.profileForm.addEventListener("submit", handleProfileSubmit);
elements.aiSettingsButton.addEventListener("click", openAiSettingsDialog);
elements.aiSettingsForm.addEventListener("submit", handleAiSettingsSubmit);
elements.generateAdviceButton.addEventListener("click", generateAiAdvice);

// Meal controls
elements.mealList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-meal-action]");
  if (!button) return;
  const item = button.closest("[data-entry-id]");
  if (!item) return;
  if (button.dataset.mealAction === "edit") {
    const entry = state.entries.find((candidate) => candidate.id === item.dataset.entryId);
    if (entry) openPortionDialog(entry.productId, entry.id);
    return;
  }
  const delta = button.dataset.mealAction === "increase" ? 10 : -10;
  changeMealAmount(item.dataset.entryId, delta);
});

elements.clearMealsButton.addEventListener("click", () => {
  if (state.entries.length === 0) return;
  if (!window.confirm("清空今天的餐盘记录吗？商品库与目标设置会保留。")) return;
  state.entries = [];
  persistState();
  renderAll();
  showToast("今日餐盘已清空");
});

// Record controls
elements.recordTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    recordView = tab.dataset.recordView;
    recordCursorKey = formatDateKey(new Date());
    renderRecords();
  });
});

elements.recordContent.addEventListener("click", (event) => {
  const navButton = event.target.closest("[data-record-nav]");
  if (navButton) {
    shiftRecordPeriod(navButton.dataset.recordNav === "next" ? 1 : -1);
    return;
  }

  const dayButton = event.target.closest("[data-record-day]");
  if (dayButton) {
    recordView = "day";
    recordCursorKey = dayButton.dataset.recordDay;
    renderRecords();
  }
});

elements.recordContent.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-record-weight-form]");
  if (!form) return;
  event.preventDefault();
  saveRecordWeight(form.dataset.date, form.elements.weight.value.trim());
});

elements.recordExportButton.addEventListener("click", exportRecords);

// Today food-log controls
elements.openQuickAddButton.addEventListener("click", openQuickAddDialog);
document.querySelectorAll("[data-open-quick-add]").forEach((button) => {
  button.addEventListener("click", openQuickAddDialog);
});
elements.quickFoodSearch.addEventListener("input", renderQuickAdd);
elements.quickAddFilters.forEach((button) => {
  button.addEventListener("click", () => {
    quickAddCategory = button.dataset.quickCategory;
    renderQuickAdd();
  });
});
elements.quickFoodList.addEventListener("click", (event) => {
  const row = event.target.closest("[data-quick-food-id]");
  if (row) openPortionDialog(row.dataset.quickFoodId);
});
elements.quickAddNewProductButton.addEventListener("click", () => {
  closeDialog(elements.quickAddDialog);
  returnToQuickAddAfterProduct = true;
  openProductEditor();
});

// Mobile app navigation and local backup
elements.mobileTabs.forEach((tab) => {
  tab.addEventListener("click", () => setMobileView(tab.dataset.mobileTab));
});
elements.mobileProfileButton.addEventListener("click", openProfileDialog);
elements.mobileTrainingSettingsButton.addEventListener("click", openProfileDialog);
elements.mobileTargetSettingsButton.addEventListener("click", openTargetDialog);
elements.mobileAiSettingsButton.addEventListener("click", openAiSettingsDialog);
elements.openWorkoutDialogButton.addEventListener("click", openWorkoutDialog);
elements.workoutForm.addEventListener("submit", handleWorkoutSubmit);
elements.workoutType.addEventListener("change", () => {
  if (elements.workoutType.value !== "none" && Number(elements.workoutMinutes.value) <= 0) {
    elements.workoutMinutes.value = elements.workoutType.value === "strength" ? 45 : 55;
  }
  updateWorkoutTypeFields();
  refreshWorkoutEstimate();
});
elements.workoutFocus.addEventListener("change", refreshWorkoutEstimate);
elements.workoutMinutes.addEventListener("input", refreshWorkoutEstimate);
elements.workoutHeartRate.addEventListener("input", refreshWorkoutEstimate);
elements.workoutActiveCalories.addEventListener("input", refreshWorkoutEstimate);
elements.workoutRpe.addEventListener("input", () => {
  updateWorkoutTypeFields();
  refreshWorkoutEstimate();
});
elements.mobileExportButton.addEventListener("click", exportLocalBackup);
elements.mobileImportButton.addEventListener("click", () => elements.mobileImportInput.click());
elements.mobileImportInput.addEventListener("change", () => {
  importLocalBackup(elements.mobileImportInput.files?.[0]);
});
document.addEventListener("click", (event) => {
  const libraryLink = event.target.closest('a[href="#foodLibrary"]');
  if (!libraryLink || !document.body.classList.contains("mobile-app-mode")) return;
  event.preventDefault();
  setMobileView("supply");
});
window.addEventListener("resize", syncMobileExperience);

// Cloud sync controls
elements.syncButton.addEventListener("click", openSyncDialog);
elements.createSyncButton.addEventListener("click", createCloudSync);
elements.connectSyncForm.addEventListener("submit", (event) => {
  event.preventDefault();
  connectCloudSync(elements.connectSyncForm);
});
elements.connectSyncForm.elements.useLocalData.addEventListener("change", (event) => {
  elements.connectSyncForm.querySelector("button[type=submit]").textContent = event.target.checked
    ? "连接并上传当前页面数据"
    : "连接并恢复云端数据";
});
elements.copySyncCodeButton.addEventListener("click", copySyncCode);
elements.syncUploadButton.addEventListener("click", async () => {
  const ok = await pushCloudState();
  if (ok) showToast("当前页面数据已上传");
});
elements.syncPullButton.addEventListener("click", () => pullCloudNow({ ask: true }));
elements.forceSyncButton.addEventListener("click", forceCloudOverwrite);
elements.disconnectSyncButton.addEventListener("click", () => {
  if (!window.confirm("停止同步不会删除数据，但以后不会再自动上传或下载。继续吗？")) return;
  cloudSyncMeta = null;
  saveCloudSyncMeta();
  renderSyncDialog();
  showToast("已停止设备同步");
});
window.addEventListener("focus", () => {
  if (document.visibilityState === "visible") {
    if (ensureTodayWorkout()) {
      applyCalculatedTargets();
      persistState();
      renderAll();
    }
    checkCloudForUpdates();
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    if (ensureTodayWorkout()) {
      applyCalculatedTargets();
      persistState();
      renderAll();
    }
    checkCloudForUpdates();
  }
});

// Product library controls
elements.productSearch.addEventListener("input", renderProducts);

elements.filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeCategory = chip.dataset.category;
    syncCategoryChips();
    renderProducts();
  });
});

elements.productGrid.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-product-action]");
  if (!actionButton) return;
  const card = actionButton.closest("[data-product-id]");
  if (!card) return;
  const productId = card.dataset.productId;

  if (actionButton.dataset.productAction === "add") {
    openPortionDialog(productId);
  } else if (actionButton.dataset.productAction === "edit") {
    returnToQuickAddAfterProduct = false;
    openProductEditor(productId);
  } else if (actionButton.dataset.productAction === "delete") {
    deleteCustomProduct(productId);
  }
});

elements.openProductDialogButton.addEventListener("click", () => {
  returnToQuickAddAfterProduct = false;
  openProductEditor();
});

elements.productForm.elements.basis.forEach((input) => {
  input.addEventListener("change", updateBasisHint);
});

elements.productForm.addEventListener("submit", handleProductSubmit);

// Portion sheet controls
elements.portionGrams.addEventListener("input", () => {
  const grams = getPortionGrams();
  elements.portionRange.value = Math.min(Number(elements.portionRange.max), grams);
  markQuickAmount(null);
  refreshPortionPreview();
});

elements.grossPortionGrams.addEventListener("input", updateBoneWeightSummary);

elements.portionRange.addEventListener("input", () => {
  elements.portionGrams.value = elements.portionRange.value;
  markQuickAmount(null);
  refreshPortionPreview();
});

elements.quickAmounts.addEventListener("click", (event) => {
  const button = event.target.closest("[data-multiplier]");
  if (!button) return;
  const product = getProduct(selectedProductId);
  if (!product) return;
  const multiplier = Number(button.dataset.multiplier);
  const grams = round(product.servingGrams * multiplier, 1);
  elements.portionGrams.value = grams;
  elements.portionRange.max = Math.max(Number(elements.portionRange.max), grams);
  elements.portionRange.value = grams;
  markQuickAmount(multiplier);
  refreshPortionPreview();
});

elements.confirmPortionButton.addEventListener("click", () => {
  if (editingEntryId) saveEditedMeal(getPortionGrams(), getGrossPortionGrams());
  else addMeal(selectedProductId, getPortionGrams(), getGrossPortionGrams());
});

elements.removePortionButton.addEventListener("click", removeEditedMeal);

// Shared dialog controls
document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button.closest("dialog")));
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const clickedInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!clickedInside) closeDialog(dialog);
  });

  dialog.addEventListener("close", () => {
    const anyDialogOpen = [...document.querySelectorAll("dialog")].some((item) => item.open);
    if (!anyDialogOpen) document.body.classList.remove("is-dialog-open");
    if (dialog === elements.portionDialog) {
      editingEntryId = null;
      elements.removePortionButton.hidden = true;
      elements.boneWeightPanel.hidden = true;
      elements.quickAmounts.hidden = false;
      elements.confirmPortionLabel.textContent = "加入今日餐盘";
    }
    if (dialog === elements.productDialog) editingProductId = null;
  });
});

ensureTodayWorkout();
applyCalculatedTargets();
persistState();
syncWorkoutInputs();
setDateLabel();
syncCategoryChips();
renderAll();
syncMobileExperience();
initializeCloudSync();
setupNativeBackButton();

if (!isNativeRuntime && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
