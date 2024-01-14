export interface CoursePartRequirements extends CoursePartBase, CoursePartDescription{
    requirements: string[];
    kind:"special"
}

export interface CoursePartDescription extends CoursePartBase{
    description: string;
  }

  export  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  export interface CoursePartBasic extends CoursePartBase, CoursePartDescription {//extends both so description is also added
    kind: "basic"
  }

  export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  export  interface CoursePartBackground extends CoursePartBase, CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;
