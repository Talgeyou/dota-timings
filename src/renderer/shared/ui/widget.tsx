import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import Moveable from 'react-moveable';
import { cn } from '@nextui-org/system';
import useIsOverlayActive from '../lib/use-is-overlay-active';
import useToggle from '../lib/use-toggle';
import useAppSelector from '../lib/use-app-selector';
import {
  createWidgetSelector,
  selectOverlayConfigStatus,
} from '../lib/overlay-config';
import useClickOutside from '../lib/use-click-outside';

const ALT_KEY = 'Alt';

const GAP = 10;

function getGuidelines(size: number) {
  const leftGuideLines: number[] = [];

  for (let i = GAP; i < size / 2; i += GAP) {
    leftGuideLines.push(i);
  }

  const centerGuideLine = size / 2;

  const rightGuideLines: number[] = [];

  for (let i = size - GAP; i > size / 2; i -= GAP) {
    rightGuideLines.push(i);
  }
  rightGuideLines.reverse();

  const guideLines = [...leftGuideLines, centerGuideLine, ...rightGuideLines];

  return guideLines;
}

type Props = {
  children: ReactNode;
  widgetKey: string;
};

export default function Widget(props: Props) {
  const { children, widgetKey } = props;

  const config = useAppSelector(createWidgetSelector(widgetKey));
  const overlayConfigStatus = useAppSelector(selectOverlayConfigStatus);

  const [isFocused, setIsFocused] = useState(false);

  const [isHoldingAlt, setIsHoldingAlt] = useState(false);
  const [guideLines, setGuideLines] = useState<{
    vertical: number[];
    horizontal: number[];
  }>({
    horizontal: [],
    vertical: [],
  });

  const targetRef = useRef<HTMLButtonElement>(null);

  const isOverlayActive = useIsOverlayActive();
  const [isActive, toggle] = useToggle(true);

  const handleClick = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleClickOutside = useCallback(() => {
    setIsFocused(false);
  }, []);

  useClickOutside({ ref: targetRef, callback: handleClickOutside });

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === ALT_KEY) {
        setIsHoldingAlt(true);
      }
    };
    const keyUpHandler = (event: KeyboardEvent) => {
      if (event.key === ALT_KEY) {
        setIsHoldingAlt(false);
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  useEffect(() => {
    const element = document.getElementById('root');

    if (element) {
      setGuideLines({
        horizontal: getGuidelines(element.clientWidth),
        vertical: getGuidelines(element.clientHeight),
      });
    }
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      setGuideLines({
        vertical: getGuidelines(window.innerHeight),
        horizontal: getGuidelines(window.innerWidth),
      });
    };
    const element = document.getElementById('root');

    element?.addEventListener('resize', resizeHandler);

    return () => {
      element?.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <>
      <button
        ref={targetRef}
        type="button"
        className="w-fit cursor-pointer"
        style={{
          width: config?.width,
          height: config?.height,
          transform: config?.transform,
        }}
        onMouseDown={handleClick}
        onDoubleClick={toggle}
      >
        <div
          className={cn('pointer-events-none', {
            'opacity-50': !isActive && isOverlayActive,
            'opacity-0': !isActive && !isOverlayActive,
          })}
        >
          {children}
        </div>
      </button>
      {overlayConfigStatus === 'loaded' && (
        <Moveable
          hideDefaultLines={!isOverlayActive || !isFocused}
          hideThrottleDragRotateLine={!isOverlayActive || !isFocused}
          origin={false}
          target={targetRef}
          scalable={isOverlayActive && isFocused}
          draggable={isOverlayActive}
          isDisplayGridGuidelines={isOverlayActive && isFocused}
          isDisplaySnapDigit={isOverlayActive && isFocused}
          isDisplayShadowRoundControls={isOverlayActive && isFocused}
          isDisplayInnerSnapDigit={isOverlayActive && isFocused}
          snappable
          hideChildMoveableDefaultLines={!isOverlayActive || !isFocused}
          displayAroundControls={isOverlayActive && isFocused}
          snapDirections={{
            bottom: true,
            center: true,
            left: true,
            middle: true,
            right: true,
            top: true,
          }}
          verticalGuidelines={isHoldingAlt ? [] : guideLines.vertical ?? []}
          horizontalGuidelines={isHoldingAlt ? [] : guideLines.horizontal ?? []}
          keepRatio
          bounds={{
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            position: 'css',
          }}
          persistData={config}
          throttleDrag={1}
          edgeDraggable={false}
          startDragRotate={0}
          throttleDragRotate={0}
          onDrag={(e) => {
            e.target.style.transform = e.transform;
          }}
          onDragEnd={(e) => {
            window.electron.ipcRenderer.sendMessage(
              'OVERLAY_CONFIG_UPDATE_WIDGET',
              {
                key: widgetKey,
                data: {
                  transform: e.target.style.transform,
                },
              },
            );
          }}
          onScale={(e) => {
            e.target.style.transform = e.transform;
          }}
          onScaleEnd={(e) => {
            window.electron.ipcRenderer.sendMessage(
              'OVERLAY_CONFIG_UPDATE_WIDGET',
              {
                key: widgetKey,
                data: {
                  transform: e.target.style.transform,
                },
              },
            );
          }}
        />
      )}
    </>
  );
}
