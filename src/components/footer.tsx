import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="author footer-item">
        Made with <FavoriteIcon></FavoriteIcon> by{' '}
        <a href="https://github.com/imran3/" target="_blank">
          Imran Azam
        </a>
      </div>
      <div className="repo footer-item">
        <GitHubIcon></GitHubIcon>{' '}
        <a href="https://github.com/imran3/game-of-life" target="_blank">
          Source Code
        </a>
      </div>
    </div>
  );
};
