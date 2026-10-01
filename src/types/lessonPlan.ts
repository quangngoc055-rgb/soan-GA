export type ActivityPhaseType = 'khoi_dong' | 'kham_pha' | 'luyen_tap' | 'van_dung';

export interface ActivitySteps2345 {
  step1_transferTask: string;
  step2_performTask: string;
  step3_presentAndDiscuss: string;
  step4_evaluateAndConclude: string;
}

export interface TeachingActivity2345 {
  id: string;
  type: ActivityPhaseType;
  title: string;
  durationMinutes: number;
  objective: string;
  organizationForm: string;
  teachingMethod: string;
  steps: ActivitySteps2345;
  teacherActions: string[];
  studentActions: string[];
  expectedProducts: string;
}

export interface AssessmentCriterion {
  criterion: string;
  levelGood: string;
  levelCompleted: string;
  levelNeedsSupport: string;
  methodAndTool: string;
}

export interface LessonPlan2345 {
  id: string;
  createdAt: string;
  header: {
    subject: string;
    grade: string;
    lessonTitle: string;
    duration: string;
    executionDate: string;
    textbook: string;
    lessonType: string;
  };
  section1_objectives: {
    specificCompetencies: string[];
    generalCompetencies: {
      autonomyAndLearning: string;
      communicationAndCollaboration: string;
      problemSolvingAndCreativity: string;
    };
    qualities: string[];
    integratedContent: string;
  };
  section2_teachingAids: {
    teacherPreparation: string[];
    studentPreparation: string[];
  };
  section3_activities: TeachingActivity2345[];
  section4_assessmentAndAdjustment: {
    assessmentCriteria: AssessmentCriterion[];
    postLessonAdjustments: {
      inadequaciesAndDifficulties: string;
      effectiveHighlights: string;
      differentiationNotes: string;
    };
  };
}

export interface LessonPlanInputForm {
  subject: string;
  grade: string;
  lessonTitle: string;
  duration: string;
  objectives: string;
  textbook: string;
  executionDate: string;
  lessonType: string;
  pedagogicalFocus: string;
}
