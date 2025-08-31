export async function validateImage(file: File) {
  if (!["image/jpeg", "image/jpg"].includes(file.type)) {
    throw new Error("Photo must be JPEG/JPG");
  }
  const maxBytes = 5 * 1024 * 1024;
  if (file.size > maxBytes) throw new Error("Photo must be < 5MB");

  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("Cannot load image"));
      i.src = url;
    });
    if (img.width < 70 || img.height < 70) {
      throw new Error("Minimum size is 70x70");
    }
  } finally {
    URL.revokeObjectURL(url);
  }
}
