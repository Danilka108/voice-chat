type Container = {
  [key: string]: number
}

export class AuthContainer {
  private container: Container = {}

  add(stepName: string, stepWidthPx: number) {
    this.container[stepName] = stepWidthPx
  }

  getSteps(): Container {
    return this.container
  }
}
