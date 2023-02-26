export function getWindDirection(windDeg: number) {
  switch (true) {
    case windDeg >= 0 && windDeg < 22.5:
      return 'N';

    case windDeg >= 22.5 && windDeg < 45:
      return 'NNE';
    
    case windDeg >= 45 && windDeg < 67.5:
      return 'NE';

    case windDeg >= 67.5 && windDeg < 90:
      return 'ENE';

    case windDeg >= 90 && windDeg < 112.5:
      return 'E';

    case windDeg >= 112.5 && windDeg < 135:
      return 'ESE';
    
    case windDeg >= 135 && windDeg < 157.5:
      return 'SE';

    case windDeg >= 157.5 && windDeg < 180:
      return 'SSE';

    case windDeg >= 180 && windDeg < 202.5:
      return 'S';

    case windDeg >= 202.5 && windDeg < 225:
      return 'SSW';

    case windDeg >= 225 && windDeg < 247.5:
      return 'SW';

    case windDeg >= 247.5 && windDeg < 270:
      return 'WSW';

    case windDeg >= 270 && windDeg < 292.5:
      return 'W';

    case windDeg >= 292.5 && windDeg < 315:
      return 'WNW';

    case windDeg >= 315 && windDeg < 337.5:
      return 'NW';

    case windDeg >= 337.5 && windDeg < 360:
      return 'NNW';
  
    default:
      return 'N';
  }
};