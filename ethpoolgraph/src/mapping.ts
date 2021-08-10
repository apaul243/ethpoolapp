import {
  customerDeposit as customerDepositEvent,
  customerWithdrawal as customerWithdrawalEvent,
  rewardsAdded as rewardsAddedEvent
} from "../generated/ethPool/ethPool"
import {
  customerDeposit,
  customerWithdrawal,
  rewardsAdded
} from "../generated/schema"

export function handlecustomerDeposit(event: customerDepositEvent): void {
  let entity = new customerDeposit(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.address = event.transaction.from
  entity.amt = event.params.amt
  entity.timestamp = event.block.timestamp.toI32()
  entity.save()
}

export function handlecustomerWithdrawal(event: customerWithdrawalEvent): void {
  let entity = new customerWithdrawal(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.address = event.transaction.from
  entity.amt = event.params.amt
  entity.timestamp = event.block.timestamp.toI32()
  entity.save()
}

export function handlerewardsAdded(event: rewardsAddedEvent): void {
  let entity = new rewardsAdded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.address = event.transaction.from
  entity.amt = event.params.amt
  entity.timestamp = event.block.timestamp.toI32()
  entity.save()
}
