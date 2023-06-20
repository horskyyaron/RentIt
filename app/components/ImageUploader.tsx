"use client"
import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";
import { MouseEvent, useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { formatSize } from "@/utils/utils"

export function ImageUploader({ shouldUpload, handleUpload }: { shouldUpload: boolean, handleUpload: Function }) {
    const [files, setFiles] = useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
    }, []);

    const fileTypes = ["image"]
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    });


    const handleRemoveFile = (e: MouseEvent, index: number) => {
        e.stopPropagation()
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    if (shouldUpload) {
        console.log("inside image uploader, starting to upload")
        handleUpload(files)
    }


    return (
        <div>
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer bg-gray-100"
            >
                <input {...getInputProps()} />
                <p className="text-gray-600">Drag and drop images here, or click to select images</p>
                {files.length > 0 && (
                    <div>
                        <h4>Selected Images:</h4>
                        <ul>
                            {files.map((file, index) => (

                                <li key={index}>
                                    <span>{file.name} - {formatSize(file.size)}</span>
                                    <button
                                        className="ml-2 text-red-500"
                                        onClick={(e) => handleRemoveFile(e, index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
