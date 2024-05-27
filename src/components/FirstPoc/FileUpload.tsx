import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios, { AxiosProgressEvent } from 'axios';

const FileUpload: React.FC = () => {
    const [uploadProgress, setUploadProgress] = useState(0);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const formData = new FormData();

        acceptedFiles.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('/api/upload', formData, {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    }
                },
            });

            console.log('Archivos subidos exitosamente:', response.data);
        } catch (error) {
            console.error('Error al subir los archivos:', error);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Suelta los archivos aquí...</p>
            ) : (
                <p>Arrastra y suelta los archivos aquí, o haz clic para seleccionarlos</p>
            )}
            <progress value={uploadProgress} max="100" />
        </div>
    );
};

export default FileUpload;