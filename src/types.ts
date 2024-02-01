export interface CircleInterface {
    id: number,
    name: string
}

export interface PluginOptions {  
    selector?: string,
    initializedOptions: string[] | null;    
    onPositionChange: (positions: string[]) => void;
    onComplete: (positions: string[]) => Promise<void>;   
    onInit: () => Promise<string[]>
}