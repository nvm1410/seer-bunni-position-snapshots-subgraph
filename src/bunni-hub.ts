import {
  Compound as CompoundEvent,
  Deposit as DepositEvent,
  NewBunni as NewBunniEvent,
  OwnerUpdated as OwnerUpdatedEvent,
  PayProtocolFee as PayProtocolFeeEvent,
  SetProtocolFee as SetProtocolFeeEvent,
  Withdraw as WithdrawEvent
} from "../generated/BunniHub/BunniHub"
import {
  Compound,
  Deposit,
  NewBunni,
  OwnerUpdated,
  PayProtocolFee,
  SetProtocolFee,
  Withdraw
} from "../generated/schema"

export function handleCompound(event: CompoundEvent): void {
  let entity = new Compound(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.bunniKeyHash = event.params.bunniKeyHash
  entity.liquidity = event.params.liquidity
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.recipient = event.params.recipient
  entity.bunniKeyHash = event.params.bunniKeyHash
  entity.liquidity = event.params.liquidity
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewBunni(event: NewBunniEvent): void {
  let entity = new NewBunni(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.bunniKeyHash = event.params.bunniKeyHash
  entity.pool = event.params.pool
  entity.tickLower = event.params.tickLower
  entity.tickUpper = event.params.tickUpper

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerUpdated(event: OwnerUpdatedEvent): void {
  let entity = new OwnerUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePayProtocolFee(event: PayProtocolFeeEvent): void {
  let entity = new PayProtocolFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetProtocolFee(event: SetProtocolFeeEvent): void {
  let entity = new SetProtocolFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newProtocolFee = event.params.newProtocolFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.recipient = event.params.recipient
  entity.bunniKeyHash = event.params.bunniKeyHash
  entity.liquidity = event.params.liquidity
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
