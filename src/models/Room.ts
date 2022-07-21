import { Player } from "./Player";

type ConfigurationProps = {
  maxPlayers: number;
};

const DEFAULT_PLAYERS = 4;
const MAX_PLAYERS = 6;

export class Room {
  maxPlayers = DEFAULT_PLAYERS;
  players: Player[] = [];

  public configure({
    maxPlayers = DEFAULT_PLAYERS,
  }: Partial<ConfigurationProps>) {
    this.setMaxPlayers(maxPlayers);

    return this;
  }

  public getPlayers() {
    return this.players;
  }

  public getMaxPlayers() {
    return this.maxPlayers;
  }

  public addPlayer(player: Player) {
    if (this.isGameFull()) {
      throw new Error(`Only ${this.getMaxPlayers()} players can play the game`);
    }

    this.players.push(player);
  }

  public removePlayer(player: Player) {
    const removedPlayer = this.findPlayer(player);
    if (!removedPlayer) {
      throw new Error(`${player.name} could not be removed from the game`);
    }

    this.players = this.players.filter((p) => p.isNot(removedPlayer));
  }

  private findPlayer(player: Player) {
    return this.players.find((p) => p.is(player));
  }

  private isGameFull() {
    return this.players.length >= this.getMaxPlayers();
  }

  private setMaxPlayers(value: number) {
    if (!(1 <= value && value <= MAX_PLAYERS)) {
      return;
    }

    this.maxPlayers = value;
  }
}
