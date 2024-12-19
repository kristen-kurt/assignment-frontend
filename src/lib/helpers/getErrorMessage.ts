import axios from "axios";

export default function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error))
    return error.response?.data?.title || error.response?.data?.message;
  else if (error instanceof Error) return error.message;
  else return "Unexpected error. Try again later";
}
