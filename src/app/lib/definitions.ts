export type Exercise = {
    _id: number;
    body_part: string;
    equipment: string;
    gif_url: string;
    gif_id: string;
    api_id: string;
    name: string;
    target: string;
    secondary_muscles: Array<string>;
    instructions: Array<string>;
};
