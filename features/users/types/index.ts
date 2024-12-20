declare interface User {
  _id: any;
  kindeId: string;
  name: string;
  email: string;
  profile_picture?: string;
  cover_picture?: string;
  timer_picture?: string;
  field: StudyField;
  grade: number;
  exam: ExamType;
  apiTenancy: number;
  lastApiTenancyUpdate: Date;
}

declare type EducationLevel = 'İlkokul' | 'Ortaokul' | 'Lise' | 'Mezun';
