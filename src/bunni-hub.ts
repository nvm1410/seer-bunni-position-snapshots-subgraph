import { BigInt } from "@graphprotocol/graph-ts";
import { NewBunni as NewBunniEvent } from "../generated/BunniHub/BunniHub";
import { Token } from "../generated/schema";
import { BunniLpToken } from "../generated/templates";

export function handleNewBunni(event: NewBunniEvent): void {
  // Create Token entity
  let token = new Token(event.params.token.toHexString());
  token.totalSupply = BigInt.fromI32(0);
  token.bunniKeyHash = event.params.bunniKeyHash;
  token.pool = event.params.pool;
  token.tickLower = event.params.tickLower;
  token.tickUpper = event.params.tickUpper;
  token.save();

  // Instantiate the BunniLpToken template for tracking transfers
  BunniLpToken.create(event.params.token);
}
