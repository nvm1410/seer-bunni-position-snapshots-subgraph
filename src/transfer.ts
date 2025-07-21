import { Address, BigInt } from "@graphprotocol/graph-ts";
import { PositionSnapshot, Token, TotalSupplySnapshot, Transfer } from "../generated/schema";
import { Transfer as TransferEvent } from "../generated/templates/BunniLpToken/ERC20";
import { Pool } from "../generated/templates/BunniLpToken/Pool";

export function handleTransfer(event: TransferEvent): void {
  const tokenAddress = event.address.toHexString();
  let token = Token.load(tokenAddress);
  if (!token) {
    return;
  }

  // Initialize totalSupply if not set
  if (token.totalSupply === null) {
    token.totalSupply = BigInt.fromI32(0);
  }

  // Check for mint or burn to update totalSupply
  const zeroAddress = Address.fromString("0x0000000000000000000000000000000000000000");
  let totalSupplyChanged = false;

  if (event.params.from.equals(zeroAddress)) {
    // Mint: Increase totalSupply
    token.totalSupply = token.totalSupply.plus(event.params.value);
    totalSupplyChanged = true;
  } else if (event.params.to.equals(zeroAddress)) {
    // Burn: Decrease totalSupply
    token.totalSupply = token.totalSupply.minus(event.params.value);
    totalSupplyChanged = true;
  }

  // Save token entity
  token.save();

  // Create a TotalSupplySnapshot if totalSupply changed
  if (totalSupplyChanged) {
    const snapshotId = "total-supply-" + tokenAddress + "-" + event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
    const snapshot = new TotalSupplySnapshot(snapshotId);
    snapshot.token = tokenAddress;
    snapshot.totalSupply = token.totalSupply;
    snapshot.timestamp = event.block.timestamp;
    snapshot.blockNumber = event.block.number;
    snapshot.save();
  }
  const transferId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  const transfer = new Transfer(transferId);
  transfer.token = tokenAddress;
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.value = event.params.value;
  transfer.blockNumber = event.block.number;
  transfer.timestamp = event.block.timestamp;
  transfer.save();

  // // create a position snapshot
  const positionSnapshotId = "position-" + tokenAddress + "-" + event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  const positionSnapshot = new PositionSnapshot(positionSnapshotId);

  const pool = Pool.bind(Address.fromString(token.pool.toHexString()));
  const tickCurrentCallResult = pool.try_slot0();
  const liquidityCallResult = pool.try_liquidity();
  const token0CallResult = pool.try_token0();
  const token1CallResult = pool.try_token1();

  positionSnapshot.transfer = transferId;
  positionSnapshot.token = tokenAddress;
  positionSnapshot.totalSupply = token.totalSupply;
  positionSnapshot.timestamp = event.block.timestamp;
  positionSnapshot.blockNumber = event.block.number;

  // pool data
  positionSnapshot.liquidity = liquidityCallResult.reverted ? null : liquidityCallResult.value;
  positionSnapshot.tick = tickCurrentCallResult.reverted ? null : BigInt.fromI32(tickCurrentCallResult.value.getTick());
  positionSnapshot.token0 = token0CallResult.reverted ? null : token0CallResult.value;
  positionSnapshot.token1 = token1CallResult.reverted ? null : token1CallResult.value;
  positionSnapshot.save();
}
