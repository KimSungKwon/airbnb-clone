import axios from 'axios';
import { SafeUser } from '../types';
import { useRouter } from 'next/navigation';
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
/*
*   component/HeartButton에서 사용
*   hasFavorited: 게시글이 좋아요 이미 눌러져 있는가
*   toggleFavorite: hasFavorited값에 따라 게시글을 좋아요리스트에서 추가/삭제
*/
interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  // 게시물이 이미 좋아요 되있는가 
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);  // True or False
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
    
      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      }
      else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');

    } catch {
      toast.error('Something went wrong.')
    }
  }, [currentUser, hasFavorited, listingId, loginModal, router])

  return { hasFavorited, toggleFavorite }
}

export default useFavorite;