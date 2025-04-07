interface UploadResponse {
  imageUrl: string;
}

export const compressImageUpload = async (
  file: File,
  maxSize: number,
  image?: string
): Promise<string> => {
  // Create an HTMLImageElement to get the original dimensions of the image
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await new Promise<void>((resolve, reject) => {
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve();
    };
    img.onerror = reject;
  });
  const { width, height } = img;

  // Resize the image if necessary
  if (width > maxSize || height > maxSize) {
    const aspectRatio = width / height;
    let newWidth, newHeight;
    if (aspectRatio >= 1) {
      newWidth = maxSize;
      newHeight = maxSize / aspectRatio;
    } else {
      newHeight = maxSize;
      newWidth = maxSize * aspectRatio;
    }
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    const resizedBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob !== null) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert canvas to blob'));
          }
        },
        file.type,
        0.9
      );
    });

    file = new File([resizedBlob], file.name, { type: file.type });
  }
  // Upload the resized image
  const formData = new FormData();
  formData.append('image', file);
  image && formData.append('deleteImage', image);
  const request = new Request('/api/upload', {
    method: 'POST',
    body: formData,
  });
  const response = await fetch(request);
  const data: UploadResponse = await response.json();
  return data.imageUrl;
};
