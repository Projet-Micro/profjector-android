export type Professor = {
    firstName: string;
    lastName: string;
    NIC: string;
    email: string;
    status: string;
    accessToken: string;
}
export type ProfessorInfo = {
    professorInfo: Professor | null;
    message: string;
    loading: boolean;
}
export type ProfessorState = {
    professor : ProfessorInfo
}
export type Projector = {
    brand: string;
    serialNumber: string;
    nbrCables: number;
    comment: string;
    id: number;
    status: number;
}
export type ProjectorsState = {
    projectors: Projector[];
    loading: boolean;
    message: string;
}
export type GlobalState = {
    projectors: ProjectorsState,
    professors: ProfessorState
}