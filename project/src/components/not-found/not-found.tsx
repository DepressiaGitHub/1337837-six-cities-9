import { Link } from 'react-router-dom';

function NotFound ():JSX.Element {
  return (
    <div className='not-found'>
      <h1 className='not-found__title'>4 0 4</h1>
      <p className='not-found__text'>Page not found</p>
      <Link to="/" className='not-found__link'>Go to main page</Link>
    </div>
  );
}

export default NotFound;
