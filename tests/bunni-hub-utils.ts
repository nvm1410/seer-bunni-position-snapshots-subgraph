import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  Compound,
  Deposit,
  NewBunni,
  OwnerUpdated,
  PayProtocolFee,
  SetProtocolFee,
  Withdraw
} from "../generated/BunniHub/BunniHub"

export function createCompoundEvent(
  sender: Address,
  bunniKeyHash: Bytes,
  liquidity: BigInt,
  amount0: BigInt,
  amount1: BigInt
): Compound {
  let compoundEvent = changetype<Compound>(newMockEvent())

  compoundEvent.parameters = new Array()

  compoundEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  compoundEvent.parameters.push(
    new ethereum.EventParam(
      "bunniKeyHash",
      ethereum.Value.fromFixedBytes(bunniKeyHash)
    )
  )
  compoundEvent.parameters.push(
    new ethereum.EventParam(
      "liquidity",
      ethereum.Value.fromUnsignedBigInt(liquidity)
    )
  )
  compoundEvent.parameters.push(
    new ethereum.EventParam(
      "amount0",
      ethereum.Value.fromUnsignedBigInt(amount0)
    )
  )
  compoundEvent.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  )

  return compoundEvent
}

export function createDepositEvent(
  sender: Address,
  recipient: Address,
  bunniKeyHash: Bytes,
  liquidity: BigInt,
  amount0: BigInt,
  amount1: BigInt,
  shares: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "bunniKeyHash",
      ethereum.Value.fromFixedBytes(bunniKeyHash)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "liquidity",
      ethereum.Value.fromUnsignedBigInt(liquidity)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "amount0",
      ethereum.Value.fromUnsignedBigInt(amount0)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return depositEvent
}

export function createNewBunniEvent(
  token: Address,
  bunniKeyHash: Bytes,
  pool: Address,
  tickLower: i32,
  tickUpper: i32
): NewBunni {
  let newBunniEvent = changetype<NewBunni>(newMockEvent())

  newBunniEvent.parameters = new Array()

  newBunniEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  newBunniEvent.parameters.push(
    new ethereum.EventParam(
      "bunniKeyHash",
      ethereum.Value.fromFixedBytes(bunniKeyHash)
    )
  )
  newBunniEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  newBunniEvent.parameters.push(
    new ethereum.EventParam("tickLower", ethereum.Value.fromI32(tickLower))
  )
  newBunniEvent.parameters.push(
    new ethereum.EventParam("tickUpper", ethereum.Value.fromI32(tickUpper))
  )

  return newBunniEvent
}

export function createOwnerUpdatedEvent(
  user: Address,
  newOwner: Address
): OwnerUpdated {
  let ownerUpdatedEvent = changetype<OwnerUpdated>(newMockEvent())

  ownerUpdatedEvent.parameters = new Array()

  ownerUpdatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  ownerUpdatedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownerUpdatedEvent
}

export function createPayProtocolFeeEvent(
  amount0: BigInt,
  amount1: BigInt
): PayProtocolFee {
  let payProtocolFeeEvent = changetype<PayProtocolFee>(newMockEvent())

  payProtocolFeeEvent.parameters = new Array()

  payProtocolFeeEvent.parameters.push(
    new ethereum.EventParam(
      "amount0",
      ethereum.Value.fromUnsignedBigInt(amount0)
    )
  )
  payProtocolFeeEvent.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  )

  return payProtocolFeeEvent
}

export function createSetProtocolFeeEvent(
  newProtocolFee: BigInt
): SetProtocolFee {
  let setProtocolFeeEvent = changetype<SetProtocolFee>(newMockEvent())

  setProtocolFeeEvent.parameters = new Array()

  setProtocolFeeEvent.parameters.push(
    new ethereum.EventParam(
      "newProtocolFee",
      ethereum.Value.fromUnsignedBigInt(newProtocolFee)
    )
  )

  return setProtocolFeeEvent
}

export function createWithdrawEvent(
  sender: Address,
  recipient: Address,
  bunniKeyHash: Bytes,
  liquidity: BigInt,
  amount0: BigInt,
  amount1: BigInt,
  shares: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "bunniKeyHash",
      ethereum.Value.fromFixedBytes(bunniKeyHash)
    )
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "liquidity",
      ethereum.Value.fromUnsignedBigInt(liquidity)
    )
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "amount0",
      ethereum.Value.fromUnsignedBigInt(amount0)
    )
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return withdrawEvent
}
