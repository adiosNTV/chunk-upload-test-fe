import axiosClient from './axios-client'

export const artworkService = {
  uploadArtWork: async (chunk: Blob, chunkIndex: number) => {
    const formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("chunkIndex", `${chunkIndex}`);
    return (await axiosClient.post('/artwork/v2', formData)).data
  },
}
