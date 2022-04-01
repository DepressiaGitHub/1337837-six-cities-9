import { useAppSelector } from '../../hooks';
import ReviewsItem from '../reviews-item/reviews-item';
import { Comment } from '../../types/comment';
import { getComments } from '../../store/app-data/selectors';

function ReviewList():JSX.Element {
  // const comments: Comment[] = useAppSelector(({DATA}) => DATA.comments);
  const comments: Comment[] = useAppSelector(getComments);
  return (
    <ul className="reviews__list">
      {comments.map((comment) => <ReviewsItem key={comment.id} comment={comment} />)}
    </ul>
  );
}

export default ReviewList;
