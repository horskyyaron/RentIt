"use client"
import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";
import { useUploadThing } from "@/utils/uploadthing";
import { MouseEvent, useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { formatSize } from "@/utils/utils"




export function ImageUploader() {
    const [files, setFiles] = useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
    }, []);

    const fileTypes = ["image"]
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    });

    const { startUpload, isUploading } = useUploadThing<string>({
        endpoint: "imageUploader", // replace this with an actual endpoint name
        onClientUploadComplete: () => {
            alert("uploaded successfully!");
        },
        onUploadError: () => {
            alert("error occurred while uploading");
        },
    });

    const handleRemoveFile = (e: MouseEvent, index: number) => {
        e.stopPropagation()
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };


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
            <div>
                {files.length > 0 && (
                    <button onClick={() => startUpload(files)} className="border border-black">
                        Upload {files.length} files
                    </button>
                )}
                {isUploading && <h2>uploading...</h2>}
            </div>
        </div>
    );
}
