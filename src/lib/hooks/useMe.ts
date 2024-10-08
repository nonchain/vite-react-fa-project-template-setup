import { QUERY_KEYS } from "@/lib/constants/query-keys.constant";
import { END_POINTS } from "@/lib/constants/urls.constant";
import api from "@/lib/services/api.services";
import { UserApi, UserErrorApi } from "@/lib/types/api.type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMe() {
  return useQuery<UserApi, AxiosError<UserErrorApi>>({
    queryKey: QUERY_KEYS.profile.user,
    queryFn: () => api.protected.get(END_POINTS.profile.user)
  })
}