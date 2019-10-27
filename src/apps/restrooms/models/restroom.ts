/* eslint lines-between-class-members: 0 */
import { distance, DistanceUnits } from '@/core/utils/geo';

export default class Restroom {
  accessible: boolean
  approved:boolean
  changingTable:boolean
  city: string
  comment: string
  country: string
  createdAt: Date
  directions: string
  downvote: number
  editId: number
  id: number
  latitude: number
  longitude: number
  name: string
  state: string
  street: string
  unisex:true
  updatedAt: Date
  upvote: number
  distance?: number

  constructor(restroom: any, userCoords: {lat: number, lng: number}) {
    this.accessible = restroom.accessible;
    this.approved = restroom.approved;
    this.changingTable = restroom.changing_table;
    this.city = restroom.city;
    this.comment = restroom.comment;
    this.country = restroom.country;
    this.createdAt = restroom.created_at;
    this.directions = restroom.directions;
    this.downvote = restroom.downvote;
    this.editId = restroom.edit_id;
    this.id = restroom.id;
    this.latitude = restroom.latitude;
    this.longitude = restroom.longitude;
    this.name = restroom.name;
    this.state = restroom.state;
    this.street = restroom.street;
    this.unisex = restroom.unisex;
    this.updatedAt = new Date(restroom.updated_at);
    this.upvote = restroom.upvote;
    this.distance = distance(
      userCoords,
      {
        lat: restroom.latitude, lng: restroom.longitude,
      },
      DistanceUnits.KILOMETERS,
    );
  }
}
