export interface AcademicPeriod {
    id: string;
    current: boolean;
    startDate:  Date;
    name: string;
    nextPeriodId: string;
    prevPeriodId: string;
}