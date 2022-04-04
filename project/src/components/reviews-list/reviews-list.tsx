import { useAppSelector } from '../../hooks';
import ReviewsItem from '../reviews-item/reviews-item';
import { Comment } from '../../types/comment';
import { getComments } from '../../store/app-data/selectors';
import { MAX_COMMENTS } from '../../const';

function ReviewList():JSX.Element {
  const comments: Comment[] = useAppSelector(getComments);

  return (
    <ul className="reviews__list">
      {comments.slice().reverse().slice(0, MAX_COMMENTS).map((comment) => <ReviewsItem key={comment.id} comment={comment} />)}
    </ul>
  );
}

export default ReviewList;
