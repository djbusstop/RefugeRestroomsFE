import { farthestTwoPoints } from '../geo';

describe('farthestTwoPointsMethod', () => {
    it('returns the farthest two points of a list of coords', () =>  {
        const exampleCoords = [
            [51.3526764,4.8611911],
            [51.087876,-0.3533124],
            [51.2408037,-0.559245],
        ]

        const result = farthestTwoPoints(exampleCoords);
        expect(result).toEqual([[51.2408037,-0.559245], [51.3526764,4.8611911]]);
    })
})