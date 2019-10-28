/* eslint no-param-reassign: 0 */
export interface LatLng {
  lat: number
  lng: number
}

type LatLngList = [number, number];

export enum DistanceUnits {
  KILOMETERS = 'K',
  MILES = 'N'
}

export const distance = (coords1: LatLng, coords2: LatLng, unit: DistanceUnits): number => {
  const { lat: lat1, lng: lng1 } = coords1;
  const { lat: lat2, lng: lng2 } = coords2;
  if ((lat1 === lat2) && (lng1 === lng2)) {
    return 0;
  }
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lng1 - lng2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1)
    * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') { dist *= 1.609344; }
  if (unit === 'N') { dist *= 0.8684; }
  // Format text
  const distString = String(dist);
  const splitDistString = distString.split('.');
  if (splitDistString[0].length > 2) {
    return Number(splitDistString[0]);
  }
  if (splitDistString.length > 1) {
    return Number(`${splitDistString[0]}.${splitDistString[1].slice(0, 2)}`);
  }
  return Number(distString);
};

export const farthestTwoPoints = (points: any): any => (
  points.reduce((acc: any, point: any, index: any, array: []) => {
    let farthestDistance = 0;
    array.forEach((val, index2) => {
      const [lat1, lng1] = points[index];
      const [lat2, lng2] = points[index2];
      const distanceBetween = distance(
        {
          lat: lat1,
          lng: lng1,
        },
        {
          lat: lat2,
          lng: lng2,
        },
        DistanceUnits.KILOMETERS,
      );
      if (distanceBetween > farthestDistance) {
        farthestDistance = distanceBetween;
        acc = [points[index].reverse(), points[index2].reverse()];
      }
    });
    return acc;
  }, [])
);
