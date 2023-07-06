
export const postImage = async (
  file: File | undefined,
  callBack: (file: string) => void
) => {
  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { url } = await response.json();

    callBack(url);
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading file");
  }
};