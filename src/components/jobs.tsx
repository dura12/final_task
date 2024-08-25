export interface JobPostingsProps {
    success: boolean;
    message: string;
    data: JobPost[];
  }
  
export interface JobPost {
    id: string;
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    idealCandidate: string;
    categories: string[];
    opType: string;
    requiredSkills: string[];
    whenAndWhere: string;
    orgId: string;
    location: string[];
    startDate: string;
    endDate: string;
    deadline: string;
    datePosted: string;
    status: string;
    applicantsCount: number;
    viewsCount: number;
    orgName: string;
    logoUrl: string;
    isBookmarked: boolean;
    isRolling: boolean;
    questions: string | null;
    perksAndBenefits: string | null;
    createdAt: string; 
    updatedAt: string; 
    orgPrimaryPhone: string;
    orgEmail: string;
    average_rating: number;
    total_reviews: number;
  }

  export interface EventData {
    eventID: string;
    description: string;
    title: string;
    opType: string; 
    orgName: string;
    datePosted: string; 
    dateBookmarked: string; 
    logoUrl: string;
    location: string;
  }
  
  export interface ApiResponse {
    success: boolean;
    message: string;
    data: EventData[];
    errors: any; 
    count: number;
  }
  