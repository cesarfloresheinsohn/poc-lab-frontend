declare module '@flowjs/flow.js' {
    export interface FlowFile {
        name: string;
        size: number;
        progress: () => number; // Agregar cualquier método adicional que uses
    }

    export interface FlowChunk {
        file: FlowFile;
        startByte: number;
        endByte: number;
    }

    export interface FlowOptions {
        target: string;
        chunkSize?: number;
        testChunks?: boolean;
        query?: (file: FlowFile, chunk: FlowChunk) => any;
    }

    export interface FlowEventMap {
        fileAdded: (file: FlowFile) => void;
        fileProgress: (file: FlowFile) => void;
        fileSuccess: (file: FlowFile, message: string) => void;
        fileError: (file: FlowFile, message: string) => void;
        uploadStart: () => void;
        uploadComplete: () => void;
        complete: () => void;
        chunkingStart: (file: FlowFile) => void;
        chunkingComplete: (file: FlowFile) => void;
        chunkSuccess: (chunk: FlowChunk) => void;
        chunkError: (chunk: FlowChunk, message: string) => void;
    }

    class Flow {
        constructor(options?: FlowOptions);
        assignBrowse(domNodes: HTMLElement[]): void;
        assignDrop(domNodes: HTMLElement[]): void;
        upload(): void;
        on<K extends keyof FlowEventMap>(event: K, callback: FlowEventMap[K]): void;
        addFile(file: File): void;
    }

    export = Flow;
}
