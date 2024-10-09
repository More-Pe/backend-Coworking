import { Room } from "../../modules/room/room.entity";

export class RoomSeeder {
  async run() {
    const room = new Room();
    room.room_name = 'Coworking';
    room.capacity = 26;
    room.room_type = 'Open Space';
    await room.save();
  }
}