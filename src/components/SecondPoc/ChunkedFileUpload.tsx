import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const CHUNK_SIZE = 1024; // 1KB

const ChunkedFileUpload: React.FC = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file: File) => {
            processFileInChunks(file);
        });
    }, []);

    const processFileInChunks = (file: File) => {
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const blob = file.slice(start, end);

            console.log(`Processingssss chunk ${chunkIndex + 1}/${totalChunks}`, blob);
        }

        console.log('File processed successfully');
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #007bff', padding: '20px', textAlign: 'center', cursor: 'pointer', marginTop: '20px' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
    );
};

export default ChunkedFileUpload;

