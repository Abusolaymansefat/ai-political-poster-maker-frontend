"use client";

import { useRef } from "react";

import Image from "next/image";

import { X, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  files: File[];
  onChange: (
    files: File[]
  ) => void;
}

export default function PhotoUploader({
  files,
  onChange
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const handleFiles = (
    selected: FileList | null
  ) => {
    if (!selected) return;

    const images = Array.from(
      selected
    ).filter((file) =>
      file.type.startsWith("image/")
    );

    const nextFiles = [
      ...files,
      ...images
    ].slice(0, 3);

    onChange(nextFiles);
  };

  const removeFile = (index: number) => {
    onChange(
      files.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <div className="space-y-4">

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) =>
          handleFiles(
            e.target.files
          )
        }
      />

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          inputRef.current?.click()
        }
        disabled={files.length >= 3}
      >
        <Upload className="mr-2 h-4 w-4" />

        Upload Photos
      </Button>

      <p className="text-sm text-muted-foreground">
        Maximum 3 photos
      </p>

      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {files.map(
            (file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="relative overflow-hidden rounded-lg border"
              >
                <Image
                  src={URL.createObjectURL(
                    file
                  )}
                  alt={file.name}
                  width={300}
                  height={300}
                  className="aspect-square object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeFile(index)
                  }
                  className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}