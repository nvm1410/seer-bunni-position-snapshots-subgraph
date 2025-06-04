import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { Compound } from "../generated/schema"
import { Compound as CompoundEvent } from "../generated/BunniHub/BunniHub"
import { handleCompound } from "../src/bunni-hub"
import { createCompoundEvent } from "./bunni-hub-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let bunniKeyHash = Bytes.fromI32(1234567890)
    let liquidity = BigInt.fromI32(234)
    let amount0 = BigInt.fromI32(234)
    let amount1 = BigInt.fromI32(234)
    let newCompoundEvent = createCompoundEvent(
      sender,
      bunniKeyHash,
      liquidity,
      amount0,
      amount1
    )
    handleCompound(newCompoundEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Compound created and stored", () => {
    assert.entityCount("Compound", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Compound",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Compound",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bunniKeyHash",
      "1234567890"
    )
    assert.fieldEquals(
      "Compound",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "liquidity",
      "234"
    )
    assert.fieldEquals(
      "Compound",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount0",
      "234"
    )
    assert.fieldEquals(
      "Compound",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount1",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
