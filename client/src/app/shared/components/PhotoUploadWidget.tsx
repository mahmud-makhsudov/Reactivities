import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
};

export default function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
  const [files, setFiles] = useState<object & { preview: string }[]>([]);
  const cropperRef = useRef<ReactCropperElement>(null);

  useEffect(()=> {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file as Blob),
          }),
        ),
      );
    },
  });

  const onCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob((blob) => {
      uploadPhoto(blob as Blob);
    });
  }, [uploadPhoto]);

  return (
    <Grid container spacing={3}>
      <Grid size={4}>
        <Typography variant="overline" color="secondary">
          Step 1 - Add photo
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: "dashed 3px",
            borderColor: isDragActive ? "green" : "#b3b3b3",
            borderRadius: "5px",
            textAlign: "center",
            height: "280px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "all .2s",
          }}
        >
          <input {...getInputProps()} />
          <CloudUpload
            sx={{
              fontSize: 80,
              color: isDragActive ? "green" : "#b3b3b3",
              transition: "all .2s",
            }}
          />
          <Typography variant="h5">Drop image here</Typography>
        </Box>
      </Grid>
      <Grid size={4}>
        <Typography variant="overline" color="secondary">
          Step 2 - Resize image
        </Typography>
        {files[0]?.preview && (
          <Cropper
            src={files[0]?.preview}
            style={{ height: 300, width: "90%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            preview=".img-preview"
            guides={false}
            viewMode={1}
            background={false}
            ref={cropperRef}
          />
        )}
      </Grid>
      <Grid size={4}>
        {files[0]?.preview && (
          <>
            <Typography variant="overline" color="secondary">
              Step 3 - Preview & upload
            </Typography>
            <div
              className="img-preview"
              style={{ width: 300, height: 300, overflow: "hidden" }}
            />
            <Button
              sx={{ my: 1, width: 300 }}
              onClick={onCrop}
              variant="contained"
              color="secondary"
              loading={loading}
            >
              Upload
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}
