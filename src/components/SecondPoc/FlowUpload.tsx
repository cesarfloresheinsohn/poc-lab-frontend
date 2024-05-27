import React, { useEffect, useRef } from 'react';
import Flow, { FlowFile, FlowChunk } from '@flowjs/flow.js';

const FlowUpload: React.FC = () => {
    const flowRef = useRef<Flow | null>(null);

    useEffect(() => {
        if (!flowRef.current) {
            const flow = new Flow({
                target: '/upload', // Endpoint donde se cargarán los archivos
                chunkSize: 1024 * 1024, // Tamaño del fragmento
                testChunks: false, // Desactivar prueba de fragmentos
                query: (file: FlowFile, chunk: FlowChunk) => {
                    // Información adicional al request
                    console.log("CUANDO PASA POR ACA", file)
                    return { fileName: file.name, fileSize: file.size };
                },
            });

            const browseButton = document.getElementById('browseButton');
            const dropzone = document.getElementById('dropzone');

            if (browseButton && dropzone) {
                flow.assignBrowse([browseButton]);
                flow.assignDrop([dropzone]);

                flow.on('fileAdded', (file: FlowFile) => {
                    console.log('File added:', file);
                    flow.upload();
                });

                flow.on('fileProgress', (file: FlowFile) => {
                    console.log('File progress:', file.progress());
                });

                flow.on('fileSuccess', (file: FlowFile, message: string) => {
                    console.log('File uploaded successfully:', file, message);
                });

                flow.on('fileError', (file: FlowFile, message: string) => {
                    console.log('File upload failed:', file, message);
                });

                flow.on('uploadStart', () => {
                    console.log('Upload started');
                });

                flow.on('complete', () => {
                    console.log('Upload complete');
                });

                flow.on('chunkingStart', (file: FlowFile) => {
                    console.log('Chunking started on:', file);
                });

                flow.on('chunkingComplete', (file: FlowFile) => {
                    console.log('Chunking complete on:', file);
                });

                flow.on('chunkSuccess', (chunk: FlowChunk) => {
                    console.log('Chunk uploaded successfully:', chunk);
                });

                flow.on('chunkError', (chunk: FlowChunk, message: string) => {
                    console.log('Chunk upload failed:', chunk, message);
                });

                flowRef.current = flow;
            }
        }
    }, []);

    return (
        <div>
            <div
                id="dropzone"
                style={{
                    border: '2px dashed #007bff',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}
            >
                <p>Drag 'n' drop some files here, or click the button below to select files</p>
            </div>
            <button id="browseButton" style={{ display: 'block', margin: '20px auto' }}>Browse Files</button>
        </div>
    );
};

export default FlowUpload;
