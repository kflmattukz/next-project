import { fetchUser } from "@/api/reqres";
import { useQuery } from "@tanstack/react-query";

export default function useGetList(enabled: boolean = true) {
  const fetchList = useQuery({
    queryKey: ["fetch list"],
    queryFn: fetchUser,
    enabled,
  });
  return {
    getListIsLoading: fetchList.isLoading,
    getListIsError: fetchList.isError,
    getListSuccess: fetchList.isSuccess,
    getListData: fetchList.data,
  };
}
