import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const CHUNK_SIZE = 1024 //1kb;

const ChunkedFileUploadBack: React.FC = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file: File) => {
            uploadFileInChunks(file);
        });
    }, []);

    const uploadFileInChunks = async (file: File) => {
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const blob = file.slice(start, end);

            const formData = new FormData();
            formData.append('file', blob, file.name);
            formData.append('chunkIndex', chunkIndex.toString());
            formData.append('totalChunks', totalChunks.toString());

            try {
                const response = await axios.post('http://localhost:3001/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(`Chunk ${chunkIndex + 1}/${totalChunks} uploaded successfully`, response.data);
            } catch (error) {
                console.error(`Error uploading chunk ${chunkIndex + 1}/${totalChunks}`, error);
            }
        }

        console.log('File uploaded successfully');
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #007bff', padding: '20px', textAlign: 'center', cursor: 'pointer', marginTop: '20px' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
    );
};

export default ChunkedFileUploadBack;
