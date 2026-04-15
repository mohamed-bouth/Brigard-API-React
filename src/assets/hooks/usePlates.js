import { useQuery } from "@tanstack/react-query"
import api from "../../api/axios"

export function usePlates() {
  return useQuery({
    queryKey: ["plates"],
    queryFn: async () => {
      const response = await api.get("/plats")
      return response.data.plats
    },
  })
}