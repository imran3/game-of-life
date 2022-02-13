import { Button, Tooltip } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone';
import StopCircleTwoToneIcon from '@mui/icons-material/StopCircleTwoTone';
import ShuffleOnTwoToneIcon from '@mui/icons-material/ShuffleOnTwoTone';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';

import { color_palette } from '../models/constants';

export const GameControls = ({ gameEngine, autoPlay }) => {
  return (
    <div className="controls">
      <Button
        className="btn"
        style={{
          backgroundColor: color_palette.pale_spring_Bud,
          color: color_palette.terra_cotta,
        }}
        onClick={() => gameEngine.computeNextGeneration()}
      >
        <Tooltip title="Next generation">
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </Tooltip>
      </Button>

      <Button
        className="btn"
        style={{
          backgroundColor: color_palette.cadet_blue,
          color: color_palette.pale_spring_Bud,
        }}
        onClick={() => gameEngine.toggleAutoPlay()}
      >
        {autoPlay ? (
          <Tooltip title="Stop autoplay">
            <StopCircleTwoToneIcon></StopCircleTwoToneIcon>
          </Tooltip>
        ) : (
          <Tooltip title="Start autoplay">
            <PlayCircleFilledTwoToneIcon></PlayCircleFilledTwoToneIcon>
          </Tooltip>
        )}
      </Button>

      <Button
        className="btn"
        style={{
          backgroundColor: color_palette.alabaster,
          color: color_palette.terra_cotta,
        }}
        onClick={() => gameEngine.setRandomGridState()}
      >
        <Tooltip title="Random grid">
          <ShuffleOnTwoToneIcon></ShuffleOnTwoToneIcon>
        </Tooltip>
      </Button>

      <Button
        className="btn"
        style={{
          backgroundColor: color_palette.cadet_blue,
          color: color_palette.opal,
        }}
        onClick={() => gameEngine.resetGrid()}
      >
        <Tooltip title="Reset">
          <RestartAltTwoToneIcon></RestartAltTwoToneIcon>
        </Tooltip>
      </Button>
    </div>
  );
};
