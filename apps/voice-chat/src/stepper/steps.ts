import { StepContext } from './step'

export class Steps {
  private readonly steps: StepContext[] = []

  get length() {
    return this.steps.length
  }

  push(step: StepContext) {
    this.steps.push(step)
    return this.steps.length - 1
  }

  getByIndex(index: number) {
    return this.steps[index]
  }

  getHeightOfSteps() {
    const heights: number[] = []

    for (const step of this.steps) {
      if (!step.isFixedHeight) heights.push(step.heightPx)
    }

    return heights
  }
}
