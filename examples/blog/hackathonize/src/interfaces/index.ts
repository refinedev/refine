export type TeamType = {
    id: string;
    name: string;
};

export type HackathonerType = {
    id: string;
    name: string;
    team_id: string;
};

export type HackathonType = {
    id: string;
    start: string;
    end: string;
    name: string;
};

export type ProjectType = {
    id: string;
    name: string;
    description: string;
    url: string;
    hackathon_id: string;
    hackathoner_id: string;
};

export type CriteriaType = {
    id: string;
    name: string;
    hackathon_id: string;
};

export type ProjectScoreType = {
    project_id: string;
    criteria_id: string;
    score: string;
};
